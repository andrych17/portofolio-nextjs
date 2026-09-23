"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHead, Index, Label } from "./ui/Label";
import { Reveal } from "./ui/Reveal";

const skills = [
  { name: ".NET Core & Enterprise Systems", years: "7+ Yrs", pct: 100 },
  { name: "SQL Server & PostgreSQL Databases", years: "7+ Yrs", pct: 100 },
  { name: "TypeScript / JavaScript", years: "6+ Yrs", pct: 85 },
  { name: "Next.js / React Architecture", years: "5+ Yrs", pct: 75 },
  { name: "Node.js / Nest.js Backend", years: "5+ Yrs", pct: 75 },
  { name: "Laravel / PHP Ecosystem", years: "5+ Yrs", pct: 75 },
  { name: "AI & LLM Systems (OpenAI / Claude)", years: "3+ Yrs", pct: 50 },
  { name: "AI Agent Protocols (MCP & Workflows)", years: "3+ Yrs", pct: 50 },
];

const skillCategories = [
  {
    title: "AI Development & Coding Tools",
    skills: ["Google Antigravity (AGY)", "Claude Code", "OpenCode", "CommandCode", "Cursor", "CodeX", "GLM"],
  },
  {
    title: "AI Protocols & Architecture",
    skills: [
      "Model Context Protocol (MCP)",
      "Agentic Skills & Rules",
      "OpenAI GPT-4o API",
      "Claude Sonnet 3.7",
      "RAG & pgvector",
      "Prompt Engineering",
      "BullMQ / Redis Queues",
    ],
  },
  {
    title: "Frontend Frameworks",
    skills: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Vue.js / Inertia.js", "Laravel Livewire 3", "Alpine.js", "Flutter"],
  },
  {
    title: "Backend & Systems",
    skills: [".NET Core 8/9", "ASP.NET Core", "NestJS", "Node.js", "Laravel 11", "Python FastAPI", "Java Spring Boot", "REST & GraphQL"],
  },
  {
    title: "Database & Cloud Storage",
    skills: ["PostgreSQL", "Microsoft SQL Server", "Oracle DB (PL/SQL)", "MySQL 8", "Prisma ORM", "Redis", "Cloudflare R2", "AWS S3", "Azure Blob"],
  },
  {
    title: "DevOps & Integrations",
    skills: ["Docker & Compose", "Git / GitHub", "CI/CD Pipelines", "SonarQube", "Playwright & Selenium", "RFID Hardware Integration", "Midtrans Payment Gateway"],
  },
];

export default function Skills() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="skills" className="relative overflow-hidden">

      <SectionHead index="02" label={lang === "id" ? "Keahlian & Teknologi" : "Skills & Stack"} />

      <div className="px-[var(--pad-x)] py-[var(--sec-sm)] relative z-10">
        {/* Track record */}
        <Reveal>
          <Label className="mb-6 block">
            {lang === "id" ? "Pengalaman Teknis (Track Record)" : "Technical Experience (Track Record)"}
          </Label>
        </Reveal>
        <div className="mb-16 border-t border-[var(--line)]">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 0.03}>
              <div className="group flex items-center justify-between gap-4 border-b border-[var(--line)] py-4 hover:bg-white/[0.02] px-2 rounded-lg transition-colors">
                <span className="text-sm md:text-base text-[var(--fg-2)] group-hover:text-[var(--fg)] transition-colors">
                  {skill.name}
                </span>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-mono text-xs tabular-nums text-[var(--mut)]">{skill.pct}%</span>
                  <span className="font-mono text-xs text-[var(--fg)] px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5">
                    {skill.years}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Categories • numbered accordion rows */}
        <Reveal>
          <Label className="mb-6 block">
            {lang === "id" ? "Ekosistem & Kakas Teknologi" : "Technologies I Work With"}
          </Label>
        </Reveal>
        <div className="border-t border-[var(--line)]">
          {skillCategories.map((category, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={category.title} className="border-b border-[var(--line)] transition-colors">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center gap-4 py-5 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <Index n={index + 1} className="w-8 shrink-0" />
                  <span className="flex-1 text-lg md:text-xl font-medium text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors">
                    {category.title}
                  </span>
                  <span className="font-mono text-xs text-[var(--mut)] tabular-nums hidden sm:inline px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {String(category.skills.length).padStart(2, "0")} skills
                  </span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-[var(--accent)]" aria-hidden />
                  ) : (
                    <Plus className="w-4 h-4 text-[var(--mut)] group-hover:text-[var(--fg)]" aria-hidden />
                  )}
                </button>
                {isOpen && (
                  <div className="flex flex-wrap gap-2 pb-6 pl-12 pt-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-white/10 bg-white/[0.04] px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-[0.08em] text-[var(--fg-2)] hover:border-[var(--accent)]/50 hover:text-[var(--fg)] hover:bg-white/[0.08] transition-all shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
