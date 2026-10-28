"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import type { Step } from "@/content/types";

const tones = ["bg-k-yellow", "bg-k-pink", "bg-k-lime", "bg-accent"];

/** Steps alternate sides while a squiggle draws itself between them. */
export function KineticZigzag({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <ol ref={ref} className="relative space-y-10 md:space-y-0">
      <svg aria-hidden viewBox="0 0 100 1000" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden size-full md:block">
        <path d="M50 0 C 95 120, 5 250, 50 375 S 95 625, 50 750 S 5 900, 50 1000" fill="none" stroke="#121212" strokeOpacity="0.12" strokeWidth="6" vectorEffect="non-scaling-stroke" strokeDasharray="2 14" strokeLinecap="round" />
        <motion.path d="M50 0 C 95 120, 5 250, 50 375 S 95 625, 50 750 S 5 900, 50 1000" fill="none" stroke="#ff4a1c" strokeWidth="6" vectorEffect="non-scaling-stroke" strokeLinecap="round" style={{ pathLength }} />
      </svg>
      {steps.map((step, i) => (
        <motion.li
          key={step.title}
          className={`relative md:w-[46%] md:py-10 ${i % 2 ? "md:ml-auto" : ""}`}
          initial={{ opacity: 0, x: i % 2 ? 80 : -80, rotate: i % 2 ? 6 : -6 }}
          whileInView={{ opacity: 1, x: 0, rotate: i % 2 ? 1.5 : -1.5 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
        >
          <article className={`rounded-[2rem] border-2 border-k-ink p-7 shadow-[8px_8px_0_0_#121212] md:p-9 ${tones[i % tones.length]}`}>
            <div className="flex items-center justify-between gap-4">
              <span className="flex size-16 items-center justify-center rounded-full border-2 border-k-ink bg-white font-display text-2xl font-black">{i + 1}</span>
              <span className="rounded-full border-2 border-k-ink bg-white px-4 py-1.5 text-sm font-bold">{step.duration}</span>
            </div>
            <h2 className="mt-8 font-display text-[clamp(3rem,6vw,5.5rem)] font-black uppercase leading-[0.85]">{step.title}</h2>
            <p className="mt-5 text-lg font-medium leading-snug">{step.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {step.outputs.map((o) => (
                <li key={o} className="rounded-full border-2 border-k-ink bg-white/70 px-3 py-1 text-sm font-bold">
                  {o}
                </li>
              ))}
            </ul>
          </article>
        </motion.li>
      ))}
    </ol>
  );
}
