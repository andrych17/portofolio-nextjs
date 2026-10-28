"use client";

import Image from "next/image";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { MaskText } from "@/components/motion/MaskText";
import { estate } from "@/content/property/estate";

/** Pinned section: vertical scroll drives a horizontal track of developments. */
export function EstateDevelopments() {
  const items = estate.developments;
  return (
    <div id="developments" role="region" aria-labelledby="developments-h">
      <HorizontalScroll className="bg-surface" trackClassName="items-center gap-5 px-5 md:gap-8 md:px-10">
        <div className="w-[82vw] shrink-0 pr-4 md:w-[34vw] md:pr-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">Developments</p>
          <MaskText
            as="h2"
            id="developments-h"
            className="mt-4 font-display text-[clamp(2.8rem,5.6vw,5.6rem)] leading-[0.95]"
            lines={["Four places,", <em key="e" className="text-[#8a6a28]">one way</em>, "of building."]}
          />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-fg/75">
            Every development starts with a site we would live on ourselves. Keep scrolling to walk through them.
          </p>
          <p className="mt-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
            <span aria-hidden className="h-px w-12 bg-[#8a6a28]" /> 01 to 04
          </p>
        </div>
        {items.map((d, i) => (
          <article key={d.name} className="relative aspect-[4/5] h-[62svh] shrink-0 overflow-hidden rounded-[1.75rem] bg-[#0f2a20] text-[#f6f2ea] md:h-[68svh]">
            <Image src={d.image} alt={d.alt} fill sizes="(min-width: 768px) 560px, 80vw" className="object-cover" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f2a20] via-[#0f2a20]/30 to-transparent" />
            <span className="absolute left-5 top-5 rounded-full bg-[#f6f2ea]/90 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f2a20]">
              {d.status}
            </span>
            <span className="absolute right-5 top-5 font-display text-3xl text-[#f6f2ea]/80">0{i + 1}</span>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <h3 className="font-display text-[2.6rem] leading-none">{d.name}</h3>
              <p className="mt-2 text-sm font-semibold text-[#d6b571]">
                {d.units} · {d.area}
              </p>
              <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-[#f6f2ea]/80">{d.body}</p>
            </div>
          </article>
        ))}
        <div aria-hidden className="w-[8vw] shrink-0" />
      </HorizontalScroll>
    </div>
  );
}
