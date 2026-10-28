"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { salt } from "@/content/fashion/salt";
import { useContactForm } from "@/lib/use-contact-form";

// The shared contact payload keeps name, email, company, service, budget and message,
// so the enquiry type travels as `service`. The card is always paper, so it uses fixed ink tones, not the shade tokens.
export function SaltContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(salt.key);

  return (
    <div className="salt-paper rounded-[2rem] p-6 shadow-[0_40px_70px_-40px_rgb(0_0_0/0.65)] md:p-10">
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
            <p className="font-display text-6xl leading-none">Received.</p>
            <p className="mt-6 max-w-sm text-[17px] leading-relaxed opacity-75">Your note is on the cutting table. We write back within one working day, usually with a swatch.</p>
            <button type="button" onClick={reset} className="salt-caps mt-10 min-h-11 cursor-pointer underline underline-offset-4">
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
              <legend className="salt-caps opacity-60">I am writing about</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {salt.enquiry.types.map((option) => (
                  <label key={option} className="cursor-pointer">
                    <input type="radio" name="service" value={option} className="peer sr-only" />
                    <span className="salt-caps flex min-h-11 items-center rounded-full px-5 ring-1 ring-[var(--l-ink)]/30 transition-colors duration-300 peer-checked:bg-[var(--l-ink)] peer-checked:text-[var(--l-paper)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--l-ink)] hover:ring-[var(--l-ink)]">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <Field name="message" label="What can we help with" multiline error={errors.message} />

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
                className="salt-caps group inline-flex min-h-12 cursor-pointer items-center gap-4 rounded-full bg-[var(--l-ink)] py-1.5 pl-7 pr-1.5 text-[var(--l-paper)] transition-[background-color,opacity] duration-500 ease-studio hover:bg-[#cc3a16] disabled:opacity-60"
              >
                {status === "sending" ? "Sending" : "Send it over"}
                <ArrowIsland className="size-9 bg-white/20" size={14} />
              </button>
              {notice && (
                <p role="alert" className="text-sm text-[#b3261e]">
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
  const id = `salt-${name}`;
  const shared = {
    id,
    name,
    placeholder: " ",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "peer w-full resize-none border-b-2 border-[var(--l-ink)]/25 bg-transparent pb-3 pt-7 text-[1.2rem] outline-none transition-colors duration-300 focus:border-[var(--l-ink)] aria-[invalid]:border-[#b3261e]",
  };
  return (
    <div className="relative">
      {multiline ? <textarea rows={3} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      <label
        htmlFor={id}
        className="salt-caps pointer-events-none absolute left-0 top-8 origin-left opacity-60 transition-all duration-300 ease-studio peer-focus:top-0 peer-focus:text-[0.62rem] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[0.62rem]"
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#b3261e]">
          {error}
        </p>
      )}
    </div>
  );
}
