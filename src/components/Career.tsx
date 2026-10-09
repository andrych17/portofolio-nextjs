"use client";

import { useRef, useState, type CSSProperties } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { progressFor, span, stepAt, yearTicks, type YM } from "@/utils/timeline";
import { Title } from "./ui/Title";

type Text = { en: string; id: string };

interface Job {
  company: Text;
  note: Text;
  role: string;
  place: Text;
  dates: Text;
  from: YM;
  to: YM | null;
  lane: 0 | 1; // 1 = side track that overlaps employment
  points: { en: string[]; id: string[] };
}

// Mirrors public/llms-full.txt; keep both in sync when the CV changes.
const CAREER: Job[] = [
  {
    company: { en: "MRI Software", id: "MRI Software" },
    note: { en: "formerly Anacle Systems", id: "dulu Anacle Systems" },
    role: "Fullstack Developer",
    place: { en: "Singapore · remote", id: "Singapura · remote" },
    dates: { en: "Nov 2022 – Mar 2026", id: "Nov 2022 – Mar 2026" },
    from: [2022, 11],
    to: [2026, 3],
    lane: 0,
    points: {
      en: [
        "Took the SMRT mall tenant system to go-live: tender submissions, space leasing, tenant applications and daily operations, on Next.js, NestJS and .NET Core.",
        "Wrote the microservice that migrated 100,000+ files into SharePoint (Graph API), AWS S3 and Azure Blob, with RBAC and audit logging.",
        "Shipped production RAG pipelines on the OpenAI API and pgvector for semantic document search and automated executive reports.",
        "Led the SonarQube rollout and set CI/CD quality gates that block deploys with new vulnerabilities.",
      ],
      id: [
        "Membawa sistem tenant mall SMRT sampai go-live: pengajuan tender, sewa ruang, aplikasi tenant, dan operasional harian, dengan Next.js, NestJS, dan .NET Core.",
        "Membuat microservice yang memigrasikan 100.000+ file ke SharePoint (Graph API), AWS S3, dan Azure Blob, lengkap dengan RBAC dan audit log.",
        "Membangun pipeline RAG produksi dengan OpenAI API dan pgvector untuk pencarian dokumen semantik dan laporan eksekutif otomatis.",
        "Memimpin rollout SonarQube dan memasang quality gate CI/CD yang memblokir deploy jika ada celah keamanan baru.",
      ],
    },
  },
  {
    company: { en: "Software House", id: "Software House" },
    note: { en: "Tool Management System", id: "Tool Management System" },
    role: "Fullstack Developer",
    place: { en: "Surabaya", id: "Surabaya" },
    dates: { en: "Mar 2022 – Nov 2022", id: "Mar 2022 – Nov 2022" },
    from: [2022, 3],
    to: [2022, 11],
    lane: 0,
    points: {
      en: [
        "Led the Java 17 / Spring Boot upgrade and a large refactor of a legacy enterprise system, and ran the team's code review.",
        "Traced data corruption to a legacy race condition, patched it, and repaired 10,000+ records.",
        "Ran the self-hosted Git servers and set up Elasticsearch clusters for log indexing.",
      ],
      id: [
        "Memimpin upgrade Java 17 / Spring Boot dan refactor besar sistem enterprise lama, serta menjalankan code review tim.",
        "Melacak data yang rusak sampai ke race condition di kode lama, menambalnya, lalu memperbaiki 10.000+ record.",
        "Mengelola Git server self-hosted dan menyiapkan cluster Elasticsearch untuk indexing log.",
      ],
    },
  },
  {
    company: { en: "Independent", id: "Mandiri" },
    note: { en: "Qualiv founder · freelance", id: "Founder Qualiv · freelance" },
    role: "Freelance Fullstack & AI Engineer",
    place: { en: "Surabaya · remote", id: "Surabaya · remote" },
    dates: { en: "2021 – now", id: "2021 – sekarang" },
    from: [2021, 1],
    to: null,
    lane: 1,
    points: {
      en: [
        "Founded Qualiv, a multi-tenant AI recruitment SaaS, and built it from the architecture up: CV screening, logic tests, AI interviews, Midtrans billing.",
        "Built an AI tire-recommendation assistant for PT Nagamasban.",
        "POS and inventory systems for retail stores: yarn, RFID jewelry, grocery and tires.",
        "The Knit and Cro online shop, and the Wonderful Works website with its visual CMS.",
      ],
      id: [
        "Mendirikan Qualiv, SaaS rekrutmen multi-tenant berbasis AI, dan membangunnya dari arsitektur: penyaringan CV, tes logika, wawancara AI, billing Midtrans.",
        "Membangun asisten rekomendasi ban berbasis AI untuk PT Nagamasban.",
        "Sistem POS dan inventaris untuk toko retail: toko benang, toko emas dengan RFID, toko grosir, dan toko ban.",
        "Online shop Knit and Cro, serta website Wonderful Works dengan CMS visualnya.",
      ],
    },
  },
  {
    company: { en: "Tjiwi Kimia", id: "Tjiwi Kimia" },
    note: { en: "APP Sinar Mas", id: "APP Sinar Mas" },
    role: "Full-Stack Developer",
    place: { en: "East Java", id: "Jawa Timur" },
    dates: { en: "Sep 2019 – Feb 2022", id: "Sep 2019 – Feb 2022" },
    from: [2019, 9],
    to: [2022, 2],
    lane: 0,
    points: {
      en: [
        "Built dozens of dashboards and reports for pulp and paper production, and tuned report SQL from minutes down to seconds.",
        "Automated plant reporting with a WhatsApp bot that sends scheduled OEE and HWT snapshots to management.",
        "Shipped a native Android barcode app for warehouse stock-in and stock-out.",
        "Built internal apps, including a company-wide daily COVID-19 health check-in.",
      ],
      id: [
        "Membangun puluhan dashboard dan laporan produksi pulp dan kertas, dan tuning SQL laporan dari hitungan menit menjadi detik.",
        "Mengotomatiskan laporan pabrik lewat bot WhatsApp yang mengirim snapshot OEE dan HWT ke manajemen sesuai jadwal.",
        "Merilis aplikasi Android native untuk scan barcode stok masuk dan keluar gudang.",
        "Membuat aplikasi internal, termasuk check-in kesehatan COVID-19 harian untuk seluruh karyawan.",
      ],
    },
  },
];

