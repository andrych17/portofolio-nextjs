"use client";

import Image from "next/image";
import { Code2, Database, Cloud, Server, Layers, Zap, MapPin, GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/Label";

const experiencesEn = [
  {
    period: "Nov 2022 - Mar 2026",
    title: "Fullstack Developer",
    company: "MRI Software (formerly Anacle Systems), Singapore (Remote)",
    description:
      "Engineered and maintained enterprise SaaS platforms (Anacle Simplicity & SMRT Tenant Management System) using .NET Core, .NET Framework 4.8, Next.js, and NestJS. Integrated enterprise APIs including Bank APIs and SharePoint.",
    achievements: [
      "Go-Live SMRT Tenant Management: Delivered enterprise tenant platform digitizing mall tenders, leasing, and tenant operations.",
      "Go-Live SharePoint Document Migration: Synced 100,000+ enterprise files to SharePoint Graph API, AWS S3, and Azure Blob with RBAC & audit logging.",
      "SonarQube Security & Quality Pipeline: Spearheaded static code analysis across multiple internal enterprise projects and enforced automated CI/CD quality gates.",
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
      "Developed scalable web apps using Node.js and Next.js, optimizing high-concurrency SQL queries, managing self-hosted Git servers, and configuring Elasticsearch infrastructure.",
    achievements: [
      "Database Cleanup & Recovery: Repaired & cleaned 10,000+ corrupted database records caused by legacy code logic bugs.",
      "Incident & Ticket Elimination: Resolved core architectural bottlenecks, eliminating recurring high-priority incident tickets.",
    ],
  },
  {
    period: "Sep 2019 - Feb 2022",
    title: "Full-Stack Developer",
    company: "PT Tjiwi Kimia, Indonesia",
    description:
      "Developed enterprise web solutions and internal reporting modules for pulp & paper manufacturing using .NET Core, C#, ASP Classic, and SQL Server.",
    achievements: [
      "Automated OEE & HWT Metrics Reporting: Built Python/Java WhatsApp bot for real-time production analytics dispatches enabling plant target machine performance.",
      "Android Barcode Scanner: Deployed native Android app for real-time warehouse inventory stock-in / stock-out tracking.",
      "COVID-19 Employee Health Survey: Automated company-wide pandemic check-ins & contact tracing web app.",
    ],
  },
];

const experiencesId = [
  {
    period: "Nov 2022 - Mar 2026",
    title: "Fullstack Developer",
    company: "MRI Software (formerly Anacle Systems), Singapura (Remote)",
    description:
      "Mengembangkan & memelihara aplikasi SaaS enterprise (Anacle Simplicity & SMRT Tenant Management System) menggunakan .NET Core, Next.js, dan NestJS. Mengintegrasikan API perbankan & SharePoint.",
    achievements: [
      "Go-Live SMRT Tenant Management: Sukses rilis platform SaaS manajemen penyewa mall SMRT Singapore (digitasi tender, aplikasi tenant, leasing).",
      "Go-Live SharePoint Document Migration: Engine migrasi dokumen syncing 100.000+ file ke SharePoint Graph API, AWS S3, & Azure Blob (RBAC & audit).",
      "SonarQube Quality Pipeline: Memimpin analisis kode statis di beberapa proyek enterprise & me-enforce zero-vulnerability quality gates di CI/CD.",
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
      "Database Cleanup & Data Recovery: Memperbaiki & membersihkan 10.000+ data database terkorupsi akibat bug legacy code.",
      "Incident & Ticket Elimination: Menyelesaikan bottleneck arsitektur utama & mengeliminasi tiket insiden high-priority berulang.",
    ],
  },
  {
    period: "Sep 2019 - Feb 2022",
    title: "Full-Stack Developer",
    company: "PT Tjiwi Kimia, Indonesia",
    description:
      "Mengembangkan aplikasi web manufaktur dengan .NET Core, C#, ASP Classic, & SQL Server untuk industri kertas & pulp.",
    achievements: [
      "Automated OEE & HWT Metric Bot: WhatsApp Bot (Python/Selenium) otomatisasi laporan analitik pabrik real-time untuk pencapaian OEE & HWT.",
      "Android Barcode Scanner: Membangun aplikasi native Android pemindai barcode stok gudang real-time (stock-in/out).",
      "COVID-19 Health Survey App: Sistem web check-in & contact tracing harian karyawan se-perusahaan.",
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
                  Ahli dalam .NET Core, Next.js, React, Node.js, optimasi SQL data besar, integrasi API
                  perbankan/SharePoint, serta arsitektur AI agent & MCP. Berpengalaman dalam tim remote
                  internasional dan pengembangan produk dari nol hingga rilis produksi.
                </>
              ) : (
                <>
                  Skilled in .NET Core, .NET Framework, SQL optimization, API integrations, and modern frontend
                  frameworks such as Next.js and React. Experienced working in remote international teams and
                  delivering end-to-end features across backend, frontend, and operational environments.
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
