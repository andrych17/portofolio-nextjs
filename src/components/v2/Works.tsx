"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Shot } from "@/components/Works";
import { projects } from "@/components/Projects";
import { gsap, ScrollTrigger } from "@/lib/v2/motion";
import { reveal } from "@/lib/v2/reveal";
import { ARCHIVE } from "@/lib/v2/routes";
import { PROJECT_SLUGS } from "@/data/projects";
import Cta from "./Cta";
import TransitionLink from "./TransitionLink";
import { Words } from "./Words";
import { FEATURED, type Featured } from "./featured";

const pad = (n: number) => String(n).padStart(2, "0");

function Window({ shot, name, kind }: { shot: Shot; name: string; kind: "main" | "sub" | "extra" }) {
  const view = { "--zoom": shot.zoom ?? 1, "--origin": shot.origin ?? "0 0" } as CSSProperties;
  return (
    <figure className={`v2-win v2-win-${kind}`}>
      <figcaption className="v2-win-bar v2-mono" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{shot.label}</span>
      </figcaption>
      <div className="v2-win-view" style={view}>
        <Image src={shot.src} alt={`${name}: ${shot.label}`} fill sizes={kind === "main" ? "(max-width: 900px) 80vw, 34vw" : "(max-width: 900px) 50vw, 18vw"} />
      </div>
    </figure>
  );
}

function Media({ w, lang }: { w: Featured; lang: "en" | "id" }) {
  if (w.shots) {
    return (
      <div className={w.extra ? "v2-shots v2-shots-lead" : "v2-shots"}>
        <div className="v2-bezel">
          <Window shot={w.shots.main} name={w.name} kind="main" />
        </div>
        {w.shots.sub && (
          <div className="v2-bezel v2-shots-sub">
            <Window shot={w.shots.sub} name={w.name} kind="sub" />
          </div>
        )}
        {w.extra && (
          <div className="v2-bezel v2-shots-extra">
            <Window shot={w.extra} name={w.name} kind="extra" />
          </div>
        )}
      </div>
    );
  }
  if (!w.flow) return null;
  // Enterprise work has no public screenshots, so it gets a typographic flow instead of a fake one.
  return (
    <div className="v2-bezel v2-flow-wrap" aria-hidden="true">
      <div className="v2-flow">
        <span className="v2-flow-big v2-h">{w.flow.big}</span>
        <ol>
          {w.flow.steps.map((s, i) => (
            <li key={s.en} style={{ "--i": i } as CSSProperties}>
              <span className="v2-mono">{pad(i + 1)}</span>
              {s[lang]}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/**
 * Desktop: the section is as tall as the track is long, and a sticky stage slides the track sideways while
 * you scroll. Under 900px, or with reduced motion, the plates simply stack (v2-sections.css).
 */
export default function Works() {
  const { lang } = useLanguage();
  const id = lang === "id";
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const rest = projects.length - FEATURED.length;

  useEffect(() => (root.current ? reveal(root.current) : undefined), [lang]);

  useEffect(() => {
    const section = root.current;
    const rail = track.current;
    if (!section || !rail) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
      const plates = Array.from(rail.querySelectorAll<HTMLElement>(".v2-plate"));
      let travel = 0;
      // Runs before every measurement pass, so the section is always as tall as the track is long.
      const size = () => {
        travel = Math.max(0, rail.scrollWidth - window.innerWidth);
        section.style.height = `${window.innerHeight + travel}px`;
      };
      size();
      ScrollTrigger.addEventListener("refreshInit", size);

      const update = (progress: number) => {
        if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
        if (count.current) count.current.textContent = `${pad(Math.min(plates.length, Math.floor(progress * plates.length) + 1))} / ${pad(plates.length)}`;
      };
      const tween = gsap.to(rail, {
        x: () => -travel,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.6, invalidateOnRefresh: true, onUpdate: (self) => update(self.progress) },
      });
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", size);
        tween.scrollTrigger?.kill();
        tween.kill();
        section.style.height = "";
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="v2-works" id="work" data-section="dark" ref={root}>
      <div className="v2-works-stick">
        <div className="v2-works-track" ref={track}>
          <div className="v2-works-lead">
            <p className="v2-eyebrow" data-r="up">
              <i />
              02 · {id ? "Karya" : "Works"}
            </p>
            <Words as="h2" className="v2-h v2-h-side" r="words" text={id ? "Karya pilihan." : "Selected works."} />
            <p className="v2-lede v2-soft" data-r="up">
              {id
                ? `${FEATURED.length} karya unggulan, dimulai dari Qualiv yang saya dirikan. Seluruh ${projects.length} proyek lengkapnya ada di portofolio.`
                : `${FEATURED.length} featured builds, starting with Qualiv, the SaaS I founded. All ${projects.length} projects are in the full portfolio.`}
            </p>
            <p className="v2-mono v2-soft v2-works-hint" aria-hidden="true">
              {id ? "Gulir untuk menjelajah" : "Keep scrolling"} →
            </p>
          </div>

          {FEATURED.map((w, i) => (
            <article className="v2-plate" data-lead={w.lead || undefined} key={w.name} aria-labelledby={`v2-work-${i}`}>
              <div className="v2-plate-media">
                <Media w={w} lang={lang} />
              </div>
              <div className="v2-plate-body">
                <p className="v2-plate-no v2-h" aria-hidden="true">
                  {pad(i + 1)}
                </p>
                {w.lead && (
                  <p className="v2-eyebrow">
                    <i />
                    {id ? "Founder · produk sendiri" : "Founder · my own product"}
                  </p>
                )}
                <h3 className="v2-h v2-h-lg" id={`v2-work-${i}`}>
                  {w.name}
                </h3>
                <p className="v2-mono v2-soft">
                  {w.role[lang]}
                  {w.year ? ` · ${w.year}` : ""}
                </p>
                <p className="v2-plate-line">{w.line[lang]}</p>
                <ul className="v2-points">
                  {w.parts[lang].map((p, k) => (
                    <li key={k}>{p}</li>
                  ))}
                </ul>
                <p className="v2-mono v2-soft v2-plate-stack">{w.stack.join(" / ")}</p>
                <div className="v2-plate-links">
                  <TransitionLink
                    className="v2-visit v2-visit-solid"
                    href={PROJECT_SLUGS[w.caseId] ? `/works/${PROJECT_SLUGS[w.caseId]}` : `${ARCHIVE}?p=${w.caseId}`}
                  >
                    {id ? "Studi kasus" : "Case study"}
                    <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                  </TransitionLink>
                  {w.url && (
                    <a className="v2-visit" href={w.url} target="_blank" rel="noopener">
                      {new URL(w.url).host.replace(/^www\./, "")}
                      <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          <div className="v2-works-end">
            <Words as="h3" className="v2-h v2-h-lg" r="words" text={id ? `Dan ${rest} proyek lainnya.` : `And ${rest} more projects.`} />
            <p className="v2-lede v2-soft">
              {id ? "Jelajahi seluruh proyek lengkap dengan filter teknologi dan studi kasusnya." : "Explore every project with tech stack filters and full case studies."}
            </p>
            <div className="v2-works-end-ctas">
              <Cta href={ARCHIVE} variant="accent">
                {id ? "Lihat Semua Proyek" : "View All Projects"}
              </Cta>
            </div>
          </div>
        </div>

        <div className="v2-works-ui" aria-hidden="true">
          <span className="v2-mono v2-soft" ref={count}>
            01 / {pad(FEATURED.length)}
          </span>
          <span className="v2-works-rail">
            <i ref={bar} />
          </span>
        </div>
      </div>
    </section>
  );
}
