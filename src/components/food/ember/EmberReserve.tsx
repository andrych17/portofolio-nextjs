"use client";

import { CalendarBlankIcon, ClockIcon, MinusIcon, PlusIcon, UsersIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { useContactForm } from "@/lib/use-contact-form";

const field =
  "h-12 w-full rounded-xl bg-bg px-4 text-base text-fg outline-none ring-1 ring-fg/15 transition-shadow duration-300 placeholder:text-fg/35 focus:ring-2 focus:ring-accent aria-[invalid=true]:ring-accent";

export function EmberReserve({ slots }: { slots: string[] }) {
  const { status, errors, notice, onSubmit, reset } = useContactForm("food/ember");
  const [party, setParty] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [today, setToday] = useState("");
  const [local, setLocal] = useState<{ date?: string; time?: string }>({});

  // Read on the client only, so the server HTML never carries a date that differs from the browser's.
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  const message = date && time ? `Table for ${party} on ${date} at ${time}. ${notes}`.trim() : "";

  function submit(e: FormEvent<HTMLFormElement>) {
    const next = { date: date ? undefined : "Pick a date.", time: time ? undefined : "Pick a time." };
    setLocal(next);
    if (next.date || next.time) {
      e.preventDefault();
      return;
    }
    void onSubmit(e);
  }

  function again() {
    setDate("");
    setTime("");
    setNotes("");
    setParty(2);
    reset();
  }

  return (
    <div className="rounded-[2rem] bg-surface p-1.5 ring-1 ring-fg/10 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)]">
      <div className="rounded-[calc(2rem-0.375rem)] bg-surface p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.07)] md:p-10">
        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="sent"
              role="status"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: easeStudio }}
              className="py-6"
            >
              <p className="font-display text-6xl italic leading-none text-accent">Table requested.</p>
              <p className="mt-6 max-w-md text-lg text-fg/80">
                We will confirm by email within a few hours. If you do not hear from us, call the number on this page.
              </p>
              <button type="button" onClick={again} className="mt-8 min-h-11 cursor-pointer text-sm underline underline-offset-4 hover:text-accent">
                Request another table
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" noValidate onSubmit={submit} exit={{ opacity: 0 }} className="space-y-7" aria-label="Reserve a table">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ember-date" className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    <CalendarBlankIcon size={14} aria-hidden /> Date
                  </label>
                  <input
                    id="ember-date"
                    name="date"
                    type="date"
                    min={today || undefined}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    aria-invalid={local.date ? true : undefined}
                    className={field}
                  />
                  {local.date && <p className="mt-1.5 text-sm text-accent">{local.date}</p>}
                </div>
                <div>
                  <span id="ember-party-label" className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    <UsersIcon size={14} aria-hidden /> Party size
                  </span>
                  <div role="group" aria-labelledby="ember-party-label" className="flex h-12 items-center justify-between rounded-xl bg-bg px-1.5 ring-1 ring-fg/15">
                    <button
                      type="button"
                      aria-label="One fewer guest"
                      disabled={party <= 1}
                      onClick={() => setParty((p) => Math.max(1, p - 1))}
                      className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-fg/10 disabled:opacity-30"
                    >
                      <MinusIcon size={16} aria-hidden />
                    </button>
                    <output aria-live="polite" className="text-base font-medium tabular-nums">
                      {party} {party === 1 ? "guest" : "guests"}
                    </output>
                    <button
                      type="button"
                      aria-label="One more guest"
                      disabled={party >= 12}
                      onClick={() => setParty((p) => Math.min(12, p + 1))}
                      className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-fg/10 disabled:opacity-30"
                    >
                      <PlusIcon size={16} aria-hidden />
                    </button>
                  </div>
                  <input type="hidden" name="party" value={party} />
                </div>
              </div>

              <fieldset>
                <legend className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  <ClockIcon size={14} aria-hidden /> Time
                </legend>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {slots.map((slot) => (
                    <label key={slot} className="cursor-pointer">
                      <input type="radio" name="time" value={slot} checked={time === slot} onChange={() => setTime(slot)} className="peer sr-only" />
                      <span className="flex min-h-11 items-center justify-center rounded-xl text-sm tabular-nums ring-1 ring-fg/15 transition-[background-color,box-shadow] duration-300 hover:ring-fg/45 peer-checked:bg-accent peer-checked:font-semibold peer-checked:text-accent-fg peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                        {slot}
                      </span>
                    </label>
                  ))}
                </div>
                {local.time && <p className="mt-2 text-sm text-accent">{local.time}</p>}
              </fieldset>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="ember-name" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Name</label>
                  <input id="ember-name" name="name" autoComplete="name" aria-invalid={errors.name ? true : undefined} className={field} placeholder="Full name" />
                  {errors.name && <p className="mt-1.5 text-sm text-accent">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="ember-email" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Email</label>
                  <input id="ember-email" name="email" type="email" autoComplete="email" aria-invalid={errors.email ? true : undefined} className={field} placeholder="you@example.com" />
                  {errors.email && <p className="mt-1.5 text-sm text-accent">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="ember-notes" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Allergies or occasion <span className="font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  id="ember-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full resize-none rounded-xl bg-bg px-4 py-3 text-base outline-none ring-1 ring-fg/15 placeholder:text-fg/35 focus:ring-2 focus:ring-accent"
                  placeholder="Anniversary, nut allergy, window table"
                />
              </div>

              <input type="hidden" name="message" value={message} />
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
                <label>
                  Website
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex min-h-12 cursor-pointer items-center gap-4 rounded-full bg-accent py-1.5 pl-7 pr-1.5 text-[15px] font-semibold text-accent-fg shadow-[0_14px_40px_-12px_rgb(255_106_31/0.65),inset_0_1px_0_rgb(255_255_255/0.35)] transition-opacity disabled:opacity-60"
                >
                  {status === "sending" ? "Sending" : "Request this table"}
                  <ArrowIsland className="size-10 bg-accent-fg/12" />
                </button>
                {notice && (
                  <p role="alert" className="text-sm text-accent">
                    {notice}
                  </p>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
