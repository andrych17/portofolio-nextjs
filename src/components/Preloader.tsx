"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "portfolio_preloaded";

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    // Check session storage to avoid repeating during same session navigation
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    document.body.style.overflow = "hidden";
    setVisible(true);

    const start = performance.now();
    const duration = 1400; // Smooth 1.4s cinematic count
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing curve for realistic non-linear counter
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setPct(Math.round(easeProgress * 100));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";
        setTimeout(() => setVisible(false), 350);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  const getStatusText = (progress: number) => {
    if (progress < 25) return "INITIALIZING CREATIVE SYSTEM...";
    if (progress < 55) return "CALIBRATING SPATIAL LIGHTING & MESH...";
    if (progress < 85) return "COMPILING 30+ ARCHIVED ENTERPRISE CASES...";
    if (progress < 99) return "SYNCHRONIZING KINETIC INTERFACES...";
    return "EXPERIENCE READY";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#07070a] px-6 sm:px-12 py-8 sm:py-10 text-[var(--fg)] select-none overflow-hidden"
        >
          {/* Ambient spatial lighting in preloader */}
          <div className="absolute inset-0 ambient-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-tr from-orange-500/15 via-violet-600/10 to-transparent rounded-full blur-[90px] pointer-events-none animate-pulse-halo" />

          {/* Top Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/50"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>ANDRY HUANG // 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>JAKARTA, ID • UTC+7</span>
            </div>
          </motion.div>

          {/* Center Stage: Monogram, Giant Counter & Progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 my-auto flex flex-col items-center justify-center text-center px-4"
          >
            {/* Minimalist Monogram Badge with Rotating Ring */}
            <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
              <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-orange-500/30 animate-[spin_8s_linear_infinite]" />
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/5 border border-white/15 backdrop-blur-md flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0_25px_rgba(255,85,0,0.15)]">
                <span className="font-mono text-sm sm:text-base font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-orange-400">
                  AH
                </span>
              </div>
            </div>

            {/* Giant Typographic Counter */}
            <div className="flex items-baseline justify-center gap-1 font-mono tracking-tighter">
              <span className="text-7xl sm:text-8xl md:text-9xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-white/40 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                {pct.toString().padStart(2, "0")}
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl font-light text-orange-500/90 font-mono">
                %
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="mt-6 sm:mt-8 w-60 sm:w-80 md:w-96">
              <div className="h-[3px] sm:h-1 w-full bg-white/10 rounded-full overflow-hidden p-[0.5px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-violet-500 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(255,85,0,0.8)]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Dynamic Status Text */}
            <p className="mt-4 font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/45 h-5 flex items-center justify-center">
              {getStatusText(pct)}
            </p>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/40"
          >
            <span>FULL-STACK &amp; AI ARCHITECT</span>
            <span>EXPERIENCE 7+ YRS</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
