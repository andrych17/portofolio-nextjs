"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoveParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
  duration: number;
  delay: number;
  rotation: number;
}

const EMOJIS = ["❤️", "💖", "💕", "✨", "🥰", "🌸", "💐", "💞", "💓"];

export default function LoveAnimation({ trigger }: { trigger: boolean }) {
  const [particles, setParticles] = useState<LoveParticle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    // Generate burst of love particles
    const newParticles: LoveParticle[] = Array.from({ length: 45 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100, // percentage of screen width
      y: 90 + Math.random() * 20, // start near bottom
      size: 18 + Math.random() * 28, // font size
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      duration: 2.5 + Math.random() * 2.5,
      delay: Math.random() * 0.8,
      rotation: (Math.random() - 0.5) * 60,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 5500);

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
              scale: 0.2,
              x: `${p.x}vw`,
              y: "90vh",
              rotate: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.2, 1.2, 1, 0.8],
              x: `${p.x + (Math.sin(p.id) * 12)}vw`,
              y: "-15vh",
              rotate: p.rotation * 3,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "easeOut",
            }}
            className="absolute select-none filter drop-shadow-[0_0_12px_rgba(255,105,180,0.8)]"
            style={{ fontSize: `${p.size}px` }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
