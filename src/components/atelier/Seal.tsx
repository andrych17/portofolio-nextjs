/** Rotating circular text seal. */
export function Seal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={`animate-spin-slow ${className}`}>
      <defs>
        <path id="seal-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <circle cx="100" cy="100" r="99" fill="currentColor" className="text-accent" />
      <text fill="#f2ede4" fontSize="17" letterSpacing="5" fontFamily="var(--font-hanken)">
        <textPath href="#seal-path">{text}</textPath>
      </text>
      <path d="M100 76c3 14 10 21 24 24-14 3-21 10-24 24-3-14-10-21-24-24 14-3 21-10 24-24Z" fill="#f2ede4" />
    </svg>
  );
}
