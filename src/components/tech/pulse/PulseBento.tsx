"use client";

import { BellRingingIcon, CheckCircleIcon, WarningIcon, XCircleIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Counter } from "@/components/motion/Counter";
import { easeStudio } from "@/components/motion/ease";
import { pulse } from "@/content/tech/pulse";

/** Double-bezel shell: hairline outer ring, inner core with a concentric radius. */
function Cell({ index, title, body, className = "", children }: { index: string; title: string; body: string; className?: string; children: ReactNode }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: easeStudio }}
      className={`rounded-[2rem] bg-fg/[0.03] p-1.5 ring-1 ring-fg/10 ${className}`}
    >
      <div className="pulse-panel flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[var(--p-panel)] p-6 ring-1 ring-fg/[0.05] md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{index}</p>
        <h3 className="mt-3 max-w-md font-display text-[clamp(1.7rem,2.6vw,2.5rem)] leading-[0.98]">{title}</h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-fg/65">{body}</p>
        <div className="mt-auto pt-8">{children}</div>
      </div>
    </motion.article>
  );
}

export function PulseBento() {
  const [f, r, a, g] = pulse.features;
  return (
    <div className="grid gap-4 md:grid-cols-12">
      <Cell index="01 · Funnels" title={f.title} body={f.body} className="md:col-span-7">
        <Funnel />
      </Cell>
      <Cell index="02 · Retention" title={r.title} body={r.body} className="md:col-span-5">
        <Retention />
      </Cell>
      <Cell index="03 · Alerts" title={a.title} body={a.body} className="md:col-span-5">
        <Alerts />
      </Cell>
      <Cell index="04 · Cohorts and flags" title={g.title} body={g.body} className="md:col-span-7">
        <Flags />
      </Cell>
    </div>
  );
}

