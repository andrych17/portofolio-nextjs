"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SESSION_KEY = "portfolio_preloaded";

export default function Preloader() {
  const [visible, setVisible] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1100;
    let raf: number;

    const tick = (now: number) => {
      setVisible(true);
      const progress = Math.min((now - start) / duration, 1);
      setPct(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";
        setTimeout(() => setVisible(false), 300);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
          className="fixed inset-0 z-[100] flex items-end justify-between bg-[var(--bg)] px-[var(--pad-x)] py-10"
        >
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--mut)]">
            Andry Huang
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg)] tabular-nums">
            {pct}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
