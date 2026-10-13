"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CAREER } from "@/components/Career";
import { gsap, reducedMotion } from "@/lib/v2/motion";
import { reveal } from "@/lib/v2/reveal";
import { Words } from "./Words";

const pad = (n: number) => String(n).padStart(2, "0");
const yearsOf = (from: readonly [number, number], to: readonly [number, number] | null) => `${from[0]}–${to ? String(to[0]).slice(2) : "now"}`;

/**
 * A pinned road beside the roles: the dashes run with the scroll, the chip shows the years of whichever
 * role is crossing the middle of the screen. Under 900px the road becomes a thin rail.
 */
export default function Career() {
  const { lang } = useLanguage();
  const id = lang === "id";
  const root = useRef<HTMLElement>(null);
  const dashes = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => (root.current ? reveal(root.current) : undefined), [lang]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>(".v2-role"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(items.indexOf(e.target as HTMLElement));
      },
      { rootMargin: "-50% 0px -50% 0px" }, // a 1px line across the middle of the viewport
    );
    items.forEach((item) => io.observe(item));

    let tween: gsap.core.Tween | undefined;
    if (!reducedMotion() && dashes.current) {
      tween = gsap.to(dashes.current, {
        backgroundPositionY: () => `-${el.offsetHeight}px`,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      });
    }
    return () => {
      io.disconnect();
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  const current = CAREER[active] ?? CAREER[0];

  return (
    <section className="v2-career" id="career" data-section="light" ref={root}>
      <div className="v2-career-grid">
        <div className="v2-career-side">
          <p className="v2-eyebrow" data-r="up">
            <i />
            01 · {id ? "Karier" : "Career"}
          </p>
          <Words as="h2" className="v2-h v2-h-side" r="words" text={id ? "Empat peran sejak 2019." : "Four roles since 2019."} />
          <p className="v2-lede v2-soft" data-r="up">
            {id ? "Dari dashboard pabrik kertas sampai SaaS rekrutmen yang saya dirikan." : "From pulp-mill dashboards to a recruitment SaaS I founded."}
          </p>
          <p className="v2-career-pos v2-mono" aria-hidden="true">
            {pad(active + 1)} / {pad(CAREER.length)}
          </p>
        </div>

        <div className="v2-road" aria-hidden="true">
          <div className="v2-road-dashes" ref={dashes} />
          <div className="v2-road-car">
            <span>{yearsOf(current.from, current.to)}</span>
          </div>
        </div>

        <ol className="v2-roles">
          {CAREER.map((c, i) => (
            <li key={c.company.en} className="v2-role" data-on={i === active || undefined}>
              <span className="v2-role-dot" aria-hidden="true" />
              <p className="v2-mono v2-soft">
                {c.dates[lang]} · {c.place[lang]}
              </p>
              <h3 className="v2-h v2-h-md">{c.company[lang]}</h3>
              <p className="v2-role-title">
                {c.role}
                <span className="v2-soft"> · {c.note[lang]}</span>
              </p>
              <ul className="v2-points">
                {c.points[lang].map((p, k) => (
                  <li key={k}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
