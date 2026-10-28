"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { easeStudio } from "./ease";

const from = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

type ClipRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: keyof typeof from;
  delay?: number;
  /** Play on mount instead of on scroll. */
  immediate?: boolean;
};

// Chrome's IntersectionObserver treats a fully clipped target as hidden, so the
// observed element is the unclipped outer box and the clip lives one level down.

/** Wipes its content in with clip-path while the inner layer settles from a slight zoom. */
export function ClipReveal({ children, className = "", direction = "bottom", delay = 0, immediate }: ClipRevealProps) {
  const clip: Variants = {
    hidden: { clipPath: from[direction] },
    show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, ease: easeStudio, delay } },
  };
  const zoom: Variants = {
    hidden: { scale: 1.2 },
    show: { scale: 1, transition: { duration: 1.8, ease: easeStudio, delay } },
  };
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.25 } };

  return (
    <motion.div className={`relative ${className}`} initial="hidden" {...trigger}>
      <motion.div className="absolute inset-0 overflow-hidden rounded-[inherit]" variants={clip}>
        <motion.div className="relative h-full w-full" variants={zoom}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
