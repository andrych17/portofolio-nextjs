"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Users,
  PieChart,
  Activity,
  Building2,
  Cloud,
  Store,
  ShieldCheck,
  Wrench,
  FileBarChart,
  Bot,
  ScanLine as ScanLineIcon,
  HeartPulse,
  Package,
  Gem,
  CircleDot,
  Cookie,
  Brain,
  ShoppingBag,
  Factory,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Github,
  Search,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export type ProjectStatus = "done" | "in-progress" | "terminated";
export type GroupKey = "tjiwi" | "tool-mgmt" | "anacle" | "freelance";

export interface Project {
  id: number;
  group: GroupKey;
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  impact?: string;
  year?: string;
  images?: string[];
  emoji?: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  color: string;
  status?: ProjectStatus;
  liveUrl?: string;
  liveLabel?: string;
  links?: { url: string; label: string }[];
  featured?: boolean;
}

export const projects: Project[] = [
  // ── JOB #1 — PT Tjiwi Kimia ───────────────────────────────
  {
    id: 101,
    group: "tjiwi",
    title: "Internal Reporting System",
    description:
      "Developed dozens of internal reports with heavily optimized SQL queries for a large pulp & paper manufacturer. Cut long-running report times from minutes to seconds. Mixed ASP Classic with .NET for newer modules.",
    impact:
      "Mengoptimalkan kueri laporan data besar dari hitungan menit menjadi detik untuk operasional pabrik kertas & pulp.",
    year: "2017 – 2021",
    emoji: "📊",
    icon: FileBarChart,
    tags: [
      "ASP Classic",
      "VBScript",
      ".NET Framework",
      "SQL Server",
      "T-SQL Stored Procedures",
      "Query Optimization",
      "IIS",
    ],
    color: "from-amber-500 to-orange-500",
    featured: true,
  },
  {
    id: 102,
    group: "tjiwi",
    title: "WhatsApp Scheduler Bot",
    description:
      "Selenium-based scheduler that auto-captures dashboard screenshots and pushes them via WhatsApp Web to stakeholders on a fixed cadence.",
    impact:
      "Otomatisasi pengiriman laporan analitik produksi real-time (OEE & HWT) via WhatsApp Web ke jajaran manajemen.",
    year: "2020 – 2021",
    emoji: "🤖",
    icon: Bot,
    tags: [
      "Python 3",
      "Selenium Webdriver",
      "WhatsApp Web API",
      "Headless Chrome",
      "Windows Task Scheduler",
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 103,
    group: "tjiwi",
    title: "Barcode Scanner Mobile App",
    description:
      "Mobile app for stationery & inventory management with barcode scanning to track stock-in / stock-out at the warehouse counter.",
    impact:
      "Digitalisasi pemindaian barcode stok gudang real-time untuk mempercepat pencatatan stock-in/out.",
    year: "2019 – 2020",
    emoji: "📱",
    icon: ScanLineIcon,
    tags: [
      "Android Native",
      "Barcode Scanner SDK",
      ".NET Web API",
      "C#",
      "SQL Server",
      "REST API",
    ],
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 104,
    group: "tjiwi",
    title: "Covid Employee Health Survey",
    description:
      "Internal web app to monitor employee health status during the pandemic, used company-wide for daily check-ins and contact-tracing reports.",
    impact:
      "Digunakan se-perusahaan untuk daily check-in kesehatan karyawan & contact tracing selama masa pandemi.",
    year: "2020",
    emoji: "🩺",
    icon: HeartPulse,
    tags: [
      ".NET Framework",
      "C#",
      "ASP.NET MVC",
      "SQL Server",
      "Bootstrap",
      "HTML5/CSS3",
    ],
    color: "from-rose-500 to-pink-500",
  },

  // ── JOB #2 — Software House (Surabaya) ────────────────────
  {
    id: 201,
    group: "tool-mgmt",
    title: "Tool Management System (TMS)",
    description:
      "Maintained and improved a legacy enterprise Tool Management System. Drove a Java version upgrade, large refactor, and code-review process — significantly reducing incident tickets quarter over quarter.",
    impact:
      "Membersihkan 10.000+ data terkorupsi dari bug legacy code & memangkas insiden tiket high-priority berulang.",
    year: "Mar 2022 – Nov 2022",
    emoji: "🛠️",
    icon: Wrench,
    tags: [
      "Java 17",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "Oracle Database",
      "Maven",
      "JUnit",
      "Code Refactoring",
    ],
    color: "from-orange-500 to-red-500",
    featured: true,
  },

  // ── JOB #3 — Anacle / MRI Software (Singapore) ────────────
  {
    id: 301,
    group: "anacle",
    title: "SonarQube Code Quality Pipeline",
    description:
      "Set up and rolled out SonarQube across multiple internal .NET projects. Defined quality gates, integrated with CI/CD, and onboarded teams onto the platform.",
    impact:
      "Pelopor analisis kode statis di beberapa proyek enterprise & me-enforce zero-vulnerability quality gates di CI/CD.",
    year: "2023 – 2024",
    emoji: "🛡️",
    icon: ShieldCheck,
    tags: [
      "SonarQube Server",
      "CI/CD Pipelines",
      "Azure DevOps",
      ".NET Core",
      "C#",
      "Static Code Analysis",
      "Quality Gates",
    ],
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 302,
    group: "anacle",
    title: "SMRT Tenant Management System",
    description:
      "Development & maintenance of a mall tenant management platform for SMRT Singapore — leasing, billing, and tenant operations on a SaaS deployment. Newer modules built with Next.js + Nest.js on top of the legacy .NET core.",
    impact:
      "Sukses rilis platform SaaS manajemen penyewa mall SMRT Singapore (digitasi tender, aplikasi tenant, & operasi penyewa).",
    year: "2023 – 2025",
    emoji: "🏬",
    icon: Store,
    tags: [
      "Next.js 14",
      "NestJS",
      "TypeScript",
      ".NET Core 8",
      "SQL Server",
      "Tailwind CSS",
      "Enterprise SaaS",
      "REST API",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 303,
    group: "anacle",
    title: "Simplicity — Facilities Management SaaS",
    description:
      "Feature development and ticket-based maintenance on Simplicity, Anacle/MRI's enterprise facilities-management product. International remote team, cross-region releases.",
    impact:
      "Mengembangkan & memelihara modul SaaS enterprise facilities management untuk klien internasional.",
    year: "2023 – Mar 2026",
    emoji: "🏢",
    icon: Building2,
    tags: [
      ".NET Core 8",
      "C#",
      "SQL Server",
      "RESTful Services",
      "Microservices",
      "Enterprise SaaS",
      "GitLab CI",
    ],
    color: "from-blue-500 to-indigo-500",
    liveUrl: "https://www.anaclesimplicity.com/",
    liveLabel: "anaclesimplicity.com",
    featured: true,
  },
  {
    id: 304,
    group: "anacle",
    title: "Cloud Document Integration (SharePoint / AWS / Azure)",
    description:
      "Built an integration layer to upload documents from the database into SharePoint, AWS S3, and Azure Blob — with full RBAC, access control, and audit logging. Front-end in Next.js, service layer in Nest.js.",
    impact:
      "Engine migrasi dokumen syncing 100.000+ file enterprise ke SharePoint Graph API, AWS S3, & Azure Blob (RBAC & audit logging).",
    year: "2024 – 2025",
    emoji: "☁️",
    icon: Cloud,
    tags: [
      "Next.js 14",
      "NestJS",
      "TypeScript",
      ".NET Core 8",
      "SharePoint Graph API",
      "AWS S3 SDK",
      "Azure Blob Storage",
      "RBAC",
    ],
    color: "from-cyan-500 to-teal-500",
  },

  // ── SIDE PROJECTS — Done (Newest to Oldest) ───────────────
  {
    id: 504,
    group: "freelance",
    status: "done",
    title: "Qualiv — AI Recruitment Platform (Founder)",
    description:
      "Founder & Lead Architect. Multi-tenant AI recruitment SaaS platform: CV screening, candidate scoring, and interview workflows powered by OpenAI & Redis queue.",
    longDescription:
      "Founder & Lead Architect dari Qualiv (qualiv.id). Platform SaaS rekruitmen berbasis AI multi-tenant yang dibangun dari nol (end-to-end architecture & product design) untuk mengotomatisasi seleksi berkas CV, tes logika kandidat, simulasi wawancara chat/video AI, penilaian kualifikasi pelamar, dan pembuatan ringkasan asesmen secara obyektif.",
    features: [
      "Screening & Parsing CV otomatis berbasis LLM (PDF/Docx)",
      "Simulasi Wawancara AI Chat & Video Interview (LLM Interviewer)",
      "Tes Logika & Asesmen Keterampilan Kandidat Otomatis (Real-Time Scoring)",
      "Sistem Penilaian & Match Score kandidat terhadap kualifikasi posisi",
      "Pemrosesan Antrean Berkas Massal (Redis Queue)",
      "Sistem Langganan & Billing Midtrans terintegrasi",
      "Penyimpanan Dokumen Aman Cloudflare R2 & Postgres Storage",
    ],
    impact:
      "Mendirikan platform SaaS rekruitmen AI yang mengotomatisasi screening CV, tes logika, dan simulasi wawancara kandidat secara terpusat.",
    images: [
      "/projects/qualiv_landing.png",
      "/projects/qualiv_dashboard.png",
      "/projects/qualiv_kandidat.png",
      "/projects/qualiv_jobs.png",
    ],
    emoji: "🧠",
    icon: Users,
    tags: [
      "Founder & Architect",
      "AI Video & Chat Interview",
      "Candidate Logic Test",
      "Next.js 16",
      "NestJS",
      "OpenAI GPT-4o API",
      "PostgreSQL",
      "Prisma ORM",
      "Redis Worker",
      "Redis",
      "Cloudflare R2",
      "Midtrans",
    ],
    color: "from-violet-500 to-fuchsia-500",
    liveUrl: "https://qualiv.id",
    liveLabel: "qualiv.id",
    featured: true,
  },
  {
    id: 505,
    group: "freelance",
    status: "done",
    title: "AI Stock Portfolio Manager",
    description:
      "Personal AI assistant for stock portfolio management: holdings tracking, allocation insights, and LLM-assisted analysis of positions.",
    longDescription:
      "Asisten pribadi manajemen portofolio saham berbasis AI yang menganalisis alokasi aset, laporan keuangan emiten, serta memberikan rangkuman sentimen pasar secara otomatis.",
    features: [
      "Pelacakan Kepemilikan Saham (Holdings) & Alokasi Portofolio real-time",
      "Rangkuman AI Laporan Keuangan Emiten & Sentimen Berita Pasar",
      "Visualisasi Grafik Interaktif Saham (Lightweight Charts)",
      "Kalkulator Risk Exposure, Target Price, & Margin of Safety",
      "Chatbot Asisten Analisis Saham Pribadi terintegrasi LLM",
    ],
    impact:
      "Mempercepat keputusan investasi harian melalui analisis data emiten & portofolio berbasis AI.",
    images: [
      "/projects/saham_dashboard.png",
      "/projects/saham_portfolio.png",
      "/projects/saham_chat.png",
      "/projects/saham_broker.png",
    ],
    emoji: "📉",
    icon: PieChart,
    tags: [
      "Next.js 16",
      "NestJS",
      "Python 3 FastAPI",
      "OpenAI GPT-4o",
      "PostgreSQL",
      "Lightweight Charts",
      "Docker Compose",
    ],
    color: "from-sky-500 to-indigo-500",
  },
  {
    id: 506,
    group: "freelance",
    status: "done",
    title: "OpenClaw — AI-Powered VPS Security & Ops Agent",
    description:
      "Automated server security and health monitoring agent powered by AI. Performs LLM log anomaly analysis, SSH brute force detection, fail2ban mitigations, system resource thresholds, and real-time Telegram alert reports.",
    longDescription:
      "Agen pemantau keamanan & operasional server cerdas berbasis AI (OpenClaw) yang berjalan di VPS remote (seperti server Qualiv & Netadm). Mengintegrasikan LLM untuk analisis anomali log otomatis, kecerdasan deteksi insiden, audit keamanan SSH, mitigasi serangan brute force (fail2ban), pemantauan CPU/Memori/Disk, serta pengiriman laporan insiden otomatis via Telegram Bot.",
    features: [
      "Analisis Anomali Log Berbasis AI (LLM Diagnosis Akar Masalah Syslog & Auth Logs)",
      "Audit Otomatis Keamanan SSH & Deteksi Serangan Brute Force (Auth Logs)",
      "Integrasi Fail2ban & Auto-IP Banning 24h/72h untuk IP penyerang",
      "Notifikasi Laporan Insiden Real-time & Ringkasan AI Daily Summary via Telegram Bot",
      "Pemantauan Beban Server (CPU, RAM, Disk Usage, & Network Traffic)",
      "Audit Kerentanan Konfigurasi Service, Package Updates, & Gateway Proxies",
    ],
    impact:
      "Mengotomatisasi analisis insiden log dengan AI, memblokir serangan SSH secara real-time, & memberikan ringkasan status operasional server Qualiv ke Telegram.",
    images: ["/projects/openclaw.png"],
    emoji: "🦞",
    icon: Activity,
    tags: [
      "Node.js",
      "OpenAI GPT-4o API",
      "AI Log Analysis",
      "Telegram Bot API",
      "Linux System Audit",
      "Fail2ban",
      "SSH Security",
      "DevOps Alerting",
      "Bash",
      "Docker",
    ],
    color: "from-lime-500 to-emerald-600",
  },
  {
    id: 502,
    group: "freelance",
    status: "done",
    title: "PT Nagamasban — AI Sales Assistant",
    description:
      "AI assistant for PT Nagamasban tire distributor: sales recommendation engine & interactive training material for store sales reps.",
    longDescription:
      "Asisten AI cerdas untuk tim sales distributor ban PT Nagamasban. Merekomendasikan tipe & merk ban yang paling sesuai dengan kendaraan, gaya mengemudi, dan budget pelanggan secara presisi.",
    features: [
      "AI Recommendation Engine berbasis LLM (OpenAI GPT-4o)",
      "Pencocokan spesifikasi ban berdasarkan merk/tipe mobil & ukuran velg",
      "Modul Training & Script Sales interaktif untuk staf toko baru",
      "Pencarian cepat katalog ban dengan rekomendasi alternatif stok",
      "Dashboard Admin untuk pembaruan basis pengetahuan & harga ban",
    ],
    impact:
      "Meningkatkan rasio upsell tim sales sebesar 25% dan mempercepat waktu konsultasi pelanggan.",
    images: ["/projects/ban1.png", "/projects/ban2.png"],
    icon: Sparkles,
    tags: [
      "Next.js 16",
      "NestJS",
      "OpenAI GPT-4o API",
      "Vector Embeddings",
      "TypeScript",
      "Tailwind CSS",
      "AI/ML",
    ],
    color: "from-emerald-500 to-teal-500",
    featured: true,
    links: [
      { url: "https://katalog.nagamasban.com", label: "katalog.nagamasban.com" },
      { url: "https://nagamasban.com", label: "nagamasban.com" },
    ],
  },
  {
    id: 501,
    group: "freelance",
    status: "done",
    title: "Knit and Cro — Online Storefront",
    description:
      "Live storefront for Knit and Cro Pluit: Midtrans payment, dynamic shipping, and transaction management connected to in-store inventory.",
    longDescription:
      "Platform e-commerce resmi Knit and Cro yang terhubung langsung dengan inventaris toko fisik. Dilengkapi pembayaran otomatis Midtrans & kalkulasi ongkos kirim ke seluruh Indonesia.",
    features: [
      "Katalog Online interaktif dengan filter benang, warna, & jarum rajut",
      "Integrasi Payment Gateway Midtrans (QRIS, Bank Transfer, E-Wallet)",
      "Perhitungan Ongkir Otomatis RajaOngkir (JNE, TIKI, Pos Indonesia)",
      "Dashboard Admin Pengelolaan Pesanan, Resi Pengiriman, & Retur",
      "Sinkronisasi Stok otomatis antara toko online & gudang fisik",
    ],
    impact:
      "Meningkatkan jangkauan penjualan ke seluruh Indonesia 24/7 tanpa menambah beban operasional toko fisik.",
    images: ["/projects/retail2.png", "/projects/retail3.png"],
    icon: ShoppingBag,
    tags: [
      "Laravel 11",
      "Livewire 3",
      "Midtrans Payment Gateway",
      "RajaOngkir Shipping API",
      "MySQL 8",
      "Tailwind CSS",
      "E-Commerce",
    ],
    color: "from-fuchsia-500 to-pink-500",
    liveUrl: "https://knitandcro.com",
    liveLabel: "knitandcro.com",
    featured: true,
  },
  {
    id: 401,
    group: "freelance",
    status: "done",
    title: "Knit and Cro Pluit — Yarn Store System",
    description:
      "Full inventory & sales platform for Knit and Cro yarn store in Pluit, Jakarta. Multi-variant master data, POS cashier, real-time stock opname, and RBAC.",
    longDescription:
      "Sistem operasional retail terintegrasi untuk toko benang rajut Knit and Cro Pluit. Mengelola kompleksitas varian produk benang (kategori berat, lot pencelupan warna, supplier & buyer) serta transaksi kasir harian.",
    features: [
      "Modul Kasir / POS cepat dengan pencarian varian warna & lot pencelupan",
      "Stock Opname real-time dengan audit selisih persediaan otomatis",
      "Purchasing Order (PO) & Manajemen Supplier terpusat",
      "Laporan penjualan harian, margin keuntungan, & histori mutasi barang",
      "Role-Based Access Control (RBAC) untuk Owner, Kasir, & Gudang",
    ],
    impact:
      "Mengeliminasi selisih stok benang fisik hingga 95% & mempercepat proses checkout kasir.",
    images: ["/projects/trdretail1.png", "/projects/trdretail2.png"],
    icon: Package,
    tags: [
      "Laravel 11",
      "Livewire 3",
      "MySQL 8",
      "Tailwind CSS v4",
      "Alpine.js",
      "PHP 8.3",
      "RBAC",
      "POS System",
    ],
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 402,
    group: "freelance",
    status: "done",
    title: "Wijaya Mas Pluit — Jewelry Store with RFID",
    description:
      "POS and inventory system for Wijaya Mas jewelry store in Pluit. RFID-based per-item tagging for fast, accurate stock identification.",
    longDescription:
      "Platform POS dan inventaris toko emas & perhiasan Wijaya Mas Pluit yang terintegrasi dengan pemindai RFID hardware untuk identifikasi stok emas nirkabel tanpa perlu scan barcode satu per satu.",
    features: [
      "Integrasi Pemindai RFID hardware untuk pembacaan stok nirkabel baki perhiasan",
      "Kalkulator Otomatis Harga Emas Harian, kadar karat, & ongkos cetak",
      "Modul Buyback / Tukar Tambah dengan perhitungan potongan transparan",
      "Master Data Perhiasan lengkap dengan foto & sertifikat keaslian",
      "Otorisasi bertingkat untuk Owner, Staf Toko, & Auditor Stok",
    ],
    impact:
      "Memangkas waktu audit stok harian emas dari 2 jam menjadi 3 menit menggunakan pemindaian RFID massal.",
    images: ["/projects/trdjewel1.png", "/projects/trdjewel2.png"],
    icon: Gem,
    tags: [
      "Laravel 11",
      "Livewire 3",
      "RFID Hardware Integration",
      "Serial Port Bridge",
      "MySQL 8",
      "Tailwind CSS",
      "POS System",
    ],
    color: "from-amber-400 to-yellow-500",
  },
  {
    id: 403,
    group: "freelance",
    status: "done",
    title: "Cahaya Terang Surabaya — Tire Shop ERP",
    description:
      "End-to-end management system for Cahaya Terang tire business in Surabaya: sales, purchasing, inventory, and full A/R & A/P ledger tracking.",
    longDescription:
      "Sistem operasional dan akuntansi bisnis retail/grosir ban Cahaya Terang Surabaya. Dilengkapi pelacakan Piutang Pelanggan & Hutang Supplier (A/R & A/P) terintegrasi untuk kontrol arus kas bisnis.",
    features: [
      "Modul Penjualan & Pembelian khusus spesifikasi ban (ukuran rim, pattern, load index)",
      "Buku Besar Piutang & Hutang (A/R & A/P Ledger) dengan batas kredit pelanggan",
      "Peringatan jatuh tempo giro & pelacakan status pembayaran bertahap",
      "Laporan keuangan arus kas (Cashflow), laba rugi, & umur piutang",
      "Manajemen multi-gudang dan histori mutasi barang",
    ],
    impact:
      "Memberikan visibilitas real-time terhadap piutang berjalan, mengurangi risiko gagal bayar pelanggan sebesar 40%.",
    images: ["/projects/trdtire1.png", "/projects/trdtire2.png"],
    icon: CircleDot,
    tags: [
      "Laravel 11",
      "Livewire 3",
      "MySQL 8",
      "Double-Entry Bookkeeping",
      "A/R & A/P Ledger",
      "Tailwind CSS",
      "RBAC",
    ],
    color: "from-slate-500 to-gray-700",
  },
  {
    id: 404,
    group: "freelance",
    status: "done",
    title: "Tiga Putra — Snack & Grocery Store",
    description:
      "End-to-end management system for a snack & grocery wholesale/retail store. Covers PO/SO, Returns, Expiry Date Tracking, and operational reporting.",
    longDescription:
      "Sistem manajemen usaha grosir & eceran sembako/snack Tiga Putra. Mengelola siklus pengadaan barang (PO), penjualan grosir/eceran (SO), retur barang rusak/kadaluarsa, serta analisis keuntungan operasional.",
    features: [
      "Manajemen Purchase Order (PO) & Sales Order (SO) grosir/retail",
      "Sistem Retur Penjualan & Pembelian otomatis memotong saldo stok/hutang",
      "Stock Opname & Pelacakan tanggal kadaluarsa (Expiry Date / FIFO)",
      "Cetak Nota / Invois faktur dan surat jalan pengiriman",
      "Otorisasi role pengguna (Owner, Admin, Kasir, & Gudang)",
    ],
    impact:
      "Mengoptimalkan rotasi persediaan barang (FIFO) & mempercepat pembuatan nota pesanan grosir.",
    images: ["/projects/tigaputra.png", "/projects/tigaputra2.png"],
    icon: Cookie,
    tags: [
      "Laravel 11",
      "Livewire 3",
      "MySQL 8",
      "PO/SO Engine",
      "FIFO Expiry Tracking",
      "Tailwind CSS",
      "RBAC",
    ],
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 405,
    group: "freelance",
    status: "done",
    title: "Quiz Management App — Community Edition",
    description:
      "Volunteer project: a logic-test & quiz assessment platform built for community organizations. Real-time scoring, user management, and analytics dashboard.",
    longDescription:
      "Platform ujian & kuis interaktif yang dibangun untuk komunitas organisasi & edukasi. Mendukung penilaian ujian otomatis, analitik nilai, dan manajemen peserta.",
    features: [
      "Pembuatan Bank Soal Kuis & Tes Logika interaktif",
      "Penilaian otomatis real-time dengan leaderboard skor peserta",
      "Manajemen pengguna, sesi kuis, & pembatasan waktu ujian",
      "Dashboard analitik distribusi nilai & statistik jawaban peserta",
    ],
    impact:
      "Memfasilitasi ujian komunitas secara digital tanpa perlu pemeriksa kertas manual.",
    images: [
      "/projects/logic_test.png",
      "/projects/logic_test2.png",
      "/projects/logic_test3.png",
    ],
    icon: Brain,
    tags: [
      "Next.js 15",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "WebSockets",
      "Tailwind CSS",
    ],
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 406,
    group: "freelance",
    status: "done",
    title: "CG Home Sharing & Booking Platform",
    description:
      "Airbnb-style CG (Connect Group) house sharing & booking platform for church communities. Allows home owners to list houses/rooms for CG meetings, surveyor inspection workflow, Leaflet map search, and contract management.",
    longDescription:
      "Platform manajemen & peminjaman rumah Connect Group (CG) berbasis lokasi (Airbnb-style) untuk komunitas jemaat. Memungkinkan jemaat pemilik rumah (Home Owner) mendaftarkan lokasi rumah/ruangan untuk kegiatan CG, workflow verifikasi oleh Surveyor, pencarian peta interaktif Leaflet, serta manajemen kontrak & alokasi penggunaan ruangan.",
    features: [
      "Pendaftaran Rumah & Ruangan CG (Airbnb-style Listing & Spesifikasi Fasilitas)",
      "Peta Interaktif Leaflet dengan Filter Wilayah BPS (Provinsi/Kota/Kecamatan)",
      "Workflow Verifikasi & Inspeksi Kelayakan Rumah oleh Surveyor & Admin",
      "Manajemen Kontrak Peminjaman Ruangan CG & Jadwal Penggunaan",
      "Integrasi Single Sign-On (SSO) & Verifikasi Nomor Induk Jemaat (NIJ)",
    ],
    impact:
      "Mengotomatisasi pencarian & alokasi tempat ibadah Connect Group (CG) komunitas jemaat secara tepat lokasi & efisien.",
    images: [
      "/projects/gms1.png",
      "/projects/gms2.png",
    ],
    emoji: "🏡",
    icon: Building2,
    tags: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "Leaflet Maps API",
      "Tailwind CSS v4",
      "SSO & NIJ Verification",
      "Zustand",
    ],
    color: "from-teal-600 to-emerald-700",
  },
  {
    id: 507,
    group: "freelance",
    status: "done",
    title: "AI Portfolio Assistant & Interactive Chatbot",
    description:
      "Interactive RAG-powered portfolio chatbot allowing visitors and recruiters to query career history, tech stack, and project architecture in real time.",
    longDescription:
      "Asisten chatbot portofolio cerdas berbasis RAG (Retrieval-Augmented Generation) yang terintegrasi di website portofolio andryhuang.com. Memungkinkan pengunjung & recruiter bertanya tentang riwayat karir, penguasaan tech stack, arsitektur project, hingga detail pengalaman kerja secara real-time.",
    features: [
      "RAG Architecture & Context Retrieval berbasis Vector Embeddings",
      "Jawaban Real-Time berbasis riwayat karir & arsitektur project CV",
      "Interaksi Chatbot Melayang (Floating UI) interaktif",
      "Streaming Response & optimasi token prompt LLM",
    ],
    impact:
      "Memberikan pengalaman eksplorasi portofolio interaktif bagi recruiter & pengunjung website.",
    emoji: "🤖",
    icon: Bot,
    tags: [
      "Next.js 16",
      "OpenAI API",
      "Vector Embeddings",
      "Tailwind CSS v4",
      "TypeScript",
      "RAG Architecture",
    ],
    color: "from-cyan-500 to-purple-500",
    liveUrl: "https://andryhuang.com",
    liveLabel: "andryhuang.com",
    featured: true,
  },
];

const groups: {
  key: GroupKey;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "freelance", label: "Side Projects", sub: "Client & Personal", icon: ShoppingCart },
  { key: "anacle", label: "Anacle / MRI", sub: "Singapore SaaS", icon: Building2 },
  { key: "tool-mgmt", label: "Software House", sub: "Surabaya, ID", icon: Wrench },
  { key: "tjiwi", label: "Tjiwi Kimia", sub: "Manufacturing", icon: Factory },
];

