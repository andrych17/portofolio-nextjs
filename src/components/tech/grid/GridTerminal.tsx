"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { grid } from "@/content/tech/grid";
import { renderSegs, tokenize } from "./highlight";

const TABS = [
  { key: "curl", label: "curl" },
  { key: "node", label: "Node" },
  { key: "python", label: "Python" },
] as const;
type Tab = (typeof TABS)[number]["key"];

export function GridTerminal() {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<Tab>("curl");
  const [manual, setManual] = useState(false);
  const [count, setCount] = useState(0);
  const [shown, setShown] = useState(0); // response lines visible
  const code = grid.samples[tab];
  const segs = useMemo(() => tokenize(code), [code]);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(code.length);
      setShown(grid.response.length);
      return;
    }
    setCount(0);
    setShown(0);
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let c = 0;
    const type = () => {
      if (cancelled) return;
      const ch = code[c];
      c += ch === " " || ch === "\n" ? 3 : 1;
      c = Math.min(c, code.length);
      setCount(c);
      if (c < code.length) timers.push(setTimeout(type, ch === "\n" ? 140 : 22));
      else {
        grid.response.forEach((_, i) => timers.push(setTimeout(() => !cancelled && setShown(i + 1), 450 + i * 520)));
        if (!manual) timers.push(setTimeout(() => !cancelled && setTab((t) => TABS[(TABS.findIndex((x) => x.key === t) + 1) % TABS.length].key), 6200));
      }
    };
    timers.push(setTimeout(type, 500));
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [tab, inView, reduce, code, manual]);

  const done = count >= code.length;

  return (
    <div ref={root} className="bg-fg text-white shadow-[0_40px_80px_-40px_rgb(14_14_12/0.55)]">
      <div className="flex items-stretch justify-between border-b border-white/15">
        <p className="mono flex items-center gap-2 px-4 text-[10px] text-white/55 md:px-5">
          <span className="size-1.5 bg-accent" aria-hidden />
          POST /v1/events
        </p>
        <div role="tablist" aria-label="Language" className="flex">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => {
                setManual(true);
                setTab(t.key);
              }}
              className={`mono relative min-h-11 min-w-[4.6rem] cursor-pointer px-4 text-[11px] transition-colors duration-300 ${tab === t.key ? "text-white" : "text-white/50 hover:text-white"}`}
            >
              {t.label}
              {tab === t.key && <motion.span layoutId="grid-tab" className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
            </button>
          ))}
        </div>
      </div>

      <pre className="sr-only">{code}</pre>
      <pre aria-hidden className="min-h-[250px] overflow-x-auto px-4 py-5 font-mono text-[12.5px] leading-[1.7] md:min-h-[270px] md:px-5 md:text-[13px]">
        {renderSegs(segs, count)}
        <span className={`ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent ${done ? "grid-cursor" : ""}`} />
      </pre>

      <div className="border-t border-white/15 px-4 py-4 md:px-5" aria-live="polite">
        <p className="mono mb-3 text-[10px] text-white/40">Response</p>
        <ul className="min-h-[88px] space-y-1.5 font-mono text-[12px] md:text-[12.5px]">
          <AnimatePresence initial={false}>
            {grid.response.slice(0, shown).map((r) => (
              <motion.li
                key={r.t}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: easeStudio }}
                className="flex items-baseline justify-between gap-4"
              >
                <span className={r.strong ? "bg-accent px-1.5 py-0.5 font-medium text-white" : "min-w-0 truncate text-white/80"}>{r.t}</span>
                {r.meta && <span className="shrink-0 text-white/45">{r.meta}</span>}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
