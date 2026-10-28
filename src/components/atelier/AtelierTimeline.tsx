"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { easeStudio } from "@/components/motion/ease";
import type { Milestone } from "@/content/types";

/** Milestones on a line that draws itself as you scroll. */
export function AtelierTimeline({ items }: { items: Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-1/2" />
      <motion.span aria-hidden style={{ scaleY }} className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-accent md:left-1/2" />
      {items.map((m, i) => (
        <li key={m.year} className="relative grid gap-2 pb-16 pl-10 last:pb-0 md:grid-cols-2 md:gap-16 md:pl-0">
          <motion.span
            aria-hidden
            className="absolute left-0 top-3 size-[15px] rounded-full border-2 border-accent bg-bg md:left-1/2 md:-translate-x-[7px]"
            initial={{ scale: 0.4 }}
            whileInView={{ scale: 1, backgroundColor: "#2f5d46" }}
            viewport={{ once: true, amount: 1, margin: "0px 0px -35% 0px" }}
            transition={{ duration: 0.5, ease: easeStudio }}
          />
          <motion.p
            className={`font-display text-[clamp(3rem,6vw,5.5rem)] italic leading-none text-accent ${i % 2 ? "md:order-2" : "md:text-right"}`}
            initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: easeStudio }}
          >
            {m.year}
          </motion.p>
          <motion.p
            className={`max-w-sm self-center text-xl leading-snug ${i % 2 ? "md:justify-self-end md:text-right" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: easeStudio, delay: 0.1 }}
          >
            {m.text}
          </motion.p>
        </li>
      ))}
    </ol>
  );
}
