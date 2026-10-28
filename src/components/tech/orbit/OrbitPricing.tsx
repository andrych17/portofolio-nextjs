"use client";

import { useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { orbit } from "@/content/tech/orbit";

export function OrbitPricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 md:py-32 border-t border-orbit-border relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orbit-border bg-orbit-surface text-xs font-mono text-orbit-cyan mb-4">
            <span>Predictable Infrastructure Pricing</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-orbit-fg">
            Scale from sandbox tests to thousands of GPUs.
          </h2>
          <p className="mt-4 text-base text-orbit-muted leading-relaxed">
            Transparent per-token rates and reserved bare-metal clusters with zero surprise egress markups.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-xl bg-orbit-surface border border-orbit-border">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                !annual ? "bg-orbit-accent text-white font-semibold shadow-md" : "text-orbit-muted hover:text-orbit-fg"
              }`}
            >
              Hourly / Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                annual ? "bg-orbit-accent text-white font-semibold shadow-md" : "text-orbit-muted hover:text-orbit-fg"
              }`}
            >
              Annual Commitment (-20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {orbit.pricing.map((tier) => {
            const isDedicated = tier.highlight;
            const priceDisplay =
              annual && tier.price === "$2.85" ? "$2.28" : tier.price;

            return (
              <div
                key={tier.name}
                className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl relative transition-all ${
                  isDedicated
                    ? "border-orbit-accent bg-orbit-surface/90 shadow-2xl shadow-orbit-accent/15 ring-1 ring-orbit-accent"
                    : "border-orbit-border bg-orbit-surface/50 hover:border-orbit-border/90"
                }`}
              >
                {isDedicated && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orbit-accent px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-white shadow-md">
                    Recommended Production Pod
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-lg text-orbit-fg">{tier.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orbit-bg border border-orbit-border text-orbit-muted">
                      {tier.badge}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-orbit-muted font-sans leading-relaxed min-h-[36px]">
                    {tier.description}
                  </p>

                  <div className="my-6 pb-6 border-b border-orbit-border/60">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-4xl sm:text-5xl font-extrabold text-orbit-fg">
                        {priceDisplay}
                      </span>
                      <span className="text-xs font-mono text-orbit-muted">{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-orbit-muted">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <CheckIcon size={16} className="text-orbit-emerald shrink-0 mt-0.5" />
                        <span className="text-orbit-fg/90">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <a
                    href="#cluster"
                    className={`w-full flex items-center justify-center rounded-xl py-3 text-xs font-semibold transition-all ${
                      isDedicated
                        ? "bg-orbit-accent text-white shadow-lg shadow-orbit-accent/30 hover:bg-orbit-accent/90 hover:scale-[1.02]"
                        : "border border-orbit-border bg-orbit-bg text-orbit-fg hover:bg-orbit-surface hover:border-orbit-border/80"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
