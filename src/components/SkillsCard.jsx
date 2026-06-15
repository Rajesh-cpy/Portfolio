import React from 'react';
import { motion } from 'framer-motion';

// Import required React Icons groups
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as AiIcons from 'react-icons/ai';

// Dynamically resolve icon based on icon name string
function getIconComponent(iconName) {
  if (iconName.startsWith('Fa')) {
    const IconComp = FaIcons[iconName];
    if (IconComp) return <IconComp />;
  } else if (iconName.startsWith('Si')) {
    const IconComp = SiIcons[iconName];
    if (IconComp) return <IconComp />;
  } else if (iconName.startsWith('Ai')) {
    const IconComp = AiIcons[iconName];
    if (IconComp) return <IconComp />;
  }
  return <FaIcons.FaCode />; // Default fallback icon
}

export default function SkillsCard({ skill, index }) {
  const IconElement = getIconComponent(skill.iconName);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card group relative p-4 rounded-2xl flex items-center gap-4 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-glow-primary"
    >
      {/* Icon frame */}
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300 text-xl flex-shrink-0">
        {IconElement}
      </div>

      {/* Name */}
      <div>
        <h4 className="font-bold text-sm md:text-base tracking-tight text-slate-800 dark:text-slate-100">
          {skill.name}
        </h4>
        <span className="text-[10px] font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase">
          {skill.category}
        </span>
      </div>
    </motion.div>
  );
}
