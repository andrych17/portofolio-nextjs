"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoveParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: "heart" | "sparkle" | "bloom";
  color: string;
  duration: number;
  delay: number;
  drift: number;
  rotation: number;
}

const COLORS = [
  "#f43f5e", // Rose 500
  "#ec4899", // Pink 500
  "#e11d48", // Rose 600
  "#fb7185", // Rose 400
  "#f472b6", // Pink 400
  "#fda4af", // Rose 300
  "#ffedd5", // Warm peach
];

export default function LoveAnimation({ trigger }: { trigger: boolean }) {
  const [particles, setParticles] = useState<LoveParticle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    // Generate 60 diverse dynamic particles (burst + floating fountain)
    const newParticles: LoveParticle[] = Array.from({ length: 65 }).map((_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 80, // concentrated near center then spreading
      y: 95 + Math.random() * 10,
      size: 14 + Math.random() * 26,
      type: i % 4 === 0 ? "sparkle" : i % 5 === 0 ? "bloom" : "heart",
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: 3 + Math.random() * 2.8,
      delay: Math.random() * 0.9,
      drift: (Math.random() - 0.5) * 220,
      rotation: (Math.random() - 0.5) * 90,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 6500);

    return () => clearTimeout(timer);
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 0,
              scale: 0.1,
              x: `${p.x}vw`,
              y: "100vh",
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0.9, 0],
              scale: [0.1, 1.4, 1.1, 1, 0.7],
              x: `calc(${p.x}vw + ${p.drift}px)`,
              y: "-15vh",
              rotate: p.rotation * 4,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute select-none filter drop-shadow-[0_4px_12px_rgba(244,63,94,0.35)] flex items-center justify-center"
            style={{ width: `${p.size}px`, height: `${p.size}px` }}
          >
            {p.type === "heart" && (
              <svg
                viewBox="0 0 24 24"
                fill={p.color}
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
            {p.type === "sparkle" && (
              <svg
                viewBox="0 0 24 24"
                fill={p.color}
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            )}
            {p.type === "bloom" && (
              <span className="text-xl leading-none">💖</span>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
