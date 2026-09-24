"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "portfolio_preloaded";
// Video is 4s; safety timeout ensures preloader never hangs if video stalls.
const SAFETY_MS = 4500;

// Decide once per page load: first visit in this tab/session and motion allowed.
let shouldShowCache: boolean | null = null;
const readShouldShow = () => {
  if (typeof window === "undefined") return false;
  if (shouldShowCache !== null) return shouldShowCache;
  try {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyLoaded = !!sessionStorage.getItem(STORAGE_KEY);
    shouldShowCache = !alreadyLoaded && !reduced;
  } catch (e) {
    shouldShowCache = false;
  }
  return shouldShowCache;
};
const noopSubscribe = () => () => {};

/**
 * First-visit bumper per session, same pattern as construction-landing-web's ArchitecturalPreloader:
 * full-screen logo video (signals converge into the "AH" monogram), then the curtain lifts.
 * Any video failure simply ends the preloader — the site must never be blocked by it.
 */
export default function Preloader() {
  const shouldShow = useSyncExternalStore(noopSubscribe, readShouldShow, () => false);
  const [done, setDone] = useState(false);
  const visible = shouldShow && !done;

  const handleDone = () => {
    setDone(true);
    document.body.style.overflow = "";
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("portfolio:preloader-done"));
    }
  };

  useEffect(() => {
    if (!shouldShow) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {}
    document.body.style.overflow = "hidden";
    const safety = setTimeout(handleDone, SAFETY_MS);
    return () => clearTimeout(safety);
  }, [shouldShow]);

  useEffect(() => {
    if (done) {
      document.body.style.overflow = "";
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("portfolio:preloader-done"));
      }
    }
  }, [done]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[110] bg-[#060609] cursor-pointer"
          onClick={handleDone}
          title="Click to skip"
        >
          {/* Landscape video (1920x1080) on desktop, portrait (1080x1920) on phones.
              ponytail: native <source media> picks the file, no JS. Browsers that ignore
              `media` on video sources take the first match, so desktop is listed first as the safe fallback. */}
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleDone}
            onError={handleDone}
            className="h-full w-full object-contain"
          >
            <source src="/videos/logo.mp4?v=2" media="(min-width: 769px)" type="video/mp4" />
            {/* With <source> children the error fires here, not on <video>; the last source failing means none can play. */}
            <source src="/videos/logo-mobile.mp4?v=2" type="video/mp4" onError={handleDone} />
          </video>
          <div className="pointer-events-none absolute bottom-6 right-6 flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-white/40 uppercase">
            <span>Skip</span>
            <span aria-hidden>→</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
