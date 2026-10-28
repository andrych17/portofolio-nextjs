"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { maison } from "@/content/fashion/maison";

/** Four steps down a vertical SVG line that draws itself as the list scrolls past. */
export function MaisonProcess() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 0.7", "end 0.6"] });
  const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <section id="process" aria-labelledby="process-title" className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-40">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <p className="maison-caps text-muted">(06) How a piece is made</p>
            <MaskText
              as="h2"
              id="process-title"
              className="mt-5 font-display text-[clamp(3rem,5.6vw,6.2rem)] font-light leading-[0.92] tracking-[-0.02em]"
              lines={["From first", "conversation to", <em key="e" className="text-accent">last stitch.</em>]}
            />
            <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-fg/70">
              Four steps, the same people throughout. Nothing is outsourced and nothing is rushed past the point where it would show.
            </p>
          </div>
        </div>

        <ol ref={list} className="relative md:col-span-6 md:col-start-7">
          <svg aria-hidden className="absolute left-0 top-0 h-full w-3" viewBox="0 0 2 100" preserveAspectRatio="none">
            <path d="M1 0 V100" stroke="var(--t-line)" strokeWidth="0.17" fill="none" />
            <motion.path
              d="M1 0 V100"
              stroke="var(--t-accent)"
              strokeWidth="0.34"
              fill="none"
              className="maison-draw"
              style={{ pathLength }}
            />
          </svg>
          {maison.process.map((step, i) => (
            <li key={step.title} className="relative pb-16 pl-10 last:pb-0 md:pl-16">
              <Reveal y={28}>
                <p className="maison-caps text-accent">Step {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-4xl font-light leading-none md:text-6xl">{step.title}</h3>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg/70">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
