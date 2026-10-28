"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef, type ReactNode } from "react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

type MarqueeProps = {
  children: ReactNode;
  /** Percent of one copy per second. Negative scrolls left. */
  speed?: number;
  className?: string;
  /** Lean the row with scroll velocity. */
  skew?: boolean;
};

/** Infinite row that speeds up and flips direction with scroll velocity. */
export function Marquee({ children, speed = -2, className = "", skew = false }: MarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const skewX = useTransform(velocity, [-2500, 2500], [10, -10]);
  const x = useTransform(baseX, (v) => `${wrap(-50, -25, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * speed * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`flex overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex flex-nowrap" style={{ x, skewX: skew ? skewX : 0 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={i > 0 || undefined}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
