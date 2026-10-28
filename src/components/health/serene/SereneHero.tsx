"use client";

import { useState } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText, SplitWords } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { serene } from "@/content/health/serene";

export function SereneHero() {
  const [thermalMode, setThermalMode] = useState<"sauna" | "plunge">("sauna");

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3">
            <Eyebrow>Longevity Sanctuary · Private Thermal Suites</Eyebrow>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent ring-1 ring-accent/20">
              Contrast &amp; Cellular Recovery
            </span>
          </div>

          <MaskText
            as="h1"
            lines={[
              "Restoring the body",
              <span key="2" className="italic text-accent">through contrast &amp; stillness.</span>,
            ]}
            className="mt-6 font-display text-[clamp(2.8rem,6.4vw,5.6rem)] font-semibold leading-[0.98] tracking-tight text-fg"
          />

          <p
            data-speakable
            className="mx-auto mt-6 max-w-2xl text-[1.1rem] leading-relaxed text-muted md:text-[1.22rem]"
          >
            <SplitWords text={serene.answer} />
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.22}>
              <a
                href="#book"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 ease-studio hover:scale-[1.02]"
              >
                <span>Book Private Circuit</span>
                <ArrowIsland size={14} className="bg-white/20 text-white" />
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a
                href="#therapies"
                className="inline-flex min-h-12 items-center rounded-full bg-surface px-6 py-2 text-sm font-semibold text-fg ring-1 ring-line transition-colors hover:bg-bg"
              >
                Glide Recovery Protocols
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Wide Parallax Sanctuary + Interactive Thermal Contrast Switcher */}
        <div className="relative mt-12 overflow-hidden rounded-[2.5rem] bg-surface/65 p-2.5 ring-1 ring-line shadow-xl">
          <ParallaxImage
            src={serene.heroImage}
            alt={serene.heroAlt}
            sizes="95vw"
            offset={60}
            priority
            className="aspect-[16/8] w-full rounded-[2rem]"
          />

          <div className="mt-3 flex flex-col items-center justify-between gap-4 rounded-2xl bg-bg/95 p-4 ring-1 ring-line sm:flex-row">
            <div className="flex items-center gap-2 rounded-full bg-surface p-1 ring-1 ring-line">
              <button
                type="button"
                onClick={() => setThermalMode("sauna")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  thermalMode === "sauna" ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"
                }`}
              >
                85°C Cedar Sauna
              </button>
              <button
                type="button"
                onClick={() => setThermalMode("plunge")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  thermalMode === "plunge" ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"
                }`}
              >
                4°C Cold Plunge
              </button>
            </div>

            <p className="text-xs font-medium text-fg sm:text-sm">
              {thermalMode === "sauna"
                ? "Phase 01 · 18-minute Finnish dry cedar heat triggers heat-shock proteins & vasodilation."
                : "Phase 02 · 3-minute 4°C continuous-flow plunge spikes norepinephrine by 250%."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
