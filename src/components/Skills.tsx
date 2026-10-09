"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { EASE, Title } from "./ui/Title";

const MAX_YEARS = 7;

const TRACK = [
  { name: ".NET Core & enterprise systems", years: 7 },
  { name: "SQL Server & PostgreSQL", years: 7 },
  { name: "TypeScript / JavaScript", years: 6 },
  { name: "Next.js / React", years: 5 },
  { name: "Node.js / NestJS", years: 5 },
  { name: "Laravel / PHP", years: 5 },
  { name: "AI & LLM systems (OpenAI, Claude)", years: 3 },
  { name: "AI agents & MCP workflows", years: 2 },
];

const GROUPS = [
  { en: "Backend", id: "Backend", items: [".NET Core 8/9 · C#", "ASP.NET Core Web API", "EF Core · Dapper", "NestJS · Express", "Laravel 11 · PHP", "Java 17 · Spring Boot", "FastAPI"] },
  { en: "Data", id: "Data", items: ["PostgreSQL · pgvector", "SQL Server · T-SQL", "Oracle · PL/SQL", "MySQL 8", "Redis · BullMQ", "Prisma"] },
  { en: "Frontend", id: "Frontend", items: ["Next.js 16 · App Router", "React 19", "TypeScript strict", "Tailwind CSS v4", "Vue · Inertia", "Livewire 3 · Alpine", "Framer Motion", "three.js", "Flutter"] },
  { en: "AI systems", id: "Sistem AI", items: ["MCP servers & tools", "Agent workflows", "Claude API", "OpenAI GPT-4o", "Gemini SDK", "RAG · hybrid search", "Structured outputs"] },
  { en: "AI tooling", id: "Tool AI", items: ["Claude Code", "Google Antigravity", "Cursor", "Codex", "OpenCode"] },
  { en: "Ops", id: "Ops", items: ["Docker · Compose", "Linux · Nginx", "Cloudflare · R2", "AWS S3 · Azure Blob", "GitHub Actions · GitLab CI", "SonarQube", "Playwright · Selenium", "RFID hardware", "Midtrans"] },
];

export default function Skills() {
  const { lang } = useLanguage();
  const id = lang === "id";

  return (
    <section id="skills" data-stage="skills" className="ah-sec ah-side-right">
      <Title no="03" meta={id ? "Dipakai di production sejak 2019" : "In production since 2019"}>
        Stack
      </Title>

      {/* The list watches the viewport, not the bars: a bar at scaleX(0) has no area to intersect. */}
      <motion.ol
        className="ah-track"
        aria-label={id ? "Lama pengalaman per teknologi" : "Years with each technology"}
        initial="off"
        whileInView="on"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {TRACK.map((t, i) => (
          <li key={t.name}>
            <span className="ah-track-name">{t.name}</span>
            <span className="ah-bar" aria-hidden="true">
              <motion.i
                style={{ width: `${(t.years / MAX_YEARS) * 100}%` }}
                variants={{ off: { scaleX: 0 }, on: { scaleX: 1 } }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: EASE }}
              />
            </span>
            <span className="ah-mono ah-track-years">{id ? `${t.years}+ thn` : `${t.years}+ yrs`}</span>
          </li>
        ))}
      </motion.ol>

      <div className="ah-groups">
        {GROUPS.map((g, i) => (
          <motion.div
            key={g.en}
            className="ah-group"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
          >
            <h3 className="ah-group-name">
              <span>{g[lang]}</span>
            </h3>
            <ul>
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
