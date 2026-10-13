"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/v2/motion";
import { scroller, scrollToTarget } from "@/lib/v2/scroll";

/** Lenis smooth scrolling wired into GSAP's ticker, plus in-page anchor handling. Renders nothing. */
export default function Smooth() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reducedMotion()) {
      const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenis = instance;
      instance.on("scroll", ScrollTrigger.update);
      tick = (time) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      scroller.lenis = instance;
      if (document.documentElement.classList.contains("v2-loading")) instance.stop();
    }

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!link || !hash || hash === "#" || !document.querySelector(hash)) return;
      event.preventDefault();
      scrollToTarget(hash);
    };
    document.addEventListener("click", onClick);

    // Fonts and late images move section tops; ScrollTrigger needs one more measurement.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      scroller.lenis = null;
    };
  }, []);

  return null;
}
