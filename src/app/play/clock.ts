// Pure time helpers for the /play HUD. Checked by src/app/play/__checks__/clock.check.ts.

const DAY = 86_400_000;
const SYNODIC = 29.530588853;
const NEW_MOON_REF = Date.UTC(2000, 0, 6, 18, 14); // a known new moon

export function moon(now: Date) {
  const age = ((((now.getTime() - NEW_MOON_REF) / DAY) % SYNODIC) + SYNODIC) % SYNODIC;
  const names = ["New", "Waxing crescent", "First quarter", "Waxing gibbous", "Full", "Waning gibbous", "Last quarter", "Waning crescent"];
  const name = names[Math.floor((age / SYNODIC) * 8 + 0.5) % 8];
  const toFull = (SYNODIC / 2 - age + SYNODIC) % SYNODIC;
  return { phase: age / SYNODIC, name, daysToFull: Math.round(toFull) % Math.round(SYNODIC) };
}

// SVG path of the lit part of a moon of radius r centred on 0,0 (lit limb on the right while waxing).
export function moonPath(phase: number, r: number): string {
  const waxing = phase < 0.5;
  const k = Math.cos(2 * Math.PI * phase);
  const rx = (Math.abs(k) * r).toFixed(2);
  const limb = waxing ? 1 : 0;
  const term = (waxing ? k > 0 : k < 0) ? 0 : 1;
  return `M0 ${-r}A${r} ${r} 0 0 ${limb} 0 ${r}A${rx} ${r} 0 0 ${term} 0 ${-r}Z`;
}

export function local(now: Date, timeZone = "Asia/Jakarta") {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone, month: "2-digit", day: "2-digit", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
    }).formatToParts(now).map((x) => [x.type, x.value]),
  );
  const hour = Number(p.hour);
  return { month: p.month, day: p.day, weekday: p.weekday.toUpperCase(), hhmm: `${p.hour}:${p.minute}`, hour, period: period(hour) };
}

export function period(hour: number): string {
  if (hour === 0) return "Dark hour";
  if (hour < 5) return "Late night";
  if (hour < 8) return "Early morning";
  if (hour < 12) return "Morning";
  if (hour < 13) return "Lunchtime";
  if (hour < 17) return "Afternoon";
  if (hour < 20) return "Evening";
  return "Night";
}

// Career as an RPG level: one level per full year since the start date.
export function level(now: Date, since: Date) {
  const years = now.getFullYear() - since.getFullYear() - (now < anniversary(since, now.getFullYear()) ? 1 : 0);
  const last = anniversary(since, since.getFullYear() + years);
  const next = anniversary(since, since.getFullYear() + years + 1);
  return {
    lv: years,
    progress: (now.getTime() - last.getTime()) / (next.getTime() - last.getTime()),
    daysToNext: Math.ceil((next.getTime() - now.getTime()) / DAY),
  };
}

function anniversary(since: Date, year: number) {
  const d = new Date(since);
  d.setFullYear(year);
  return d;
}

export function playtime(now: Date, since: Date): string {
  const min = Math.floor((now.getTime() - since.getTime()) / 60_000);
  return `${Math.floor(min / 60).toLocaleString("en-US")}:${String(min % 60).padStart(2, "0")}`;
}
