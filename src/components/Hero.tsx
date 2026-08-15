"use client";

import { ArrowDown, Github, Linkedin, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getYearsOfExperience } from "@/utils/experience";
import { Reveal } from "./ui/Reveal";
import { RollLink, RollText } from "./ui/RollLink";

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

  // ponytail: single timer management avoids nested uncleaned timeouts on mobile Chrome background/throttling
  useEffect(() => {
    const role = roles[currentRole];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === role) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(
        () => {
          setDisplayText((prev) =>
            isDeleting ? role.slice(0, prev.length - 1) : role.slice(0, prev.length + 1)
          );
        },
        isDeleting ? 40 : 80,
      );
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole, roles]);

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
    <section id="home" className="relative flex min-h-[100dvh] flex-col justify-between px-[var(--pad-x)] pt-24 pb-8">
      {/* Top rail — wordmark, badge, role cycle */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mut)]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[var(--fg)]">
            {lang === "id" ? "Terbuka Untuk Kolaborasi & Proyek" : "Open to Work & Collaboration"}
          </span>
        </div>
        <span className="text-[var(--fg-2)]">
          {lang === "id" ? `${yearsOfExperience}+ Tahun Pengalaman` : `${yearsOfExperience}+ Years of Experience`}
        </span>
      </div>

      {/* Masthead */}
      <div className="max-w-6xl">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-[var(--mut)] mb-4">
            {lang === "id" ? "Halo, Saya" : "Hello, I'm"}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1
            className="font-medium uppercase text-[var(--fg)]"
            style={{ fontSize: "var(--t-display)", lineHeight: 0.88, letterSpacing: "-0.03em" }}
          >
            Andry
            <br />
            Huang
          </h1>
        </Reveal>

        <div className="mt-8 grid gap-8 md:grid-cols-2 md:justify-items-end">
          <div className="hidden md:block" />
          <Reveal delay={0.16} className="md:max-w-md">
            <p className="text-[var(--t-body)] leading-relaxed text-[var(--fg-2)]">
              {lang === "id" ? (
                <>
                  Membangun platform <span className="font-medium text-[var(--fg)]">SaaS berskala besar</span>,{" "}
                  <span className="font-medium text-[var(--fg)]">aplikasi web modern</span>, dan{" "}
                  <span className="font-medium text-[var(--fg)]">solusi berbasis cloud & AI</span>.{" "}
                  Ahli dalam .NET Core, Next.js, React, Node.js, dan teknologi modern.
                </>
              ) : (
                <>
                  Building large-scale <span className="font-medium text-[var(--fg)]">SaaS platforms</span>,{" "}
                  <span className="font-medium text-[var(--fg)]">web applications</span>, and{" "}
                  <span className="font-medium text-[var(--fg)]">cloud & AI-integrated solutions</span>.{" "}
                  Skilled in .NET Core, Next.js, React, Node.js, and modern technologies.
                </>
              )}
            </p>
            <p className="mt-4 font-mono text-sm text-[var(--accent)] min-h-[1.5rem] flex items-center" aria-live="polite">
              <span>{displayText}</span>
              <span className="animate-pulse ml-0.5 inline-block font-bold">_</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-[var(--line)]">
              {[".NET Core", "Next.js", "AI & MCP", "PostgreSQL", "Cloud"].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full border border-[var(--line)] bg-white/5 font-mono text-[10px] uppercase tracking-wider text-[var(--fg-2)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom rail — scroll cue, socials, CTAs */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[var(--line)] pt-6">
        <a href="#about" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--mut)]">
          <ArrowDown className="w-3.5 h-3.5" />
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

        <div className="flex flex-wrap items-center gap-6">
          <RollLink href="/portofolio" className="font-mono text-xs uppercase tracking-[0.14em] py-2 text-[var(--fg)]">
            {lang === "id" ? "Lihat Portofolio Saya →" : "View My Projects →"}
          </RollLink>
          <RollLink href="#contact" className="font-mono text-xs uppercase tracking-[0.14em] py-2 text-[var(--mut)]">
            {lang === "id" ? "Hubungi Saya" : "Let's Talk"}
          </RollLink>
        </div>
      </div>
    </section>
  );
}
