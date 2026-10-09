"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { wib } from "@/utils/timeline";
import { useActiveSection, type SectionId } from "./stage/active";

const ITEMS: { key: SectionId | "archive"; en: string; id: string; href: string }[] = [
  { key: "career", en: "Career", id: "Karier", href: "/#career" },
  { key: "work", en: "Works", id: "Karya", href: "/#work" },
  { key: "skills", en: "Stack", id: "Stack", href: "/#skills" },
  { key: "certifications", en: "Certified", id: "Sertifikasi", href: "/#certifications" },
  { key: "contact", en: "Contact", id: "Kontak", href: "/#contact" },
  { key: "archive", en: "Archive", id: "Arsip", href: "/portofolio" },
];

const WHATSAPP =
  "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you";

const everyFewSeconds = (cb: () => void) => {
  const t = window.setInterval(cb, 10_000);
  return () => window.clearInterval(t);
};

// Empty on the server so the first client render can't mismatch on the time.
function useSurabayaClock(): string {
  return useSyncExternalStore(everyFewSeconds, () => wib(new Date()), () => "");
}

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const pathname = usePathname();
  const active = useActiveSection();
  const clock = useSurabayaClock();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const burger = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLAnchorElement>(null);
  const id = lang === "id";
  const onHome = pathname === "/";

  const current = (key: (typeof ITEMS)[number]["key"]) => (key === "archive" ? pathname === "/portofolio" : onHome && key === active);

  useEffect(() => {
    if (!open) return;
    const toggle = burger.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const selected = hover ?? ITEMS.findIndex((it) => current(it.key));

  return (
    <>
      {/* On the home hero the big menu is the navigation, so the top links wait until you scroll past it. */}
      <header className="ah-nav" data-hero={(onHome && active === "home" && !open) || undefined}>
        <Link href="/" className="ah-brand" onClick={() => setOpen(false)}>
          <span className="ah-brand-name">Andry Huang</span>
          <span className="ah-mono">Full-stack · AI systems</span>
        </Link>

        <nav className="ah-nav-links" aria-label={id ? "Navigasi utama" : "Main"}>
          {ITEMS.map((it) => {
            const on = current(it.key);
            return (
              <Link
                key={it.key}
                href={it.href}
                className="ah-nav-link"
                data-on={on || undefined}
                aria-current={on ? (it.key === "archive" ? "page" : "location") : undefined}
              >
                <span>{id ? it.id : it.en}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ah-nav-right">
          <span className="ah-mono ah-clock" aria-label={clock ? `Surabaya ${clock} WIB` : undefined}>
            {clock && (
              <>
                Surabaya <b>{clock}</b> WIB
              </>
            )}
          </span>
          <button
            type="button"
            className="ah-lang"
            onClick={toggleLang}
            aria-label={id ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
          >
            <span data-on={id || undefined}>ID</span>
            <span data-on={!id || undefined}>EN</span>
          </button>
          <a className="ah-nav-cv" href="/Andry_Huang_CV.pdf" target="_blank" rel="noopener noreferrer">
            CV
          </a>
          <button
            ref={burger}
            type="button"
            className="ah-burger"
            aria-expanded={open}
            aria-controls="ah-overlay"
            aria-label={open ? (id ? "Tutup menu" : "Close menu") : id ? "Buka menu" : "Open menu"}
            onClick={() => {
              setHover(null);
              setOpen((o) => !o);
            }}
          >
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {open && (
        <div id="ah-overlay" className="ah-overlay" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="ah-overlay-band" aria-hidden="true" />
          <nav className="ah-menu ah-overlay-menu" aria-label={id ? "Navigasi utama" : "Main"}>
            <ul>
              {ITEMS.map((it, i) => (
                <li key={it.key} style={{ "--i": i } as CSSProperties}>
                  <Link
                    ref={i === 0 ? first : undefined}
                    href={it.href}
                    className="ah-item"
                    data-on={i === selected || undefined}
                    onPointerEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onClick={() => setOpen(false)}
                  >
                    <span className="ah-slab ah-slab-back" aria-hidden="true" />
                    <span className="ah-slab ah-slab-front" aria-hidden="true" />
                    <span className="ah-cursor" aria-hidden="true" />
                    <span className="ah-label">{id ? it.id : it.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ah-overlay-foot">
            <a href="mailto:andrych17@gmail.com" className="ah-mono">
              andrych17@gmail.com
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="ah-mono">
              WhatsApp
            </a>
            {clock && <span className="ah-mono">Surabaya {clock} WIB</span>}
          </div>
        </div>
      )}
    </>
  );
}