const freelanceFilters: { key: "all" | "done" | "in-progress"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "done", label: "Done" },
  { key: "in-progress", label: "In Progress" },
];

const statusLabel = (s: ProjectStatus) =>
  s === "done" ? "Done" : s === "in-progress" ? "In Progress" : "Terminated";

const fmt = (n: number) => (n < 10 ? `0${n}` : `${n}`);

function HeroCard({
  project,
  number,
  onOpen,
}: {
  project: Project;
  number: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project);
        }
      }}
      className="group relative w-full text-left rounded-2xl md:rounded-3xl overflow-hidden border border-[var(--line)] hover:border-[var(--accent)]/60 transition-all duration-300 bg-[var(--bg-2)] hover:shadow-[0_0_40px_-10px_rgba(255,77,0,0.25)] cursor-pointer select-none"
    >
      <div className="relative aspect-[16/11] md:aspect-[16/10] w-full overflow-hidden">
        {project.images?.[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(min-width:1024px) 66vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            priority
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} flex items-center justify-center`}
          >
            <span className="text-7xl md:text-9xl drop-shadow-lg">
              {project.emoji ?? "💼"}
            </span>
          </div>
        )}

        {/* deep gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/60 to-transparent" />

        {/* index numeral */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 font-mono text-[10px] md:text-xs tracking-[0.3em] text-[var(--mut)]">
          № {fmt(number)}
        </div>

        {/* top-left badges */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col items-start gap-2">
          {project.featured && (
            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] bg-[var(--bg)]/90 border border-[var(--accent)]/40 backdrop-blur">
              ★ Editor&apos;s Pick
            </span>
          )}
          {project.year && (
            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] tracking-[0.15em] text-[var(--fg)] bg-[var(--bg)]/80 border border-[var(--line)] backdrop-blur">
              📅 {project.year}
            </span>
          )}
          {project.status && (
            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-2)] bg-[var(--bg)]/80 border border-[var(--line)] backdrop-blur">
              {statusLabel(project.status)}
            </span>
          )}
        </div>

        {/* bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
          <div className="flex items-center gap-2.5 mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
            <span className="inline-block w-6 h-px bg-[var(--accent)]" />
            <project.icon className="w-3.5 h-3.5" />
            <span>Lead Project</span>
          </div>

          <h3 className="text-2xl md:text-4xl lg:text-[2.75rem] font-bold text-[var(--fg)] leading-[1.05] tracking-tight mb-3 group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>

          <p className="hidden sm:block text-sm md:text-[15px] text-[var(--fg-2)] max-w-2xl mb-4 line-clamp-2 lg:line-clamp-3">
            {project.description}
          </p>

          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--fg-2)] bg-white/5 border border-[var(--line)] rounded"
                >
                  {t}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--mut)]">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] shrink-0">
              Open case
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarCard({
  project,
  number,
  onOpen,
}: {
  project: Project;
  number: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project);
        }
      }}
      className="group relative w-full text-left rounded-xl md:rounded-2xl overflow-hidden border border-[var(--line)] hover:border-[var(--accent)]/50 transition-all duration-300 bg-[var(--bg-2)] flex min-h-[120px] md:min-h-0 flex-1 cursor-pointer select-none"
    >
      {/* thumbnail */}
      <div className="relative w-28 md:w-40 lg:w-44 shrink-0 overflow-hidden">
        {project.images?.[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="200px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} flex items-center justify-center`}
          >
            <span className="text-3xl md:text-4xl">{project.emoji ?? "💼"}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[var(--bg-2)]/80" />
      </div>

      {/* meta */}
      <div className="flex-1 p-3.5 md:p-4 lg:p-5 flex flex-col min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <span className="font-mono text-[10px] tracking-[0.3em] text-[var(--mut)]">
            № {fmt(number)}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--mut)] group-hover:text-[var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </div>
        <h4 className="text-sm md:text-[15px] font-bold text-[var(--fg)] leading-snug mb-1.5 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
          {project.title}
        </h4>
        <p className="text-[11px] md:text-xs text-[var(--fg-2)] leading-relaxed line-clamp-2 mb-auto">
          {project.description}
        </p>
        <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-[var(--line)]">
          <project.icon className="w-3 h-3 text-[var(--accent)]" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mut)] truncate">
            {project.tags[0]} · {project.tags.length} stack
          </span>
          {project.year ? (
            <span className="ml-auto font-mono text-[9px] tracking-wider text-[var(--fg-2)] bg-white/5 border border-[var(--line)] px-1.5 py-0.5 rounded shrink-0">
              {project.year}
            </span>
          ) : project.status ? (
            <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-[var(--mut)] shrink-0">
              {statusLabel(project.status)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function GridCard({
  project,
  number,
  onOpen,
}: {
  project: Project;
  number: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project);
        }
      }}
      className="group relative w-full text-left rounded-2xl overflow-hidden border border-[var(--line)] hover:border-[var(--accent)]/50 transition-all duration-300 bg-[var(--bg-2)] flex flex-col h-full cursor-pointer select-none"
    >
      {/* image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {project.images?.[0] ? (
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.color} flex items-center justify-center`}
          >
            <span className="text-5xl md:text-6xl">{project.emoji ?? "💼"}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-2)] via-[var(--bg-2)]/30 to-transparent" />

        <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.25em] text-[var(--mut)]">
          № {fmt(number)}
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {project.featured && (
            <span className="px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent)] bg-[var(--bg)]/90 border border-[var(--accent)]/40 backdrop-blur">
              ★ Pick
            </span>
          )}
          {project.year && (
            <span className="px-2 py-0.5 rounded font-mono text-[9px] tracking-[0.15em] text-[var(--fg)] bg-[var(--bg)]/80 border border-[var(--line)] backdrop-blur">
              📅 {project.year}
            </span>
          )}
          {project.status && (
            <span className="px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--fg-2)] bg-[var(--bg)]/80 border border-[var(--line)] backdrop-blur">
              {statusLabel(project.status)}
            </span>
          )}
        </div>
      </div>

      {/* meta */}
      <div className="p-4 md:p-5 flex flex-col grow">
        <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
          <project.icon className="w-3.5 h-3.5" />
          <span className="truncate">{project.tags[0]}</span>
        </div>

        <h4 className="text-base md:text-lg font-bold text-[var(--fg)] leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
          {project.title}
        </h4>

        <p className="text-xs text-[var(--fg-2)] line-clamp-2 mb-3 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 min-w-0">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--fg-2)] bg-white/5 border border-[var(--line)] rounded truncate"
              >
                {t}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--mut)]">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          <ArrowUpRight className="w-4 h-4 text-[var(--mut)] group-hover:text-[var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
        </div>
      </div>
    </div>
  );
}

