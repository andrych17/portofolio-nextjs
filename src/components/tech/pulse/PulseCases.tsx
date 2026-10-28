"use client";

import { motion } from "motion/react";
import { Counter } from "@/components/motion/Counter";
import { easeStudio } from "@/components/motion/ease";
import { StackCards } from "@/components/motion/StackCards";
import { pulse } from "@/content/tech/pulse";
import { smooth, toPoints } from "./chart";

const TONES = [
  { card: "bg-accent text-accent-fg", sub: "text-accent-fg/70", panel: "bg-black/[0.08]", stroke: "#10130a" },
  { card: "bg-fg text-bg", sub: "text-bg/65", panel: "bg-black/[0.06]", stroke: "#10130a" },
  { card: "bg-[var(--p-panel-2)] text-fg ring-1 ring-fg/10", sub: "text-fg/60", panel: "bg-fg/[0.04]", stroke: "var(--t-accent)" },
];

export function PulseCases() {
  return (
    <StackCards top={92} step={18} minScale={0.92} gapClassName="mb-[8vh]">
      {pulse.cases.map((c, i) => {
        const tone = TONES[i];
        const pts = toPoints(c.series, 400, 170, Math.min(...c.series) - 6, Math.max(...c.series) + 6, 10);
        const shipX = pts[6][0];
        return (
          <article key={c.name} aria-label={`${c.name} case study`} className={`grid gap-8 rounded-[2rem] p-6 md:grid-cols-12 md:gap-10 md:p-12 ${tone.card}`}>
            <div className="flex flex-col md:col-span-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl leading-none md:text-4xl">{c.name}</h3>
                <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${tone.sub}`}>{c.kind}</p>
              </div>
              <p className="mt-6 font-display text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.85]">
                <Counter value={c.metric} prefix={c.prefix} suffix={c.suffix} />
              </p>
              <p className={`mt-3 max-w-sm text-lg leading-snug ${tone.sub}`}>{c.label}</p>
              <figure className="mt-auto pt-8">
                <blockquote className="max-w-lg text-[15px] leading-relaxed md:text-[17px]">&ldquo;{c.quote}&rdquo;</blockquote>
                <figcaption className={`mt-3 font-mono text-[12px] ${tone.sub}`}>{c.who}, {c.name}</figcaption>
              </figure>
            </div>
            <div className={`flex flex-col justify-between rounded-3xl p-5 md:col-span-5 ${tone.panel}`}>
              <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${tone.sub}`}>Before and after release</p>
              <svg viewBox="0 0 400 170" className="mt-4 w-full overflow-visible" aria-hidden>
                <line x1={shipX} x2={shipX} y1="0" y2="170" stroke={tone.stroke} strokeOpacity="0.35" strokeDasharray="3 5" />
                <motion.path
                  d={smooth(pts)}
                  fill="none"
                  stroke={tone.stroke}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.6, ease: easeStudio }}
                />
                <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="5" fill={tone.stroke} />
              </svg>
              <p className={`mt-3 flex justify-between font-mono text-[11px] ${tone.sub}`}>
                <span>12 days</span>
                <span>shipped on day 7</span>
              </p>
            </div>
          </article>
        );
      })}
    </StackCards>
  );
}
