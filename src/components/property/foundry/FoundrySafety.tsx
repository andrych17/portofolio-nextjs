"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { easeStudio } from "@/components/motion/ease";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { foundry } from "@/content/property/foundry";

const { safety } = foundry;
const MAX = 3;

export function FoundrySafety() {
  const latest = safety.trir[safety.trir.length - 1];
  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-10">
      <div className="md:col-span-5">
        <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-white/55">Days since the last lost-time injury</p>
        <p className="mt-3 font-display text-[clamp(8rem,19vw,17rem)] leading-[0.74] text-accent">
          <Counter value={safety.days} duration={2.2} />
        </p>
        <div className="mt-10">
          <div className="relative aspect-[4/3] overflow-hidden bg-black">
            <Image src={safety.image} alt={safety.alt} fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover grayscale-[0.3]" />
          </div>
          <div aria-hidden className="foundry-hazard h-3" />
        </div>
      </div>

      <div className="md:col-span-7">
        <div className="flex items-end justify-between gap-6">
          <h3 className="font-display text-[clamp(2.2rem,3.6vw,3.6rem)] leading-[0.9]">Injury rate, falling for six years</h3>
          <p className="hidden max-w-[11rem] text-right font-mono text-[11px] uppercase tracking-[0.12em] text-white/50 sm:block">TRIR per 200,000 hours worked</p>
        </div>

        <div
          role="img"
          aria-label={`Total recordable injury rate fell from ${safety.trir[0].v} in ${safety.trir[0].year} to ${latest.v} in ${latest.year}. The industry average is ${safety.industry}.`}
          className="mt-14"
        >
          <div aria-hidden className="relative h-[15rem] md:h-[18rem]">
            <div className="absolute inset-x-0 border-t border-dashed border-accent/70" style={{ bottom: `${(safety.industry / MAX) * 100}%` }}>
              <span className="absolute -top-6 right-0 bg-[var(--f-char)] pl-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">Industry average {safety.industry}</span>
            </div>
            <div className="absolute inset-0 flex items-end gap-2 md:gap-4">
              {safety.trir.map((r, i) => {
                const last = i === safety.trir.length - 1;
                return (
                  <div key={r.year} className="flex h-full flex-1 flex-col justify-end">
                    <p className={`mb-2 font-display text-[1.5rem] leading-none md:text-[1.9rem] ${last ? "text-accent" : "text-bg"}`}>{r.v}</p>
                    <motion.div
                      className={`origin-bottom ${last ? "bg-accent" : "bg-white/35"}`}
                      style={{ height: `${(r.v / MAX) * 100}%` }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 1, ease: easeStudio, delay: i * 0.09 }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div aria-hidden className="mt-2 flex gap-2 border-t border-white/25 pt-2 md:gap-4">
            {safety.trir.map((r) => (
              <p key={r.year} className="flex-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/55 md:text-[11px]">
                {r.year}
              </p>
            ))}
          </div>
        </div>

        <ul className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2">
          {safety.pillars.map((p, i) => (
            <li key={p.title} className="bg-[var(--f-char)]">
              <Reveal delay={i * 0.06} y={20}>
                <div className="p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">0{i + 1}</p>
                  <h4 className="mt-3 font-display text-[1.9rem] leading-[0.95]">{p.title}</h4>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/65">{p.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
