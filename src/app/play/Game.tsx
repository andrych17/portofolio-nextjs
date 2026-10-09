"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { MENU, SINCE, type SectionId } from "./data";
import { SECTIONS, SECTION_SIZE } from "./Sections";
import { Calendar, Player, useNow } from "./Hud";
import { level, playtime } from "./clock";
import { setSound, sfx, stopAll } from "./audio";

const Portrait = dynamic(() => import("./Portrait"), { ssr: false });

const WIPE_MS = 700;
const WIPE_SWAP_MS = 350; // the wipe holds full-screen between 45% and 55% of its run

function parseHash(): { id: SectionId; sub: number } | null {
  const [id, n] = window.location.hash.slice(1).split("/");
  const known = MENU.find((m) => m.id === id);
  if (!known) return null;
  const sub = Number.parseInt(n ?? "0", 10);
  const max = SECTION_SIZE[known.id] - 1;
  return { id: known.id, sub: Number.isFinite(sub) ? Math.min(Math.max(sub, 0), max) : 0 };
}

function Intro({ onStart }: { onStart: (sound: boolean) => void }) {
  const now = useNow();
  useEffect(() => {
    void import("./Portrait"); // warm the three.js chunk while the player reads the save slot
  }, []);
  return (
    <motion.section
      className="pl-intro"
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      aria-labelledby="pl-load"
    >
      <h1 id="pl-load" className="pl-mono">Load game</h1>
      <div className="pl-slot">
        <span className="pl-slot-no">01</span>
        <div>
          <p className="pl-slot-name">Andry Huang</p>
          <p className="pl-mono">Full-stack developer · Surabaya</p>
        </div>
        <dl className="pl-slot-meta">
          <div><dt className="pl-mono">Level</dt><dd>{now ? level(now, SINCE).lv : "–"}</dd></div>
          <div><dt className="pl-mono">Playtime</dt><dd>{now ? playtime(now, SINCE) : "–"}</dd></div>
        </dl>
      </div>
      <div className="pl-intro-actions">
        <button type="button" autoFocus onClick={() => onStart(true)}>Continue with sound</button>
        <button type="button" onClick={() => onStart(false)}>Continue silent</button>
      </div>
      <p className="pl-mono pl-intro-note">Keyboard, mouse or touch. Music and sound effects are synthesized live in your browser.</p>
    </motion.section>
  );
}

interface MenuProps {
  idx: number;
  reduced: boolean;
  onHover: (i: number) => void;
  onEnter: (id: SectionId) => void;
}

