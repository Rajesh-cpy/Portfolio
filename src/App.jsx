import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import confetti from 'canvas-confetti';
import {
  FaGithub, FaLinkedin, FaEnvelope, FaDownload,
  FaArrowRight, FaCode, FaServer, FaDatabase,
  FaLaptopCode, FaCheckCircle, FaSun, FaMoon, FaBars, FaTimes,
  FaBrain
} from 'react-icons/fa';

// Import Custom Sub-components
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import HeroCanvas from './components/HeroCanvas';
import AnimatedBentoCard from './components/AnimatedBentoCard';
import SkillsCard from './components/SkillsCard';
import ProjectCard from './components/ProjectCard';
import Timeline from './components/Timeline';
import Counter from './components/Counter';
import { useTheme } from './context/ThemeContext';
import { portfolioData } from './data';
import resumePdf from './assets/Rajesh_ResumeNew.pdf';

export default function App() {
  const [loading, setLoading] = useState(true);
  const { isDark, toggleTheme } = useTheme();

  // Contact Form State
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Typing Effect Roles
  const roles = ["Full Stack Developer", "GenAI Engineer", "MERN Developer", "Problem Solver"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [typingState, setTypingState] = useState('typing');

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 2. Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Dynamic hash scroll anchor setup
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          lenis.scrollTo(targetElement, { offset: -80 });
          setMobileMenuOpen(false);
        }
      });
    });

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  // 3. Typing text effect logic
  useEffect(() => {
    if (loading) return;

    let timer;
    const currentFullRole = roles[currentRoleIndex];

    if (typingState === 'typing') {
      timer = setTimeout(() => {
        setDisplayedRole(currentFullRole.substring(0, displayedRole.length + 1));
        if (displayedRole.length + 1 === currentFullRole.length) {
          setTypingState('waiting');
        }
      }, 100);
    } else if (typingState === 'deleting') {
      timer = setTimeout(() => {
        setDisplayedRole(displayedRole.substring(0, displayedRole.length - 1));
        if (displayedRole.length === 0) {
          setTypingState('typing');
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, 50);
    } else if (typingState === 'waiting') {
      timer = setTimeout(() => {
        setTypingState('deleting');
      }, 2500); // Hold role for 2.5s
    }

    return () => clearTimeout(timer);
  }, [displayedRole, typingState, currentRoleIndex, loading]);

  // 4. Contact Form Submit
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setValidationErrors({});

    // Simple validation checks
    const errors = {};
    if (!formState.name.trim()) errors.name = 'Name is required';
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'A valid email address is required';
    }
    if (!formState.message.trim()) errors.message = 'Message content is required';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      // NOTE: ReplaceYOUR_WEB3FORMS_ACCESS_KEY with your actual key from https://web3forms.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "0d21c937-e637-4c82-8e5d-b22ffb380acc",
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });

        // Premium canvas confetti burst
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#7C3AED', '#06B6D4', '#F43F5E']
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Contact form submission failed', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. PDF Resume download logic
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'R_Rajesh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Group skills by Category
  const groupedSkills = portfolioData.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <>
      {/* 1. Page Preloading Screen */}
      <Loader onComplete={() => setLoading(false)} />

      {!loading && (
        <div className="relative min-h-screen transition-colors duration-300 font-sans">

          {/* Custom Cursor trailing dot */}
          <CustomCursor />

          {/* 2. Scroll Progress Bar */}
          <motion.div
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left"
          />

          {/* 3. Header Navigation Bar */}
          <header className="fixed top-0 left-0 right-0 z-40 glass-panel h-20 transition-all duration-300">
            <div className="max-w-6xl mx-auto h-full px-6 flex justify-between items-center">

              {/* Logo */}
              <a href="#" className="flex items-center gap-2 group clickable">
                <span className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-black text-xl shadow-glow-primary group-hover:rotate-6 transition-transform duration-300">
                  R
                </span>
                <span className="font-black text-xl tracking-tight hidden sm:block">
                  Rajesh<span className="text-secondary">.dev</span>
                </span>
              </a>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-6">
                <a href="#about" className="text-sm font-medium hover:text-primary transition-colors clickable">About</a>
                <a href="#skills" className="text-sm font-medium hover:text-primary transition-colors clickable">Skills</a>
                <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors clickable">Projects</a>
                <a href="#experience" className="text-sm font-medium hover:text-primary transition-colors clickable">Journey</a>
                <a href="#contact" className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] transition-all clickable shadow-sm shadow-glow-primary">Hire Me</a>
              </nav>

              {/* Action utilities */}
              <div className="flex items-center gap-4">
                {/* Light/Dark Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors clickable"
                  aria-label="Toggle Theme Mode"
                >
                  {isDark ? <FaSun className="text-amber-500" /> : <FaMoon className="text-primary" />}
                </button>

                {/* Hamburger mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(prev => !prev)}
                  className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors clickable"
                >
                  {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>

            {/* Mobile Nav Drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-20 left-0 right-0 glass-panel border-t border-slate-200 dark:border-slate-800/80 p-6 flex flex-col gap-4 shadow-xl z-30 md:hidden"
                >
                  <a href="#about" className="text-base font-semibold py-2 border-b border-slate-100 dark:border-slate-800 clickable">About</a>
                  <a href="#skills" className="text-base font-semibold py-2 border-b border-slate-100 dark:border-slate-800 clickable">Skills</a>
                  <a href="#projects" className="text-base font-semibold py-2 border-b border-slate-100 dark:border-slate-800 clickable">Projects</a>
                  <a href="#experience" className="text-base font-semibold py-2 border-b border-slate-100 dark:border-slate-800 clickable">Journey</a>
                  <a href="#contact" className="text-base font-semibold py-2 border-b border-slate-100 dark:border-slate-800 clickable">Contact</a>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* 4. Hero Section */}
          <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

            {/* Interactive 3D particle canvas background */}
            <HeroCanvas />

            {/* Soft Ambient Background Orbs */}
            <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full glow-gradient animate-pulse-glow z-0" />
            <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full glow-gradient-secondary animate-pulse-glow z-0" />

            <div className="max-w-4xl mx-auto px-6 relative z-20 text-center flex flex-col items-center select-none">

              {/* Glowing Top Chip */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary-light shadow-sm mb-6"
              >
                <span className="h-2 w-2 rounded-full bg-secondary animate-ping" />
                Available for software engineering roles
              </motion.div>

              {/* Large Typography Name Reveal */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 font-sans text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-400"
              >
                Building Intelligent<br />
                Full Stack Solutions
              </motion.h1>

              {/* Subtitle Roles with Typing cursor */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-10 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-700 dark:text-slate-300 font-mono flex items-center justify-center gap-1.5 mb-10"
              >
                <span>Hi, I'm Rajesh — a</span>
                <span className="text-primary dark:text-primary-light relative">
                  {displayedRole}
                  <span className="inline-block w-1.5 h-6 ml-1 bg-primary animate-pulse" />
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg hover:shadow-glow-secondary clickable"
                >
                  View Featured Projects
                  <FaArrowRight className="text-xs" />
                </a>

                <button
                  onClick={handleDownloadResume}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 font-semibold hover:scale-[1.03] active:scale-[0.98] transition-all clickable"
                >
                  Download Resume
                  <FaDownload className="text-sm" />
                </button>
              </motion.div>
            </div>
          </section>

          {/* 5. About Section (Bento Grid) */}
          <section id="about" className="relative py-24 md:py-32 grid-bg">
            <div className="max-w-6xl mx-auto px-6">

              {/* Header Titles */}
              <div className="flex flex-col items-center text-center mb-16 select-none">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase mb-2">01 / Profile Overview</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none">About R. Rajesh</h2>
              </div>

              {/* Bento Layout Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Bento Card 1: Experience summary */}
                <AnimatedBentoCard className="col-span-1 md:col-span-2">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-6">
                        <FaCode />
                      </div>
                      <h3 className="text-2xl font-bold tracking-tight mb-4">Engineering Summary</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                        I am a Computer Science Engineering candidate (Sambhram Institute, CGPA: 8.5) and dynamic full-stack developer with a passion for designing scalable software layers. Having participated as a national finalist in the <strong className="text-primary-light">IBM Expert Labs</strong> GenAI Hackathon, I specialize in combining React's component agility with efficient backend SQLite/Node configurations.
                      </p>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <div className="px-4 py-2 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono">
                        📍 Bengaluru, India
                      </div>
                      <div className="px-4 py-2 rounded bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono">
                        💻 MERN Stack
                      </div>
                    </div>
                  </div>
                </AnimatedBentoCard>

                {/* Bento Card 2: Interactive Years of Experience Counter */}
                <AnimatedBentoCard className="col-span-1" glowColor="rgba(6, 182, 212, 0.2)">
                  <div className="flex flex-col justify-between h-full text-center items-center py-6 select-none">
                    <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">Active Development</span>
                    <div className="my-8">
                      <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-secondary to-primary">
                        <Counter value={4} suffix="+" />
                      </span>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">Academic & Personal Years</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Continuous Skill Improvement</span>
                  </div>
                </AnimatedBentoCard>

                {/* Bento Card 3: Projects completed */}
                <AnimatedBentoCard className="col-span-1" glowColor="rgba(244, 63, 94, 0.2)">
                  <div className="flex flex-col justify-between h-full text-center items-center py-6 select-none">
                    <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">Project Submissions</span>
                    <div className="my-8">
                      <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-accent to-primary">
                        <Counter value={12} suffix="+" />
                      </span>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">Projects Built</p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Personal & Academic Sandbox</span>
                  </div>
                </AnimatedBentoCard>

                {/* Bento Card 4: IBM Hackathon Highlight */}
                <AnimatedBentoCard className="col-span-1 md:col-span-2">
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <span className="text-xs font-mono text-secondary uppercase tracking-widest block mb-2">High Impact Milestone</span>
                      <h3 className="text-2xl font-bold tracking-tight mb-4">IBM GenAI Hackathon Finalist</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Competed in the prestigious national hackathon organized by IBM Expert Labs. Collaborated with teammates to build a full-stack Generative AI prototype and pitch the working MVP to judges.
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 pt-4">
                      <span className="text-xs font-mono text-slate-500">Aug 2025</span>
                      <span className="text-xs text-primary-light flex items-center gap-1.5 font-bold">
                        GenAI Prototype MVP
                        <FaCheckCircle className="text-secondary" />
                      </span>
                    </div>
                  </div>
                </AnimatedBentoCard>

              </div>
            </div>
          </section>

          {/* 6. Skills Section */}
          <section id="skills" className="relative py-24 md:py-32">
            <div className="max-w-6xl mx-auto px-6">

              {/* Header Title */}
              <div className="flex flex-col items-center text-center mb-16 select-none">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-secondary uppercase mb-2">02 / Technical Stack</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">Technologies Mastered</h2>
              </div>

              {/* Skill Panels Grouped */}
              <div className="space-y-12">
                {Object.keys(groupedSkills).map((category, catIdx) => (
                  <div key={catIdx} className="glass-card p-6 md:p-8 rounded-3xl">
                    <h3 className="text-xl font-bold mb-6 tracking-tight text-primary-light border-b border-slate-200 dark:border-slate-800 pb-3 uppercase text-xs font-mono tracking-widest flex items-center gap-2">
                      {category === 'Frontend' && <FaLaptopCode />}
                      {category === 'Backend' && <FaServer />}
                      {category === 'Database' && <FaDatabase />}
                      {category === 'AI Tools' && <FaBrain />}
                      {category === 'Developer Tools' && <FaCode />}
                      {category} {category.toLowerCase().includes('tools') ? '' : 'Systems'}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {groupedSkills[category].map((skill, index) => (
                        <SkillsCard key={skill.id} skill={skill} index={index} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Featured Projects Section */}
          <section id="projects" className="relative py-24 md:py-32 grid-bg">
            <div className="max-w-6xl mx-auto px-6">

              {/* Header Titles */}
              <div className="flex flex-col items-center text-center mb-16 select-none">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase mb-2">03 / Project Showcase</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-4">Premium Projects</h2>
                <p className="text-sm md:text-base text-slate-500 max-w-xl">
                  Click on any card to view detailed specifications, complete features, and deployment parameters.
                </p>
              </div>

              {/* Projects Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {portfolioData.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>

          {/* 8. Journey Section (Timeline) */}
          <section id="experience" className="relative py-24 md:py-32">
            <div className="max-w-6xl mx-auto px-6">

              {/* Header Titles */}
              <div className="flex flex-col items-center text-center mb-16 select-none">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-primary uppercase mb-2">04 / Journey Timeline</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">Milestones & Certifications</h2>
              </div>

              {/* Scroll Timeline Visualizer */}
              <Timeline
                experience={portfolioData.experience}
                education={portfolioData.education}
              />
            </div>
          </section>

          {/* 9. Achievements Counters Section */}
          <section className="relative py-16 bg-slate-100 dark:bg-slate-800/30 border-y border-slate-200 dark:border-slate-800 select-none">
            <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

              <div>
                <span className="text-4xl md:text-5xl font-black tracking-tight text-primary">
                  <Counter value={12} suffix="+" />
                </span>
                <p className="text-xs font-mono text-slate-500 uppercase mt-2">Projects Built</p>
              </div>

              <div>
                <span className="text-4xl md:text-5xl font-black tracking-tight text-secondary">
                  <Counter value={22} suffix="+" />
                </span>
                <p className="text-xs font-mono text-slate-500 uppercase mt-2">GitHub Repos</p>
              </div>

              <div>
                <span className="text-4xl md:text-5xl font-black tracking-tight text-accent">
                  <Counter value={5} suffix="+" />
                </span>
                <p className="text-xs font-mono text-slate-500 uppercase mt-2">Hackathons Joined</p>
              </div>

              <div>
                <span className="text-4xl md:text-5xl font-black tracking-tight text-primary-light">
                  <Counter value={10} suffix="+" />
                </span>
                <p className="text-xs font-mono text-slate-500 uppercase mt-2">Certifications</p>
              </div>

            </div>
          </section>



          {/* 11. Contact Form Section */}
          <section id="contact" className="relative py-24 md:py-32 grid-bg">

            {/* Soft backdrop blur filter orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full glow-gradient z-0 opacity-40 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">

              {/* Header */}
              <div className="flex flex-col items-center text-center mb-16 select-none">
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase mb-2">05 / Get In Touch</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Let's Build Together</h2>
                <p className="text-sm md:text-base text-slate-500 max-w-lg leading-relaxed">
                  Have a challenging project, full-stack opening, or GenAI dashboard prototype to create? Send a message directly.
                </p>
              </div>

              {/* Premium Contact Form Grid */}
              <div className="glass-card p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
                <form onSubmit={handleContactSubmit} className="space-y-6">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="flex flex-col">
                      <label htmlFor="name" className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border ${validationErrors.name ? 'border-accent' : 'border-slate-200 dark:border-slate-700/80'} text-slate-800 dark:text-slate-100 focus:border-primary focus:outline-none transition-colors duration-200 clickable`}
                      />
                      {validationErrors.name && (
                        <span className="text-xs font-mono text-accent mt-1.5">{validationErrors.name}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label htmlFor="email" className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="johndoe@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border ${validationErrors.email ? 'border-accent' : 'border-slate-200 dark:border-slate-700/80'} text-slate-800 dark:text-slate-100 focus:border-primary focus:outline-none transition-colors duration-200 clickable`}
                      />
                      {validationErrors.email && (
                        <span className="text-xs font-mono text-accent mt-1.5">{validationErrors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <label htmlFor="message" className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Message Content</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Discussing a new project role..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border ${validationErrors.message ? 'border-accent' : 'border-slate-200 dark:border-slate-700/80'} text-slate-800 dark:text-slate-100 focus:border-primary focus:outline-none transition-colors duration-200 resize-none clickable`}
                    />
                    {validationErrors.message && (
                      <span className="text-xs font-mono text-accent mt-1.5">{validationErrors.message}</span>
                    )}
                  </div>

                  {/* Toast Response Alerts */}
                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium flex items-center gap-2"
                      >
                        <FaCheckCircle />
                        Thank you! Your message has been sent successfully. Celebrating with a confetti burst.
                      </motion.div>
                    )}
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium flex items-center gap-2"
                      >
                        ⚠️ A server error occurred. Please try again.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent text-white font-bold tracking-wide hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 clickable shadow-lg"
                  >
                    {isSubmitting ? 'Transmitting Inquiries...' : 'Send Message'}
                  </button>

                </form>
              </div>

            </div>
          </section>

          {/* 12. Footer */}
          <footer className="relative bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">

              {/* Left Column Brand */}
              <div className="flex flex-col items-center md:items-start select-none">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-black text-lg">
                    R
                  </span>
                  <span className="font-bold text-lg text-white">Rajesh<span className="text-secondary">.dev</span></span>
                </div>
                <p className="text-xs text-slate-500 font-mono">BENGALURU, INDIA</p>
                <p className="text-xs text-slate-500 font-mono mt-1">© 2026 R. Rajesh. All Rights Reserved.</p>
              </div>

              {/* Right Column: Dynamic Glowing Social Icons */}
              <div className="flex items-center gap-5">

                <a
                  href="https://github.com/Rajesh-cpy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 rounded-xl bg-slate-800/80 hover:bg-primary hover:text-white flex items-center justify-center text-xl text-slate-300 transition-all duration-300 border border-slate-700/80 hover:rotate-6 hover:shadow-glow-primary clickable"
                  aria-label="GitHub Repository"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://linkedin.com/in/rajeshrangar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 rounded-xl bg-slate-800/80 hover:bg-secondary hover:text-white flex items-center justify-center text-xl text-slate-300 transition-all duration-300 border border-slate-700/80 hover:-rotate-6 hover:shadow-glow-secondary clickable"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="mailto:rrajesh70326@gmail.com"
                  className="h-12 w-12 rounded-xl bg-slate-800/80 hover:bg-accent hover:text-white flex items-center justify-center text-xl text-slate-300 transition-all duration-300 border border-slate-700/80 hover:rotate-6 hover:shadow-accent clickable"
                  aria-label="Send Email Inquiry"
                >
                  <FaEnvelope />
                </a>

              </div>

            </div>
          </footer>

        </div>
      )}
    </>
  );
}
