"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { easeStudio } from "@/components/motion/ease";
import { dental } from "@/content/health/dental";
import { useContactForm } from "@/lib/use-contact-form";

export function DentalContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(dental.key);

  return (
    <section id="consult" aria-labelledby="consult-heading" className="bg-surface/50 border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Reserve Your Visit</Eyebrow>
            <h2 id="consult-heading" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-tight text-fg">
              Book your complimentary 3D scan &amp; consultation.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Meet our clinicians, receive a comprehensive intraoral scan, and review your digital smile simulation in a private, pressure-free suite.
            </p>

            <div className="mt-8 space-y-6 text-sm text-fg/90">
              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Studio Address</span>
                <p className="mt-1 font-medium">{dental.street}</p>
                <p className="text-muted">{dental.city}, {dental.postalCode}, {dental.countryCode}</p>
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Clinical Hours</span>
                {dental.hours.map((h) => (
                  <p key={h.days} className="mt-1">
                    <span className="font-medium">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Direct Line</span>
                <p className="mt-1 font-medium">{dental.email}</p>
                <p className="text-muted">{dental.phone}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] bg-bg p-6 shadow-md ring-1 ring-line md:p-10">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    role="status"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: easeStudio }}
                    className="py-12 text-center"
                  >
                    <p className="font-display text-4xl font-semibold text-fg">Consultation Requested</p>
                    <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
                      Thank you. Our patient concierge will reach out within one business day to confirm your preferred suite time.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 inline-flex min-h-11 cursor-pointer items-center rounded-full bg-surface px-6 text-sm font-semibold text-fg ring-1 ring-line hover:bg-bg"
                    >
                      Book another appointment
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={onSubmit}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="dental-name" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Your Full Name
                        </label>
                        <input
                          id="dental-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Dr. Jordan Blake"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="dental-email" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Email Address
                        </label>
                        <input
                          id="dental-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="jordan@example.com"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="dental-company" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Preferred Day / Time
                        </label>
                        <input
                          id="dental-company"
                          name="company"
                          type="text"
                          placeholder="e.g. Tuesday morning or Thursday"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="dental-service" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Clinical Discipline
                        </label>
                        <select
                          id="dental-service"
                          name="service"
                          defaultValue="3D Smile Scan & Consultation"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        >
                          <option value="3D Smile Scan & Consultation">3D Smile Scan &amp; Consultation</option>
                          <option value="Porcelain Veneers Inquiry">Porcelain Veneers Inquiry</option>
                          <option value="Clear Aligners Orthodontics">Clear Aligners Orthodontics</option>
                          <option value="Guided Implant Rehabilitation">Guided Implant Rehabilitation</option>
                          <option value="Preventative Biofilm Hygiene">Preventative Biofilm Hygiene</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dental-message" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                        Goals &amp; Clinical Notes
                      </label>
                      <textarea
                        id="dental-message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell us what you would like to achieve or any dental anxiety we can support..."
                        className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                    </div>

                    {/* Honeypot field */}
                    <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
                      <label>
                        Website
                        <input name="website" tabIndex={-1} autoComplete="off" />
                      </label>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-full bg-accent px-7 text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 hover:scale-[1.02] disabled:opacity-50"
                      >
                        <span>{status === "sending" ? "Requesting..." : "Request Consultation"}</span>
                        <ArrowIsland size={14} className="bg-white/20 text-white" />
                      </button>
                      {notice && <p role="alert" className="text-xs text-red-600">{notice}</p>}
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
