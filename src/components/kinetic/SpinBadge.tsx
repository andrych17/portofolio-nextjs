import { ArrowDownIcon } from "@phosphor-icons/react/ssr";

/** Rotating circular label with a still arrow in the middle. */
export function SpinBadge({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div aria-hidden className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className="size-full animate-spin-slow">
        <defs>
          <path id="k-badge" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <circle cx="100" cy="100" r="97" fill="#c6f432" stroke="#121212" strokeWidth="4" />
        <text fontSize="21" fontWeight="800" letterSpacing="3" fill="#121212" fontFamily="var(--font-archivo)">
          <textPath href="#k-badge">{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex size-[38%] items-center justify-center rounded-full border-2 border-k-ink bg-white">
        <ArrowDownIcon weight="bold" className="size-1/2" />
      </span>
    </div>
  );
}
