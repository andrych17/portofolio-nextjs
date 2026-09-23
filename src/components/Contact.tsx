"use client";

import { useLanguage } from "@/context/LanguageContext";
import { SectionHead, Index } from "./ui/Label";
import { Reveal } from "./ui/Reveal";

export default function Contact() {
  const { lang } = useLanguage();

  const links = [
    {
      label: "Email",
      sub: "andrych17@gmail.com",
      href: "mailto:andrych17@gmail.com",
    },
    {
      label: "WhatsApp",
      sub: "+62 81-357-296-386",
      href: "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you",
    },
    {
      label: "LinkedIn",
      sub: lang === "id" ? "Terhubung dengan saya" : "Connect with me",
      href: "https://linkedin.com/in/andry-huang-ba410a170",
    },
    {
      label: "GitHub",
      sub: lang === "id" ? "Lihat repositori" : "View repositories",
      href: "https://github.com/andrych17",
    },
  ];

  return (
    <section id="contact" className="relative">

      <SectionHead index="05" label={lang === "id" ? "Kontak & Pertanyaan" : "Contact & Inquiries"} />

      <div className="px-[var(--pad-x)] py-[var(--sec-lg)] relative z-10">
        <Reveal>
          <a
            href="https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block"
          >
            <h2 className="display text-[clamp(3.5rem,1rem+10.5vw,13rem)] text-[var(--fg)] transition-colors duration-500 group-hover:text-[var(--accent)]">
              {lang === "id" ? "Hubungi Saya" : "Get In Touch"}
              <span aria-hidden className="ml-[0.15em] inline-block text-[var(--accent)] transition-transform duration-500 group-hover:translate-x-4">
                →
              </span>
            </h2>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-[var(--t-body)] text-[var(--fg-2)] leading-relaxed">
            {lang === "id"
              ? "Punya ide proyek atau berminat untuk berkolaborasi? Jangan ragu untuk menghubungi saya! Saya selalu terbuka untuk mendiskusikan peluang baru."
              : "Have a project in mind or want to collaborate? Feel free to reach out! I'm always open to discussing new opportunities."}
          </p>
        </Reveal>

        <div className="mt-16 border-t border-[var(--line)]">
          {links.map((link, index) => (
            <Reveal key={link.label} delay={0.05 * index}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-6 border-b border-[var(--line)] py-6"
              >
                <Index n={index + 1} className="w-8 shrink-0" />
                <span className="display flex-1 text-[clamp(1.75rem,1rem+2vw,3rem)] text-[var(--fg)] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--accent)]">
                  {link.label}
                </span>
                <span className="hidden font-mono text-xs text-[var(--mut)] transition-colors group-hover:text-[var(--fg)] sm:block">
                  {link.sub}
                </span>
                <span aria-hidden className="text-[var(--mut)] transition-all duration-300 group-hover:-rotate-45 group-hover:text-[var(--accent)]">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
