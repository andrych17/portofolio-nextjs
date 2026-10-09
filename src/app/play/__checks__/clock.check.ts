// Run with: npx tsx src/app/play/__checks__/clock.check.ts
import assert from "node:assert/strict";
import { level, local, moon, period, playtime } from "../clock";

const SINCE = new Date("2019-09-01T00:00:00+07:00");

// Known moons (UTC): full 2026-09-26 16:49, new 2026-10-10 15:50.
assert.equal(moon(new Date("2026-09-26T16:49:00Z")).name, "Full");
assert.equal(moon(new Date("2026-10-10T15:50:00Z")).name, "New");
assert.equal(moon(new Date("2026-10-03T12:00:00Z")).name, "Last quarter");
assert.ok(moon(new Date("2026-09-24T00:00:00Z")).daysToFull <= 3);

assert.equal(period(0), "Dark hour");
assert.equal(period(9), "Morning");
assert.equal(period(21), "Night");

// 2026-10-08 23:30 UTC is already Friday 06:30 in Surabaya.
const t = local(new Date("2026-10-08T23:30:00Z"));
assert.deepEqual([t.weekday, t.hhmm, t.period], ["FRI", "06:30", "Early morning"]);

const a = level(new Date("2026-10-08T12:00:00+07:00"), SINCE);
assert.equal(a.lv, 7);
assert.ok(a.progress > 0.05 && a.progress < 0.15);
assert.equal(level(new Date("2026-08-31T12:00:00+07:00"), SINCE).lv, 6);

assert.equal(playtime(new Date(SINCE.getTime() + 90 * 60_000), SINCE), "1:30");

console.log("clock ok");
