"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import type { Project } from "@/content/types";

type View = "grid" | "list";

/** Filterable project index with a grid and a list view. */
export function AtelierWorkIndex({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<View>("grid");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <LayoutGroup>
      <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-1 rounded-full bg-surface/80 p-1 ring-1 ring-black/[0.04]">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className="relative cursor-pointer rounded-full px-4 py-2 text-sm"
            >
              {filter === c && (
                <motion.span layoutId="atelier-filter" className="absolute inset-0 rounded-full bg-bg shadow-[0_1px_2px_rgba(28,27,24,0.1)]" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              )}
              <span className="relative">
                {c}
                <span className="ml-1.5 text-muted">{c === "All" ? projects.length : projects.filter((p) => p.category === c).length}</span>
              </span>
            </button>
          ))}
        </div>
        <div role="group" aria-label="Layout" className="flex gap-1 rounded-full bg-surface/80 p-1 ring-1 ring-black/[0.04]">
          {(["grid", "list"] as const).map((v) => (
            <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className="relative cursor-pointer rounded-full px-4 py-2 text-sm capitalize">
              {view === v && <motion.span layoutId="atelier-view" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className={`relative ${view === v ? "text-bg" : ""}`}>{v}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.ul layout className={view === "grid" ? "grid gap-x-5 gap-y-14 md:grid-cols-2" : "border-t border-line"}>
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project, i) => (
            <motion.li
              key={project.slug}
              id={project.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: easeStudio }}
              className={`scroll-mt-32 ${view === "grid" && i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              {view === "grid" ? <GridCard project={project} /> : <ListRow project={project} />}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}

function GridCard({ project }: { project: Project }) {
  return (
    <article className="group">
      <motion.div layout className="rounded-[2rem] bg-white/45 p-1.5 ring-1 ring-black/[0.06]">
        <div className="relative aspect-[5/4] overflow-hidden rounded-[calc(2rem-0.375rem)]">
          <Image src={project.image} alt={`${project.title}: ${project.summary}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-studio group-hover:scale-[1.05]" />
          <span className="absolute bottom-4 left-4 translate-y-3 rounded-full bg-bg/90 px-3.5 py-1.5 text-sm opacity-0 backdrop-blur transition-all duration-500 ease-studio group-hover:translate-y-0 group-hover:opacity-100">
            {project.result}
          </span>
        </div>
      </motion.div>
      <div className="mt-5 grid grid-cols-[1fr_auto] gap-x-6 px-2">
        <h2 className="font-display text-3xl leading-tight md:text-4xl">{project.title}</h2>
        <span className="pt-2 text-sm tabular-nums text-muted">{project.year}</span>
        <p className="mt-2 max-w-md text-fg/70">{project.summary}</p>
        <ul className="col-span-2 mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full px-3 py-1 text-xs ring-1 ring-black/10">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function ListRow({ project }: { project: Project }) {
  return (
    <article className="group grid grid-cols-[auto_1fr] items-center gap-5 border-b border-line py-5 md:grid-cols-[auto_2fr_1fr_1.4fr] md:gap-8">
      <motion.div layout className="relative h-16 w-20 overflow-hidden rounded-xl transition-[width] duration-700 ease-studio md:group-hover:w-40">
        <Image src={project.image} alt="" fill sizes="160px" className="object-cover" />
      </motion.div>
      <div>
        <h2 className="font-display text-2xl leading-tight transition-transform duration-500 ease-studio group-hover:translate-x-1 md:text-3xl">{project.title}</h2>
        <p className="mt-1 text-sm text-muted md:hidden">{project.result}</p>
      </div>
      <span className="hidden text-sm text-muted md:block">
        {project.category} · {project.year}
      </span>
      <span className="hidden text-sm md:block">{project.result}</span>
    </article>
  );
}
