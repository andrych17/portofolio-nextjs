"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight, ShoppingCart, Car, Sparkles, Package, Brain, CheckSquare, TrendingUp, Building2, Factory } from "lucide-react";
import { Card3D } from "./AnimationEffects";
import { FloatingCodeSnippets, CyberGrid, ScanLine, DigitalParticles } from "./CodeAnimations";

const projects = [
  {
    id: 1,
    title: "POS Systems (Multiple Variants)",
    description: "Multi-store POS systems with RFID-enabled inventory tracking for Grocery Store, Tire Shop, Jewelry Store, and Snack Store. Features AI-powered chatbot for automated reporting. Built with Laravel Livewire for real-time updates and seamless user experience.",
    image: "🛒",
    icon: ShoppingCart,
    tags: ["Laravel", "Livewire", "RFID", "MySQL", "Tailwind CSS", "Chatbot", "OpenAI"],
    github: "https://github.com/andrych17",
    live: "https://github.com/andrych17",
    color: "from-green-500 to-emerald-500",
    category: "Retail",
  },
  {
    id: 2,
    title: "Quiz Management App (Church Edition)",
    description: "Interactive quiz management platform built for church community with real-time scoring, user management, and analytics. Features Angular frontend with Spring Boot backend for robust performance.",
    image: "📝",
    icon: Brain,
    tags: ["Angular", "Spring Boot", "TypeScript", "PostgreSQL", "WebSocket"],
    github: "https://github.com/andrych17",
    live: "https://github.com/andrych17",
    color: "from-purple-500 to-indigo-500",
    category: "Education",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates, team features, and progress tracking. Next.js frontend with Laravel API backend.",
    image: "✅",
    icon: CheckSquare,
    tags: ["Next.js", "Laravel", "MySQL", "Real-time", "REST API"],
    github: "https://github.com/andrych17",
    live: "https://github.com/andrych17",
    color: "from-blue-500 to-cyan-500",
    category: "Productivity",
  },
  {
    id: 4,
    title: "AI Signal Trading App",
    description: "Mobile trading application with AI-powered signals powered by OpenAI. Cross-platform Flutter mobile app with Nest.js API for real-time market analysis and intelligent predictions.",
    image: "📈",
    icon: TrendingUp,
    tags: ["Flutter", "Nest.js", "OpenAI", "AI/ML", "WebSocket", "PostgreSQL"],
    github: "https://github.com/andrych17",
    live: "https://github.com/andrych17",
    color: "from-cyan-500 to-teal-500",
    category: "FinTech",
  },
  {
    id: 5,
    title: "Web Scraping & Automation",
    description: "Automated data collection and report generation using Puppeteer for web scraping. Built with Node.js for efficient multi-page crawling and data processing.",
    image: "🕷️",
    icon: Package,
    tags: ["Puppeteer", "Node.js", "JavaScript", "MongoDB", "Automation"],
    github: "https://github.com/andrych17",
    live: "https://github.com/andrych17",
    color: "from-orange-500 to-red-500",
    category: "Automation",
  },
  {
    id: 6,
    title: "Enterprise SaaS Platform",
    description: "Large-scale enterprise SaaS application with .NET Core backend, integrating DBS Bank, SharePoint, and OpenAI for automated reporting.",
    image: "🏢",
    icon: Building2,
    tags: [".NET Core", "Next.js", "OpenAI", "SharePoint", "SQL Server"],
    github: "https://github.com/andrych17",
    live: "https://github.com/andrych17",
    color: "from-indigo-500 to-purple-500",
    category: "Enterprise",
  },
  {
    id: 7,
    title: "Manufacturing Systems",
    description: "Industrial manufacturing systems with GIS mapping, spatial analysis tools, and production management using .NET Core and C#.",
    image: "🏭",
    icon: Factory,
    tags: [".NET Core", "C#", "QGIS", "SQL Server", "GIS"],
    github: "https://github.com/andrych17",
    live: "https://github.com/andrych17",
    color: "from-orange-500 to-red-500",
    category: "Industrial",
  },
];

const categories = ["All", "Retail", "Education", "Productivity", "FinTech", "Automation", "Enterprise", "Industrial"];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
    >
      {/* Floating Code Snippets */}
      <FloatingCodeSnippets />

      {/* Cyber Animations */}
      <CyberGrid />
      
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2"
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2"
        animate={{ x: [100, -100, 100] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 mt-6 max-w-2xl mx-auto"
          >
            A collection of projects I&apos;ve worked on, from retail POS systems to enterprise SaaS platforms.
            <span className="text-purple-400"> Click on any project to see details.</span>
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setActiveIndex(0);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Project Slider */}
        <div className="relative mb-16">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 && (
              <motion.div
                key={`${activeCategory}-${activeIndex}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-colors"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <motion.div 
                    className={`aspect-video rounded-2xl bg-gradient-to-br ${filteredProjects[activeIndex]?.color} flex items-center justify-center relative overflow-hidden group`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-30">
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                          backgroundSize: "30px 30px",
                        }}
                        animate={{ backgroundPosition: ["0px 0px", "30px 30px"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    <motion.span 
                      className="text-8xl relative z-10"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {filteredProjects[activeIndex]?.image}
                    </motion.span>
                    {/* Category badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
                      {filteredProjects[activeIndex]?.category}
                    </div>
                  </motion.div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      {filteredProjects[activeIndex]?.icon && (
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${filteredProjects[activeIndex]?.color}`}>
                          {(() => {
                            const IconComponent = filteredProjects[activeIndex]?.icon;
                            return IconComponent ? <IconComponent className="w-5 h-5 text-white" /> : null;
                          })()}
                        </div>
                      )}
                      <h3 className="text-3xl font-bold text-white">
                        {filteredProjects[activeIndex]?.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 mb-6 text-lg">
                      {filteredProjects[activeIndex]?.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {filteredProjects[activeIndex]?.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/10"
                          whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.5)" }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <motion.a
                        href={filteredProjects[activeIndex]?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={20} />
                        View Repository
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {filteredProjects.length > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                onClick={prevProject}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>
              <div className="flex items-center gap-2">
                {filteredProjects.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-8 bg-gradient-to-r from-purple-500 to-cyan-500"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
              <motion.button
                onClick={nextProject}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Project Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <Card3D key={project.id}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden ${
                    index === activeIndex ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/50" : ""
                  }`}
                  whileHover={{ y: -10 }}
                  onClick={() => setActiveIndex(index)}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  
                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                  
                  <div className="relative bg-gray-900/90 backdrop-blur-sm p-6 h-full border border-white/10 rounded-2xl group-hover:border-purple-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div 
                        className="text-4xl"
                        animate={index === activeIndex ? { 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {project.image}
                      </motion.div>
                      <motion.span 
                        className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${project.color} text-white`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {project.category}
                      </motion.span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <motion.span 
                          key={tag} 
                          className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400"
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(139, 92, 246, 0.2)" }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Card3D>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* More projects note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 mt-12"
        >
          ... and many more projects in SaaS and Manufacturing sectors
        </motion.p>
      </div>

      {/* Scroll Down */}
      <motion.a
        href="#certifications"
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500 text-sm">Scroll Down</span>
          <div className="w-6 h-6 text-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </motion.a>
    </section>
  );
}
