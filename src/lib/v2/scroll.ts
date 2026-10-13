import type Lenis from "lenis";

/** The one Lenis instance, set by <Smooth>. Null under reduced motion, where native scrolling is used. */
export const scroller: { lenis: Lenis | null } = { lenis: null };

export function scrollToTarget(target: string | number, offset = 0): void {
  const { lenis } = scroller;
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target });
  else document.querySelector(target)?.scrollIntoView();
}

/** Tell the scroll engine the document height changed (accordions, late images). */
export function resizeScroll(): void {
  scroller.lenis?.resize();
}
