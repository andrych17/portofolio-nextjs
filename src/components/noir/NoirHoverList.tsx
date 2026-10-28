"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { easeStudio } from "@/components/motion/ease";
import type { Project } from "@/content/types";

/** Archive rows; on desktop a preview image trails the pointer over the hovered row. */
export function NoirHoverList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 26 });
  const sy = useSpring(y, { stiffness: 260, damping: 26 });

  function onMove(e: PointerEvent<HTMLUListElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <ul className="relative border-t border-line" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      {projects.map((project, i) => (
        <li
          key={project.slug}
          onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
          className="group grid grid-cols-12 items-baseline gap-4 border-b border-line py-6 transition-colors duration-500 md:py-8"
        >
          <span className="col-span-2 font-mono text-xs text-muted md:col-span-1">{project.year}</span>
          <h3 className="col-span-10 font-display text-4xl leading-none transition-[transform,color] duration-700 ease-studio group-hover:translate-x-3 group-hover:text-accent md:col-span-5 md:text-6xl">
            {project.title}
          </h3>
          <span className="col-span-6 col-start-3 text-sm text-muted md:col-span-3 md:col-start-auto">{project.category}</span>
          <span className="col-span-4 text-right text-sm md:col-span-3">{project.result}</span>
        </li>
      ))}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.45, ease: easeStudio }}
              className="absolute -left-40 -top-28 h-56 w-80 overflow-hidden rounded-2xl"
            >
              <Image src={projects[active].image} alt="" fill sizes="320px" className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ul>
  );
}
