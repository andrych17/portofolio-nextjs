"use client";

import {
  BellSimpleIcon,
  ChartLineUpIcon,
  FunnelSimpleIcon,
  GearSixIcon,
  LightningIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { Counter } from "@/components/motion/Counter";
import { smooth, toPoints, wave } from "./chart";

const W = 640;
const H = 230;

const RANGES = [
  { key: "1h", n: 24, now: wave(3, 24, 52, 12, 0.5), prev: wave(9, 24, 46, 10, 0.1), unit: "min" },
  { key: "24h", n: 28, now: wave(7, 28, 48, 14, 0.6), prev: wave(2, 28, 44, 12, 0.25), unit: "hour" },
  { key: "7d", n: 28, now: wave(11, 28, 40, 16, 0.9), prev: wave(5, 28, 42, 12, 0.3), unit: "day" },
] as const;

const EVENTS = [
  { who: "MK", name: "checkout_completed", meta: "Team plan · mobile" },
  { who: "JA", name: "invite_sent", meta: "3 teammates · web" },
  { who: "SO", name: "signup_started", meta: "Pricing page · web" },
  { who: "LR", name: "feature_enabled", meta: "new-onboarding · web" },
  { who: "TN", name: "export_created", meta: "CSV, 12k rows · web" },
  { who: "PV", name: "checkout_failed", meta: "Card declined · mobile" },
  { who: "DC", name: "dashboard_shared", meta: "Link, 4 viewers · web" },
  { who: "EH", name: "plan_upgraded", meta: "Starter to Team · web" },
];
const AGES = ["now", "3s", "7s", "12s", "18s"];

export function PulseDashboard() {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.25 });
  const seen = useInView(root, { amount: 0.25, once: true });
  const reduce = useReducedMotion();
  const [range, setRange] = useState<(typeof RANGES)[number]["key"]>("24h");
  const [hover, setHover] = useState<number | null>(null);
  const [tick, setTick] = useState(7);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), 2400);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const cfg = RANGES.find((r) => r.key === range)!;
  const all = [...cfg.now, ...cfg.prev];
  const lo = Math.min(...all) - 4;
  const hi = Math.max(...all) + 4;
  const nowPts = toPoints(cfg.now, W, H, lo, hi, 14);
  const prevPts = toPoints(cfg.prev, W, H, lo, hi, 14);
  const line = smooth(nowPts);
  const last = nowPts[nowPts.length - 1];
  const releaseAt = Math.round((cfg.n - 1) * 0.66);
  const releaseX = nowPts[releaseAt][0];

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const i = Math.round(((e.clientX - r.left) / r.width) * (cfg.n - 1));
    setHover(Math.max(0, Math.min(cfg.n - 1, i)));
  }

  const rows = AGES.map((age, i) => {
    const id = tick - i;
    return { id, age, ...EVENTS[((id % EVENTS.length) + EVENTS.length) % EVENTS.length] };
  });

  return (
    <div
      ref={root}
      role="group"
      aria-label="Demo product analytics dashboard with live users, a sessions chart and a stream of recent events"
      className="pulse-panel overflow-hidden rounded-[1.6rem] bg-[var(--p-panel)] text-[13px] ring-1 ring-fg/10"
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2.5 rounded-full bg-fg/15" />
          <i className="size-2.5 rounded-full bg-fg/15" />
          <i className="size-2.5 rounded-full bg-fg/15" />
        </span>
        <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted">app.yourbrand.com / checkout / overview</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent">
          <span className="relative flex size-2">
            <span className="pulse-ping absolute inset-0 rounded-full bg-accent" />
            <span className="relative size-2 rounded-full bg-accent" />
          </span>
          Live
        </span>
      </div>

      <div className="flex">
        <aside aria-hidden className="hidden w-14 shrink-0 flex-col items-center gap-1.5 border-r border-line py-4 md:flex">
          {[ChartLineUpIcon, FunnelSimpleIcon, UsersThreeIcon, LightningIcon, BellSimpleIcon].map((Icon, i) => (
            <span key={i} className={`flex size-9 items-center justify-center rounded-xl ${i === 0 ? "bg-accent text-accent-fg" : "text-muted"}`}>
              <Icon size={17} weight={i === 0 ? "fill" : "regular"} />
            </span>
          ))}
          <span className="mt-auto flex size-9 items-center justify-center text-muted">
            <GearSixIcon size={17} />
          </span>
        </aside>

        <div className="min-w-0 flex-1 p-4 md:p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] text-muted">Release v2.14 · deployed 18 min ago</p>
              <p className="mt-1 font-display text-2xl leading-none">Checkout overview</p>
            </div>
            <div role="tablist" aria-label="Date range" className="relative flex rounded-full bg-fg/[0.05] p-0.5 ring-1 ring-fg/[0.06]">
              {RANGES.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  role="tab"
                  aria-selected={range === r.key}
                  onClick={() => setRange(r.key)}
                  className={`relative h-11 min-w-11 cursor-pointer rounded-full px-3 font-mono text-[12px] transition-colors md:h-8 ${range === r.key ? "text-accent-fg" : "text-fg/60 hover:text-fg"}`}
                >
                  {range === r.key && (
                    <motion.span layoutId="pulse-range" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  <span className="relative">{r.key}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            <Kpi label="Active now">
              <LiveNumber base={1284} active={inView && !reduce} />
            </Kpi>
            <Kpi label="Signups today" delta="+8%">
              <Counter value={312} />
            </Kpi>
            <Kpi label="Revenue today" delta="+11%">
              <Counter value={18420} prefix="$" />
            </Kpi>
            <Kpi label="Errors" delta="-3" bad>
              <Counter value={14} />
            </Kpi>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-5">
            <div className="rounded-2xl bg-fg/[0.025] p-3 ring-1 ring-fg/[0.06] md:col-span-3">
              <div className="flex items-center justify-between text-[11px] text-muted">
                <span className="font-mono uppercase tracking-[0.14em]">Sessions</span>
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <i className="h-0.5 w-3 rounded bg-accent" /> This {cfg.unit === "min" ? "hour" : cfg.unit === "hour" ? "day" : "week"}
                  </span>
                  <span className="hidden items-center gap-1.5 sm:flex">
                    <i className="h-0.5 w-3 rounded bg-fg/30" /> Before
                  </span>
                </span>
              </div>
              <div
                className="relative mt-2 aspect-[640/230] touch-pan-y"
                onPointerMove={onMove}
                onPointerLeave={() => setHover(null)}
              >
                <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                  <defs>
                    <linearGradient id="pulse-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--t-accent)" stopOpacity="0.2" />
                      <stop offset="1" stopColor="var(--t-accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0.2, 0.4, 0.6, 0.8].map((g) => (
                    <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="rgb(239 237 228 / 0.07)" />
                  ))}
                  <g key={range}>
                    <motion.path
                      d={smooth(prevPts)}
                      fill="none"
                      stroke="rgb(239 237 228 / 0.28)"
                      strokeWidth="2"
                      strokeDasharray="5 6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: seen ? 1 : 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    <motion.path
                      d={`${line}L${W},${H}L0,${H}Z`}
                      fill="url(#pulse-area)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: seen ? 1 : 0 }}
                      transition={{ duration: 1, delay: 0.9 }}
                    />
                    <line x1={releaseX} x2={releaseX} y1="0" y2={H} stroke="rgb(239 237 228 / 0.25)" strokeDasharray="2 5" />
                    <motion.path
                      d={line}
                      fill="none"
                      stroke="var(--t-accent)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: seen ? 1 : 0 }}
                      transition={{ duration: 1.6, ease: easeStudio }}
                    />
                    <circle cx={last[0]} cy={last[1]} r="5" fill="var(--t-accent)" />
                    <circle
                      className="pulse-ping"
                      cx={last[0]}
                      cy={last[1]}
                      r="5"
                      fill="var(--t-accent)"
                      style={{ transformOrigin: "center", transformBox: "fill-box" }}
                    />
                  </g>
                  {hover !== null && (
                    <g>
                      <line x1={nowPts[hover][0]} x2={nowPts[hover][0]} y1="0" y2={H} stroke="rgb(239 237 228 / 0.5)" />
                      <circle cx={nowPts[hover][0]} cy={nowPts[hover][1]} r="5" fill="var(--p-panel)" stroke="var(--t-accent)" strokeWidth="2.5" />
                    </g>
                  )}
                </svg>
                <span
                  className="absolute top-0 -translate-x-1/2 rounded-md bg-fg/10 px-1.5 py-0.5 font-mono text-[10px] text-fg/70"
                  style={{ left: `${(releaseX / W) * 100}%` }}
                >
                  v2.14
                </span>
                {hover !== null && (
                  <span
                    className="tnum pointer-events-none absolute -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-lg bg-fg px-2 py-1 font-mono text-[11px] font-medium text-bg"
                    style={{ left: `${(nowPts[hover][0] / W) * 100}%`, top: `${(nowPts[hover][1] / H) * 100}%` }}
                  >
                    {Math.round(cfg.now[hover] * 21).toLocaleString("en-US")} sessions
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-fg/[0.025] p-3 ring-1 ring-fg/[0.06] md:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Live events</p>
              <ul className="mt-2 space-y-1">
                <AnimatePresence initial={false} mode="popLayout">
                  {rows.map((row) => (
                    <motion.li
                      key={row.id}
                      layout
                      initial={{ opacity: 0, y: -16, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.6, ease: easeStudio }}
                      className="flex items-center gap-2.5 rounded-xl px-1.5 py-1.5 first:bg-accent/[0.08]"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-fg/10 font-mono text-[10px]">{row.who}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-mono text-[12px]">{row.name}</span>
                        <span className="block truncate text-[11px] text-muted">{row.meta}</span>
                      </span>
                      <span className="font-mono text-[10px] text-muted">{row.age}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, delta, bad, children }: { label: string; delta?: string; bad?: boolean; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-fg/[0.025] p-3 ring-1 ring-fg/[0.06]">
      <p className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="tnum mt-1.5 font-display text-[1.7rem] leading-none">{children}</p>
      <p className={`mt-1.5 font-mono text-[11px] ${bad ? "text-[var(--p-coral)]" : "text-accent"}`}>
        {delta ? `${bad ? "▼" : "▲"} ${delta.replace("-", "")}` : <span className="text-muted">users online</span>}
      </p>
    </div>
  );
}

const DELTAS = [3, -2, 5, 1, -1, 4, -3, 2];

function LiveNumber({ base, active }: { base: number; active: boolean }) {
  const [n, setN] = useState(base);
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const id = setInterval(() => {
      setN((v) => v + DELTAS[i++ % DELTAS.length]);
      setK((x) => x + 1);
    }, 1600);
    return () => clearInterval(id);
  }, [active]);
  return (
    <span key={k} className={k ? "pulse-flash" : ""}>
      {n.toLocaleString("en-US")}
    </span>
  );
}
