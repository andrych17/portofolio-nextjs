"use client";

import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      {!reduce && <ReactLenis root options={{ lerp: 0.11, wheelMultiplier: 1 }} />}
      {children}
    </MotionConfig>
  );
}
