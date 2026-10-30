"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/v2/motion";
import { useIntroReady } from "@/lib/v2/intro";
import { scroller, scrollToTarget } from "@/lib/v2/scroll";

/** Lenis smooth scrolling wired into GSAP's ticker, plus in-page anchor handling. Renders nothing. */
export default function Smooth() {
  const ready = useIntroReady();
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      scroller.lenis?.resize();
      scroller.lenis?.scrollTo(0, { immediate: true, force: true });
    }
  }, [pathname]);

  useEffect(() => {
    // Next.js keeps the previous page's offset when the new page starts with a fixed element (the loader),
    // so every v2 page starts at the top; a #hash is honoured once the loader is out of the way (below).
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reducedMotion()) {
      // allowNestedScroll: the archive dialog and the chat panel scroll on their own.
      const instance = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      });
      lenis = instance;
      instance.on("scroll", ScrollTrigger.update);
      tick = (time) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      scroller.lenis = instance;
      if (document.documentElement.classList.contains("v2-loading")) instance.stop();
    }

    // Anything that locks the page with body overflow (the archive dialog) also pauses the scroll engine.
    const lock = new MutationObserver(() => {
      if (!lenis || document.documentElement.classList.contains("v2-menu-open") || document.documentElement.classList.contains("v2-loading")) return;
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    });
    lock.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!link || !hash || hash === "#" || !document.getElementById(hash.slice(1))) return;
      event.preventDefault();
      scrollToTarget(hash);
    };
    document.addEventListener("click", onClick);

    // Fonts and late images move section tops; ScrollTrigger needs one more measurement.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      lock.disconnect();
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      scroller.lenis = null;
    };
  }, []);

  useEffect(() => {
    if (ready && window.location.hash.length > 1) scrollToTarget(window.location.hash, 0, true);
  }, [ready]);

  return null;
}
