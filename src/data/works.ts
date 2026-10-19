type Text = { en: string; id: string };

export interface Shot {
  src: string;
  label: string;
  /** Crop: zoom into the screenshot from `origin`, which also pushes capture artefacts (dev badges) out of frame. */
  zoom?: number;
  origin?: string;
}

export interface Work {
  name: string;
  role: Text;
  year?: string;
  line: Text;
  parts: { en: string[]; id: string[] };
  stack: string[];
  url?: string;
  // Framed as two browser windows: the main view plus an inset that is either a second screen or a zoomed detail.
  shots?: { main: Shot; sub?: Shot };
  // Enterprise work has no public screenshots, so it gets a typographic flow instead of a fake one.
  flow?: { big: string; steps: Text[] };
}

// Enterprise first, then client and own builds. Details for every project live in /portofolio.
export const WORKS: Work[] = [
  {
    name: "SMRT Tenant System",
    role: { en: "Anacle Systems Ltd · for SMRT Singapore", id: "Anacle Systems Ltd · untuk SMRT Singapura" },
    year: "2023 – 2025",
    line: {
      en: "The mall tenant platform for SMRT Singapore, taken from build to go-live.",
      id: "Platform tenant mall untuk SMRT Singapura, dari pengembangan sampai go-live.",
    },
    parts: {
      en: [
        "Lease contracts, tender submissions and tenant operations, off paper",
        "Leasing and billing, delivered as SaaS",
        "New modules in Next.js and NestJS on top of the .NET core",
      ],
      id: [
        "Kontrak sewa, pengajuan tender, dan operasional tenant, tanpa kertas",
        "Sewa dan billing, berjalan sebagai SaaS",
        "Modul baru dengan Next.js dan NestJS di atas core .NET",
      ],
    },
    stack: ["Next.js", "NestJS", "TypeScript", ".NET Core 8", "SQL Server"],
    flow: {
      big: "SMRT",
      steps: [
        { en: "Tender", id: "Tender" },
        { en: "Lease", id: "Sewa" },
        { en: "Billing", id: "Billing" },
        { en: "Tenant ops", id: "Operasional" },
      ],
    },
  },
  {
    name: "Simplicity",
    role: { en: "Anacle Systems Ltd · facilities SaaS", id: "Anacle Systems Ltd · SaaS facilities" },
    year: "2023 – 2026",
    line: {
      en: "Feature work and ticket fixes on Anacle's enterprise facilities-management product.",
      id: "Pengembangan fitur dan perbaikan tiket di produk facilities management enterprise milik Anacle.",
    },
    parts: {
      en: [
        "Features shipped in cross-region releases",
        "Ticket-based maintenance for international clients",
        "Part of an international remote team",
      ],
      id: [
        "Fitur yang dirilis lintas region",
        "Maintenance berbasis tiket untuk klien internasional",
        "Bagian dari tim remote internasional",
      ],
    },
    stack: [".NET Core 8", "C#", "SQL Server", "Microservices", "GitLab CI"],
    url: "https://www.anaclesimplicity.com/",
    flow: {
      big: "Anacle",
      steps: [
        { en: "Ticket", id: "Tiket" },
        { en: "Feature", id: "Fitur" },
        { en: "Release", id: "Rilis" },
      ],
    },
  },
  {
    name: "Wonderful Works",
    role: { en: "Website & visual CMS", id: "Website & CMS visual" },
    line: {
      en: "Site and page composer for a Surabaya architecture and contracting firm.",
      id: "Website dan page composer untuk firma arsitektur dan kontraktor di Surabaya.",
    },
    parts: {
      en: ["Drag-and-drop page composer (Puck)", "Bilingual ID / EN content in PostgreSQL", "Deploys through Jenkins and Docker Compose"],
      id: ["Page composer drag-and-drop (Puck)", "Konten dwibahasa ID / EN di PostgreSQL", "Deploy lewat Jenkins dan Docker Compose"],
    },
    stack: ["Next.js 16", "React 19", "Prisma", "PostgreSQL", "Docker"],
    url: "https://wwconstruction.id",
    shots: {
      main: { src: "/projects/wwconstruction_01_landing_hero_en.png", label: "wwconstruction.id", zoom: 1.04 },
      sub: { src: "/projects/wwconstruction_06_luxury_residence_hq.jpg", label: "Portfolio · residence" },
    },
  },
  {
    name: "OpenClaw",
    role: { en: "Autonomous ops agent", id: "Agen ops otonom" },
    line: {
      en: "A watchdog that reads a VPS's logs, bans attackers, and reports on Telegram.",
      id: "Pengawas server yang membaca log VPS, memblokir penyerang, dan melapor lewat Telegram.",
    },
    parts: {
      en: ["Log anomalies explained by an LLM", "SSH brute force detected and banned through Fail2ban", "CPU, RAM and disk thresholds", "Daily summary on Telegram"],
      id: ["Anomali log dijelaskan oleh LLM", "Brute force SSH dideteksi dan diblokir lewat Fail2ban", "Ambang CPU, RAM, dan disk", "Ringkasan harian lewat Telegram"],
    },
    stack: ["Node.js", "GPT-4o", "Fail2ban", "Bash", "Docker"],
    shots: {
      main: { src: "/projects/openclaw_01_telegram_ops_alerts_en.png", label: "Telegram · ops agent", zoom: 1.05, origin: "50% 0" },
      sub: { src: "/projects/openclaw_02_telegram_security_incident_en.png", label: "Incident report", zoom: 2.3, origin: "14% 78%" },
    },
  },
  {
    name: "Retail ERP & POS",
    role: { en: "Gold, tires, yarn", id: "Emas, ban, benang" },
    line: {
      en: "Vertical ERPs for shops with very specific stock problems.",
      id: "ERP vertikal untuk toko dengan masalah stok yang sangat spesifik.",
    },
    parts: {
      en: ["RFID jewelry audit: 2 hours down to 3 minutes", "Multi-warehouse tire ERP with A/R and A/P ledgers", "Dye-lot tracking for a yarn store"],
      id: ["Audit stok perhiasan dengan RFID: dari 2 jam menjadi 3 menit", "ERP ban multi-gudang dengan buku piutang dan hutang", "Pelacakan lot celup untuk toko benang"],
    },
    stack: ["Laravel 11", "Livewire 3", "MySQL 8", "RFID serial bridge"],
    shots: {
      main: { src: "/projects/jewel_02_gold_diamond_rfid_inventory_en.png", label: "Retail ERP · inventory", zoom: 1.06, origin: "50% 0" },
      sub: { src: "/projects/jewel_07_pos_gold_sales_invoices_en.png", label: "POS · invoices", zoom: 1.06, origin: "50% 0" },
    },
  },
  {
    name: "Qualiv",
    role: { en: "Founder · lead architect", id: "Founder · lead architect" },
    line: {
      en: "Multi-tenant AI recruitment SaaS, built from an empty repo.",
      id: "SaaS rekrutmen AI multi-tenant, dibangun dari repo kosong.",
    },
    parts: {
      en: ["CV parsing for PDF and DOCX", "Candidate logic tests", "AI interview simulation, chat and video", "BullMQ workers and Midtrans billing"],
      id: ["Parsing CV PDF dan DOCX", "Tes logika kandidat", "Simulasi wawancara AI, chat dan video", "Worker BullMQ dan billing Midtrans"],
    },
    stack: ["Next.js 16", "NestJS", "PostgreSQL", "Prisma", "Redis", "GPT-4o"],
    url: "https://qualiv.id",
    shots: {
      main: { src: "/projects/qualiv_01_landing_hero_en.png", label: "qualiv.id", zoom: 1.08, origin: "50% 0" },
      sub: { src: "/projects/qualiv_08_candidates_pipeline_en.png", label: "Recruiter · pipeline", zoom: 1.08, origin: "50% 0" },
    },
  },
];
