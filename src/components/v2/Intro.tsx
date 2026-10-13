"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { getYearsOfExperience } from "@/utils/experience";
import { reveal } from "@/lib/v2/reveal";
import Cta from "./Cta";
import { Words } from "./Words";

type Stat = { label: string } & ({ n: number; suffix: string } | { text: string });

export default function Intro() {
  const { lang } = useLanguage();
  const id = lang === "id";
  const years = getYearsOfExperience();
  const root = useRef<HTMLElement>(null);

  useEffect(() => (root.current ? reveal(root.current) : undefined), [lang]);

  const bio = id
    ? "Saya membangun sistem yang menjalankan bisnis: 3+ tahun SaaS enterprise untuk MRI Software di Singapura, ERP untuk toko emas yang menghitung stok per gram, dan Qualiv, platform rekrutmen AI yang saya dirikan. Stack utama .NET Core, Next.js, dan NestJS, termasuk fitur RAG dan LLM di production."
    : "I build the systems a business runs on: 3+ years of enterprise SaaS for MRI Software in Singapore, ERPs for shops that count gold by the gram, and Qualiv, the AI recruitment platform I founded. Mostly .NET Core, Next.js and NestJS, with RAG and LLM features in production.";

  const stats: Stat[] = [
    { n: years, suffix: "+", label: id ? "tahun di production" : "years in production" },
    { n: 100000, suffix: "+", label: id ? "file dimigrasikan ke SharePoint, S3, dan Azure" : "files migrated to SharePoint, S3 and Azure" },
    { text: id ? "2 jam → 3 mnt" : "2h → 3min", label: id ? "audit stok toko emas dengan RFID" : "jewelry stock audit with RFID" },
    { n: 10000, suffix: "+", label: id ? "record rusak diperbaiki" : "corrupted records repaired" },
  ];
  const locale = id ? "id-ID" : "en-US";

  return (
    <section className="v2-intro" id="about" data-section="light" ref={root}>
      <div className="v2-intro-grid">
        <div className="v2-intro-side">
          <figure className="v2-bezel v2-intro-photo" data-r="thumb">
            <div>
              <Image src="/img/foto.jpg" alt="Andry Huang" fill sizes="(max-width: 900px) 70vw, 24vw" priority={false} />
            </div>
          </figure>
          <h2 className="v2-h v2-h-lg v2-intro-head">
            <Words className="v2-dim" r="words" text={id ? "Dari repo kosong." : "From an empty repo."} />
            <Words r="words" text={id ? "Sampai go-live." : "To go-live."} />
          </h2>
        </div>

        <div className="v2-intro-main">
          <Words as="p" className="v2-lede v2-intro-bio" mask={false} r="para" text={bio} />
          <div className="v2-intro-cta" data-r="up">
            <Cta href="/Andry_Huang_CV.pdf" external variant="solid">
              {id ? "Unduh CV" : "Download CV"}
            </Cta>
            <Cta href="/portofolio" variant="ghost">
              {id ? "Arsip 20+ proyek" : "Archive · 20+ projects"}
            </Cta>
          </div>

          <p className="v2-mono v2-soft v2-intro-label" data-r="up">
            {id ? "Dalam angka" : "What it looks like in numbers"}
          </p>
          <span className="v2-hair" data-r="line" />
          <dl className="v2-stats">
            {stats.map((s) => (
              <div className="v2-stat" key={s.label} data-r="up">
                <dt className="v2-soft">{s.label}</dt>
                <dd className="v2-h v2-stat-n">
                  {"text" in s ? (
                    s.text
                  ) : (
                    <>
                      <b data-r="count" data-count={s.n} data-locale={locale}>
                        {s.n.toLocaleString(locale)}
                      </b>
                      {s.suffix}
                    </>
                  )}
                </dd>
                <span className="v2-hair v2-hair-soft" />
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
