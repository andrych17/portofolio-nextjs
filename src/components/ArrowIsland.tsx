import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";

/** Arrow in its own circle; on hover the arrow exits top-right while a twin slides in. */
export function ArrowIsland({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <span aria-hidden className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}>
      <ArrowUpRightIcon
        size={size}
        weight="bold"
        className="transition-transform duration-500 ease-studio group-hover:translate-x-[150%] group-hover:-translate-y-[150%]"
      />
      <ArrowUpRightIcon
        size={size}
        weight="bold"
        className="absolute -translate-x-[150%] translate-y-[150%] transition-transform duration-500 ease-studio group-hover:translate-x-0 group-hover:translate-y-0"
      />
    </span>
  );
}
