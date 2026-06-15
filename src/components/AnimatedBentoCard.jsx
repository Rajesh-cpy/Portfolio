import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AnimatedBentoCard({ children, className = '', glowColor = 'rgba(124, 58, 237, 0.15)' }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse positions relative to card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Damping springs for smooth rotation
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 });

  // Spotlight Coordinates
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate rotation (-0.5 to 0.5 scale)
    const relativeX = (mouseX / width) - 0.5;
    const relativeY = (mouseY / height) - 0.5;

    x.set(relativeX);
    y.set(relativeY);

    // Spotlight positions (pixel boundaries)
    spotX.set(mouseX);
    spotY.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`glass-card relative overflow-hidden rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ${className}`}
    >
      {/* Background Spotlight Glow */}
      <motion.div
        className="absolute -inset-px rounded-3xl pointer-events-none opacity-0 transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: useTransform(
            [spotX, spotY],
            ([sx, sy]) => `radial-gradient(400px circle at ${sx}px ${sy}px, ${glowColor}, transparent 80%)`
          ),
        }}
      />

      {/* 3D Content Wrapper */}
      <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
