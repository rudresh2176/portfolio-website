"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Instagram,
  Download,
  ChevronDown,
  ExternalLink,
  Cpu,
  Wifi,
  Code2,
  Zap,
  Award,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  X,
  Send,
  Sun,
  Moon,
  Menu,
  ArrowUpRight,
  Brain,
  CircuitBoard,
  Sparkles,
} from "lucide-react";

/* ─────────────────────── DATA ─────────────────────── */

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: 15, label: "Projects Completed" },
  { value: 8, label: "Technologies Mastered" },
  { value: 5, label: "Certifications" },
  { value: 3, suffix: "+", label: "Years Learning" },
];

const projects = [
  {
    id: "transformer",
    title: "AI-Based Transformer Monitoring",
    description: "Predictive maintenance system using ML algorithms for early fault detection in power transformers.",
    category: "ai",
    tags: ["Python", "Random Forest", "LSTM"],
    icon: <CircuitBoard className="w-8 h-8" />,
    color: "from-amber-900/40 to-yellow-900/20",
    full: {
      problem: "Power transformers are critical infrastructure that often fail unexpectedly, leading to costly downtime and repairs.",
      solution: "Developed an ML-powered monitoring system that analyzes sensor data in real-time to predict potential failures before they occur.",
      features: ["Real-time sensor data collection", "Random Forest classification model", "LSTM time-series prediction", "Alert system for maintenance teams", "Historical data analysis dashboard"],
      tech: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "Arduino", "Firebase"],
      results: "94% accuracy in fault prediction, reducing maintenance costs by 40%",
    },
  },
  {
    id: "iot-dashboard",
    title: "IoT Electrical Dashboard",
    description: "Real-time monitoring dashboard for electrical parameters with cloud integration and alerts.",
    category: "iot",
    tags: ["ESP32", "Firebase", "React"],
    icon: <Wifi className="w-8 h-8" />,
    color: "from-emerald-900/40 to-green-900/20",
    full: {
      problem: "Traditional electrical monitoring systems lack remote accessibility and real-time alerting capabilities.",
      solution: "Built an IoT-enabled dashboard with cloud integration for remote monitoring and instant notifications.",
      features: ["Real-time voltage/current monitoring", "Cloud data storage", "Mobile-responsive dashboard", "Customizable alert thresholds", "Energy consumption analytics"],
      tech: ["ESP32", "Firebase", "React", "Chart.js", "WebSocket"],
      results: "Deployed in 3 facilities, monitoring 50+ electrical points",
    },
  },
  {
    id: "fault-detection",
    title: "Random Forest Fault Detection",
    description: "Machine learning model for classifying electrical faults with 94% accuracy.",
    category: "ai",
    tags: ["Python", "Scikit-learn", "Pandas"],
    icon: <Brain className="w-8 h-8" />,
    color: "from-rose-900/40 to-red-900/20",
    full: {
      problem: "Manual fault classification is time-consuming and requires expert knowledge.",
      solution: "Developed an automated classification system using Random Forest algorithm with 94% accuracy.",
      features: ["Multi-class fault classification", "Feature importance analysis", "Real-time inference", "Model performance metrics"],
      tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib"],
      results: "94% classification accuracy across 6 fault types",
    },
  },
  {
    id: "lstm",
    title: "LSTM Predictive Maintenance",
    description: "Deep learning model for predicting equipment failures using time-series sensor data.",
    category: "ai",
    tags: ["TensorFlow", "Keras", "LSTM"],
    icon: <Cpu className="w-8 h-8" />,
    color: "from-violet-900/40 to-purple-900/20",
    full: {
      problem: "Traditional maintenance schedules are inefficient and don't account for actual equipment condition.",
      solution: "Implemented LSTM neural networks for accurate prediction of equipment degradation patterns.",
      features: ["Time-series data preprocessing", "LSTM model architecture", "Multi-step forecasting", "Confidence interval estimation"],
      tech: ["TensorFlow", "Keras", "Python", "Pandas", "NumPy"],
      results: "91% accuracy in predicting failures 7 days in advance",
    },
  },
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    description: "Modern, responsive portfolio with smooth animations and dark mode support.",
    category: "web",
    tags: ["HTML/CSS", "JavaScript", "Tailwind"],
    icon: <Code2 className="w-8 h-8" />,
    color: "from-sky-900/40 to-blue-900/20",
    full: {
      problem: "Need for a professional online presence to showcase technical skills and projects.",
      solution: "Designed and developed a premium portfolio website with modern web technologies.",
      features: ["Responsive design", "Dark/Light mode", "Smooth animations", "Interactive elements", "SEO optimized"],
      tech: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
      results: "Improved visibility and professional presentation",
    },
  },
  {
    id: "automation",
    title: "Sensor-Based Automation",
    description: "Intelligent automation system using multiple sensors for smart home applications.",
    category: "iot",
    tags: ["Arduino", "Sensors", "C++"],
    icon: <Zap className="w-8 h-8" />,
    color: "from-lime-900/40 to-green-900/20",
    full: {
      problem: "Traditional home automation lacks intelligence and adaptability to user behavior.",
      solution: "Created a sensor-driven automation system with intelligent decision-making capabilities.",
      features: ["Multi-sensor integration", "Automated appliance control", "Energy optimization", "Manual override capability", "Mobile app control"],
      tech: ["Arduino", "ESP32", "C++", "Sensors", "Mobile App"],
      results: "30% reduction in energy consumption",
    },
  },
];

