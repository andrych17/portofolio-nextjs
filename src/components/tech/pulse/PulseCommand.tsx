"use client";

import { ArrowBendDownLeftIcon, MagnifyingGlassIcon, SparkleIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { pulse } from "@/content/tech/pulse";
import { smooth, toPoints, wave } from "./chart";

export function PulseCommand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [manual, setManual] = useState(false);
  const [sel, setSel] = useState(0);
  const [opened, setOpened] = useState<string | null>(null);
  const listId = useId();

  useEffect(() => {
    if (manual || !inView) return;
    const phrases = pulse.palettePhrases;
    if (reduce) {
      setQuery(phrases[0]);
      return;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let p = 0;
    let c = 0;
    let typing = true;
    const step = () => {
      if (cancelled) return;
      const phrase = phrases[p];
      if (typing) {
        c += 1;
        setQuery(phrase.slice(0, c));
        if (c >= phrase.length) {
          typing = false;
          timer = setTimeout(step, 2200);
        } else timer = setTimeout(step, 85);
      } else {
        c -= 2;
        if (c <= 0) {
          c = 0;
          setQuery("");
          typing = true;
          p = (p + 1) % phrases.length;
          timer = setTimeout(step, 450);
        } else {
          setQuery(phrase.slice(0, c));
          timer = setTimeout(step, 24);
        }
      }
    };
    timer = setTimeout(step, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [manual, inView, reduce]);

  const results = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    return pulse.commands.filter((c) => tokens.every((t) => `${c.label} ${c.keys}`.toLowerCase().includes(t)));
  }, [query]);
  const active = results[Math.min(sel, results.length - 1)];
  const groups = [...new Set(results.map((r) => r.group))];

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && active) {
      setOpened(active.label);
    } else if (e.key === "Escape") {
      setQuery("");
      setOpened(null);
    }
  }

  return (
    <div ref={ref} className="relative rounded-[2rem] bg-fg/[0.03] p-1.5 ring-1 ring-fg/10">
      <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[var(--p-panel)] px-3 py-8 ring-1 ring-fg/[0.05] md:px-10 md:py-14">
        <div aria-hidden className="pulse-dots absolute inset-0 opacity-60" />
        <div className="pulse-panel relative mx-auto max-w-[780px] overflow-hidden rounded-2xl bg-[var(--p-panel-2)] ring-1 ring-fg/15">
          <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
            <MagnifyingGlassIcon size={18} className="shrink-0 text-muted" aria-hidden />
            <input
              value={query}
              onChange={(e) => {
                setManual(true);
                setQuery(e.target.value);
                setSel(0);
                setOpened(null);
              }}
              onFocus={() => setManual(true)}
              onBlur={(e) => e.currentTarget.value === "" && setManual(false)}
              onKeyDown={onKey}
              placeholder="Search, jump or ask a question"
              aria-label="Command palette demo. Type to filter commands"
              aria-controls={listId}
              autoComplete="off"
              spellCheck={false}
              className="min-h-8 min-w-0 flex-1 bg-transparent text-[16px] text-fg outline-none placeholder:text-muted"
            />
            <kbd className="hidden rounded-md bg-fg/10 px-1.5 py-0.5 font-mono text-[11px] text-muted sm:block">esc</kbd>
          </div>

          <div className="grid md:grid-cols-5">
            <div id={listId} role="listbox" aria-label="Commands" className="min-h-[300px] p-2 md:col-span-3">
              {results.length === 0 && <p className="px-3 py-6 text-sm text-muted">No command for that. Try &ldquo;funnel&rdquo; or &ldquo;alert&rdquo;.</p>}
              {groups.map((group) => (
                <div key={group} className="mb-1.5">
                  <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{group}</p>
                  <AnimatePresence initial={false} mode="popLayout">
                    {results
                      .filter((r) => r.group === group)
                      .map((r) => {
                        const on = r === active;
                        return (
                          <motion.div
                            key={r.label}
                            layout
                            role="option"
                            aria-selected={on}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={{ duration: 0.4, ease: easeStudio }}
                            onPointerEnter={() => setSel(results.indexOf(r))}
                            onClick={() => setOpened(r.label)}
                            className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] transition-colors duration-300 ${on ? "bg-accent text-accent-fg" : "text-fg/80"}`}
                          >
                            <span className="min-w-0 flex-1 truncate">{r.label}</span>
                            {on && <ArrowBendDownLeftIcon size={15} weight="bold" aria-hidden />}
                          </motion.div>
                        );
                      })}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="hidden border-l border-line p-5 md:col-span-2 md:block">
              <AnimatePresence mode="wait">
                {active && (
                  <motion.div key={active.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, ease: easeStudio }}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{active.group}</p>
                    <p className="mt-2 font-display text-xl leading-tight">{active.label}</p>
                    <p className="mt-3 text-[13px] leading-relaxed text-fg/60">{active.note}</p>
                    <Spark seed={active.label.length} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 font-mono text-[11px] text-muted">
            <span className="flex items-center gap-1.5 truncate" aria-live="polite">
              <SparkleIcon size={13} weight="fill" className="shrink-0 text-accent" aria-hidden />
              <span className="truncate">{opened ? `Opened: ${opened}` : "Type in the box to try it"}</span>
            </span>
            <span className="hidden shrink-0 sm:block">up/down to move · enter to open</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spark({ seed }: { seed: number }) {
  const pts = toPoints(wave(seed, 20, 50, 16, 0.8), 200, 70, 20, 110, 6);
  return (
    <svg viewBox="0 0 200 70" className="mt-5 w-full overflow-visible" aria-hidden>
      <motion.path d={smooth(pts)} fill="none" stroke="var(--t-accent)" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: easeStudio }} />
    </svg>
  );
}
