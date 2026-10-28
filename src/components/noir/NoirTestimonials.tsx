"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import type { Testimonial } from "@/content/types";

export function NoirTestimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const item = items[index];
  const go = (step: number) => setIndex((i) => (i + step + items.length) % items.length);

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Kind words</p>
        <p className="mt-3 font-mono text-sm" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
      </div>
      <div className="min-h-[22rem] md:col-span-9 md:min-h-[26rem]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: easeStudio }}
          >
            <blockquote className="font-display text-[clamp(2rem,4.4vw,4.2rem)] leading-[1.05]">
              <span className="text-accent">“</span>
              {item.quote}
              <span className="text-accent">”</span>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 text-sm">
              <span className="h-px w-10 bg-accent" />
              <span>
                {item.name}
                <span className="block text-muted">{item.role}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="mt-10 flex gap-3">
          {[
            { step: -1, label: "Previous testimonial", Icon: ArrowLeftIcon },
            { step: 1, label: "Next testimonial", Icon: ArrowRightIcon },
          ].map(({ step, label, Icon }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => go(step)}
              className="flex size-12 cursor-pointer items-center justify-center rounded-full ring-1 ring-fg/15 transition-colors duration-500 ease-studio hover:bg-accent hover:text-accent-fg hover:ring-accent"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
