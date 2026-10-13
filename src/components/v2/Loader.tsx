"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap, CustomEase, reducedMotion } from "@/lib/v2/motion";
import { intro } from "@/lib/v2/intro";
import { introSeen, markIntroSeen } from "@/lib/v2/seen";
import { scroller } from "@/lib/v2/scroll";

const BOOT = [".NET Core 8", "Next.js 16 · React 19", "NestJS · BullMQ · Redis", "PostgreSQL · pgvector", "MCP servers · agents"];
const never = () => () => {};

/**
 * First paint is a black cover with a terminal boot log and a 00 to 100 counter; it ends with three
 * concentric circles opening onto the page (the box-shadow of a growing circle is the cover).
 * It plays once per browser: afterwards the flag in localStorage skips it (the layout hides the cover
 * before first paint, see MainLayout) and the hero enters straight away.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  // false on the server, so hydration matches; true on a client render of a repeat visit (route changes).
  const seen = useSyncExternalStore(never, introSeen, () => false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;

    if (reducedMotion() || introSeen()) {
      el.style.display = "none";
      intro.set(true);
      return () => intro.set(false);
    }

    html.classList.add("v2-loading");
    scroller.lenis?.stop();

    const q = (sel: string) => Array.from(el.querySelectorAll<HTMLElement>(sel));
    const counter = el.querySelector<HTMLElement>(".v2-loader-big b");
    const bar = el.querySelector<HTMLElement>(".v2-loader-bar i");
    const fake = CustomEase.create("v2FakeLoad", "M0,0 L0.1,0.3 L0.35,0.4 L0.45,0.65 L0.6,0.7 L0.8,0.8 L0.85,0.95 L1,1");
    const load = { p: 0 };

    const ctx = gsap.context(() => {
      gsap.set(q(".v2-loader-top, .v2-loader-big"), { autoAlpha: 0 });
      gsap.set(q(".v2-term-line"), { autoAlpha: 0, x: -14 });
      gsap.set(q(".v2-iris"), { width: 0, height: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          markIntroSeen();
          html.classList.remove("v2-loading");
          scroller.lenis?.start();
          scroller.lenis?.resize();
          gsap.set(el, { display: "none" });
        },
      });
      const span = 2.8;
      const lines = q(".v2-term-line");

      tl.to(q(".v2-loader-top, .v2-loader-big"), { autoAlpha: 1, duration: 0.6, ease: "power3.out" }, 0)
        .to(lines, { autoAlpha: 1, x: 0, duration: 0.35, ease: "power3.out", stagger: span / (lines.length + 1) }, 0.25)
        .to(
          load,
          {
            p: 1,
            duration: span,
            ease: fake,
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(load.p * 100)).padStart(2, "0");
              if (bar) bar.style.transform = `scaleX(${load.p})`;
            },
          },
          0.2,
        );

      const exit = span + 0.4;
      tl.to(lines, { autoAlpha: 0, x: 14, duration: 0.35, ease: "power3.in", stagger: 0.04 }, exit)
        .to(q(".v2-loader-top, .v2-loader-big, .v2-loader-bar"), { autoAlpha: 0, duration: 0.4, ease: "power3.inOut" }, exit + 0.15)
        .set(el.querySelector(".v2-loader-cover"), { backgroundColor: "transparent" }, exit + 0.55)
        .call(() => intro.set(true), undefined, exit + 0.75)
        .to(q(".v2-iris"), { width: "135vmax", height: "135vmax", duration: 0.9, ease: "circ.inOut", stagger: { each: 0.16, from: "start" } }, exit + 0.6);
    }, el);

    return () => {
      ctx.revert();
      html.classList.remove("v2-loading");
      intro.set(false);
    };
  }, []);

  return (
    <div className="v2-loader" ref={root} aria-hidden="true" hidden={seen}>
      <div className="v2-loader-cover" />
      <div className="v2-loader-top">
        <span className="v2-mono">Andry Huang</span>
        <span className="v2-mono">Portfolio</span>
      </div>
      <div className="v2-loader-term v2-term">
        <p className="v2-term-line">
          <span className="p">$</span> boot andry-huang --env=prod
        </p>
        {BOOT.map((b) => (
          <p className="v2-term-line" key={b}>
            <span className="ok">[ ok ]</span> {b}
          </p>
        ))}
        <p className="v2-term-line">
          <span className="p">$</span> serve <span className="v2-caret" />
        </p>
      </div>
      <p className="v2-loader-big v2-h">
        <b>00</b>
        <small>%</small>
      </p>
      <div className="v2-loader-bar">
        <i />
      </div>
      <div className="v2-iris i1" />
      <div className="v2-iris i2" />
      <div className="v2-iris i3" />
    </div>
  );
}
