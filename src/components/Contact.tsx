"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Title } from "./ui/Title";

const WHATSAPP =
  "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you";

export default function Contact() {
  const { lang } = useLanguage();
  const id = lang === "id";

  const rows = [
    { k: "Email", v: "andrych17@gmail.com", href: "mailto:andrych17@gmail.com" },
    { k: "WhatsApp", v: "+62 813-5729-6386", href: WHATSAPP },
    { k: "LinkedIn", v: "andry-huang", href: "https://linkedin.com/in/andry-huang-ba410a170" },
    { k: "GitHub", v: "andrych17", href: "https://github.com/andrych17" },
    { k: "CV", v: id ? "PDF, satu halaman" : "PDF, one page", href: "/Andry_Huang_CV.pdf" },
  ];

  return (
    <section id="contact" data-stage="contact" className="ah-sec ah-side-left">
      <Title no="06" meta="Surabaya · UTC+7">
        {id ? "Kontak" : "Contact"}
      </Title>

      <p className="ah-pitch">
        {id ? (
          <>
            Kirim deskripsi peran atau brief proyek Anda. <span>Saya balas dengan cara saya akan mengerjakannya.</span>
          </>
        ) : (
          <>
            Send me the role or the brief. <span>I&apos;ll reply with how I&apos;d approach it.</span>
          </>
        )}
      </p>

      <ul className="ah-contact">
        {rows.map((r) => {
          const external = !r.href.startsWith("mailto:");
          return (
            <li key={r.k}>
              <a
                className="ah-contact-row"
                href={r.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className="ah-mono">{r.k}</span>
                <span className="ah-contact-v">{r.v}</span>
                <ArrowUpRight className="ah-contact-go" size={22} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
