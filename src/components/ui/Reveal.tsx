"use client";

import { motion, useReducedMotion } from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { clipPath: "inset(0 0 100% 0)", y: "0.4em", opacity: 0 }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }
      }
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.62,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
