"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { freight } from "@/content/logistics/freight";

function Step({ i, n, progress, s }: { i: number; n: number; progress: MotionValue<number>; s: (typeof freight.process)[number] }) {
  const t = i / (n - 1);
  const fill = useTransform(progress, [Math.max(0, t - 0.08), t], [0, 1]);
  const glow = useTransform(progress, [Math.max(0, t - 0.12), t], [0.35, 1]);
  return (
    <li className="relative grid grid-cols-[3.5rem_1fr] gap-4 pb-14 last:pb-0 md:grid-cols-[5rem_1fr] md:gap-8">
      <div className="relative flex justify-center">
        <span className="relative z-10 flex size-12 items-center justify-center overflow-hidden rounded-full bg-bg font-mono text-sm ring-1 ring-fg/25 md:size-14">
          <motion.span aria-hidden className="absolute inset-0 bg-accent" style={{ opacity: fill }} />
          <span className="relative">0{i + 1}</span>
          <motion.span aria-hidden className="absolute inset-0 flex items-center justify-center text-accent-fg" style={{ opacity: fill }}>
            0{i + 1}
          </motion.span>
        </span>
      </div>
      <motion.div style={{ opacity: glow }} className="grid gap-3 pt-1 md:grid-cols-[1fr_1.2fr] md:gap-10 md:pt-2">
        <div>
          <h3 className="font-display text-[clamp(1.9rem,3.4vw,3rem)] font-semibold leading-none">{s.title}</h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{s.time}</p>
        </div>
        <p className="max-w-[52ch] text-[16px] leading-relaxed text-fg/75">{s.body}</p>
      </motion.div>
    </li>
  );
}

export function FreightProcess() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.65", "end 0.55"] });
  const steps = freight.process;
  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-6 left-[1.75rem] top-6 w-px bg-line md:left-[2.5rem]" />
      <motion.span aria-hidden className="absolute bottom-6 left-[1.75rem] top-6 w-px origin-top bg-accent md:left-[2.5rem]" style={{ scaleY: scrollYProgress }} />
      {steps.map((s, i) => (
        <Step key={s.title} i={i} n={steps.length} progress={scrollYProgress} s={s} />
      ))}
    </ol>
  );
}
