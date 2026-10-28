"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { atrium, type FloorState } from "@/content/property/atrium";
import { AtriumButton } from "./AtriumButton";

const { floors, building } = atrium.stack;

/** Height of each band in units, and how far it is inset so the stack reads as a tower with a setback. */
const shape = [
  { u: 1, inset: "22%" },
  { u: 2, inset: "8%" },
  { u: 2, inset: "0%" },
  { u: 2, inset: "0%" },
  { u: 2, inset: "0%" },
  { u: 1, inset: "0%" },
  { u: 1, inset: "0%" },
  { u: 1, inset: "0%" },
];

const tone: Record<FloorState, string> = {
  open: "bg-accent text-accent-fg",
  full: "bg-[var(--a-ink)] text-bg",
  shared: "bg-bg text-fg ring-1 ring-inset ring-fg/35",
};
const chip: Record<FloorState, string> = {
  open: "bg-accent text-accent-fg",
  full: "bg-[var(--a-ink)] text-bg",
  shared: "text-fg ring-1 ring-fg/35",
};

const list = { hidden: {}, show: { transition: { staggerChildren: 0.09, staggerDirection: -1 } } } as const;
const band = {
  hidden: { clipPath: "inset(100% -16px -16px -16px)" },
  show: { clipPath: "inset(0% -16px -16px -16px)", transition: { duration: 0.9, ease: easeStudio } },
} as const;

/** A section drawing of one tower. Floors build up from the basement as it scrolls into view. Pick a band to read what is on it. */
export function AtriumStack() {
  const [sel, setSel] = useState(1);
  const f = floors[sel];

  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-10">
      <div className="sticky top-[4.25rem] z-20 -mx-5 border-b border-fg/15 bg-surface px-5 py-4 md:top-28 md:z-auto md:order-last md:col-span-5 md:mx-0 md:self-start md:border-0 md:bg-transparent md:p-0">
        <div role="region" aria-live="polite" aria-label={`Details for ${f.name}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={f.level}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: easeStudio }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="min-w-0 font-mono text-[11.5px] uppercase tracking-[0.12em] text-fg/65">
                  <span className="hidden md:inline">{building} · </span>
                  {f.level}
                </p>
                <span className={`shrink-0 whitespace-nowrap px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] ${chip[f.state]}`}>{f.status}</span>
              </div>
              <h3 className="mt-3 font-display text-[clamp(2.2rem,3.8vw,3.8rem)] leading-[0.95] md:mt-5">{f.name}</h3>
              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-fg/20 pt-4 text-[14.5px] md:mt-6 md:pt-5">
                <div>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg/55">Use</dt>
                  <dd className="mt-1 leading-snug">{f.use}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg/55">Size</dt>
                  <dd className="mt-1 leading-snug">{f.size}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-fg/55">Rent</dt>
                  <dd className="mt-1 font-medium">{f.rent}</dd>
                </div>
              </dl>
              <p className="mt-3 max-w-md text-[14px] leading-snug text-fg/75 md:mt-5 md:text-[15.5px] md:leading-relaxed">{f.note}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 hidden md:block">
            <AtriumButton href="#viewing" variant="ink">
              Ask about this floor
            </AtriumButton>
          </div>
        </div>
      </div>

      <div className="md:col-span-7">
        <motion.ol aria-label={`Floors of ${building}`} variants={list} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="flex flex-col gap-1">
          {floors.map((fl, i) => (
            <li key={fl.level} style={{ marginInline: shape[i].inset }}>
              <motion.div variants={band}>
                <button
                  type="button"
                  aria-pressed={sel === i}
                  onClick={() => setSel(i)}
                  style={{ height: `calc(${shape[i].u} * var(--u))` }}
                  className={`group relative flex w-full min-h-11 cursor-pointer items-center justify-between gap-3 px-4 text-left transition-[translate,box-shadow] duration-500 ease-studio [--u:2.75rem] md:px-6 md:[--u:3.4rem] ${tone[fl.state]} ${
                    sel === i ? "-translate-x-1 shadow-[8px_8px_0_0_var(--a-ink)] ring-2 ring-inset ring-fg" : "hover:-translate-x-0.5"
                  }`}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] opacity-80">{fl.level}</span>
                  <span className="flex-1 truncate font-display text-[1.25rem] leading-none md:text-[1.7rem]">{fl.name}</span>
                  <span className="hidden font-mono text-[11px] uppercase tracking-[0.1em] opacity-80 sm:block">{fl.status}</span>
                </button>
              </motion.div>
            </li>
          ))}
        </motion.ol>
        <ul aria-label="Legend" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em] text-fg/70">
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-3 bg-accent" /> Space available
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-3 bg-[var(--a-ink)]" /> Fully let
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-3 bg-bg ring-1 ring-fg/40" /> Shared by tenants
          </li>
        </ul>
      </div>
    </div>
  );
}