const skills = [
  {
    title: "AI & Machine Learning",
    description: "Neural networks, predictive modeling, and intelligent systems development.",
    icon: <Brain className="w-6 h-6" />,
    level: 90,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "IoT Development",
    description: "Embedded systems, sensor networks, and connected device solutions.",
    icon: <Wifi className="w-6 h-6" />,
    level: 85,
    gradient: "from-emerald-500 to-green-600",
  },
  {
    title: "Web Development",
    description: "Modern frontend and backend development with responsive design.",
    icon: <Code2 className="w-6 h-6" />,
    level: 80,
    gradient: "from-sky-500 to-blue-600",
  },
  {
    title: "Electrical Engineering",
    description: "Circuit design, power systems, and electrical infrastructure.",
    icon: <CircuitBoard className="w-6 h-6" />,
    level: 88,
    gradient: "from-violet-500 to-purple-600",
  },
];

const techStack = [
  "Python", "TensorFlow", "Keras", "Scikit-learn", "Arduino", "ESP32",
  "HTML5", "CSS3", "JavaScript", "React", "Next.js", "Firebase",
  "Git", "Pandas", "NumPy", "REST APIs",
];

const education = [
  {
    title: "B.E. in Electrical & Electronics Engineering",
    period: "2021 - Present",
    detail: "Specializing in AI-powered electrical systems. CGPA: 8.5/10",
  },
  {
    title: "Pre-University (PUC)",
    period: "2019 - 2021",
    detail: "Science stream with Computer Science. Score: 92%",
  },
  {
    title: "Secondary School (10th)",
    period: "2019",
    detail: "Score: 90%",
  },
];

const certifications = [
  { title: "Machine Learning Specialization", org: "Coursera - Stanford University" },
  { title: "IoT & Embedded Systems", org: "NPTEL - IIT" },
  { title: "Web Development Bootcamp", org: "Udemy" },
];

