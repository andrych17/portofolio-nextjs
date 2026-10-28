"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { atrium } from "@/content/property/atrium";
import { useMediaQuery } from "@/lib/use-media-query";

const { lightwell } = atrium;

/** A pinned stage. The photo starts as a small square window, like looking up a light well, and opens to full bleed as you scroll. */
export function AtriumLightwell() {
  const ref = useRef<HTMLElement>(null);
  // Read after mount: Motion reports the preference on the client's first render but not on the server, which would break hydration.
  const prefers = useReducedMotion();
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(Boolean(prefers)), [prefers]);
  const wide = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 0.6], [wide ? 33 : 22, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [wide ? 27 : 34, 0]);
  const clipPath = useMotionTemplate`inset(${y}% ${x}% ${y}% ${x}%)`;
  const zoom = useTransform(scrollYProgress, [0, 0.8], [1.3, 1]);
  const shade = useTransform(scrollYProgress, [0, 0.6], [0.2, 0.5]);
  const note = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const noteY = useTransform(scrollYProgress, [0.55, 0.8], [24, 0]);

  if (reduce) {
    return (
      <section aria-labelledby="well-h" className="relative min-h-svh overflow-hidden bg-[var(--a-ink)] text-bg">
        <Image src={lightwell.src} alt={lightwell.alt} fill sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-[var(--a-ink)]/60" />
        <div className="absolute inset-x-0 bottom-0 mx-auto grid max-w-[1440px] gap-6 px-5 pb-24 md:grid-cols-12 md:items-end md:gap-10 md:px-10 md:pb-16">
          <div className="md:col-span-8">
            <Eyebrow className="bg-white/12 text-bg ring-1 ring-white/25">L03 · The void</Eyebrow>
            <h2 id="well-h" className="mt-5 font-display text-[clamp(2.1rem,6.2vw,6.4rem)] leading-[0.94]">
              {lightwell.lines.map((l, i) => (
                <span key={l} className="block">
                  {i === 2 ? <b>{l}</b> : l}
                </span>
              ))}
            </h2>
          </div>
          <p className="max-w-sm text-[15.5px] leading-relaxed text-white/80 md:col-span-3 md:col-start-10">{lightwell.note}</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="well-h" className="relative h-[250svh] bg-[var(--a-ink)] text-bg">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div aria-hidden className="atrium-cols-dark absolute inset-0" />
        <motion.div className="absolute inset-0" style={{ clipPath }}>
          <motion.div className="absolute inset-0" style={{ scale: zoom }}>
            <Image src={lightwell.src} alt={lightwell.alt} fill sizes="100vw" className="object-cover" />
          </motion.div>
          <motion.div aria-hidden className="absolute inset-0 bg-[var(--a-ink)]" style={{ opacity: shade }} />
        </motion.div>

        <p aria-hidden className="absolute left-5 top-24 font-mono text-[11px] uppercase tracking-[0.12em] text-white/60 md:left-10">
          Marlow Yard · level 12 · looking up
        </p>

        <div className="absolute inset-x-0 bottom-0 mx-auto grid max-w-[1440px] gap-6 px-5 pb-24 md:grid-cols-12 md:items-end md:gap-10 md:px-10 md:pb-16">
          <div className="md:col-span-8">
            <Eyebrow className="bg-white/12 text-bg ring-1 ring-white/25 backdrop-blur">L03 · The void</Eyebrow>
            <h2 id="well-h" className="mt-5 font-display text-[clamp(2.1rem,6.2vw,6.4rem)] leading-[0.94]">
              {lightwell.lines.map((l, i) => (
                <span key={l} className="block">
                  {i === 2 ? <b>{l}</b> : l}
                </span>
              ))}
            </h2>
          </div>
          <motion.p
            className="max-w-sm text-[15.5px] leading-relaxed text-white/80 md:col-span-3 md:col-start-10"
            style={{ opacity: note, y: noteY }}
          >
            {lightwell.note}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
