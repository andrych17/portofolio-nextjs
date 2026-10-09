"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/andrych17" },
  { label: "LinkedIn", href: "https://linkedin.com/in/andry-huang-ba410a170" },
  {
    label: "WhatsApp",
    href: "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you",
  },
];

export default function Footer() {
  const { lang } = useLanguage();
  const id = lang === "id";

  const links = [
    { name: id ? "Karier" : "Career", href: "/#career" },
    { name: id ? "Karya" : "Works", href: "/#work" },
    { name: "Stack", href: "/#skills" },
    { name: id ? "Arsip" : "Archive", href: "/portofolio" },
    { name: id ? "Kontak" : "Contact", href: "/#contact" },
  ];

  return (
    <footer className="ah-footer">
      <div className="ah-footer-row">
        <p className="ah-mono">© {new Date().getFullYear()} Andry Huang · Surabaya, Indonesia</p>
        <nav aria-label={id ? "Navigasi footer" : "Footer"} className="ah-footer-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="ah-mono">
              {l.name}
            </Link>
          ))}
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="ah-mono">
              {s.label}
            </a>
          ))}
        </nav>
        <button type="button" className="ah-mono ah-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {id ? "Kembali ke atas" : "Back to top"}
          <ArrowUp size={14} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
      {/* Closing wordmark, cropped by the viewport bottom */}
      <p aria-hidden="true" className="ah-footer-mark">
        Andry <span>Huang</span>
      </p>
    </footer>
  );
}
