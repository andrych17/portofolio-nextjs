"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import { SpotlightCard } from "./AnimationEffects";
import { useLanguage } from "@/context/LanguageContext";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  logo: string;
}

function ProviderBadge({ issuer, logo }: { issuer: string; logo: string }) {
  if (issuer === "Anthropic") {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent border border-amber-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <svg className="w-6 h-6 fill-amber-400" viewBox="0 0 24 24">
            {/* Anthropic / Claude Spark Symbol */}
            <path d="M12 2C12 2 13.5 8 16.5 9.5C19.5 11 22 12 22 12C22 12 19.5 13 16.5 14.5C13.5 16 12 22 12 22C12 22 10.5 16 7.5 14.5C4.5 13 2 12 2 12C2 12 4.5 11 7.5 9.5C10.5 8 12 2 12 2Z" />
          </svg>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 flex items-center gap-1.5">
          <span className="text-sm">{logo}</span> Anthropic / Claude
        </span>
      </div>
    );
  }
  if (issuer === "Vanderbilt University" || issuer.includes("Coursera")) {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <svg className="w-6 h-6 fill-cyan-400" viewBox="0 0 24 24">
            {/* Coursera / Vanderbilt Academic Cap */}
            <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM5 13.18V17.18C5 19.4 8.13 21 12 21C15.87 21 19 19.4 19 17.18V13.18L12 17L5 13.18Z" />
          </svg>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-1.5">
          <span className="text-sm">{logo}</span> Coursera
        </span>
      </div>
    );
  }
  if (issuer === "Udemy") {
    return (
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <svg className="w-6 h-6 fill-purple-400" viewBox="0 0 24 24">
            {/* Udemy U emblem */}
            <path d="M12 2L4 7V17L12 22L20 17V7L12 2ZM17.5 12.5L12 15.5L6.5 12.5V9.5L12 12.5L17.5 9.5V12.5Z" />
          </svg>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/30 flex items-center gap-1.5">
          <span className="text-sm">{logo}</span> Udemy
        </span>
      </div>
    );
  }
  return <div className="text-5xl mb-4">{logo}</div>;
}

const certifications: Certification[] = [
  {
    id: 1,
    title: "Certificate of completion: AI Capabilities and Limitations",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "exhhy4ripy8p",
    link: "https://verify.skilljar.com/c/exhhy4ripy8p",
    logo: "🧠",
  },
  {
    id: 2,
    title: "Certificate of completion: Introduction to subagents",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "ziob4haqtfxa",
    link: "https://verify.skilljar.com/c/ziob4haqtfxa",
    logo: "🤖",
  },
  {
    id: 3,
    title: "Certificate of completion: Introduction to agent skills",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "9d6emc43e68b",
    link: "https://verify.skilljar.com/c/9d6emc43e68b",
    logo: "🛠️",
  },
  {
    id: 4,
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "nucfxrj2cxoy",
    link: "https://verify.skilljar.com/c/nucfxrj2cxoy",
    logo: "🔌",
  },
  {
    id: 5,
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "hdv4nqhaequh",
    link: "https://verify.skilljar.com/c/hdv4nqhaequh",
    logo: "🔌",
  },
  {
    id: 6,
    title: "Building with the Claude API",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "3ik737t8atvf",
    link: "https://verify.skilljar.com/c/3ik737t8atvf",
    logo: "💻",
  },
  {
    id: 7,
    title: "AI Agents with Model Context Protocol",
    issuer: "Vanderbilt University",
    date: "Jun 2026",
    credentialId: "ZI2P1DZ8J56C",
    link: "https://www.coursera.org/account/accomplishments/records/ZI2P1DZ8J56C",
    logo: "🎓",
  },
  {
    id: 8,
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "Jun 2026",
    credentialId: "opzctbnhdmcs",
    link: "https://verify.skilljar.com/c/opzctbnhdmcs",
    logo: "🖥️",
  },
  {
    id: 9,
    title: "Certificate of completion: Introduction to Claude Cowork",
    issuer: "Anthropic",
    date: "Jun 2026",
    credentialId: "zydanea62pwv",
    link: "https://verify.skilljar.com/c/zydanea62pwv",
    logo: "🤝",
  },
  {
    id: 10,
    title: "Certificate of completion: Claude 101",
    issuer: "Anthropic",
    date: "Jun 2026",
    credentialId: "fyrqffssmxur",
    link: "https://verify.skilljar.com/c/fyrqffssmxur",
    logo: "📚",
  },
  {
    id: 11,
    title: "Software Architecture & Design of Modern Large Scale Systems",
    issuer: "Udemy",
    date: "Feb 2026",
    credentialId: "UC-ff06e4f9-87de-44cd-b029-c7ad33e03e80",
    link: "https://www.udemy.com/certificate/UC-ff06e4f9-87de-44cd-b029-c7ad33e03e80/",
    logo: "🏗️",
  },
];

export default function Certifications() {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="certifications"
      ref={ref}
      className="py-20 aurora-bg relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {lang === "id" ? "Sertifikasi & " : "Certifications & "}
            <span className="bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {lang === "id" ? "Penghargaan" : "Awards"}
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 mx-auto rounded-full"
          />
        </motion.div>

        {certifications.length === 0 ? (
          // Placeholder when no certifications yet
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-center"
          >
              <div className="glass-card rounded-2xl p-12 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)]">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-6xl mb-6"
              >
                🏆
              </motion.div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                {lang === "id" ? "Sertifikasi Segera Hadir" : "Certifications Coming Soon"}
              </h3>
              <p className="text-gray-400">
                {lang === "id" ? "Sertifikasi profesional dan penghargaan akan ditampilkan di sini." : "Professional certifications and awards will be displayed here."}
                <br />
                {lang === "id" ? "Nantikan pembaruannya!" : "Stay tuned for updates!"}
              </p>
            </div>
          </motion.div>
        ) : (
          // Grid of certifications
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <SpotlightCard
                  className="h-full cursor-default"
                  spotlightColor="rgba(236, 72, 153, 0.12)"
                  borderGlowColor="rgba(6, 182, 212, 0.2)"
                >
                  {/* Provider Brand Badge & Logo */}
                  <ProviderBadge issuer={cert.issuer} logo={cert.logo} />

                  {/* Title & Issuer */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-pink-400 mb-2">{cert.issuer}</p>
                  <p className="text-gray-400 text-sm mb-4">{cert.date}</p>

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <p className="text-xs text-gray-500 mb-4">
                      ID: {cert.credentialId}
                    </p>
                  )}

                  {/* View Certificate Link */}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm relative z-20"
                    >
                      <Award className="w-4 h-4" />
                      {lang === "id" ? "Lihat Sertifikat" : "View Certificate"}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
