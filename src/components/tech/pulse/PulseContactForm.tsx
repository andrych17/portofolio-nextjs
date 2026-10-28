"use client";

import { CheckCircleIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { pulse } from "@/content/tech/pulse";
import { useContactForm } from "@/lib/use-contact-form";

const input =
  "w-full rounded-xl bg-fg/[0.04] px-4 py-3.5 text-[16px] text-fg outline-none ring-1 ring-fg/10 transition-shadow duration-300 placeholder:text-fg/30 focus:ring-2 focus:ring-accent aria-[invalid]:ring-[var(--p-coral)]";

export function PulseContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(pulse.key);

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: easeStudio }}
          className="rounded-[1.6rem] bg-[var(--p-panel)] p-8 ring-1 ring-fg/10 md:p-12"
        >
          <CheckCircleIcon size={44} weight="fill" className="text-accent" aria-hidden />
          <p className="mt-6 font-display text-5xl leading-none">Got it.</p>
          <p className="mt-4 max-w-sm text-lg text-fg/70">Someone from the team will write back within four working hours, usually sooner, with a time for a 20-minute walkthrough.</p>
          <button type="button" onClick={reset} className="mt-8 min-h-11 cursor-pointer text-sm underline underline-offset-4 hover:text-accent">
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: easeStudio }} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Field name="name" label="Your name" autoComplete="name" error={errors.name} />
            <Field name="email" label="Work email" type="email" autoComplete="email" error={errors.email} />
            <Field name="company" label="Company (optional)" autoComplete="organization" className="md:col-span-2" />
          </div>
          <Chips name="service" legend="I want to" options={pulse.interests} />
          <Chips name="budget" legend="Team size" options={pulse.sizes} />
          <Field name="message" label="What are you trying to measure?" multiline error={errors.message} />

          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button type="submit" disabled={status === "sending"} className="group inline-flex min-h-12 cursor-pointer items-center gap-4 rounded-full bg-accent py-2 pl-7 pr-2 text-[15px] font-medium text-accent-fg transition-opacity disabled:opacity-60">
              {status === "sending" ? "Sending" : "Send message"}
              <ArrowIsland className="size-10 bg-black/10" />
            </button>
            {notice && (
              <p role="alert" className="text-sm text-[var(--p-coral)]">
                {notice}
              </p>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({ name, label, type = "text", autoComplete, multiline, error, className = "" }: { name: string; label: string; type?: string; autoComplete?: string; multiline?: boolean; error?: string; className?: string }) {
  const id = `pulse-${name}`;
  const shared = { id, name, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined, className: input };
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...shared} className={`${input} resize-none`} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[var(--p-coral)]">
          {error}
        </p>
      )}
    </div>
  );
}

function Chips({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} className="peer sr-only" />
            <span className="flex min-h-11 items-center rounded-full px-5 text-sm ring-1 ring-fg/15 transition-colors duration-300 hover:ring-fg/40 peer-checked:bg-accent peer-checked:text-accent-fg peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
