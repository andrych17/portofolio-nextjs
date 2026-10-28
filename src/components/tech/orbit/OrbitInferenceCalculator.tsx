"use client";

import { useState } from "react";
import { orbit } from "@/content/tech/orbit";

export function OrbitInferenceCalculator() {
  const [modelIndex, setModelIndex] = useState(0);
  const [tokenVolumeM, setTokenVolumeM] = useState(50); // in Millions
  const [concurrency, setConcurrency] = useState(25);

  const model = orbit.models[modelIndex];

  // Base rate calculation
  const pricePerM = parseFloat(model.pricePer1MTokens.replace("$", ""));
  const orbitMonthlyCost = Math.round(tokenVolumeM * pricePerM);
  // Hyperscalers typically cost 2.2x to 3x with idle GPU overhead
  const legacyMonthlyCost = Math.round(orbitMonthlyCost * 2.45);
  const savings = legacyMonthlyCost - orbitMonthlyCost;
  const savingsPercent = Math.round((savings / legacyMonthlyCost) * 100);

  return (
    <section id="calculator" className="py-20 md:py-32 bg-orbit-surface/30 border-t border-orbit-border relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orbit-border bg-orbit-surface text-xs font-mono text-orbit-cyan mb-4">
            <span>Dynamic TCO Modeler</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-orbit-fg">
            Real-time inference throughput &amp; cost calculator.
          </h2>
          <p className="mt-4 text-base text-orbit-muted leading-relaxed">
            Select your target model and monthly token requirements. Pay strictly for generated tokens without paying for idle GPU instances.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6 rounded-2xl border border-orbit-border bg-orbit-surface/80 p-6 sm:p-8 backdrop-blur-xl">
            {/* Model Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-orbit-muted mb-3">
                1. Target Model Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {orbit.models.map((m, idx) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setModelIndex(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      modelIndex === idx
                        ? "border-orbit-accent bg-orbit-accent/15 ring-1 ring-orbit-accent"
                        : "border-orbit-border bg-orbit-bg/50 hover:bg-orbit-surface"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-semibold text-sm text-orbit-fg">
                        {m.name.split(" ")[0]} {m.name.split(" ")[1]}
                      </span>
                      <span className="text-[10px] font-mono text-orbit-accent bg-orbit-accent/20 px-1.5 py-0.5 rounded">
                        {m.family}
                      </span>
                    </div>
                    <div className="mt-2 text-xs font-mono text-orbit-muted flex items-center justify-between">
                      <span>{m.pricePer1MTokens} / 1M tok</span>
                      <span>{m.throughput}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Token Volume Slider */}
            <div className="pt-4 border-t border-orbit-border/60">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="token-slider" className="text-xs font-mono uppercase tracking-wider text-orbit-muted">
                  2. Monthly Ingestion Volume
                </label>
                <span className="font-heading font-bold text-lg text-orbit-fg">
                  {tokenVolumeM} Million <span className="text-xs text-orbit-muted font-normal font-sans">tokens</span>
                </span>
              </div>
              <input
                id="token-slider"
                type="range"
                min="5"
                max="500"
                step="5"
                value={tokenVolumeM}
                onChange={(e) => setTokenVolumeM(Number(e.target.value))}
                className="w-full accent-orbit-accent h-2 bg-orbit-bg rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-orbit-muted mt-1.5">
                <span>5M (Dev)</span>
                <span>100M</span>
                <span>250M</span>
                <span>500M (Scale)</span>
              </div>
            </div>

            {/* Concurrency Slider */}
            <div className="pt-4 border-t border-orbit-border/60">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="concurrency-slider" className="text-xs font-mono uppercase tracking-wider text-orbit-muted">
                  3. Peak Concurrent Request Streams
                </label>
                <span className="font-heading font-bold text-lg text-orbit-fg">
                  {concurrency} <span className="text-xs text-orbit-muted font-normal font-sans">concurrent users</span>
                </span>
              </div>
              <input
                id="concurrency-slider"
                type="range"
                min="5"
                max="200"
                step="5"
                value={concurrency}
                onChange={(e) => setConcurrency(Number(e.target.value))}
                className="w-full accent-orbit-cyan h-2 bg-orbit-bg rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-orbit-muted mt-1.5">
                <span>5 streams</span>
                <span>50 streams</span>
                <span>100 streams</span>
                <span>200 streams</span>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 rounded-2xl border border-orbit-accent/40 bg-gradient-to-b from-orbit-surface to-orbit-bg p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orbit-accent/20 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-orbit-border">
              <span className="text-xs font-mono uppercase text-orbit-muted">Selected Engine</span>
              <span className="text-xs font-mono text-orbit-accent font-semibold">{model.name}</span>
            </div>

            <div className="py-6 space-y-4">
              <div>
                <span className="text-xs text-orbit-muted block font-sans">Estimated Monthly Cost on Your Brand</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-heading text-4xl sm:text-5xl font-black text-orbit-fg">
                    ${orbitMonthlyCost.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-orbit-muted">/ month</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-orbit-surface/80 border border-orbit-border text-xs font-mono space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-orbit-muted">Traditional Cloud (AWS/GCP):</span>
                  <span className="text-slate-400 line-through">${legacyMonthlyCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-orbit-emerald font-semibold">
                  <span>Your Net Infrastructure Savings:</span>
                  <span>${savings.toLocaleString()} ({savingsPercent}%)</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-orbit-bg border border-orbit-border">
                  <span className="text-orbit-muted block text-[10px]">P95 Time to First Token</span>
                  <span className="text-orbit-cyan font-bold text-sm">{model.ttft}</span>
                </div>
                <div className="p-3 rounded-lg bg-orbit-bg border border-orbit-border">
                  <span className="text-orbit-muted block text-[10px]">Generation Throughput</span>
                  <span className="text-orbit-emerald font-bold text-sm">{model.throughput}</span>
                </div>
              </div>
            </div>

            <a
              href="#cluster"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-orbit-accent py-3.5 text-sm font-semibold text-white shadow-lg shadow-orbit-accent/30 hover:bg-orbit-accent/90 transition-all hover:scale-[1.02]"
            >
              <span>Deploy {model.name.split(" ")[0]} Endpoint</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
