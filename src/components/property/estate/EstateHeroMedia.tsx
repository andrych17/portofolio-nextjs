"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

/** Full-bleed hero photograph that drifts and zooms as the page scrolls away. */
export function EstateHeroMedia({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.24]);
  const veil = useTransform(scrollYProgress, [0, 0.8], [0, 0.7]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-[#0f2a20]">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(15_42_32/0.55)_0%,rgb(15_42_32/0.05)_38%,rgb(15_42_32/0.82)_100%)]" />
      <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-[#0f2a20]" />
    </div>
  );
}
