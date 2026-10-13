"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { projects, type GroupKey, type Project } from "@/components/Projects";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/v2/motion";
import { reveal } from "@/lib/v2/reveal";
import { resizeScroll } from "@/lib/v2/scroll";
import { ARCHIVE } from "@/lib/v2/routes";
import Cta from "./Cta";
import TransitionLink from "./TransitionLink";
import { Words } from "./Words";

type Filter = "all" | GroupKey;

const FILTERS: { key: Filter; en: string; id: string }[] = [
  { key: "all", en: "All", id: "Semua" },
  { key: "freelance", en: "Client & personal", id: "Klien & pribadi" },
  { key: "anacle", en: "MRI · Anacle", id: "MRI · Anacle" },
  { key: "tool-mgmt", en: "Software house", id: "Software house" },
  { key: "tjiwi", en: "Tjiwi Kimia", id: "Tjiwi Kimia" },
];
const GROUP_LABEL = Object.fromEntries(FILTERS.map((f) => [f.key, f])) as Record<Filter, (typeof FILTERS)[number]>;

const QUALIV_ID = 504;
// Qualiv first, then the archive's featured builds, then everything else in archive order.
const rank = (p: Project) => (p.id === QUALIV_ID ? 0 : p.featured ? 1 : 2);
const ORDERED = [...projects].sort((a, b) => rank(a) - rank(b));

function Card({ p, lang }: { p: Project; lang: "en" | "id" }) {
  const [name, sub] = p.title.split(" • ");
  const image = p.images?.[0];
  const group = GROUP_LABEL[p.group][lang === "id" ? "id" : "en"];
  return (
    <li className="v2-card" data-big={p.featured || undefined}>
      <TransitionLink className="v2-card-link" href={`${ARCHIVE}?p=${p.id}`}>
        <div className="v2-card-media">
          {image ? (
            <Image src={image} alt="" fill sizes={p.featured ? "(max-width: 900px) 92vw, 46vw" : "(max-width: 900px) 92vw, 23vw"} />
          ) : (
            // No public screenshots (enterprise or internal work): the name set large instead.
            <div className="v2-card-cover" aria-hidden="true">
              <span className="v2-h">{name}</span>
            </div>
          )}
          <span className="v2-card-go" aria-hidden="true">
            <ArrowUpRight size={16} strokeWidth={1.75} />
          </span>
        </div>
        <div className="v2-card-body">
          <p className="v2-mono v2-soft">
            {group}
            {p.year ? ` · ${p.year}` : ""}
          </p>
          <h3 className="v2-card-title">
            {name}
            {sub && <span className="v2-soft"> · {sub}</span>}
          </h3>
          <p className="v2-card-desc">{lang === "id" ? (p.impact ?? p.description) : p.description}</p>
          <p className="v2-card-tags v2-mono">{p.tags.slice(0, 3).join(" / ")}</p>
        </div>
      </TransitionLink>
    </li>
  );
}

/** Every project from the archive as a filterable bento; each card opens its case study in the archive. */
export default function ProjectIndex() {
  const { lang } = useLanguage();
  const id = lang === "id";
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const prev = useRef<Filter | null>(null);

  const shown = useMemo(() => (filter === "all" ? ORDERED : ORDERED.filter((p) => p.group === filter)), [filter]);
  const count = (f: Filter) => (f === "all" ? projects.length : projects.filter((p) => p.group === f).length);

  useEffect(() => (root.current ? reveal(root.current) : undefined), [lang]);

  // Cards rise in batches as they enter; a filter change re-deals the visible set and remeasures the page.
  useEffect(() => {
    const cards = grid.current ? Array.from(grid.current.children) : [];
    let batch: ScrollTrigger[] = [];
    let tween: gsap.core.Tween | undefined;
    // Compare with the last filter rather than "first run": development runs every effect twice.
    const changed = prev.current !== null && prev.current !== filter;
    prev.current = filter;
    if (!reducedMotion()) {
      if (!changed) {
        gsap.set(cards, { autoAlpha: 0, y: 40 });
        batch = ScrollTrigger.batch(cards, {
          start: "top 92%",
          once: true,
          onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.06 }),
        });
      } else {
        tween = gsap.fromTo(cards, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.04 });
      }
    }
    const timer = setTimeout(() => {
      resizeScroll();
      ScrollTrigger.refresh();
    }, 120);
    return () => {
      clearTimeout(timer);
      batch.forEach((t) => t.kill());
      tween?.kill();
      gsap.set(cards, { clearProps: "opacity,visibility,transform" });
    };
  }, [filter]);

  return (
    <section className="v2-index" id="projects" data-section="light" ref={root}>
      <div className="v2-index-head">
        <div className="v2-index-title">
          <p className="v2-eyebrow" data-r="up">
            <i />
            03 · {id ? "Indeks" : "Index"}
          </p>
          <Words as="h2" className="v2-h v2-h-xl" r="words" text={id ? "Semua proyek." : "Every project."} />
          <p className="v2-lede v2-soft" data-r="up">
            {id
              ? `${projects.length} proyek dari empat babak: klien dan proyek pribadi, MRI Software, software house di Surabaya, dan Tjiwi Kimia.`
              : `${projects.length} projects from four chapters: client and personal work, MRI Software, a Surabaya software house and Tjiwi Kimia.`}
          </p>
        </div>
        <div className="v2-chips" role="group" aria-label={id ? "Saring proyek" : "Filter projects"} data-r="up">
          {FILTERS.map((f) => (
            <button key={f.key} type="button" className="v2-chip" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
              {id ? f.id : f.en}
              <span>{count(f.key)}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="v2-cards" ref={grid} aria-live="polite">
        {shown.map((p) => (
          <Card key={p.id} p={p} lang={lang} />
        ))}
      </ul>

      <div className="v2-index-end" data-r="up">
        <p className="v2-soft">
          {id ? "Arsip punya pencarian, filter stack, dan detail tiap proyek." : "The archive has search, stack filters and the full write-up for each project."}
        </p>
        <Cta href={ARCHIVE} variant="solid">
          {id ? "Buka arsip" : "Open the archive"}
        </Cta>
      </div>
    </section>
  );
}
