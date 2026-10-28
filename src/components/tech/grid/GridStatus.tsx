"use client";

import { motion } from "motion/react";
import { easeStudio } from "@/components/motion/ease";
import { grid } from "@/content/tech/grid";

const DAYS = 90;

/** Same inputs, same bars, on the server and the client. */
const tone = (seed: number, i: number) => (((seed * 9301 + i * 49297) % 233280) / 233280) * 0.4 + 0.6;

export function GridStatus() {
  return (
    <ul className="border-t border-fg">
      {grid.uptime.map((u, row) => (
        <li key={u.name} className="grid items-center gap-x-8 gap-y-4 border-b border-line py-7 md:grid-cols-12 md:py-9">
          <div className="flex items-baseline justify-between gap-4 md:col-span-3 md:block">
            <p className="text-[1.35rem] font-bold leading-none tracking-tight">{u.name}</p>
            <p className="mono mt-0 text-muted md:mt-3">{u.bad.length === 0 ? "No incidents" : `${u.bad.length} incident${u.bad.length > 1 ? "s" : ""}`}</p>
          </div>
          <div className="md:col-span-7" role="img" aria-label={`${u.name}: ${u.pct} uptime over the last ${DAYS} days`}>
            <div className="flex h-12 items-stretch gap-px">
              {Array.from({ length: DAYS }, (_, i) => {
                const bad = u.bad.includes(i);
                return (
                  <motion.span
                    key={i}
                    className={`block flex-1 origin-bottom ${bad ? "bg-accent" : "bg-fg"}`}
                    style={{ opacity: bad ? 1 : tone(u.seed, i) }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.9 }}
                    transition={{ duration: 0.8, ease: easeStudio, delay: row * 0.12 + i * 0.006 }}
                  />
                );
              })}
            </div>
            <div className="mono mt-2 flex justify-between text-muted">
              <span>{DAYS} days ago</span>
              <span>Today</span>
            </div>
          </div>
          <p className="text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-none tracking-[-0.04em] md:col-span-2 md:text-right">{u.pct}</p>
        </li>
      ))}
    </ul>
  );
}
