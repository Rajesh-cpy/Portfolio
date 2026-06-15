import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export default function HeroCanvas() {
  const mountRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensions
    let width = mountRef.current.clientWidth;
    let height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    // Move camera high and tilt down for an immersive 3D terrain horizon perspective
    camera.position.set(0, 75, 160);
    camera.lookAt(0, -10, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Particle Grid Constants
    const gridWidth = 45;
    const gridDepth = 45;
    const particleCount = gridWidth * gridDepth;
    const spacing = 7;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Mapped color coordinates
    const colorPrimary = new THREE.Color('#7C3AED');   // Purple
    const colorSecondary = new THREE.Color('#06B6D4'); // Cyan
    const colorDark = new THREE.Color('#1E293B');      // Slate 800 (Light Mode Contrast)
    const colorLight = new THREE.Color('#64748B');     // Slate 500

    // Grid placement initialization
    for (let w = 0; w < gridWidth; w++) {
      for (let d = 0; d < gridDepth; d++) {
        const index = w * gridDepth + d;

        // Centered coordinates on XZ plane
        const x = (w - gridWidth / 2) * spacing;
        const z = (d - gridDepth / 2) * spacing;
        const y = 0; // Managed inside render loop

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        // Gradient interpolation across X-axis grid coordinates
        const ratio = w / gridWidth;
        const mixedColor = colorPrimary.clone().lerp(colorSecondary, ratio);

        colors[index * 3] = mixedColor.r;
        colors[index * 3 + 1] = mixedColor.g;
        colors[index * 3 + 2] = mixedColor.b;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Texture circle
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.7)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    // Material setup
    const material = new THREE.PointsMaterial({
      size: 3.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Mouse interactive swell parameters
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event) => {
      mouse.targetX = (event.clientX - window.innerWidth / 2) * 0.08;
      mouse.targetY = (event.clientY - window.innerHeight / 2) * 0.08;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Manage color themes on shader system
    const updateThemeSettings = (dark) => {
      if (dark) {
        material.blending = THREE.AdditiveBlending;
        material.opacity = 0.8;
        
        const colorsAttr = geometry.attributes.color.array;
        for (let w = 0; w < gridWidth; w++) {
          for (let d = 0; d < gridDepth; d++) {
            const index = w * gridDepth + d;
            const ratio = w / gridWidth;
            const mixedColor = colorPrimary.clone().lerp(colorSecondary, ratio);
            
            colorsAttr[index * 3] = mixedColor.r;
            colorsAttr[index * 3 + 1] = mixedColor.g;
            colorsAttr[index * 3 + 2] = mixedColor.b;
          }
        }
        geometry.attributes.color.needsUpdate = true;
      } else {
        material.blending = THREE.NormalBlending;
        material.opacity = 0.55;
        
        const colorsAttr = geometry.attributes.color.array;
        for (let w = 0; w < gridWidth; w++) {
          for (let d = 0; d < gridDepth; d++) {
            const index = w * gridDepth + d;
            const ratio = w / gridWidth;
            const mixedColor = colorDark.clone().lerp(colorLight, ratio);
            
            colorsAttr[index * 3] = mixedColor.r;
            colorsAttr[index * 3 + 1] = mixedColor.g;
            colorsAttr[index * 3 + 2] = mixedColor.b;
          }
        }
        geometry.attributes.color.needsUpdate = true;
      }
    };

    updateThemeSettings(isDark);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      
      // Interpolate mouse coordinates
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Subtle scene pitch/yaw tilt relative to mouse
      particleSystem.rotation.y = elapsedTime * 0.015 + mouse.x * 0.002;
      particleSystem.rotation.x = -0.15 + mouse.y * 0.002;

      // Ripple mathematical height positions in particle grid
      const positionsAttr = geometry.attributes.position.array;
      for (let w = 0; w < gridWidth; w++) {
        for (let d = 0; d < gridDepth; d++) {
          const index = w * gridDepth + d;
          
          const x = positionsAttr[index * 3];
          const z = positionsAttr[index * 3 + 2];

          // Compute double sine-wave undulating ripple
          // Incorporates time coefficient and coordinates values
          const yVal = 
            Math.sin(w * 0.18 + elapsedTime * 1.2) * Math.cos(d * 0.18 + elapsedTime * 1.2) * 11 + 
            Math.sin((w + d) * 0.08 + elapsedTime * 0.8) * 6;

          // Adjust height position
          positionsAttr[index * 3 + 1] = yVal;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Window Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      width = mountRef.current.clientWidth;
      height = mountRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Clean up WebGL bounds and listeners
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0" 
    />
  );
}
