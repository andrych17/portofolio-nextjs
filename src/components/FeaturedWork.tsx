"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionHead } from "./ui/Label";
import { WorkRow } from "./work/WorkRow";
import { projects } from "./Projects";

const FEATURED_COUNT = 4;

export default function FeaturedWork() {
  const { lang } = useLanguage();
  const featured = projects.filter((p) => p.featured).slice(0, FEATURED_COUNT);

  return (
    <section id="work" className="relative">
      <SectionHead
        index={`0${FEATURED_COUNT} • SELECTED`}
        label={lang === "id" ? "Karya Pilihan" : "Featured Work"}
      />

      <div className="relative">
        {featured.map((project, i) => (
          <WorkRow
            key={project.id}
            index={i + 1}
            title={project.title}
            tags={project.tags}
            year={project.year}
            href="/portofolio"
          />
        ))}
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

