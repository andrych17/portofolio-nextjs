export function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--mut)] ${className}`}
    >
      {children}
    </span>
  );
}

export function Index({ n, className = "" }: { n: number; className?: string }) {
  return (
    <Label className={`tabular-nums ${className}`}>{String(n).padStart(2, "0")}</Label>
  );
}

export function SectionHead({ index, label }: { index: string; label: string }) {
  return (
    <div className="sticky top-16 z-10 flex items-center gap-3 border-b border-[var(--line)] bg-[var(--bg)]/90 px-[var(--pad-x)] py-4 backdrop-blur-sm">
      <Label className="tabular-nums">{index}</Label>
      <Label>{label}</Label>
    </div>
  );
}
