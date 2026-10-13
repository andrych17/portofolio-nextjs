"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scroller } from "@/lib/v2/scroll";
import Cta from "./Cta";

const LINKS = [
  { id: "career", en: "Career", idn: "Karier" },
  { id: "work", en: "Works", idn: "Karya" },
  { id: "skills", en: "Stack", idn: "Stack" },
  { id: "contact", en: "Contact", idn: "Kontak" },
] as const;

/**
 * Floating bar. Three states, as on the reference site: it shrinks after the first screen, hides while
 * scrolling down and returns on any upward scroll, and takes its colours from the section under it.
 */
export default function Header() {
  const { lang, setLang } = useLanguage();
  const id = lang === "id";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 80);
      if (y <= 240 || y < last - 2) setHidden(false);
      else if (y > last + 2) setHidden(true);
      last = y;
      const probe = 44; // header centre, px from the top
      const under = Array.from(document.querySelectorAll<HTMLElement>("[data-section]")).find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= probe && r.bottom > probe;
      });
      setDark(under?.dataset.section !== "light");
      setActive(under?.id ?? "");
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("v2-menu-open", open);
    if (open) scroller.lenis?.stop();
    else scroller.lenis?.start();
    return () => {
      document.documentElement.classList.remove("v2-menu-open");
    };
  }, [open]);

  return (
    <header className="v2-header" data-scrolled={scrolled || undefined} data-hidden={(hidden && !open) || undefined} data-dark={dark || undefined}>
      <div className="v2-header-bar">
        <a href="#home" className="v2-logo" aria-label="Andry Huang" onClick={() => setOpen(false)}>
          <span className="v2-logo-mark">AH</span>
          <span className="v2-logo-full">Andry Huang</span>
        </a>

        <nav className="v2-nav" aria-label={id ? "Bagian halaman" : "Page sections"}>
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} data-on={active === l.id || undefined}>
              {id ? l.idn : l.en}
            </a>
          ))}
        </nav>

        <div className="v2-header-tools">
          <div className="v2-lang" role="group" aria-label="Language">
            {(["en", "id"] as const).map((code) => (
              <button key={code} type="button" data-on={lang === code || undefined} aria-pressed={lang === code} onClick={() => setLang(code)}>
                {code}
              </button>
            ))}
          </div>
          <span className="v2-header-cta">
            <Cta href="/Andry_Huang_CV.pdf" external small variant="accent">
              CV
            </Cta>
          </span>
          <button type="button" className="v2-burger" aria-expanded={open} aria-controls="v2-menu" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div className="v2-menu" id="v2-menu" data-open={open || undefined}>
        <nav aria-label="Menu">
          {LINKS.map((l, i) => (
            <a key={l.id} href={`#${l.id}`} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)}>
              <span className="v2-mono">{String(i + 1).padStart(2, "0")}</span>
              {id ? l.idn : l.en}
            </a>
          ))}
        </nav>
        <Cta href="/Andry_Huang_CV.pdf" external variant="accent">
          {id ? "Unduh CV" : "Download CV"}
        </Cta>
      </div>
    </header>
  );
}
