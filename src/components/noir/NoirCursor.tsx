"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/use-media-query";

type Mode = "dot" | "link" | "label";

/** Trailing cursor. Elements with data-cursor="Label" turn it into a labelled disc. */
export function NoirCursor() {
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");
  const [mode, setMode] = useState<Mode>("dot");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 42, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 42, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as Element;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setMode("label");
        setLabel(labelled.dataset.cursor ?? "");
      } else if (target.closest("a, button, [role=button], input, textarea, label")) {
        setMode("link");
      } else {
        setMode("dot");
      }
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const size = mode === "label" ? 104 : mode === "link" ? 46 : 10;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95]"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-medium uppercase tracking-[0.18em] ${
          mode === "label" ? "bg-accent text-accent-fg" : mode === "link" ? "border border-[#ece7dd] mix-blend-difference" : "bg-[#ece7dd] mix-blend-difference"
        }`}
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        {mode === "label" && label}
      </motion.div>
    </motion.div>
  );
}
