"use client";

import { motion, useInView, useScroll, useSpring } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import type { Step } from "@/content/types";

const photos = [
  { src: "/template/images/atelier/hero.jpg", alt: "A long wooden table in a sunlit café" },
  { src: "/template/images/atelier/flatlay.jpg", alt: "Sketches and type samples spread across a desk" },
  { src: "/template/images/atelier/specimen.jpg", alt: "Rows of metal type parts laid out on white paper" },
  { src: "/template/images/atelier/canal.jpg", alt: "Boats moored along a canal lined with old houses" },
];

/** Sticky rail with a progress line on the left, step cards on the right. */
export function AtelierProcessRail({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 40%", "end 70%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <div ref={ref} className="grid gap-12 md:grid-cols-12">
      <nav aria-label="Steps" className="hidden md:col-span-4 md:block">
        <div className="sticky top-32 flex gap-6">
          <div className="relative w-px bg-line">
            <motion.span style={{ scaleY }} className="absolute inset-0 origin-top bg-accent" />
          </div>
          <ol className="space-y-5 py-1">
            {steps.map((step, i) => (
              <li key={step.title}>
                <a href={`#step-${i + 1}`} className={`block transition-colors duration-500 ${active === i ? "text-fg" : "text-fg/35 hover:text-fg/70"}`}>
                  <span className="text-xs tabular-nums">0{i + 1}</span>
                  <span className={`block font-display text-4xl leading-tight transition-all duration-500 ease-studio ${active === i ? "italic" : ""}`}>{step.title}</span>
                  <span className="text-sm text-muted">{step.duration}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <ol className="space-y-6 md:col-span-8">
        {steps.map((step, i) => (
          <StepCard key={step.title} step={step} index={i} onActive={setActive} />
        ))}
      </ol>
    </div>
  );
}

function StepCard({ step, index, onActive }: { step: Step; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const photo = photos[index % photos.length];

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <motion.li
      ref={ref}
      id={`step-${index + 1}`}
      className="scroll-mt-32 rounded-[2rem] bg-white/45 p-1.5 ring-1 ring-black/[0.06]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: easeStudio }}
    >
      <article className="grid overflow-hidden rounded-[calc(2rem-0.375rem)] bg-bg/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] md:grid-cols-5">
        <div className="relative aspect-[16/10] md:col-span-2 md:aspect-auto">
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
        </div>
        <div className="p-7 md:col-span-3 md:p-10">
          <p className="text-sm text-muted">
            Step 0{index + 1} · {step.duration}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none md:text-5xl">{step.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-fg/75">{step.body}</p>
          <h3 className="mt-7 text-[11px] uppercase tracking-[0.2em] text-muted">You get</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {step.outputs.map((o) => (
              <li key={o} className="rounded-full bg-surface px-3.5 py-1.5 text-sm">
                {o}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </motion.li>
  );
}