const N = CAREER.length;
const TICKS = yearTicks();
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Desktop: the section is N screens tall and its content is pinned; scrolling steps through the roles.
 * Under 900px (stage.css) the pin is dropped and every role is simply stacked.
 */
export default function Career() {
  const { lang } = useLanguage();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setIdx(stepAt(p, N)));

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const j = (i + N) % N;
    const travel = el.offsetHeight - window.innerHeight;
    if (travel <= 0) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + progressFor(j, N) * travel, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <section ref={ref} id="career" data-stage="career" className="ah-career" style={{ "--n": N } as CSSProperties}>
      <span id="about" className="ah-anchor" aria-hidden="true" />
      <div className="ah-career-pin">
        <div className="ah-career-head">
          <Title no="01" meta={lang === "id" ? "4 peran · Sep 2019 → sekarang" : "4 roles · Sep 2019 → now"}>
            {lang === "id" ? "Karier" : "Career"}
          </Title>
          <div className="ah-pager">
            <button type="button" onClick={() => go(idx - 1)} aria-label={lang === "id" ? "Peran sebelumnya" : "Previous role"}>
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <span className="ah-mono" aria-live="polite">
              {pad(idx + 1)} / {pad(N)}
            </span>
            <button type="button" onClick={() => go(idx + 1)} aria-label={lang === "id" ? "Peran berikutnya" : "Next role"}>
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="ah-jobs">
          {CAREER.map((c, i) => (
            <article key={c.company.en} className="ah-job" data-state={i < idx ? "past" : i === idx ? "on" : "next"}>
              <span className="ah-job-no" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3 className="ah-company">
                <span>{c.company[lang]}</span>
                <em className="ah-mono">{c.note[lang]}</em>
              </h3>
              <p className="ah-role">
                <span>{c.role}</span>
              </p>
              <p className="ah-mono ah-when">
                {c.dates[lang]} · {c.place[lang]}
              </p>
              <ul className="ah-points">
                {c.points[lang].map((p, k) => (
                  <li key={k} style={{ "--i": k } as CSSProperties}>
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="ah-timeline">
          {CAREER.map((c, i) => {
            const s = span(c.from, c.to);
            return (
              <button
                key={c.company.en}
                type="button"
                className="ah-tl-seg"
                data-lane={c.lane}
                data-on={i === idx || undefined}
                data-open={c.to === null || undefined}
                style={{ left: `${s.left}%`, width: `${s.width}%` }}
                onClick={() => go(i)}
                aria-label={`${c.company[lang]}, ${c.dates[lang]}`}
              />
            );
          })}
          {TICKS.map((t) => (
            <i key={t.year} style={{ left: `${t.left}%` }} aria-hidden="true">
              {t.year}
            </i>
          ))}
        </div>
      </div>
    </section>
  );
}
