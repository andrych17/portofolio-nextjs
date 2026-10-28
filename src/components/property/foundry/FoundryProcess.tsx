"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { foundry } from "@/content/property/foundry";

const steps = foundry.process;

/** A yellow rebar line fills down the rail as the list scrolls. Each step's marker flips once the line passes it. */
export function FoundryProcess() {
  const ref = useRef<HTMLOListElement>(null);
  // Read after mount: Motion reports the preference on the client's first render but not on the server, which would break hydration.
  const prefers = useReducedMotion();
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(Boolean(prefers)), [prefers]);
  const [passed, setPassed] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.7"] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
  useMotionValueEvent(scrollYProgress, "change", (v) => !reduce && setPassed(Math.round(v * steps.length + 0.35)));

  return (
    <div className="relative">
      <span aria-hidden className="absolute bottom-0 left-[1.15rem] top-2 w-1 bg-fg/15 md:left-[1.4rem]" />
      <motion.span aria-hidden className="absolute bottom-0 left-[1.15rem] top-2 w-1 origin-top bg-accent ring-1 ring-fg md:left-[1.4rem]" style={{ scaleY: reduce ? 1 : fill }} />
      <ol ref={ref} className="space-y-14 md:space-y-20">
        {steps.map((s, i) => {
          const on = i < (reduce ? steps.length : passed);
          return (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: easeStudio }}
              className="relative grid grid-cols-[2.4rem_1fr] gap-x-5 md:grid-cols-[2.9rem_1fr] md:gap-x-8"
            >
              <span
                aria-hidden
                className={`relative z-10 mt-1 grid size-[2.4rem] place-items-center font-mono text-[12px] font-medium ring-1 ring-fg transition-colors duration-500 ease-studio md:size-[2.9rem] ${on ? "bg-accent text-accent-fg" : "bg-bg text-fg/60"}`}
              >
                {s.n}
              </span>
              <div>
                <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-fg/60">{s.time}</p>
                <h3 className="mt-2 font-display text-[clamp(2.4rem,4vw,4rem)] leading-[0.9]">{s.title}</h3>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-fg/75">{s.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.outputs.map((o) => (
                    <li key={o} className="bg-fg px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-bg">
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
