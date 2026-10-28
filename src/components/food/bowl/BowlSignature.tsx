"use client";

import Image from "next/image";
import { useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
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
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>Chef Curated</Eyebrow>
            <h2 id="signature-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-tight text-fg">
              Signature Bowls
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Balanced by nutritionists and finished with cold-pressed dressings blended fresh each morning.
            </p>
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

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-12">
          {filtered.map((item, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <Reveal
                key={item.id}
                y={20}
                delay={idx * 0.1}
                className={isLarge ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <article className="group flex h-full flex-col justify-between rounded-[2rem] bg-surface p-2 ring-1 ring-line transition-all duration-300 hover:ring-fg/30">
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] bg-bg">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 95vw"
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
                    </div>

                    <div className="p-5 md:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl font-semibold text-fg md:text-3xl">{item.name}</h3>
                          <p className="mt-1 text-sm font-medium text-accent">{item.tagline}</p>
                        </div>
                        <span className="font-display text-2xl font-semibold text-fg">${item.price}</span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-muted">{item.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-line/60 px-5 py-4 text-xs font-medium text-muted md:px-6">
                    <div className="flex gap-4">
                      <span>{item.calories} kcal</span>
                      <span>·</span>
                      <span>{item.protein}g protein</span>
                    </div>
                    <span className="font-semibold text-accent group-hover:underline">Order Pickup &rarr;</span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
