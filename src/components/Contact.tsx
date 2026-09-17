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
    <section id="contact" className="relative overflow-hidden">
      <div className="glow-orb-orange w-[550px] h-[550px] -bottom-20 -left-20 opacity-40 pointer-events-none" />
      <div className="glow-orb-violet w-[500px] h-[500px] top-10 -right-20 opacity-30 pointer-events-none" />

      <SectionHead index="05" label={lang === "id" ? "Kontak & Pertanyaan" : "Contact & Inquiries"} />

      <div className="px-[var(--pad-x)] py-[var(--sec-lg)] relative z-10">
        <Reveal>
          <a
            href="https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-block"
          >
            <h2
              className="font-bold uppercase leading-[0.9] tracking-[-0.03em] text-[var(--fg)] transition-all group-hover:text-[var(--accent)]"
              style={{ fontSize: "var(--t-display)" }}
            >
              {lang === "id" ? "Hubungi Saya" : "Get In Touch"}
              <span className="inline-block text-[var(--accent)] ml-2 group-hover:translate-x-3 transition-transform">
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
                className="group flex items-center gap-6 border-b border-[var(--line)] py-6 px-3 rounded-2xl transition-all duration-300 hover:bg-white/[0.03]"
              >
                <Index n={index + 1} className="w-8 shrink-0" />
                <span className="flex-1 text-xl md:text-2xl font-bold text-[var(--fg)] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--accent)]">
                  {link.label}
                </span>
                <span className="font-mono text-xs text-[var(--fg-2)] px-3 py-1 rounded-full border border-white/10 bg-white/5">
                  {link.sub}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
