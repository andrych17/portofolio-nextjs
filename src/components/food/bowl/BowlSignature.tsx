"use client";

import Image from "next/image";
import { useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { Tilt } from "@/components/motion/Tilt";
import { bowl } from "@/content/food/bowl";

export function BowlSignature() {
  const [filter, setFilter] = useState<"all" | "plant" | "protein">("all");

  const filtered = bowl.signatureBowls.filter((item) => {
    if (filter === "plant") return item.tags.includes("V");
    if (filter === "protein") return item.protein >= 25;
    return true;
  });

  return (
    <section id="bowls" aria-labelledby="signature-heading" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-14 rounded-[2.25rem] bg-surface/75 p-7 ring-1 ring-line md:p-12">
          <Eyebrow>Soil-First Nutrition</Eyebrow>
          <ScrollWords
            className="mt-3 font-display text-[clamp(1.6rem,3.3vw,2.9rem)] font-semibold leading-[1.16] text-fg"
            text="Every signature bowl is calibrated by sports nutritionists, pairing sprouted ancient grains with cold-pressed herb emulsions blended fresh each morning."
          />
        </div>

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Chef Curated · 3D Interactive Cards</Eyebrow>
            <h2 id="signature-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-tight text-fg">
              Signature Bowls
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-full bg-surface p-1.5 ring-1 ring-line">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`min-h-9 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-colors ${
                filter === "all" ? "bg-accent text-accent-fg shadow-sm" : "text-muted hover:text-fg"
              }`}
            >
              All Bowls
            </button>
            <button
              type="button"
              onClick={() => setFilter("plant")}
              className={`min-h-9 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-colors ${
                filter === "plant" ? "bg-accent text-accent-fg shadow-sm" : "text-muted hover:text-fg"
              }`}
            >
              100% Plant-Based
            </button>
            <button
              type="button"
              onClick={() => setFilter("protein")}
              className={`min-h-9 rounded-full px-4 text-xs font-semibold uppercase tracking-wider transition-colors ${
                filter === "protein" ? "bg-accent text-accent-fg shadow-sm" : "text-muted hover:text-fg"
              }`}
            >
              High Protein (&gt;25g)
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filtered.map((item, idx) => (
            <Reveal key={item.id} y={20} delay={idx * 0.08}>
              <Tilt max={6} className="h-full">
                <article className="group flex h-full flex-col justify-between rounded-[2rem] bg-surface p-2 ring-1 ring-line transition-all duration-300 hover:ring-fg/30">
                  <div>
                    <ClipReveal direction="bottom" className="aspect-[4/3] w-full rounded-[1.6rem] bg-bg">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 24vw, 90vw"
                        className="object-cover transition-transform duration-500 ease-studio group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-bg/90 px-2.5 py-0.5 text-xs font-bold text-fg backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </ClipReveal>

                    <div className="p-4 md:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-xl font-semibold text-fg">{item.name}</h3>
                          <p className="mt-0.5 text-xs font-medium text-accent">{item.tagline}</p>
                        </div>
                        <span className="font-display text-xl font-semibold text-fg">${item.price}</span>
                      </div>
                      <p className="mt-3 text-xs leading-relaxed text-muted">{item.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-line/60 px-4 py-3.5 text-xs font-medium text-muted">
                    <span>{item.calories} kcal · {item.protein}g protein</span>
                    <span className="font-semibold text-accent group-hover:underline">Order &rarr;</span>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
