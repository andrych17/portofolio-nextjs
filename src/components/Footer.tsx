"use client";

import { Heart, Github, Linkedin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { RollLink, RollText } from "./ui/RollLink";

export default function Footer() {
  const { lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/andrych17", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/andry-huang-ba410a170", label: "LinkedIn" },
    {
      icon: MessageCircle,
      href: "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you",
      label: "WhatsApp",
    },
  ];

  const footerLinks = [
    { name: lang === "id" ? "Beranda" : "Home", href: "#home" },
    { name: lang === "id" ? "Tentang" : "About", href: "#about" },
    { name: lang === "id" ? "Keahlian" : "Skills", href: "#skills" },
    { name: lang === "id" ? "Portofolio" : "Projects", href: "#work" },
    { name: lang === "id" ? "Kontak" : "Contact", href: "#contact" },
  ];

  return (
    <footer className="border-t border-[var(--line)] px-[var(--pad-x)] py-12">
      <div className="grid gap-10 md:grid-cols-3 md:gap-8 mb-10">
        <div>
          <a href="#home" className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg)]">
            Portfolio
          </a>
          <p className="mt-4 text-sm text-[var(--mut)] max-w-xs">
            {lang === "id"
              ? "Membangun pengalaman digital dengan dedikasi & presisi tinggi. Mari wujudkan ide hebat bersama."
              : "Building digital experiences with passion and precision. Let's create something amazing together."}
          </p>
        </div>

        <div>
          <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mut)] mb-4">
            {lang === "id" ? "Navigasi Cepat" : "Quick Links"}
          </span>
          <div className="flex flex-col gap-2 items-start">
            {footerLinks.map((link) => (
              <RollLink key={link.name} href={link.href} className="text-sm text-[var(--fg-2)] py-1">
                {link.name}
              </RollLink>
            ))}
          </div>
        </div>

        <div>
          <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mut)] mb-4">
            {lang === "id" ? "Sosial Media" : "Connect"}
          </span>
          <div className="flex flex-col gap-3 items-start">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-1"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-[var(--mut)]" aria-hidden />
                <RollText className="text-sm text-[var(--fg-2)]">{social.label}</RollText>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-[var(--line)] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-[var(--mut)] flex items-center gap-1.5">
          © {currentYear} {lang === "id" ? "Dibuat dengan" : "Made with"}
          <Heart className="w-3.5 h-3.5 text-[var(--accent)] fill-[var(--accent)]" aria-hidden />
          {lang === "id" ? "oleh Andry Huang" : "by Andry Huang"}
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--mut)] hover:text-[var(--fg)] transition-colors py-2"
        >
          {lang === "id" ? "Kembali ke Atas ↑" : "Back to Top ↑"}
        </button>
      </div>
    </footer>
  );
}
