"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { scroller } from "@/lib/v2/scroll";
import { ARCHIVE, HOME } from "@/lib/v2/routes";
import Cta from "./Cta";
import Menu from "./Menu";
import NavLink from "./NavLink";
import TransitionLink from "./TransitionLink";
import { CONTACTS, SECTIONS } from "./sections";

// The short list: open under the logo on the first screen of the home page, in the bar on the other pages
// (the full menu has every section).
const QUICK = SECTIONS.filter((s) => ["career", "work", "skills", "contact", "archive"].includes(s.section));

/**
 * Floating bar, as on the reference site: on the first screen of the home page the menu sits open under
 * the logo; past it the list folds into the Menu button, the bar hides while scrolling down and returns
 * on any upward scroll, and it takes its colours from the section under it.
 */
export default function Header() {
  const { lang, setLang } = useLanguage();
  const id = lang === "id";
  const pathname = usePathname();
  const onHome = pathname === HOME;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState<string>(pathname === ARCHIVE ? "archive" : "");
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

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

  const close = useCallback(() => {
    setOpen(false);
    toggle.current?.focus({ preventScroll: true });
  }, []);

  const where = SECTIONS.find((s) => s.section === active);

  const links = QUICK.map((s, i) => {
    const body = (
      <>
        <span>{s.no}</span>
        {s.label[lang]}
      </>
    );
    const style = { "--i": i } as CSSProperties;
    return s.href ? (
      <TransitionLink key={s.section} href={s.href} style={style} aria-current={pathname === s.href ? "page" : undefined}>
        {body}
      </TransitionLink>
    ) : (
      <NavLink key={s.section} section={s.section} style={style}>
        {body}
      </NavLink>
    );
  });

  return (
    <header
      className="v2-header"
      data-scrolled={scrolled || undefined}
      data-hidden={(hidden && !open) || undefined}
      data-dark={dark || open || undefined}
      data-home={onHome || undefined}
      data-open={open || undefined}
    >
      <div className="v2-header-bar">
        <NavLink section="home" className="v2-logo" aria-label="Andry Huang" onClick={() => setOpen(false)}>
          <span className="v2-logo-mark">AH</span>
          <span className="v2-logo-full">Andry Huang</span>
        </NavLink>

        {onHome ? (
          <p className="v2-where v2-mono" aria-live="polite">
            {where && !open && (
              <>
                <b>{where.no}</b> {where.label[lang]}
              </>
            )}
          </p>
        ) : (
          <nav className="v2-topnav" aria-label={id ? "Navigasi utama" : "Main navigation"}>
            {links}
          </nav>
        )}

        <div className="v2-header-tools">
          <div className="v2-lang" role="group" aria-label="Language">
            {(["en", "id"] as const).map((code) => (
              <button key={code} type="button" data-on={lang === code || undefined} aria-pressed={lang === code} onClick={() => setLang(code)}>
                {code}
              </button>
            ))}
          </div>
          <span className="v2-header-cta">
            <Cta href={CONTACTS.cv} external small variant="accent">
              CV
            </Cta>
          </span>
          <button
            ref={toggle}
            type="button"
            className="v2-menu-btn"
            aria-expanded={open}
            aria-controls="v2-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="v2-menu-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>{open ? (id ? "Tutup" : "Close") : "Menu"}</span>
          </button>
        </div>
      </div>

      {onHome && (
        <nav className="v2-quick" aria-label={id ? "Bagian halaman" : "Page sections"}>
          {links}
        </nav>
      )}

      <Menu open={open} active={active} onClose={close} />
    </header>
  );
}
