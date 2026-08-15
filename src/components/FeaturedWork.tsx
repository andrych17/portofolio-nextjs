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
        index={`0${FEATURED_COUNT} — SELECTED`}
        label={lang === "id" ? "Karya Pilihan" : "Featured Work"}
      />

      <div>
        {featured.map((project, i) => (
          <WorkRow
            key={project.id}
            index={i + 1}
            title={project.title}
            tags={project.tags}
            year={project.year}
            image={project.images?.[0]}
            href="/portofolio"
          />
        ))}
      </div>

      <div className="flex justify-end px-[var(--pad-x)] py-6">
        <a
          href="/portofolio"
          className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--fg-2)] hover:text-[var(--accent)] transition-colors"
        >
          {lang === "id" ? `Semua Karya (${projects.length}) →` : `All Work (${projects.length}) →`}
        </a>
      </div>
    </section>
  );
}
