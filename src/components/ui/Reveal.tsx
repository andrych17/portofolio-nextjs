"use client";

import { motion } from "framer-motion";

const EASE = [0.83, 0, 0.17, 1] as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)", y: "0.4em", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.62, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
