"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { animate, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { pulse } from "@/content/tech/pulse";
import { PulseButton } from "./PulseButton";

function Price({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || prev.current === value) return;
    if (reduce) {
      el.textContent = String(value);
      prev.current = value;
      return;
    }
    const controls = animate(prev.current, value, {
      duration: 0.8,
      ease: easeStudio,
      onUpdate: (n) => (el.textContent = String(Math.round(n))),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, reduce]);
  return (
    <span ref={ref} className="tnum">
      {value}
    </span>
  );
}

export function PulsePricing() {
  const [yearly, setYearly] = useState(true);
  const options = [
    { on: false, label: "Monthly" },
    { on: true, label: "Yearly" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <div role="radiogroup" aria-label="Billing period" className="relative inline-flex rounded-full bg-fg/[0.05] p-1 ring-1 ring-fg/10">
          {options.map((o) => (
            <button
              key={o.label}
              type="button"
              role="radio"
              aria-checked={yearly === o.on}
              onClick={() => setYearly(o.on)}
              className={`relative min-h-11 min-w-28 cursor-pointer rounded-full px-5 text-sm font-medium transition-colors duration-300 ${yearly === o.on ? "text-accent-fg" : "text-fg/65 hover:text-fg"}`}
            >
              {yearly === o.on && (
                <motion.span layoutId="pulse-billing" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              )}
              <span className="relative">{o.label}</span>
            </button>
          ))}
        </div>
        <motion.span
          animate={{ opacity: yearly ? 1 : 0.4, scale: yearly ? 1 : 0.94 }}
          transition={{ duration: 0.5, ease: easeStudio }}
          className="rounded-full bg-accent/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent"
        >
          Save 20% yearly
        </motion.span>
      </div>

      <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-3">
        {pulse.plans.map((plan, i) => {
          const price = yearly ? plan.yearly : plan.monthly;
          const hot = "featured" in plan && plan.featured;
          return (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: easeStudio, delay: i * 0.1 }}
              className={`flex flex-col rounded-[2rem] p-7 md:p-8 ${hot ? "bg-accent text-accent-fg lg:-my-5 lg:py-12" : "bg-[var(--p-panel)] ring-1 ring-fg/10"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-3xl leading-none">{plan.name}</h3>
                {hot && <span className="rounded-full bg-black/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]">Most picked</span>}
              </div>
              <p className={`mt-3 text-[15px] ${hot ? "text-accent-fg/75" : "text-fg/60"}`}>{plan.blurb}</p>
              <p className="mt-8 flex items-baseline gap-1.5">
                <span className="font-display text-[4.5rem] leading-none">
                  $<Price value={price} />
                </span>
                <span className={`font-mono text-[12px] ${hot ? "text-accent-fg/70" : "text-muted"}`}>/ month</span>
              </p>
              <p className={`mt-1 h-5 font-mono text-[11px] ${hot ? "text-accent-fg/70" : "text-muted"}`}>
                {price === 0 ? "Free forever" : yearly ? `Billed $${price * 12} a year` : "Billed monthly"}
              </p>
              <ul className="mt-8 space-y-3 text-[15px]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckIcon size={17} weight="bold" className={`mt-0.5 shrink-0 ${hot ? "text-accent-fg" : "text-accent"}`} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <PulseButton href="#contact" variant={hot ? "dark" : "ghost"}>
                  {plan.cta}
                </PulseButton>
              </div>
            </motion.article>
          );
        })}
      </div>
      <p className="mt-10 text-sm text-muted">All plans include unlimited dashboards, the importer and email support. Prices in US dollars, taxes not included.</p>
    </div>
  );
}
