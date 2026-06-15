import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const duration = 1800; // 1.8 seconds loading
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress === 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600); // Wait for transition animation
        }, 500); // Brief pause at 100%
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const containerVariants = {
    exit: {
      y: '-100%',
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const nameLetters = "R. RAJESH".split("");

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          variants={containerVariants}
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-16 bg-darkBg text-white select-none"
        >
          {/* Top Row: Brand & Status */}
          <div className="flex justify-between items-center w-full">
            <span className="text-xs tracking-[0.2em] font-mono text-gray-500">PORTFOLIO v2.0</span>
            <span className="text-xs tracking-[0.2em] font-mono text-primary-light flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              INITIALIZING
            </span>
          </div>

          {/* Middle Row: Name Reveal */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="flex overflow-hidden mb-4">
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  className={`text-5xl md:text-8xl font-black tracking-tighter ${char === ' ' ? 'w-4 md:w-8' : ''} text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500`}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-xs font-mono tracking-widest text-slate-400"
            >
              FULL STACK DEVELOPER & GENAI PROTOTYPER
            </motion.p>
          </div>

          {/* Bottom Row: Percentage Counter */}
          <div className="w-full flex justify-between items-end border-t border-slate-800 pt-6">
            <div className="text-left">
              <p className="text-xs text-gray-500 font-mono">BENGALURU, INDIA</p>
              <p className="text-xs text-gray-500 font-mono">EST. 2026</p>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="h-[2px] w-48 md:w-96 bg-slate-800 rounded-full overflow-hidden mb-2 relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-primary to-secondary absolute left-0 top-0"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-5xl md:text-8xl font-black font-mono select-none text-transparent bg-clip-text bg-gradient-to-br from-primary-light to-secondary">
                {progress.toString().padStart(3, '0')}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
