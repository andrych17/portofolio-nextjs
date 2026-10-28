"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import type { Testimonial } from "@/content/types";

export function EstateTestimonials({ items }: { items: Testimonial[] }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);
  const t = items[i];

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-4">
        <p className="font-display text-[clamp(5rem,10vw,9rem)] leading-[0.8] text-[#d6b571]">
          0{i + 1}
          <span className="text-[#f6f2ea]/25">/0{items.length}</span>
        </p>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex size-12 cursor-pointer items-center justify-center rounded-full ring-1 ring-white/30 transition-colors duration-500 hover:bg-[#d6b571] hover:text-[#0f2a20]"
          >
            <ArrowLeftIcon size={18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex size-12 cursor-pointer items-center justify-center rounded-full ring-1 ring-white/30 transition-colors duration-500 hover:bg-[#d6b571] hover:text-[#0f2a20]"
          >
            <ArrowRightIcon size={18} weight="bold" />
          </button>
        </div>
      </div>
      <figure className="relative min-h-[22rem] md:col-span-8 md:min-h-[20rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: easeStudio }}
          >
            <blockquote className="font-display text-[clamp(1.7rem,3.2vw,3rem)] italic leading-[1.18]">
              <span aria-hidden className="mr-1 text-[#d6b571]">&ldquo;</span>
              {t.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 text-sm">
              <span aria-hidden className="h-px w-12 bg-[#d6b571]" />
              <span className="font-semibold">{t.name}</span>
              <span className="text-[#f6f2ea]/60">{t.role}</span>
            </figcaption>
          </motion.div>
        </AnimatePresence>
      </figure>
    </div>
  );
}
