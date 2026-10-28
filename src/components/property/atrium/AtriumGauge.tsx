"use client";

import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { useState } from "react";

const LEVELS = 24;

/** Desktop side gauge: the page is a building, and scroll depth is the floor you are on. */
export function AtriumGauge() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const y = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const [level, setLevel] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (v) => setLevel(1 + Math.round(v * (LEVELS - 1))));

  return (
    <div aria-hidden className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 mix-blend-difference xl:block">
      <div className="relative h-48 w-6">
        <span className="absolute inset-y-0 right-0 w-px bg-white/55" />
        {Array.from({ length: LEVELS }, (_, i) => (
          <span key={i} className={`absolute right-0 h-px bg-white/55 ${i % 6 === 0 ? "w-3" : "w-1.5"}`} style={{ top: `${(i / (LEVELS - 1)) * 100}%` }} />
        ))}
        <motion.span className="absolute right-0 flex -translate-y-1/2 items-center gap-2" style={{ top: y }}>
          <span className="font-mono text-[10.5px] tabular-nums text-white">L{String(level).padStart(2, "0")}</span>
          <span className="block h-[3px] w-5 bg-white" />
        </motion.span>
      </div>
    </div>
  );
}
