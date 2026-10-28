"use client";

import { ArrowClockwiseIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { easeStudio } from "@/components/motion/ease";
import { grid } from "@/content/tech/grid";

function Cell({ i, className = "", dark, children }: { i: number; className?: string; dark?: boolean; children: ReactNode }) {
  const f = grid.features[i];
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: easeStudio }}
      className={`flex min-w-0 flex-col border-b border-r border-line p-6 md:p-8 ${dark ? "bg-fg text-bg" : ""} ${className}`}
    >
      <p className={`mono ${dark ? "text-white/45" : "text-muted"}`}>§ {f.n}</p>
      <h3 className="mt-3 max-w-md text-[clamp(1.5rem,2.3vw,2.2rem)] font-bold leading-[1.02] tracking-[-0.03em]">{f.title}</h3>
      <p className={`mt-3 max-w-md text-[15px] leading-relaxed ${dark ? "text-white/65" : "text-fg/65"}`}>{f.body}</p>
      <div className="mt-auto pt-8">{children}</div>
    </motion.article>
  );
}

export function GridFeatures() {
  return (
    <div className="grid grid-cols-1 border-l border-t border-line md:grid-cols-12">
      <Cell i={0} className="md:col-span-7">
        <Flow />
      </Cell>
      <Cell i={1} className="md:col-span-5">
        <Signature />
      </Cell>
      <Cell i={2} className="md:col-span-4">
        <Retries />
      </Cell>
      <Cell i={3} className="md:col-span-8">
        <Replay />
      </Cell>
      <Cell i={4} className="md:col-span-12" dark>
        <Logs />
      </Cell>
    </div>
  );
}

