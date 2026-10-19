"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Title } from "./ui/Title";

export {
  type Shot,
  type Work,
  WORKS,
} from "@/data/works";
import {
  type Shot,
  type Work,
  WORKS,
} from "@/data/works";

function Window({ shot, name, kind }: { shot: Shot; name: string; kind: "main" | "sub" }) {
  const view = { "--zoom": shot.zoom ?? 1, "--origin": shot.origin ?? "0 0" } as CSSProperties;
  return (
    <figure className={`ah-win ah-win-${kind}`}>
      <div className="ah-win-frame">
        <figcaption className="ah-win-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="ah-mono">{shot.label}</span>
        </figcaption>
        <div className="ah-win-view" style={view}>
          <Image
            src={shot.src}
            alt={`${name}: ${shot.label}`}
            fill
            sizes={kind === "main" ? "(max-width: 900px) 80vw, 36vw" : "(max-width: 900px) 50vw, 24vw"}
          />
        </div>
      </div>
    </figure>
  );
}

function Preview({ w, lang }: { w: Work; lang: "en" | "id" }) {
  if (w.shots) {
    return (
      <div className="ah-shots">
        <Window shot={w.shots.main} name={w.name} kind="main" />
        {w.shots.sub && <Window shot={w.shots.sub} name={w.name} kind="sub" />}
      </div>
    );
  }
  if (!w.flow) return null;
  return (
    <div className="ah-shot-wrap">
      <div className="ah-flow" aria-hidden="true">
        <span className="ah-flow-big">{w.flow.big}</span>
        <ol>
          {w.flow.steps.map((s, i) => (
            <li key={s.en} style={{ "--i": i } as CSSProperties}>
              <span className="ah-mono">{String(i + 1).padStart(2, "0")}</span>
              {s[lang]}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function Works() {
  const { lang } = useLanguage();
  const [sel, setSel] = useState(0);
  const id = lang === "id";

  return (
    <section id="work" data-stage="work" className="ah-sec ah-works-sec">
      <Title no="02" meta={id ? "Enterprise lebih dulu" : "Enterprise first"}>
        {id ? "Karya" : "Works"}
      </Title>

      <div className="ah-works">
        {WORKS.map((w, i) => {
          const on = i === sel;
          const bodyId = `work-${i}`;
          return (
            <article key={w.name} className="ah-work" data-on={on || undefined}>
              <h3>
                <button
                  type="button"
                  className="ah-work-row"
                  aria-expanded={on}
                  aria-controls={bodyId}
                  onClick={() => setSel(i)}
                  onFocus={() => setSel(i)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setSel(i)}
                >
                  <span className="ah-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ah-work-name">{w.name}</span>
                  <span className="ah-mono ah-work-role">{w.role[lang]}</span>
                  <span className="ah-mono ah-work-year">{w.year ?? (w.url ? "Live" : "")}</span>
                </button>
              </h3>
              <div className="ah-work-body" id={bodyId}>
                <div className="ah-work-inner">
                  <Preview w={w} lang={lang} />
                  <p className="ah-work-line">{w.line[lang]}</p>
                  <ul className="ah-points">
                    {w.parts[lang].map((p, k) => (
                      <li key={k} style={{ "--i": k } as CSSProperties}>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="ah-mono ah-stack">{w.stack.join(" / ")}</p>
                  {w.url && (
                    <a className="ah-visit" href={w.url} target="_blank" rel="noopener">
                      {new URL(w.url).host.replace(/^www\./, "")}
                      <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <Link href="/portofolio" className="ah-more">
        <span>{id ? "Semua proyek di portofolio (20+)" : "Every project in the portfolio (20+)"}</span>
        <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
      </Link>
    </section>
  );
}
