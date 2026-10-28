/** Three scoops on a cone. The brand mark. */
export function Scoop({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" aria-hidden className={className}>
      <path d="M10 26 20 47 30 26Z" fill="#ffd23f" stroke="#121212" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="13" cy="20" r="8" fill="#ff8fc7" stroke="#121212" strokeWidth="2.5" />
      <circle cx="27" cy="20" r="8" fill="#c6f432" stroke="#121212" strokeWidth="2.5" />
      <circle cx="20" cy="10" r="8" fill="#ff4a1c" stroke="#121212" strokeWidth="2.5" />
    </svg>
  );
}
