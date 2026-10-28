"use client";

import { CheckIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type FormEvent } from "react";
import { easeStudio } from "@/components/motion/ease";

type Lane = { from: string; to: string; mode: string; cargo: string; hubs: [string, string, string]; verbs: [string, string] };

const LANES: Lane[] = [
  { from: "Shenzhen, CN", to: "Hamburg, DE", mode: "Rail", cargo: "18 pallets, consumer electronics", hubs: ["Shenzhen rail terminal", "Alashankou border", "Duisburg terminal"], verbs: ["Train departed", "Crossed the border"] },
  { from: "Santos, BR", to: "Rotterdam, NL", mode: "Sea", cargo: "2 x 40 ft reefer, fresh fruit", hubs: ["Port of Santos", "Atlantic crossing", "Maasvlakte terminal"], verbs: ["Vessel departed", "At sea"] },
  { from: "Mumbai, IN", to: "Chicago, US", mode: "Air", cargo: "6 pallets, temperature controlled", hubs: ["Mumbai airport", "Frankfurt gateway", "Chicago O'Hare"], verbs: ["Flight departed", "Transfer complete"] },
  { from: "Rotterdam, NL", to: "Warsaw, PL", mode: "Road", cargo: "Full truckload, 22 pallets", hubs: ["Rotterdam depot", "Hannover cross-dock", "Warsaw depot"], verbs: ["Truck departed", "Crossed the border"] },
  { from: "Shanghai, CN", to: "Los Angeles, US", mode: "Sea", cargo: "1 x 40 ft HC, furniture", hubs: ["Yangshan terminal", "Pacific crossing", "San Pedro Bay"], verbs: ["Vessel departed", "At sea"] },
  { from: "Dubai, AE", to: "Mumbai, IN", mode: "Air", cargo: "12 cartons, spare parts", hubs: ["Dubai airport", "Over the Arabian Sea", "Mumbai airport"], verbs: ["Flight departed", "In flight"] },
];

const DAYS = [0, 1, 2, 5, 9, 11, 12];
const BASE = Date.UTC(2026, 9, 12);
const SAMPLE = ["FRT-4821-0097", "BK2290174"];

