"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Pixels the image drifts in each direction. */
  offset?: number;
  priority?: boolean;
};

export function ParallaxImage({
  src,
  alt,
  sizes,
  className = "",
  imgClassName = "",
  offset = 60,
  priority,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-x-0" style={{ y, top: -offset, bottom: -offset }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
}
