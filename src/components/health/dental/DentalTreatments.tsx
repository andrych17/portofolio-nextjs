"use client";

import { Eyebrow } from "@/components/Eyebrow";
import { StackCards } from "@/components/motion/StackCards";
import { dental } from "@/content/health/dental";

export function DentalTreatments() {
  return (
    <section id="treatments" aria-labelledby="treatments-heading" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Clinical Disciplines · Scroll to Stack</Eyebrow>
            <h2 id="treatments-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-tight text-fg">
              Bespoke Treatments
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Each clinical protocol pins and stacks in 3D space as you scroll — complete with duration, visit count, and biomimetic recovery metrics.
            </p>
          </div>
          <div className="text-sm font-medium text-muted">
            All plans include full 3D diagnostic mockups
          </div>
        </div>

        <StackCards top={96} step={24} minScale={0.9} gapClassName="mb-[8vh]">
          {dental.treatments.map((t, idx) => (
            <article
              key={t.id}
              className="rounded-[2.2rem] bg-surface p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.12)] ring-1 ring-line md:p-10"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-accent/12 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                      0{idx + 1} · Clinical Discipline
                    </span>
                    <span className="rounded-full bg-bg px-3.5 py-1 text-xs font-bold text-fg ring-1 ring-line">
                      {t.priceEstimate}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-fg md:text-4xl">{t.name}</h3>
                  <p className="mt-1 text-sm font-medium text-accent">{t.tagline}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{t.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {t.suitableFor.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-bg/85 px-3 py-1 text-xs font-medium text-fg/85 ring-1 ring-line"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 rounded-2xl bg-bg p-5 ring-1 ring-line lg:col-span-4 lg:grid-cols-1">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-muted">Chair Duration</span>
                    <span className="font-display text-lg font-semibold text-fg">{t.duration}</span>
                  </div>
                  <div className="border-t border-line/60 pt-2">
                    <span className="block text-[10px] uppercase tracking-wider text-muted">Clinical Visits</span>
                    <span className="font-display text-lg font-semibold text-fg">{t.visits}</span>
                  </div>
                  <div className="border-t border-line/60 pt-2">
                    <span className="block text-[10px] uppercase tracking-wider text-muted">Recovery Window</span>
                    <span className="font-display text-lg font-semibold text-accent">{t.recovery}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </StackCards>
      </div>
    </section>
  );
}
