// Run with: npx tsx src/utils/__checks__/timeline.check.ts
import assert from "node:assert/strict";
import { CAREER_AXIS, progressFor, span, stepAt, wib, yearTicks, type Axis } from "../timeline";

const axis: Axis = [
  [2020, 1],
  [2021, 1],
];
assert.deepEqual(span([2020, 1], [2020, 7], axis), { left: 0, width: 50 });
assert.deepEqual(span([2020, 7], null, axis), { left: 50, width: 50 });
assert.deepEqual(span([2019, 1], [2020, 4], axis), { left: 0, width: 25 }, "clamps before the axis");

// Career roles on the real axis stay inside it and keep their order.
const mri = span([2022, 11], [2026, 3]);
const tjiwi = span([2019, 9], [2022, 2]);
assert.equal(tjiwi.left, 0);
assert.ok(mri.left > tjiwi.left + tjiwi.width && mri.left + mri.width < 100);
assert.deepEqual(
  yearTicks(CAREER_AXIS).map((t) => t.year),
  [2020, 2021, 2022, 2023, 2024, 2025, 2026],
);

assert.equal(stepAt(0, 4), 0);
assert.equal(stepAt(0.249, 4), 0);
assert.equal(stepAt(0.25, 4), 1);
assert.equal(stepAt(1, 4), 3);
assert.equal(stepAt(-0.2, 4), 0);
for (let i = 0; i < 4; i++) assert.equal(stepAt(progressFor(i, 4), 4), i, "jump target lands on its own step");

// 2026-10-08 23:30 UTC is already 06:30 the next morning in Surabaya.
assert.equal(wib(new Date("2026-10-08T23:30:00Z")), "06:30");

console.log("timeline ok");
