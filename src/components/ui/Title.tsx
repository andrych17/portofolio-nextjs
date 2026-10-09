"use client";

import { motion } from "framer-motion";

export const EASE = [0.2, 0.9, 0.1, 1] as const;

interface TitleProps {
  no: string;
  children: React.ReactNode;
  meta?: React.ReactNode;
  id?: string;
}

/** Section heading: the word rises out of a clipped line while the orange slab slides in under it. */
export function Title({ no, children, meta, id }: TitleProps) {
  return (
    <motion.div className="ah-head" initial="off" whileInView="on" viewport={{ once: true, margin: "0px 0px -12% 0px" }}>
      <span className="ah-mono ah-head-no">{no}</span>
      <h2 className="ah-title" id={id}>
        <motion.i
          aria-hidden="true"
          className="ah-title-bar"
          variants={{ off: { scaleX: 0 }, on: { scaleX: 1, transition: { duration: 0.55, ease: EASE } } }}
        />
        <span className="ah-title-clip">
          <motion.span
            className="ah-title-word"
            variants={{
              off: { y: "110%", skewX: -12 },
              on: { y: 0, skewX: 0, transition: { duration: 0.7, delay: 0.08, ease: EASE } },
            }}
          >
            {children}
          </motion.span>
        </span>
      </h2>
      {meta && <span className="ah-mono ah-head-meta">{meta}</span>}
    </motion.div>
  );
}
