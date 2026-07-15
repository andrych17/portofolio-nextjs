"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BinaryRain, CyberGrid, ScanLine, DigitalParticles } from "./CodeAnimations";
import { SpotlightCard } from "./AnimationEffects";

const skills = [
  { name: "Next.js / React", level: 95, color: "from-cyan-500 to-blue-500" },
  { name: ".NET Core / Framework", level: 92, color: "from-purple-500 to-indigo-500" },
  { name: "Node.js / Nest.js", level: 88, color: "from-green-500 to-emerald-500" },
  { name: "TypeScript / JavaScript", level: 95, color: "from-blue-500 to-cyan-500" },
  { name: "Laravel / PHP", level: 85, color: "from-red-500 to-orange-500" },
  { name: "Flutter / Dart", level: 80, color: "from-blue-400 to-cyan-400" },
  { name: "PostgreSQL / MySQL", level: 90, color: "from-yellow-500 to-orange-500" },
  { name: "Docker / DevOps", level: 82, color: "from-blue-600 to-purple-500" },
];

const skillCategories = [
  {
    title: "Frontend",
    skills: ["Next.js", "React", "Flutter", "Tailwind CSS", "JavaScript", "TypeScript"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Backend",
    skills: [".NET Core", ".NET Framework", "Node.js", "Nest.js", "Laravel", "Java Spring", "PHP"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MySQL", "SQL Server", "MongoDB"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "DevOps & Cloud",
    skills: ["AWS", "Azure", "Docker", "Git", "CI/CD", "GitHub Actions", "Jenkins", "SonarQube"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Tools & Others",
    skills: ["Selenium", "RFID Integration", "QGIS", "OpenAI API", "REST API", "GraphQL"],
    color: "from-pink-500 to-purple-500",
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 aurora-bg relative overflow-hidden"
    >
      {/* Binary Rain Effect */}
      <BinaryRain />

      {/* Cyber Animations */}
      <CyberGrid />
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(236,72,153,0.15) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }} />
        <motion.div
          className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)" }}
          animate={{ x: [-100, 100, -100], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.15), transparent 70%)" }}
          animate={{ x: [100, -100, 100], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skill Bars */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl font-semibold text-white mb-8"
            >
              Technical Proficiency
            </motion.h3>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-gray-800/60 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full shadow-[0_0_10px_rgba(168,85,247,0.3)]`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skill Categories */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl font-semibold text-white mb-8"
            >
              Technologies I Work With
            </motion.h3>
            
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + catIndex * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <SpotlightCard
                  className="p-4 cursor-default"
                  spotlightColor="rgba(6, 182, 212, 0.12)"
                  borderGlowColor="rgba(168, 85, 247, 0.2)"
                >
                  <h4 className={`text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-3`}>
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-300 transition-all cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.5 + catIndex * 0.1 + skillIndex * 0.03 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Down */}
      <motion.a
        href="#projects"
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
