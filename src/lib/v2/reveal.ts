import { gsap, reducedMotion } from "./motion";

const ONCE = { start: "top 88%", once: true } as const;

/**
 * Scroll reveals for everything under `root` marked with data-r="...":
 *   words  heading words rise out of their masks (needs <Words>)
 *   para   words light up as the paragraph crosses the viewport (needs <Words mask={false}>)
 *   up     fade and slide up once
 *   line   hairline draws itself in
 *   thumb  frame opens from an inset clip while the image settles
 *   count  number counts up (data-count, optional data-locale)
 * Returns a cleanup that restores every element. Does nothing under reduced motion.
 */
export function reveal(root: HTMLElement): () => void {
  if (reducedMotion()) return () => {};
  const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

  const ctx = gsap.context(() => {
    all('[data-r="words"]').forEach((el) => {
      gsap.from(el.querySelectorAll(".v2-wi"), {
        yPercent: 115,
        duration: 1.15,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: el, ...ONCE },
      });
    });

    all('[data-r="para"]').forEach((el) => {
      gsap.fromTo(
        el.querySelectorAll(".v2-w"),
        { opacity: 0.16 },
        { opacity: 1, ease: "none", stagger: 0.05, scrollTrigger: { trigger: el, start: "top 86%", end: "bottom 58%", scrub: true } },
      );
    });

    all('[data-r="up"]').forEach((el) => {
      gsap.from(el, {
        y: 40,
        autoAlpha: 0,
        duration: 1.1,
        ease: "expo.out",
        delay: Number(el.dataset.delay ?? 0),
        scrollTrigger: { trigger: el, ...ONCE },
      });
    });

    all('[data-r="line"]').forEach((el) => {
      gsap.from(el, { scaleX: 0, transformOrigin: "0 50%", duration: 1.3, ease: "power2.out", scrollTrigger: { trigger: el, ...ONCE } });
    });

    all('[data-r="thumb"]').forEach((el) => {
      const inner = el.querySelector("img, canvas, svg") ?? el.firstElementChild;
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      tl.from(el, { clipPath: "inset(18% 18% 18% 18% round 2rem)", duration: 1.8, ease: "expo.out" });
      if (inner) tl.from(inner, { scale: 1.35, duration: 1.8, ease: "expo.out" }, 0);
    });

    all('[data-r="count"]').forEach((el) => {
      const target = Number(el.dataset.count);
      const locale = el.dataset.locale ?? "en-US";
      const counter = { value: 0 };
      el.textContent = "0";
      gsap.to(counter, {
        value: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, ...ONCE },
        onUpdate: () => {
          el.textContent = Math.round(counter.value).toLocaleString(locale);
        },
      });
    });
  }, root);

  return () => ctx.revert();
}