function Funnel() {
  const steps = pulse.funnel;
  return (
    <ol className="space-y-2.5">
      {steps.map((s, i) => (
        <li key={s.label}>
          <div className="mb-1.5 flex items-baseline justify-between text-[13px]">
            <span className="text-fg/75">{s.label}</span>
            <span className="tnum font-mono text-fg">
              <Counter value={s.pct} suffix="%" />
              {i > 0 && <span className="ml-2 text-[11px] text-[var(--p-coral)]">-{steps[i - 1].pct - s.pct}</span>}
            </span>
          </div>
          <div className="h-9 overflow-hidden rounded-lg bg-fg/[0.05]">
            <motion.div
              className="h-full origin-left rounded-lg"
              style={{ background: `rgb(var(--p-lime-rgb) / ${1 - i * 0.2})`, width: `${s.pct}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1.2, ease: easeStudio, delay: i * 0.12 }}
            />
          </div>
        </li>
      ))}
    </ol>
  );
}

const COHORTS = [
  { label: "Jun 02", v: [100, 64, 52, 47, 44, 42, 41] },
  { label: "Jun 09", v: [100, 66, 55, 49, 46, 44] },
  { label: "Jun 16", v: [100, 61, 50, 45, 43] },
  { label: "Jun 23", v: [100, 68, 58, 53] },
  { label: "Jun 30", v: [100, 70, 61] },
  { label: "Jul 07", v: [100, 72] },
];

function Retention() {
  const [cell, setCell] = useState<{ row: number; col: number } | null>(null);
  const active = cell ? COHORTS[cell.row] : null;
  return (
    <div>
      <div className="space-y-1" role="img" aria-label="Retention heatmap, six weekly cohorts over seven weeks" onPointerLeave={() => setCell(null)}>
        {COHORTS.map((row, ri) => (
          <div key={row.label} className="grid grid-cols-[3rem_repeat(7,minmax(0,1fr))] items-center gap-1">
            <span className="font-mono text-[10px] text-muted">{row.label}</span>
            {Array.from({ length: 7 }, (_, ci) => {
              const v = row.v[ci];
              if (v === undefined) return <span key={ci} />;
              return (
                <motion.div
                  key={ci}
                  onPointerEnter={() => setCell({ row: ri, col: ci })}
                  onPointerDown={() => setCell({ row: ri, col: ci })}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: easeStudio, delay: (ri + ci) * 0.045 }}
                  className="h-7 cursor-crosshair rounded-md ring-accent hover:ring-2"
                  style={{ background: `rgb(var(--p-lime-rgb) / ${0.1 + (v / 100) * 0.9})` }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <p className="tnum mt-4 h-5 font-mono text-[12px] text-fg/70" aria-live="polite">
        {active && cell ? `${active.label} cohort, week ${cell.col}: ${active.v[cell.col]}% still active` : "Hover a cell to read it"}
      </p>
    </div>
  );
}

const TONE = {
  good: { Icon: CheckCircleIcon, cls: "text-accent" },
  warn: { Icon: WarningIcon, cls: "text-amber-300" },
  bad: { Icon: XCircleIcon, cls: "text-[var(--p-coral)]" },
} as const;

function Alerts() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setN((v) => v + 1), 2800);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const list = pulse.alerts;
  const stack = [0, 1, 2].map((d) => ({ d, id: n - d, a: list[(((n - d) % list.length) + list.length) % list.length] }));

  return (
    <div ref={ref} className="relative h-[208px]">
      <AnimatePresence initial={false}>
        {stack.map(({ d, id, a }) => {
          const { Icon, cls } = TONE[a.tone as keyof typeof TONE];
          return (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, y: -40, scale: 0.96 }}
              animate={{ opacity: 1 - d * 0.3, y: d * 72, scale: 1 }}
              exit={{ opacity: 0, y: 3 * 72, scale: 0.96 }}
              transition={{ duration: 0.8, ease: easeStudio }}
              className="absolute inset-x-0 top-0 flex items-center gap-3 rounded-2xl bg-[var(--p-panel-2)] p-3.5 ring-1 ring-fg/10"
              
            >
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-fg/[0.06] ${cls}`}>
                <Icon size={20} weight="fill" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[14px] font-medium">{a.title}</span>
                <span className="block truncate font-mono text-[11px] text-muted">{a.meta}</span>
              </span>
              <BellRingingIcon size={16} className="ml-auto shrink-0 text-muted" aria-hidden />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function Flags() {
  const [flags, setFlags] = useState(pulse.flags.map((f) => ({ ...f })));
  return (
    <ul className="space-y-2">
      {flags.map((f, i) => (
        <li key={f.name} className="flex items-center gap-4 rounded-2xl bg-fg/[0.03] p-3.5 ring-1 ring-fg/[0.06]">
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-[13px]">{f.name}</p>
            <p className="truncate text-[12px] text-muted">{f.note}</p>
          </div>
          <div className="hidden w-32 sm:block">
            <div className="h-1.5 overflow-hidden rounded-full bg-fg/10">
              <motion.div
                className="h-full origin-left rounded-full bg-accent"
                style={{ width: `${f.rollout}%` }}
                animate={{ scaleX: f.on ? 1 : 0.25, opacity: f.on ? 1 : 0.4 }}
                transition={{ duration: 0.7, ease: easeStudio }}
              />
            </div>
            <p className="tnum mt-1 text-right font-mono text-[10px] text-muted">{f.on ? `${f.rollout}% of users` : "off"}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={f.on}
            aria-label={`Toggle ${f.name}`}
            onClick={() => setFlags((all) => all.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))}
            className={`relative flex h-11 w-[68px] shrink-0 cursor-pointer items-center justify-center`}
          >
            <span className={`absolute h-7 w-12 rounded-full transition-colors duration-500 ${f.on ? "bg-accent" : "bg-fg/15"}`} />
            <motion.span
              className={`absolute left-[10px] size-5 rounded-full ${f.on ? "bg-accent-fg" : "bg-fg/70"}`}
              animate={{ x: f.on ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 32 }}
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
