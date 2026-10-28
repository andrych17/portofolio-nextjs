"use client";

import { CheckIcon, SparkleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { bowl, type BuilderCategory } from "@/content/food/bowl";

export function BowlBuilder() {
  const [selected, setSelected] = useState<Record<string, string[]>>({
    base: ["Warm Tricolor Quinoa"],
    protein: ["Slow-Herb Roasted Chicken"],
    veggies: ["Roasted Maple Sweet Potato", "Charred Broccoli Florets"],
    crunch: ["Tamari Toasted Pumpkin Seeds", "Turmeric Tahini Miso Cream"],
  });

  const toggleOption = (cat: BuilderCategory, optionName: string) => {
    setSelected((prev) => {
      const current = prev[cat.id] || [];
      if (cat.limit === 1) {
        return { ...prev, [cat.id]: [optionName] };
      }
      if (current.includes(optionName)) {
        return { ...prev, [cat.id]: current.filter((x) => x !== optionName) };
      }
      if (current.length < cat.limit) {
        return { ...prev, [cat.id]: [...current, optionName] };
      }
      // Replace oldest
      return { ...prev, [cat.id]: [...current.slice(1), optionName] };
    });
  };

  // Calculate totals
  let totalCal = 0;
  let totalProtein = 0;
  let totalItems = 0;

  bowl.builderCategories.forEach((cat) => {
    const picked = selected[cat.id] || [];
    picked.forEach((name) => {
      const opt = cat.options.find((o) => o.name === name);
      if (opt) {
        totalCal += opt.cal;
        totalProtein += opt.protein;
        totalItems += 1;
      }
    });
  });

  return (
    <section id="builder" aria-labelledby="builder-heading" className="bg-surface/60 py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Custom Kitchen</Eyebrow>
              <h2 id="builder-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-tight text-fg">
                Design Your Bowl
              </h2>
              <p className="mt-4 text-muted">
                Craft your meal around your macro targets. Choose raw or warm bases, clean proteins, and scratch dressings.
              </p>

              {/* Live Nutrition Dashboard Card */}
              <div className="mt-8 rounded-[2rem] bg-bg p-6 shadow-md ring-1 ring-line">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                    <SparkleIcon size={16} weight="fill" />
                    Live Nutrition HUD
                  </span>
                  <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-bold text-accent">
                    {totalItems} Selected
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-surface p-4 text-center">
                    <span className="text-xs uppercase tracking-wider text-muted">Estimated Energy</span>
                    <p className="mt-1 font-display text-3xl font-semibold text-fg md:text-4xl">{totalCal}</p>
                    <span className="text-xs text-muted">kcal</span>
                  </div>
                  <div className="rounded-2xl bg-surface p-4 text-center">
                    <span className="text-xs uppercase tracking-wider text-muted">Clean Protein</span>
                    <p className="mt-1 font-display text-3xl font-semibold text-accent md:text-4xl">{totalProtein}</p>
                    <span className="text-xs text-muted">grams</span>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted">Current Tray</span>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {Object.values(selected)
                      .flat()
                      .map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-fg ring-1 ring-line"
                        >
                          {item}
                        </span>
                      ))}
                  </div>
                </div>

                <a
                  href="#visit"
                  className="mt-6 flex min-h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                >
                  Save &amp; Order at Counter ($16)
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-10 lg:col-span-7">
            {bowl.builderCategories.map((cat) => {
              const currentPicked = selected[cat.id] || [];
              return (
                <div key={cat.id} className="rounded-[2rem] bg-bg p-6 shadow-sm ring-1 ring-line md:p-8">
                  <div className="flex items-center justify-between border-b border-line pb-4">
                    <h3 className="font-display text-xl font-semibold text-fg md:text-2xl">{cat.title}</h3>
                    <span className="text-xs font-medium text-muted">
                      {currentPicked.length}/{cat.limit} picked
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {cat.options.map((option) => {
                      const isSelected = currentPicked.includes(option.name);
                      return (
                        <button
                          key={option.name}
                          type="button"
                          onClick={() => toggleOption(cat, option.name)}
                          className={`flex cursor-pointer items-start justify-between rounded-2xl p-4 text-left transition-all ${
                            isSelected
                              ? "bg-accent/10 ring-2 ring-accent"
                              : "bg-surface/50 ring-1 ring-line hover:bg-surface"
                          }`}
                        >
                          <div>
                            <span className="block text-sm font-semibold text-fg">{option.name}</span>
                            <span className="mt-1 block text-xs text-muted">
                              {option.cal} kcal · {option.protein}g protein
                            </span>
                          </div>
                          <span
                            className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                              isSelected
                                ? "border-accent bg-accent text-white"
                                : "border-line bg-bg text-transparent"
                            }`}
                          >
                            <CheckIcon size={12} weight="bold" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
