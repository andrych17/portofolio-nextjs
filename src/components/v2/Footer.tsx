"use client";

import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { scrollToTarget } from "@/lib/v2/scroll";
import TransitionLink from "./TransitionLink";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/andrych17" },
  { label: "LinkedIn", href: "https://linkedin.com/in/andry-huang-ba410a170" },
  { label: "WhatsApp", href: "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you" },
];

const TICKER = ["Enterprise SaaS", "ERP & POS", "RAG & LLM", "MCP agents", "Next.js", ".NET Core", "NestJS", "PostgreSQL"];

export default function Footer() {
  const { lang } = useLanguage();
  const id = lang === "id";
  const links = [
    { name: id ? "Karier" : "Career", href: "#career" },
    { name: id ? "Karya" : "Works", href: "#work" },
    { name: "Stack", href: "#skills" },
    { name: id ? "Kontak" : "Contact", href: "#contact" },
  ];

  return (
    <footer className="v2-footer" data-section="light">
      <div className="v2-ticker" aria-hidden="true">
        <div>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <div className="v2-footer-grid">
        <div className="v2-whoami v2-bezel v2-dark" aria-hidden="true">
          <div className="v2-term">
            <p>
              <span className="p">$</span> whoami
            </p>
            <p className="o">andry huang · senior full-stack &amp; ai engineer</p>
            <p>
              <span className="p">$</span> pwd
            </p>
            <p className="o">surabaya, id · utc+7</p>
            <p>
              <span className="p">$</span> status
            </p>
            <p className="o">
              <span className="ok">●</span> {id ? "terbuka untuk peran remote & proyek" : "open to remote roles & projects"}
            </p>
            <p>
              <span className="p">$</span> <span className="v2-caret" />
            </p>
          </div>
        </div>

        <div className="v2-footer-cols">
          <nav aria-label={id ? "Navigasi footer" : "Footer"}>
            <h3 className="v2-mono v2-soft">{id ? "Halaman" : "Pages"}</h3>
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.name}
              </a>
            ))}
            <TransitionLink href="/portofolio">{id ? "Arsip proyek" : "Project archive"}</TransitionLink>
          </nav>
          <div>
            <h3 className="v2-mono v2-soft">{id ? "Terhubung" : "Elsewhere"}</h3>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <div>
            <h3 className="v2-mono v2-soft">{id ? "Berbasis di" : "Based in"}</h3>
            <p>Surabaya, Indonesia</p>
            <p className="v2-soft">UTC+7</p>
          </div>
        </div>
      </div>

      <div className="v2-footer-bar v2-mono v2-soft">
        <span>© {new Date().getFullYear()} Andry Huang</span>
        <button type="button" onClick={() => scrollToTarget(0)}>
          {id ? "Kembali ke atas" : "Back to top"}
          <ArrowUp size={14} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <p className="v2-footer-mark v2-h" aria-hidden="true">
        Andry Huang
      </p>
    </footer>
  );
}
