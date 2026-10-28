"use client";

import { useState } from "react";
import { orbit } from "@/content/tech/orbit";

export function OrbitLatencyMap() {
  const [regions, setRegions] = useState(orbit.regions);
  const [pinging, setPinging] = useState(false);

  function simulatePing() {
    setPinging(true);
    setTimeout(() => {
      setRegions((prev) =>
        prev.map((r) => ({
          ...r,
          pingMs: Math.max(6, r.pingMs + Math.floor(Math.random() * 5) - 2),
        }))
      );
      setPinging(false);
    }, 600);
  }

  return (
    <section id="latency" className="py-20 md:py-32 border-t border-orbit-border relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orbit-border bg-orbit-surface text-xs font-mono text-orbit-emerald mb-4">
              <span>Edge Anycast Network</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-orbit-fg">
              Real-time telemetry across 42 global PoPs.
            </h2>
            <p className="mt-4 text-base text-orbit-muted leading-relaxed">
              Every region hosts high-bandwidth NVMe weight caches and warm GPU executor clusters, ensuring client TCP handshakes and inference streams originate within their geographic jurisdiction.
            </p>
          </div>

          <button
            type="button"
            onClick={simulatePing}
            disabled={pinging}
            className="inline-flex items-center gap-2 rounded-xl border border-orbit-border bg-orbit-surface px-5 py-2.5 text-xs font-mono text-orbit-fg hover:bg-orbit-surface-hover hover:border-orbit-accent/40 transition-all disabled:opacity-50"
          >
            <span className={`w-2 h-2 rounded-full ${pinging ? "bg-amber-400 animate-spin" : "bg-orbit-emerald"}`} />
            <span>{pinging ? "Running Global ICMP Ping..." : "Run Global Ping Test"}</span>
          </button>
        </div>

        {/* Region Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {regions.map((reg) => (
            <div
              key={reg.id}
              className="p-5 rounded-2xl border border-orbit-border bg-orbit-surface/50 backdrop-blur-md transition-all hover:border-orbit-border/90 hover:bg-orbit-surface"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] text-orbit-muted px-2 py-0.5 rounded bg-orbit-bg border border-orbit-border">
                  {reg.region}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-orbit-emerald">
                  <span className="w-1.5 h-1.5 rounded-full bg-orbit-emerald animate-pulse" />
                  {reg.pingMs}ms
                </span>
              </div>

              <h3 className="font-heading font-bold text-base text-orbit-fg">{reg.city}</h3>
              <p className="mt-1 text-xs font-mono text-orbit-muted">{reg.cluster}</p>

              <div className="mt-4 pt-3 border-t border-orbit-border/40 flex items-center justify-between text-[11px] font-mono">
                <span className="text-orbit-muted">Direct NVLink</span>
                <span className="text-orbit-cyan font-semibold">900 GB/s</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
