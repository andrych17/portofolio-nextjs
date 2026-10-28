"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { atrium } from "@/content/property/atrium";

const steps = atrium.process;

/** A sticky floor-number display rolls from 01 to 04 as the steps pass the middle of the screen. On small screens each step carries its own number. */
export function AtriumProcess() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.55", "end 0.6"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)))));

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-10">
      <div aria-hidden className="hidden md:col-span-5 md:block">
        <div className="sticky top-32">
          <div className="flex items-start gap-4">
            <span className="mt-4 font-mono text-[12px] uppercase tracking-[0.12em] text-white/55">Step</span>
            <div className="h-[1em] overflow-hidden font-display text-[clamp(10rem,19vw,18rem)] leading-none text-accent">
              <motion.div animate={{ y: `${(-active * 100) / steps.length}%` }} transition={reduce ? { duration: 0 } : { duration: 0.9, ease: easeStudio }}>
                {steps.map((s) => (
                  <span key={s.n} className="block h-[1em]">
                    {s.n}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
          <div className="mt-6 flex gap-1.5">
            {steps.map((s, i) => (
              <span key={s.n} className={`h-[3px] flex-1 transition-colors duration-500 ease-studio ${i <= active ? "bg-accent" : "bg-white/20"}`} />
            ))}
          </div>
        </div>
      </div>

      <ol ref={ref} className="space-y-12 md:col-span-7 md:space-y-0">
        {steps.map((s, i) => (
          <motion.li
            key={s.n}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: easeStudio }}
            className={`border-t border-white/20 pb-2 pt-8 transition-opacity duration-700 ease-studio md:min-h-[24rem] md:pt-10 ${i === active ? "md:opacity-100" : "md:opacity-40"}`}
          >
            <p className="flex items-baseline gap-4 font-mono text-[11.5px] uppercase tracking-[0.12em] text-white/60">
              <span className="font-display text-[3.4rem] normal-case leading-none tracking-[-0.03em] text-accent md:hidden">{s.n}</span>
              {s.time}
            </p>
            <h3 className="mt-4 font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[0.98]">{s.title}</h3>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-white/75">{s.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.outputs.map((o) => (
                <li key={o} className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-bg ring-1 ring-white/30">
                  {o}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