/* ─────────────── ANIMATION VARIANTS ─────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ─────────────── SECTION WRAPPER ─────────────── */

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={`py-20 md:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center mb-14">
      <motion.span variants={fadeUp} className="inline-block text-sm font-semibold tracking-widest uppercase gradient-text mb-4">
        {label}
      </motion.span>
      <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl lg:text-5xl font-bold font-[Poppins] leading-tight">
        {title}
      </motion.h2>
    </div>
  );
}

/* ─────────────────── COUNTER ─────────────────── */

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ═══════════════════ MAIN PAGE ═══════════════════ */

export default function Home() {
  const [dark, setDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  /* Theme - initialize without setState to avoid cascading render */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = useCallback(() => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  /* Scroll */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* Parallax hero */
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  /* Smooth scroll */
  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* Form */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 2500);
    }, 1500);
  };

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ─────── NAVIGATION ─────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 glass shadow-lg shadow-black/5"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-1 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <span className="text-xl font-bold font-[Poppins] tracking-tight text-foreground">
              Rudresh
            </span>
            <span className="gradient-text text-xl font-bold font-[Poppins]">.</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors rounded-lg hover:bg-accent/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:border-accent hover:bg-accent/5 transition-all"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center border border-border"
              aria-label="Open menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* ─────── MOBILE MENU ─────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center border border-border"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-semibold font-[Poppins] hover:text-accent transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────── HERO ─────── */}
      <motion.section
        id="hero"
        className="min-h-screen relative flex items-center grain-overlay"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 hero-pattern opacity-40" />
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-olive/15 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 py-32 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-accent/30 bg-accent/5 text-accent">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for opportunities
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={1}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[Poppins] leading-[1.05] tracking-tight"
              >
                Rudresh B{" "}
                <span className="gradient-text">Sakri</span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                EEE Student <span className="text-accent mx-2">|</span> AI Developer{" "}
                <span className="text-accent mx-2">|</span> IoT Innovator{" "}
                <span className="text-accent mx-2">|</span> Web Developer
              </motion.p>

              <motion.p variants={fadeUp} custom={3} initial="hidden" animate="visible" className="text-base text-muted-foreground max-w-lg leading-relaxed">
                Bridging the gap between electrical engineering and intelligent systems. I build AI-powered IoT solutions that transform how we monitor and maintain critical infrastructure.
              </motion.p>

              <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible" className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => scrollTo("#projects")}
                  className="px-8 py-3.5 rounded-full font-semibold font-[Poppins] text-sm bg-gradient-to-r from-accent to-gold-dark text-charcoal hover:shadow-lg hover:shadow-accent/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  View Portfolio
                </button>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="px-8 py-3.5 rounded-full font-semibold font-[Poppins] text-sm border-2 border-border hover:border-accent hover:text-accent transition-all"
                >
                  Contact Me
                </button>
              </motion.div>

              {/* Social */}
              <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible" className="flex items-center gap-3 pt-4">
                {[
                  { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: <Github className="w-4 h-4" />, href: "https://github.com", label: "GitHub" },
                  { icon: <Mail className="w-4 h-4" />, href: "mailto:rudreshsakri8@email.com", label: "Email" },
                  { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com", label: "Instagram" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent hover:-translate-y-1 transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right - Profile image */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="hidden lg:block relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glow-gold border-2 border-accent/20">
                <img
                  src="/profile.jpg"
                  alt="Rudresh B Sakri"
                  className="w-full h-full object-cover object-top"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-5 -right-5 glass px-5 py-2.5 rounded-2xl float-gentle shadow-lg">
                <span className="text-sm font-semibold gradient-text flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> AI/ML
                </span>
              </div>
              <div className="absolute -bottom-5 -left-5 glass px-5 py-2.5 rounded-2xl float-gentle shadow-lg" style={{ animationDelay: "1.5s" }}>
                <span className="text-sm font-semibold gradient-text flex items-center gap-1.5">
                  <Wifi className="w-4 h-4" /> IoT Developer
                </span>
              </div>
              <div className="absolute top-1/2 -right-8 glass px-5 py-2.5 rounded-2xl float-gentle shadow-lg" style={{ animationDelay: "3s" }}>
                <span className="text-sm font-semibold gradient-text flex items-center gap-1.5">
                  <Code2 className="w-4 h-4" /> Web Dev
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-7 h-11 rounded-full border-2 border-accent/40 flex justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-accent" />
          </div>
        </motion.div>
      </motion.section>

      {/* ─────── STATS ─────── */}
      <section className="py-16 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold font-[Poppins] gradient-text">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────── ABOUT ─────── */}
      <Section id="about">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <motion.span variants={fadeUp} className="text-sm font-semibold tracking-widest uppercase gradient-text">
                About Me
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold font-[Poppins] leading-tight">
                Engineering Intelligent Solutions for Tomorrow
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-muted-foreground leading-relaxed">
                I&apos;m an Electrical and Electronics Engineering student with a deep passion for artificial intelligence and IoT systems. My work sits at the intersection of traditional electrical engineering and cutting-edge technology, where I develop smart monitoring systems and predictive maintenance solutions that address real-world challenges.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base text-muted-foreground leading-relaxed">
                My flagship project, an AI-Based Transformer Monitoring System, uses Random Forest and LSTM models to predict equipment failures before they happen. I believe in building technology that not only solves problems but anticipates them, creating proactive rather than reactive solutions for critical infrastructure.
              </motion.p>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3 text-accent group-hover:bg-accent/20 transition-colors">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold font-[Poppins] text-sm">AI/ML Models</h4>
                  <p className="text-xs text-muted-foreground mt-1">Random Forest, LSTM, Neural Networks</p>
                </div>
                <div className="p-5 rounded-2xl bg-card border border-border hover:border-accent/40 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3 text-accent group-hover:bg-accent/20 transition-colors">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold font-[Poppins] text-sm">IoT Systems</h4>
                  <p className="text-xs text-muted-foreground mt-1">Arduino, ESP32, Sensor Networks</p>
                </div>
              </motion.div>
            </div>

            {/* About visual */}
            <motion.div variants={fadeUp} className="relative hidden lg:block">
              <div className="aspect-square rounded-3xl bg-card border border-border overflow-hidden relative">
                {/* Circuit board inspired SVG */}
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="400" y2="400">
                      <stop offset="0%" stopColor="#D4A574" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3A4A3A" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="400" fill="url(#g1)" />
                  {/* Grid dots */}
                  {Array.from({ length: 64 }).map((_, i) => {
                    const x = (i % 8) * 50 + 25;
                    const y = Math.floor(i / 8) * 50 + 25;
                    return <circle key={i} cx={x} cy={y} r="2" fill="#D4A574" opacity="0.25" />;
                  })}
                  {/* Circuit lines */}
                  <path d="M75 75h100v100h100" stroke="#D4A574" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
                  <path d="M325 75H225v150H125" stroke="#3A4A3A" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
                  <path d="M75 325h150V225h150" stroke="#D4A574" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
                  {/* Central chip */}
                  <rect x="150" y="150" width="100" height="100" rx="16" fill="var(--card)" stroke="#D4A574" strokeWidth="2" opacity="0.8" />
                  <text x="200" y="195" textAnchor="middle" fill="#D4A574" fontSize="11" fontFamily="Poppins" fontWeight="600">AI</text>
                  <text x="200" y="215" textAnchor="middle" fill="#D4A574" fontSize="8" fontFamily="Inter" opacity="0.7">+ IoT</text>
                  {/* Connection nodes */}
                  <circle cx="150" cy="175" r="4" fill="#D4A574" opacity="0.6" />
                  <circle cx="250" cy="175" r="4" fill="#D4A574" opacity="0.6" />
                  <circle cx="150" cy="225" r="4" fill="#3A4A3A" opacity="0.6" />
                  <circle cx="250" cy="225" r="4" fill="#3A4A3A" opacity="0.6" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ─────── PROJECTS ─────── */}
      <Section id="projects">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading label="Portfolio" title="Featured Projects" />

          {/* Filter tabs */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { key: "all", label: "All Projects" },
              { key: "ai", label: "AI/ML" },
              { key: "iot", label: "IoT" },
              { key: "web", label: "Web Dev" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === tab.key
                    ? "bg-foreground text-background shadow-lg"
                    : "border border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Project image area */}
                  <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-accent/60 group-hover:scale-110 transition-transform duration-500">
                      {project.icon}
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-5 h-5 text-accent" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold font-[Poppins] group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground border border-border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-card rounded-3xl border border-border shadow-2xl"
            >
              {/* Modal header */}
              <div className={`h-48 bg-gradient-to-br ${selectedProject.color} flex items-center justify-center rounded-t-3xl relative`}>
                <div className="text-accent/60 text-5xl">{selectedProject.icon}</div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold font-[Poppins]">{selectedProject.title}</h2>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                    <h4 className="text-sm font-semibold text-accent mb-2">Problem</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.full.problem}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border">
                    <h4 className="text-sm font-semibold text-accent mb-2">Solution</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.full.solution}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-accent mb-4">Key Features</h4>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {selectedProject.full.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-accent mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.full.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary border border-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-accent/5 border border-accent/20">
                  <h4 className="text-sm font-semibold text-accent mb-2">Results</h4>
                  <p className="text-sm text-muted-foreground">{selectedProject.full.results}</p>
                </div>

                <div className="flex gap-4 pt-2">
                  <a href="#" className="px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-accent to-gold-dark text-charcoal hover:shadow-lg hover:shadow-accent/20 transition-all flex items-center gap-2">
                    View on GitHub <ExternalLink className="w-4 h-4" />
                  </a>
                  <a href="#" className="px-6 py-3 rounded-full text-sm font-semibold border-2 border-border hover:border-accent hover:text-accent transition-all">
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ─────── SKILLS ─────── */}
      <Section id="skills">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading label="Expertise" title="Technical Skills" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                variants={fadeUp}
                custom={i}
                className="bg-card rounded-2xl border border-border p-6 hover:border-accent/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent to-gold-dark scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center text-white mb-4`}>
                  {skill.icon}
                </div>
                <h4 className="font-semibold font-[Poppins] text-sm mb-2">{skill.title}</h4>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{skill.description}</p>
                {/* Progress */}
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-2 block">{skill.level}% Proficiency</span>
              </motion.div>
            ))}
          </div>

          {/* Tech stack tags */}
          <motion.div variants={fadeUp} className="mt-16 text-center">
            <h3 className="text-xl font-bold font-[Poppins] mb-8">Technologies & Tools</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-card border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ─────── EXPERIENCE ─────── */}
      <Section id="experience">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading label="Journey" title="Education & Experience" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Education Timeline */}
            <div>
              <motion.h3 variants={fadeUp} className="text-xl font-bold font-[Poppins] mb-8 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-accent" /> Education
              </motion.h3>
              <div className="space-y-0">
                {education.map((edu, i) => (
                  <motion.div key={edu.title} variants={fadeUp} custom={i} className="relative pl-10 pb-8 last:pb-0">
                    {/* Timeline dot and line */}
                    <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-accent shadow-[0_0_12px_rgba(212,165,116,0.4)]" />
                    {i < education.length - 1 && (
                      <div className="absolute left-[6px] top-5 bottom-0 w-px bg-border" />
                    )}
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="font-semibold font-[Poppins] text-sm">{edu.title}</h4>
                      <span className="text-xs text-accent whitespace-nowrap font-medium">{edu.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{edu.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <motion.h3 variants={fadeUp} className="text-xl font-bold font-[Poppins] mb-8 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" /> Certifications
              </motion.h3>
              <div className="space-y-4">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    variants={fadeUp}
                    custom={i}
                    className="p-5 rounded-2xl bg-card border border-border hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 text-accent">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{cert.title}</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">{cert.org}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider max-w-4xl mx-auto" />

      {/* ─────── CONTACT ─────── */}
      <Section id="contact">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <span className="text-sm font-semibold tracking-widest uppercase gradient-text">Get In Touch</span>
                <h2 className="text-3xl md:text-4xl font-bold font-[Poppins] mt-4 leading-tight">
                  Let&apos;s Build Something Together
                </h2>
                <p className="text-base text-muted-foreground mt-4 leading-relaxed">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let&apos;s connect and make something amazing.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: "Email", value: "rudreshsakri8@email.com" },
                  { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+91 78997 72176" },
                  { icon: <MapPin className="w-5 h-5" />, label: "Location", value: "Karnataka, India" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-accent flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-accent to-gold-dark text-charcoal hover:shadow-lg hover:shadow-accent/20 transition-all"
              >
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </div>

            {/* Contact form */}
            <motion.div variants={fadeUp} className="bg-card rounded-3xl border border-border p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full py-3.5 rounded-full text-sm font-semibold font-[Poppins] transition-all flex items-center justify-center gap-2 ${
                    sent
                      ? "bg-emerald-500 text-white"
                      : "bg-gradient-to-r from-accent to-gold-dark text-charcoal hover:shadow-lg hover:shadow-accent/20"
                  }`}
                >
                  {sending ? (
                    "Sending..."
                  ) : sent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─────── FOOTER ─────── */}
      <footer className="py-12 bg-secondary/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <a href="#" className="text-xl font-bold font-[Poppins] tracking-tight">
                Rudresh<span className="gradient-text">.</span>
              </a>
              <p className="text-sm text-muted-foreground mt-1">AI Developer & IoT Innovator</p>
            </div>

            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {[
                { icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: <Github className="w-4 h-4" />, href: "https://github.com", label: "GitHub" },
                { icon: <Mail className="w-4 h-4" />, href: "mailto:rudreshsakri8@email.com", label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 text-center border-t border-border">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 Rudresh B Sakri. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-accent text-charcoal flex items-center justify-center shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-shadow"
            aria-label="Back to top"
          >
            <ChevronDown className="w-5 h-5 rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
