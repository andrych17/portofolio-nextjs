import {
  Activity,
  Bot,
  Brain,
  Building2,
  CircleDot,
  Cloud,
  Cookie,
  FileBarChart,
  Gem,
  HeartPulse,
  Package,
  PieChart,
  ScanLine as ScanLineIcon,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  Wrench,
} from "lucide-react";

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
  // ── JOB #1 • PT Tjiwi Kimia ───────────────────────────────
  {
    id: 101,
    group: "tjiwi",
    title: "Internal Reporting System",
    description:
      "Wrote dozens of internal reports for a large pulp & paper manufacturer and tuned their SQL so long-running reports finish in seconds instead of minutes. Older pages ran on ASP Classic; newer modules on .NET.",
    impact:
      "Laporan data besar untuk operasional pabrik yang dulu makan beberapa menit sekarang selesai dalam hitungan detik.",
    year: "2019 – 2022",
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
  },
  {
    id: 102,
    group: "tjiwi",
    title: "WhatsApp Scheduler Bot",
    description:
      "Selenium scheduler that screenshots production dashboards and sends them to stakeholders through WhatsApp Web on a fixed schedule.",
    impact:
      "Laporan produksi (OEE & HWT) terkirim otomatis ke manajemen lewat WhatsApp Web sesuai jadwal.",
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
      "Stok masuk dan keluar gudang cukup dicatat dengan scan barcode.",
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
      "Dipakai seluruh karyawan untuk check-in kesehatan harian dan contact tracing selama pandemi.",
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

  // ── JOB #2 • Software House (Surabaya) ────────────────────
  {
    id: 201,
    group: "tool-mgmt",
    title: "Tool Management System (TMS)",
    description:
      "Maintained a legacy enterprise Tool Management System. Led a Java version upgrade, a large refactor, and a code-review process that cut incident tickets quarter over quarter.",
    impact:
      "Memperbaiki 10.000+ record yang rusak akibat bug lama dan mengurangi insiden high-priority yang berulang.",
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
  },

  // ── JOB #3 • Anacle Systems Ltd (Singapore) ────────────
  {
    id: 301,
    group: "anacle",
    title: "SonarQube Code Quality Pipeline",
    description:
      "Set up and rolled out SonarQube across multiple internal .NET projects. Defined quality gates, integrated with CI/CD, and onboarded teams onto the platform.",
    impact:
      "Memperkenalkan analisis kode statis ke beberapa proyek enterprise dan memasang quality gate CI/CD yang memblokir deploy jika ada celah keamanan baru.",
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
      "Developed and maintained SMRT Singapore's mall tenant management platform: leasing, billing, and tenant operations, deployed as SaaS. Newer modules use Next.js and NestJS on top of the legacy .NET core.",
    impact:
      "Membawa platform manajemen penyewa mall SMRT Singapore sampai go-live: tender, aplikasi tenant, dan operasional penyewa.",
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
    title: "Simplicity • Facilities Management SaaS",
    description:
      "Feature development and ticket-based maintenance on Simplicity, Anacle's enterprise facilities-management product, in an international remote team shipping cross-region releases.",
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
      "Built an integration layer that uploads documents from the database to SharePoint, AWS S3, and Azure Blob, with RBAC and audit logging. Next.js front end, NestJS service layer.",
    impact:
      "Memigrasikan 100.000+ file ke SharePoint (Graph API), AWS S3, dan Azure Blob, lengkap dengan RBAC dan audit log.",
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

  // ── SIDE PROJECTS • Done (Newest to Oldest) ───────────────
  {
    id: 509,
    group: "freelance",
    status: "done",
    title: "Wonderful Works • Architecture & General Contractor",
    description:
      "Company website and CMS for a Surabaya architecture and contracting firm. Staff can edit pages in a drag-and-drop composer and manage bilingual content, project photos, and users from an admin panel.",
    longDescription:
      "Website profil dan portofolio proyek untuk Wonderful Works Construction, firma arsitektur dan kontraktor di Surabaya. Staf bisa menyusun halaman lewat page composer drag-and-drop, lalu mengelola konten ID/EN, foto proyek, dan user dari admin panel. Deploy berjalan otomatis lewat Docker dan Jenkins.",
    features: [
      "Page composer drag-and-drop (Puck) untuk menyusun layout halaman tanpa coding",
      "Admin panel dengan login JWT (httpOnly cookie) + bcrypt dan manajemen user untuk superadmin",
      "Konten dwibahasa (ID/EN) di PostgreSQL lewat Prisma, divalidasi dengan Zod",
      "Upload gambar, galeri, dan video hero secara drag-and-drop; gambar dioptimasi dengan sharp",
      "Galeri proyek interaktif untuk desain arsitektur, interior, dan general contracting",
      "SEO: metadata dinamis, sitemap, OpenGraph, dan JSON-LD LocalBusiness",
      "Pipeline Jenkins yang menjalankan migrasi database dan Docker Compose saat deploy",
    ],
    impact:
      "Tim Wonderful Works bisa memperbarui proyek, halaman, dan foto sendiri tanpa menunggu developer.",
    images: [
      "/projects/wwconstruction_01_landing_hero_en.png",
      "/projects/wwconstruction_02_architectural_services_en.png",
      "/projects/wwconstruction_03_portfolio_projects_en.png",
      "/projects/wwconstruction_04_about_leadership_en.png",
      "/projects/wwconstruction_05_contact_consultation_en.png",
      "/projects/wwconstruction_preview_desktop.png",
      "/projects/wwconstruction_06_luxury_residence_hq.jpg",
      "/projects/wwconstruction_07_jotun_showroom_hq.jpg",
    ],
    emoji: "🏗️",
    icon: Building2,
    tags: [
      "Next.js 16",
      "React 19",
      "Tailwind CSS v4",
      "Framer Motion",
      "Prisma ORM",
      "PostgreSQL",
      "Puck Visual CMS",
      "JWT Auth",
      "Bilingual ID/EN",
      "SEO & JSON-LD",
      "Docker",
      "Jenkins CI/CD",
    ],
    color: "from-amber-500 to-orange-600",
    liveUrl: "https://wwconstruction.id",
    liveLabel: "wwconstruction.id",
    featured: true,
  },
  {
    id: 504,
    group: "freelance",
    status: "done",
    title: "Qualiv • AI Recruitment Platform (Founder)",
    description:
      "Founder & Lead Architect. Multi-tenant AI recruitment SaaS: CV screening, candidate scoring, and interview workflows on OpenAI and a Redis queue.",
    longDescription:
      "Founder & Lead Architect dari Qualiv (qualiv.id), SaaS rekrutmen multi-tenant yang saya bangun dari nol, dari arsitektur sampai desain produk. Qualiv menyaring CV, menjalankan tes logika, mensimulasikan wawancara chat/video dengan AI, menilai kecocokan pelamar, dan membuat ringkasan asesmen.",
    features: [
      "Screening & Parsing CV otomatis berbasis LLM (PDF/Docx)",
      "Simulasi Wawancara AI Chat & Video Interview (LLM Interviewer)",
      "Tes Logika & Asesmen Keterampilan Kandidat Otomatis (Real-Time Scoring)",
      "Sistem Penilaian & Match Score kandidat terhadap kualifikasi posisi",
      "Pemrosesan Antrean Berkas Massal (Redis Queue)",
      "Sistem Langganan & Billing Midtrans terintegrasi",
      "Penyimpanan dokumen di Cloudflare R2 dan PostgreSQL",
    ],
    impact:
      "Tim HR bisa menyaring CV, menguji logika, dan mewawancarai kandidat dari satu tempat.",
    images: [
      "/projects/qualiv_01_landing_hero_en.png",
      "/projects/qualiv_02_ai_hr_screening_en.png",
      "/projects/qualiv_07_hr_dashboard_overview_en.png",
      "/projects/qualiv_08_candidates_pipeline_en.png",
      "/projects/qualiv_09_jobs_management_en.png",
      "/projects/qualiv_10_create_job_pipeline_en.png",
      "/projects/qualiv_11_ai_interview_simulation_en.png",
      "/projects/qualiv_12_interview_calendar_en.png",
      "/projects/qualiv_13_candidate_logic_assessment_en.png",
      "/projects/qualiv_14_automated_shortlist_engine_en.png",
      "/projects/qualiv_15_interview_questions_bank_en.png",
      "/projects/qualiv_16_ai_usage_token_monitor_en.png",
      "/projects/qualiv_17_bullmq_queue_worker_en.png",
      "/projects/qualiv_18_billing_invoices_en.png",
      "/projects/qualiv_19_subscription_plans_en.png",
      "/projects/qualiv_20_audit_security_logs_en.png",
      "/projects/qualiv_21_company_profile_settings_en.png",
      "/projects/qualiv_22_ai_evaluator_playground_en.png",
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
      "Asisten pribadi untuk portofolio saham: melacak alokasi aset, lalu memakai AI untuk merangkum laporan keuangan emiten dan sentimen pasar.",
    features: [
      "Pelacakan Kepemilikan Saham (Holdings) & Alokasi Portofolio real-time",
      "Rangkuman AI Laporan Keuangan Emiten & Sentimen Berita Pasar",
      "Visualisasi Grafik Interaktif Saham (Lightweight Charts)",
      "Kalkulator Risk Exposure, Target Price, & Margin of Safety",
      "Chatbot Asisten Analisis Saham Pribadi terintegrasi LLM",
    ],
    impact:
      "Data emiten, posisi, dan ringkasan AI ada di satu tempat untuk keputusan trading harian.",
    images: [
      "/projects/saham_01_market_dashboard_en.png",
      "/projects/saham_02_portfolio_allocation_en.png",
      "/projects/saham_03_ai_financial_analyst_chat_en.png",
      "/projects/saham_04_broker_summary_bandarmology_en.png",
      "/projects/saham_05_stock_chart_fundamentals_en.png",
      "/projects/saham_06_momentum_radar_en.png",
      "/projects/saham_07_market_news_ai_sentiment_en.png",
      "/projects/saham_08_dividend_corporate_calendar_en.png",
      "/projects/saham_09_commodities_gold_oil_en.png",
      "/projects/saham_10_crypto_macro_tracker_en.png",
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
    id: 508,
    group: "freelance",
    status: "done",
    title: "ERP & AI Solutions • Software Agency",
    description:
      "Company site for a software agency that builds industry-specific ERP and POS systems for tire retail, RFID jewelry stores, and yarn shops, plus AI add-ons.",
    longDescription:
      "Website agensi software yang membuat sistem ERP dan POS khusus industri: retail ban & fleet, toko emas dengan RFID, dan toko benang (termasuk lot celup), ditambah layanan AI.",
    features: [
      "ERP modular multi-tenant",
      "Modul khusus industri: otomotif (ban/velg), perhiasan (RFID), dan tekstil (benang)",
      "Layanan AI: asisten LLM, parsing CV, dan analisis sentimen",
    ],
    impact:
      "Toko ban, toko emas, dan toko benang memakai sistem yang mengikuti alur kerja mereka sendiri.",
    images: [
      "/projects/agency_01_landing_hero_en.png",
      "/projects/agency_02_services_overview_en.png",
      "/projects/agency_03_ai_solutions_en.png",
      "/projects/agency_04_tire_pos_erp_en.png",
      "/projects/agency_05_jewel_pos_erp_en.png",
      "/projects/agency_06_textile_yarn_erp_en.png",
      "/projects/agency_07_about_company_en.png",
    ],
    emoji: "🏢",
    icon: Building2,
    tags: [
      "Next.js 16",
      "Laravel",
      "Multi-Tenant ERP",
      "Tailwind CSS",
      "TypeScript",
    ],
    color: "from-blue-600 to-indigo-600",
    featured: true,
  },
  {
    id: 506,
    group: "freelance",
    status: "done",
    title: "OpenClaw • AI-Powered VPS Security & Ops Agent",
    description:
      "Agent that watches server security and health. An LLM explains log anomalies; the agent detects SSH brute-force attempts, bans them through Fail2ban, checks resource thresholds, and sends Telegram alerts.",
    longDescription:
      "OpenClaw berjalan di VPS remote seperti server Qualiv dan Netadm. LLM membaca syslog dan auth log untuk mencari akar masalah, Fail2ban memblokir IP yang mencoba brute force SSH, dan laporan insiden dikirim lewat Telegram. OpenClaw juga memantau CPU, RAM, dan disk.",
    features: [
      "Analisis Anomali Log Berbasis AI (LLM Diagnosis Akar Masalah Syslog & Auth Logs)",
      "Audit Otomatis Keamanan SSH & Deteksi Serangan Brute Force (Auth Logs)",
      "Integrasi Fail2ban & Auto-IP Banning 24h/72h untuk IP penyerang",
      "Notifikasi Laporan Insiden Real-time & Ringkasan AI Daily Summary via Telegram Bot",
      "Pemantauan Beban Server (CPU, RAM, Disk Usage, & Network Traffic)",
      "Audit Kerentanan Konfigurasi Service, Package Updates, & Gateway Proxies",
    ],
    impact:
      "Serangan SSH diblokir otomatis, dan ringkasan status server Qualiv masuk ke Telegram setiap hari.",
    images: [
      "/projects/openclaw_01_telegram_ops_alerts_en.png",
      "/projects/openclaw_02_telegram_security_incident_en.png",
      "/projects/openclaw_03_telegram_ai_daily_summary_en.png",
    ],
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
    featured: true,
  },
  {
    id: 502,
    group: "freelance",
    status: "done",
    title: "PT Nagamasban • AI Sales Assistant",
    description:
      "AI assistant for PT Nagamasban tire distributor: sales recommendation engine & interactive training material for store sales reps.",
    longDescription:
      "Asisten AI cerdas untuk tim sales distributor ban PT Nagamasban. Merekomendasikan tipe & merk ban yang paling sesuai dengan kendaraan, gaya mengemudi, dan budget pelanggan secara presisi.",
    features: [
      "Rekomendasi ban lewat semantic search (OpenAI embeddings + pgvector)",
      "Pencocokan spesifikasi ban berdasarkan merk/tipe mobil & ukuran velg",
      "Modul Training & Script Sales interaktif untuk staf toko baru",
      "Pencarian cepat katalog ban dengan rekomendasi alternatif stok",
      "Dashboard Admin untuk pembaruan basis pengetahuan & harga ban",
    ],
    impact:
      "Sales baru bisa merekomendasikan ban yang cocok dengan kendaraan dan budget pelanggan.",
    images: [
      "/projects/nagamasban_01_katalog_en.png",
      "/projects/ban1.png",
      "/projects/ban2.png",
    ],
    icon: Sparkles,
    tags: [
      "Next.js 16",
      "NestJS",
      "OpenAI API",
      "pgvector",
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
    title: "Knit and Cro • Online Storefront",
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
      "Toko fisik di Pluit bisa menerima pesanan dari seluruh Indonesia kapan saja.",
    images: [
      "/projects/knitandcro_storefront_01_hero_home_en.png",
      "/projects/knitandcro_storefront_02_studio_collection_en.png",
      "/projects/knitandcro_storefront_03_about_us_en.png",
      "/projects/knitandcro_storefront_04_contact_location_en.png",
    ],
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
    title: "Knit and Cro Pluit • Yarn Store System",
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
      "Selisih stok benang terlihat setiap stock opname, dan kasir bisa mencari varian warna dan lot dengan cepat.",
    images: [
      "/projects/knitandcro_01_retail_dashboard_en.png",
      "/projects/knitandcro_02_vendors_buyers_en.png",
      "/projects/knitandcro_03_ecommerce_marketplace_orders_en.png",
      "/projects/knitandcro_04_pos_invoices_history_en.png",
      "/projects/knitandcro_05_yarn_dye_lot_variants_en.png",
      "/projects/knitandcro_06_realtime_notifications_en.png",
      "/projects/knitandcro_07_rbac_account_settings_en.png",
    ],
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
    title: "Wijaya Mas Pluit • Jewelry Store with RFID",
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
      "Audit stok emas harian cukup dengan pemindaian RFID massal, tanpa scan barcode satu per satu.",
    images: [
      "/projects/jewel_01_wijayamas_dashboard_en.png",
      "/projects/jewel_02_gold_diamond_rfid_inventory_en.png",
      "/projects/jewel_03_karat_categories_en.png",
      "/projects/jewel_04_daily_gold_rates_forex_en.png",
      "/projects/jewel_05_visual_photo_catalogue_en.png",
      "/projects/jewel_06_vip_clients_suppliers_en.png",
      "/projects/jewel_07_pos_gold_sales_invoices_en.png",
      "/projects/jewel_08_gold_buyback_scrap_inward_en.png",
      "/projects/jewel_09_gold_procurement_grn_en.png",
      "/projects/trdjewel1.png",
      "/projects/trdjewel2.png",
    ],
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
    title: "Cahaya Terang Surabaya • Tire Shop ERP",
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
      "Pemilik bisa melihat piutang berjalan dan jatuh tempo giro kapan saja.",
    images: [
      "/projects/tire_01_cahayaterang_dashboard_en.png",
      "/projects/tire_02_inventory_specs_ring_dot_en.png",
      "/projects/tire_03_fleet_dealers_suppliers_en.png",
      "/projects/tire_04_sales_wholesale_orders_en.png",
      "/projects/trdtire1.png",
      "/projects/trdtire2.png",
    ],
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
    title: "Tiga Putra • Snack & Grocery Store",
    description:
      "End-to-end management system for a snack & grocery wholesale/retail store. Covers PO/SO, Returns, Expiry Date Tracking, and operational reporting.",
    longDescription:
      "Sistem manajemen usaha grosir & eceran sembako/snack Tiga Putra. Mengelola siklus pengadaan barang (PO), penjualan grosir/eceran (SO), retur barang rusak/kedaluwarsa, serta analisis keuntungan operasional.",
    features: [
      "Manajemen Purchase Order (PO) & Sales Order (SO) grosir/retail",
      "Sistem Retur Penjualan & Pembelian otomatis memotong saldo stok/hutang",
      "Stock opname dan pelacakan tanggal kedaluwarsa (FIFO)",
      "Cetak Nota / Invois faktur dan surat jalan pengiriman",
      "Otorisasi role pengguna (Owner, Admin, Kasir, & Gudang)",
    ],
    impact:
      "Barang keluar sesuai urutan kedaluwarsa (FIFO), dan nota grosir dibuat lebih cepat.",
    images: [
      "/projects/tigaputra_01_sales_order_invoicing_en.png",
      "/projects/tigaputra_02_inventory_po_fifo_en.png",
      "/projects/tigaputra.png",
      "/projects/tigaputra2.png",
    ],
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
    title: "Quiz Management App • Community Edition",
    description:
      "Volunteer project: a logic-test & quiz assessment platform built for community organizations (GMS Community). Real-time scoring, user management, and analytics dashboard.",
    longDescription:
      "Platform ujian & kuis interaktif yang dibangun untuk komunitas organisasi & edukasi (GMS Community). Mendukung penilaian ujian otomatis, analitik nilai, dan manajemen peserta.",
    features: [
      "Pembuatan Bank Soal Kuis & Tes Logika interaktif",
      "Penilaian otomatis real-time dengan leaderboard skor peserta",
      "Manajemen pengguna, sesi kuis, & pembatasan waktu ujian",
      "Dashboard analitik distribusi nilai & statistik jawaban peserta",
    ],
    impact:
      "Ujian komunitas berjalan digital dan dinilai otomatis, tanpa koreksi kertas.",
    images: [
      "/projects/quiz_01_interactive_test_session_en.png",
      "/projects/quiz_02_questions_editor_config_en.png",
      "/projects/quiz_03_leaderboard_scoring_analytics_en.png",
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
      "A volunteer project built for church community organizations: an Airbnb-style Connect Group (CG) room & venue booking platform. Features room reservation scheduling, Leaflet map search, surveyor inspection workflow, and usage contract management.",
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
      "Jemaat bisa mencari rumah CG terdekat lewat peta, dan admin mengatur jadwal serta kontrak pemakaian rumah di satu sistem.",
    images: [
      "/projects/gms_01_interactive_map_search_en.png",
      "/projects/gms_02_dashboard_en.png",
      "/projects/gms_04_house_detail_specifications_en.png",
      "/projects/gms_05_contracts_en.png",
      "/projects/gms_08_portal_requests_en.png",
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
    title: "AI Portfolio Assistant",
    description:
      "Chat assistant on this site that answers recruiters' questions about my work history, stack, and projects. It calls the DeepSeek API with a curated profile as context.",
    longDescription:
      "Chatbot di andryhuang.com yang menjawab pertanyaan recruiter soal riwayat kerja, tech stack, dan project saya. Chatbot memanggil DeepSeek API dengan profil yang sudah dikurasi sebagai konteks.",
    features: [
      "Profil karier & project dikurasi di system prompt, jadi jawaban tetap sesuai CV",
      "Tombol chat melayang (floating) di halaman utama dan halaman portofolio",
      "Menjawab dalam bahasa yang dipakai pengunjung (ID/EN)",
    ],
    impact:
      "Recruiter bisa bertanya langsung tanpa harus membaca seluruh CV.",
    emoji: "🤖",
    icon: Bot,
    tags: [
      "Next.js 16",
      "DeepSeek API",
      "Prompt Engineering",
      "Tailwind CSS v4",
      "TypeScript",
    ],
    color: "from-cyan-500 to-purple-500",
    liveUrl: "https://andryhuang.com",
    liveLabel: "andryhuang.com",
    featured: true,
  },
];

export const PROJECT_SLUGS: Record<number, string> = {
  504: "qualiv",
  502: "nagamasban",
  501: "knit-and-cro",
  509: "wonderful-works",
  505: "stock-portfolio-ai",
  506: "openclaw",
  507: "ai-portfolio-assistant",
  508: "erp-ai-solutions",
  302: "smrt-tenant-system",
  303: "simplicity",
  301: "sonarqube-pipeline",
  304: "cloud-document-integration",
  401: "knit-and-cro-pluit",
  402: "wijaya-mas-pluit-rfid",
  403: "cahaya-terang-surabaya",
  404: "tiga-putra-groceries",
  405: "quiz-management-app",
  406: "cg-home-sharing",
  101: "internal-reporting-system",
  102: "whatsapp-scheduler-bot",
  103: "barcode-scanner-mobile",
  104: "covid-health-survey",
  201: "tool-management-system",
};

export function getProjectSlug(project: { id: number; title: string }): string {
  if (PROJECT_SLUGS[project.id]) return PROJECT_SLUGS[project.id];
  return project.title
    .toLowerCase()
    .replace(/[•&]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => getProjectSlug(p) === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => getProjectSlug(p));
}
