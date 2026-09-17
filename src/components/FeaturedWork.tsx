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
    <section id="work" className="relative overflow-hidden">
      <div className="glow-orb-orange w-[500px] h-[500px] top-1/2 -left-32 opacity-35 pointer-events-none" />
      <div className="glow-orb-violet w-[450px] h-[450px] top-1/4 -right-28 opacity-30 pointer-events-none" />

      <SectionHead
        index={`0${FEATURED_COUNT} • SELECTED`}
        label={lang === "id" ? "Karya Pilihan" : "Featured Work"}
      />

      <div className="relative z-10">
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

      <div className="flex justify-end px-[var(--pad-x)] py-8 relative z-10">
        <a
          href="/portofolio"
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 bg-white/5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--fg)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all shadow-lg active:scale-95"
        >
          <span>{lang === "id" ? `Lihat Semua Karya (${projects.length})` : `Explore All Work (${projects.length})`}</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
