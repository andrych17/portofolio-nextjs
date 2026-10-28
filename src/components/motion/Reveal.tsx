"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { easeStudio } from "./ease";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  amount?: number;
};

export function Reveal({ children, className, delay = 0, y = 36, x = 0, scale = 1, amount = 0.25 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 1, ease: easeStudio, delay }}
    >
      {children}
    </motion.div>
  );
}
