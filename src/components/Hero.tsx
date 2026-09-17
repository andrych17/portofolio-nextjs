"use client";

import { ArrowDown, Github, Linkedin, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getYearsOfExperience } from "@/utils/experience";
import { Reveal } from "./ui/Reveal";
import { RollLink, RollText } from "./ui/RollLink";

const rolesEn = [
  "Senior Fullstack & AI Engineer",
  "Backend & SaaS Specialist",
  "Next.js & Frontend Engineer",
  "AI Agent & RAG Architect",
];

const rolesId = [
  "Senior Fullstack & AI Engineer",
  "Spesialis Backend & SaaS",
  "Next.js & Frontend Engineer",
  "Arsitek AI Agent & RAG",
];

export default function Hero() {
  const { lang } = useLanguage();
  const [currentRole, setCurrentRole] = useState(0);
  const reduced = useReducedMotion();

  const roles = lang === "id" ? rolesId : rolesEn;
  const yearsOfExperience = getYearsOfExperience();

  // ponytail: interval-driven kinetic role cycling eliminates CPU tick loops on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  const socials = [
    { icon: Github, href: "https://github.com/andrych17", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/andry-huang-ba410a170", label: "LinkedIn" },
    {
      icon: MessageCircle,
      href: "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you",
      label: "WhatsApp",
    },
  ];

  return (
    <section id="home" className="relative flex min-h-[100dvh] flex-col justify-between px-[var(--pad-x)] pt-28 pb-8 overflow-hidden">
      {/* Ambient spatial background glow & subtle grid */}
      <div className="glow-orb-orange w-[520px] h-[520px] -top-32 -left-20 opacity-70 animate-pulse-halo" />
      <div className="glow-orb-violet w-[580px] h-[580px] top-1/3 -right-24 opacity-60 animate-pulse-halo [animation-delay:3s]" />
      <div className="ambient-grid absolute inset-0 -z-10 opacity-75 pointer-events-none" />

      {/* Top rail • wordmark, badge, role cycle */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mut)]">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
          </span>
          <span className="text-emerald-400 font-medium">
            {lang === "id" ? "Terbuka Untuk Kolaborasi & Proyek" : "Open to Work & Collaboration"}
          </span>
        </div>
        <span className="text-[var(--fg-2)] px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          {lang === "id" ? `${yearsOfExperience}+ Tahun Pengalaman` : `${yearsOfExperience}+ Years of Experience`}
        </span>
      </div>

      {/* Masthead */}
      <div className="relative z-10 max-w-6xl my-auto py-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)] mb-3 flex items-center gap-2 font-semibold">
            <span className="w-6 h-px bg-[var(--accent)]" />
            {lang === "id" ? "Senior Fullstack & AI Engineer" : "Senior Fullstack & AI Engineer"}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1
            className="font-bold uppercase tracking-tight text-[var(--fg)] relative drop-shadow-sm"
            style={{ fontSize: "var(--t-display)", lineHeight: 0.88, letterSpacing: "-0.03em" }}
          >
            Andry
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--fg)] via-[var(--fg)] to-[var(--accent)]">
              Huang
            </span>
          </h1>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:justify-items-end items-center">
          <div className="hidden md:block" />
          <Reveal delay={0.16} className="md:max-w-md p-6 rounded-2xl glass-panel border border-white/10 shadow-2xl">
            <p className="text-[var(--t-body)] leading-relaxed text-[var(--fg-2)]">
              {lang === "id" ? (
                <>
                  Membangun platform <span className="font-semibold text-[var(--fg)]">enterprise SaaS</span>,{" "}
                  <span className="font-semibold text-[var(--fg)]">sistem terdistribusi</span>, dan{" "}
                  <span className="font-semibold text-[var(--accent)]">pipeline AI RAG produksi</span>.{" "}
                  Ahli dalam .NET Core, Next.js, React, Node.js, dan arsitektur cloud berkinerja tinggi.
                </>
              ) : (
                <>
                  Architecting and building <span className="font-semibold text-[var(--fg)]">enterprise SaaS platforms</span>,{" "}
                  <span className="font-semibold text-[var(--fg)]">distributed systems</span>, and{" "}
                  <span className="font-semibold text-[var(--accent)]">production AI RAG tools</span>.{" "}
                  Skilled in .NET Core, Next.js, React, Node.js, and high-concurrency cloud architectures.
                </>
              )}
            </p>
            <div className="mt-4 font-mono text-sm text-[var(--accent)] min-h-[1.75rem] flex items-center overflow-hidden" aria-live="polite">
              <span className="text-[var(--mut)] mr-2 text-xs">/&gt;</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRole}
                  initial={reduced ? undefined : { y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduced ? undefined : { y: -14, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block font-semibold tracking-wide"
                >
                  {roles[currentRole]}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-[var(--line)]">
              {[".NET Core", "Next.js", "Node.js", "RAG / AI Agents", "PostgreSQL", "Cloud"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] uppercase tracking-wider text-[var(--fg-2)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom rail • scroll cue, socials, CTAs */}
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6 border-t border-[var(--line)] pt-6">
        <a href="#about" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--mut)] hover:text-[var(--fg)] transition-colors">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          {lang === "id" ? "Gulir Ke Bawah" : "Scroll Down"}
        </a>

        <div className="flex flex-wrap items-center gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 py-2"
            >
              <social.icon className="w-3.5 h-3.5 text-[var(--mut)]" aria-hidden />
              <RollText className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--fg-2)]">
                {social.label}
              </RollText>
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/portofolio"
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[var(--accent)] text-[var(--bg)] font-mono text-xs uppercase tracking-[0.12em] font-bold shadow-lg hover:shadow-[0_0_25px_rgba(255,77,0,0.4)] transition-all active:scale-95"
          >
            <span>{lang === "id" ? "Lihat Portofolio" : "View Portfolio"}</span>
            <span className="w-6 h-6 rounded-full bg-black/15 flex items-center justify-center transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
          <RollLink href="#contact" className="font-mono text-xs uppercase tracking-[0.14em] py-2 px-3 text-[var(--mut)] hover:text-[var(--fg)]">
            {lang === "id" ? "Hubungi Saya" : "Let's Talk"}
          </RollLink>
        </div>
      </div>
    </section>
  );
}
