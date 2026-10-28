/** Page-entry wipe. Pure CSS so it never blocks content if JavaScript is slow. */
export function Curtain({ className = "bg-accent" }: { className?: string }) {
  return <div aria-hidden className={`curtain pointer-events-none fixed inset-0 z-[80] ${className}`} />;
}
