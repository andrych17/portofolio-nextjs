"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { grid } from "@/content/tech/grid";

const tagTone: Record<string, string> = {
  New: "bg-accent text-accent-fg",
  Improved: "bg-fg text-bg",
  Fix: "ring-1 ring-fg/40 text-fg",
};

/** A rail on the left fills as the list scrolls past, like a release train. */
export function GridChangelog() {
  const ref = useRef<HTMLOListElement>(null);
  // Read after mount: Motion reports the preference on the client's first render but not on the server, which would break hydration.
  const prefers = useReducedMotion();
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(Boolean(prefers)), [prefers]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.65", "end 0.55"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="relative">
      <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-fg/15 md:left-[9.5rem]" />
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-accent md:left-[9.5rem]"
        style={{ scaleY: reduce ? 1 : fill }}
      />
      <ol ref={ref} className="space-y-12 md:space-y-16">
        {grid.changelog.map((c) => (
          <motion.li
            key={c.v}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: easeStudio }}
            className="relative grid gap-x-10 pl-8 md:grid-cols-[9.5rem_1fr] md:pl-0"
          >
            <span aria-hidden className="absolute left-0 top-1.5 size-[11px] border border-fg bg-bg md:left-[calc(9.5rem-5px)]" />
            <div className="mono flex items-center gap-3 text-muted md:block md:pr-8 md:text-right">
              <time dateTime={c.date} className="block">
                {c.date}
              </time>
              <span className="text-fg md:mt-2 md:block">v{c.v}</span>
            </div>
            <div className="mt-3 md:mt-0 md:pl-10">
              <span className={`mono inline-block px-2 py-1 ${tagTone[c.tag] ?? tagTone.Fix}`}>{c.tag}</span>
              <h3 className="mt-3 max-w-xl text-[clamp(1.4rem,2.2vw,2rem)] font-bold leading-[1.05] tracking-[-0.03em]">{c.title}</h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-fg/65">{c.body}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
