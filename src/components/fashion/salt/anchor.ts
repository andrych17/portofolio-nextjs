"use client";

import { useLenis } from "lenis/react";
import { useCallback, type MouseEvent } from "react";

/** Smooth in-page anchor jumps that cooperate with the global Lenis scroller and the mobile menu. */
export function useAnchorScroll() {
  const lenis = useLenis();
  return useCallback(
    (e: MouseEvent<HTMLElement>, href: string, delay = 0) => {
      if (!href.startsWith("#")) return;
      const el = document.querySelector<HTMLElement>(href);
      if (!el) return;
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const run = () => {
        if (lenis && !reduce) lenis.scrollTo(el, { offset: -64, duration: 1.7 });
        else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        history.replaceState(null, "", href);
      };
      if (delay) window.setTimeout(run, delay);
      else run();
    },
    [lenis],
  );
}
