/** Deterministic wave, arithmetic only so server and client render the same path. */
export function wave(seed: number, n: number, base: number, amp: number, trend: number) {
  let s = seed >>> 0;
  return Array.from({ length: n }, (_, i) => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const r = s / 4294967296;
    const tri = Math.abs(((i * 0.7 + seed) % 4) - 2) - 1; // -1..1 triangle
    return Math.round((base + trend * i + tri * amp + (r - 0.5) * amp * 0.9) * 10) / 10;
  });
}

type Pt = [number, number];

/** Catmull-Rom spline converted to cubic Bezier segments. */
export function smooth(points: Pt[]) {
  const f = (n: number) => Math.round(n * 10) / 10;
  let d = `M${f(points[0][0])},${f(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return d;
}

/** Map a series to chart coordinates. */
export function toPoints(values: number[], w: number, h: number, min: number, max: number, padY = 8): Pt[] {
  return values.map((v, i) => [(i / (values.length - 1)) * w, padY + (1 - (v - min) / (max - min)) * (h - padY * 2)]);
}
