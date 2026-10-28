"use client";

import { motion } from "motion/react";
import { useId, useState } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { easeStudio } from "@/components/motion/ease";
import { salt } from "@/content/fashion/salt";

type Trip = (typeof salt.planner.trips)[number]["id"];

const CARRY_ON_KG = 7;
const SAVING = 0.1;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/** What goes in the bag: pieces per type, driven by nights and trip. Prices and weights come from the piece data. */
export function kit(nights: number, trip: Trip): { id: string; qty: number }[] {
  const dress = trip === "coast" ? 1 + (nights >= 10 ? 1 : 0) : trip === "city" ? (nights >= 4 ? 1 : 0) : nights >= 6 ? 1 : 0;
  const swim = trip === "coast" ? (nights >= 7 ? 2 : 1) : trip === "country" ? (nights >= 5 ? 1 : 0) : 0;
  return [
    { id: "salt-shirt", qty: clamp(Math.ceil(nights / 3), 2, 6) },
    { id: "harbour-trouser", qty: clamp(Math.ceil(nights / 6), 1, 3) },
    { id: "noon-dress", qty: dress },
    { id: "tide-swim", qty: swim },
    { id: "market-tote", qty: 1 },
    { id: "lawn-plimsoll", qty: 1 },
  ].filter((l) => l.qty > 0);
}

export function SaltPlanner() {
  const [nights, setNights] = useState<number>(salt.planner.start);
  const [trip, setTrip] = useState<Trip>("coast");
  const rangeId = useId();

  const lines = kit(nights, trip).map((l) => ({ ...l, piece: salt.pieces.find((p) => p.id === l.id)! }));
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.qty * l.piece.price, 0);
  const saved = count >= 5 ? Math.round(subtotal * SAVING) : 0;
  const weight = lines.reduce((n, l) => n + l.qty * l.piece.weight, 0);
  const fill = Math.min(1, weight / CARRY_ON_KG);
  const note = salt.planner.trips.find((t) => t.id === trip)?.note;

  return (
    <section id="packing" aria-labelledby="packing-title" className="mx-auto max-w-[1700px] px-5 pb-24 md:px-10 md:pb-36">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pt-8">
          <p className="salt-caps text-muted">02 · Packing</p>
          <MaskText
            as="h2"
            id="packing-title"
            className="mt-5 font-display text-[clamp(2.8rem,6.4vw,6.6rem)]"
            lines={["One bag,", <span key="s" className="text-accent">any length of stay.</span>]}
          />
          <Reveal y={20}>
            <p className="mt-8 max-w-md text-[1.1rem] leading-relaxed text-fg/90">
              Tell us how long you are away and what the trip is like. We list what goes in, what it weighs and what it costs. Five pieces or more and the set is ten percent off.
            </p>
          </Reveal>
        </div>

        <Reveal y={40} className="lg:col-span-7" amount={0.12}>
          <div className="salt-paper rounded-[2rem] p-6 shadow-[0_40px_70px_-40px_rgb(0_0_0/0.65)] md:p-10">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <label htmlFor={rangeId} className="salt-caps opacity-70">
                  Nights away
                </label>
                <p className="mt-2 flex items-baseline gap-3 font-display text-[5.5rem] leading-none">
                  <span aria-hidden>{nights}</span>
                  <span className="salt-caps opacity-60">{nights === 1 ? "night" : "nights"}</span>
                </p>
                <input
                  id={rangeId}
                  type="range"
                  min={salt.planner.min}
                  max={salt.planner.max}
                  value={nights}
                  onChange={(e) => setNights(Number(e.target.value))}
                  aria-valuetext={`${nights} nights`}
                  className="salt-range mt-3"
                />
                <fieldset className="mt-6">
                  <legend className="salt-caps opacity-70">The trip</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {salt.planner.trips.map((t) => (
                      <label key={t.id} className="cursor-pointer">
                        <input type="radio" name="salt-trip" value={t.id} checked={trip === t.id} onChange={() => setTrip(t.id)} className="peer sr-only" />
                        <span className="salt-caps flex min-h-11 items-center rounded-full px-5 ring-1 ring-[var(--l-ink)]/30 transition-colors duration-300 peer-checked:bg-[var(--l-ink)] peer-checked:text-[var(--l-paper)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--l-ink)] hover:ring-[var(--l-ink)]">
                          {t.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-3 text-sm opacity-70">{note}</p>
                </fieldset>
              </div>

              <div aria-live="polite">
                <p className="salt-caps opacity-70">In the bag · {count} pieces</p>
                <ul className="mt-3">
                  {lines.map((l) => (
                    <li key={l.id} className="flex items-baseline justify-between gap-3 border-b border-[var(--l-ink)]/15 py-2.5">
                      <span>
                        <span className="font-display text-[1.35rem]">{l.qty}</span>
                        <span className="mx-2 opacity-50">x</span>
                        {l.piece.name}
                      </span>
                      <span className="tabular-nums opacity-80">${l.qty * l.piece.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="salt-caps opacity-70">Total</p>
                    <p className="font-display text-[2.6rem] leading-none tabular-nums">${subtotal - saved}</p>
                  </div>
                  <p className="salt-caps pb-1 opacity-70">{saved > 0 ? `Includes $${saved} off` : "Add one more piece to save 10%"}</p>
                </div>
                <div className="mt-6">
                  <div className="flex items-baseline justify-between">
                    <p className="salt-caps opacity-70">Bag weight</p>
                    <p className="tabular-nums">{weight.toFixed(1)} kg</p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--l-ink)]/12">
                    <motion.div
                      className="h-full origin-left rounded-full bg-[#cc3a16]"
                      initial={false}
                      animate={{ scaleX: fill }}
                      transition={{ duration: 0.7, ease: easeStudio }}
                    />
                  </div>
                  <p className="mt-2 text-sm opacity-70">{weight <= CARRY_ON_KG ? `Fits a ${CARRY_ON_KG} kg carry-on with room left.` : "Over a carry-on limit. Drop a shirt."}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
