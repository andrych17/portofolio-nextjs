"use client";

import { Eyebrow } from "@/components/Eyebrow";
import { StackCards } from "@/components/motion/StackCards";
import { fleet } from "@/content/logistics/fleet";

export function FleetCapabilities() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-heading" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Motor Equipment · Scroll to Stack</Eyebrow>
            <h2 id="capabilities-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-tight text-fg">
              Fleet Capabilities
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Scroll down to stack our 4 asset-owned carrier divisions — from dual-temp pharmaceutical reefers to two-driver team expedited vans.
            </p>
          </div>
          <div className="text-sm font-medium text-muted">
            100% Asset-owned with zero brokerage pass-through
          </div>
        </div>

        <StackCards top={96} step={24} minScale={0.9} gapClassName="mb-[8vh]">
          {fleet.capabilities.map((c, idx) => (
            <article
              key={c.id}
              className="rounded-[2.2rem] bg-surface p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.14)] ring-1 ring-line md:p-10"
            >
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-accent/12 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                      Division 0{idx + 1}
                    </span>
                    <span className="rounded-full bg-bg px-3.5 py-1 text-xs font-bold text-fg ring-1 ring-line">
                      {c.capacity}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-fg md:text-4xl">{c.name}</h3>
                  <p className="mt-1 text-sm font-medium text-muted">{c.tagline}</p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{c.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-bg/85 px-3 py-1 text-xs font-medium text-fg/85 ring-1 ring-line"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 rounded-2xl bg-bg p-5 ring-1 ring-line lg:col-span-4 lg:grid-cols-1">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-muted">Thermal Range</span>
                    <span className="font-display text-lg font-semibold text-fg">{c.tempRange}</span>
                  </div>
                  <div className="border-t border-line/60 pt-2">
                    <span className="block text-[10px] uppercase tracking-wider text-muted">Telematics</span>
                    <span className="font-display text-lg font-semibold text-accent">{c.telematics}</span>
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
