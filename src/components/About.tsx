"use client";

import Image from "next/image";
import { MapPin, GraduationCap, FileText, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/Label";

const experiencesEn = [
  {
    period: "Nov 2022 - Mar 2026",
    title: "Fullstack Developer",
    company: "MRI Software (formerly Anacle Systems), Singapore (Remote)",
    description:
      "Built features for Anacle Simplicity and the SMRT Tenant Management System through go-live: mall tender submissions, space leasing, tenant applications, and daily operations. Stack: .NET Core, .NET Framework 4.8, Next.js, NestJS.",
    achievements: [
      "Shipped production RAG pipelines on the OpenAI API and PostgreSQL (pgvector) for semantic document search and automated executive reports.",
      "Wrote a microservice that migrated 100,000+ files to SharePoint (Graph API), AWS S3, and Azure Blob Storage, with RBAC and audit logging.",
      "Refactored legacy stored procedures and wrote regression tests in Selenium and Playwright for core SaaS modules.",
      "Led the SonarQube rollout across enterprise repositories, fixed the security vulnerabilities it flagged, and set CI/CD quality gates that block deployments with new vulnerabilities.",
    ],
  },
  {
    period: "2021 - Present",
    title: "Freelance Fullstack & AI Engineer",
    company: "Self-employed, Surabaya (Remote)",
    description:
      "AI products and business systems for clients and for myself: Qualiv, Nagamasban AI, OpenClaw, Stock Portfolio AI, Wonderful Works, and Laravel ERP/POS systems for local retailers.",
    achievements: [
      "Build AI products end to end, from architecture to production: Qualiv, an AI recruitment SaaS, and an AI tire-recommendation assistant for PT Nagamasban.",
      "Deliver client systems: the Wonderful Works website and CMS, and Laravel ERP/POS systems for tire, jewelry (RFID), yarn, and grocery retailers.",
    ],
  },
  {
    period: "Mar 2022 - Nov 2022",
    title: "Fullstack Developer",
    company: "Software House, Surabaya, Indonesia",
    description:
      "Maintained a legacy enterprise Tool Management System (TMS) in Java, Spring Boot, and Oracle. Led a Java version upgrade, a large refactor, and a code-review process, and optimized complex SQL queries.",
    achievements: [
      "Tracked down the edge-case business-logic bugs that were corrupting data, patched them, and repaired 10,000+ corrupted records.",
      "Maintained self-hosted Git servers and set up Elasticsearch clusters for log indexing.",
      "Traced recurring high-priority incidents to backend bottlenecks and fixed them, cutting incident tickets quarter over quarter.",
    ],
  },
  {
    period: "Sep 2019 - Feb 2022",
    title: "Full-Stack Developer",
    company: "PT Pabrik Kertas Tjiwi Kimia Tbk, Indonesia",
    description:
      "Built manufacturing dashboards and reports for pulp & paper production in .NET Core, C#, ASP Classic, and SQL Server.",
    achievements: [
      "Tuned report queries so long-running reports finish in seconds instead of minutes.",
      "Automated plant reporting with a WhatsApp bot (Python, Java, Selenium) that sends scheduled dashboard snapshots of OEE and HWT production metrics.",
      "Shipped a native Android barcode scanner app for warehouse stock-in and stock-out.",
      "Developed internal apps, including a company-wide daily COVID-19 health check-in and a digital company raffle draw.",
    ],
  },
];

const experiencesId = [
  {
    period: "Nov 2022 - Mar 2026",
    title: "Fullstack Developer",
    company: "MRI Software (formerly Anacle Systems), Singapura (Remote)",
    description:
      "Mengembangkan fitur Anacle Simplicity dan SMRT Tenant Management System sampai go-live: pengajuan tender mall, sewa ruang, aplikasi tenant, dan operasional harian. Stack: .NET Core, .NET Framework 4.8, Next.js, NestJS.",
    achievements: [
      "Membangun pipeline RAG produksi dengan OpenAI API dan PostgreSQL (pgvector) untuk pencarian dokumen semantik dan laporan eksekutif otomatis.",
      "Membuat microservice yang memigrasikan 100.000+ file ke SharePoint (Graph API), AWS S3, dan Azure Blob Storage, lengkap dengan RBAC dan audit log.",
      "Refactor stored procedure lama dan menulis regression test dengan Selenium dan Playwright untuk modul inti SaaS.",
      "Memimpin rollout SonarQube di repository enterprise, memperbaiki celah keamanan yang ditemukan, dan memasang quality gate CI/CD yang memblokir deploy jika ada celah baru.",
    ],
  },
  {
    period: "2021 - Sekarang",
    title: "Freelance Fullstack & AI Engineer",
    company: "Mandiri, Surabaya (Remote)",
    description:
      "Produk AI dan sistem bisnis untuk klien maupun untuk saya sendiri: Qualiv, Nagamasban AI, OpenClaw, Stock Portfolio AI, Wonderful Works, dan ERP/POS Laravel untuk toko retail lokal.",
    achievements: [
      "Membangun produk AI dari arsitektur sampai production: Qualiv, SaaS rekrutmen berbasis AI, dan asisten rekomendasi ban berbasis AI untuk PT Nagamasban.",
      "Mengerjakan sistem klien: website dan CMS Wonderful Works, serta ERP/POS Laravel untuk toko ban, toko emas (RFID), toko benang, dan toko grosir.",
    ],
  },
  {
    period: "Mar 2022 - Nov 2022",
    title: "Fullstack Developer",
    company: "Software House, Surabaya, Indonesia",
    description:
      "Memelihara Tool Management System (TMS) enterprise lama dengan Java, Spring Boot, dan Oracle. Memimpin upgrade versi Java, refactor besar, dan proses code review, serta mengoptimalkan query SQL yang kompleks.",
    achievements: [
      "Melacak bug edge-case di logika bisnis yang merusak data, menambalnya, lalu memperbaiki 10.000+ record yang rusak.",
      "Memelihara Git server self-hosted dan menyiapkan cluster Elasticsearch untuk indexing log.",
      "Menelusuri insiden high-priority yang berulang sampai ke bottleneck backend dan memperbaikinya, sehingga tiket insiden turun tiap kuartal.",
    ],
  },
  {
    period: "Sep 2019 - Feb 2022",
    title: "Full-Stack Developer",
    company: "PT Pabrik Kertas Tjiwi Kimia Tbk, Indonesia",
    description:
      "Membangun dashboard dan laporan produksi pulp & kertas dengan .NET Core, C#, ASP Classic, dan SQL Server.",
    achievements: [
      "Tuning query laporan sehingga laporan yang biasanya berjalan beberapa menit selesai dalam hitungan detik.",
      "Mengotomatiskan laporan pabrik lewat bot WhatsApp (Python, Java, Selenium) yang mengirim snapshot dashboard metrik produksi OEE dan HWT sesuai jadwal.",
      "Merilis aplikasi Android native untuk scan barcode stok masuk dan keluar gudang.",
      "Membuat aplikasi internal, termasuk check-in kesehatan COVID-19 harian untuk seluruh karyawan dan undian doorprize digital perusahaan.",
    ],
  },
];

const featuresEn = [
  {
    title: "Full-Stack Development",
    description: "Next.js frontends, backend APIs, and the SQL underneath, built end to end.",
  },
  {
    title: "Backend & Systems",
    description: ".NET Core 8/9, NestJS, Node.js, and Java Spring Boot.",
  },
  {
    title: "AI & Autonomous Agents",
    description: "Model Context Protocol (MCP), LLM tool-calling pipelines, RAG pgvector, and BullMQ worker queues.",
  },
  {
    title: "Database Architecture",
    description: "Query tuning and indexing on PostgreSQL and SQL Server, plus Redis.",
  },
  {
    title: "Cloud & DevOps",
    description: "AWS, Azure, Docker, Linux administration, and SonarQube quality gates in CI/CD.",
  },
  {
    title: "Enterprise Integrations",
    description: "SharePoint Graph API, AWS S3, Azure Blob, Midtrans payment gateway, and RFID hardware systems.",
  },
];

const featuresId = [
  {
    title: "Pengembangan Full-Stack",
    description: "Frontend Next.js, API backend, sampai SQL di bawahnya, dikerjakan end-to-end.",
  },
  {
    title: "Spesialis Backend & Sistem",
    description: ".NET Core 8/9, NestJS, Node.js, dan Java Spring Boot.",
  },
  {
    title: "Sistem AI & Agen Otonom",
    description: "Model Context Protocol (MCP), pipeline LLM tool-calling, RAG pgvector, dan worker queue BullMQ.",
  },
  {
    title: "Arsitektur Database",
    description: "Tuning query dan indexing di PostgreSQL dan SQL Server, ditambah Redis.",
  },
  {
    title: "Cloud & DevOps",
    description: "AWS, Azure, Docker, administrasi Linux, dan quality gate SonarQube di CI/CD.",
  },
  {
    title: "Integrasi Enterprise",
    description: "SharePoint Graph API, AWS S3, Azure Blob, payment gateway Midtrans, dan integrasi hardware RFID.",
  },
];

export default function About() {
  const { lang } = useLanguage();
  const experiences = lang === "id" ? experiencesId : experiencesEn;
  const features = lang === "id" ? featuresId : featuresEn;

  return (
    <section id="about" className="relative overflow-hidden">

      <SectionHead index="01" label={lang === "id" ? "Tentang Saya" : "About Me"} />

      <div className="px-[var(--pad-x)] py-[var(--sec-sm)] relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Photo + bio */}
          <Reveal>
            <div className="group relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-[var(--bg-2)]">
              <Image
                src="/img/foto.jpg"
                alt="Andry Huang"
                fill
                sizes="(max-width: 1024px) 90vw, 384px"
                className="object-cover grayscale contrast-[1.08] transition-[filter,transform] duration-700 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                priority
              />
            </div>

            <p className="mt-8 max-w-prose text-[var(--t-body)] leading-relaxed text-[var(--fg-2)]">
              {lang === "id" ? (
                <>
                  Senior Fullstack & AI Engineer dengan <span className="text-[var(--fg)] font-semibold">7+ tahun pengalaman</span> merancang dan membangun platform
                  enterprise SaaS, sistem terdistribusi, dan aplikasi AI produksi. Keahlian utama: <span className="text-[var(--accent)] font-medium">.NET Core, Next.js, Node.js, NestJS, optimasi SQL performa tinggi, dan pipeline LLM RAG</span>.
                  Berpengalaman dalam tim remote internasional dan pengiriman arsitektur berkonkurensi tinggi.
                </>
              ) : (
                <>
                  Senior Fullstack & AI Engineer with <span className="text-[var(--fg)] font-semibold">7+ years of experience</span> architecting and building enterprise
                  SaaS platforms, distributed systems, and production AI tools. Core stack: <span className="text-[var(--accent)] font-medium">.NET Core, Next.js, Node.js, NestJS, SQL performance tuning, and LLM RAG pipelines</span>. Proven background delivering
                  secure, high-concurrency architectures with international remote engineering teams.
                </>
              )}
            </p>

            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--mut)]">
              <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
              Surabaya, Indonesia
              <span aria-hidden>/</span>
              <GraduationCap className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden />
              S1 Teknik Informatika (UBAYA)
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="/Andry_Huang_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-[var(--fg)] px-5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[var(--bg)] transition-colors duration-300 hover:bg-[var(--accent)] active:scale-[0.97]"
              >
                <FileText className="h-4 w-4" aria-hidden />
                <span>{lang === "id" ? "Unduh CV (PDF)" : "Download CV (PDF)"}</span>
                <span aria-hidden className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href="/Andry_Huang_CV.docx"
                download
                className="inline-flex min-h-11 items-center gap-2 border-b border-[var(--line-strong)] font-mono text-xs uppercase tracking-[0.1em] text-[var(--fg-2)] transition-colors hover:border-[var(--fg)] hover:text-[var(--fg)]"
              >
                <Download className="h-4 w-4 text-[var(--mut)]" aria-hidden />
                {lang === "id" ? "Format DOCX" : "DOCX Format"}
              </a>
            </div>
          </Reveal>

          {/* Capabilities — numbered index rows, not icon cards */}
          <ol className="border-t border-[var(--line)]">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.05}>
                <li className="group grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-[var(--line)] py-6">
                  <span className="pt-1 font-mono text-xs tabular-nums text-[var(--mut)] transition-colors group-hover:text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display text-[clamp(1.5rem,1rem+1.6vw,2.5rem)] text-[var(--fg)]">{feature.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--mut)]">{feature.description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      {/* Experience index */}
      <div className="border-t border-[var(--line)]">
        <div className="px-[var(--pad-x)] py-6">
          <Label>{lang === "id" ? "Riwayat Karir & Pengalaman" : "Career & Experience History"}</Label>
        </div>
        {experiences.map((exp, index) => (
          <Reveal key={index} delay={index * 0.05}>
            <div className="grid gap-4 border-t border-[var(--line)] px-[var(--pad-x)] py-8 md:grid-cols-[1fr_2fr]">
              <div>
                <span className="font-mono text-xs text-[var(--accent)]">{exp.period}</span>
                <h4 className="mt-2 text-xl font-medium text-[var(--fg)]">{exp.title}</h4>
                <p className="mt-1 text-sm text-[var(--mut)]">{exp.company}</p>
              </div>
              <div>
                <p className="max-w-2xl text-base leading-relaxed text-[var(--fg-2)]">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  // Native disclosure: achievements stay in the DOM (SEO) but no longer flood the page.
                  <details className="group mt-4 border-t border-[var(--line)] pt-3">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--fg-2)] transition-colors hover:text-[var(--fg)] [&::-webkit-details-marker]:hidden">
                      <span aria-hidden className="text-[var(--accent)] transition-transform group-open:rotate-45">+</span>
                      {lang === "id" ? `Pencapaian utama (${exp.achievements.length})` : `Key achievements (${exp.achievements.length})`}
                    </summary>
                    <ul className="mt-3 space-y-3">
                      {exp.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-[var(--fg-2)]">
                          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 bg-[var(--accent)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--mut)]">{children}</h3>
  );
}
