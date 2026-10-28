"use client";

import { CheckIcon, SparkleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";

type PayloadConfig = {
  id: string;
  payloadName: string;
  weightTons: number;
  axleLines: number;
  tirePressurePsi: number;
  turningRadius: string;
  escortClass: string;
  trailerType: string;
};

const PAYLOADS: PayloadConfig[] = [
  {
    id: "transformer-150",
    payloadName: "150-Ton Substation Transformer",
    weightTons: 150,
    axleLines: 12,
    tirePressurePsi: 78,
    turningRadius: "48 ft Swept Path",
    escortClass: "Class 1 Superload (2 State Police)",
    trailerType: "12-Axle Goldhofer Hydraulic Platform",
  },
  {
    id: "stator-280",
    payloadName: "280-Ton Steam Turbine Generator",
    weightTons: 280,
    axleLines: 20,
    tirePressurePsi: 84,
    turningRadius: "62 ft Swept Path",
    escortClass: "Class 2 Superload (4 Police + 2 Bucket Trucks)",
    trailerType: "20-Axle Dual-Lane High Girder Frame",
  },
  {
    id: "reactor-420",
    payloadName: "420-Ton Petrochemical Vessel",
    weightTons: 420,
    axleLines: 32,
    tirePressurePsi: 88,
    turningRadius: "360° Carousel Electronic Steer",
    escortClass: "Class 3 Critical Superload (Bridge Bypass)",
    trailerType: "32-Axle SPMT Transporter with Power Pack",
  },
  {
    id: "stamping-600",
    payloadName: "600-Ton Automotive Stamping Bed",
    weightTons: 600,
    axleLines: 48,
    tirePressurePsi: 92,
    turningRadius: "Crab & Diagonal Electronic Steering",
    escortClass: "Custom PE Stamped Civil Route Authority",
    trailerType: "48-Axle Dual-Wide Modular Platform",
  },
];

export function ForgeAxleCalculator() {
  const [selectedId, setSelectedId] = useState("stator-280");

  const current = PAYLOADS.find((p) => p.id === selectedId) || PAYLOADS[0];

  return (
    <section id="calculator" aria-labelledby="calc-heading" className="bg-surface/50 py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Civil Engineering</Eyebrow>
            <h2 id="calc-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-tight text-fg">
              Axle Line &amp; Pressure Modeling
            </h2>
            <p className="mt-4 text-muted">
              Select gross payload weight to simulate axle line requirements, ground load footprint, and required municipal utility escorts.
            </p>

            <div className="mt-8 space-y-3">
              {PAYLOADS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  className={`flex w-full cursor-pointer items-start justify-between rounded-2xl p-4 text-left transition-all ${
                    selectedId === p.id
                      ? "bg-bg shadow-sm ring-2 ring-accent"
                      : "bg-surface ring-1 ring-line hover:bg-bg"
                  }`}
                >
                  <div className="pr-4">
                    <span className="block text-sm font-semibold text-fg">{p.payloadName}</span>
                    <span className="mt-1 block text-xs font-mono text-muted">{p.weightTons} Tons · {p.axleLines} Axle Lines</span>
                  </div>
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      selectedId === p.id
                        ? "border-accent bg-accent text-accent-fg"
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
                  Civil Engineering Output
                </span>
                <span className="font-mono text-xs text-muted">{current.weightTons} Gross Tons</span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold text-fg md:text-3xl">
                {current.payloadName}
              </h3>
              <p className="mt-2 text-sm text-muted">
                Configured with: <span className="font-semibold text-fg">{current.trailerType}</span>
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-surface p-4 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted">Axle Lines</span>
                  <p className="mt-1 font-display text-3xl font-semibold text-accent md:text-4xl">
                    {current.axleLines}
                  </p>
                  <span className="text-[11px] text-muted">Hydraulic suspension</span>
                </div>
                <div className="rounded-2xl bg-surface p-4 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted">Tire Pressure</span>
                  <p className="mt-1 font-display text-2xl font-semibold text-fg md:text-3xl">
                    {current.tirePressurePsi} <span className="text-base text-muted">PSI</span>
                  </p>
                  <span className="text-[11px] text-muted">Bridge safe footprint</span>
                </div>
                <div className="col-span-2 rounded-2xl bg-surface p-4 text-center sm:col-span-1">
                  <span className="text-[11px] uppercase tracking-wider text-muted">Turning Swept Path</span>
                  <p className="mt-1 font-display text-base font-semibold text-fg md:text-lg">
                    {current.turningRadius}
                  </p>
                  <span className="text-[11px] text-muted">Lidar mapped route</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-line p-4 text-xs font-mono">
                <span className="font-bold text-accent">Permit Protocol: </span>
                <span className="text-muted">{current.escortClass}</span>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <p className="text-xs text-muted">
                  Includes full PE-stamped route survey and state DOT bridge engineering approvals.
                </p>
                <a
                  href="#quote"
                  className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                >
                  Initiate Feasibility Study &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
