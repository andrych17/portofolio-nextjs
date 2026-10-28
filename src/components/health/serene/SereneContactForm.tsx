"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { easeStudio } from "@/components/motion/ease";
import { serene } from "@/content/health/serene";
import { useContactForm } from "@/lib/use-contact-form";

export function SereneContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(serene.key);

  return (
    <section id="book" aria-labelledby="book-heading" className="bg-surface/50 border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Sanctuary Access</Eyebrow>
            <h2 id="book-heading" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-tight text-fg">
              Reserve your private recovery suite.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Individual and tandem private contrast suites, hyperbaric oxygen chambers, and physiotherapy appointments can be booked up to two weeks in advance.
            </p>

            <div className="mt-8 space-y-6 text-sm text-fg/90">
              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Sanctuary Location</span>
                <p className="mt-1 font-medium">{serene.street}</p>
                <p className="text-muted">{serene.city}, {serene.postalCode}, {serene.countryCode}</p>
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Sanctuary Hours</span>
                {serene.hours.map((h) => (
                  <p key={h.days} className="mt-1">
                    <span className="font-medium">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Concierge Desk</span>
                <p className="mt-1 font-medium">{serene.email}</p>
                <p className="text-muted">{serene.phone}</p>
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
                    <p className="font-display text-4xl font-semibold text-fg">Reservation Requested</p>
                    <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
                      Thank you. Our recovery concierge will confirm your private suite time and email pre-session hydration guidelines shortly.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 inline-flex min-h-11 cursor-pointer items-center rounded-full bg-surface px-6 text-sm font-semibold text-fg ring-1 ring-line hover:bg-bg"
                    >
                      Book another session
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
                        <label htmlFor="serene-name" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Your Full Name
                        </label>
                        <input
                          id="serene-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Elena Rostova"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="serene-email" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Email Address
                        </label>
                        <input
                          id="serene-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="elena@example.com"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="serene-company" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Preferred Day &amp; Time
                        </label>
                        <input
                          id="serene-company"
                          name="company"
                          type="text"
                          placeholder="e.g. Wednesday 17:00 (Solo suite)"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="serene-service" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Therapy Protocol
                        </label>
                        <select
                          id="serene-service"
                          name="service"
                          defaultValue="60-Min Private Contrast Suite"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        >
                          <option value="60-Min Private Contrast Suite">60-Min Private Contrast Suite ($95)</option>
                          <option value="Mild Hyperbaric Oxygen 2.0 ATA">Mild Hyperbaric Oxygen 2.0 ATA ($160)</option>
                          <option value="Full-Spectrum Photobiomodulation">Full-Spectrum Photobiomodulation ($75)</option>
                          <option value="Precision Sports Physiotherapy">Precision Sports Physiotherapy ($185)</option>
                          <option value="The Longevity Triad Full Circuit">The Longevity Triad Full Circuit ($280)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="serene-message" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                        Health Background &amp; Focus Area
                      </label>
                      <textarea
                        id="serene-message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell us about your recovery targets, athletic training load, or joint rehabilitation needs..."
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
                        <span>{status === "sending" ? "Booking..." : "Reserve Suite"}</span>
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
