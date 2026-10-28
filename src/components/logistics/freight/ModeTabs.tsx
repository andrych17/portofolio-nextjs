"use client";

import { motion } from "motion/react";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { freight } from "@/content/logistics/freight";

const scenes: Record<string, ReactNode> = {
  air: (
    <g>
      <g fill="#fff" opacity="0.07">
        <ellipse cx="90" cy="60" rx="46" ry="12" />
        <ellipse cx="380" cy="150" rx="60" ry="14" />
        <ellipse cx="300" cy="40" rx="30" ry="8" />
      </g>
      <g stroke="rgb(255 255 255 / 0.5)" strokeWidth="2" strokeLinecap="round">
        <path d="M20 108h110" className="freight-contrail" />
        <path d="M44 120h96" className="freight-contrail" style={{ animationDelay: "-0.5s" }} />
        <path d="M10 96h104" className="freight-contrail" style={{ animationDelay: "-0.9s" }} />
      </g>
      <g transform="translate(150 22)">
        <path d="M30 88c0-12 10-17 26-18h150c40 2 66 8 86 18-20 10-46 16-86 18H56c-16-1-26-6-26-18z" fill="#eaf0fa" />
        <path d="M118 100 74 166h34l86-62z" fill="#c4d2ec" />
        <path d="M72 76 46 28h28l48 48z" fill="#c4d2ec" />
        <path d="M226 78c26 2 50 6 66 10-16 8-40 14-66 16z" fill="var(--t-accent)" />
        <ellipse cx="156" cy="124" rx="18" ry="8" fill="#93a6c6" />
        <g fill="#07142b" opacity="0.55">
          <circle cx="220" cy="84" r="3" />
          <circle cx="206" cy="84" r="3" />
          <circle cx="192" cy="84" r="3" />
          <circle cx="178" cy="84" r="3" />
        </g>
      </g>
    </g>
  ),
  sea: (
    <g>
      <g className="freight-ship" transform="translate(0 -6)">
        <path d="M40 140h400l-34 38H78z" fill="#eaf0fa" />
        <path d="M40 140h400l-6 8H46z" fill="var(--t-accent)" />
        <rect x="352" y="94" width="52" height="46" fill="#c4d2ec" />
        <rect x="346" y="84" width="64" height="14" fill="#eaf0fa" />
        <g fill="#07142b" opacity="0.6">
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={358 + i * 9} y="90" width="5" height="5" />
          ))}
        </g>
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4, 5, 6].map((col) => {
            const colors = ["var(--t-accent)", "#4f6fa8", "#c4d2ec", "#2f4d82", "#ff8a66"];
            return <rect key={`${row}-${col}`} x={62 + col * 40} y={123 - row * 17} width="37" height="15" rx="1" fill={colors[(row * 3 + col * 2) % colors.length]} opacity={0.95} />;
          }),
        )}
      </g>
      <path d="M0 178q20-10 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0" fill="none" stroke="rgb(147 166 198 / 0.55)" strokeWidth="2" />
      <path d="M0 194q20-10 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0" fill="none" stroke="rgb(147 166 198 / 0.3)" strokeWidth="2" />
    </g>
  ),
  road: (
    <g>
      <rect x="0" y="168" width="480" height="52" fill="rgb(255 255 255 / 0.06)" />
      <g stroke="rgb(255 255 255 / 0.55)" strokeWidth="3" strokeLinecap="round" strokeDasharray="24 24">
        <path d="M0 196h620" className="freight-road" />
      </g>
      <g transform="translate(70 70)">
        <rect x="0" y="0" width="230" height="86" rx="6" fill="#eaf0fa" />
        <rect x="0" y="58" width="230" height="10" fill="var(--t-accent)" />
        <path d="M242 28h54l30 32v36h-84z" fill="#c4d2ec" />
        <path d="M252 36h38l20 22h-58z" fill="#07142b" opacity="0.65" />
        <rect x="236" y="92" width="94" height="6" fill="#93a6c6" />
        {[40, 90, 270, 308].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="102" r="17" fill="#0d1f3f" />
            <circle cx={cx} cy="102" r="7" fill="#93a6c6" />
          </g>
        ))}
        <g stroke="#07142b" strokeOpacity="0.18" strokeWidth="2">
          <path d="M58 0v58M116 0v58M174 0v58" />
        </g>
      </g>
    </g>
  ),
  rail: (
    <g>
      <g stroke="rgb(255 255 255 / 0.35)" strokeWidth="2" fill="none">
        <path d="M0 40q120 18 240 0t240 0" />
        <path d="M0 52q120 18 240 0t240 0" opacity="0.5" />
        {[60, 220, 380].map((x) => (
          <path key={x} d={`M${x} 40V190`} />
        ))}
      </g>
      <rect x="0" y="176" width="480" height="5" fill="#93a6c6" />
      <g className="freight-road" fill="rgb(255 255 255 / 0.25)">
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={i * 48} y="184" width="26" height="8" />
        ))}
      </g>
      <g transform="translate(24 92)">
        <path d="M0 40q0-26 24-26h96l22 22v50H0z" fill="var(--t-accent)" />
        <rect x="14" y="26" width="34" height="20" fill="#07142b" opacity="0.6" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${158 + i * 100} 0)`}>
            <rect x="0" y="58" width="94" height="10" fill="#4f6fa8" />
            <rect x="4" y="24" width="86" height="34" rx="2" fill={["#eaf0fa", "#c4d2ec", "#ff8a66"][i]} />
            <path d="M24 24v34M44 24v34M64 24v34" stroke="#07142b" strokeOpacity="0.2" strokeWidth="2" />
            {[16, 78].map((cx) => (
              <circle key={cx} cx={cx} cy="78" r="7" fill="#0d1f3f" stroke="#93a6c6" strokeWidth="2" />
            ))}
          </g>
        ))}
        {[28, 112].map((cx) => (
          <circle key={cx} cx={cx} cy="78" r="8" fill="#0d1f3f" stroke="#93a6c6" strokeWidth="2" />
        ))}
      </g>
    </g>
  ),
};

export function ModeTabs() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const modes = freight.modes;

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + modes.length) % modes.length;
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Freight modes" onKeyDown={onKey} className="relative flex gap-1 overflow-x-auto rounded-full bg-fg/[0.05] p-1.5 ring-1 ring-fg/10 sm:inline-flex">
        {modes.map((m, i) => (
          <button
            key={m.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`mode-tab-${m.id}`}
            aria-selected={active === i}
            aria-controls={`mode-panel-${m.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={`relative min-h-11 flex-1 cursor-pointer rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors duration-300 sm:flex-none sm:px-8 ${active === i ? "text-accent-fg" : "text-fg/70 hover:text-fg"}`}
          >
            {active === i && <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
            <span className="relative">{m.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 md:mt-12">
        {modes.map((m, i) => (
          <div key={m.id} role="tabpanel" id={`mode-panel-${m.id}`} aria-labelledby={`mode-tab-${m.id}`} hidden={active !== i} className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="fade-up md:col-span-5">
              <h3 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] font-semibold leading-[1]">{m.title}</h3>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-fg/75">{m.body}</p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {m.specs.map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{k}</dt>
                    <dd className="mt-1.5 text-[15px] font-medium leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="fade-up md:col-span-7" style={{ ["--d" as string]: 120 }}>
              <div className="rounded-[2rem] bg-fg/[0.04] p-1.5 ring-1 ring-fg/10">
                <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-gradient-to-b from-[#12294f] to-[#0a1b38] shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]">
                  <svg viewBox="0 0 480 220" className="block w-full" role="img" aria-label={`Illustration of ${m.label.toLowerCase()} freight`}>
                    {scenes[m.id]}
                  </svg>
                  <p className="absolute left-5 top-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">0{i + 1} / {m.label} freight</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
