"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { gsap, reducedMotion } from "@/lib/v2/motion";
import { reveal } from "@/lib/v2/reveal";
import Cta from "./Cta";
import { Words } from "./Words";

const WHATSAPP = "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you";

export default function Contact() {
  const { lang } = useLanguage();
  const id = lang === "id";
  const root = useRef<HTMLElement>(null);

  useEffect(() => (root.current ? reveal(root.current) : undefined), [lang]);

  // The horizon rises into place as the section arrives.
  useEffect(() => {
    const el = root.current;
    if (!el || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".v2-horizon-arc", { yPercent: 38, ease: "none", scrollTrigger: { trigger: ".v2-horizon", start: "top bottom", end: "bottom 40%", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);

  const rows = [
    { k: "Email", v: "andrych17@gmail.com", href: "mailto:andrych17@gmail.com" },
    { k: "WhatsApp", v: "+62 813-5729-6386", href: WHATSAPP },
    { k: "Upwork", v: "andry-huang", href: "https://www.upwork.com/freelancers/~010b8007dbf51d6f3c" },
    { k: "LinkedIn", v: "andry-huang", href: "https://linkedin.com/in/andry-huang-ba410a170" },
    { k: "GitHub", v: "andrych17", href: "https://github.com/andrych17" },
    { k: "CV", v: id ? "PDF, satu halaman" : "PDF, one page", href: "/Andry_Huang_CV.pdf" },
  ];

  return (
    <section className="v2-contact" id="contact" data-section="dark" ref={root}>
      <div className="v2-horizon" aria-hidden="true">
        <div className="v2-horizon-arc" />
      </div>
      <div className="v2-contact-grid">
        <div className="v2-contact-main">
          <p className="v2-eyebrow" data-r="up">
            <i />
            06 · {id ? "Kontak" : "Contact"} · Surabaya, UTC+7
          </p>
          <Words as="h2" className="v2-h v2-h-xl" r="words" text={id ? "Mari bangun yang berjalan berikutnya." : "Let's build what runs next."} />
          <p className="v2-lede v2-soft" data-r="up">
            {id ? "Kirim deskripsi peran atau brief proyek Anda. Saya balas dengan cara saya akan mengerjakannya." : "Send me the role or the brief. I'll reply with how I'd approach it."}
          </p>
          <div className="v2-contact-ctas" data-r="up">
            <Cta href="mailto:andrych17@gmail.com" variant="accent">
              {id ? "Kirim email" : "Send an email"}
            </Cta>
            <Cta href={WHATSAPP} external variant="ghost">
              WhatsApp
            </Cta>
          </div>
        </div>

        <ul className="v2-contact-rows">
          {rows.map((r) => {
            const external = !r.href.startsWith("mailto:");
            return (
              <li key={r.k} data-r="up">
                <a className="v2-contact-row" href={r.href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
                  <span className="v2-mono">{r.k}</span>
                  <span className="v2-contact-v">{r.v}</span>
                  <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
