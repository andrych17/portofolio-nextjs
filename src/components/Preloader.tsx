"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "portfolio_preloaded";

const STAGES = [
  { threshold: 25, label: "INITIALIZING CREATIVE SYSTEM...", tag: "SYS.CORE" },
  { threshold: 55, label: "CALIBRATING SPATIAL LIGHTING & MESH...", tag: "GPU.SHADERS" },
  { threshold: 85, label: "COMPILING 30+ ARCHIVED ENTERPRISE CASES...", tag: "DATA.ARCHIVE" },
  { threshold: 99, label: "SYNCHRONIZING KINETIC INTERFACES...", tag: "UI.MOTION" },
  { threshold: 100, label: "EXPERIENCE READY", tag: "ALL_SYSTEMS_GO" },
];

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    // Only show once per session to maintain seamless internal browsing
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    document.body.style.overflow = "hidden";
    setVisible(true);

    const start = performance.now();
    const duration = 2400; // Cinematic 2.4s pacing for maximum aesthetic enjoyment
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Custom non-linear curve: fast initial acceleration, steady cadence, crisp completion
      let curved: number;
      if (progress < 0.4) {
        curved = Math.pow(progress / 0.4, 1.4) * 0.45;
      } else if (progress < 0.85) {
        curved = 0.45 + ((progress - 0.4) / 0.45) * 0.43;
      } else {
        curved = 0.88 + Math.pow((progress - 0.85) / 0.15, 2) * 0.12;
      }

      setPct(Math.round(curved * 100));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";
        setTimeout(() => setVisible(false), 450);
      }
    };
    raf = requestAnimationFrame(tick);

    // Hard fallback safety timer to guarantee unblocking
    const fallbackTimer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      document.body.style.overflow = "";
      setVisible(false);
    }, 3600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallbackTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const currentStage = STAGES.find((s) => pct <= s.threshold) || STAGES[STAGES.length - 1];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.85, 0, 0.15, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#060609] px-6 sm:px-12 py-8 sm:py-10 text-[var(--fg)] select-none overflow-hidden"
        >
          {/* Ambient spatial lighting mesh */}
          <div className="absolute inset-0 ambient-grid opacity-30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-gradient-to-tr from-orange-500/20 via-violet-600/15 to-transparent rounded-full blur-[100px] pointer-events-none animate-pulse-halo" />

          {/* Top Bar • Brand, Session, Location */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/50"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_#f97316]" />
              <span className="font-semibold text-white/80">ANDRY HUANG • ARCHITECTURE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>JAKARTA, ID • UTC+7</span>
            </div>
          </motion.div>

          {/* Center Stage: Monogram, Giant Typographic Counter & Telemetry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4"
          >
            {/* Dual Orbital Rings with Glowing AH Monogram */}
            <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
              <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-dashed border-orange-500/35 animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-dotted border-violet-500/30 animate-[spin_14s_linear_infinite_reverse]" />
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-md flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_0_30px_rgba(255,85,0,0.25)]">
                <span className="font-mono text-base sm:text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-orange-400">
                  AH
                </span>
              </div>
            </div>

            {/* Giant Typographic Counter */}
            <div className="flex items-baseline justify-center gap-1 font-mono tracking-tighter">
              <span className="text-7xl sm:text-8xl md:text-9xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-white/40 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
                {pct.toString().padStart(2, "0")}
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl font-light text-orange-500 font-mono">
                %
              </span>
            </div>

            {/* Precision Laser Progress Bar */}
            <div className="mt-6 sm:mt-8 w-60 sm:w-80 md:w-96">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-[1px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-violet-500 rounded-full transition-all duration-75 ease-out shadow-[0_0_16px_rgba(255,85,0,0.9)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Dynamic Telemetry Stage & Status */}
            <div className="mt-4 flex items-center gap-2.5 font-mono text-[11px] sm:text-xs tracking-[0.22em] text-white/50 h-5">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-orange-400 text-[10px] font-semibold">
                {currentStage.tag}
              </span>
              <span className="text-white/70 uppercase">
                {currentStage.label}
              </span>
            </div>
          </motion.div>

          {/* Bottom Bar • Tech Stack Telemetry */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/40"
          >
            <div className="flex items-center gap-3">
              <span>.NET CORE</span>
              <span>•</span>
              <span>NEXT.JS</span>
              <span>•</span>
              <span>AI AGENTS</span>
            </div>
            <span>EXPERIENCE 7+ YRS</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
