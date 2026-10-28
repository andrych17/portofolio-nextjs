"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/content/types";

const tones = ["bg-k-yellow", "bg-k-pink", "bg-k-lime", "bg-k-blue text-white", "bg-accent", "bg-white"];
const tilts = ["md:hover:-rotate-2", "md:hover:rotate-2", "md:hover:-rotate-1", "md:hover:rotate-1"];

/** Filter chips plus a grid of cards that tip over on hover. */
export function KineticWorkGrid({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <LayoutGroup>
      <div role="group" aria-label="Filter by category" className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className="relative cursor-pointer rounded-full border-2 border-k-ink bg-white px-5 py-2 font-display text-sm font-extrabold uppercase transition-transform duration-300 hover:-rotate-2"
          >
            {filter === c && <motion.span layoutId="kinetic-filter" className="absolute inset-0 rounded-full bg-k-ink" transition={{ type: "spring", stiffness: 500, damping: 32 }} />}
            <span className={`relative ${filter === c ? "text-white" : ""}`}>{c}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="grid gap-6 md:grid-cols-2 md:gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project) => {
            const i = projects.indexOf(project);
            return (
              <motion.li
                key={project.slug}
                id={project.slug}
                layout
                className="scroll-mt-28"
                initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <article
                  className={`group h-full rounded-[2rem] border-2 border-k-ink p-3 shadow-[6px_6px_0_0_#121212] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${tones[i % tones.length]} ${tilts[i % tilts.length]}`}
                >
                  <div className="relative aspect-[16/11] overflow-hidden rounded-[1.4rem] border-2 border-k-ink">
                    <Image src={project.image} alt={`${project.title}: ${project.summary}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-studio group-hover:scale-110" />
                    <span className="absolute bottom-3 right-3 rotate-3 rounded-xl border-2 border-k-ink bg-white px-3 py-1.5 font-display text-sm font-black uppercase text-k-ink transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110">
                      {project.result}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-4 px-3 pb-3 pt-5">
                    <div>
                      <h2 className="font-display text-3xl font-black uppercase leading-[0.9] md:text-4xl">{project.title}</h2>
                      <p className="mt-3 max-w-md leading-snug">{project.summary}</p>
                    </div>
                    <span className="shrink-0 font-display text-sm font-black">
                      {project.category}
                      <br />
                      {project.year}
                    </span>
                  </div>
                </article>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </LayoutGroup>
  );
}
