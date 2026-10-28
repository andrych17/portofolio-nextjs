"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getSector, getTemplate } from "@/lib/registry";

/** Slim pill on every demo: back to the gallery, and how to get this template. Hides while scrolling down. */
export function DemoBar() {
  const path = usePathname();
  const [sectorSlug, slug] = path.replace(/^\/template\/?/, "").split("/").filter(Boolean);
  const sector = getSector(sectorSlug ?? "");
  const template = getTemplate(sectorSlug ?? "", slug ?? "");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!sector) return null;
  return (
    <div
      data-demo-bar
      className={`fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#0c0c0c]/90 p-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[#f5f3ee] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/15 backdrop-blur transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${hidden ? "translate-y-24" : ""}`}
    >
      <Link href={`/template/${sector.slug}`} className="flex items-center gap-2 rounded-full px-3.5 py-2.5 transition-colors hover:bg-white/10">
        <ArrowLeftIcon size={13} weight="bold" aria-hidden />
        <span className="max-w-[9rem] truncate">{sector.name.split(" ")[0]} · {template?.name ?? "All"}</span>
      </Link>
      <Link href="/#contact" className="rounded-full bg-[#ff4d00] px-4 py-2.5 font-semibold text-[#0c0c0c]">
        Use this
      </Link>
    </div>
  );
}
