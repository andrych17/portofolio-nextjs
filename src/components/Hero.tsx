"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getYearsOfExperience } from "@/utils/experience";
import { stage } from "./stage/active";

const NAME = ["Andry", "Huang"];

const MENU = [
  { href: "#career", en: "Career", id: "Karier", hint: { en: "4 roles since September 2019", id: "4 peran sejak September 2019" } },
  { href: "#work", en: "Works", id: "Karya", hint: { en: "6 builds, enterprise first", id: "6 karya, enterprise lebih dulu" } },
  { href: "#skills", en: "Stack", id: "Stack", hint: { en: "Backend · frontend · AI systems · ops", id: "Backend · frontend · sistem AI · ops" } },
  { href: "#contact", en: "Contact", id: "Kontak", hint: { en: "Email · WhatsApp · CV", id: "Email · WhatsApp · CV" } },
] as const;

export default function Hero() {
  const { lang } = useLanguage();
  const [sel, setSel] = useState(0);
  const years = getYearsOfExperience();
  const id = lang === "id";

  const pick = (i: number) => {
    if (i === sel) return;
    setSel(i);
    stage.sweep();
  };

  const stats = [
    { v: `${years}+`, k: id ? "tahun di production" : "years in production" },
    { v: id ? "100.000+" : "100,000+", k: id ? "file dimigrasikan ke SharePoint, S3, Azure" : "files migrated to SharePoint, S3, Azure" },
    { v: id ? "2 jam → 3 mnt" : "2h → 3min", k: id ? "audit stok toko emas dengan RFID" : "jewelry stock audit with RFID" },
    { v: id ? "10.000+" : "10,000+", k: id ? "record rusak diperbaiki" : "corrupted records repaired" },
  ];

  return (
    <section id="home" data-stage="home" className="ah-hero">
      <div className="ah-hero-copy">
        <span className="ah-mono ah-eyebrow">
          <i aria-hidden="true" />
          {id ? "Terbuka untuk peran remote & proyek" : "Open to remote roles & projects"} · Surabaya, ID
        </span>
        <p className="ah-intro">
          {id
            ? "Saya software engineer yang membangun SaaS enterprise, ERP, dan sistem LLM."
            : "I'm a software engineer building enterprise SaaS, ERPs and LLM systems."}
        </p>
        <h1 className="ah-name" aria-label="Andry Huang">
          {NAME.map((word, w) => (
            <span key={word} className="ah-name-line" aria-hidden="true">
              {word.split("").map((ch, i) => (
                <span key={i} style={{ "--i": w * 4 + i } as CSSProperties}>
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <p className="ah-class">Senior Full-Stack &amp; AI Engineer</p>

        <div className="ah-hero-row">
          <div className="ah-hero-text">
            <p className="ah-bio">
              {id ? (
                <>
                  Saya membangun sistem yang menjalankan bisnis: 3+ tahun SaaS enterprise untuk{" "}
                  <b>MRI Software</b> di Singapura, ERP untuk toko emas yang menghitung stok per gram, dan{" "}
                  <b>Qualiv</b>, platform rekrutmen AI yang saya dirikan. Stack utama .NET Core, Next.js, dan NestJS,
                  termasuk <em>fitur RAG dan LLM di production</em>.
                </>
              ) : (
                <>
                  I build the systems a business runs on: 3+ years of enterprise SaaS for <b>MRI Software</b> in
                  Singapore, ERPs for shops that count gold by the gram, and <b>Qualiv</b>, the AI recruitment
                  platform I founded. Mostly .NET Core, Next.js and NestJS, with <em>RAG and LLM features in production</em>.
                </>
              )}
            </p>
            <div className="ah-cta">
              <a className="ah-btn" href="/Andry_Huang_CV.pdf" target="_blank" rel="noopener noreferrer">
                <FileText size={16} strokeWidth={1.75} aria-hidden="true" />
                {id ? "Unduh CV" : "Download CV"}
              </a>
              <Link className="ah-link" href="/portofolio">
                {id ? "Arsip 20+ proyek" : "Archive · 20+ projects"}
                <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <nav className="ah-menu" aria-label={id ? "Bagian halaman" : "Page sections"}>
            <ul>
              {MENU.map((m, i) => (
                <li key={m.href} style={{ "--i": i } as CSSProperties}>
                  <a
                    href={m.href}
                    className="ah-item"
                    data-on={i === sel || undefined}
                    aria-describedby={i === sel ? "ah-hint" : undefined}
                    onPointerEnter={() => pick(i)}
                    onFocus={() => pick(i)}
                  >
                    <span className="ah-slab ah-slab-back" aria-hidden="true" />
                    <span className="ah-slab ah-slab-front" aria-hidden="true" />
                    <span className="ah-cursor" aria-hidden="true" />
                    <span className="ah-label">{id ? m.id : m.en}</span>
                  </a>
                </li>
              ))}
            </ul>
            <span id="ah-hint" key={sel} className="ah-mono ah-hint">
              {MENU[sel].hint[lang]}
            </span>
          </nav>
        </div>
      </div>

      <dl className="ah-stats">
        {stats.map((s) => (
          <div key={s.k}>
            <dt className="ah-mono">{s.k}</dt>
            <dd>{s.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
