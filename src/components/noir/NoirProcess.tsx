"use client";

import { AnimatePresence, motion, useInView, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import type { Step } from "@/content/types";

/** Sticky step counter on the left, steps scroll past on the right. */
export function NoirProcess({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });

  return (
    <div ref={ref} className="grid gap-10 md:grid-cols-12">
      <div className="hidden md:col-span-5 md:block">
        <div className="sticky top-32">
          <div className="relative h-[clamp(10rem,22vw,20rem)] overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={active}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: easeStudio }}
                className="font-display text-[clamp(10rem,22vw,20rem)] leading-[0.8] text-accent"
                aria-hidden
              >
                {String(active + 1).padStart(2, "0")}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="mt-8 h-px w-full bg-line">
            <motion.div className="h-px origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{steps[active].title}</p>
        </div>
      </div>
      <ol className="md:col-span-6 md:col-start-7">
        {steps.map((step, i) => (
          <ProcessStep key={step.title} step={step} index={i} onActive={setActive} />
        ))}
      </ol>
    </div>
  );
}

function ProcessStep({ step, index, onActive }: { step: Step; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="flex min-h-[60svh] flex-col justify-center border-b border-line py-16 last:border-b-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span className="text-accent md:hidden">{String(index + 1).padStart(2, "0")} · </span>
        {step.duration}
      </p>
      <h3 className="mt-4 font-display text-6xl leading-none md:text-7xl">{step.title}</h3>
      <p className="mt-6 max-w-lg text-lg text-fg/75">{step.body}</p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {step.outputs.map((output) => (
          <li key={output} className="rounded-full bg-fg/[0.05] px-4 py-1.5 text-sm ring-1 ring-fg/10">
            {output}
          </li>
        ))}
      </ul>
    </li>
  );
}
