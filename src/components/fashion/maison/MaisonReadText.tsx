"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type Props = { text: string; className?: string; dim?: number };

/** Paragraph whose words darken one by one while it crosses the viewport. Reduced motion is handled in CSS so server and client markup stay identical. */
export function MaisonReadText({ text, className, dim = 0.16 }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} dim={dim}>
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range, dim }: { children: string; progress: MotionValue<number>; range: [number, number]; dim: number }) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <>
      <motion.span className="maison-word" style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}
