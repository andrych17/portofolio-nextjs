"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { easeStudio } from "@/components/motion/ease";
import { bowl } from "@/content/food/bowl";
import { useContactForm } from "@/lib/use-contact-form";

export function BowlContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(bowl.key);

  return (
    <section id="visit" aria-labelledby="visit-heading" className="bg-surface/50 border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Counter &amp; Orders</Eyebrow>
            <h2 id="visit-heading" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-tight text-fg">
              Visit the counter or arrange catering.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Walk in any morning for fresh breakfast pots, order your customized grain bowl, or contact our team for team lunches and circular bowl catering.
            </p>

            <div className="mt-8 space-y-6 text-sm text-fg/90">
              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Counter Location</span>
                <p className="mt-1 font-medium">{bowl.street}, {bowl.city}</p>
                <p className="text-muted">{bowl.postalCode}, {bowl.countryCode}</p>
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Counter Hours</span>
                {bowl.hours.map((h) => (
                  <p key={h.days} className="mt-1">
                    <span className="font-medium">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Direct Contact</span>
                <p className="mt-1 font-medium">{bowl.email}</p>
                <p className="text-muted">{bowl.phone}</p>
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
                    <p className="font-display text-4xl font-semibold text-fg">Message Received</p>
                    <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
                      Thank you for reaching out. A team member will respond within one working day to confirm details.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 inline-flex min-h-11 cursor-pointer items-center rounded-full bg-surface px-6 text-sm font-semibold text-fg ring-1 ring-line hover:bg-bg"
                    >
                      Send another message
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
                        <label htmlFor="bowl-name" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Your Name
                        </label>
                        <input
                          id="bowl-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Alex Morgan"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="bowl-email" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Email Address
                        </label>
                        <input
                          id="bowl-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="alex@example.com"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="bowl-company" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Company / Party Size (Optional)
                        </label>
                        <input
                          id="bowl-company"
                          name="company"
                          type="text"
                          placeholder="e.g. Design Studio (12 people)"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="bowl-service" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Inquiry Type
                        </label>
                        <select
                          id="bowl-service"
                          name="service"
                          defaultValue="Office Catering"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        >
                          <option value="Office Catering">Office Catering</option>
                          <option value="Weekly Meal Subscription">Weekly Meal Subscription</option>
                          <option value="Private Event">Private Event</option>
                          <option value="General Question">General Question</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="bowl-message" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                        Message &amp; Dietary Requirements
                      </label>
                      <textarea
                        id="bowl-message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Tell us about your event date, number of bowls, or dietary preferences..."
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
                        <span>{status === "sending" ? "Sending..." : "Submit Inquiry"}</span>
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
