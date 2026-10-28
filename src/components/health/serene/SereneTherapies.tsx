"use client";

import { Eyebrow } from "@/components/Eyebrow";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { serene } from "@/content/health/serene";

export function SereneTherapies() {
  return (
    <div id="therapies">
      <HorizontalScroll className="border-y border-line bg-surface/40" trackClassName="gap-8 px-6 md:px-16 items-center">
        <div className="w-[82vw] shrink-0 md:w-[420px]">
          <Eyebrow>Recovery Protocols · Scroll to Glide</Eyebrow>
          <h2 id="therapies-heading" className="mt-3 font-display text-[clamp(2.4rem,4.8vw,4.3rem)] font-semibold leading-[0.98] text-fg">
            Biological therapies in private suites.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            Scroll down to glide horizontally through our 4 core cellular recovery chambers — from contrast hydrotherapy to hyperbaric oxygen.
          </p>
        </div>

        {serene.therapies.map((t, idx) => (
          <article
            key={t.id}
            className="flex w-[84vw] shrink-0 flex-col justify-between rounded-[2.2rem] bg-surface p-7 ring-1 ring-line md:w-[480px] md:p-8"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-accent/12 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  Protocol 0{idx + 1}
                </span>
                <span className="rounded-full bg-bg px-3.5 py-1 text-xs font-bold text-fg ring-1 ring-line">
                  ${t.price} / session
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold text-fg md:text-3xl">{t.name}</h3>
              <p className="mt-1 text-sm font-medium text-muted">{t.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{t.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {t.benefits.map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-bg/85 px-3 py-1 text-xs font-medium text-fg/85 ring-1 ring-line"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2 border-t border-line/60 pt-4 text-xs text-muted">
              <div>
                <span className="block text-[10px] uppercase tracking-wider opacity-70">Thermal</span>
                <span className="font-medium text-fg">{t.temperature}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider opacity-70">Duration</span>
                <span className="font-medium text-fg">{t.duration}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-wider opacity-70">Target</span>
                <span className="font-medium text-accent">{t.targetMetric}</span>
              </div>
            </div>
          </article>
        ))}
      </HorizontalScroll>
    </div>
  );
}
