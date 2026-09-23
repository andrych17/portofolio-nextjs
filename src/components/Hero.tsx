"use client";

import { ArrowDown, Github, Linkedin, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getYearsOfExperience } from "@/utils/experience";
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

const EASE = [0.83, 0, 0.17, 1] as const;

// ponytail: wait out the first-visit preloader (3.1s logo video) so the name rises as the curtain lifts.
// The preloader's own localStorage flag decides; cached once so later flag writes don't shift timing.
let introDelayCache: number | null = null;
const readIntroDelay = () =>
  (introDelayCache ??= localStorage.getItem("portfolio_preloaded") ? 0.15 : 3.3);
const noopSubscribe = () => () => {};

// Letters rise out of a clipped line, one after another.
function RiseWord({ word, delay, reduced }: { word: string; delay: number; reduced: boolean | null }) {
  return (
    <span aria-hidden className="inline-flex shrink-0 overflow-hidden pb-[0.04em]">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reduced ? false : { y: "105%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.035, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { lang } = useLanguage();
  const [currentRole, setCurrentRole] = useState(0);
  const introDelay = useSyncExternalStore(noopSubscribe, readIntroDelay, () => null);
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const roles = lang === "id" ? rolesId : rolesEn;
  const yearsOfExperience = getYearsOfExperience();

  // ponytail: interval-driven kinetic role cycling eliminates CPU tick loops on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  // Cursor spotlight: writes CSS vars directly, no React re-render per pointer move.
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const socials = [
    { icon: Github, href: "https://github.com/andrych17", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/andry-huang-ba410a170", label: "LinkedIn" },
    {
      icon: MessageCircle,
      href: "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you",
      label: "WhatsApp",
    },
  ];

  const fadeUp = (d: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: introDelay === null ? undefined : { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: (introDelay ?? 0) + d, ease: EASE },
        };

  return (
    <section
      ref={sectionRef}
      id="home"
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[100dvh] flex-col justify-between overflow-hidden px-[var(--pad-x)] pt-28 pb-8"
      style={{ "--mx": "70%", "--my": "30%" } as React.CSSProperties}
    >
      {/* Background loop: signal pulses flowing into a core (ping-pong, 16s). Poster only under reduced motion. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url(/videos/hero-poster.jpg)" }}
      >
        <video
          className="motion-video h-full w-full object-cover"
          src="/videos/hero.mp4"
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
      {/* Scrim: keeps the 16vw name and body copy readable over the board */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,12,12,0.9) 0%, rgba(12,12,12,0.6) 30%, rgba(12,12,12,0.72) 58%, rgba(12,12,12,0.96) 100%)",
        }}
      />

      {/* Cursor spotlight + column guides */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(620px circle at var(--mx) var(--my), rgba(255,77,0,0.09), transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 inset-x-[var(--pad-x)] -z-10 hidden md:grid grid-cols-4"
      >
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="border-l border-[var(--line)] opacity-50 last:border-r" />
        ))}
      </div>

      {/* Meta rail */}
      <motion.div
        {...fadeUp(0)}
        className="relative z-10 flex flex-col gap-2 sm:flex-row sm:justify-between font-mono text-xs uppercase tracking-[0.12em] text-[var(--mut)]"
      >
        <span className="flex items-center gap-2 text-[var(--fg-2)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
          {lang === "id" ? "Terbuka Untuk Kolaborasi & Proyek" : "Open to Work & Collaboration"}
        </span>
        <span>
          {lang === "id" ? `${yearsOfExperience}+ Tahun Pengalaman` : `${yearsOfExperience}+ Years of Experience`}
        </span>
      </motion.div>

      {/* Masthead */}
      <div className="relative z-10 my-auto py-10">
        <h1
          aria-label="Andry Huang"
          className="display flex flex-col sm:flex-row sm:gap-[0.22em] text-[var(--fg)] text-[30vw] sm:text-[16vw]"
        >
          {introDelay !== null ? (
            <>
              <RiseWord word="ANDRY" delay={introDelay} reduced={reduced} />
              <RiseWord word="HUANG" delay={introDelay + 0.12} reduced={reduced} />
            </>
          ) : (
            // Placeholder keeps layout stable before the delay is known.
            <span aria-hidden className="invisible">
              ANDRY HUANG
            </span>
          )}
        </h1>

        <div className="mt-10 grid gap-8 border-t border-[var(--line)] pt-6 md:grid-cols-4 md:gap-0">
          <motion.div {...fadeUp(0.5)} className="md:col-span-2 md:pr-8">
            <span aria-hidden className="font-mono text-xs text-[var(--accent)]">
              /&gt;
            </span>
            <div className="mt-2 min-h-[2.6em] overflow-hidden text-[clamp(1.75rem,1rem+2.4vw,3rem)] leading-[1.1]" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRole}
                  initial={reduced ? undefined : { y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduced ? undefined : { y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="serif-accent block text-[var(--fg)]"
                >
                  {roles[currentRole]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.62)} className="md:col-span-2 md:pl-3">
            <p className="max-w-xl text-[var(--t-body)] leading-relaxed text-[var(--fg-2)]">
              {lang === "id" ? (
                <>
                  Membangun platform <span className="text-[var(--fg)]">enterprise SaaS</span>,{" "}
                  <span className="text-[var(--fg)]">sistem terdistribusi</span>, dan{" "}
                  <span className="text-[var(--accent)]">pipeline AI RAG produksi</span>. Ahli dalam .NET Core,
                  Next.js, React, Node.js, dan arsitektur cloud berkinerja tinggi.
                </>
              ) : (
                <>
                  Architecting and building <span className="text-[var(--fg)]">enterprise SaaS platforms</span>,{" "}
                  <span className="text-[var(--fg)]">distributed systems</span>, and{" "}
                  <span className="text-[var(--accent)]">production AI RAG tools</span>. Skilled in .NET Core,
                  Next.js, React, Node.js, and high-concurrency cloud architectures.
                </>
              )}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom rail • scroll cue, socials, CTAs */}
      <motion.div
        {...fadeUp(0.75)}
        // ponytail: right padding keeps the CTA clear of the fixed "Tanya AI" button (AIChatbot) at page top.
        className="relative z-10 flex flex-wrap items-end justify-between gap-6 border-t border-[var(--line)] pt-6 md:pr-36"
      >
        <a
          href="#about"
          className="flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--mut)] transition-colors hover:text-[var(--fg)]"
        >
          <ArrowDown className="h-3.5 w-3.5" aria-hidden />
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
              <social.icon className="h-3.5 w-3.5 text-[var(--mut)]" aria-hidden />
              <RollText className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--fg-2)]">
                {social.label}
              </RollText>
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="/portofolio"
            className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-[var(--fg)] px-5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--bg)] transition-colors duration-300 hover:bg-[var(--accent)] active:scale-[0.97]"
          >
            <span>{lang === "id" ? "Lihat Portofolio" : "View Portfolio"}</span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <RollLink
            href="#contact"
            className="px-3 py-3 font-mono text-xs uppercase tracking-[0.12em] text-[var(--mut)] hover:text-[var(--fg)]"
          >
            {lang === "id" ? "Hubungi Saya" : "Let's Talk"}
          </RollLink>
        </div>
      </motion.div>
    </section>
  );
}
