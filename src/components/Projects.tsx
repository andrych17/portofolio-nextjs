"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Sparkles,
  Package,
  Brain,
  TrendingUp,
  Building2,
  Factory,
  Wrench,
  FileBarChart,
  Bot,
  ScanLine as ScanLineIcon,
  HeartPulse,
  ShieldCheck,
  Store,
  Cloud,
  Gem,
  CircleDot,
  ShoppingBag,
  Cookie,
  X,
} from "lucide-react";
import { FloatingCodeSnippets, CyberGrid } from "./CodeAnimations";

type ProjectStatus = "done" | "in-progress" | "terminated";
type GroupKey = "tjiwi" | "tool-mgmt" | "anacle" | "freelance";

interface Project {
  id: number;
  group: GroupKey;
  title: string;
  description: string;
  images?: string[];
  emoji?: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  color: string;
  status?: ProjectStatus;
  liveUrl?: string;
  liveLabel?: string;
  featured?: boolean;
}

const projects: Project[] = [
  // ── JOB #1 — PT Tjiwi Kimia ───────────────────────────────
  {
    id: 101,
    group: "tjiwi",
    title: "Internal Reporting System",
    description:
      "Developed dozens of internal reports with heavily optimized SQL queries for a large pulp & paper manufacturer. Cut long-running report times from minutes to seconds. Mixed ASP Classic with .NET for newer modules.",
    emoji: "📊",
    icon: FileBarChart,
    tags: ["ASP Classic", ".NET", "VBScript", "SQL Server", "Query Optimization"],
    color: "from-amber-500 to-orange-500",
    featured: true,
  },
  {
    id: 102,
    group: "tjiwi",
    title: "WhatsApp Scheduler Bot",
    description:
      "Selenium-based scheduler that auto-captures dashboard screenshots and pushes them via WhatsApp Web to stakeholders on a fixed cadence.",
    emoji: "🤖",
    icon: Bot,
    tags: ["Selenium", "Python", "WhatsApp Web", "Task Scheduler"],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 103,
    group: "tjiwi",
    title: "Barcode Scanner Mobile App",
    description:
      "Mobile app for stationery & inventory management with barcode scanning to track stock-in / stock-out at the warehouse counter.",
    emoji: "📱",
    icon: ScanLineIcon,
    tags: ["Mobile", "Barcode", "Inventory", "REST API"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 104,
    group: "tjiwi",
    title: "Covid Employee Health Survey",
    description:
      "Internal web app to monitor employee health status during the pandemic, used company-wide for daily check-ins and contact-tracing reports.",
    emoji: "🩺",
    icon: HeartPulse,
    tags: [".NET", "Web App", "Internal Tool", "SQL Server"],
    color: "from-rose-500 to-pink-500",
  },

  // ── JOB #2 — Tool Management ──────────────────────────────
  {
    id: 201,
    group: "tool-mgmt",
    title: "Tool Management System (TMS)",
    description:
      "Maintained and improved a legacy enterprise Tool Management System. Drove a Java version upgrade, large refactor, and code-review process — significantly reducing incident tickets quarter over quarter.",
    emoji: "🛠️",
    icon: Wrench,
    tags: ["Java", "Spring", "SQL", "Refactoring", "Code Review"],
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
    emoji: "🛡️",
    icon: ShieldCheck,
    tags: ["SonarQube", "CI/CD", ".NET", "Quality Gates"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 302,
    group: "anacle",
    title: "SMRT Tenant Management System",
    description:
      "Development & maintenance of a mall tenant management platform for SMRT Singapore — leasing, billing, and tenant operations on a SaaS deployment. Newer modules built with Next.js + Nest.js on top of the legacy .NET core.",
    emoji: "🏬",
    icon: Store,
    tags: [".NET Core", "Next.js", "Nest.js", "SQL Server", "SaaS"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 303,
    group: "anacle",
    title: "Simplicity — Facilities Management SaaS",
    description:
      "Feature development and ticket-based maintenance on Simplicity, Anacle/MRI's enterprise facilities-management product. International remote team, cross-region releases.",
    emoji: "🏢",
    icon: Building2,
    tags: [".NET Framework", ".NET Core", "SQL Server", "SaaS"],
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
    emoji: "☁️",
    icon: Cloud,
    tags: [".NET Core", "Next.js", "Nest.js", "SharePoint API", "AWS S3", "Azure Blob", "RBAC"],
    color: "from-cyan-500 to-teal-500",
  },

  // ── FREELANCE — Done ──────────────────────────────────────
  {
    id: 401,
    group: "freelance",
    status: "done",
    title: "Knit and Cro Pluit — Yarn Store",
    description:
      "Full inventory & sales platform for Knit and Cro, a yarn retail store in Pluit, Jakarta. Purchasing, sales, stock opname, supplier & buyer master data, and reports. RBAC across admin, cashier, and warehouse roles.",
    images: ["/projects/trdretail1.png", "/projects/trdretail2.png"],
    icon: Package,
    tags: ["Laravel", "Livewire", "MySQL", "Tailwind", "RBAC"],
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 402,
    group: "freelance",
    status: "done",
    title: "Wijaya Mas Pluit — Jewelry Store with RFID",
    description:
      "POS and inventory for Wijaya Mas, a jewelry store in Pluit, Jakarta. RFID-based per-item tagging for fast, accurate stock identification. RBAC for owner, sales staff, and inventory roles.",
    images: ["/projects/trdjewel1.png", "/projects/trdjewel2.png"],
    icon: Gem,
    tags: ["Laravel", "Livewire", "RFID", "MySQL", "POS"],
    color: "from-amber-400 to-yellow-500",
  },
  {
    id: 403,
    group: "freelance",
    status: "done",
    title: "Cahaya Terang Surabaya — Tire Shop",
    description:
      "End-to-end management system for Cahaya Terang, a tire retail business in Surabaya: sales, purchasing, inventory, and full A/R & A/P (hutang piutang) tracking. Owner gets real-time visibility into outstanding debt and credit.",
    images: ["/projects/trdtire1.png", "/projects/trdtire2.png"],
    icon: CircleDot,
    tags: ["Laravel", "Livewire", "MySQL", "Accounting", "RBAC"],
    color: "from-slate-500 to-gray-700",
  },
  {
    id: 404,
    group: "freelance",
    status: "done",
    title: "Tiga Putra — Snack & Grocery Store",
    description:
      "End-to-end management system for a snack & grocery wholesale/retail store. Covers Purchase Orders, Sales Orders, Returns, Stock Opname, and full operational reporting. RBAC across owner, admin, cashier, and warehouse roles.",
    images: ["/projects/tigaputra.png", "/projects/tigaputra2.png"],
    icon: Cookie,
    tags: ["Laravel", "Livewire", "MySQL", "Inventory", "PO/SO", "RBAC"],
    color: "from-orange-500 to-amber-500",
    featured: true,
  },
  {
    id: 405,
    group: "freelance",
    status: "done",
    title: "Quiz Management App — Church Edition",
    description:
      "Volunteer project: a logic-test / quiz platform built for a church community. Real-time scoring, user management, and analytics dashboard.",
    images: [
      "/projects/logic_test.png",
      "/projects/logic_test2.png",
      "/projects/logic_test3.png",
    ],
    icon: Brain,
    tags: ["Next.js", "Nest.js", "TypeScript", "PostgreSQL", "WebSocket"],
    color: "from-purple-500 to-indigo-500",
  },

  // ── FREELANCE — In Progress ───────────────────────────────
  {
    id: 501,
    group: "freelance",
    status: "in-progress",
    title: "Knit and Cro — Online Shop (v2)",
    description:
      "Online storefront for Knit and Cro Pluit, extending the in-store yarn system: Midtrans payment gateway, dynamic shipping cost by destination, and an upgraded admin panel with full transaction management. RBAC across customer, admin, and operator.",
    images: ["/projects/retail2.png", "/projects/retail3.png"],
    icon: ShoppingBag,
    tags: ["Laravel", "Livewire", "Midtrans", "RajaOngkir", "MySQL", "RBAC"],
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    id: 502,
    group: "freelance",
    status: "in-progress",
    title: "PT Nagamasban — AI Sales Recommendation",
    description:
      "AI assistant for PT Nagamasban, a tire distributor: sales-recommendation engine plus training material for the in-store sales and admin teams (form sales, admin flow, etc). Layered on top of the existing tire-shop system.",
    images: ["/projects/ban1.png", "/projects/ban2.png"],
    icon: Sparkles,
    tags: ["Next.js", "Nest.js", "OpenAI", "AI/ML", "Recommendations"],
    color: "from-emerald-500 to-teal-500",
    featured: true,
  },
  {
    id: 503,
    group: "freelance",
    status: "terminated",
    title: "AI Signal Trading App",
    description:
      "Side project: scraped finance data from Investing.com & TradingView, ran AI signal generation, and pushed to a mobile app for real-time notifications. Shelved — kept as a reference build.",
    emoji: "📈",
    icon: TrendingUp,
    tags: ["Flutter", "Nest.js", "OpenAI", "Web Scraping", "WebSocket"],
    color: "from-cyan-500 to-blue-500",
  },
];

const groups: {
  key: GroupKey;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "tjiwi", label: "Tjiwi Kimia", sub: "Manufacturing", icon: Factory },
  { key: "tool-mgmt", label: "Tool Mgmt", sub: "Java Enterprise", icon: Wrench },
  { key: "anacle", label: "Anacle / MRI", sub: "Singapore SaaS", icon: Building2 },
  { key: "freelance", label: "Freelance", sub: "Client & Personal", icon: ShoppingCart },
];

const freelanceFilters: { key: "all" | "done" | "in-progress"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "done", label: "Done" },
  { key: "in-progress", label: "In Progress" },
];

const statusLabel = (s: ProjectStatus) =>
  s === "done" ? "Done" : s === "in-progress" ? "In Progress" : "Terminated";

const fmt = (n: number) => (n < 10 ? `0${n}` : `${n}`);

// ─── Editorial Cards ─────────────────────────────────────────────────────────

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
    <button
      onClick={() => onOpen(project)}
      className="group relative w-full text-left rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 hover:border-pink-500/40 transition-colors bg-gray-950/60 hover:shadow-[0_0_40px_-10px_rgba(236,72,153,0.35)]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/55 to-transparent" />
        {/* faint grain */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />

        {/* index numeral */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 font-mono text-[10px] md:text-xs tracking-[0.3em] text-white/45">
          № {fmt(number)}
        </div>

        {/* top-left badges */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col items-start gap-2">
          {project.featured && (
            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] text-amber-100 bg-amber-500/15 border border-amber-300/40 backdrop-blur">
              ★ Editor&apos;s Pick
            </span>
          )}
          {project.status && (
            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] text-white/90 bg-black/55 border border-white/15 backdrop-blur">
              {statusLabel(project.status)}
            </span>
          )}
        </div>

        {/* bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
          <div className="flex items-center gap-2.5 mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-pink-300/90">
            <span
              className={`inline-block w-6 h-px bg-gradient-to-r ${project.color}`}
            />
            <project.icon className="w-3 h-3" />
            <span>Lead Project</span>
          </div>

          <h3 className="text-2xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.05] tracking-tight mb-3 group-hover:text-pink-100 transition-colors">
            {project.title}
          </h3>

          <p className="hidden sm:block text-sm md:text-[15px] text-gray-300/90 max-w-2xl mb-4 line-clamp-2 lg:line-clamp-3">
            {project.description}
          </p>

          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-200 bg-white/5 border border-white/10 rounded"
                >
                  {t}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-400">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-pink-300 group-hover:text-pink-200 shrink-0">
              Open case
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </button>
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
    <button
      onClick={() => onOpen(project)}
      className="group relative w-full text-left rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/40 transition-colors bg-gray-950/60 flex min-h-[120px] md:min-h-0 flex-1"
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-950/60" />
      </div>

      {/* meta */}
      <div className="flex-1 p-3.5 md:p-4 lg:p-5 flex flex-col min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
            № {fmt(number)}
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-pink-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
        </div>
        <h4 className="text-sm md:text-[15px] font-bold text-white leading-snug mb-1.5 group-hover:text-pink-100 transition-colors line-clamp-2">
          {project.title}
        </h4>
        <p className="text-[11px] md:text-xs text-gray-400 leading-relaxed line-clamp-2 mb-auto">
          {project.description}
        </p>
        <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-white/5">
          <span
            className={`inline-block w-3 h-px bg-gradient-to-r ${project.color}`}
          />
          <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 truncate">
            {project.tags[0]} · {project.tags.length} stack
          </span>
          {project.status && (
            <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-white/45 shrink-0">
              {statusLabel(project.status)}
            </span>
          )}
        </div>
      </div>
    </button>
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
    <button
      onClick={() => onOpen(project)}
      className="group relative w-full text-left rounded-2xl overflow-hidden border border-white/10 hover:border-pink-500/40 transition-colors bg-gray-950/60 flex flex-col h-full"
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
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/10 to-transparent" />

        <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.25em] text-white/55">
          № {fmt(number)}
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {project.featured && (
            <span className="px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.18em] text-amber-100 bg-amber-500/15 border border-amber-300/40 backdrop-blur">
              ★ Pick
            </span>
          )}
          {project.status && (
            <span className="px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.15em] text-white/90 bg-black/60 border border-white/15 backdrop-blur">
              {statusLabel(project.status)}
            </span>
          )}
        </div>
      </div>

      {/* meta */}
      <div className="p-4 md:p-5 flex flex-col grow">
        <div className="flex items-center gap-2 mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-pink-300/70">
          <span
            className={`inline-block w-4 h-px bg-gradient-to-r ${project.color}`}
          />
          <project.icon className="w-3 h-3" />
        </div>

        <h4 className="text-base md:text-lg font-bold text-white leading-snug mb-2 group-hover:text-pink-100 transition-colors line-clamp-2">
          {project.title}
        </h4>

        <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {project.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 min-w-0">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gray-300 bg-white/5 border border-white/10 rounded truncate"
              >
                {t}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gray-500">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-pink-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
        </div>
      </div>
    </button>
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

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeGroup, setActiveGroup] = useState<GroupKey>("anacle");
  const [freelanceStatus, setFreelanceStatus] = useState<
    "all" | "done" | "in-progress"
  >("all");
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

  const filteredProjects = useMemo(() => {
    const inGroup = projects.filter((p) => p.group === activeGroup);
    const scoped =
      activeGroup !== "freelance" || freelanceStatus === "all"
        ? inGroup
        : inGroup.filter((p) => p.status === freelanceStatus);
    return [...scoped].sort(
      (a, b) => Number(!!b.featured) - Number(!!a.featured)
    );
  }, [activeGroup, freelanceStatus]);

  const totalCount = projects.length;
  const filterKey = `${activeGroup}-${freelanceStatus}`;

  return (
    <section
      id="projects"
      ref={ref}
      className="py-16 md:py-24 aurora-bg relative overflow-hidden"
    >
      <FloatingCodeSnippets />
      <CyberGrid />

      {/* ambient orbs (hidden on mobile via max-w + opacity, kept light) */}
      <motion.div
        aria-hidden
        className="hidden md:block absolute top-1/3 left-0 w-96 h-96 rounded-full blur-[120px] -translate-y-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.18), transparent 70%)",
        }}
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="hidden md:block absolute top-2/3 right-0 w-96 h-96 rounded-full blur-[120px] -translate-y-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.16), transparent 70%)",
        }}
        animate={{ x: [100, -100, 100] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* ── Editorial Header ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-5">
            <span className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-pink-300/90">
              Selected Works · Index 01–{fmt(totalCount)}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-pink-400/40 via-white/5 to-transparent" />
          </div>

          <div className="grid md:grid-cols-12 items-end gap-4 md:gap-6">
            <h2 className="md:col-span-9 text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight">
              The{" "}
              <span className="italic font-light bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                Archive
              </span>
            </h2>
            <p className="md:col-span-3 text-sm md:text-[13px] text-gray-400 leading-relaxed md:text-right">
              Three chapters of full-time work and a growing freelance practice.
              Each entry opens for the full case.
            </p>
          </div>
        </motion.div>

        {/* ── Group Tabs (newspaper-section style) ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="border-y border-white/10 mb-6 md:mb-8 -mx-4 md:mx-0"
        >
          <div className="flex overflow-x-auto scrollbar-hide px-4 md:px-0">
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
                  className={`shrink-0 relative py-4 md:py-5 pr-7 md:pr-12 text-left transition-colors ${
                    active
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-mono text-[10px] tracking-[0.3em] ${
                        active ? "text-pink-300" : "text-gray-600"
                      }`}
                    >
                      {fmt(i + 1)}
                    </span>
                    <span className="text-sm md:text-[15px] font-semibold tracking-tight whitespace-nowrap">
                      {g.label}
                    </span>
                    <span className="font-mono text-[10px] text-gray-500">
                      ({count})
                    </span>
                  </div>
                  <div className="text-[10px] md:text-[11px] text-gray-500 mt-0.5 ml-7 flex items-center gap-1.5 whitespace-nowrap">
                    <Icon className="w-3 h-3" />
                    <span>{g.sub}</span>
                  </div>
                  {active && (
                    <motion.span
                      layoutId="group-underline"
                      className="absolute -bottom-px left-0 right-7 md:right-12 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Sub-filter (Freelance) ───────────────────── */}
        {activeGroup === "freelance" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between mb-6 md:mb-8 gap-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
              Filter status
            </span>
            <div className="flex gap-1.5">
              {freelanceFilters.map((f) => {
                const active = freelanceStatus === f.key;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFreelanceStatus(f.key)}
                    className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] rounded-full border transition-colors ${
                      active
                        ? "text-white bg-white/10 border-pink-500/50"
                        : "text-gray-500 border-white/10 hover:border-white/30 hover:text-gray-300"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
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
            End of index
          </span>
          <span className="text-[10px] md:text-xs italic">
            ... and many more internal projects across SaaS, manufacturing &
            retail.
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
                    <span className="px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] text-amber-100 bg-amber-500/20 border border-amber-300/40 backdrop-blur">
                      ★ Editor&apos;s Pick
                    </span>
                  )}
                  {project.status && (
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur rounded-full font-mono text-[10px] uppercase tracking-[0.15em] text-white border border-white/20">
                      {statusLabel(project.status)}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 md:p-7">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`p-2 rounded-lg shrink-0 bg-gradient-to-r ${project.color}`}
                  >
                    <project.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold text-white leading-tight">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5">
                  {project.description}
                </p>

                <div className="mb-5">
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-gray-500 mb-2">
                    — Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-white/5 rounded-full font-mono text-[11px] uppercase tracking-wider text-gray-200 border border-white/10"
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
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm bg-gradient-to-r ${project.color} hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(236,72,153,0.25)]`}
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
