"use client";

import { SmileyIcon } from "@phosphor-icons/react/ssr";
import { motion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Burst } from "./Burst";

type Sticker = { id: string; className: string; rotate: number; delay: number; children: ReactNode };

const stickers: Sticker[] = [
  {
    id: "brands",
    className: "right-[4%] top-[5%] md:right-[6%] md:top-[6%]",
    rotate: 12,
    delay: 900,
    children: (
      <span className="relative flex size-24 items-center justify-center md:size-40">
        <Burst className="absolute inset-0 size-full" fill="#ffd23f" />
        <span className="relative text-center font-display text-sm font-black uppercase leading-none md:text-xl">
          120+
          <br />
          brands
        </span>
      </span>
    ),
  },
  {
    id: "est",
    className: "hidden md:block right-[18%] top-[75%]",
    rotate: -9,
    delay: 1050,
    children: <span className="block rounded-full border-2 border-k-ink bg-k-pink px-5 py-2.5 font-display text-lg font-black uppercase">Est. 2019 · Melb</span>,
  },
  {
    id: "speed",
    className: "hidden md:block right-[5%] top-[38%]",
    rotate: 6,
    delay: 1200,
    children: (
      <span className="block rounded-[1.25rem] border-2 border-k-ink bg-k-lime px-5 py-3 text-center">
        <span className="block font-display text-4xl font-black leading-none">93</span>
        <span className="block text-xs font-bold uppercase">avg Lighthouse</span>
      </span>
    ),
  },
  {
    id: "smile",
    className: "hidden md:block right-[33%] top-[55%]",
    rotate: -14,
    delay: 1350,
    children: (
      <span className="flex size-14 items-center justify-center rounded-full border-2 border-k-ink bg-k-blue text-white md:size-20">
        <SmileyIcon weight="bold" className="size-3/5" />
      </span>
    ),
  },
];

/** Stickers you can throw around the hero. Positions reset on reload. */
export function KineticStickers() {
  const area = useRef<HTMLDivElement>(null);
  return (
    <div ref={area} className="pointer-events-none absolute inset-2 z-20 md:inset-4">
      {stickers.map((s) => (
        <div key={s.id} className={`fade-up absolute ${s.className}`} style={{ ["--d" as string]: s.delay }}>
          <motion.div
            drag
            dragConstraints={area}
            dragElastic={0.15}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 14 }}
            initial={{ rotate: s.rotate }}
            whileHover={{ scale: 1.06, rotate: s.rotate * 0.4 }}
            whileDrag={{ scale: 1.12, rotate: 0, cursor: "grabbing" }}
            className="pointer-events-auto cursor-grab touch-none select-none drop-shadow-[4px_4px_0_#121212]"
            aria-hidden
          >
            {s.children}
          </motion.div>
        </div>
      ))}
      <p className="fade-up absolute right-[6%] top-[28%] hidden rotate-6 font-display text-xs font-bold uppercase text-muted md:block" style={{ ["--d" as string]: 1500 }}>
        Psst, drag the stickers
      </p>
    </div>
  );
}