/** Event travels from the app, through Your Brand, to each endpoint. */
function Flow() {
  const routes = [
    { route: "M97 110 H330 C400 110 410 30 470 30", y: 30, name: "ep_checkout", status: "200", begin: "0s" },
    { route: "M97 110 H470", y: 110, name: "ep_crm", status: "200", begin: "0.35s" },
    { route: "M97 110 H330 C400 110 410 190 470 190", y: 190, name: "ep_ledger", status: "503 · retry", begin: "0.7s", bad: true },
  ];
  return (
    <svg viewBox="0 0 600 220" className="w-full overflow-visible" role="img" aria-label="Diagram: your app sends one event to Your Brand, which delivers it to three endpoints and retries the one that fails">
      {routes.map((r, i) => (
        <motion.path
          key={r.name}
          d={r.route}
          fill="none"
          stroke={r.bad ? "var(--t-accent)" : "var(--t-fg)"}
          strokeWidth="1.5"
          strokeDasharray={r.bad ? "5 4" : undefined}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.3, ease: easeStudio, delay: 0.2 + i * 0.15 }}
        />
      ))}
      <rect x="1" y="86" width="96" height="48" fill="var(--t-bg)" stroke="var(--t-fg)" strokeWidth="1.5" />
      <text x="49" y="115" textAnchor="middle" className="fill-fg font-mono text-[12px]">your app</text>
      <rect x="230" y="70" width="100" height="80" fill="var(--t-fg)" />
      <text x="280" y="104" textAnchor="middle" className="fill-white font-mono text-[12px] font-bold">Your Brand</text>
      <text x="280" y="124" textAnchor="middle" className="fill-white/50 font-mono text-[9px]">queue · sign · retry</text>
      {routes.map((r) => (
        <g key={r.name}>
          <rect x="470" y={r.y - 20} width="128" height="40" fill="var(--t-bg)" stroke={r.bad ? "var(--t-accent)" : "var(--t-fg)"} strokeWidth="1.5" />
          <text x="480" y={r.y - 3} className="fill-fg font-mono text-[11px] font-bold">{r.name}</text>
          <text x="480" y={r.y + 12} className={`font-mono text-[10px] ${r.bad ? "fill-accent" : "fill-fg/55"}`}>{r.status}</text>
        </g>
      ))}
      <g className="grid-dots">
        {routes.map((r) => (
          <circle key={r.name} r="4.5" fill={r.bad ? "var(--t-accent)" : "var(--t-fg)"} stroke="var(--t-bg)" strokeWidth="1.5">
            <animateMotion dur="3.4s" begin={r.begin} repeatCount="indefinite" path={r.route} calcMode="spline" keyTimes="0;1" keySplines="0.32 0.72 0 1" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.4s" begin={r.begin} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
    </svg>
  );
}

function Signature() {
  const [bad, setBad] = useState(false);
  return (
    <div>
      <pre className="overflow-x-auto bg-surface p-4 font-mono text-[11.5px] leading-[1.7] text-fg/80 ring-1 ring-fg/10">
        <span className="text-fg/45">POST /hooks HTTP/1.1</span>
        {"\n"}X-YB-Signature: t=1730112000,{"\n  "}v1=
        <span className={bad ? "bg-accent px-1 text-white" : "text-accent"}>{bad ? "00c1e8f3a9b2d4476e1f" : "5257a869e7ecebeda32a"}</span>…
        {"\n\n"}
        <span className="text-fg/45">{bad ? '{"amount":9900}' : '{"amount":4900}'}</span>
      </pre>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className={`mono flex items-center gap-2 px-2.5 py-2 ${bad ? "bg-accent text-white" : "bg-fg text-bg"}`}>
          {bad ? <XIcon size={13} weight="bold" aria-hidden /> : <CheckIcon size={13} weight="bold" aria-hidden />}
          {bad ? "Mismatch · rejected" : "Valid · 38 ms old"}
        </p>
        <button type="button" onClick={() => setBad((b) => !b)} className="mono min-h-11 cursor-pointer underline decoration-fg/30 underline-offset-4 hover:decoration-accent">
          {bad ? "Restore body" : "Tamper with body"}
        </button>
      </div>
    </div>
  );
}

function Retries() {
  return (
    <div>
      <div className="flex h-36 items-end gap-2" role="img" aria-label="Retry delays widen from 30 seconds to 24 hours">
        {grid.retries.map((r, i) => (
          <div key={r.at} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <motion.div
              className={`w-full origin-bottom ${i === 0 ? "bg-fg" : "bg-fg/20"} ${i === grid.retries.length - 1 ? "!bg-accent" : ""}`}
              style={{ height: `${r.h}%` }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.9, ease: easeStudio, delay: i * 0.08 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        {grid.retries.map((r) => (
          <span key={r.at} className="mono flex-1 text-center text-[9px] text-muted">
            {r.at}
          </span>
        ))}
      </div>
    </div>
  );
}

function Replay() {
  const [rows, setRows] = useState(grid.replayRows.map((r) => ({ ...r, replayed: 0 })));
  return (
    <ul className="divide-y divide-line border-y border-line font-mono text-[12px]">
      {rows.map((r, i) => {
        const failed = r.status !== "200" && !r.replayed;
        return (
          <li key={r.id} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-1.5 sm:flex-nowrap">
            <span className="hidden w-24 shrink-0 text-muted sm:block">{r.id}</span>
            <span className="min-w-0 flex-1 truncate">{r.type}</span>
            <span key={r.replayed} className={`px-1.5 py-0.5 ${failed ? "bg-accent text-white" : "text-fg/60"} ${r.replayed ? "grid-flash" : ""}`}>
              {failed ? r.status : "200"}
            </span>
            <span className="hidden w-16 shrink-0 text-right text-muted sm:block">{r.replayed ? "just now" : r.ago}</span>
            <button
              type="button"
              onClick={() => setRows((all) => all.map((x, j) => (j === i ? { ...x, replayed: x.replayed + 1 } : x)))}
              className="mono flex min-h-11 min-w-[5.5rem] cursor-pointer items-center justify-end gap-1.5 hover:text-accent"
              aria-label={`Replay ${r.id}`}
            >
              <ArrowClockwiseIcon size={13} weight="bold" aria-hidden />
              Replay
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Logs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setN((v) => v + 1), 2200);
    return () => clearInterval(id);
  }, [inView, reduce]);
  const L = grid.logs;
  const rows = [0, 1, 2, 3].map((d) => ({ id: n - d, text: L[(((n - d + 4) % L.length) + L.length) % L.length] }));
  return (
    <div ref={ref} className="overflow-x-auto">
      <ul className="min-w-[760px] space-y-1.5 font-mono text-[12px] md:text-[12.5px]">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((r, i) => (
            <motion.li
              key={r.id}
              layout
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1 - i * 0.2, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: easeStudio }}
              className={`whitespace-pre ${i === 0 ? "bg-accent px-2 py-1 text-white" : "px-2 py-1 text-white/80"}`}
            >
              {r.text}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
