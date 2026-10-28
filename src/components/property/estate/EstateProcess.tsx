"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { estate } from "@/content/property/estate";

/** Steps light up one after another while a brass line fills down the rail. */
export function EstateProcess() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <ol ref={ref} className="relative space-y-14 pl-14 md:space-y-20 md:pl-24">
      <span aria-hidden className="absolute bottom-0 left-[19px] top-2 w-px bg-line md:left-[27px]">
        <motion.span style={{ scaleY }} className="absolute inset-0 origin-top bg-[#b08d4b]" />
      </span>
      {estate.process.map((step, i) => (
        <Step key={step.title} index={i} title={step.title} body={step.body} />
      ))}
    </ol>
  );
}

function Step({ index, title, body }: { index: number; title: string; body: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "start 50%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [18, 0]);

  return (
    <li ref={ref} className="relative">
      <span className="absolute -left-14 top-0 flex size-10 items-center justify-center overflow-hidden rounded-full bg-bg ring-1 ring-fg/25 md:-left-24 md:size-14">
        <motion.span aria-hidden style={{ scale: fill }} className="absolute inset-0 rounded-full bg-[#b08d4b]" />
        <span className="relative font-display text-lg text-fg md:text-2xl">{index + 1}</span>
      </span>
      <motion.div style={{ opacity, y: lift }}>
        <h3 className="font-display text-[clamp(1.9rem,3.4vw,3rem)] leading-tight">{title}</h3>
        <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-fg/75">{body}</p>
      </motion.div>
    </li>
  );
}
