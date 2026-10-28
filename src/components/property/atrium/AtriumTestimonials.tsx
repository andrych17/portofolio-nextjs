"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { atrium } from "@/content/property/atrium";

const quotes = atrium.testimonials;

/** One quote at a time. All three stay in the HTML, stacked in the same grid cell, so crawlers and screen readers see them. */
export function AtriumTestimonials() {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + quotes.length) % quotes.length);
  const btn =
    "grid size-12 cursor-pointer place-items-center rounded-full ring-1 ring-fg/30 transition-colors duration-500 ease-studio hover:bg-fg hover:text-bg hover:ring-fg";

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-3">
        <p className="font-display text-[5rem] leading-none tabular-nums md:text-[7rem]" aria-hidden>
          0{i + 1}
          <span className="text-[1.6rem] text-fg/45 md:text-[2.2rem]"> / 0{quotes.length}</span>
        </p>
        <div className="mt-8 flex gap-3">
          <button type="button" onClick={() => go(i - 1)} className={btn} aria-label="Previous quote">
            <ArrowLeftIcon size={18} weight="bold" aria-hidden />
          </button>
          <button type="button" onClick={() => go(i + 1)} className={btn} aria-label="Next quote">
            <ArrowRightIcon size={18} weight="bold" aria-hidden />
          </button>
        </div>
      </div>
      <div className="md:col-span-9">
        <div className="grid">
          {quotes.map((q, n) => (
            <figure
              key={q.name}
              aria-hidden={n !== i}
              className={`[grid-area:1/1] transition-[opacity,transform] duration-700 ease-studio ${n === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"}`}
            >
              <blockquote className="font-display text-[clamp(1.8rem,3.7vw,3.5rem)] leading-[1.08]">{q.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-4 font-mono text-[11.5px] uppercase tracking-[0.1em] text-fg/65">
                <span aria-hidden className="h-px w-10 bg-fg/40" />
                <span>
                  <span className="text-fg">{q.name}</span> · {q.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
