"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { CyberGrid, ScanLine, DigitalParticles } from "./CodeAnimations";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 aurora-bg relative overflow-hidden"
    >
      {/* Cyber Background Effects */}
      <CyberGrid />
      <ScanLine />
      <DigitalParticles />
      
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.2), transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%)" }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.1), transparent 70%)" }}
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        
        {/* Neon Lines */}
        <motion.div
          className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-pink-500 to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
          animate={{ opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.a
            href="https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 cursor-pointer hover:opacity-80 transition-opacity">
              {lang === "id" ? "Hubungi " : "Get In "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                {lang === "id" ? "Saya" : "Touch"}
              </span>
            </h2>
          </motion.a>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-gray-400 mt-6 max-w-2xl mx-auto"
          >
            {lang === "id"
              ? "Punya ide proyek atau berminat untuk berkolaborasi? Jangan ragu untuk menghubungi saya! Saya selalu terbuka untuk mendiskusikan peluang baru."
              : "Have a project in mind or want to collaborate? Feel free to reach out! I'm always open to discussing new opportunities."}
          </motion.p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >

            {/* Social Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* LinkedIn Card */}
              <motion.a
                href="https://linkedin.com/in/andry-huang-ba410a170"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-all overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)" }}
              >
                {/* Cyber corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-500" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-500" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-500" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-500" />
                
                {/* Scanning line effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="p-3 bg-blue-500 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">LinkedIn</p>
                    <p className="text-blue-400 text-xs">Connect with me</p>
                  </div>
                </div>
              </motion.a>

              {/* GitHub Card */}
              <motion.a
                href="https://github.com/andrych17"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl border border-gray-500/20 hover:border-purple-400/50 transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.0 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="p-3 bg-gray-700 rounded-xl">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">GitHub</p>
                    <p className="text-gray-400 text-xs">View repositories</p>
                  </div>
                </div>
              </motion.a>

              {/* WhatsApp Card */}
              <motion.a
                href="https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-2xl border border-green-500/20 hover:border-green-500/50 transition-all sm:col-span-2 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="p-3 bg-green-500 rounded-xl">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">WhatsApp</p>
                    <p className="text-green-400 text-xs">+62 81-357-296-386</p>
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
