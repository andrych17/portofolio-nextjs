"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { easeStudio } from "@/components/motion/ease";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 2 });

/** Standard amortising loan: payment = P·r / (1 − (1 + r)^−n). */
export function monthlyPayment(loan: number, annualRatePct: number, years: number) {
  const n = years * 12;
  const r = annualRatePct / 100 / 12;
  return r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
}

export function EstateCalculator() {
  const [price, setPrice] = useState(2400000);
  const [down, setDown] = useState(30);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(5.2);

  const loan = price * (1 - down / 100);
  const monthly = monthlyPayment(loan, rate, years);
  const total = monthly * years * 12;
  const interest = total - loan;
  const principalShare = total > 0 ? loan / total : 1;

  return (
    <div className="grid gap-5 md:grid-cols-12">
      <div className="rounded-[2rem] bg-white/[0.05] p-1.5 ring-1 ring-white/10 md:col-span-7">
        <div className="space-y-7 rounded-[calc(2rem-0.375rem)] bg-[#0f2a20]/60 p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)] md:p-9">
          <Slider id="calc-price" label="Home price" value={price} min={500000} max={10000000} step={50000} onChange={setPrice} format={(v) => usd.format(v)} />
          <Slider id="calc-down" label="Deposit" value={down} min={10} max={60} step={1} onChange={setDown} format={(v) => `${v}% · ${usd.format((price * v) / 100)}`} />
          <Slider id="calc-term" label="Term" value={years} min={5} max={30} step={1} onChange={setYears} format={(v) => `${v} years`} />
          <Slider id="calc-rate" label="Interest rate" value={rate} min={2} max={9} step={0.1} onChange={setRate} format={(v) => `${v.toFixed(1)}%`} />
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-[2rem] bg-[#d6b571] p-7 text-[#0f2a20] md:col-span-5 md:p-9">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0f2a20]/70">Estimated monthly installment</p>
          <p className="mt-3 font-display text-[clamp(3.2rem,6vw,5.2rem)] leading-none" aria-live="polite">
            <Money value={monthly} />
          </p>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <Donut share={principalShare} />
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="flex items-center gap-2 text-[#0f2a20]/70">
                <span className="size-2.5 rounded-full bg-[#0f2a20]" /> Loan amount
              </dt>
              <dd className="font-display text-2xl">{compact.format(loan)}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-[#0f2a20]/70">
                <span className="size-2.5 rounded-full bg-[#0f2a20]/25" /> Total interest
              </dt>
              <dd className="font-display text-2xl">{compact.format(interest)}</dd>
            </div>
          </dl>
        </div>
        <p className="mt-8 border-t border-[#0f2a20]/20 pt-4 text-[13px] leading-relaxed text-[#0f2a20]/75">
          Total repaid over {years} years: {usd.format(total)}.
        </p>
      </div>
    </div>
  );
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f6f2ea]/65">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-2xl tabular-nums text-[#f6f2ea]">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="estate-range mt-2"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
    </div>
  );
}

/** Tweens between values; the server HTML already carries the final figure. */
function Money({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const last = useRef(value);
  const [initial] = useState(() => usd.format(value));
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = usd.format(value);
      last.current = value;
      return;
    }
    const controls = animate(last.current, value, {
      duration: 0.7,
      ease: easeStudio,
      onUpdate: (v) => {
        last.current = v;
        el.textContent = usd.format(v);
      },
    });
    return () => controls.stop();
  }, [value, reduce]);

  return <span ref={ref}>{initial}</span>;
}

function Donut({ share }: { share: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 120 120" className="size-28 shrink-0 -rotate-90" role="img" aria-label={`Principal is ${Math.round(share * 100)} percent of everything repaid`}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgb(15 42 32 / 0.2)" strokeWidth="14" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="#0f2a20"
        strokeWidth="14"
        strokeLinecap="butt"
        strokeDasharray={`${share * c} ${c}`}
        style={{ transition: "stroke-dasharray 0.8s cubic-bezier(0.32,0.72,0,1)" }}
      />
    </svg>
  );
}
