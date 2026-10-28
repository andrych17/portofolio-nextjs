"use client";

import { CheckIcon, SparkleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";

type EstimatePlan = {
  id: string;
  name: string;
  desc: string;
  totalFee: number;
  monthly: number;
  visits: number;
  timeline: string;
  scansIncluded: string;
};

const ESTIMATE_PLANS: EstimatePlan[] = [
  {
    id: "veneers-full",
    name: "Full Smile Veneer Suite (8 Teeth)",
    desc: "Master-ceramist hand-layered porcelain veneers with custom micro-texture and shade matching.",
    totalFee: 16800,
    monthly: 395,
    visits: 3,
    timeline: "3 to 4 Weeks",
    scansIncluded: "3D Digital Mockup & Temporary Smile Preview",
  },
  {
    id: "aligners",
    name: "Clear Orthodontic Aligners",
    desc: "Custom medical-grade aligners with remote AI progress monitoring and crystal clear retainer set.",
    totalFee: 4800,
    monthly: 145,
    visits: 4,
    timeline: "6 to 9 Months",
    scansIncluded: "Intraoral Video Scan & 3D Movement Video",
  },
  {
    id: "single-implant",
    name: "Guided Single Implant & Zirconia Crown",
    desc: "Titanium biocompatible post placed with 3D surgical guide, finished with a screw-retained crown.",
    totalFee: 3900,
    monthly: 120,
    visits: 3,
    timeline: "3 to 4 Months",
    scansIncluded: "High-Resolution CBCT Bone Density 3D Scan",
  },
  {
    id: "preventative-bright",
    name: "Airflow Hygiene & In-Studio Whitening",
    desc: "Guided acoustic biofilm removal followed by medical LED hydrogen peroxide shade lifting.",
    totalFee: 580,
    monthly: 48,
    visits: 1,
    timeline: "Single 75-Minute Visit",
    scansIncluded: "Digital Plaque Disclosing Camera Map",
  },
];

export function DentalEstimator() {
  const [selectedPlan, setSelectedPlan] = useState<string>("veneers-full");

  const plan = ESTIMATE_PLANS.find((p) => p.id === selectedPlan) || ESTIMATE_PLANS[0];

  return (
    <section id="estimator" aria-labelledby="estimator-heading" className="bg-surface/50 py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Transparency</Eyebrow>
            <h2 id="estimator-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-tight text-fg">
              Treatment &amp; Investment Guide
            </h2>
            <p className="mt-4 text-muted">
              Select a clinical discipline to preview expected timeline, visit cadence, and flexible interest-free monthly installment plans.
            </p>

            <div className="mt-8 space-y-3">
              {ESTIMATE_PLANS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlan(p.id)}
                  className={`flex w-full cursor-pointer items-start justify-between rounded-2xl p-4 text-left transition-all ${
                    selectedPlan === p.id
                      ? "bg-bg shadow-sm ring-2 ring-accent"
                      : "bg-surface ring-1 ring-line hover:bg-bg"
                  }`}
                >
                  <div className="pr-4">
                    <span className="block text-sm font-semibold text-fg">{p.name}</span>
                    <span className="mt-1 block text-xs text-muted">{p.timeline} · {p.visits} Visits</span>
                  </div>
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      selectedPlan === p.id
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
                  Diagnostic Snapshot
                </span>
                <span className="text-xs text-muted">No Surprise Surcharges</span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold text-fg md:text-3xl">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{plan.desc}</p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-surface p-4 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted">Estimated Fee</span>
                  <p className="mt-1 font-display text-2xl font-semibold text-fg md:text-3xl">
                    ${plan.totalFee.toLocaleString()}
                  </p>
                  <span className="text-[11px] text-muted">Complete treatment</span>
                </div>
                <div className="rounded-2xl bg-surface p-4 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted">From / Month</span>
                  <p className="mt-1 font-display text-2xl font-semibold text-accent md:text-3xl">
                    ${plan.monthly}
                  </p>
                  <span className="text-[11px] text-muted">0% APR available</span>
                </div>
                <div className="col-span-2 rounded-2xl bg-surface p-4 text-center sm:col-span-1">
                  <span className="text-[11px] uppercase tracking-wider text-muted">Time to Finish</span>
                  <p className="mt-1 font-display text-lg font-semibold text-fg md:text-xl">
                    {plan.timeline}
                  </p>
                  <span className="text-[11px] text-muted">{plan.visits} clinical visits</span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-line p-4 text-xs">
                <span className="font-semibold text-fg">Diagnostics Included: </span>
                <span className="text-muted">{plan.scansIncluded}</span>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <p className="text-xs text-muted">
                  Includes full warranty on ceramic work and routine 1-year follow-up check.
                </p>
                <a
                  href="#consult"
                  className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                >
                  Book 3D Smile Scan &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
