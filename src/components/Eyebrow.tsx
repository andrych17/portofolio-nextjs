import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${className}`}
    >
      {children}
    </span>
  );
}
