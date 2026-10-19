import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Sparkles,
  Layers,
  Calendar,
  Award,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import Chrome from "@/components/v2/Chrome";
import Footer from "@/components/v2/Footer";
import TransitionLink from "@/components/v2/TransitionLink";
import { CONTACTS } from "@/components/v2/sections";
import {
  projects,
  getProjectBySlug,
  getProjectSlug,
  getAllProjectSlugs,
} from "@/data/projects";
import { ARCHIVE, HOME } from "@/lib/v2/routes";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://andryhuang.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Studi Kasus Tidak Ditemukan • Andry Huang",
    };
  }

  const title = `${project.title} • Studi Kasus & Arsitektur | Andry Huang`;
  const description =
    project.longDescription ||
    project.description ||
    `Studi kasus dan arsitektur sistem ${project.title} oleh Andry Huang.`;
  const canonicalUrl = `${SITE_URL}/works/${slug}`;
  const ogImage = project.images?.[0]
    ? `${SITE_URL}${project.images[0]}`
    : `${SITE_URL}/img/og-image.jpg?v=2`;

  return {
    title,
    description,
    keywords: [
      ...project.tags,
      project.title,
      "Studi Kasus",
      "Case Study",
      "Full-Stack Architecture",
      "AI Engineering",
      "Andry Huang",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: `${project.title} • Studi Kasus & Arsitektur`,
      description,
      siteName: "Andry Huang Portfolio",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} • Case Study`,
      description,
      images: [ogImage],
    },
  };
}

const groupLabels: Record<string, { en: string; id: string }> = {
  freelance: { en: "Client & Proprietary Build", id: "Klien & Produk Mandiri" },
  anacle: { en: "Anacle Systems Ltd · Enterprise SaaS", id: "Anacle Systems Ltd · SaaS Enterprise" },
  "tool-mgmt": { en: "Software House · Enterprise System", id: "Software House · Sistem Enterprise" },
  tjiwi: { en: "PT Tjiwi Kimia · Manufacturing System", id: "PT Tjiwi Kimia · Sistem Manufaktur" },
};

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const prevSlug = getProjectSlug(prevProject);
  const nextSlug = getProjectSlug(nextProject);

  const groupInfo = groupLabels[project.group] || {
    en: "Software Engineering Project",
    id: "Proyek Rekayasa Perangkat Lunak",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    description: project.longDescription || project.description,
    image: project.images?.[0]
      ? `${SITE_URL}${project.images[0]}`
      : `${SITE_URL}/img/og-image.jpg?v=2`,
    author: {
      "@type": "Person",
      name: "Andry Huang",
      url: SITE_URL,
      jobTitle: "Senior Full-Stack & AI Engineer",
    },
    publisher: {
      "@type": "Person",
      name: "Andry Huang",
      url: SITE_URL,
    },
    keywords: project.tags.join(", "),
    datePublished: "2024-01-01",
    inLanguage: ["id", "en"],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/works/${slug}`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portofolio",
        item: `${SITE_URL}/portofolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${SITE_URL}/works/${slug}`,
      },
    ],
  };

  const contactWa = `https://wa.me/6281357296386?text=Hi%20Andry%2C%20saya%20tertarik%20mendiskusikan%20proyek%20serupa%20${encodeURIComponent(
    project.title
  )}`;
  const contactMail = `mailto:${CONTACTS.email}?subject=Diskusi%20Proyek%20${encodeURIComponent(
    project.title
  )}`;

  return (
    <>
      <Chrome />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <main
        className="v2-work-detail v2-dark relative min-h-screen pt-28 md:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        data-section="dark"
      >
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs md:text-sm font-mono text-[var(--fg-note)] mb-8"
        >
          <TransitionLink href={HOME} className="hover:text-[var(--accent)] transition-colors">
            Beranda
          </TransitionLink>
          <span>/</span>
          <TransitionLink href={ARCHIVE} className="hover:text-[var(--accent)] transition-colors">
            Portofolio
          </TransitionLink>
          <span>/</span>
          <span className="text-[var(--fg)] truncate max-w-[200px] sm:max-w-none">
            {project.title}
          </span>
        </nav>

        {/* Header Hero Area */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="v2-eyebrow">
              <i />
              {groupInfo.id}
            </span>
            {project.featured && (
              <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] bg-[var(--tint)] border border-[var(--accent)]/40">
                Pilihan Unggulan
              </span>
            )}
            {project.year && (
              <span className="px-2.5 py-0.5 rounded-full font-mono text-[11px] text-[var(--fg-soft)] bg-[var(--tint)] border border-[var(--hair)]">
                {project.year}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--fg)] tracking-tight leading-[1.15] mb-6">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[var(--fg-soft)] leading-relaxed max-w-3xl mb-8">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.links
              ? project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v2-visit v2-visit-solid inline-flex items-center gap-2"
                  >
                    <ExternalLink size={16} strokeWidth={2} />
                    <span>{link.label}</span>
                  </a>
                ))
              : project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v2-visit v2-visit-solid inline-flex items-center gap-2"
                  >
                    <ExternalLink size={16} strokeWidth={2} />
                    <span>{project.liveLabel ?? "Kunjungi Situs Live"}</span>
                  </a>
                )}

            <a
              href={CONTACTS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="v2-visit inline-flex items-center gap-2"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>

            <TransitionLink
              href={ARCHIVE}
              className="v2-visit inline-flex items-center gap-2 text-[var(--fg-note)]"
            >
              <ArrowLeft size={16} />
              <span>Daftar Proyek</span>
            </TransitionLink>
          </div>
        </header>

        {/* Featured Visual / Screenshot Gallery */}
        {project.images && project.images.length > 0 && (
          <section className="mb-14" aria-label="Tangkapan Layar Proyek">
            {/* Main Primary Screenshot */}
            <figure className="v2-bezel mb-4 overflow-hidden rounded-2xl border border-[var(--hair)] bg-black/40 shadow-2xl">
              <figcaption className="v2-win-bar v2-mono px-4 py-2.5 flex items-center justify-between border-b border-[var(--hair)] bg-black/60 text-xs text-[var(--fg-note)]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                </div>
                <span>{slug}.andryhuang.com</span>
                <span className="opacity-0">•••</span>
              </figcaption>
              <div className="relative aspect-[16/10] w-full bg-gray-950">
                <Image
                  src={project.images[0]}
                  alt={`Tangkapan layar utama ${project.title}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover object-top"
                />
              </div>
            </figure>

            {/* Secondary Screenshots Grid */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.slice(1).map((src, idx) => (
                  <figure
                    key={idx}
                    className="v2-bezel overflow-hidden rounded-xl border border-[var(--hair)] bg-black/40 shadow-lg"
                  >
                    <figcaption className="px-3 py-2 border-b border-[var(--hair)] bg-black/60 text-[11px] font-mono text-[var(--fg-note)]">
                      Layar #{idx + 2}
                    </figcaption>
                    <div className="relative aspect-[16/10] w-full bg-gray-950">
                      <Image
                        src={src}
                        alt={`${project.title} screenshot ${idx + 2}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover object-top"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Detailed Case Study Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {/* Main Column: Deep-dive Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview / Story */}
            <section className="p-6 md:p-8 rounded-2xl border border-[var(--hair)] bg-white/[0.02]">
              <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-[var(--accent)] mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Gambaran &amp; Solusi Sistem
              </h2>
              <p className="text-[var(--fg)] text-base md:text-lg leading-relaxed whitespace-pre-line">
                {project.longDescription || project.description}
              </p>
            </section>

            {/* Key Features & Modules */}
            {project.features && project.features.length > 0 && (
              <section className="p-6 md:p-8 rounded-2xl border border-[var(--hair)] bg-white/[0.02]">
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-[var(--accent)] mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Fitur Utama &amp; Modul Kunci
                </h2>
                <ul className="space-y-3.5">
                  {project.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm md:text-base text-[var(--fg-soft)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Business Impact & Metrics */}
            {project.impact && (
              <section className="p-6 md:p-8 rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/[0.03]">
                <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-[var(--accent)] mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Dampak Bisnis &amp; Hasil Nyata
                </h2>
                <p className="text-base md:text-lg text-[var(--fg)] font-medium leading-relaxed">
                  {project.impact}
                </p>
              </section>
            )}
          </div>

          {/* Sidebar Column: Specifications & Meta */}
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-[var(--hair)] bg-white/[0.02]">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--fg-note)] mb-4">
                Informasi Proyek
              </h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-[var(--fg-note)] text-xs mb-1">Peran / Kategori</dt>
                  <dd className="text-[var(--fg)] font-medium">{groupInfo.id}</dd>
                </div>
                {project.year && (
                  <div>
                    <dt className="text-[var(--fg-note)] text-xs mb-1">Tahun Pengerjaan</dt>
                    <dd className="text-[var(--fg)] font-medium flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
                      {project.year}
                    </dd>
                  </div>
                )}
                {project.status && (
                  <div>
                    <dt className="text-[var(--fg-note)] text-xs mb-1">Status Proyek</dt>
                    <dd className="text-[var(--fg)] font-medium capitalize">
                      {project.status === "done"
                        ? "Selesai (Production)"
                        : project.status === "in-progress"
                        ? "Sedang Berjalan"
                        : "Dihentikan"}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Tech Stack Pills */}
            <div className="p-6 rounded-2xl border border-[var(--hair)] bg-white/[0.02]">
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--fg-note)] mb-4">
                Teknologi yang Digunakan
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 rounded-full font-mono text-xs text-[var(--fg-soft)] border border-[var(--hair)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Collaboration CTA Card */}
            <div className="p-6 rounded-2xl border border-[var(--accent)]/40 bg-gradient-to-br from-[var(--accent)]/10 to-transparent">
              <h3 className="text-base font-bold text-[var(--fg)] mb-2">
                Butuh Sistem Serupa?
              </h3>
              <p className="text-xs text-[var(--fg-soft)] leading-relaxed mb-5">
                Saya terbuka untuk project freelance, arsitektur AI, maupun full-time remote role.
              </p>
              <div className="space-y-2.5">
                <a
                  href={contactWa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold bg-[var(--accent)] text-[var(--ink)] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare size={16} />
                  <span>Chat via WhatsApp</span>
                </a>
                <a
                  href={contactMail}
                  className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-medium border border-[var(--hair)] hover:bg-white/5 text-[var(--fg)] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Kirim Email</span>
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Adjacent Projects Navigation */}
        <nav
          aria-label="Navigasi Proyek Lainnya"
          className="pt-8 border-t border-[var(--hair)] grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <TransitionLink
            href={`/works/${prevSlug}`}
            className="p-5 rounded-xl border border-[var(--hair)] hover:border-[var(--accent)]/40 transition-colors group flex items-center gap-4"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--fg-note)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
            <div className="min-w-0">
              <span className="block text-[11px] font-mono text-[var(--fg-note)] uppercase tracking-wider">
                Proyek Sebelumnya
              </span>
              <span className="block text-sm sm:text-base font-semibold text-[var(--fg)] truncate">
                {prevProject.title}
              </span>
            </div>
          </TransitionLink>

          <TransitionLink
            href={`/works/${nextSlug}`}
            className="p-5 rounded-xl border border-[var(--hair)] hover:border-[var(--accent)]/40 transition-colors group flex items-center justify-between gap-4 text-right"
          >
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] font-mono text-[var(--fg-note)] uppercase tracking-wider">
                Proyek Selanjutnya
              </span>
              <span className="block text-sm sm:text-base font-semibold text-[var(--fg)] truncate">
                {nextProject.title}
              </span>
            </div>
            <ArrowRight className="w-5 h-5 text-[var(--fg-note)] group-hover:text-[var(--accent)] transition-colors shrink-0" />
          </TransitionLink>
        </nav>
      </main>

      <Footer />
    </>
  );
}