// ─── Layout: Editorial Asymmetric ────────────────────────────────────────────

function EditorialLayout({
  items,
  onOpen,
}: {
  items: Project[];
  onOpen: (p: Project) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 font-mono text-xs uppercase tracking-[0.3em]">
        — No entries in this filter —
      </div>
    );
  }

  const [hero, ...rest] = items;
  // Cap sidebar at 2 unless that would leave a single orphan grid card → promote it
  let sidebarCount = Math.min(rest.length, 2);
  if (rest.length - sidebarCount === 1) {
    sidebarCount = Math.min(rest.length, 3);
  }
  const sidebarItems = rest.slice(0, sidebarCount);
  const gridItems = rest.slice(sidebarCount);

  return (
    <div className="space-y-5 md:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        <div className="lg:col-span-8">
          <HeroCard project={hero} number={1} onOpen={onOpen} />
        </div>
        {sidebarItems.length > 0 && (
          <div className="lg:col-span-4 flex flex-col gap-5 md:gap-6">
            {sidebarItems.map((p, i) => (
              <SidebarCard
                key={p.id}
                project={p}
                number={i + 2}
                onOpen={onOpen}
              />
            ))}
          </div>
        )}
      </div>

      {gridItems.length > 0 && (
        <div
          className={`grid gap-5 md:gap-6 ${
            gridItems.length === 1
              ? "grid-cols-1"
              : gridItems.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {gridItems.map((p, i) => (
            <GridCard
              key={p.id}
              project={p}
              number={i + 2 + sidebarCount}
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const popularTags = [
  { key: "all", labelId: "Semua Stack", labelEn: "All Stack" },
  { key: "ai", labelId: "AI & Agents", labelEn: "AI & Agents", match: ["ai", "mcp", "openai", "claude", "llm", "bot"] },
  { key: "dotnet", labelId: ".NET / C#", labelEn: ".NET / C#", match: [".net", "c#", "asp classic"] },
  { key: "nextjs", labelId: "Next.js / React", labelEn: "Next.js / React", match: ["next.js", "react", "typescript"] },
  { key: "erp", labelId: "ERP & POS", labelEn: "ERP & POS", match: ["erp", "pos", "rfid", "inventory", "sales", "retail"] },
  { key: "sql", labelId: "Database & Cloud", labelEn: "Database & Cloud", match: ["sql", "postgresql", "mysql", "redis", "azure", "aws", "docker"] },
];

export default function Projects() {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeGroup, setActiveGroup] = useState<GroupKey>("freelance");
  const [freelanceStatus, setFreelanceStatus] = useState<
    "all" | "done" | "in-progress"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!openProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenProject(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openProject]);

  const isFiltering = searchQuery.trim() !== "" || selectedTag !== "all";

  const filteredProjects = useMemo(() => {
    let list = projects;

    if (!isFiltering) {
      const inGroup = projects.filter((p) => p.group === activeGroup);
      list =
        activeGroup !== "freelance" || freelanceStatus === "all"
          ? inGroup
          : inGroup.filter((p) => p.status === freelanceStatus);
    } else {
      if (selectedTag !== "all") {
        const tagRule = popularTags.find((t) => t.key === selectedTag);
        if (tagRule?.match) {
          list = list.filter((p) =>
            p.tags.some((tag) =>
              tagRule.match!.some((m) => tag.toLowerCase().includes(m))
            )
          );
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        list = list.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q)) ||
            p.impact?.toLowerCase().includes(q)
        );
      }
    }

    return [...list].sort(
      (a, b) => Number(!!b.featured) - Number(!!a.featured)
    );
  }, [activeGroup, freelanceStatus, searchQuery, selectedTag, isFiltering]);

  const totalCount = projects.length;
  const filterKey = `${activeGroup}-${freelanceStatus}-${searchQuery}-${selectedTag}`;

  return (
    <section
      id="projects"
      ref={ref}
      className="py-12 md:py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* ── Editorial Header ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-5">
            <span className="h-px w-8 md:w-12 bg-[var(--line)]" />
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-[var(--accent)]">
              {lang === "id" ? `Karya Pilihan · Indeks 01–${fmt(totalCount)}` : `Selected Works · Index 01–${fmt(totalCount)}`}
            </span>
            <span className="h-px flex-1 bg-[var(--line)]" />
          </div>

          <div className="grid md:grid-cols-12 items-end gap-4 md:gap-6">
            <h2 className="md:col-span-9 text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight uppercase text-[var(--fg)]">
              {lang === "id" ? "Arsip " : "The "}
              <span className="italic font-light text-[var(--accent)]">
                {lang === "id" ? "Portofolio" : "Archive"}
              </span>
            </h2>
            <p className="md:col-span-3 text-sm md:text-[13px] text-[var(--mut)] leading-relaxed md:text-right">
              {lang === "id"
                ? "Pengalaman kerja profesional full-time dan side projects. Klik project untuk detail lengkap."
                : "Three chapters of full-time work and side projects. Each entry opens for the full case."}
            </p>
          </div>
        </motion.div>

        {/* ── Live Search & Stack Pills Bar (Wrap, 100% Vertical-Friendly) ────── */}
        <div className="mb-6 flex flex-col gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--mut)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "id"
                  ? "Cari nama proyek, stack (.NET, Next.js, AI, POS, ERP, SQL)..."
                  : "Search projects, stack (.NET, Next.js, AI, POS, ERP, SQL)..."
              }
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-[var(--bg-2)] border border-[var(--line)] text-[var(--fg)] placeholder:text-[var(--mut)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[var(--mut)] hover:text-[var(--fg)] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mut)] mr-1">
              {lang === "id" ? "Filter:" : "Filter:"}
            </span>
            {popularTags.map((tag) => {
              const active = selectedTag === tag.key;
              return (
                <button
                  key={tag.key}
                  onClick={() => setSelectedTag(tag.key)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all border cursor-pointer ${
                    active
                      ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)] font-bold shadow-md scale-105"
                      : "bg-[var(--bg-2)] text-[var(--fg-2)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--fg)]"
                  }`}
                >
                  {lang === "id" ? tag.labelId : tag.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Search Active Notice or Group Tabs ─────────── */}
        {isFiltering ? (
          <div className="mb-8 flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-[var(--line)]">
            <span className="font-mono text-xs text-[var(--fg-2)]">
              {lang === "id"
                ? `Menampilkan ${filteredProjects.length} proyek dari filter/pencarian`
                : `Showing ${filteredProjects.length} projects matching filter/search`}
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("all");
              }}
              className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] hover:underline cursor-pointer font-medium"
            >
              {lang === "id" ? "Reset Filter ✕" : "Reset Filters ✕"}
            </button>
          </div>
        ) : (
          <>
            {/* ── Group Grid (Responsive Cards, No Side-Scroll) ──────── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
            >
              {groups.map((g, i) => {
                const Icon = g.icon;
                const active = activeGroup === g.key;
                const count = projects.filter((p) => p.group === g.key).length;
                return (
                  <button
                    key={g.key}
                    onClick={() => {
                      setActiveGroup(g.key);
                      setFreelanceStatus("all");
                    }}
                    className={`relative p-4 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between gap-3 ${
                      active
                        ? "bg-white/10 border-[var(--accent)] text-[var(--fg)] shadow-lg scale-[1.02]"
                        : "bg-[var(--bg-2)] border-[var(--line)] text-[var(--mut)] hover:border-[var(--line-strong)] hover:text-[var(--fg-2)]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`font-mono text-xs tracking-widest ${
                          active ? "text-[var(--accent)] font-bold" : "text-[var(--mut)]"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-[var(--line)] text-[var(--fg-2)]">
                        {count} {lang === "id" ? "Proyek" : "Projects"}
                      </span>
                    </div>

                    <div>
                      <div className="text-sm md:text-base font-bold tracking-tight text-[var(--fg)]">
                        {g.label}
                      </div>
                      <div className="text-xs text-[var(--mut)] mt-1 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                        <span className="truncate">{g.sub}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </motion.div>

            {/* ── Sub-filter (Freelance) ───────────────────── */}
            {activeGroup === "freelance" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap items-center justify-between mb-6 gap-3 pt-2"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mut)]">
                  {lang === "id" ? "Status Pengerjaan:" : "Project Status:"}
                </span>
                <div className="flex flex-wrap gap-2">
                  {freelanceFilters.map((f) => {
                    const active = freelanceStatus === f.key;
                    return (
                      <button
                        key={f.key}
                        onClick={() => setFreelanceStatus(f.key)}
                        className={`px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                          active
                            ? "text-[var(--bg)] bg-[var(--accent)] border-[var(--accent)] font-bold shadow-sm"
                            : "text-[var(--mut)] bg-[var(--bg-2)] border-[var(--line)] hover:border-[var(--line-strong)] hover:text-[var(--fg-2)]"
                        }`}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* ── Editorial Grid ───────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filterKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <EditorialLayout
              items={filteredProjects}
              onOpen={setOpenProject}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Footer rule ──────────────────────────────── */}
        <div className="mt-14 md:mt-20 pt-6 border-t border-white/10 flex items-center justify-between gap-4 text-gray-500">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            {lang === "id" ? "Akhir indeks" : "End of index"}
          </span>
          <span className="text-[10px] md:text-xs italic">
            {lang === "id"
              ? "... dan banyak project internal lainnya di SaaS enterprise, manufaktur & retail."
              : "... and many more internal projects across SaaS, manufacturing & retail."}
          </span>
        </div>
      </div>

      <ProjectDialog
        project={openProject}
        onClose={() => setOpenProject(null)}
      />
    </section>
  );
}

// ─── Project Detail Dialog ───────────────────────────────────────────────────

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence mode="wait">
      {project && <DialogPanel key={project.id} project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}

function DialogPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { lang } = useLanguage();
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full md:max-w-3xl bg-gray-950 md:rounded-3xl rounded-t-3xl border border-white/10 shadow-2xl max-h-[92vh] md:max-h-[88vh] overflow-hidden flex flex-col"
      >
            <div className="md:hidden flex justify-center pt-2.5 pb-1">
              <span className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur text-white border border-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="overflow-y-auto">
              <div
                className={`relative w-full aspect-video bg-gradient-to-br ${project.color}`}
              >
                {project.images?.length ? (
                  <>
                    <Image
                      src={project.images[imgIndex]}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setImgIndex(
                              (i) =>
                                (i - 1 + project.images!.length) %
                                project.images!.length
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setImgIndex(
                              (i) => (i + 1) % project.images!.length
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {project.images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setImgIndex(i)}
                              className={`h-1.5 rounded-full transition-all ${
                                i === imgIndex ? "w-5 bg-white" : "w-1.5 bg-white/40"
                              }`}
                              aria-label={`Image ${i + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl">{project.emoji ?? "💼"}</span>
                  </div>
                )}

                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] bg-[var(--bg)]/90 border border-[var(--accent)]/40 backdrop-blur">
                      ★ Editor&apos;s Pick
                    </span>
                  )}
                  {project.year && (
                    <span className="px-2.5 py-1 bg-[var(--bg)]/80 backdrop-blur rounded-full font-mono text-[10px] tracking-[0.15em] text-[var(--fg)] border border-[var(--line)]">
                      📅 {project.year}
                    </span>
                  )}
                  {project.status && (
                    <span className="px-2.5 py-1 bg-[var(--bg)]/80 backdrop-blur rounded-full font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-2)] border border-[var(--line)]">
                      {statusLabel(project.status)}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 md:p-7">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="p-2 rounded-lg shrink-0 bg-[var(--accent)] text-[var(--bg)]"
                  >
                    <project.icon className="w-5 h-5 text-[var(--bg)]" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-[var(--fg)] leading-tight">
                    {project.title}
                  </h3>
                </div>

                <p className="text-[var(--fg-2)] text-sm md:text-base leading-relaxed mb-5">
                  {project.longDescription || project.description}
                </p>

                {project.features && project.features.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-[var(--line)]">
                    <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--accent)] mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      {lang === "id" ? "Fitur & Modul Utama" : "Key Features & Modules"}
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-[var(--fg-2)]">
                          <span className="text-[var(--accent)] mt-0.5">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.impact && (
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/30">
                    <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-400 mb-1 flex items-center gap-1.5">
                      ★ {lang === "id" ? "Hasil / Business Impact" : "Business Impact / Results"}
                    </h4>
                    <p className="text-xs md:text-sm text-emerald-200 leading-relaxed font-medium">
                      {project.impact}
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--mut)] mb-2">
                    — Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/5 rounded-full font-mono text-[11px] uppercase tracking-wider text-[var(--fg-2)] border border-[var(--line)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href="https://github.com/andrych17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[var(--fg)] text-sm bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                  {project.links
                    ? project.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[var(--bg)] font-semibold text-sm bg-[var(--accent)] hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(255,77,0,0.25)]"
                        >
                          <ExternalLink size={16} />
                          {link.label}
                        </a>
                      ))
                    : project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[var(--bg)] font-semibold text-sm bg-[var(--accent)] hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(255,77,0,0.25)]"
                        >
                          <ExternalLink size={16} />
                          {project.liveLabel ?? "Visit Site"}
                        </a>
                      )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
  );
}
