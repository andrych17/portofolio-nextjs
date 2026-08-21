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
      "LLM Vector Embeddings",
      "Prompt Engineering",
      "Redis Async Queues",
    ],
  },
  {
    title: "Frontend Frameworks",
    skills: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Laravel Livewire 3", "Alpine.js", "Framer Motion", "Flutter"],
  },
  {
    title: "Backend & Systems",
    skills: [".NET Core 8", "NestJS", "Node.js", "Laravel 11", "Python FastAPI", "Java Spring Boot", "ASP Classic", "RESTful APIs"],
  },
  {
    title: "Database & Cloud Storage",
    skills: ["PostgreSQL", "MySQL 8", "SQL Server", "Prisma ORM", "Redis", "Cloudflare R2", "AWS S3", "Azure Blob"],
  },
  {
    title: "DevOps & Integrations",
    skills: ["Docker", "Git / GitHub", "CI/CD Pipelines", "SonarQube", "RFID Hardware Integration", "Midtrans Payment Gateway", "RajaOngkir Shipping API"],
  },
];

export default function Skills() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="skills" className="relative">
      <SectionHead index="02" label={lang === "id" ? "Keahlian & Teknologi" : "Skills & Stack"} />

      <div className="px-[var(--pad-x)] py-[var(--sec-sm)]">
        {/* Track record */}
        <Reveal>
          <Label className="mb-6 block">
            {lang === "id" ? "Pengalaman Teknis (Track Record)" : "Technical Experience (Track Record)"}
          </Label>
        </Reveal>
        <div className="mb-16 border-t border-[var(--line)]">
          {skills.map((skill, i) => (
            <Reveal key={skill.name} delay={i * 0.03}>
              <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] py-4">
                <span className="text-sm md:text-base text-[var(--fg-2)]">{skill.name}</span>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-mono text-xs tabular-nums text-[var(--mut)]">{skill.pct}%</span>
                  <span className="font-mono text-xs text-[var(--fg)]">{skill.years}</span>
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
              <div key={category.title} className="border-b border-[var(--line)]">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <Index n={index + 1} className="w-8 shrink-0" />
                  <span className="flex-1 text-lg md:text-xl font-medium text-[var(--fg)]">{category.title}</span>
                  <span className="font-mono text-xs text-[var(--mut)] tabular-nums hidden sm:inline">
                    {String(category.skills.length).padStart(2, "0")}
                  </span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-[var(--accent)]" aria-hidden />
                  ) : (
                    <Plus className="w-4 h-4 text-[var(--mut)]" aria-hidden />
                  )}
                </button>
                {isOpen && (
                  <div className="flex flex-wrap gap-2 pb-6 pl-12">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-[var(--line)] px-3 py-1 font-mono text-xs uppercase tracking-[0.08em] text-[var(--fg-2)]"
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