function hash(text: string) {
  let h = 2166136261;
  for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const day = (offset: number) => {
  const d = new Date(BASE + offset * 86_400_000);
  return `${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS[d.getUTCMonth()]}`;
};

function lookup(raw: string) {
  const code = raw.trim().toUpperCase();
  const h = hash(code);
  const lane = LANES[h % LANES.length];
  const shift = (h >>> 5) % 4;
  const current = 2 + ((h >>> 9) % 4); // 2..5
  const steps = [
    { title: "Booking confirmed", place: lane.from },
    { title: "Picked up and sealed", place: lane.from },
    { title: lane.verbs[0], place: lane.hubs[0] },
    { title: lane.verbs[1], place: lane.hubs[1] },
    { title: "Arrived at destination hub", place: lane.hubs[2] },
    { title: "Customs cleared", place: lane.to },
    { title: "Delivered", place: lane.to },
  ].map((s, i) => {
    const hh = String(6 + ((h >>> (i + 3)) % 14)).padStart(2, "0");
    const mm = String((h >>> (i + 11)) % 60).padStart(2, "0");
    return { ...s, date: day(DAYS[i] + shift), time: `${hh}:${mm}`, done: i < current, now: i === current };
  });
  return { code, lane, steps, current, eta: day(DAYS[6] + shift), progress: current / (steps.length - 1) };
}

type Result = ReturnType<typeof lookup>;

export function TrackingWidget() {
  const inputId = useId();
  const [value, setValue] = useState(SAMPLE[0]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(() => lookup(SAMPLE[0]));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function run(code: string) {
    if (!/^[A-Za-z0-9][A-Za-z0-9 -]{5,29}$/.test(code.trim())) {
      setError("Enter the 6 to 30 characters of your booking or tracking number.");
      setResult(null);
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setResult(lookup(code));
      setLoading(false);
    }, 650);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(value);
  }

  return (
    <div className="rounded-[2rem] bg-fg/[0.04] p-1.5 ring-1 ring-fg/10 backdrop-blur-sm">
      <div className="rounded-[calc(2rem-0.375rem)] bg-surface p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.07)] md:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 id="track-heading" className="font-display text-2xl font-semibold md:text-3xl">
            Track a shipment
          </h2>
          <span className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:flex">
            <span className="size-1.5 animate-blink rounded-full bg-accent" />
            Live demo
          </span>
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <label htmlFor={inputId} className="sr-only">
              Booking or tracking number
            </label>
            <MagnifyingGlassIcon aria-hidden size={18} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              id={inputId}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Booking or tracking number"
              autoComplete="off"
              aria-invalid={error ? true : undefined}
              aria-describedby={`${inputId}-hint`}
              className="h-14 w-full rounded-full bg-bg/70 pl-12 pr-5 font-mono text-[15px] uppercase tracking-wide text-fg ring-1 ring-fg/15 transition-shadow placeholder:normal-case placeholder:tracking-normal placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-accent aria-[invalid]:ring-accent"
            />
          </div>
          <button type="submit" className="h-14 cursor-pointer rounded-full bg-accent px-8 text-[15px] font-semibold text-accent-fg transition-transform duration-500 ease-studio hover:scale-[1.03] active:scale-[0.98]">
            Track
          </button>
        </form>
        <p id={`${inputId}-hint`} role={error ? "alert" : undefined} className={`mt-3 text-sm ${error ? "text-accent" : "text-muted"}`}>
          {error || (
            <>
              Type any code to see how it works, or try{" "}
              {SAMPLE.map((s, i) => (
                <span key={s}>
                  <button type="button" onClick={() => { setValue(s); run(s); }} className="cursor-pointer font-mono text-fg underline decoration-accent underline-offset-4">
                    {s}
                  </button>
                  {i < SAMPLE.length - 1 ? " or " : ""}
                </span>
              ))}
              . Results here are sample data.
            </>
          )}
        </p>

        <div aria-live="polite" className="mt-6 min-h-[2px]">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3" aria-label="Looking up shipment">
                {[88, 64, 76].map((w) => (
                  <div key={w} className="h-4 animate-pulse rounded-full bg-fg/10" style={{ width: `${w}%` }} />
                ))}
              </motion.div>
            )}
            {result && <ResultView key={result.code} r={result} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ResultView({ r }: { r: Result }) {
  const status = r.steps[r.current].title;
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: easeStudio }} className="grid gap-8 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">Reference</p>
        <p className="mt-1 break-all font-mono text-2xl font-medium">{r.code}</p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">
          <span className="size-1.5 rounded-full bg-accent" />
          {status}
        </span>
        <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
          <Item label="Mode" value={r.lane.mode} />
          <Item label="Estimated delivery" value={r.eta} />
          <Item label="Cargo" value={r.lane.cargo} className="col-span-2" />
        </dl>
        <div className="mt-7">
          <div className="flex justify-between text-sm">
            <span>{r.lane.from}</span>
            <span className="text-right">{r.lane.to}</span>
          </div>
          <div className="relative mt-3 h-1.5 rounded-full bg-fg/12">
            <motion.div className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-accent" initial={{ scaleX: 0 }} animate={{ scaleX: r.progress }} transition={{ duration: 1.4, ease: easeStudio, delay: 0.2 }} />
            <motion.span className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg ring-4 ring-accent/40" initial={{ left: "0%" }} animate={{ left: `${r.progress * 100}%` }} transition={{ duration: 1.4, ease: easeStudio, delay: 0.2 }} />
          </div>
        </div>
      </div>

      <ol className="relative" aria-label="Shipment timeline">
        <motion.span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-line" />
        <motion.span aria-hidden className="absolute left-[11px] top-3 w-px origin-top bg-accent" style={{ height: `calc(${(r.current / (r.steps.length - 1)) * 100}% - 0.75rem)` }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.2, ease: easeStudio, delay: 0.3 }} />
        {r.steps.map((s, i) => (
          <motion.li key={s.title} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: easeStudio, delay: 0.15 + i * 0.07 }} className="relative flex gap-4 pb-4 last:pb-0">
            <span className={`relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-accent-fg ${s.done ? "bg-accent" : s.now ? "bg-fg" : "bg-surface ring-1 ring-fg/25"}`}>
              {s.done ? <CheckIcon size={13} weight="bold" /> : s.now ? <span className="size-2 animate-blink rounded-full bg-accent" /> : null}
            </span>
            <div className={`flex-1 ${!s.done && !s.now ? "text-muted" : ""}`}>
              <p className={`text-[15px] leading-snug ${s.now ? "font-semibold" : ""}`}>{s.title}</p>
              <p className="text-[13px] text-muted">{s.place}</p>
            </div>
            <p className="shrink-0 text-right font-mono text-[12px] leading-snug text-muted">
              {s.done || s.now ? (
                <>
                  {s.date}
                  <br />
                  {s.time}
                </>
              ) : (
                <>
                  ETA
                  <br />
                  {s.date}
                </>
              )}
            </p>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}

function Item({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}
