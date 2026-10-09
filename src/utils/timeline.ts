// Pure helpers for the home page: career axis geometry, pinned-scroll stepping, Surabaya clock.
// Checked by src/utils/__checks__/timeline.check.ts.

export type YM = readonly [year: number, month: number];
export type Axis = readonly [YM, YM];

// Fixed ends so server and client render the same markup; ongoing roles simply run to the end.
export const CAREER_AXIS: Axis = [
  [2019, 9],
  [2027, 1],
];

const months = ([y, m]: YM) => y * 12 + m - 1;

/** Left offset and width (percent) of a span on the axis. `to = null` means ongoing. */
export function span(from: YM, to: YM | null, axis: Axis = CAREER_AXIS): { left: number; width: number } {
  const a = months(axis[0]);
  const b = months(axis[1]);
  const pct = (v: number) => Math.min(100, Math.max(0, ((v - a) / (b - a)) * 100));
  const left = pct(months(from));
  return { left, width: (to ? pct(months(to)) : 100) - left };
}

/** January ticks strictly inside the axis. */
export function yearTicks(axis: Axis = CAREER_AXIS): { year: number; left: number }[] {
  const out: { year: number; left: number }[] = [];
  for (let y = axis[0][0] + 1; y <= axis[1][0]; y++) {
    const { left } = span([y, 1], null, axis);
    if (left > 0 && left < 100) out.push({ year: y, left });
  }
  return out;
}

/** Which of n pinned steps shows at scroll progress p (0..1). */
export function stepAt(p: number, n: number): number {
  return Math.min(n - 1, Math.max(0, Math.floor(p * n)));
}

/** Scroll progress that lands in the middle of step i. */
export function progressFor(i: number, n: number): number {
  return (i + 0.5) / n;
}

/** "06:30": wall-clock time in Surabaya (WIB, UTC+7). */
export function wib(now: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now);
}
