"use client";

import { CheckIcon, SparkleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";

type CircuitGoal = {
  id: string;
  name: string;
  objective: string;
  duration: string;
  price: number;
  steps: { time: string; action: string; physiologicalEffect: string }[];
};

const CIRCUITS: CircuitGoal[] = [
  {
    id: "nervous-reset",
    name: "Autonomic Nervous System Reset",
    objective: "Shift from chronic sympathetic fight-or-flight into deep parasympathetic restorative repair.",
    duration: "60 Minutes",
    price: 120,
    steps: [
      { time: "00 – 15 min", action: "Dry Cedar Sauna (80°C)", physiologicalEffect: "Gentle peripheral vasodilation & heat shock proteins" },
      { time: "15 – 18 min", action: "Cold Water Immersion (6°C)", physiologicalEffect: "Vagus nerve tone stimulation & calm nasal breathing" },
      { time: "18 – 35 min", action: "Magnesium Mineral Soak", physiologicalEffect: "Transdermal mineral uptake & smooth muscle relaxation" },
      { time: "35 – 60 min", action: "Vibroacoustic Soundbed", physiologicalEffect: "Theta brainwave entrainment & cortisol reduction" },
    ],
  },
  {
    id: "athletic-flush",
    name: "Athletic Inflammation Flush",
    objective: "Rapid clearance of lactate, reduction of delayed-onset muscle soreness, and tissue oxygenation.",
    duration: "75 Minutes",
    price: 155,
    steps: [
      { time: "00 – 20 min", action: "Infrared Photobiomodulation", physiologicalEffect: "Mitochondrial ATP synthesis & deep connective warming" },
      { time: "20 – 45 min", action: "3x Intense Hot/Cold Cycles", physiologicalEffect: "Aggressive vascular pumping & lymphatic drainage" },
      { time: "45 – 75 min", action: "Normatec Compression & Hydration", physiologicalEffect: "Venous return acceleration with tart cherry electrolytes" },
    ],
  },
  {
    id: "cellular-longevity",
    name: "Cellular Longevity & Repair",
    objective: "Hyperbaric oxygen tissue saturation paired with full-spectrum photobiomodulation.",
    duration: "90 Minutes",
    price: 210,
    steps: [
      { time: "00 – 20 min", action: "Medical LED Light Bed (660nm/850nm)", physiologicalEffect: "Stimulate cytochrome c oxidase & fibroblast collagen" },
      { time: "20 – 80 min", action: "2.0 ATA Hyperbaric Oxygen", physiologicalEffect: "14x plasma oxygen saturation for microvascular healing" },
      { time: "80 – 90 min", action: "Adaptogen Cold-Press Elixir", physiologicalEffect: "Antioxidant cellular stabilization & rehydration" },
    ],
  },
];

export function SereneCircuitPlanner() {
  const [selectedId, setSelectedId] = useState("nervous-reset");

  const current = CIRCUITS.find((c) => c.id === selectedId) || CIRCUITS[0];

  return (
    <section id="circuit" aria-labelledby="circuit-heading" className="bg-surface/50 py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Guided Protocols</Eyebrow>
            <h2 id="circuit-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-tight text-fg">
              Biological Circuit Planner
            </h2>
            <p className="mt-4 text-muted">
              Select your physiological goal to explore evidence-backed sequence times, thermal parameters, and cellular outcomes.
            </p>

            <div className="mt-8 space-y-3">
              {CIRCUITS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  className={`flex w-full cursor-pointer items-start justify-between rounded-2xl p-4 text-left transition-all ${
                    selectedId === c.id
                      ? "bg-bg shadow-sm ring-2 ring-accent"
                      : "bg-surface ring-1 ring-line hover:bg-bg"
                  }`}
                >
                  <div className="pr-4">
                    <span className="block text-sm font-semibold text-fg">{c.name}</span>
                    <span className="mt-1 block text-xs text-muted">{c.duration} · ${c.price}</span>
                  </div>
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      selectedId === c.id
                        ? "border-accent bg-accent text-white"
                        : "border-line bg-bg text-transparent"
                    }`}
                  >
                    <CheckIcon size={12} weight="bold" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] bg-bg p-6 shadow-md ring-1 ring-line md:p-10">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <SparkleIcon size={16} weight="fill" />
                  Protocol Sequence
                </span>
                <span className="text-xs font-semibold text-fg">${current.price} · {current.duration}</span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold text-fg md:text-3xl">
                {current.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{current.objective}</p>

              <div className="mt-8 space-y-4">
                {current.steps.map((st, i) => (
                  <div key={st.action} className="relative flex items-start gap-4 rounded-2xl bg-surface/60 p-4 ring-1 ring-line">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-fg">
                      {i + 1}
                    </span>
                    <div className="grow">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-semibold text-fg text-sm">{st.action}</span>
                        <span className="text-xs font-mono text-muted">{st.time}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted leading-relaxed">{st.physiologicalEffect}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <p className="text-xs text-muted">
                  Includes full access to private shower, herbal tea bar, and organic linen robe.
                </p>
                <a
                  href="#book"
                  className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                >
                  Reserve Protocol &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
