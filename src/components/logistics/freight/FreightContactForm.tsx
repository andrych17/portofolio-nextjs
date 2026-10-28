"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { useContactForm } from "@/lib/use-contact-form";

const modes = ["Air", "Sea", "Road", "Rail", "Not sure"];

export function FreightContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm("logistics/freight");

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div key="sent" role="status" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: easeStudio }} className="rounded-[1.75rem] bg-surface p-8 ring-1 ring-fg/10 md:p-12">
          <p className="font-display text-5xl font-semibold leading-none text-accent">Request received.</p>
          <p className="mt-5 max-w-md text-lg text-fg/80">Your quote request is with our desk. A freight specialist replies within a few working hours, with a price and a realistic transit time.</p>
          <button type="button" onClick={reset} className="mt-8 cursor-pointer text-sm underline underline-offset-4 hover:text-accent">
            Send another request
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: easeStudio }} className="space-y-8">
          <div className="grid gap-x-6 gap-y-6 md:grid-cols-2">
            <Field name="name" label="Your name" autoComplete="name" error={errors.name} />
            <Field name="email" label="Work email" type="email" autoComplete="email" error={errors.email} />
            <Field name="company" label="Company (optional)" autoComplete="organization" className="md:col-span-2" />
          </div>
          <fieldset>
            <legend className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">How should it travel?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {modes.map((m) => (
                <label key={m} className="cursor-pointer">
                  <input type="radio" name="service" value={m} className="peer sr-only" />
                  <span className="flex min-h-11 items-center rounded-full px-5 text-sm ring-1 ring-fg/20 transition-colors duration-300 hover:ring-fg/50 peer-checked:bg-accent peer-checked:text-accent-fg peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                    {m}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <Field name="message" label="From, to, what and how much" multiline error={errors.message} />
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <button type="submit" disabled={status === "sending"} className="group inline-flex min-h-14 cursor-pointer items-center gap-4 rounded-full bg-accent py-2 pl-8 pr-2 text-[15px] font-semibold text-accent-fg transition-opacity disabled:opacity-60">
              {status === "sending" ? "Sending" : "Request a quote"}
              <ArrowIsland className="size-11 bg-black/10" />
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
  );
}

function Field({ name, label, type = "text", autoComplete, multiline, error, className = "" }: { name: string; label: string; type?: string; autoComplete?: string; multiline?: boolean; error?: string; className?: string }) {
  const id = `freight-${name}`;
  const shared = {
    id,
    name,
    placeholder: " ",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: "peer w-full resize-none rounded-2xl bg-fg/[0.05] px-4 pb-3 pt-7 text-[16px] text-fg ring-1 ring-fg/12 transition-shadow focus:outline-none focus:ring-2 focus:ring-accent aria-[invalid]:ring-accent",
  };
  return (
    <div className={`relative ${className}`}>
      {multiline ? <textarea rows={4} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      <label htmlFor={id} className="pointer-events-none absolute left-4 top-2.5 origin-left font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
