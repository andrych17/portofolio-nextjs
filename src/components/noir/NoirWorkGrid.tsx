"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import type { Project } from "@/content/types";

const spans = ["md:col-span-7", "md:col-span-5 md:mt-40", "md:col-span-5", "md:col-span-7 md:-mt-24"];
const ratios = ["aspect-[4/3]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[4/3]"];

export function NoirWorkGrid({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <LayoutGroup>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(category)}
              className={`relative cursor-pointer rounded-full px-5 py-2 text-sm transition-colors duration-500 ${active ? "text-accent-fg" : "text-fg/75 ring-1 ring-fg/12 hover:text-fg"}`}
            >
              {active && (
                <motion.span layoutId="noir-filter" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="relative">{category}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {shown.map((project, i) => (
            <motion.article
              layout
              key={project.slug}
              id={project.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.7, ease: easeStudio }}
              className={`group scroll-mt-28 ${spans[i % spans.length]}`}
              data-cursor="View"
            >
              <ParallaxImage
                src={project.image}
                alt={`${project.title}, ${project.category.toLowerCase()} project`}
                sizes="(min-width: 768px) 58vw, 100vw"
                className={`rounded-[1.25rem] ${ratios[i % ratios.length]}`}
                imgClassName="grayscale transition-[filter,transform] duration-[1.2s] ease-studio group-hover:grayscale-0 group-hover:scale-[1.04]"
                offset={40}
              />
              <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
                <div>
                  <h2 className="font-display text-4xl leading-none md:text-5xl">{project.title}</h2>
                  <p className="mt-3 max-w-md text-fg/70">{project.summary}</p>
                </div>
                <div className="md:text-right">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {project.category} · {project.year}
                  </p>
                  <p className="mt-2 text-accent">{project.result}</p>
                </div>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-full px-3 py-1 text-xs text-fg/60 ring-1 ring-fg/10">
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}
