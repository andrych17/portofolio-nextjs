"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { street } from "@/content/fashion/street";

/** Drop week as five day tiles. A lime line fills with scroll and each day lights up as it passes. */
export function StreetCalendar() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [reduce, setReduce] = useState(false);
  const [passed, setPassed] = useState(0);
  const days = street.week;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 65%"] });

  // useReducedMotion is null on the server, so read it after mount to keep hydration identical.
  useEffect(() => setReduce(Boolean(reduceMotion)), [reduceMotion]);
  useMotionValueEvent(scrollYProgress, "change", (p) => setPassed(Math.min(days.length, Math.ceil(p * days.length - 0.05))));

  return (
    <section id="week" aria-labelledby="week-title" className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-36">
      <p className="street-tag text-accent">(04) Drop week</p>
      <MaskText
        as="h2"
        id="week-title"
        className="mt-5 max-w-5xl font-display text-[clamp(2.6rem,7.4vw,7.4rem)]"
        lines={["Five days,", <span key="s" className="text-fg/35">one box each.</span>]}
      />

      <div ref={ref} className="relative mt-16 md:mt-24">
        {/* Rails: vertical on mobile, horizontal from md up. */}
        <span aria-hidden className="absolute bottom-3 left-[0.62rem] top-3 w-0.5 bg-fg/15 md:hidden" />
        <motion.span
          aria-hidden
          className="absolute bottom-3 left-[0.62rem] top-3 w-0.5 origin-top bg-accent md:hidden"
          style={reduce ? undefined : { scaleY: scrollYProgress }}
        />
        <span aria-hidden className="absolute inset-x-0 top-[0.62rem] hidden h-0.5 bg-fg/15 md:block" />
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-[0.62rem] hidden h-0.5 origin-left bg-accent md:block"
          style={reduce ? undefined : { scaleX: scrollYProgress }}
        />

        <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
          {days.map((d, i) => {
            const on = i < (reduce ? days.length : passed);
            return (
              <li key={d.day} className="relative pl-10 md:pl-0 md:pt-12">
                <span
                  aria-hidden
                  className={`absolute left-0 top-1 size-[1.4rem] rotate-45 border-2 transition-colors duration-500 md:top-0 ${on ? "border-accent bg-accent" : "border-fg/30 bg-bg"}`}
                />
                <div className={`transition-opacity duration-700 ${on ? "opacity-100" : "opacity-40"}`}>
                  <p className="font-display text-[2.6rem] uppercase leading-none md:text-5xl">{d.day}</p>
                  <p className="street-tag mt-2 text-accent">
                    {d.time} · {d.title}
                  </p>
                  <p className="mt-4 max-w-xs leading-relaxed text-fg/75">{d.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
