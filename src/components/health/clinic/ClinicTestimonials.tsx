"use client";

import { QuotesIcon } from "@phosphor-icons/react";
import { useId, useState } from "react";
import { clinic } from "@/content/health/clinic";

/** Pick a patient, read their note. All quotes stay in the HTML. */
export function ClinicTestimonials() {
  const [active, setActive] = useState(0);
  const id = useId();
  const items = clinic.testimonials;

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
      <div className="relative md:col-span-8">
        <QuotesIcon aria-hidden weight="fill" className="absolute left-0 top-0 size-14 text-accent md:size-[4.5rem]" />
        {items.map((t, i) => (
          <figure key={t.name} id={`${id}-q-${i}`} hidden={i !== active} className="clinic-panel pt-[4.75rem] md:pt-28">
            <blockquote className="font-display text-[clamp(1.9rem,3.8vw,3.5rem)] leading-[1.04]">{t.quote}</blockquote>
            <figcaption className="mt-8 text-[15px] font-semibold">
              {t.name}
              <span className="font-normal text-fg/60"> · {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div role="group" aria-label="Choose a patient story" className="clinic-scroll -mx-5 flex gap-2 overflow-x-auto px-5 md:col-span-4 md:mx-0 md:flex-col md:self-end md:overflow-visible md:px-0">
        {items.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            aria-controls={`${id}-q-${i}`}
            className={`flex min-h-14 shrink-0 cursor-pointer items-center gap-3 rounded-full px-5 text-left text-[15px] font-semibold ring-1 transition-colors duration-500 ${
              i === active ? "bg-fg text-bg ring-fg" : "ring-fg/20 hover:ring-fg/50"
            }`}
          >
            <span aria-hidden className={`grid size-8 shrink-0 place-items-center rounded-full text-sm ${i === active ? "bg-accent text-fg" : "bg-fg/10"}`}>
              {t.name[0]}
            </span>
            <span className="truncate">
              {t.name}
              <span className="hidden font-normal opacity-60 md:inline"> · {t.role}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
