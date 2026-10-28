"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { useContactForm } from "@/lib/use-contact-form";

const services = ["Identity", "Packaging", "Website or shop", "Photography"];
const budgets = ["Under €10k", "€10k to 20k", "€20k to 35k", "€35k+"];

export function AtelierContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm("atelier");

  return (
    <div className="rounded-[2.25rem] bg-white/50 p-1.5 ring-1 ring-black/[0.06]">
      <div className="rounded-[calc(2.25rem-0.375rem)] bg-bg/80 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] md:p-10">
        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="sent"
              role="status"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: easeStudio }}
              className="flex min-h-[420px] flex-col items-start justify-center"
            >
              <svg viewBox="0 0 52 52" className="size-16 text-accent" aria-hidden>
                <motion.circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: easeStudio }} />
                <motion.path d="M15 27l7 7 15-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: easeStudio, delay: 0.6 }} />
              </svg>
              <p className="mt-8 font-display text-5xl leading-none">
                Thank you, <em className="text-accent">we will be in touch.</em>
              </p>
              <p className="mt-5 max-w-md text-lg text-fg/75">Femke reads every message herself and replies within two working days with a few dates for a visit.</p>
              <button type="button" onClick={reset} className="mt-8 cursor-pointer text-sm underline underline-offset-4 hover:text-accent">
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: easeStudio }} className="space-y-8">
              <div className="grid gap-5 md:grid-cols-2">
                <Field name="name" label="Your name" autoComplete="name" error={errors.name} />
                <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
                <Field name="company" label="Business name (optional)" autoComplete="organization" className="md:col-span-2" />
              </div>
              <Chips name="service" legend="What can we help with?" options={services} />
              <Chips name="budget" legend="Rough budget" options={budgets} />
              <Field name="message" label="Tell us about your business" multiline error={errors.message} />

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
                  className="group inline-flex cursor-pointer items-center gap-4 rounded-full bg-accent py-2 pl-7 pr-2 font-medium text-accent-fg transition-[opacity,transform] duration-300 active:scale-[0.98] disabled:opacity-60"
                >
                  {status === "sending" ? "Sending" : "Send to the studio"}
                  <ArrowIsland className="size-10 bg-white/15" />
                </button>
                {notice && (
                  <p role="alert" className="text-sm text-[#a5432b]">
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

type FieldProps = { name: string; label: string; type?: string; autoComplete?: string; multiline?: boolean; error?: string; className?: string };

function Field({ name, label, type = "text", autoComplete, multiline, error, className = "" }: FieldProps) {
  const id = `atelier-${name}`;
  const shared = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "mt-2 w-full resize-none rounded-2xl bg-white/80 px-4 py-3.5 text-base outline-none ring-1 ring-black/[0.08] transition-shadow duration-300 placeholder:text-fg/30 focus:ring-2 focus:ring-accent aria-[invalid]:ring-[#a5432b]",
  };
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#a5432b]">
          {error}
        </p>
      )}
    </div>
  );
}

function Chips({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input type="radio" name={name} value={option} className="peer sr-only" />
            <span className="block rounded-full bg-white/70 px-4 py-2 text-sm ring-1 ring-black/[0.08] transition-colors duration-300 hover:bg-white peer-checked:bg-accent peer-checked:text-accent-fg peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
