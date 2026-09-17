"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Index } from "../ui/Label";

interface WorkRowProps {
  index: number;
  title: string;
  tags: string[];
  year?: string;
  href: string;
  image?: string;
}

export function WorkRow({ index, title, tags, year, href, image }: WorkRowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      className="group relative flex items-center gap-4 border-b border-[var(--line)] px-[var(--pad-x)] py-7 transition-all duration-300 hover:bg-white/[0.03] md:min-h-[92px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Index n={index} className="w-8 shrink-0" />

      <span className="flex-1 min-w-0 truncate text-lg md:text-2xl font-bold text-[var(--fg)] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--accent)]">
        {title}
      </span>

      <span className="hidden md:block shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mut)] max-w-[28ch] truncate px-3 py-1 rounded-full bg-white/5 border border-white/10">
        {tags.slice(0, 3).join(" · ")}
      </span>

      {year && (
        <span className="hidden sm:block shrink-0 font-mono text-xs tabular-nums text-[var(--mut)]">
          {year}
        </span>
      )}

      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:scale-110">
        <ArrowUpRight className="w-4 h-4 text-[var(--fg-2)] transition-colors group-hover:text-[var(--bg)]" />
      </div>

      {image && (
        <div
          aria-hidden
          className={`pointer-events-none absolute right-[var(--pad-x)] top-1/2 hidden -translate-y-1/2 overflow-hidden rounded-2xl border border-white/20 shadow-2xl transition-all duration-500 ease-out lg:block ${
            hovered ? "w-[240px] h-[150px] opacity-100 scale-100 rotate-1" : "w-0 h-[150px] opacity-0 scale-95"
          }`}
          style={{ marginRight: "14ch" }}
        >
          <Image src={image} alt="" fill sizes="240px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
    </Link>
  );
}
