"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Index } from "../ui/Label";

interface WorkRowProps {
  index: number;
  title: string;
  tags: string[];
  year?: string;
  href: string;
}

export function WorkRow({ index, title, tags, year, href }: WorkRowProps) {
  return (
    <Link
      href={href}
      className="group relative grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-2 border-b border-[var(--line)] px-[var(--pad-x)] py-7 md:grid-cols-[3rem_1fr_14rem_10rem_2rem] md:py-9"
    >
      {/* Hover wash rises from the bottom edge */}
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--bg-2)] transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:scale-y-100"
      />

      <Index n={index} className="relative transition-colors group-hover:text-[var(--accent)]" />

      <span className="display relative min-w-0 break-words text-[clamp(1.6rem,1rem+2.6vw,3.75rem)] leading-[0.92] text-[var(--fg)] transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:translate-x-3">
        {title}
      </span>

      <span className="relative col-start-2 font-mono text-xs uppercase tracking-[0.12em] text-[var(--mut)] md:col-start-auto md:truncate">
        {tags.slice(0, 3).join(" / ")}
      </span>

      {year && (
        <span className="relative hidden whitespace-nowrap font-mono text-xs tabular-nums text-[var(--mut)] md:block">{year}</span>
      )}

      <ArrowUpRight
        aria-hidden
        className="relative col-start-3 row-start-1 h-5 w-5 justify-self-end text-[var(--mut)] transition-all duration-300 group-hover:rotate-45 group-hover:text-[var(--accent)] md:col-start-auto md:row-start-auto"
      />
    </Link>
  );
}

