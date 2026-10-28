"use client";

import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { Tilt } from "@/components/motion/Tilt";
import { orbit } from "@/content/tech/orbit";

export function OrbitArchitectureBento() {
  return (
    <section id="architecture" className="py-20 md:py-32 bg-orbit-surface/20 border-t border-orbit-border relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orbit-border bg-orbit-surface text-xs font-mono text-orbit-accent mb-4">
            <span>Hardware Architecture · Scroll-Lit Telemetry</span>
          </div>
          <ScrollWords
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-orbit-fg leading-[1.12]"
            text="Standard clouds suffer from PCI-e bottlenecks and shared memory thrashing. Our architecture isolates high-bandwidth NVLink memory buses for deterministic token streaming."
          />
        </div>

        {/* 3D Tilt Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {orbit.bento.map((item, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <Reveal
                key={item.id}
                delay={idx * 0.08}
                className={isLarge ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <Tilt max={6} className="h-full">
                  <div className="h-full rounded-2xl border border-orbit-border bg-orbit-surface/80 p-6 sm:p-8 backdrop-blur-xl relative flex flex-col justify-between group hover:border-orbit-accent/40 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-orbit-accent bg-orbit-accent/10 px-2.5 py-1 rounded-full border border-orbit-accent/20">
                          {item.category}
                        </span>
                        <span className="font-heading font-extrabold text-2xl text-orbit-fg">
                          {item.stat}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-xl text-orbit-fg mb-3 group-hover:text-orbit-accent transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm text-orbit-muted leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-orbit-border/60 flex items-center justify-between text-xs font-mono text-orbit-muted">
                      <span>Metric Verified:</span>
                      <span className="text-orbit-fg font-semibold">{item.statLabel}</span>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
