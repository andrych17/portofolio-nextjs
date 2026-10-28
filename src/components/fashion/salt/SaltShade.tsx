"use client";

import { motion } from "motion/react";
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { salt, type Shade } from "@/content/fashion/salt";

type Wipe = { key: number; colour: string; x: number; y: number };

type ShadeState = {
  shade: Shade["id"];
  pick: (id: Shade["id"], origin?: { x: number; y: number }) => void;
  next: (origin?: { x: number; y: number }) => void;
};

const ShadeContext = createContext<ShadeState | null>(null);

export function useShade(): ShadeState {
  const ctx = useContext(ShadeContext);
  if (!ctx) throw new Error("useShade must be used inside SaltShadeProvider");
  return ctx;
}

const WIPE_MS = 750;

/** Holds the active shade and repaints the page with an ink-drop wipe from the click point. */
export function SaltShadeProvider({ children }: { children: ReactNode }) {
  const [shade, setShade] = useState<Shade["id"]>("tomato");
  const [wipe, setWipe] = useState<Wipe | null>(null);
  const busy = useRef(false);

  const apply = useCallback((id: Shade["id"]) => {
    const root = document.querySelector<HTMLElement>(".theme-fashion-salt");
    if (id === "tomato") root?.removeAttribute("data-shade");
    else root?.setAttribute("data-shade", id);
    setShade(id);
  }, []);

  const pick = useCallback(
    (id: Shade["id"], origin?: { x: number; y: number }) => {
      if (id === shade || busy.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        apply(id);
        return;
      }
      busy.current = true;
      const target = salt.shades.find((s) => s.id === id);
      setWipe({
        key: Date.now(),
        colour: target?.bg ?? "#000",
        x: origin?.x ?? window.innerWidth / 2,
        y: origin?.y ?? 0,
      });
      // Swap the tokens once the new colour covers the screen, then let the overlay fade.
      window.setTimeout(() => apply(id), WIPE_MS);
      window.setTimeout(() => {
        setWipe(null);
        busy.current = false;
      }, WIPE_MS + 450);
    },
    [apply, shade],
  );

  const next = useCallback(
    (origin?: { x: number; y: number }) => {
      const i = salt.shades.findIndex((s) => s.id === shade);
      pick(salt.shades[(i + 1) % salt.shades.length].id, origin);
    },
    [pick, shade],
  );

  const value = useMemo(() => ({ shade, pick, next }), [shade, pick, next]);

  return (
    <ShadeContext.Provider value={value}>
      {children}
      {wipe && (
        <motion.div
          key={wipe.key}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[95]"
          style={{ background: wipe.colour }}
          initial={{ clipPath: `circle(0px at ${wipe.x}px ${wipe.y}px)`, opacity: 1 }}
          animate={{
            clipPath: [`circle(0px at ${wipe.x}px ${wipe.y}px)`, `circle(160vmax at ${wipe.x}px ${wipe.y}px)`, `circle(160vmax at ${wipe.x}px ${wipe.y}px)`],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: (WIPE_MS + 450) / 1000, times: [0, WIPE_MS / (WIPE_MS + 450), 1], ease: [0.32, 0.72, 0, 1] }}
        />
      )}
    </ShadeContext.Provider>
  );
}

/** Round swatches, one per shade. Pressed state follows the active shade. */
export function ShadeDots({ className = "", size = "size-7" }: { className?: string; size?: string }) {
  const { shade, pick } = useShade();
  return (
    <div role="radiogroup" aria-label="Page shade" className={`flex items-center gap-2 ${className}`}>
      {salt.shades.map((s) => {
        const on = s.id === shade;
        return (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={`${s.name} shade`}
            title={s.name}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              pick(s.id, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
            }}
            className="group flex size-11 cursor-pointer items-center justify-center"
          >
            <span
              className={`block rounded-full ring-2 ring-offset-2 transition-[transform,box-shadow] duration-500 ease-studio group-hover:scale-110 ${size} ${on ? "ring-fg" : "ring-transparent"}`}
              style={{ background: s.bg, boxShadow: `inset 0 0 0 1.5px ${s.fg}55`, ["--tw-ring-offset-color" as string]: "var(--t-bg)" }}
            />
          </button>
        );
      })}
    </div>
  );
}
