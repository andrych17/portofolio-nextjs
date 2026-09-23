"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "portfolio_preloaded";
// Bumper is 3.1s; this only matters if the video stalls or never fires `ended`.
const SAFETY_MS = 5200;

// Decide once per page load: first visit on this browser and motion allowed.
let shouldShowCache: boolean | null = null;
const readShouldShow = () =>
  (shouldShowCache ??=
    !localStorage.getItem(STORAGE_KEY) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
const noopSubscribe = () => () => {};

/**
 * First-visit bumper, same pattern as construction-landing-web's ArchitecturalPreloader:
 * full-screen logo video (signals converge into the "AH" monogram), then the curtain lifts.
 * Any video failure simply ends the preloader — the site must never be blocked by it.
 */
export default function Preloader() {
  const shouldShow = useSyncExternalStore(noopSubscribe, readShouldShow, () => false);
  const [done, setDone] = useState(false);
  const visible = shouldShow && !done;

  useEffect(() => {
    if (!shouldShow) return;
    localStorage.setItem(STORAGE_KEY, "1");
    document.body.style.overflow = "hidden";
    const safety = setTimeout(() => setDone(true), SAFETY_MS);
    return () => clearTimeout(safety);
  }, [shouldShow]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[110] bg-[#060609]"
        >
          <video
            src="/videos/logo.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => setDone(true)}
            onError={() => setDone(true)}
            className="h-full w-full object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
