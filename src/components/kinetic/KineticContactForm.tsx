"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import { AnimatePresence, motion } from "motion/react";
import { useContactForm } from "@/lib/use-contact-form";
import { Burst } from "./Burst";

const services = ["Brand", "Website", "Social + motion", "Campaign", "The lot"];
const budgets = ["AU$15k to 30k", "AU$30k to 60k", "AU$60k+", "No idea yet"];
const chipColors = ["peer-checked:bg-k-yellow", "peer-checked:bg-k-pink", "peer-checked:bg-k-lime", "peer-checked:bg-k-blue peer-checked:text-white", "peer-checked:bg-accent"];
const confetti = ["#ffd23f", "#ff8fc7", "#c6f432", "#2f4bff", "#ff4a1c"];

export function KineticContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm("kinetic");

  return (
    <div className="relative rounded-[2rem] border-2 border-k-ink bg-white p-6 shadow-[8px_8px_0_0_#121212] md:p-10">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div key="sent" role="status" className="relative flex min-h-[460px] flex-col items-center justify-center text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {Array.from({ length: 18 }, (_, i) => {
              const angle = (Math.PI * 2 * i) / 18;
              const dist = 140 + (i % 3) * 40;
              return (
                <motion.span
                  key={i}
                  aria-hidden
                  className="absolute left-1/2 top-1/2 size-4 rounded-full border-2 border-k-ink"
                  style={{ background: confetti[i % confetti.length] }}
                  initial={{ x: 0, y: 0, scale: 0 }}
                  animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, scale: [0, 1.4, 1], rotate: 180 }}
                  transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.05 }}
                />
              );
            })}
            <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="relative">
              <Burst className="size-36" fill="#c6f432" />
              <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-black uppercase">Got it</span>
            </motion.div>
            <p className="relative mt-8 max-w-sm text-lg font-medium">Thanks for the message. Priya or Ruby will get back to you within one working day.</p>
            <button type="button" onClick={reset} className="relative mt-6 cursor-pointer font-bold underline underline-offset-4 hover:text-accent">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, scale: 0.96 }} className="space-y-8">
            <div className="grid gap-5 md:grid-cols-2">
              <Field name="name" label="Name" autoComplete="name" error={errors.name} />
              <Field name="email" label="Email" type="email" autoComplete="email" error={errors.email} />
              <Field name="company" label="Brand or company (optional)" autoComplete="organization" className="md:col-span-2" />
            </div>
            <Chips name="service" legend="What are we making?" options={services} />
            <Chips name="budget" legend="Budget" options={budgets} />
            <Field name="message" label="Tell us everything" multiline error={errors.message} />

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
                className="k-shadow group inline-flex cursor-pointer items-center gap-3 rounded-full border-2 border-k-ink bg-accent py-2.5 pl-7 pr-2.5 font-display text-lg font-black uppercase disabled:opacity-60"
              >
                {status === "sending" ? "Sending" : "Send it"}
                <span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-k-ink text-white transition-transform duration-500 ease-studio group-hover:rotate-45">
                  <ArrowUpRightIcon size={18} weight="bold" />
                </span>
              </button>
              {notice && (
                <p role="alert" className="rounded-xl border-2 border-k-ink bg-k-pink px-3 py-1.5 text-sm font-bold">
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

type FieldProps = { name: string; label: string; type?: string; autoComplete?: string; multiline?: boolean; error?: string; className?: string };

function Field({ name, label, type = "text", autoComplete, multiline, error, className = "" }: FieldProps) {
  const id = `kinetic-${name}`;
  const shared = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
    className:
      "mt-2 w-full resize-none rounded-2xl border-2 border-k-ink bg-bg px-4 py-3.5 text-lg font-medium outline-none transition-[transform,box-shadow] duration-300 focus:-translate-x-0.5 focus:-translate-y-0.5 focus:bg-white focus:shadow-[4px_4px_0_0_#121212] aria-[invalid]:bg-k-pink/40",
  };
  return (
    <div className={className}>
      <label htmlFor={id} className="font-display text-sm font-extrabold uppercase">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-bold text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

function Chips({ name, legend, options }: { name: string; legend: string; options: string[] }) {
  return (
    <fieldset>
      <legend className="font-display text-sm font-extrabold uppercase">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option, i) => (
          <label key={option} className="cursor-pointer">
            <input type="radio" name={name} value={option} className="peer sr-only" />
            <span
              className={`block rounded-full border-2 border-k-ink bg-white px-4 py-2 text-sm font-bold transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-rotate-3 peer-checked:-rotate-2 peer-checked:scale-105 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-k-ink ${chipColors[i % chipColors.length]}`}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
