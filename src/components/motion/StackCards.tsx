"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Children, useRef, type ReactNode } from "react";

type StackCardsProps = {
  children: ReactNode;
  className?: string;
  /** Sticky offset of the first card in px. */
  top?: number;
  /** Extra offset per card so earlier cards peek out above. */
  step?: number;
  minScale?: number;
  gapClassName?: string;
};

/** Cards pin on top of each other while earlier ones shrink back. */
export function StackCards({
  children,
  className = "",
  top = 96,
  step = 22,
  minScale = 0.86,
  gapClassName = "mb-[12vh]",
}: StackCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <StackItem
          key={i}
          index={i}
          count={items.length}
          progress={scrollYProgress}
          top={top + i * step}
          minScale={minScale}
          className={i < items.length - 1 ? gapClassName : ""}
        >
          {child}
        </StackItem>
      ))}
    </div>
  );
}

function StackItem({
  index,
  count,
  progress,
  top,
  minScale,
  className,
  children,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  top: number;
  minScale: number;
  className: string;
  children: ReactNode;
}) {
  const end = 1 - ((count - 1 - index) * (1 - minScale)) / Math.max(1, count - 1);
  const scale = useTransform(progress, [index / count, 1], [1, end]);
  return (
    <div className={`sticky ${className}`} style={{ top }}>
      <motion.div style={{ scale, transformOrigin: "50% 0%" }}>{children}</motion.div>
    </div>
  );
}
