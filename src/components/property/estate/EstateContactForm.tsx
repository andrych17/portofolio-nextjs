"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { estate } from "@/content/property/estate";
import { useContactForm } from "@/lib/use-contact-form";

export function EstateContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm("property/estate");

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: easeStudio }}
          className="rounded-[2rem] bg-[#0f2a20] p-10 text-[#f6f2ea] md:p-14"
        >
          <p className="font-display text-6xl leading-none text-[#d6b571]">Thank you.</p>
          <p className="mt-6 max-w-md text-lg text-[#f6f2ea]/80">
            Your note has reached the sales desk. Someone will call or write back within one working day to arrange a viewing.
          </p>
          <button type="button" onClick={reset} className="mt-10 h-11 cursor-pointer text-sm underline underline-offset-4 hover:text-[#d6b571]">
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={onSubmit}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: easeStudio }}
          className="rounded-[2rem] bg-white/70 p-1.5 ring-1 ring-fg/10"
        >
          <div className="space-y-8 rounded-[calc(2rem-0.375rem)] bg-bg p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.8)] md:p-10">
            <div className="grid gap-6 md:grid-cols-2">
              <Field name="name" label="Your name" autoComplete="name" error={errors.name} />
              <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
            </div>
            <Chips name="service" legend="I am looking for" options={estate.interests} />
            <Chips name="budget" legend="Budget" options={estate.budgets} />
            <Field name="message" label="Anything we should know" multiline error={errors.message} />

            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex cursor-pointer items-center gap-4 rounded-full bg-accent py-2.5 pl-8 pr-2.5 text-base font-semibold text-accent-fg transition-colors duration-500 hover:bg-[#c29d57] disabled:opacity-60"
              >
                {status === "sending" ? "Sending" : "Request a viewing"}
                <ArrowIsland className="size-11 bg-[#0f2a20]/15" />
              </button>
              {notice && (
                <p role="alert" className="text-sm font-medium text-[#8a3b22]">
                  {notice}
                </p>
              )}
            </div>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  multiline,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  error?: string;
}) {
  const id = `estate-${name}`;
  const common = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "mt-2 w-full resize-none rounded-2xl bg-surface/60 px-5 py-3.5 text-base text-fg outline-none ring-1 ring-fg/10 transition-shadow duration-500 placeholder:text-muted/60 focus:ring-2 focus:ring-accent aria-[invalid]:ring-2 aria-[invalid]:ring-[#8a3b22]",
  };
  return (
    <div>
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
        {label}
      </label>
      {multiline ? <textarea rows={4} {...common} /> : <input type={type} autoComplete={autoComplete} {...common} />}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-[#8a3b22]">
          {error}
        </p>
      )}
    </div>
  );
}

function Chips({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} className="peer sr-only" />
            <span className="flex h-11 items-center rounded-full px-4 text-sm ring-1 ring-fg/15 transition-colors duration-300 hover:ring-fg/40 peer-checked:bg-[#0f2a20] peer-checked:text-[#f6f2ea] peer-checked:ring-[#0f2a20] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
