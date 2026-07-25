"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { GlitchText } from "./CodeAnimations";
import ThreeBackground from "./ThreeBackground";
import { useLanguage } from "@/context/LanguageContext";
import { getYearsOfExperience } from "@/utils/experience";

const rolesEn = [
  "Fullstack Developer",
  "Backend Specialist", 
  "Frontend Engineer",
  "Cloud Architect",
];

const rolesId = [
  "Fullstack Developer",
  "Pengembang Backend", 
  "Frontend Engineer",
  "Arsitek Cloud",
];

export default function Hero() {
  const { lang } = useLanguage();
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = lang === "id" ? rolesId : rolesEn;
  const yearsOfExperience = getYearsOfExperience();

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden aurora-bg"
    >
      {/* Three.js Galaxy Animation */}
      <ThreeBackground />

      {/* Dark overlay so text stays readable over Three.js */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "rgba(3,0,20,0.55)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 0%, rgba(3,0,20,0.8) 100%)",
        }}
      />

      <div className="relative z-10 text-center px-4">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-block mb-6"
        >
          <motion.div
            className="px-5 py-2.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full backdrop-blur-md neon-glow-purple"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-sm font-medium">
              <Sparkles className="w-4 h-4 inline-block mr-1 text-amber-400" />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                {lang === "id" ? `${yearsOfExperience}+ Tahun Pengalaman` : `${yearsOfExperience}+ Years of Experience`}
              </span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-xl mb-4 neon-text-pink"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-medium">
              {lang === "id" ? "Halo, Saya" : "Hello, I'm"}
            </span>
          </motion.p>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            color: "#ffffff",
            textShadow: "0 0 40px rgba(168,85,247,0.6), 0 0 80px rgba(236,72,153,0.3)",
          }}
        >
          <GlitchText>Andry Huang</GlitchText>
        </motion.h1>

        <motion.div
          className="text-2xl md:text-3xl mb-8 h-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent font-medium">
            {displayText}
          </span>
          <motion.span
            className="inline-block w-0.5 h-8 bg-gradient-to-b from-pink-500 to-purple-500 ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </motion.div>

        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {lang === "id" ? (
            <>
              Membangun platform <span className="text-purple-400 font-medium">SaaS berskala besar</span>,{" "}
              <span className="text-cyan-400 font-medium">aplikasi web modern</span>, dan{" "}
              <span className="text-pink-400 font-medium">solusi berbasis cloud & AI</span>.{" "}
              Ahli dalam .NET Core, Next.js, React, Node.js, dan teknologi modern.
            </>
          ) : (
            <>
              Building large-scale <span className="text-purple-400 font-medium">SaaS platforms</span>,{" "}
              <span className="text-cyan-400 font-medium">web applications</span>, and{" "}
              <span className="text-pink-400 font-medium">cloud & AI-integrated solutions</span>.{" "}
              Skilled in .NET Core, Next.js, React, Node.js, and modern technologies.
            </>
          )}
        </motion.p>

        <motion.div
          className="flex justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {[
            { icon: Github, href: "https://github.com/andrych17", label: "GitHub", color: "hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]" },
            { icon: Linkedin, href: "https://linkedin.com/in/andry-huang-ba410a170", label: "LinkedIn", color: "hover:border-blue-500/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
            { icon: MessageCircle, href: "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you", label: "WhatsApp", color: "hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-4 glass-card rounded-2xl transition-all duration-300 ${social.color}`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <social.icon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
              <motion.span
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {social.label}
              </motion.span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <motion.a
            href="/portofolio"
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-full text-white font-semibold relative overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(236, 72, 153, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="relative z-10 flex items-center gap-2 justify-center"
              whileHover={{ x: 5 }}
            >
              {lang === "id" ? "Lihat Portofolio Saya" : "View My Projects"}
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-pink-500 to-purple-600"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.a>
          <motion.a
            href="#contact"
            className="group px-8 py-4 border-2 border-white/20 rounded-full text-white font-semibold backdrop-blur-sm relative overflow-hidden hover:border-pink-500/50 transition-all duration-300"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 30px rgba(236, 72, 153, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{lang === "id" ? "Hubungi Saya" : "Let's Talk"}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20"
              initial={{ scale: 0, borderRadius: "100%" }}
              whileHover={{ scale: 2, borderRadius: "0%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>
        </motion.div>

        {/* Tech Stack Preview */}
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500 text-sm">{lang === "id" ? "Gulir Ke Bawah" : "Scroll Down"}</span>
          <ArrowDown className="w-6 h-6 text-pink-500" />
        </div>
      </motion.a>
    </section>
  );
}
