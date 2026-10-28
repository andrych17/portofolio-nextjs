"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import type { Testimonial } from "@/content/types";

/** Drag or use the buttons to move through quotes. */
export function AtelierTestimonials({ items }: { items: Testimonial[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      setMax(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewport.current) ro.observe(viewport.current);
    return () => ro.disconnect();
  }, []);

  function step(dir: 1 | -1) {
    const card = track.current?.firstElementChild as HTMLElement | null;
    const width = card ? card.offsetWidth + 20 : 400;
    const next = Math.min(0, Math.max(-max, x.get() - dir * width));
    animate(x, next, { duration: 0.9, ease: easeStudio });
  }

  return (
    <div>
      <div className="mb-10 flex items-end justify-between gap-6">
        <p className="text-sm text-muted">Drag to read more</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-white/60 ring-1 ring-black/[0.07] transition-colors hover:bg-white" aria-label="Previous quote">
            <ArrowLeftIcon size={18} />
          </button>
          <button type="button" onClick={() => step(1)} className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-accent text-accent-fg" aria-label="Next quote">
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>
      <div ref={viewport} className="overflow-hidden">
        <motion.ul
          ref={track}
          drag="x"
          dragConstraints={{ left: -max, right: 0 }}
          dragElastic={0.12}
          style={{ x }}
          className="flex cursor-grab gap-5 active:cursor-grabbing"
        >
          {items.map((t, i) => (
            <li key={t.name} className="w-[86vw] shrink-0 select-none sm:w-[520px]">
              <figure className={`flex h-full flex-col justify-between gap-12 rounded-[2rem] p-8 md:p-10 ${i % 2 ? "bg-[#efdcc6]" : "bg-white/70 ring-1 ring-black/[0.05]"}`}>
                <blockquote className="font-display text-[1.7rem] leading-[1.2] md:text-[2rem]">
                  <span aria-hidden className="text-accent">“</span>
                  {t.quote}
                  <span aria-hidden className="text-accent">”</span>
                </blockquote>
                <figcaption className="flex items-center gap-4">
                  <span aria-hidden className="flex size-12 items-center justify-center rounded-full bg-accent font-display text-lg italic text-accent-fg">
                    {t.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                  </span>
                  <span>
                    <span className="block font-medium">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
