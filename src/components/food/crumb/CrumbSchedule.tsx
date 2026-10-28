"use client";

import { ClockIcon, FireIcon, SparkleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { crumb } from "@/content/food/crumb";

const FERMENT_STAGES = [
  {
    hours: 12,
    name: "Autolyse & Initial Bulk",
    notes: "Flour hydrates, enzymatic activity awakens natural grain sweetness.",
    digestibility: "Initial breakdown",
    crust: "Soft golden yellow",
  },
  {
    hours: 24,
    name: "Cold Retardation",
    notes: "Lactic acid bacteria multiply in cold room (4°C), producing gentle creamy dairy notes.",
    digestibility: "Moderate gluten softening",
    crust: "Light amber with fine bubbles",
  },
  {
    hours: 36,
    name: "Peak Wild Maturation",
    notes: "Optimal balance of wild yeast lift and complex wheaty sourness. High gelatinization.",
    digestibility: "Maximum nutrient bioavailability",
    crust: "Deep bronze blistered crust",
  },
  {
    hours: 48,
    name: "Extended Dark Rye Proof",
    notes: "Reserved for dark whole grains, yielding intense caramelized molasses notes.",
    digestibility: "Near total phytic acid degradation",
    crust: "Caramelized dark mahogany",
  },
];

export function CrumbSchedule() {
  const [activeStage, setActiveStage] = useState(2); // 36h default

  const current = FERMENT_STAGES[activeStage];

  return (
    <section id="schedule" aria-labelledby="schedule-heading" className="bg-surface/50 py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Oven Timing</Eyebrow>
            <h2 id="schedule-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-tight text-fg">
              Morning Deck Pulls
            </h2>
            <p className="mt-4 text-muted">
              We bake in waves so every neighbor enjoys loaves and viennoiserie warm from the oven deck throughout the morning.
            </p>

            <div className="mt-8 space-y-4">
              {crumb.schedule.map((slot) => (
                <div
                  key={slot.time}
                  className="flex items-center justify-between rounded-2xl bg-bg p-4 shadow-sm ring-1 ring-line"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
                      <ClockIcon size={20} weight="fill" />
                    </span>
                    <div>
                      <span className="font-display text-lg font-semibold text-fg">{slot.time}</span>
                      <p className="text-xs text-muted">{slot.item}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-accent">{slot.status}</span>
                    <p className="text-[11px] text-muted">{slot.temp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] bg-bg p-6 shadow-md ring-1 ring-line md:p-10">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <SparkleIcon size={16} weight="fill" />
                  Fermentation Science
                </span>
                <span className="text-xs text-muted">Interactive Maturity Curve</span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold text-fg md:text-3xl">
                The Anatomy of {current.hours}-Hour Fermentation
              </h3>
              <p className="mt-2 text-sm text-muted">{current.notes}</p>

              {/* Slider Control */}
              <div className="mt-8">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted">
                  <span>12h Quick</span>
                  <span className="text-accent font-bold">Current: {current.hours} Hours</span>
                  <span>48h Deep</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="1"
                  value={activeStage}
                  onChange={(e) => setActiveStage(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface accent-accent"
                />
                <div className="mt-2 flex justify-between text-xs text-muted">
                  {FERMENT_STAGES.map((s, idx) => (
                    <button
                      key={s.hours}
                      type="button"
                      onClick={() => setActiveStage(idx)}
                      className={`cursor-pointer transition-colors ${
                        activeStage === idx ? "font-bold text-accent" : "hover:text-fg"
                      }`}
                    >
                      {s.hours}h
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Result Details */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-surface p-4">
                  <span className="text-xs uppercase tracking-wider text-muted">Crust Blistering</span>
                  <p className="mt-1 font-display text-lg font-semibold text-fg">{current.crust}</p>
                </div>
                <div className="rounded-2xl bg-surface p-4">
                  <span className="text-xs uppercase tracking-wider text-muted">Gut Digestibility</span>
                  <p className="mt-1 font-display text-lg font-semibold text-accent">{current.digestibility}</p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-accent/10 p-4 text-xs text-accent">
                <FireIcon size={20} weight="fill" className="shrink-0" />
                <span>
                  Every country loaf undergoes this full 36-hour slow maturation process before meeting the cast-iron hearth.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
