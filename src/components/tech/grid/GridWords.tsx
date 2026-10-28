"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Props = { text: string; className?: string; dim?: number };

/** Words light up one by one while the paragraph scrolls through. Same idea as the shared ScrollWords, minus its speakable flag. */
export function GridWords({ text, className, dim = 0.16 }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  // Read after mount: Motion reports the preference on the client's first render but not on the server, which would break hydration.
  const prefers = useReducedMotion();
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(Boolean(prefers)), [prefers]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = text.split(" ");

  if (reduce) return <p className={className}>{text}</p>;
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

function Word({ children, progress, range, dim }: { children: string; progress: MotionValue<number>; range: [number, number]; dim: number; }) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}
