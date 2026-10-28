"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { maison } from "@/content/fashion/maison";

/** One quote at a time. All three stay in the HTML, stacked in one grid cell. */
export function MaisonTestimonials() {
  const [index, setIndex] = useState(0);
  const items = maison.testimonials;
  const go = (d: number) => setIndex((i) => (i + d + items.length) % items.length);

  return (
    <section aria-labelledby="voices-title" className="border-y border-line">
      <div className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <h2 id="voices-title" className="maison-caps text-muted md:col-span-3">
            (07) Clients
          </h2>
          <div className="md:col-span-9">
            <div className="grid">
              {items.map((item, i) => {
                const on = i === index;
                return (
                  <figure
                    key={item.name}
                    inert={!on}
                    aria-hidden={!on}
                    className="col-start-1 row-start-1 transition-[opacity,transform] duration-[1100ms] ease-studio"
                    style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(24px)" }}
                  >
                    <blockquote className="font-display text-[clamp(1.9rem,3.9vw,4rem)] font-light italic leading-[1.1]">
                      <span aria-hidden className="mr-2 text-accent">&ldquo;</span>
                      {item.quote}
                    </blockquote>
                    <figcaption className="maison-caps mt-8 flex flex-wrap gap-x-4 text-muted">
                      <span className="text-fg">{item.name}</span>
                      <span>{item.role}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
            <div className="mt-12 flex items-center gap-5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous quote"
                className="grid size-12 cursor-pointer place-items-center rounded-full ring-1 ring-fg/25 transition-colors duration-500 ease-studio hover:bg-fg hover:text-bg"
              >
                <ArrowLeftIcon size={16} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next quote"
                className="grid size-12 cursor-pointer place-items-center rounded-full ring-1 ring-fg/25 transition-colors duration-500 ease-studio hover:bg-fg hover:text-bg"
              >
                <ArrowRightIcon size={16} weight="bold" />
              </button>
              <p className="maison-caps tabular-nums text-muted">
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
