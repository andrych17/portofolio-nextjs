"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Index } from "../ui/Label";
import { useLanguage } from "@/context/LanguageContext";

interface WorkRowProps {
  index: number;
  title: string;
  description?: string;
  tags: string[];
  year?: string;
  href: string;
  emoji?: string;
}

export function WorkRow({ index, title, description, tags, year, href }: WorkRowProps) {
  const { lang } = useLanguage();

  return (
    <Link
      href={href}
      className="group relative block border-b border-[var(--line)] px-[var(--pad-x)] py-7 transition-colors hover:bg-[var(--bg-2)]/60 md:py-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left column: Number + Title + Description + Tags */}
        <div className="flex items-start gap-4 md:gap-6 min-w-0">
          <Index n={index} className="mt-1 shrink-0 transition-colors group-hover:text-[var(--accent)]" />

          <div className="min-w-0 space-y-2.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-xl md:text-2xl lg:text-[1.65rem] font-bold tracking-tight text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] leading-snug">
                {title}
              </h3>
              {year && (
                <span className="font-mono text-xs tabular-nums text-[var(--mut)] bg-[var(--bg-2)] border border-[var(--line)] px-2 py-0.5 rounded">
                  {year}
                </span>
              )}
            </div>

            {description && (
              <p className="text-sm md:text-[15px] text-[var(--mut)] leading-relaxed line-clamp-2 max-w-3xl">
                {description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {tags.slice(0, 4).map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="inline-flex items-center font-mono text-[11px] px-2.5 py-1 rounded-md bg-[var(--bg-2)] border border-[var(--line)] text-neutral-300 transition-colors group-hover:border-[var(--line-strong)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Action */}
        <div className="flex items-center gap-3 self-end md:self-center shrink-0 pt-2 md:pt-0">
          <span className="hidden font-mono text-xs uppercase tracking-wider text-[var(--mut)] transition-colors group-hover:text-[var(--fg)] sm:inline">
            {lang === "id" ? "Lihat Detail" : "View Project"}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-2)] text-[var(--mut)] transition-all duration-300 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg)]">
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

