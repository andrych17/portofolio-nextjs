"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { grid } from "@/content/tech/grid";
import { useContactForm } from "@/lib/use-contact-form";

const input =
  "w-full bg-transparent px-0 py-3 text-[16px] text-fg outline-none border-b border-fg/30 transition-colors duration-300 placeholder:text-fg/30 focus:border-accent aria-[invalid]:border-accent";

export function GridContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(grid.key);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: easeStudio }}
          className="flex min-h-[24rem] flex-col justify-center"
        >
          <span className="grid size-12 place-items-center bg-accent text-accent-fg">
            <CheckIcon size={24} weight="bold" aria-hidden />
          </span>
          <p className="mt-6 text-5xl font-extrabold leading-none tracking-[-0.04em]">202 Accepted.</p>
          <p className="mt-4 max-w-sm text-lg text-fg/70">An engineer will reply within one working day with a test key and a link to the quickstart.</p>
          <button type="button" onClick={reset} className="mono mt-8 min-h-11 w-fit cursor-pointer underline decoration-fg/30 underline-offset-4 hover:decoration-accent">
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-7">
          <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
            <Field name="name" label="Your name" autoComplete="name" error={errors.name} />
            <Field name="email" label="Work email" type="email" autoComplete="email" error={errors.email} />
            <Field name="company" label="Company (optional)" autoComplete="organization" className="md:col-span-2" />
          </div>
          <Chips name="service" legend="I want to" options={grid.interests} />
          <Chips name="budget" legend="Events per month" options={grid.volumes} />
          <Field name="message" label="What are you sending, and to whom?" multiline error={errors.message} />

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
              className="group inline-flex min-h-12 cursor-pointer items-center gap-4 rounded-full bg-accent py-2 pl-7 pr-2 text-[15px] font-medium text-accent-fg transition-colors duration-500 ease-studio hover:bg-fg disabled:opacity-60"
            >
              {status === "sending" ? "Sending" : "Send message"}
              <ArrowIsland className="size-10 bg-white/20" />
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
  const id = `grid-${name}`;
  const shared = { id, name, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined, className: input };
  return (
    <div className={className}>
      <label htmlFor={id} className="mono block text-muted">
        {label}
      </label>
      {multiline ? <textarea rows={4} {...shared} className={`${input} resize-none`} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

function Chips({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="mono text-muted">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} className="peer sr-only" />
            <span className="flex min-h-11 items-center px-4 text-sm ring-1 ring-fg/20 transition-colors duration-300 hover:ring-fg peer-checked:bg-fg peer-checked:text-bg peer-checked:ring-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
