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
      className="group relative flex items-center gap-4 border-b border-[var(--line)] px-[var(--pad-x)] py-6 transition-colors duration-300 hover:bg-[var(--bg-2)] md:min-h-[88px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Index n={index} className="w-8 shrink-0" />

      <span className="flex-1 min-w-0 truncate text-lg md:text-2xl font-medium text-[var(--fg)] transition-transform duration-300 group-hover:translate-x-2">
        {title}
      </span>

      <span className="hidden md:block shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mut)] max-w-[28ch] truncate">
        {tags.join(" · ")}
      </span>

      {year && (
        <span className="hidden sm:block shrink-0 font-mono text-xs tabular-nums text-[var(--mut)]">
          {year}
        </span>
      )}

      <ArrowUpRight className="w-4 h-4 shrink-0 text-[var(--mut)] transition-colors group-hover:text-[var(--accent)]" />

      {image && (
        <div
          aria-hidden
          className={`pointer-events-none absolute right-[var(--pad-x)] top-1/2 hidden -translate-y-1/2 overflow-hidden rounded-md border border-[var(--line)] transition-all duration-300 lg:block ${
            hovered ? "w-[200px] h-[130px] opacity-100" : "w-0 h-[130px] opacity-0"
          }`}
          style={{ marginRight: "18ch" }}
        >
          <Image src={image} alt="" fill sizes="200px" className="object-cover" />
        </div>
      )}
    </Link>
  );
}
