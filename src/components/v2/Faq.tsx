"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { faqItems } from "@/components/FAQ";
import { ScrollTrigger } from "@/lib/v2/motion";
import { reveal } from "@/lib/v2/reveal";
import { resizeScroll } from "@/lib/v2/scroll";
import { Words } from "./Words";

export default function Faq() {
  const { lang } = useLanguage();
  const id = lang === "id";
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => (root.current ? reveal(root.current) : undefined), [lang]);

  // The accordion changes the page height; once it settles the scroll engine measures again.
  useEffect(() => {
    const timer = setTimeout(() => {
      resizeScroll();
      ScrollTrigger.refresh();
    }, 650);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <section className="v2-faq" id="faq" data-section="light" ref={root}>
      <div className="v2-faq-grid">
        <div className="v2-faq-side">
          <p className="v2-eyebrow" data-r="up">
            <i />
            06 · FAQ
          </p>
          <Words as="h2" className="v2-h v2-h-side" r="words" text={id ? "Pertanyaan umum." : "Common questions."} />
          <p className="v2-lede v2-soft" data-r="up">
            {id ? "Keahlian, ketersediaan, dan proyek." : "Skills, availability and projects."}
          </p>
        </div>

        <div className="v2-qas">
          {faqItems.map((item, i) => {
            const on = open === i;
            return (
              // Closed answers stay in the DOM (collapsed in CSS) so the FAQPage JSON-LD matches visible content.
              <div key={item.questionEn} className="v2-qa" data-on={on || undefined} data-r="up">
                <h3>
                  <button type="button" className="v2-q" aria-expanded={on} aria-controls={`v2-faq-${i}`} onClick={() => setOpen(on ? null : i)}>
                    <span className="v2-mono v2-soft">{String(i + 1).padStart(2, "0")}</span>
                    <span className="v2-q-text">{id ? item.questionId : item.questionEn}</span>
                    <span className="v2-q-sign" aria-hidden="true" />
                  </button>
                </h3>
                <div className="v2-a" id={`v2-faq-${i}`}>
                  <div>
                    <p>{id ? item.answerId : item.answerEn}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
