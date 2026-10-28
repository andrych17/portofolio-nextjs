import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";

const tones = {
  brass: { btn: "bg-accent text-accent-fg hover:bg-[#c29d57]", island: "bg-[#0f2a20]/15" },
  forest: { btn: "bg-[#0f2a20] text-[#f6f2ea] hover:bg-[#17382b]", island: "bg-white/10" },
  glass: { btn: "bg-white/10 text-[#f6f2ea] ring-1 ring-white/30 backdrop-blur hover:bg-white/20", island: "bg-white/15" },
  ghost: { btn: "text-fg ring-1 ring-fg/20 hover:bg-fg/[0.05]", island: "bg-fg/10" },
} as const;

type EstateButtonProps = {
  href: string;
  children: ReactNode;
  tone?: keyof typeof tones;
  size?: "md" | "lg";
  className?: string;
};

export function EstateButton({ href, children, tone = "brass", size = "md", className = "" }: EstateButtonProps) {
  const t = tones[tone];
  const scale = size === "lg" ? "py-2.5 pl-8 pr-2.5 text-base" : "py-2 pl-6 pr-2 text-sm";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 rounded-full font-semibold tracking-tight transition-colors duration-500 ease-studio ${t.btn} ${scale} ${className}`}
    >
      {children}
      <ArrowIsland className={`${size === "lg" ? "size-11" : "size-9"} ${t.island}`} />
    </Link>
  );
}
