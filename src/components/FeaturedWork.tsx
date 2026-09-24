"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionHead } from "./ui/Label";
import { WorkRow } from "./work/WorkRow";
import { projects } from "./Projects";

// Top flagship modern picks (reverse chronological / highest impact)
const FEATURED_ORDER = [509, 504, 303, 506, 508];

export default function FeaturedWork() {
  const { lang } = useLanguage();
  const featured = FEATURED_ORDER.map((id) => projects.find((p) => p.id === id)).filter(Boolean);

  return (
    <section id="work" className="relative">
      <SectionHead
        index={lang === "id" ? `0${featured.length} • PILIHAN` : `0${featured.length} • SELECTED`}
        label={lang === "id" ? "Karya Pilihan" : "Featured Work"}
      />

      <div className="relative">
        {featured.map((project, i) => {
          if (!project) return null;
          const desc = lang === "id" ? (project.impact || project.description) : project.description;
          return (
            <WorkRow
              key={project.id}
              index={i + 1}
              title={project.title}
              description={desc}
              tags={project.tags}
              year={project.year}
              emoji={project.emoji}
              href="/portofolio"
            />
          );
        })}
      </div>

      <div className="flex justify-end px-[var(--pad-x)] py-8">
        <a
          href="/portofolio"
          className="group inline-flex min-h-11 items-center gap-3 border-b border-[var(--fg)] font-mono text-xs uppercase tracking-[0.12em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <span>{lang === "id" ? `Lihat Semua Karya (${projects.length})` : `Explore All Work (${projects.length})`}</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}

