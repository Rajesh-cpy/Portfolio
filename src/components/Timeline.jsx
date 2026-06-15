import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaAward, FaCalendarAlt } from 'react-icons/fa';

export default function Timeline({ experience = [], education = [] }) {
  const containerRef = useRef(null);

  // Track scroll progress of the container to animate the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Map progress to scaleY
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto px-4 md:px-0 py-12">
      {/* Dynamic Scrolling Drawing Line (Hidden on Mobile for cleaner aesthetics) */}
      <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-slate-200 dark:bg-slate-800 -translate-x-1/2 z-0 rounded-full" />
      <motion.div
        style={{ scaleY, transformOrigin: 'top' }}
        className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-primary via-secondary to-accent -translate-x-1/2 z-10 rounded-full hidden md:block"
      />

      <div className="space-y-16 relative z-20">
        {/* Category 1: Work Experience */}
        <div>
          <div className="flex items-center gap-3 mb-10 md:justify-center">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 backdrop-blur-md">
              <FaBriefcase className="text-2xl" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">Hackathon Experiences & Workshops</h3>
          </div>

          <div className="space-y-12">
            {experience.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={`exp-${item.id}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-stretch w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Space filler / Left panel */}
                  <div className="w-full md:w-1/2 flex justify-start md:justify-end px-4 md:px-8 text-left md:text-right" />

                  {/* Circle Marker on Center Line */}
                  <div className="relative flex justify-start md:justify-center z-30">
                    <div className="absolute left-0 md:left-auto h-8 w-8 rounded-full border-4 border-slate-900 dark:border-slate-900 bg-secondary flex items-center justify-center text-white text-xs shadow-glow-secondary transform -translate-x-1/2 md:translate-x-0">
                      <FaBriefcase />
                    </div>
                  </div>

                  {/* Card Content Panel */}
                  <div className="w-full md:w-1/2 pl-8 md:pl-8 pr-4 py-2 text-left">
                    <div className="glass-card p-6 md:p-8 rounded-3xl hover:border-secondary/40 transition-colors duration-300">
                      <span className="flex items-center gap-2 text-xs font-mono text-secondary mb-2">
                        <FaCalendarAlt />
                        {item.duration}
                      </span>
                      <h4 className="text-lg md:text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                        {item.role}
                      </h4>
                      <p className="text-sm font-medium text-primary mb-4">{item.company}</p>

                      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        {item.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Category 2: Education */}
        <div className="pt-8">
          <div className="flex items-center gap-3 mb-10 md:justify-center">
            <div className="p-3 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20 backdrop-blur-md">
              <FaGraduationCap className="text-2xl" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">Academic Milestones</h3>
          </div>

          <div className="space-y-12">
            {education.map((item, index) => {
              const isEven = index % 2 !== 0; // Alternate start
              return (
                <motion.div
                  key={`edu-${item.id}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-stretch w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Space filler */}
                  <div className="w-full md:w-1/2 flex justify-start md:justify-end px-4 md:px-8" />

                  {/* Circle Marker */}
                  <div className="relative flex justify-start md:justify-center z-30">
                    <div className="absolute left-0 md:left-auto h-8 w-8 rounded-full border-4 border-slate-900 dark:border-slate-900 bg-primary flex items-center justify-center text-white text-xs shadow-glow-primary transform -translate-x-1/2 md:translate-x-0">
                      <FaGraduationCap />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 pl-8 md:pl-8 pr-4 py-2 text-left">
                    <div className="glass-card p-6 md:p-8 rounded-3xl hover:border-primary/40 transition-colors duration-300">
                      <span className="flex items-center gap-2 text-xs font-mono text-primary-light mb-2">
                        <FaCalendarAlt />
                        {item.duration}
                      </span>
                      <h4 className="text-lg md:text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                        {item.degree}
                      </h4>
                      <p className="text-sm font-medium text-secondary mb-3">{item.institution}</p>

                      <div className="inline-block px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {item.cgpa}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
