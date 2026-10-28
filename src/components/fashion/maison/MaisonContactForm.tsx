"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { maison } from "@/content/fashion/maison";
import { useContactForm } from "@/lib/use-contact-form";

// The shared contact payload only keeps name, email, company, service, budget and message.
// So the visit type travels as `service` and the preferred day as `budget`.
export function MaisonContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(maison.key);

  return (
    <div className="bg-surface p-1.5 ring-1 ring-fg/10">
      <div className="bg-bg p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] md:p-10">
        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="sent"
              role="status"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: easeStudio }}
              className="py-10"
            >
              <p className="font-display text-6xl font-light italic leading-none text-accent">Thank you.</p>
              <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-fg/75">
                Your request is with the atelier. Someone will write back within one working day to confirm a time.
              </p>
              <button type="button" onClick={reset} className="maison-caps mt-10 min-h-11 cursor-pointer underline underline-offset-4 hover:text-accent">
                Send another request
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: easeStudio }} className="space-y-10">
              <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
                <Field name="name" label="Your name" autoComplete="name" error={errors.name} />
                <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
              </div>
              <ChipGroup name="service" legend="I would like" options={maison.appointmentTypes} />
              <ChipGroup name="budget" legend="Preferred time" options={maison.preferredDays} />
              <Field name="message" label="What are you looking for" multiline error={errors.message} />

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
                  className="maison-caps group inline-flex min-h-12 cursor-pointer items-center gap-4 rounded-full bg-accent py-1.5 pl-7 pr-1.5 text-accent-fg transition-[background-color,opacity] duration-700 ease-studio hover:bg-fg disabled:opacity-60"
                >
                  {status === "sending" ? "Sending" : "Request an appointment"}
                  <ArrowIsland className="size-9 bg-black/20" size={14} />
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

type FieldProps = { name: string; label: string; type?: string; autoComplete?: string; multiline?: boolean; error?: string };

function Field({ name, label, type = "text", autoComplete, multiline, error }: FieldProps) {
  const id = `maison-${name}`;
  const shared = {
    id,
    name,
    placeholder: " ",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "peer w-full resize-none border-b border-fg/25 bg-transparent pb-3 pt-7 font-display text-[1.45rem] font-light outline-none transition-colors duration-500 focus:border-accent aria-[invalid]:border-accent",
  };
  return (
    <div className="relative">
      {multiline ? <textarea rows={3} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      <label
        htmlFor={id}
        className="maison-caps pointer-events-none absolute left-0 top-8 origin-left text-fg/55 transition-all duration-500 ease-studio peer-focus:top-0 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px]"
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
      <legend className="maison-caps text-muted">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input type="radio" name={name} value={option} className="peer sr-only" />
            <span className="maison-caps flex min-h-11 items-center rounded-full px-5 ring-1 ring-fg/20 transition-colors duration-500 ease-studio peer-checked:bg-accent peer-checked:text-accent-fg peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:ring-fg/50">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
