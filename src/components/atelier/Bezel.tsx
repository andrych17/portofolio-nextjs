import type { ReactNode } from "react";

/** Double-bezel shell: thin outer tray, inner core with a concentric radius. */
export function Bezel({ children, className = "", innerClassName = "" }: { children: ReactNode; className?: string; innerClassName?: string }) {
  return (
    <div className={`rounded-[2rem] bg-white/45 p-1.5 ring-1 ring-black/[0.06] ${className}`}>
      <div className={`h-full rounded-[calc(2rem-0.375rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] ${innerClassName}`}>{children}</div>
    </div>
  );
}
