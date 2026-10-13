import type Lenis from "lenis";

/** The one Lenis instance, set by <Smooth>. Null under reduced motion, where native scrolling is used. */
export const scroller: { lenis: Lenis | null } = { lenis: null };

/** Scroll to a y offset or to an element given as "#id". `immediate` jumps instead of gliding. */
export function scrollToTarget(target: string | number, offset = 0, immediate = false): void {
  const el = typeof target === "string" ? document.getElementById(target.replace(/^#/, "")) : null;
  if (typeof target === "string" && !el) return;
  const { lenis } = scroller;
  if (lenis) {
    // force: menu links scroll while the menu still has the engine stopped.
    lenis.scrollTo(el ?? (target as number), { offset, immediate, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4), force: true });
    return;
  }
  const top = el ? el.getBoundingClientRect().top + window.scrollY + offset : (target as number);
  window.scrollTo({ top, behavior: "instant" });
}

/** Tell the scroll engine the document height changed (accordions, late images). */
export function resizeScroll(): void {
  scroller.lenis?.resize();
}
