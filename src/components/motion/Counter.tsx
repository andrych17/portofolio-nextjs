"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { easeStudio } from "./ease";

type CounterProps = { value: number; prefix?: string; suffix?: string; className?: string; duration?: number };

/** Counts up once when visible. Server HTML carries the final number for crawlers. */
export function Counter({ value, prefix = "", suffix = "", className, duration = 1.8 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const format = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`;

  useEffect(() => {
    if (reduce || !ref.current) return;
    if (!inView) {
      ref.current.textContent = format(0);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: easeStudio,
      onUpdate: (n) => {
        if (ref.current) ref.current.textContent = format(n);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
