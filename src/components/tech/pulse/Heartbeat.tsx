"use client";

import { motion } from "motion/react";
import { easeStudio } from "@/components/motion/ease";

/** Full-width pulse line that draws itself once when the footer scrolls in. */
export function Heartbeat() {
  return (
    <svg viewBox="0 0 1200 80" className="mt-20 w-full overflow-visible" aria-hidden>
      <motion.path
        d="M0 40 H380 L410 40 L430 12 L460 68 L488 4 L512 40 H760 L778 28 L796 52 L812 40 H1200"
        fill="none"
        stroke="var(--t-accent)"
        strokeWidth="3"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 2.4, ease: easeStudio }}
      />
    </svg>
  );
}
