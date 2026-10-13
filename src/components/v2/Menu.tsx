"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Cta from "./Cta";
import NavLink from "./NavLink";
import TransitionLink from "./TransitionLink";
import { CONTACTS, SECTIONS } from "./sections";

interface MenuProps {
  open: boolean;
  active: string;
  onClose: () => void;
}

/** Full-screen menu: every section with a one-line preview, plus the ways to get in touch. */
export default function Menu({ open, active, onClose }: MenuProps) {
  const { lang, setLang } = useLanguage();
  const id = lang === "id";
  const panel = useRef<HTMLDivElement>(null);

  // Escape closes; Tab stays inside while open; focus lands on the first link.
  useEffect(() => {
    const el = panel.current;
    if (!open || !el) return;
    const focusables = () => Array.from(el.querySelectorAll<HTMLElement>("a, button"));
    focusables()[0]?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className="v2-menu v2-dark" id="v2-menu" ref={panel} role="dialog" aria-modal="true" aria-label="Menu" data-open={open || undefined} inert={!open}>
      <nav className="v2-menu-list" aria-label={id ? "Bagian halaman" : "Page sections"}>
        {SECTIONS.map((s, i) => {
          const body = (
            <>
              <span className="v2-mono v2-menu-no">{s.no}</span>
              <span className="v2-menu-label">{s.label[lang]}</span>
              <span className="v2-mono v2-menu-hint">{s.hint[lang]}</span>
              <span className="v2-menu-go" aria-hidden="true">
                <ArrowUpRight size={18} strokeWidth={1.75} />
              </span>
            </>
          );
          const props = { className: "v2-menu-item", style: { "--i": i } as CSSProperties, "data-on": active === s.section || undefined, onClick: onClose };
          return s.href ? (
            <TransitionLink key={s.section} href={s.href} {...props}>
              {body}
            </TransitionLink>
          ) : (
            <NavLink key={s.section} section={s.section} {...props}>
              {body}
            </NavLink>
          );
        })}
      </nav>

      <aside className="v2-menu-side">
        <p className="v2-eyebrow">
          <i />
          {id ? "Terbuka untuk peran remote & proyek" : "Open to remote roles & projects"}
        </p>
        <div className="v2-menu-contacts">
          <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
          <a href={CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={CONTACTS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={CONTACTS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
        <div className="v2-menu-tools">
          <div className="v2-lang" role="group" aria-label="Language">
            {(["en", "id"] as const).map((code) => (
              <button key={code} type="button" data-on={lang === code || undefined} aria-pressed={lang === code} onClick={() => setLang(code)}>
                {code}
              </button>
            ))}
          </div>
          <Cta href={CONTACTS.cv} external variant="accent">
            {id ? "Unduh CV" : "Download CV"}
          </Cta>
        </div>
        <p className="v2-mono v2-soft">Surabaya · UTC+7</p>
      </aside>
    </div>
  );
}
