"use client";

import { CheckIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { foundry } from "@/content/property/foundry";
import { useContactForm } from "@/lib/use-contact-form";

const input =
  "w-full bg-transparent px-0 py-3 text-[16px] text-bg outline-none border-b border-white/35 transition-colors duration-300 placeholder:text-white/30 focus:border-accent aria-[invalid]:border-accent";

export function FoundryContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(foundry.key);

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
          className="flex min-h-[26rem] flex-col justify-center"
        >
          <span className="grid size-12 place-items-center bg-accent text-accent-fg">
            <CheckIcon size={26} weight="bold" aria-hidden />
          </span>
          <p className="mt-6 font-display text-[4.2rem] leading-[0.85]">Request received.</p>
          <p className="mt-5 max-w-sm text-lg text-white/70">An estimator will call within one working day to arrange a site visit. A budget figure follows about a week later.</p>
          <button type="button" onClick={reset} className="mt-8 min-h-11 w-fit cursor-pointer font-mono text-[12px] uppercase tracking-[0.14em] underline decoration-white/40 underline-offset-4 hover:decoration-accent">
            Send another request
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-8">
          <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
            <Field name="name" label="Your name" autoComplete="name" error={errors.name} />
            <Field name="email" label="Work email" type="email" autoComplete="email" error={errors.email} />
            <Field name="company" label="Company (optional)" autoComplete="organization" className="md:col-span-2" />
          </div>
          <Chips name="service" legend="Type of project" options={foundry.quote.types} />
          <Chips name="size" legend="Floor area" options={foundry.quote.sizes} />
          <Chips name="timeline" legend="Start" options={foundry.quote.timelines} />
          <Chips name="budget" legend="Budget" options={foundry.quote.budgets} />
          <Field name="message" label="Site location and anything we should know" multiline error={errors.message} />

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
              className="group inline-flex min-h-12 cursor-pointer items-center gap-4 rounded-full bg-accent py-2 pl-7 pr-2 text-[15px] font-semibold uppercase tracking-[0.06em] text-accent-fg transition-colors duration-500 ease-studio hover:bg-bg disabled:opacity-60"
            >
              {status === "sending" ? "Sending" : "Request a quote"}
              <ArrowIsland className="size-10 bg-fg/10" />
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
  const id = `foundry-${name}`;
  const shared = { id, name, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined, className: input };
  return (
    <div className={className}>
      <label htmlFor={id} className="block font-mono text-[11.5px] uppercase tracking-[0.14em] text-white/55">
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
      <legend className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-white/55">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} className="peer sr-only" />
            <span className="flex min-h-11 items-center px-4 text-sm ring-1 ring-white/25 transition-colors duration-300 hover:ring-white peer-checked:bg-accent peer-checked:text-accent-fg peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
