"use client";

import { AnimatePresence, motion } from "motion/react";
import { easeStudio } from "@/components/motion/ease";
import { clinic } from "@/content/health/clinic";
import { useContactForm } from "@/lib/use-contact-form";

const reasons = ["Appointment", "Test results", "Records request", "Something else"];

export function ClinicContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(clinic.key);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
        <motion.div
          key="sent"
          role="status"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeStudio }}
          className="flex min-h-[26rem] flex-col justify-center"
        >
          <p className="font-display text-5xl leading-none">Message received.</p>
          <p className="mt-5 max-w-sm text-lg text-muted">
            The front desk replies within one working day. For anything urgent, please call the number on this page.
          </p>
          <button type="button" onClick={reset} className="mt-8 w-fit cursor-pointer text-[15px] font-semibold underline underline-offset-4 hover:text-[var(--c-coral-ink)]">
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field name="name" label="Full name" autoComplete="name" error={errors.name} />
            <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
          </div>
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">What is it about?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {reasons.map((r) => (
                <label key={r} className="cursor-pointer">
                  <input type="radio" name="service" value={r} className="peer sr-only" />
                  <span className="flex min-h-11 items-center rounded-full px-5 text-sm font-semibold ring-1 ring-fg/15 transition-colors duration-300 peer-checked:bg-fg peer-checked:text-bg peer-checked:ring-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:ring-fg/40">
                    {r}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <Field name="message" label="How can we help?" multiline error={errors.message} />
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
              className="inline-flex min-h-12 cursor-pointer items-center rounded-full bg-fg px-8 text-[15px] font-semibold text-bg transition-[opacity,transform] duration-300 active:scale-[0.97] disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>
            {notice && (
              <p role="alert" className="text-sm font-semibold text-[var(--c-coral-ink)]">
                {notice}
              </p>
            )}
          </div>
          <p className="text-sm leading-relaxed text-muted">Please do not include medical details here. We will call you to talk them through.</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({ name, label, type = "text", autoComplete, multiline, error }: { name: string; label: string; type?: string; autoComplete?: string; multiline?: boolean; error?: string }) {
  const id = `clinic-${name}`;
  const shared = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "mt-2 w-full rounded-2xl bg-bg px-4 py-3 text-base outline-none ring-1 ring-fg/12 transition-shadow focus:ring-2 focus:ring-fg aria-[invalid]:ring-2 aria-[invalid]:ring-[var(--c-coral-ink)]",
  };
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </label>
      {multiline ? <textarea rows={4} {...shared} className={`${shared.className} resize-none`} /> : <input type={type} autoComplete={autoComplete} {...shared} className={`${shared.className} min-h-12`} />}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-[var(--c-coral-ink)]">
          {error}
        </p>
      )}
    </div>
  );
}
