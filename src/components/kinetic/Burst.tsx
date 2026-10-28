/** Twelve-point starburst used for stickers and separators. */
export function Burst({ className = "", fill = "currentColor" }: { className?: string; fill?: string }) {
  const points = Array.from({ length: 24 }, (_, i) => {
    const r = i % 2 ? 36 : 50;
    const a = (Math.PI * 2 * i) / 24 - Math.PI / 2;
    return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <polygon points={points} fill={fill} stroke="#121212" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}
