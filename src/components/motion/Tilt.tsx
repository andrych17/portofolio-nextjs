"use client";

import { motion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type TiltProps = { children: ReactNode; className?: string; max?: number };

/** 3D tilt that follows the pointer. Touch input is ignored. */
export function Tilt({ children, className = "", max = 8 }: TiltProps) {
  const spring = { stiffness: 180, damping: 14 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
