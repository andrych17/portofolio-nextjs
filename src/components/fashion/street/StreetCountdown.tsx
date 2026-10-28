"use client";

import { useEffect, useState } from "react";
import { street } from "@/content/fashion/street";

type Parts = { d: string; h: string; m: string; s: string };

const pad = (n: number) => String(n).padStart(2, "0");

/** Next Friday at 18:00 local time; a Friday evening past 18:00 rolls to the following week. */
function nextDrop(now: Date): Date {
  const target = new Date(now);
  target.setHours(18, 0, 0, 0);
  target.setDate(target.getDate() + ((5 - now.getDay() + 7) % 7));
  if (target.getTime() <= now.getTime()) target.setDate(target.getDate() + 7);
  return target;
}

function partsUntil(target: Date, now: Date): Parts {
  const total = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
  return { d: pad(Math.floor(total / 86400)), h: pad(Math.floor((total % 86400) / 3600)), m: pad(Math.floor((total % 3600) / 60)), s: pad(total % 60) };
}

const EMPTY: Parts = { d: "00", h: "00", m: "00", s: "00" };

/** Digits start at zero on the server and tick after mount, so hydration always matches. */
export function StreetCountdown({ className = "" }: { className?: string }) {
  const [parts, setParts] = useState<Parts>(EMPTY);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setParts(partsUntil(nextDrop(now), now));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const cells: [keyof Parts, string][] = [
    ["d", "Days"],
    ["h", "Hours"],
    ["m", "Min"],
    ["s", "Sec"],
  ];

  return (
    <div className={className}>
      <p className="street-tag text-muted">
        {street.nextDrop} opens Friday at 18:00
      </p>
      <p className="sr-only">Countdown to the next drop. It opens every Friday at 18:00 local time.</p>
      <div aria-hidden className="mt-3 flex items-start gap-1.5 md:gap-3">
        {cells.map(([key, label], i) => (
          <div key={key} className="flex items-start gap-1.5 md:gap-3">
            <div>
              <div className="overflow-hidden bg-accent px-2 py-1.5 text-accent-fg md:px-3.5 md:py-2">
                <span key={parts[key]} className="street-digit block font-display text-[1.6rem] sm:text-[2.2rem] md:text-[clamp(2rem,4.4vw,3.6rem)] leading-none tabular-nums">
                  {parts[key]}
                </span>
              </div>
              <p className="street-tag mt-1.5 text-[0.62rem] text-muted">{label}</p>
            </div>
            {i < cells.length - 1 && <span className="pt-1.5 font-display text-[1.2rem] leading-none text-fg/40 md:pt-2 md:text-[clamp(1.6rem,3.4vw,2.8rem)]">:</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
