// Asserts the palette actually meets WCAG AA against the real background,
// so a future token tweak can't silently ship unreadable text.
// Run with: npx tsx src/components/__checks__/tokens.check.ts
import assert from "node:assert/strict";

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const lum = (h: string) =>
  hex(h)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a: string, b: string) => (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);

const BG = "#0c0c0c";
const BG2 = "#151515";

const cases: [string, string, string, number][] = [
  ["fg/bg", "#d8d8d4", BG, 4.5],
  ["mut/bg", "#7b7b76", BG, 4.5],
  ["accent/bg", "#ff4d00", BG, 4.5],
  ["fg/bg2", "#d8d8d4", BG2, 4.5],
];

for (const [name, fg, bg, min] of cases) {
  const r = ratio(fg, bg);
  assert.ok(r >= min, `${name} contrast ${r.toFixed(2)} < ${min}`);
}

console.log("tokens ok");
