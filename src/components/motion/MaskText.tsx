"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { easeStudio } from "./ease";

// The observed element must be the unclipped wrapper: a child already pushed
// out of its overflow-hidden mask never intersects, so it would never reveal.

type MaskTextProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  id?: string;
};

/** Lines slide up from behind a mask when scrolled into view. */
export function MaskText({ lines, as: Tag = "h2", className, delay = 0, stagger = 0.08, id }: MaskTextProps) {
  const line: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({ y: "0%", transition: { duration: 1, ease: easeStudio, delay: delay + i * stagger } }),
  };
  return (
    <Tag className={className} id={id}>
      <motion.span className="block" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
        {lines.map((content, i) => (
          <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <motion.span className="block" custom={i} variants={line}>
              {content}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

type SplitWordsProps = { text: string; className?: string; delay?: number; stagger?: number };

/** Word-by-word rise for short paragraphs and subheads. */
export function SplitWords({ text, className, delay = 0, stagger = 0.025 }: SplitWordsProps) {
  const words = text.split(" ");
  const word: Variants = {
    hidden: { y: "105%" },
    show: (i: number) => ({ y: "0%", transition: { duration: 0.8, ease: easeStudio, delay: delay + i * stagger } }),
  };
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <motion.span aria-hidden initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-top">
            <motion.span className="inline-block" custom={i} variants={word}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </span>
  );
}
