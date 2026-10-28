"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { useContactForm } from "@/lib/use-contact-form";

const services = ["Brand identity", "Website", "Digital product", "Motion"];
const budgets = ["€15k to 30k", "€30k to 60k", "€60k+", "Not sure yet"];

export function NoirContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm("noir");

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: easeStudio }}
          className="rounded-[1.5rem] bg-surface p-10 ring-1 ring-fg/10 md:p-14"
          role="status"
        >
          <p className="font-display text-6xl leading-none text-accent">Thank you.</p>
          <p className="mt-6 max-w-md text-lg text-fg/80">
            Your message is with us. Marta or Rui will reply within one working day, usually sooner.
          </p>
          <button type="button" onClick={reset} className="mt-10 cursor-pointer text-sm underline underline-offset-4 hover:text-accent">
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
          className="space-y-12"
        >
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
            <Field name="name" label="Your name" autoComplete="name" error={errors.name} />
            <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
            <Field name="company" label="Company (optional)" autoComplete="organization" className="md:col-span-2" />
          </div>

          <ChipGroup name="service" legend="What do you need?" options={services} />
          <ChipGroup name="budget" legend="Budget" options={budgets} />

          <Field name="message" label="Tell us about the project" multiline error={errors.message} />

          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex cursor-pointer items-center gap-4 rounded-full bg-accent py-2.5 pl-8 pr-2.5 text-base font-medium text-accent-fg transition-opacity disabled:opacity-60"
            >
              {status === "sending" ? "Sending" : "Send message"}
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

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  error?: string;
  className?: string;
};

function Field({ name, label, type = "text", autoComplete, multiline, error, className = "" }: FieldProps) {
  const id = `noir-${name}`;
  const shared = {
    id,
    name,
    placeholder: " ",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "peer w-full resize-none border-b border-fg/20 bg-transparent pb-3 pt-7 text-xl outline-none transition-colors duration-500 focus:border-accent aria-[invalid]:border-accent",
  };
  return (
    <div className={`relative ${className}`}>
      {multiline ? <textarea rows={4} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-7 origin-left text-xl text-fg/50 transition-all duration-500 ease-studio peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.18em] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.18em]"
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

function ChipGroup({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input type="radio" name={name} value={option} className="peer sr-only" />
            <span className="block rounded-full px-5 py-2.5 text-sm ring-1 ring-fg/15 transition-colors duration-300 peer-checked:bg-accent peer-checked:text-accent-fg peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:ring-fg/40">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
