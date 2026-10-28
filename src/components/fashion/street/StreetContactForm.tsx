"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { street } from "@/content/fashion/street";
import { useContactForm } from "@/lib/use-contact-form";

// The shared contact payload keeps name, email, company, service, budget and message,
// so the enquiry type travels as `service` and the shop or title as `company`.
export function StreetContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(street.key);

  return (
    <div className="bg-bg p-6 text-fg shadow-[10px_10px_0_0_#efede6] md:p-10">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            role="status"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: easeStudio }}
            className="py-10"
          >
            <p className="font-display text-6xl uppercase leading-none text-accent">Got it.</p>
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed text-fg/75">
              Your note is on the desk. We reply within one working day, usually faster on a Thursday.
            </p>
            <button type="button" onClick={reset} className="street-tag mt-10 min-h-11 cursor-pointer underline underline-offset-4 hover:text-accent">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4, ease: easeStudio }} className="space-y-9">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              <Field name="name" label="Your name" autoComplete="name" error={errors.name} />
              <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
            </div>
            <Field name="company" label="Shop or title" autoComplete="organization" />

            <fieldset>
              <legend className="street-tag text-muted">I am writing about</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {street.enquiry.types.map((option) => (
                  <label key={option} className="cursor-pointer">
                    <input type="radio" name="service" value={option} className="peer sr-only" />
                    <span className="street-tag flex min-h-11 items-center px-4 ring-1 ring-fg/25 transition-colors duration-300 peer-checked:bg-accent peer-checked:text-accent-fg peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:ring-fg/70">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Field name="message" label="What do you need" multiline error={errors.message} />

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
                className="street-tag group inline-flex min-h-12 cursor-pointer items-center gap-4 bg-accent py-1.5 pl-6 pr-1.5 text-accent-fg transition-[background-color,opacity] duration-500 ease-studio hover:bg-[var(--s-paper)] disabled:opacity-60"
              >
                {status === "sending" ? "Sending" : "Send it over"}
                <ArrowIsland className="size-9 rounded-none bg-black/15" size={14} />
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
  );
}

type FieldProps = { name: string; label: string; type?: string; autoComplete?: string; multiline?: boolean; error?: string };

function Field({ name, label, type = "text", autoComplete, multiline, error }: FieldProps) {
  const id = `street-${name}`;
  const shared = {
    id,
    name,
    placeholder: " ",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "peer w-full resize-none border-b-2 border-fg/25 bg-transparent pb-3 pt-7 text-[1.2rem] outline-none transition-colors duration-300 focus:border-accent aria-[invalid]:border-accent",
  };
  return (
    <div className="relative">
      {multiline ? <textarea rows={3} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      <label
        htmlFor={id}
        className="street-tag pointer-events-none absolute left-0 top-8 origin-left text-fg/55 transition-all duration-300 ease-studio peer-focus:top-0 peer-focus:text-[0.62rem] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.62rem]"
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
