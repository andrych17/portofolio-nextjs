"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { freight } from "@/content/logistics/freight";

export function FreightTestimonials() {
  const [[i, dir], setState] = useState<[number, number]>([0, 1]);
  const items = freight.testimonials;
  const go = (d: number) => setState([(i + d + items.length) % items.length, d]);
  const t = items[i];

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">What shippers say</p>
        <div className="mt-8 flex items-center gap-3">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="flex size-12 cursor-pointer items-center justify-center rounded-full ring-1 ring-fg/20 transition-colors hover:bg-fg/10">
            <ArrowLeftIcon size={18} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-accent text-accent-fg transition-transform duration-500 ease-studio hover:scale-105">
            <ArrowRightIcon size={18} />
          </button>
          <p className="ml-3 font-mono text-sm text-muted">
            0{i + 1} / 0{items.length}
          </p>
        </div>
      </div>
      <div className="relative min-h-[320px] md:col-span-8 md:min-h-[300px]" aria-live="polite">
        <span aria-hidden className="absolute -top-6 left-0 font-display text-[9rem] leading-none text-accent/25">“</span>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.figure
            key={i}
            custom={dir}
            initial={{ opacity: 0, x: 40 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 * dir }}
            transition={{ duration: 0.55, ease: easeStudio }}
            className="relative pt-14"
          >
            <blockquote className="font-display text-[clamp(1.7rem,3.2vw,3rem)] font-medium leading-[1.12]">{t.quote}</blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span aria-hidden className="flex size-12 items-center justify-center rounded-full bg-surface font-display text-lg ring-1 ring-fg/15">
                {t.name[0]}
              </span>
              <span>
                <span className="block font-medium">{t.name}</span>
                <span className="block text-sm text-muted">{t.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </div>
  );
}
