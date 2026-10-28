"use client";

import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type HorizontalScrollProps = { children: ReactNode; className?: string; trackClassName?: string };

/** Pins the section and maps vertical scroll to a horizontal track. */
export function HorizontalScroll({ children, className = "", trackClassName = "" }: HorizontalScrollProps) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const distanceValue = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distanceValue.get());

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const d = Math.max(0, el.scrollWidth - window.innerWidth);
      setDistance(d);
      distanceValue.set(d);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distanceValue]);

  return (
    <section ref={section} className={`relative ${className}`} style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className={`flex w-max ${trackClassName}`}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
