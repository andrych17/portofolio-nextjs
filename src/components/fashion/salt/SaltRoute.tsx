"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { salt } from "@/content/fashion/salt";

const COUNT = salt.route.length;
const SEGMENT = "M50 0 C 64 33, 36 66, 50 100";

function Stop({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const stop = salt.route[index];
  const at = (index + 0.5) / COUNT;
  const next = (index + 1.5) / COUNT;
  const fill = useTransform(progress, [at - 0.06, at], [0, 1]);
  const draw = useTransform(progress, [at, next], [0, 1]);
  const right = index % 2 === 1;
  return (
    <li className="relative grid grid-cols-[3rem_1fr] gap-x-5 pb-14 last:pb-0 md:grid-cols-2 md:gap-x-0 md:pb-24">
      <span aria-hidden className="absolute left-[1.5rem] top-1.5 z-10 size-5 -translate-x-1/2 rounded-full bg-bg ring-2 ring-fg md:left-1/2">
        <motion.span className="absolute inset-[3px] rounded-full bg-accent" style={{ scale: fill }} />
      </span>
      {/* Desktop wave: one S-curve per stop, so every dot sits exactly on the line. */}
      {index < COUNT - 1 && (
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute left-0 top-4 hidden h-full w-full md:block">
          <path d={SEGMENT} fill="none" stroke="var(--t-fg)" strokeOpacity="0.22" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <motion.path d={SEGMENT} fill="none" stroke="var(--t-accent)" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
        </svg>
      )}
      <div className={right ? "col-start-2 md:pl-16" : "col-start-2 md:col-start-1 md:pr-16 md:text-right"}>
        <p className="salt-caps text-muted">
          0{index + 1} · {stop.place}
        </p>
        <h3 className="mt-2 font-display text-[clamp(2rem,3.6vw,3.4rem)]">{stop.stop}</h3>
        <p className={`mt-3 max-w-sm leading-relaxed text-fg/90 ${right ? "" : "md:ml-auto"}`}>{stop.body}</p>
      </div>
    </li>
  );
}

/** Five stops from flax field to studio. The line draws as you scroll and each dot fills when you reach it. */
export function SaltRoute() {
  const ref = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);
  const prefers = useReducedMotion();
  const done = useMotionValue(1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = reduce ? done : scrollYProgress;
  const railScale = useTransform(progress, [0, 1], [0, 1]);

  useEffect(() => setReduce(!!prefers), [prefers]);

  return (
    <section id="route" aria-labelledby="route-title" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1700px] px-5 md:px-10">
        <p className="salt-caps text-muted">05 · From field to studio</p>
        <MaskText
          as="h2"
          id="route-title"
          className="mt-5 max-w-3xl font-display text-[clamp(2.8rem,7vw,7rem)]"
          lines={["Every shirt", <span key="s" className="text-accent">has a route.</span>]}
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-5xl md:mt-28">
          <div aria-hidden className="absolute bottom-2 left-[1.5rem] top-2 w-0.5 -translate-x-1/2 bg-fg/20 md:hidden">
            <motion.div className="h-full origin-top bg-accent" style={{ scaleY: railScale }} />
          </div>
          <ol className="relative">
            {salt.route.map((_, i) => (
              <Stop key={i} index={i} progress={progress} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
