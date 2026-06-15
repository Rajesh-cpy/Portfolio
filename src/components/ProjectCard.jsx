import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

function getProjectFeatures(title) {
  if (title.includes('Nxt Trendz')) {
    return [
      'Secure token authorization via cookies & JWT',
      'Protected routes for secure checkout gates',
      'Dynamic sorting, search & category filters',
      'Interactive active shopping cart logs'
    ];
  }
  if (title.includes('Insurance Assistant')) {
    return [
      'Contextual responses powered by OpenAI GPT',
      'Automated policy structures search triages',
      'Interactive chat history dashboard logs',
      'Immediate claims processing evaluations'
    ];
  }
  if (title.includes('Image Generator')) {
    return [
      'Text-to-image synthesis using DALL-E models',
      'Futuristic prompt helper grids',
      'Instant PNG image download triggers',
      'Sleek community prompts feeding catalog'
    ];
  }
  if (title.includes('Wikipedia')) {
    return [
      'Async search queries using Fetch APIs',
      'Dynamic list rendering & query spotlights',
      'Highly responsive visual card rows',
      'Custom micro-interactions on hover clicks'
    ];
  }
  if (title.includes('Traffic')) {
    return [
      'Predictive model forecasting congestion flows',
      'Feature engineering & dataset cleaning',
      'Interactive performance evaluations charts',
      'Scalable local SQLite metrics registries'
    ];
  }
  if (title.includes('Complaint')) {
    return [
      'Citizen authentication portals registration',
      'Administrative ticket sorting & triage boards',
      'Automated emails tracking progress updates',
      'Safe SQLite storage ensuring persistence'
    ];
  }
  if (title.includes('URL Shortener')) {
    return [
      'Instant redirections using fast index locks',
      'Click tracking & geographic analytics logs',
      'Branded alias custom URL generators',
      'High-security redirection anti-spam triages'
    ];
  }
  if (title.includes('Food Munch')) {
    return [
      'Responsive food store layouts using Bootstrap',
      'Structured semantic tags optimizing SEO index',
      'Sleek card carousels presenting dynamic menus',
      'Optimized lightweight CSS load triggers'
    ];
  }
  return [
    'End-to-end full stack execution layers',
    'Highly responsive pixel-perfect visuals',
    'Tested SQLite/MERN databases connectivity',
    'Clean, documented developer architectures'
  ];
}

export default function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverCoords, setHoverCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHoverCoords({ x, y });
  };

  const techTags = project.techStack.split(',').map(tag => tag.trim());

  return (
    <>
      <motion.div
        layoutId={`card-container-${project.id}`}
        onClick={() => setIsOpen(true)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="glass-card group relative flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        {/* Hover Spotlight Glow */}
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(350px circle at ${hoverCoords.x}px ${hoverCoords.y}px, rgba(6, 182, 212, 0.12), transparent 85%)`
          }}
        />

        {/* Project Thumbnail Image */}
        <div className="relative h-48 md:h-56 overflow-hidden z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
          <motion.img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-primary/20 text-primary-light backdrop-blur-md border border-primary/30">
              {project.category}
            </span>
          </div>
        </div>

        {/* Details Wrapper */}
        <div className="relative z-10 flex flex-col flex-grow p-6">
          <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary-light transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
            {techTags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
              >
                {tag}
              </span>
            ))}
            {techTags.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500">
                +{techTags.length - 4} more
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Expanded Details Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/75 backdrop-blur-md">
            <motion.div
              layoutId={`card-container-${project.id}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-card relative max-w-2xl w-full rounded-3xl overflow-hidden bg-lightBg dark:bg-darkBg border border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-40 p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors clickable"
              >
                <FaTimes />
              </button>

              {/* Modal Cover Image */}
              <div className="relative h-60 md:h-72 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-lightBg dark:from-darkBg via-transparent to-transparent z-10" />
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 left-6 z-20 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              {/* Modal Details content */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                  {project.title}
                </h2>
                
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights List */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Key Features & Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
                    {getProjectFeatures(project.title).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Full Tags list */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {techTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors clickable"
                    >
                      <FaGithub className="text-lg" />
                      GitHub Repo
                    </a>
                  )}

                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity clickable"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                      Live Demo
                    </a>
                  )}

                  {project.title.includes('Nxt Trendz') && (
                    <div className="flex flex-col ml-auto bg-slate-100 dark:bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">Test Credentials</span>
                      <div className="flex items-center gap-3 text-xs font-mono text-slate-700 dark:text-slate-300">
                        <span>User: <strong className="text-primary">raja</strong></span>
                        <span>Pass: <strong className="text-primary">raja@2021</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
