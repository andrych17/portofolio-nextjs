"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useCallback, useRef, useState, type PointerEvent } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { salt } from "@/content/fashion/salt";
import { useMediaQuery } from "@/lib/use-media-query";

const LIFT = ["", "md:mt-16", "md:mt-6", "md:mt-24", "", "md:mt-12"];

/** Snap carousel of the season's looks. Fine pointers get a drag cursor and mouse-drag scrolling; touch uses native swipe. */
export function SaltLooks() {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [inside, setInside] = useState(false);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const x = useSpring(cx, { stiffness: 420, damping: 32, mass: 0.4 });
  const y = useSpring(cy, { stiffness: 420, damping: 32, mass: 0.4 });

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  function step(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li")?.getBoundingClientRect().width ?? el.clientWidth * 0.6;
    el.scrollBy({ left: dir * (card + 24), behavior: "smooth" });
  }

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    cx.set(e.clientX - r.left);
    cy.set(e.clientY - r.top);
    const d = drag.current;
    if (d.active && track.current) {
      const dx = e.clientX - d.startX;
      if (Math.abs(dx) > 4) d.moved = true;
      track.current.scrollLeft = d.startLeft - dx;
    }
  }

  function onDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { active: true, startX: e.clientX, startLeft: track.current.scrollLeft, moved: false };
    setDragging(true);
  }

  function end() {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
  }

  return (
    <section id="looks" aria-labelledby="looks-title" className="overflow-x-clip bg-surface py-24 md:py-36">
      <div className="mx-auto flex max-w-[1700px] flex-wrap items-end justify-between gap-8 px-5 md:px-10">
        <div>
          <p className="salt-caps text-muted">03 · Looks</p>
          <MaskText
            as="h2"
            id="looks-title"
            className="mt-5 font-display text-[clamp(2.8rem,7.6vw,7.8rem)]"
            lines={["Six days,", <span key="s" className="text-accent">six places.</span>]}
          />
        </div>
        <div className="flex items-center gap-3">
          <p className="salt-caps mr-3 hidden text-muted sm:block">{fine ? "Drag, or use the arrows" : "Swipe, or use the arrows"}</p>
          <Arrow label="Previous look" dir={-1} onClick={() => step(-1)} />
          <Arrow label="Next look" dir={1} onClick={() => step(1)} />
        </div>
      </div>

      <div
        className="relative mt-14 md:mt-20"
        onPointerMove={onMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && setInside(true)}
        onPointerLeave={() => {
          setInside(false);
          end();
        }}
        onPointerDown={onDown}
        onPointerUp={end}
        onPointerCancel={end}
      >
        <div
          ref={track}
          onScroll={sync}
          tabIndex={0}
          role="region"
          aria-label="Looks, scroll sideways"
          className={`salt-noscroll flex scroll-px-5 gap-6 overflow-x-auto px-5 pb-6 md:scroll-px-10 md:px-10 ${dragging ? "snap-none" : "snap-x snap-mandatory"} ${fine ? "cursor-none" : ""}`}
        >
          <ul className="contents">
            {salt.looks.map((look, i) => (
              <li key={look.n} className={`w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[27vw] ${LIFT[i]}`}>
                <article>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1.6rem] bg-bg">
                    <Image src={look.image} alt={look.alt} fill draggable={false} sizes="(min-width: 1024px) 27vw, (min-width: 640px) 44vw, 78vw" className="pointer-events-none select-none object-cover" />
                    <span className="salt-caps absolute left-4 top-4 rounded-full bg-[var(--l-paper)] px-3 py-1.5 text-[var(--l-ink)]">{look.n}</span>
                  </div>
                  <div className="mt-5">
                    <h3 className="font-display text-[1.9rem] leading-none">{look.name}</h3>
                    <p className="salt-caps mt-2 text-muted">{look.place}</p>
                    <p className="mt-3 max-w-xs leading-relaxed text-fg/90">{look.body}</p>
                  </div>
                </article>
              </li>
            ))}
            <li aria-hidden className="w-2 shrink-0" />
          </ul>
        </div>

        {fine && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-10 flex size-24 items-center justify-center rounded-full bg-accent text-accent-fg"
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
            animate={{ opacity: inside ? 1 : 0, scale: inside ? (dragging ? 0.82 : 1) : 0.4 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <span className="salt-caps">{dragging ? "Hold" : "Drag"}</span>
          </motion.div>
        )}
      </div>

      <div className="mx-auto mt-6 max-w-[1700px] px-5 md:px-10">
        <div className="h-0.5 w-full bg-fg/20">
          <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${Math.max(0.12, progress)})` }} />
        </div>
      </div>
    </section>
  );
}

function Arrow({ label, dir, onClick }: { label: string; dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-12 cursor-pointer items-center justify-center rounded-full ring-1 ring-fg/40 transition-colors duration-500 hover:bg-fg hover:text-bg"
    >
      <svg viewBox="0 0 24 24" className={`size-5 ${dir === -1 ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
