"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHead } from "./ui/Label";
import { WorkRow } from "./work/WorkRow";
import { projects } from "./Projects";

const FEATURED_COUNT = 4;

export default function FeaturedWork() {
  const { lang } = useLanguage();
  const featured = projects.filter((p) => p.featured).slice(0, FEATURED_COUNT);
  const [active, setActive] = useState<number | null>(null);

  // Preview trails the cursor with a spring; desktop pointer only.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const activeImage = active !== null ? featured[active]?.images?.[0] : undefined;

  return (
    <section id="work" className="relative">
      <SectionHead
        index={`0${FEATURED_COUNT} • SELECTED`}
        label={lang === "id" ? "Karya Pilihan" : "Featured Work"}
      />

      <div className="relative" onPointerMove={onPointerMove}>
        {featured.map((project, i) => (
          <WorkRow
            key={project.id}
            index={i + 1}
            title={project.title}
            tags={project.tags}
            year={project.year}
            href="/portofolio"
            onHover={(on) => setActive(on ? i : null)}
          />
        ))}

        <motion.div
          aria-hidden
          style={{ x: sx, y: sy }}
          className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
        >
          <AnimatePresence>
            {activeImage && (
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 0 50% 0)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.83, 0, 0.17, 1] }}
                className="absolute -translate-x-1/2 -translate-y-1/2 h-[240px] w-[360px] overflow-hidden bg-[var(--bg-2)]"
              >
                <Image src={activeImage} alt="" fill sizes="360px" className="object-cover object-top" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex justify-end px-[var(--pad-x)] py-8">
        <a
          href="/portofolio"
          className="group inline-flex min-h-11 items-center gap-3 border-b border-[var(--fg)] font-mono text-xs uppercase tracking-[0.14em] text-[var(--fg)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <span>{lang === "id" ? `Lihat Semua Karya (${projects.length})` : `Explore All Work (${projects.length})`}</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}
