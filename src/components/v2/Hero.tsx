"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { getYearsOfExperience } from "@/utils/experience";
import { gsap, reducedMotion } from "@/lib/v2/motion";
import { useIntroReady } from "@/lib/v2/intro";
import { TEMPLATES } from "@/lib/v2/routes";
import Cta from "./Cta";
import Pipeline from "./Pipeline";
import { Words } from "./Words";

export default function Hero() {
  const { lang } = useLanguage();
  const id = lang === "id";
  const years = getYearsOfExperience();
  const ready = useIntroReady();
  const root = useRef<HTMLElement>(null);
  const entrance = useRef<gsap.core.Timeline | null>(null);

  // Build the entrance (and the scroll-out) for the current language; it plays once the loader is done.
  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const q = (sel: string) => el.querySelectorAll(sel);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.from(q(".v2-hero-viz"), { xPercent: 6, autoAlpha: 0, duration: 1.6 }, 0)
        .from(q(".v2-pe"), { strokeDashoffset: 1, duration: 1.4, stagger: 0.12, ease: "power2.inOut" }, 0.5)
        .from(q(".v2-pn"), { autoAlpha: 0, y: 14, duration: 0.9, stagger: 0.09, ease: "power3.out" }, 0.4)
        .from(q(".v2-log"), { autoAlpha: 0, y: 18, duration: 1 }, 1.3)
        .from(q(".v2-hero-eyebrow"), { autoAlpha: 0, y: 14, duration: 1 }, 0.15)
        .from(q(".v2-hero h1 .v2-wi"), { yPercent: 115, duration: 1.2, stagger: 0.08 }, 0.25)
        .from(q(".v2-hero-desc"), { autoAlpha: 0, y: 22, duration: 1.1 }, 0.7)
        .from(q(".v2-hero-ctas > *"), { autoAlpha: 0, y: 18, duration: 1, stagger: 0.1 }, 0.85)
        .from(q(".v2-hero-meta > *"), { autoAlpha: 0, duration: 1, stagger: 0.1 }, 1.1);
      entrance.current = tl;

      // The diagram dims and drifts back as the hero scrolls away.
      if (window.innerWidth > 767) {
        gsap.to(q(".v2-hero-viz-out"), {
          autoAlpha: 0,
          filter: "brightness(0.25)",
          scale: 0.96,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "+=100%", scrub: true },
        });
        gsap.to(q(".v2-hero-copy"), { yPercent: -14, autoAlpha: 0.2, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "+=90%", scrub: true } });
      }
    }, el);

    return () => {
      ctx.revert();
      entrance.current = null;
    };
  }, [lang]);

  useEffect(() => {
    if (ready) entrance.current?.play();
  }, [ready, lang]);

  return (
    <section className="v2-hero" id="home" data-section="dark" data-ready={ready || undefined} ref={root}>
      <div className="v2-hero-stick">
        <div className="v2-hero-grid" aria-hidden="true" />
        <div className="v2-hero-viz-out">
          <div className="v2-hero-viz">
            <Pipeline />
          </div>
        </div>

        <div className="v2-hero-copy">
          <p className="v2-eyebrow v2-hero-eyebrow">Andry Huang · Senior Full-Stack &amp; AI Engineer</p>
          <Words as="h1" className="v2-h v2-h-hero" text={id ? "Sistem yang menjalankan bisnis." : "Systems a business runs on."} />
          <p className="v2-hero-desc">
            {id
              ? `${years}+ tahun membangun SaaS enterprise, ERP, dan sistem LLM. Dikerjakan dari Surabaya untuk tim di Singapura.`
              : `${years}+ years of enterprise SaaS, ERPs and LLM systems. Built from Surabaya, shipped for teams in Singapore.`}
          </p>
          <div className="v2-hero-ctas">
            <Cta href="#work" variant="solid">
              {id ? "Lihat karya" : "See the work"}
            </Cta>
            <Cta href={TEMPLATES} variant="accent">
              {id ? "Sample Template" : "Sample Templates"}
            </Cta>
            <Cta href="/Andry_Huang_CV.pdf" external variant="ghost">
              {id ? "Unduh CV" : "Download CV"}
            </Cta>
          </div>
        </div>

        <div className="v2-hero-meta v2-mono">
          <span>
            <i className="v2-live" aria-hidden="true" />
            {id ? "Terbuka untuk peran remote & proyek" : "Open to remote roles & projects"}
          </span>
          <span className="v2-hero-coords">Surabaya · UTC+7</span>
        </div>
      </div>
    </section>
  );
}
