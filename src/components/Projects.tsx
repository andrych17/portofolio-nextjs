"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Building2,
  Wrench,
  Factory,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Github,
  Search,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Title } from "./ui/Title";

export {
  type ProjectStatus,
  type GroupKey,
  type Project,
  projects,
  PROJECT_SLUGS,
  getProjectSlug,
  getProjectBySlug,
  getAllProjectSlugs,
} from "@/data/projects";
import {
  type ProjectStatus,
  type GroupKey,
  type Project,
  projects,
  getProjectSlug,
} from "@/data/projects";

const groups: {
  key: GroupKey;
  label: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "freelance", label: "Side Projects", sub: "Client & Personal", icon: ShoppingCart },
  { key: "anacle", label: "Anacle Systems Ltd", sub: "Singapore SaaS", icon: Building2 },
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

/** Seeded random in [0, 1): the same title always produces the same cover. */
function seeded(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return () => {
    h = (h + 0x6d2b79f5) | 0;
    let x = Math.imul(h ^ (h >>> 15), 1 | h);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/** Cover for projects without screenshots: a band and a few slabs composed from the title, with the initials outlined on top. */
function Cover({ title }: { title: string }) {
  const rand = seeded(title);
  const initials = title
    .split(/[\s&/·-]+/)
    .filter((w) => /^[A-Za-z0-9]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const y1 = 48 + rand() * 38;
  const y2 = 6 + rand() * 46;
  const thick = 9 + rand() * 11;
  const slabs = [0, 1, 2].map(() => ({ x: rand() * 68, y: 6 + rand() * 80, w: 16 + rand() * 30, h: 3 + rand() * 5, o: 0.07 + rand() * 0.12 }));
  const side = ["start", "center", "end"][Math.floor(rand() * 3)];
  return (
    <div className="ah-cover" aria-hidden="true" style={{ "--j": side } as React.CSSProperties}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {slabs.map((sl, i) => (
          <polygon
            key={i}
            points={`${sl.x + 4},${sl.y} ${sl.x + sl.w + 4},${sl.y} ${sl.x + sl.w},${sl.y + sl.h} ${sl.x},${sl.y + sl.h}`}
            fill="#e9e6dc"
            opacity={sl.o}
          />
        ))}
        <polygon points={`0,${y1} 100,${y2} 100,${y2 + thick} 0,${y1 + thick}`} fill="#ff4d00" />
      </svg>
      <span>{initials}</span>
    </div>
  );
}

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
      className="ah-card group relative w-full text-left rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 hover:border-[var(--accent)]/60 transition-all duration-300 bg-[var(--bg-2)]/80 backdrop-blur-xl hover:shadow-[0_0_40px_-10px_rgba(255,77,0,0.3)] cursor-pointer select-none"
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
          <Cover title={project.title} />
        )}

        {/* deep gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/80 to-transparent" />

        {/* index numeral */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 font-mono text-[10px] md:text-xs tracking-[0.3em] text-[var(--mut)]">
          № {fmt(number)}
        </div>

        {/* top-left badges */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 flex flex-col items-start gap-2">
          {project.featured && (
            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] bg-[var(--bg)]/90 border border-[var(--accent)]/40 backdrop-blur">
              Editor&apos;s pick
            </span>
          )}
          {project.year && (
            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] tracking-[0.15em] text-[var(--fg)] bg-[var(--bg)]/80 border border-white/10 backdrop-blur">
              {project.year}
            </span>
          )}
          {project.status && (
            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--fg-2)] bg-[var(--bg)]/80 border border-white/10 backdrop-blur">
              {statusLabel(project.status)}
            </span>
          )}
        </div>

        {/* bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
          <div className="flex w-fit items-center gap-2.5 mb-3 py-1 pr-2.5 bg-[var(--bg)]/85 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">
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
                  className="px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--fg-2)] bg-white/5 border border-white/10 rounded-full"
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
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] shrink-0 font-semibold">
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
      className="ah-card group relative w-full text-left rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--accent)]/50 transition-all duration-300 bg-[var(--bg-2)]/80 backdrop-blur-xl flex min-h-[120px] md:min-h-0 flex-1 cursor-pointer select-none hover:shadow-lg"
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
          <Cover title={project.title} />
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
            <span className="ml-auto font-mono text-[9px] tracking-wider text-[var(--fg-2)] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full shrink-0">
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
      className="ah-card group relative w-full text-left rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--accent)]/50 transition-all duration-300 bg-[var(--bg-2)]/80 backdrop-blur-xl flex flex-col h-full cursor-pointer select-none hover:shadow-xl"
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
          <Cover title={project.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-2)] via-[var(--bg-2)]/30 to-transparent" />

        <div className="absolute top-3 right-3 font-mono text-[10px] tracking-[0.25em] text-[var(--mut)]">
          № {fmt(number)}
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {project.featured && (
            <span className="px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--accent)] bg-[var(--bg)]/90 border border-[var(--accent)]/40 backdrop-blur">
              Pick
            </span>
          )}
          {project.year && (
            <span className="px-2 py-0.5 rounded font-mono text-[9px] tracking-[0.15em] text-[var(--fg)] bg-[var(--bg)]/80 border border-white/10 backdrop-blur">
              {project.year}
            </span>
          )}
          {project.status && (
            <span className="px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--fg-2)] bg-[var(--bg)]/80 border border-white/10 backdrop-blur">
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
                className="px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--fg-2)] bg-white/5 border border-white/10 rounded-full truncate"
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
        • No entries in this filter •
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
  const [activeGroup, setActiveGroup] = useState<GroupKey>("freelance");
  const [freelanceStatus, setFreelanceStatus] = useState<
    "all" | "done" | "in-progress"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  // Deep link: /portofolio?p=<id> opens that project's case study (the v2 home links here).
  useEffect(() => {
    const wanted = Number(new URLSearchParams(window.location.search).get("p"));
    const project = projects.find((p) => p.id === wanted);
    if (!project) return;
    // Reading the URL has to wait for hydration, like the language in LanguageContext.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveGroup(project.group);
    setOpenProject(project);
  }, []);

  // Closing the case study drops ?p= again, so a reload does not reopen it.
  useEffect(() => {
    if (openProject || !window.location.search.includes("p=")) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("p");
    window.history.replaceState(window.history.state, "", url);
  }, [openProject]);

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
    <section id="projects" className="ah-arch">
      <div className="ah-arch-inner">
        {/* ── Header ───────────────────────────────────── */}
        <header className="ah-arch-head">
          <Title no={fmt(totalCount)} meta={lang === "id" ? "Koleksi lengkap · indeks" : "Complete collection · index"}>
            {lang === "id" ? "Portofolio" : "Portfolio"}
          </Title>
          <p className="ah-arch-lede">
            {lang === "id"
              ? "Koleksi lengkap proyek full-time dan proyek mandiri. Klik proyek untuk detail lengkap."
              : "Complete collection of full-time work and side projects. Each entry opens the full case."}
          </p>
        </header>

        {/* ── Search + stack filters ───────────────────── */}
        <div className="ah-arch-controls">
          <div className="ah-search">
            <Search className="ah-search-icon" size={16} strokeWidth={1.75} aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={lang === "id" ? "Cari proyek" : "Search projects"}
              placeholder={
                lang === "id"
                  ? "Cari nama proyek atau stack (.NET, Next.js, AI, POS, ERP, SQL)"
                  : "Search projects or stack (.NET, Next.js, AI, POS, ERP, SQL)"
              }
            />
            {searchQuery && (
              <button type="button" className="ah-search-clear" onClick={() => setSearchQuery("")} aria-label={lang === "id" ? "Hapus pencarian" : "Clear search"}>
                <X size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="ah-chips" role="group" aria-label={lang === "id" ? "Filter stack" : "Stack filter"}>
            <span className="ah-mono">Filter</span>
            {popularTags.map((tag) => {
              const active = selectedTag === tag.key;
              return (
                <button key={tag.key} type="button" className="ah-chip" data-on={active || undefined} aria-pressed={active} onClick={() => setSelectedTag(tag.key)}>
                  <span>{lang === "id" ? tag.labelId : tag.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Active filter notice, or the four chapters ─ */}
        {isFiltering ? (
          <div className="ah-notice" role="status">
            <span className="ah-mono">
              {lang === "id"
                ? `${filteredProjects.length} proyek cocok dengan filter`
                : `${filteredProjects.length} projects match the filter`}
            </span>
            <button
              type="button"
              className="ah-mono ah-notice-reset"
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("all");
              }}
            >
              {lang === "id" ? "Reset filter" : "Reset filters"}
              <X size={14} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <>
            <div className="ah-tabs" role="group" aria-label={lang === "id" ? "Bab karier" : "Career chapters"}>
              {groups.map((g, i) => {
                const Icon = g.icon;
                const active = activeGroup === g.key;
                const count = projects.filter((p) => p.group === g.key).length;
                return (
                  <button
                    key={g.key}
                    type="button"
                    className="ah-tab"
                    data-on={active || undefined}
                    aria-pressed={active}
                    onClick={() => {
                      setActiveGroup(g.key);
                      setFreelanceStatus("all");
                    }}
                  >
                    <span className="ah-mono ah-tab-no">{fmt(i + 1)}</span>
                    <span className="ah-tab-name">{g.label}</span>
                    <span className="ah-mono ah-tab-sub">
                      <Icon className="ah-tab-icon" />
                      {g.sub}
                    </span>
                    <span className="ah-mono ah-tab-count">
                      {count} {lang === "id" ? "proyek" : "projects"}
                    </span>
                  </button>
                );
              })}
            </div>

            {activeGroup === "freelance" && (
              <div className="ah-chips ah-status" role="group" aria-label={lang === "id" ? "Status pengerjaan" : "Project status"}>
                <span className="ah-mono">{lang === "id" ? "Status" : "Status"}</span>
                {freelanceFilters.map((f) => {
                  const active = freelanceStatus === f.key;
                  return (
                    <button key={f.key} type="button" className="ah-chip" data-on={active || undefined} aria-pressed={active} onClick={() => setFreelanceStatus(f.key)}>
                      <span>{f.label}</span>
                    </button>
                  );
                })}
              </div>
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

        <div className="ah-arch-end">
          <span className="ah-mono">{lang === "id" ? "Akhir indeks" : "End of index"}</span>
          <span>
            {lang === "id"
              ? "dan banyak proyek internal lain di SaaS enterprise, manufaktur, dan retail."
              : "and many more internal projects across SaaS, manufacturing and retail."}
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
        className="ah-dialog relative w-full md:max-w-3xl bg-gray-950 md:rounded-3xl rounded-t-3xl border border-white/10 shadow-2xl max-h-[92vh] md:max-h-[88vh] overflow-hidden flex flex-col"
      >
            {/* The handle sits on the cover: as its own row it read as a second sheet behind the first. */}
            <span aria-hidden="true" className="md:hidden absolute top-2.5 left-1/2 -translate-x-1/2 z-10 w-10 h-1 rounded-full bg-white/40" />

            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur text-white border border-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="overflow-y-auto">
              <div
                className="relative w-full aspect-video bg-[var(--bg-2)]"
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
                  <Cover title={project.title} />
                )}

                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] bg-[var(--bg)]/90 border border-[var(--accent)]/40 backdrop-blur">
                      Editor&apos;s pick
                    </span>
                  )}
                  {project.year && (
                    <span className="px-2.5 py-1 bg-[var(--bg)]/80 backdrop-blur rounded-full font-mono text-[10px] tracking-[0.15em] text-[var(--fg)] border border-[var(--line)]">
                      {project.year}
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
                  <div className="ah-impact mb-6 p-4">
                    <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--accent)] mb-1 flex items-center gap-1.5">
                      {lang === "id" ? "Hasil / Business Impact" : "Business Impact / Results"}
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--fg)] leading-relaxed font-medium">
                      {project.impact}
                    </p>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-[11px] font-mono uppercase tracking-[0.25em] text-[var(--mut)] mb-2">
                    • Tech Stack
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
                    href={`/works/${getProjectSlug(project)}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white text-sm bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <ExternalLink size={16} />
                    {lang === "id" ? "Halaman Penuh" : "Dedicated Page"}
                  </a>
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
                          rel="noopener"
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
                          rel="noopener"
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
