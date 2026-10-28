"use client";

import { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { orbit } from "@/content/tech/orbit";

export function OrbitFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-32 bg-orbit-surface/30 border-t border-orbit-border relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orbit-border bg-orbit-surface text-xs font-mono text-orbit-accent mb-4">
            <span>Engineering Knowledge Base</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-orbit-fg">
            Frequently asked questions.
          </h2>
          <p className="mt-4 text-base text-orbit-muted leading-relaxed">
            Everything you need to know about our serverless cold-start architecture, NVLink interconnects, and SLA guarantees.
          </p>
        </div>

        <div className="space-y-4">
          {orbit.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-orbit-border bg-orbit-surface/70 backdrop-blur-md overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-orbit-surface/90 transition-colors"
                >
                  <span className="font-heading font-semibold text-base sm:text-lg text-orbit-fg pr-4">
                    {faq.q}
                  </span>
                  <CaretDownIcon
                    size={20}
                    className={`text-orbit-muted shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-orbit-accent" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-orbit-muted font-sans leading-relaxed border-t border-orbit-border/40 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
