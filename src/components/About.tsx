"use client";

import Image from "next/image";
import { Code2, Database, Cloud, Server, Layers, Zap, MapPin, GraduationCap, FileText, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/Label";

const experiencesEn = [
  {
    period: "Nov 2022 - Mar 2026",
    title: "Fullstack Developer",
    company: "MRI Software (formerly Anacle Systems), Singapore (Remote)",
    description:
      "Scaled enterprise SaaS platforms (Anacle Simplicity & SMRT Tenant Management System), supporting mall tender submissions, space leasing, tenant applications, and day-to-day operations using .NET Core, .NET Framework 4.8, Next.js, and NestJS.",
    achievements: [
      "Go-Live SMRT Tenant Management: Scaled enterprise tenant platform digitizing mall tenders, leasing, and tenant operations using .NET Core & Next.js.",
      "Production RAG Pipelines: Deployed production RAG pipelines using OpenAI API and PostgreSQL (pgvector) for semantic document retrieval, search, and automated executive reporting.",
      "Go-Live SharePoint Document Migration: Built document migration microservice syncing 100,000+ enterprise files to SharePoint Graph API, AWS S3, and Azure Blob Storage with RBAC & audit logging.",
      "Automated Regression Testing: Refactored legacy .NET stored procedures and wrote automated regression tests using Selenium & Playwright across core SaaS modules.",
      "SonarQube Security Pipeline: Led static code analysis across enterprise repositories, fixed security vulnerabilities, configured CI/CD quality gates, and enforced zero-vulnerability deployment standards.",
    ],
  },
  {
    period: "2021 - Present",
    title: "Freelance & Side Projects",
    company: "Multiple Clients & Personal SaaS",
    description:
      "Designed and developed multiple POS, ERP, and AI platforms (Qualiv AI Recruitment, Stock Portfolio AI, Nagamasban AI, Grocery POS, Tire Shop ERP, Jewelry Store with RFID).",
    achievements: [
      "Qualiv Founder & Architect: Multi-tenant AI recruitment SaaS with LLM CV screening, candidate logic tests, and real-time AI interview simulation.",
      "Enterprise Retail Solutions: Delivered RFID jewelry POS (reduced stock audit from 2 hrs to 3 mins), tire shop double-entry ERP, and yarn store e-commerce.",
      "OpenClaw Security Agent: Autonomous AI server security agent with LLM log anomaly diagnosis, SSH fail2ban, and Telegram alerts.",
    ],
  },
  {
    period: "Mar 2022 - Nov 2022",
    title: "Fullstack Developer",
    company: "Software House, Surabaya, Indonesia",
    description:
      "Built high-performance web applications using Node.js and Next.js, optimizing complex SQL queries for high-concurrency transactions, managing self-hosted Git servers, and configuring Elasticsearch clusters.",
    achievements: [
      "Database Recovery & Data Repair: Recovered and repaired 10,000+ corrupted database records by identifying and patching edge-case business logic bugs.",
      "Infrastructure & Log Indexing: Maintained self-hosted Git servers, configured Elasticsearch clusters for log indexing, and upgraded enterprise Java runtimes.",
      "Incident & Ticket Elimination: Resolved recurring high-priority incidents by diagnosing and fixing core backend bottlenecks.",
    ],
  },
  {
    period: "Sep 2019 - Feb 2022",
    title: "Full-Stack Developer",
    company: "PT Pabrik Kertas Tjiwi Kimia Tbk, Indonesia",
    description:
      "Developed manufacturing dashboards and reporting systems for pulp & paper production using .NET Core, C#, ASP Classic, and SQL Server.",
    achievements: [
      "Automated OEE & HWT Metrics Reporting: Built an automated WhatsApp alert bot using Python, Java, and Selenium, capturing real-time production metrics for plant OEE and HWT targets.",
      "Android Barcode Scanner: Designed and deployed a native Android Barcode Scanner application for warehouse inventory tracking.",
      "Enterprise Internal Applications: Delivered an automated COVID-19 employee health check-in platform and digital corporate raffle draw systems.",
    ],
  },
];

const experiencesId = [
  {
    period: "Nov 2022 - Mar 2026",
    title: "Fullstack Developer",
    company: "MRI Software (formerly Anacle Systems), Singapura (Remote)",
    description:
      "Mengembangkan & memelihara platform SaaS enterprise (Anacle Simplicity & SMRT Tenant Management System) menggunakan .NET Core, .NET Framework 4.8, Next.js, dan NestJS.",
    achievements: [
      "Go-Live SMRT Tenant Management: Sukses rilis platform SaaS manajemen penyewa mall SMRT Singapore (digitasi tender, aplikasi tenant, leasing).",
      "Pipeline RAG Produksi: Mengimplementasikan pipeline RAG berbasis OpenAI API & pgvector untuk pencarian semantik dokumen dan pelaporan otomatis.",
      "Go-Live SharePoint Document Migration: Microservice migrasi dokumen syncing 100.000+ file ke SharePoint Graph API, AWS S3, & Azure Blob (RBAC & audit).",
      "Pengujian Regresi Otomatis: Refactoring stored procedure .NET legacy dan membuat automated regression test menggunakan Selenium & Playwright.",
      "SonarQube Security Pipeline: Memimpin analisis kode statis di beberapa proyek enterprise & menerapkan quality gates CI/CD berstandar zero-vulnerability.",
    ],
  },
  {
    period: "2021 - Sekarang",
    title: "Freelance & Side Projects",
    company: "Berbagai Klien & SaaS Mandiri",
    description:
      "Merancang & membangun berbagai platform POS, ERP, dan aplikasi AI (Qualiv AI Recruitment, Stock Portfolio AI, Nagamasban AI Sales Assistant, E-Commerce, POS Toko Benang, POS Emas RFID).",
    achievements: [
      "Qualiv Founder & Architect: Platform SaaS rekruitmen AI multi-tenant untuk screening CV, tes logika kandidat, & simulasi wawancara AI.",
      "Solusi Retail Enterprise: Mengembangkan POS Emas RFID (memangkas audit stok dari 2 jam ke 3 menit), ERP Ban A/R & A/P, dan E-Commerce benang.",
      "OpenClaw Security Agent: Agen keamanan VPS berbasis AI otomatis dengan fail2ban & notifikasi insiden Telegram.",
    ],
  },
  {
    period: "Mar 2022 - Nov 2022",
    title: "Fullstack Developer",
    company: "Software House, Surabaya, Indonesia",
    description:
      "Mengembangkan aplikasi web berbasis Node.js dan Next.js, mengoptimalkan kueri SQL performa tinggi, serta mengelola infrastruktur Elasticsearch & Git server.",
    achievements: [
      "Database Recovery & Data Repair: Memperbaiki & membersihkan 10.000+ data database terkorupsi akibat bug edge-case legacy code.",
      "Infrastruktur & Indexing Log: Memelihara server Git mandiri, konfigurasi cluster Elasticsearch untuk log indexing, dan upgrade runtime Java enterprise.",
      "Incident & Bottleneck Fix: Menyelesaikan bottleneck arsitektur utama & mengeliminasi tiket insiden high-priority berulang.",
    ],
  },
  {
    period: "Sep 2019 - Feb 2022",
    title: "Full-Stack Developer",
    company: "PT Pabrik Kertas Tjiwi Kimia Tbk, Indonesia",
    description:
      "Mengembangkan aplikasi web manufaktur dengan .NET Core, C#, ASP Classic, & SQL Server untuk industri kertas & pulp.",
    achievements: [
      "Automated OEE & HWT Metric Bot: WhatsApp Bot (Python, Java, Selenium) otomatisasi laporan analitik pabrik real-time untuk pencapaian target OEE & HWT.",
      "Android Barcode Scanner: Merancang & merilis aplikasi native Android pemindai barcode stok gudang real-time (stock-in/out).",
      "Enterprise Internal Applications: Sistem web check-in & contact tracing harian karyawan se-perusahaan serta digital corporate raffle draw.",
    ],
  },
];

export default function About() {
  const { lang } = useLanguage();
  const experiences = lang === "id" ? experiencesId : experiencesEn;

  const features = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Building end-to-end solutions from frontend to backend with modern technologies.",
    },
    {
      icon: Server,
      title: "Backend Specialist",
      description: ".NET Core, Node.js, Nest.js, Laravel - optimized for performance and scalability.",
    },
    {
      icon: Layers,
      title: "Frontend Excellence",
      description: "Next.js, React, Flutter - crafting beautiful and responsive user interfaces.",
    },
    {
      icon: Database,
      title: "Database Design",
      description: "PostgreSQL, MySQL, SQL Server, MongoDB - optimized queries and data architecture.",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "AWS, Azure, Docker, CI/CD pipelines - deploying and scaling applications.",
    },
    {
      icon: Zap,
      title: "API Integration",
      description: "RESTful APIs, GraphQL, third-party integrations including OpenAI, DBS Bank, SharePoint.",
    },
  ];

  return (
    <section id="about" className="relative">
      <SectionHead index="01" label={lang === "id" ? "Tentang Saya" : "About Me"} />

      <div className="px-[var(--pad-x)] py-[var(--sec-sm)]">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo + bio + badges */}
          <Reveal>
            <div className="relative w-full max-w-sm aspect-square overflow-hidden rounded-2xl border border-[var(--line)] shadow-2xl">
              <Image
                src="/img/foto.jpg"
                alt="Andry Huang"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>

            <p className="mt-8 max-w-prose text-[var(--t-body)] leading-relaxed text-[var(--fg-2)]">
              {lang === "id" ? (
                <>
                  Senior Fullstack & AI Engineer dengan 7+ tahun pengalaman merancang dan membangun platform
                  enterprise SaaS, sistem terdistribusi, dan aplikasi AI produksi. Keahlian utama: .NET Core,
                  Next.js, Node.js, NestJS, optimasi kueri SQL performa tinggi, dan pipeline LLM RAG.
                  Berpengalaman dalam tim remote internasional dan pengiriman arsitektur konkurensi tinggi yang aman.
                </>
              ) : (
                <>
                  Senior Fullstack & AI Engineer with 7+ years of experience architecting and building enterprise
                  SaaS platforms, distributed systems, and production AI tools. Core stack: .NET Core, Next.js,
                  Node.js, NestJS, SQL performance tuning, and LLM RAG pipelines. Proven background delivering
                  secure, high-concurrency architectures with international remote engineering teams.
                </>
              )}
            </p>

            <div className="mt-6 flex flex-wrap gap-6 font-mono text-xs uppercase tracking-[0.14em] text-[var(--mut)]">
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" aria-hidden />
                Surabaya, Indonesia
              </span>
              <span className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5" aria-hidden />
                S1 Teknik Informatika (Computer Science)
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="/Andry_Huang_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--bg)] font-mono text-xs font-semibold uppercase tracking-[0.1em] hover:opacity-90 transition-opacity"
              >
                <FileText className="w-4 h-4" aria-hidden />
                {lang === "id" ? "Lihat / Unduh CV (PDF)" : "View / Download CV (PDF)"}
              </a>
              <a
                href="/Andry_Huang_CV.docx"
                download
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--line)] bg-white/5 text-[var(--fg-2)] font-mono text-xs uppercase tracking-[0.1em] hover:bg-white/10 hover:text-[var(--fg)] transition-all"
              >
                <Download className="w-4 h-4" aria-hidden />
                {lang === "id" ? "Format DOCX" : "DOCX Format"}
              </a>
            </div>
          </Reveal>

          {/* Feature list */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.06}>
                <feature.icon className="w-5 h-5 text-[var(--accent)] mb-3" aria-hidden />
                <h3 className="font-medium text-[var(--fg)] mb-1.5">{feature.title}</h3>
                <p className="text-sm text-[var(--mut)] leading-relaxed">{feature.description}</p>
              </Reveal>
            ))}
          </div>
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
                <p className="text-sm leading-relaxed text-[var(--fg-2)]">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-[var(--line)] pt-4">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs leading-normal text-[var(--fg-2)]">
                        <span className="mt-0.5 shrink-0 text-[var(--accent)]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
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
    <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mut)]">{children}</h3>
  );
}
