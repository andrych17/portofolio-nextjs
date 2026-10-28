"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Scroll-lit paragraph. Markup is identical on server and client, so reduced motion cannot cause a hydration mismatch. */
export function FreightWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [still, setStill] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = text.split(" ");

  useEffect(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} still={still}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, still }: { children: string; progress: MotionValue<number>; range: [number, number]; still: boolean }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <>
      <motion.span style={{ opacity: still ? 1 : opacity }}>{children}</motion.span>{" "}
    </>
  );
}
