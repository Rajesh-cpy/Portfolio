export const portfolioData = {
  education: [
    { id: 1, institution: 'Sambhram Institute of Technology, Bengaluru', degree: 'B.E. in Computer Science Engineering (CSE)', duration: '2022 – 2026', cgpa: 'CGPA: 8.5' },
    { id: 2, institution: 'Nxtwave Disruptive Technologies', degree: 'Industry Ready Certification in Full-Stack Development', duration: 'Nov 2022 – Ongoing', cgpa: 'Certified Developer' },
    { id: 3, institution: 'Siddaganga PU College, Tumkur', degree: 'Intermediate (PCMC)', duration: '2020 – 2022', cgpa: 'CGPA: 7.1' },
    { id: 4, institution: 'A.V.R EM School, Rayadurgam', degree: 'Secondary School Certificate (SSC)', duration: '2019 – 2020', cgpa: 'CGPA: 9.9' }
  ],
  experience: [
    {
      id: 1,
      role: 'GenAI Prototype Developer (National Hackathon Finalist)',
      company: 'IBM Expert Labs',
      duration: 'August 2025',
      bullets: [
        'Participated in the prestigious national-level GenAI Hackathon organized by IBM Expert Labs.',
        'Shortlisted among the top finalist teams nationwide for technical excellence and MVP innovation.',
        'Collaborated in a team to build and present a MERN stack and GenAI-powered prototype within a high-pressure timeline.',
        'Developed core responsive React.js UI features, robust Node.js backend controllers, and rapid API integrations.'
      ]
    },
    {
      id: 2,
      role: 'Data Visualization & Modeling Workshop',
      company: 'Skill Development Program (SDP) – Power BI',
      duration: 'October 2024',
      bullets: [
        'Created highly interactive analytical dashboards using Power BI toolkits.',
        'Applied structured data modeling techniques to visualize cross-functional insights.',
        'Built custom business intelligence views to support metric tracking and data exploration.'
      ]
    },
    {
      id: 3,
      role: 'Full Stack Development Trainee',
      company: 'Nxtwave Disruptive Technologies',
      duration: 'April 2023',
      bullets: [
        'Completed rigorous hands-on sessions covering Full Stack Development fundamentals.',
        'Gained deep experience in data preprocessing, feature engineering, and validation datasets.',
        'Built, trained, and evaluated prediction and classification models using Python.'
      ]
    }
  ],
  skills: [
    { category: 'Frontend', name: 'React.js', iconName: 'FaReact' },
    { category: 'Frontend', name: 'JavaScript', iconName: 'FaJs' },
    { category: 'Frontend', name: 'HTML5', iconName: 'FaHtml5' },
    { category: 'Frontend', name: 'CSS3', iconName: 'FaCss3Alt' },
    { category: 'Frontend', name: 'Bootstrap', iconName: 'FaBootstrap' },
    { category: 'Frontend', name: 'Tailwind CSS', iconName: 'SiTailwindcss' },
    { category: 'Frontend', name: 'Responsive UI', iconName: 'FaLaptopCode' },
    { category: 'Backend', name: 'Node.js', iconName: 'FaNodeJs' },
    { category: 'Backend', name: 'Express.js', iconName: 'SiExpress' },
    { category: 'Backend', name: 'Python', iconName: 'FaPython' },
    { category: 'Backend', name: 'REST APIs', iconName: 'AiOutlineApi' },
    { category: 'Backend', name: 'JWT Auth', iconName: 'SiJsonwebtokens' },
    { category: 'Database', name: 'SQLite', iconName: 'SiSqlite' },
    { category: 'Database', name: 'MongoDB', iconName: 'SiMongodb' },
    { category: 'Database', name: 'Supabase', iconName: 'SiSupabase' },
    { category: 'Database', name: 'Cloudinary', iconName: 'SiCloudinary' },
    { category: 'AI Tools', name: 'OpenAI APIs', iconName: 'SiOpenai' },
    { category: 'AI Tools', name: 'Hugging Face', iconName: 'SiHuggingface' },
    { category: 'Developer Tools', name: 'Power BI', iconName: 'SiPowerbi' },
    { category: 'Developer Tools', name: 'Postman', iconName: 'SiPostman' },
    { category: 'Developer Tools', name: 'VS Code', iconName: 'SiVisualstudiocode' },
    { category: 'Developer Tools', name: 'Git', iconName: 'FaGitAlt' },
    { category: 'Developer Tools', name: 'GitHub', iconName: 'FaGithub' }
  ],
  projects: [
    {
      id: 3,
      title: 'AI Resume Analyzer',
      description: 'An AI-powered resume analysis platform that evaluates resumes, provides detailed feedback, identifies strengths and weaknesses, and offers actionable suggestions to improve ATS compatibility and job application success rates.',
      techStack: 'React.js, Node.js, Express.js, JavaScript, AI/ML, Vercel, HTML5, CSS3',
      githubUrl: 'https://github.com/Rajesh-cpy/AI-Resume_Analyzer',
      liveUrl: 'https://ai-resume-analyzer-ruddy-ten.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      category: 'AI/ML'
    },
    {
      id: 1,
      title: 'Nxt Trendz (E-Commerce Clone)',
      description: 'Premium e-commerce platform featuring secure JWT authentication, dynamic routing, active cart management, cookie-based token handling, and clean responsive store interfaces.',
      techStack: 'React.js, JavaScript, Node.js, Express.js, JWT Auth, Bootstrap, CSS',
      githubUrl: 'https://github.com/Rajesh-cpy',
      liveUrl: 'https://nxtbyrajesh.ccbp.tech',
      imageUrl: 'https://i.ibb.co/dJ0HQ9PT/Screenshot-2026-06-15-121142.png',
      category: 'Personal'
    },
    {
      id: 5,
      title: 'Traffic Flow Prediction',
      description: 'AI model interface built to analyze urban sensor feeds and predict roadway congestion, improving commuter navigation metrics.',
      techStack: 'Python, ML Fundamentals, SQLite, Node.js, Tailwind CSS',
      githubUrl: 'https://github.com/Rajesh-cpy/bengaluru-traffic-predictor',
      liveUrl: '#',
      imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=600&auto=format&fit=crop',
      category: 'Engineering'
    },
    {
      id: 8,
      title: 'IPL Dashboard',
      description: 'A dynamic IPL dashboard application that displays team-wise match information, latest match details, and recent match results using API integration. Features responsive design, team-specific pages, and seamless navigation for an engaging cricket statistics experience.',
      techStack: 'React.js, JavaScript, HTML5, CSS3, REST API',
      githubUrl: 'https://github.com/Rajesh-cpy/IPL_Dashboard',
      liveUrl: 'https://ipldashbrdbyraj.ccbp.tech',
      imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=600&auto=format&fit=crop',
      category: 'Personal'
    },
    {
      id: 6,
      title: 'Money Manager',
      description: 'A personal finance management application that helps users track income, expenses, and account balances in real time. Features transaction management, financial summaries, and an intuitive responsive interface for effective budget tracking.',
      techStack: 'React.js, JavaScript, HTML5, CSS3',
      githubUrl: 'https://github.com/Rajesh-cpy/Money-Manager',
      liveUrl: 'https://moneyMngApp.ccbp.tech',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop',
      category: 'Personal'
    },
    {
      id: 4,
      title: 'Wikipedia Search App',
      description: 'High-speed Wikipedia interface using custom asynchronous REST APIs, dynamic list rendering, search result spotlights, and micro-interactions.',
      techStack: 'HTML, CSS, JavaScript, REST API, Fetch API',
      githubUrl: '#',
      liveUrl: 'https://wikiappbyrajesh.ccbp.tech',
      imageUrl: 'https://i.ibb.co/xqzYVGHp/image.png',
      category: 'Personal'
    },
    {
      id: 2,
      title: 'Number Guessing Game',
      description: 'An interactive browser-based game where players try to guess a randomly generated number within limited attempts. Features instant feedback, score tracking, and a responsive user interface built with vanilla JavaScript.',
      techStack: 'HTML5, CSS3, JavaScript',
      githubUrl: 'https://github.com/Rajesh-cpy/Number-Guessing-Game',
      liveUrl: 'https://rajesh-cpy.github.io/Number-Guessing-Game/',
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
      category: 'Personal'
    },
    {
      id: 7,
      title: 'Food Munch WebApp',
      description: 'Highly responsive food-store showcase displaying dynamic menus, interactive pricing cards, and sleek grid layouts.',
      techStack: 'HTML, CSS, Bootstrap, Flexbox',
      githubUrl: 'https://github.com/Rajesh-cpy',
      liveUrl: 'https://foodmunchrrr.ccbp.tech',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop',
      category: 'Personal'
    }
  ]
};
