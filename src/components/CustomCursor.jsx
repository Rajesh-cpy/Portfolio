import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState('default'); // 'default', 'link', 'text', 'drag'
  
  // Real-time raw coordinates for display
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  // Mouse Coordinates (Spring Damped Core)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for smooth coordinate numbers offset trail
  const springConfig = { damping: 35, stiffness: 300, mass: 0.6 };
  const labelX = useSpring(mouseX, springConfig);
  const labelY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide default cursor
    document.body.classList.add('custom-cursor-active');

    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Setup hover listeners
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.closest('a') || 
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.closest('.clickable') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.getAttribute('role') === 'button';

      if (isClickable) {
        setHovered(true);
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          setCursorType('text');
        } else if (target.closest('.draggable')) {
          setCursorType('drag');
        } else {
          setCursorType('link');
        }
      }
    };

    const handleMouseOut = () => {
      setHovered(false);
      setCursorType('default');
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY, isVisible]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null; // Disable on touch devices
  }

  // Get HUD context text based on hover type
  const getHudText = () => {
    if (hovered) {
      if (cursorType === 'text') return '[TYPE]';
      if (cursorType === 'drag') return '[DRAG]';
      return '[VIEW]';
    }
    return `[X:${coords.x} Y:${coords.y}]`;
  };

  return (
    <>
      {/* 1. Futuristic Reticle HUD Crosshair Lines */}
      <motion.div
        className="fixed top-0 left-0 w-7 h-7 pointer-events-none z-[9999] hidden lg:flex items-center justify-center"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: clicked ? 90 : hovered ? 45 : 0,
          scale: clicked ? 0.75 : hovered ? 1.4 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Top tick */}
        <span className="absolute top-0 w-0.5 h-1.5 bg-primary-light" />
        {/* Bottom tick */}
        <span className="absolute bottom-0 w-0.5 h-1.5 bg-primary-light" />
        {/* Left tick */}
        <span className="absolute left-0 w-1.5 h-0.5 bg-primary-light" />
        {/* Right tick */}
        <span className="absolute right-0 w-1.5 h-0.5 bg-primary-light" />

        {/* Small subtle radar circle inside crosshair */}
        <motion.div 
          className="w-4 h-4 rounded-full border border-secondary/30"
          animate={{
            scale: hovered ? 1.1 : 1,
            borderColor: hovered ? 'rgba(6, 182, 212, 0.6)' : 'rgba(6, 182, 212, 0.2)'
          }}
        />
      </motion.div>

      {/* 2. Central Precision Pin Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: clicked ? 0.5 : hovered ? 0 : 1,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: 'tween', duration: 0.1 }}
      />

      {/* 3. Spring Coordinates HUD Overlay */}
      <motion.div
        className="fixed pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: labelX,
          y: labelY,
          // Position coordinates text offset slightly below-right (+20px, +20px)
          left: 20,
          top: 20
        }}
        animate={{
          opacity: isVisible ? 0.75 : 0
        }}
      >
        <span className={`font-mono text-[9px] font-bold tracking-[0.15em] select-none ${hovered ? 'text-secondary-light' : 'text-slate-400 dark:text-slate-500'}`}>
          {getHudText()}
        </span>
      </motion.div>
    </>
  );
}
