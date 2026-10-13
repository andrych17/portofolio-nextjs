"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { GROUPS, MAX_YEARS, TRACK } from "@/components/Skills";
import { reveal } from "@/lib/v2/reveal";
import { Words } from "./Words";

export default function Stack() {
  const { lang } = useLanguage();
  const id = lang === "id";
  const root = useRef<HTMLElement>(null);

  useEffect(() => (root.current ? reveal(root.current) : undefined), [lang]);

  return (
    <section className="v2-stack" id="skills" data-section="light" ref={root}>
      <div className="v2-stack-grid">
        <div className="v2-stack-side">
          <p className="v2-eyebrow" data-r="up">
            <i />
            03 · Stack
          </p>
          <Words as="h2" className="v2-h v2-h-side" r="words" text={id ? "Dipakai di production sejak 2019." : "In production since 2019."} />
          <p className="v2-lede v2-soft" data-r="up">
            {id ? "Lama kerja langsung dengan tiap teknologi, lalu daftar lengkapnya." : "Years of hands-on work with each technology, then the full list."}
          </p>
        </div>

        <div className="v2-stack-main">
          <ol className="v2-years" aria-label={id ? "Lama pengalaman per teknologi" : "Years with each technology"}>
            {TRACK.map((t) => (
              <li key={t.name} data-r="up">
                <span className="v2-years-name">{t.name}</span>
                <span className="v2-years-bar" aria-hidden="true">
                  <i data-r="line" style={{ width: `${(t.years / MAX_YEARS) * 100}%` }} />
                </span>
                <span className="v2-mono v2-soft v2-years-n">{id ? `${t.years}+ thn` : `${t.years}+ yrs`}</span>
              </li>
            ))}
          </ol>

          <div className="v2-groups">
            {GROUPS.map((g) => (
              <div className="v2-group" key={g.en} data-r="up">
                <h3 className="v2-mono">{g[lang]}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
