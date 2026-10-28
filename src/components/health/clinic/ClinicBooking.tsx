"use client";

import { ArrowLeftIcon, CheckIcon, PhoneCallIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { easeStudio } from "@/components/motion/ease";
import { clinic } from "@/content/health/clinic";
import { DoctorAvatar } from "./DoctorAvatar";
import type { BookDetail } from "./book";

type Day = { key: string; dow: string; d: number; mon: string; long: string; closed: boolean; saturday: boolean };

const STEPS = ["Service", "Doctor", "Date", "Time", "Details"] as const;
const SLOTS = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const toMinutes = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
const pad = (n: number) => String(n).padStart(2, "0");

const never = () => () => {};
/** The visitor's local date, empty on the server so markup matches until hydration. */
const readToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours() >= 17 ? 1 : 0}`;
};
const readMinutes = () => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};

function buildDays(from: Date, late: boolean): Day[] {
  const dow = new Intl.DateTimeFormat("en-GB", { weekday: "short" });
  const mon = new Intl.DateTimeFormat("en-GB", { month: "short" });
  const long = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" });
  return Array.from({ length: 14 }, (_, i) => {
    const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    const day = date.getDay();
    return {
      key: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
      dow: dow.format(date),
      d: date.getDate(),
      mon: mon.format(date),
      long: long.format(date),
      closed: day === 0 || (i === 0 && late),
      saturday: day === 6,
    };
  });
}

export function ClinicBooking() {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const today = useSyncExternalStore(never, readToday, () => "");
  const nowMin = useSyncExternalStore(never, readMinutes, () => 0);
  const days = useMemo(() => {
    if (!today) return [];
    const [y, m, d, late] = today.split("-").map(Number);
    return buildDays(new Date(y, m, d), late === 1);
  }, [today]);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const heading = useRef<HTMLHeadingElement>(null);
  const lastKey = useRef("0-idle");

  useEffect(() => {
    const onBook = (e: Event) => {
      const detail = (e as CustomEvent<BookDetail>).detail ?? {};
      const doc = clinic.doctors.find((d) => d.id === detail.doctor);
      const dept = doc?.dept ?? detail.dept;
      const service = clinic.services.find((s) => s.dept === dept);
      if (!service) return;
      setStatus("idle");
      setServiceId(service.id);
      setDoctorId(doc?.id ?? null);
      setDayKey(null);
      setTime(null);
      setStep(doc ? 2 : 1);
    };
    window.addEventListener("clinic:book", onBook);
    return () => window.removeEventListener("clinic:book", onBook);
  }, []);

  // Move focus to the new step heading, but never on first render (also safe under StrictMode double effects).
  useEffect(() => {
    const key = `${step}-${status}`;
    if (lastKey.current === key) return;
    lastKey.current = key;
    heading.current?.focus({ preventScroll: true });
  }, [step, status]);

  useEffect(() => {
    if (status !== "sending") return;
    const t = setTimeout(() => setStatus("done"), 900);
    return () => clearTimeout(t);
  }, [status]);

  const service = clinic.services.find((s) => s.id === serviceId);
  const doctors = useMemo(() => (service ? clinic.doctors.filter((d) => d.dept === service.dept) : []), [service]);
  const doctor = clinic.doctors.find((d) => d.id === doctorId);
  const day = days.find((d) => d.key === dayKey);
  const doctorLabel = doctorId === "any" ? (doctors.length ? "First available clinician" : "Lab team") : doctor?.name;

  const ready = [!!service, !!doctorId, !!dayKey, !!time, true][step];
  const reach = !service ? 0 : !doctorId ? 1 : !dayKey ? 2 : !time ? 3 : 4;
  const reference = `YB-${hash(`${serviceId}${doctorId}${dayKey}${time}`).toString(36).toUpperCase().slice(0, 5).padEnd(5, "0")}`;

  const taken = (slot: string) => {
    if (!day) return true;
    if (day.saturday && toMinutes(slot) > 15 * 60) return true;
    if (day.key === days[0]?.key && toMinutes(slot) < nowMin + 60) return true;
    return hash(`${doctorId}${day.key}${slot}`) % 4 === 0;
  };

  function next() {
    if (step < 4) return setStep(step + 1);
    const e: typeof errors = {};
    if (name.trim().length < 2) e.name = "Please add your name.";
    if (phone.replace(/\D/g, "").length < 6) e.phone = "Add a phone number we can reach you on.";
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
  }

  function reset() {
    setStatus("idle");
    setStep(0);
    setServiceId(null);
    setDoctorId(null);
    setDayKey(null);
    setTime(null);
    setName("");
    setPhone("");
  }

  const summary: [string, string | undefined][] = [
    ["Service", service ? `${service.label}, ${service.minutes} min` : undefined],
    ["Doctor", doctorLabel],
    ["Date", day?.long],
    ["Time", time ?? undefined],
  ];

  return (
    <div className="rounded-[2.4rem] bg-white/50 p-1.5 ring-1 ring-fg/10 md:p-2">
      <div className="grid overflow-hidden rounded-[calc(2.4rem-0.375rem)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_40px_80px_-50px_rgba(14,53,53,0.6)] md:grid-cols-[330px_1fr]">
        {/* Summary rail */}
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-fg p-8 text-bg md:flex" aria-label="Your visit so far">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-bg/55">Your visit</p>
            <ul className="mt-6 space-y-5">
              {summary.map(([label, value]) => (
                <li key={label} className="flex gap-3">
                  <span
                    aria-hidden
                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full transition-colors duration-500 ${value ? "bg-accent text-fg" : "bg-white/10 text-transparent"}`}
                  >
                    <CheckIcon size={13} weight="bold" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-bg/50">{label}</span>
                    <span className={`mt-1 block font-display text-xl leading-tight ${value ? "text-bg" : "text-bg/45"}`}>{value ?? "Not chosen yet"}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <a href={`tel:${clinic.phone.replace(/\s/g, "")}`} className="mt-10 flex items-center gap-3 rounded-2xl bg-white/[0.08] p-4 text-sm">
            <PhoneCallIcon size={20} weight="bold" aria-hidden className="text-accent" />
            <span>
              Prefer to talk?
              <span className="block font-semibold">{clinic.phone}</span>
            </span>
          </a>
        </aside>

        {/* Steps */}
        <div className="min-w-0 p-5 md:p-10">
          {status !== "done" && (
            <>
              <ol aria-label="Booking steps" className="flex gap-1.5">
                {STEPS.map((label, i) => (
                  <li key={label} className="min-w-0 flex-1">
                    <button
                      type="button"
                      disabled={i > reach}
                      onClick={() => setStep(i)}
                      aria-current={i === step ? "step" : undefined}
                      className="group flex w-full cursor-pointer flex-col gap-2 text-left disabled:cursor-default"
                    >
                      <span className="relative h-1 overflow-hidden rounded-full bg-fg/10">
                        <span className={`absolute inset-0 origin-left rounded-full bg-fg transition-transform duration-700 ease-studio ${i <= step ? "scale-x-100" : i <= reach ? "scale-x-[0.35]" : "scale-x-0"}`} />
                      </span>
                      <span className={`truncate text-xs font-semibold ${i === step ? "text-fg" : "text-muted"}`}>
                        <span className="hidden sm:inline">{i + 1}. </span>
                        {label}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="mt-8 min-h-[22rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.4, ease: easeStudio }}
                  >
                    {step === 0 && (
                      <Step title="What do you need?" headingRef={heading}>
                        <div role="radiogroup" aria-label="Service" className="grid gap-2.5 sm:grid-cols-2">
                          {clinic.services.map((s) => (
                            <Option
                              key={s.id}
                              name="service"
                              checked={serviceId === s.id}
                              onChange={() => {
                                setServiceId(s.id);
                                setDoctorId(null);
                                setTime(null);
                              }}
                            >
                              <span className="block text-[15px] font-semibold">{s.label}</span>
                              <span className="mt-0.5 block text-sm text-muted">{s.minutes} minutes</span>
                            </Option>
                          ))}
                        </div>
                      </Step>
                    )}

                    {step === 1 && (
                      <Step title="Who would you like to see?" headingRef={heading}>
                        <div role="radiogroup" aria-label="Doctor" className="grid gap-2.5 sm:grid-cols-2">
                          <Option name="doctor" checked={doctorId === "any"} onChange={() => (setDoctorId("any"), setTime(null))}>
                            <span className="block text-[15px] font-semibold">{doctors.length ? "First available" : "Lab team"}</span>
                            <span className="mt-0.5 block text-sm text-muted">{doctors.length ? "Earliest slot with any clinician" : "No doctor needed for this service"}</span>
                          </Option>
                          {doctors.map((d) => (
                            <Option key={d.id} name="doctor" checked={doctorId === d.id} onChange={() => (setDoctorId(d.id), setTime(null))}>
                              <span className="flex items-center gap-3">
                                <span className="size-12 shrink-0 overflow-hidden rounded-xl" style={{ background: d.look.bg }}>
                                  <DoctorAvatar look={d.look} className="size-full" />
                                </span>
                                <span>
                                  <span className="block text-[15px] font-semibold">{d.name}</span>
                                  <span className="block text-sm text-muted">{d.role}</span>
                                </span>
                              </span>
                            </Option>
                          ))}
                        </div>
                      </Step>
                    )}

                    {step === 2 && (
                      <Step title="Pick a day" headingRef={heading}>
                        {days.length === 0 ? (
                          <p className="text-muted">Loading dates...</p>
                        ) : (
                          <div role="radiogroup" aria-label="Date" className="grid grid-cols-7 gap-1.5 sm:gap-2">
                            {days.map((d) => (
                              <label key={d.key} className="cursor-pointer">
                                <input
                                  type="radio"
                                  name="date"
                                  className="peer sr-only"
                                  disabled={d.closed}
                                  checked={dayKey === d.key}
                                  onChange={() => (setDayKey(d.key), setTime(null))}
                                />
                                <span className="flex min-h-[4.2rem] flex-col items-center justify-center rounded-2xl text-center ring-1 ring-fg/12 transition-colors duration-300 peer-checked:bg-fg peer-checked:text-bg peer-checked:ring-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent peer-disabled:cursor-not-allowed peer-disabled:opacity-35 hover:ring-fg/40">
                                  <span className="text-[11px] font-semibold uppercase tracking-wide opacity-70">{d.dow}</span>
                                  <span className="font-display text-xl leading-tight">{d.d}</span>
                                  <span className="text-[10px] opacity-60">{d.closed ? "Closed" : d.mon}</span>
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                        <p className="mt-4 text-sm text-muted">Saturdays run until 15:00. Sunday is emergency desk only.</p>
                      </Step>
                    )}

                    {step === 3 && (
                      <Step title={day ? `Times on ${day.long}` : "Pick a time"} headingRef={heading}>
                        <div role="radiogroup" aria-label="Time" className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
                          {SLOTS.map((slot) => (
                            <label key={slot} className="cursor-pointer">
                              <input type="radio" name="time" className="peer sr-only" disabled={taken(slot)} checked={time === slot} onChange={() => setTime(slot)} />
                              <span className="flex min-h-12 items-center justify-center rounded-full text-[15px] font-semibold ring-1 ring-fg/12 transition-colors duration-300 peer-checked:bg-accent peer-checked:text-fg peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-fg peer-disabled:cursor-not-allowed peer-disabled:line-through peer-disabled:opacity-30 hover:ring-fg/40">
                                {slot}
                              </span>
                            </label>
                          ))}
                        </div>
                      </Step>
                    )}

                    {step === 4 && (
                      <Step title="Last step. Who is this for?" headingRef={heading}>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field label="Full name" value={name} onChange={setName} error={errors.name} autoComplete="name" />
                          <Field label="Phone" value={phone} onChange={setPhone} error={errors.phone} autoComplete="tel" type="tel" />
                        </div>
                        <p className="mt-5 text-sm leading-relaxed text-muted">
                          Demo widget. Nothing is saved or sent. Connect it to your scheduling system to take real bookings.
                        </p>
                        <dl className="mt-6 space-y-1.5 rounded-2xl bg-bg p-4 text-sm md:hidden">
                          {summary.map(([label, value]) => (
                            <div key={label} className="flex justify-between gap-4">
                              <dt className="text-muted">{label}</dt>
                              <dd className="text-right font-semibold">{value}</dd>
                            </div>
                          ))}
                        </dl>
                      </Step>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-fg/10 pt-6">
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 0}
                  className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full px-4 text-[15px] font-semibold text-fg/70 transition-opacity hover:text-fg disabled:pointer-events-none disabled:opacity-0"
                >
                  <ArrowLeftIcon size={16} weight="bold" aria-hidden /> Back
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!ready || status === "sending"}
                  className="inline-flex min-h-12 cursor-pointer items-center rounded-full bg-fg px-8 text-[15px] font-semibold text-bg transition-[opacity,transform] duration-300 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {step === 4 ? (status === "sending" ? "Confirming..." : "Confirm booking") : "Continue"}
                </button>
              </div>
            </>
          )}

          {status === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeStudio }}
              role="status"
              className="flex min-h-[30rem] flex-col justify-center"
            >
              <svg viewBox="0 0 64 64" aria-hidden className="size-20">
                <motion.circle cx="32" cy="32" r="29" fill="none" stroke="#f2694b" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.9, ease: easeStudio }} />
                <motion.path d="M19 33l9 9 17-19" fill="none" stroke="#0e3535" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: easeStudio, delay: 0.7 }} />
              </svg>
              <h3 ref={heading} tabIndex={-1} className="mt-6 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[0.98] outline-none!">
                You&apos;re booked in{name ? `, ${name.trim().split(" ")[0]}` : ""}.
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
                {service?.label} with {doctorLabel} on {day?.long} at {time}. Please arrive ten minutes early with photo ID.
              </p>
              <p className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-bg px-5 py-3 text-sm font-semibold ring-1 ring-fg/10">
                Reference <span className="font-mono tracking-[0.16em]">{reference}</span>
              </p>
              <button type="button" onClick={reset} className="mt-8 w-fit cursor-pointer text-[15px] font-semibold underline underline-offset-4 hover:text-[var(--c-coral-ink)]">
                Book another visit
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function Step({ title, headingRef, children }: { title: string; headingRef: React.Ref<HTMLHeadingElement>; children: ReactNode }) {
  return (
    <div>
      <h3 ref={headingRef} tabIndex={-1} className="mb-6 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1] outline-none!">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Option({ name, checked, onChange, children }: { name: string; checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={name} className="peer sr-only" checked={checked} onChange={onChange} />
      <span className="flex min-h-[4.2rem] items-center rounded-2xl px-4 py-3.5 ring-1 ring-fg/12 transition-[background-color,box-shadow] duration-300 peer-checked:bg-[var(--c-mint)] peer-checked:ring-2 peer-checked:ring-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:ring-fg/40">
        <span className="block w-full">{children}</span>
      </span>
    </label>
  );
}

function Field({ label, value, onChange, error, type = "text", autoComplete }: { label: string; value: string; onChange: (v: string) => void; error?: string; type?: string; autoComplete?: string }) {
  const id = `booking-${label.toLowerCase().replace(/\s/g, "-")}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-2 min-h-12 w-full rounded-2xl bg-bg px-4 text-base outline-none ring-1 ring-fg/12 transition-shadow focus:ring-2 focus:ring-fg aria-[invalid]:ring-2 aria-[invalid]:ring-[var(--c-coral-ink)]"
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-[var(--c-coral-ink)]">
          {error}
        </p>
      )}
    </div>
  );
}