function Menu({ idx, reduced, onHover, onEnter }: MenuProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  // Also runs on mount, which matters: the menu only mounts after the section's exit animation.
  useEffect(() => {
    refs.current[idx]?.focus({ preventScroll: true });
  }, [idx]);
  const current = MENU[idx];
  return (
    <motion.nav
      className="pl-menu"
      aria-label="Main menu"
      initial={reduced ? false : { opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.2, 0.9, 0.1, 1] } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <ul>
        {MENU.map((m, i) => (
          <li key={m.id} style={{ "--i": i } as CSSProperties}>
            <button
              type="button"
              ref={(el) => { refs.current[i] = el; }}
              className="pl-item"
              data-on={i === idx || undefined}
              tabIndex={i === idx ? 0 : -1}
              aria-describedby={i === idx ? "pl-hint" : undefined}
              onPointerEnter={() => onHover(i)}
              onFocus={() => onHover(i)}
              onClick={() => onEnter(m.id)}
            >
              <span className="pl-slab pl-slab-back" aria-hidden="true" />
              <span className="pl-slab pl-slab-front" aria-hidden="true" />
              <span className="pl-cursor" aria-hidden="true" />
              <span className="pl-label">{m.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <p id="pl-hint" key={current.id} className="pl-mono pl-hint">{current.hint}</p>
    </motion.nav>
  );
}

export default function Game() {
  const reduced = useReducedMotion() ?? false;
  const [started, setStarted] = useState(false);
  const [sound, setSoundOn] = useState(false);
  const [menuIdx, setMenuIdx] = useState(0);
  const [open, setOpen] = useState<SectionId | null>(null);
  const [sub, setSub] = useState(0);
  const [dir, setDir] = useState(1);
  const [pulse, setPulse] = useState(0);
  const [wipe, setWipe] = useState(0);
  const swapTimer = useRef(0);

  const transition = (fn: () => void) => {
    window.clearTimeout(swapTimer.current);
    if (reduced) return fn();
    setWipe((w) => w + 1);
    swapTimer.current = window.setTimeout(fn, WIPE_SWAP_MS);
  };

  const enter = (id: SectionId, at = 0) => {
    sfx("select");
    transition(() => {
      setOpen(id);
      setSub(at);
      setDir(1);
    });
  };

  const back = () => {
    sfx("back");
    transition(() => setOpen(null));
  };

  const pick = (i: number) => {
    if (i === sub) return;
    sfx("move");
    setDir(i > sub ? 1 : -1);
    setSub(i);
  };

  const step = (d: number) => {
    if (!open) return;
    const n = SECTION_SIZE[open];
    if (n < 2) return;
    sfx("page");
    setDir(d);
    setSub((s) => (s + d + n) % n);
  };

  const hover = (i: number) => {
    if (i === menuIdx) return;
    sfx("move");
    setMenuIdx(i);
    setPulse((p) => p + 1);
  };

  const start = (withSound: boolean) => {
    setSound(withSound);
    setSoundOn(withSound);
    setStarted(true);
    const deep = parseHash();
    if (deep) {
      setMenuIdx(MENU.findIndex((m) => m.id === deep.id));
      setOpen(deep.id);
      setSub(deep.sub);
    }
  };

  const toggleSound = () => {
    setSound(!sound);
    setSoundOn(!sound);
  };

  // Keep the URL shareable: /play#career/1 opens straight on that page.
  useEffect(() => {
    if (!started) return;
    const hash = open ? `#${open}/${sub}` : "";
    window.history.replaceState(null, "", `${window.location.pathname}${hash}`);
  }, [started, open, sub]);

  useEffect(() => () => {
    window.clearTimeout(swapTimer.current);
    stopAll();
  }, []);

  useEffect(() => {
    if (!started) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (k === "m" || k === "M") return toggleSound();
      if (!open) {
        const d = k === "ArrowUp" || k === "w" ? -1 : k === "ArrowDown" || k === "s" ? 1 : 0;
        if (d) {
          e.preventDefault();
          hover((menuIdx + d + MENU.length) % MENU.length);
        } else if (k === "ArrowRight") {
          enter(MENU[menuIdx].id);
        }
        return;
      }
      if (k === "Escape" || k === "Backspace") {
        e.preventDefault();
        return back();
      }
      const d = k === "ArrowLeft" || k === "ArrowUp" ? -1 : k === "ArrowRight" || k === "ArrowDown" ? 1 : 0;
      if (d) {
        e.preventDefault();
        step(d);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const Section = open ? SECTIONS[open] : null;
  const ghost = (open ?? MENU[menuIdx].id).toUpperCase();

  return (
    <div className="pl-root" data-docked={open ? "true" : "false"} data-started={started ? "true" : "false"}>
      <div className="pl-band" aria-hidden="true" />
      <div className="pl-ghost" aria-hidden="true">
        <span>{ghost} · {ghost} · </span>
        <span>{ghost} · {ghost} · </span>
      </div>
      {started && <Portrait docked={!!open} pulse={pulse} still={reduced} />}

      <AnimatePresence>{!started && <Intro key="intro" onStart={start} />}</AnimatePresence>

      {started && (
        <>
          <header className="pl-hud-top">
            <Player />
            <Calendar />
          </header>

          <AnimatePresence mode="wait">
            {!open ? (
              <Menu key="menu" idx={menuIdx} reduced={reduced} onHover={hover} onEnter={enter} />
            ) : (
              <motion.main
                key={open}
                className="pl-sec"
                tabIndex={-1}
                // screen readers land on the new screen; list screens then move focus to their selected row
                ref={(el) => { if (el && !el.contains(document.activeElement)) el.focus({ preventScroll: true }); }}
                initial={reduced ? false : { opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.2, 0.9, 0.1, 1] } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
              >
                <div className="pl-sec-head">
                  <button type="button" className="pl-back" onClick={back} aria-label="Back to menu">
                    <ArrowLeft size={18} strokeWidth={1.5} /> <span className="pl-mono">Esc</span>
                  </button>
                  <h2 className="pl-sec-title"><span>{MENU.find((m) => m.id === open)?.label}</span></h2>
                </div>
                {Section && <Section sub={sub} dir={dir} onPick={pick} onStep={step} />}
              </motion.main>
            )}
          </AnimatePresence>

          <footer className="pl-hud-bottom">
            <div className="pl-hud-left">
              <Link href="/" className="pl-mono pl-classic"><ArrowLeft size={14} strokeWidth={1.5} /> Classic site</Link>
              <button type="button" className="pl-sound" onClick={toggleSound} aria-pressed={sound}>
                <span className="pl-eq" data-on={sound || undefined} aria-hidden="true"><i /><i /><i /><i /></span>
                <span className="pl-mono">{sound ? "Now playing · Overtime, Surabaya (live synth)" : "Sound off"} · M</span>
              </button>
            </div>
            <ul className="pl-keys" aria-hidden="true">
              <li><kbd>↑↓</kbd> {open ? "Browse" : "Choose"}</li>
              <li><kbd>Enter</kbd> Open</li>
              {open && <li><kbd>Esc</kbd> Back</li>}
            </ul>
          </footer>
        </>
      )}

      {wipe > 0 && !reduced && (
        <motion.div
          key={wipe}
          className="pl-wipe"
          aria-hidden="true"
          initial={{ x: "-135%" }}
          animate={{ x: ["-135%", "0%", "0%", "135%"] }}
          transition={{ duration: WIPE_MS / 1000, times: [0, 0.45, 0.55, 1], ease: [0.7, 0, 0.3, 1] }}
        >
          <span /><span />
        </motion.div>
      )}
    </div>
  );
}
