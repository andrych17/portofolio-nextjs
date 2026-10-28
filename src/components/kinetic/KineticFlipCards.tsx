"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { Person } from "@/content/types";

const fronts = ["bg-k-yellow", "bg-k-pink", "bg-k-lime", "bg-k-blue text-white", "bg-accent", "bg-white"];

/** Team cards that flip to show a fun fact. Click, tap or hover. */
export function KineticFlipCards({ people }: { people: Person[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {people.map((person, i) => (
        <li key={person.name}>
          <FlipCard person={person} tone={fronts[i % fronts.length]} tilt={i % 2 ? 2 : -2} />
        </li>
      ))}
    </ul>
  );
}

function FlipCard({ person, tone, tilt }: { person: Person; tone: string; tilt: number }) {
  const [flipped, setFlipped] = useState(false);
  const initials = person.name.split(" ").map((p) => p[0]).join("");

  return (
    <button
      type="button"
      aria-pressed={flipped}
      aria-label={`${person.name}, ${person.role}. Show fun fact`}
      onClick={() => setFlipped((f) => !f)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
      className="block w-full cursor-pointer text-left [perspective:1200px]"
    >
      <motion.span
        className="relative block aspect-[3/4] [transform-style:preserve-3d]"
        initial={{ rotate: tilt }}
        animate={{ rotateY: flipped ? 180 : 0, rotate: flipped ? 0 : tilt }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
      >
        <span className={`absolute inset-0 flex flex-col justify-between rounded-[1.75rem] border-2 border-k-ink p-5 shadow-[6px_6px_0_0_#121212] [backface-visibility:hidden] md:p-6 ${tone}`}>
          <span className="font-display text-[clamp(3.5rem,9vw,7.5rem)] font-black leading-none">{initials}</span>
          <span>
            <span className="block font-display text-lg font-black uppercase leading-tight md:text-2xl">{person.name}</span>
            <span className="block text-sm font-medium">{person.role}</span>
          </span>
        </span>
        <span className="absolute inset-0 flex flex-col justify-between rounded-[1.75rem] border-2 border-k-ink bg-k-ink p-5 text-white shadow-[6px_6px_0_0_#121212] [backface-visibility:hidden] [transform:rotateY(180deg)] md:p-6">
          <span className="font-display text-xs font-bold uppercase text-k-lime">Fun fact</span>
          <span className="font-display text-xl font-extrabold leading-tight md:text-3xl">{person.fact}</span>
          <span className="text-sm text-white/60">{person.name}</span>
        </span>
      </motion.span>
    </button>
  );
}
