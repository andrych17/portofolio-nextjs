"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { MaskText } from "@/components/motion/MaskText";
import { freight } from "@/content/logistics/freight";
import { useMediaQuery } from "@/lib/use-media-query";

function Glyph({ i }: { i: number }) {
  const bends = [-46, -58, -38, -30];
  return (
    <svg viewBox="0 0 240 90" className="w-full" aria-hidden>
      <path d={`M16 70Q120 ${70 + bends[i] * 2} 224 70`} fill="none" stroke="rgb(255 255 255 / 0.22)" strokeWidth="1.5" strokeDasharray="3 6" />
      <path d={`M16 70Q120 ${70 + bends[i] * 2} 224 70`} pathLength={100} className="freight-trail" style={{ ["--dur" as string]: `${5 + i}s`, ["--d" as string]: i * 600 }} />
      <circle cx="16" cy="70" r="5" fill="#fff" />
      <circle cx="224" cy="70" r="5" fill="var(--t-accent)" />
    </svg>
  );
}

function Card({ c, i, wide }: { c: (typeof freight.cases)[number]; i: number; wide?: boolean }) {
  return (
    <article className={`flex shrink-0 flex-col rounded-[2rem] bg-fg/[0.04] p-1.5 ring-1 ring-fg/10 ${wide ? "h-[72vh] max-h-[640px] w-[min(520px,42vw)]" : "w-[82vw] max-w-[380px] snap-center"}`}>
      <div className="flex flex-1 flex-col rounded-[calc(2rem-0.375rem)] bg-surface p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.07)] md:p-8">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          <span>Case 0{i + 1}</span>
          <span className="rounded-full px-3 py-1 text-fg ring-1 ring-fg/20">{c.mode}</span>
        </div>
        <div className="my-6 md:my-8">
          <Glyph i={i} />
          <div className="mt-1 flex justify-between font-mono text-[12px] tracking-[0.18em] text-fg/80">
            <span>{c.from}</span>
            <span>{c.to}</span>
          </div>
        </div>
        <h3 className="font-display text-3xl font-semibold leading-none md:text-[2.4rem]">{c.route}</h3>
        <p className="mt-3 text-[15px] text-fg/70">{c.cargo}</p>
        <div className="mt-auto border-t border-line pt-6">
          <p className="font-display text-6xl font-semibold leading-none text-accent md:text-7xl">{c.result}</p>
          <p className="mt-2 text-[15px] text-fg/80">{c.resultNote}</p>
        </div>
      </div>
    </article>
  );
}

export function CaseStudies() {
  const desktop = useMediaQuery("(min-width: 900px) and (hover: hover)");
  const heading = (
    <MaskText as="h2" id="cases-heading" className="font-display text-[clamp(2.8rem,7vw,7rem)] font-semibold leading-[0.92]" lines={["Lanes we", <span key="e" className="text-accent">know by heart.</span>]} />
  );

  if (desktop) {
    return (
      <HorizontalScroll trackClassName="items-center gap-8 pl-10 pr-[20vw]">
        <div className="flex h-[72vh] max-h-[640px] w-[min(640px,48vw)] shrink-0 flex-col justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Selected lanes</p>
            <div className="mt-5">{heading}</div>
          </div>
          <p className="flex max-w-sm items-center gap-3 text-[15px] text-fg/70">
            Keep scrolling <ArrowRightIcon size={18} className="text-accent" />
          </p>
        </div>
        {freight.cases.map((c, i) => (
          <Card key={c.route} c={c} i={i} wide />
        ))}
      </HorizontalScroll>
    );
  }

  return (
    <div>
      <div className="px-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Selected lanes</p>
        <div className="mt-4">{heading}</div>
      </div>
      <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none]">
        {freight.cases.map((c, i) => (
          <Card key={c.route} c={c} i={i} />
        ))}
      </div>
    </div>
  );
}
