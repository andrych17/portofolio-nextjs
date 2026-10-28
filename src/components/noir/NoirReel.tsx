"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

/** Full-bleed image that grows from a rounded card to edge-to-edge as it scrolls in. */
export function NoirReel({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.78, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [36, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  const captionOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <div ref={ref} className="relative h-[70svh] md:h-[110svh]">
      <motion.div className="sticky top-0 h-full overflow-hidden" style={{ scale, borderRadius: radius }}>
        <motion.div className="absolute inset-x-0 -inset-y-[12%]" style={{ y: imageY }}>
          <Image src={src} alt={alt} fill sizes="100vw" className="object-cover grayscale" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <motion.div
          style={{ opacity: captionOpacity }}
          className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#ece7dd] md:p-10"
        >
          <span>Studio life, Lisbon</span>
          <span>Est. 2014</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
