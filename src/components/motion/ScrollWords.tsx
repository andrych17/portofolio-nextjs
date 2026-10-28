"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type ScrollWordsProps = { text: string; className?: string; dim?: number };

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function ScrollWords({ text, className, dim = 0.18 }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = text.split(" ");

  if (reduce) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className} data-speakable>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} dim={dim}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  dim,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}
