"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "portfolio_preloaded";
// Video is 8s; safety timeout ensures preloader never hangs if video stalls.
const SAFETY_MS = 8500;

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

  const [videoSrc, setVideoSrc] = useState("/videos/logo.mp4");

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
      setVideoSrc("/videos/logo-mobile.mp4");
    }
  }, []);

  useEffect(() => {
    if (!shouldShow) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {}
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
          className="fixed inset-0 z-[110] bg-[#060609] cursor-pointer"
          onClick={() => setDone(true)}
          title="Click to skip"
        >
          <video
            key={videoSrc}
            src={videoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => setDone(true)}
            onError={() => setDone(true)}
            className="h-full w-full object-contain"
          >
            <source src="/videos/logo-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
            <source src="/videos/logo.mp4" type="video/mp4" />
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
