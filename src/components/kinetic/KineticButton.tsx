import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ReactNode } from "react";

type KineticButtonProps = { href: string; children: ReactNode; tone?: "accent" | "yellow" | "white" | "ink" };

const tones = {
  accent: "bg-accent text-k-ink",
  yellow: "bg-k-yellow text-k-ink",
  white: "bg-white text-k-ink",
  ink: "bg-k-ink text-white",
};

export function KineticButton({ href, children, tone = "accent" }: KineticButtonProps) {
  return (
    <Link
      href={href}
      className={`k-shadow group inline-flex items-center gap-3 rounded-full border-2 border-k-ink py-2 pl-6 pr-2 font-display text-sm font-extrabold uppercase tracking-wide ${tones[tone]}`}
    >
      {children}
      <span
        aria-hidden
        className={`flex size-9 items-center justify-center rounded-full transition-transform duration-500 ease-studio group-hover:rotate-45 ${tone === "ink" ? "bg-white text-k-ink" : "bg-k-ink text-white"}`}
      >
        <ArrowUpRightIcon size={16} weight="bold" />
      </span>
    </Link>
  );
}
