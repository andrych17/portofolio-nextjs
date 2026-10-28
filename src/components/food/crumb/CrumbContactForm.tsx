"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { easeStudio } from "@/components/motion/ease";
import { crumb } from "@/content/food/crumb";
import { useContactForm } from "@/lib/use-contact-form";

export function CrumbContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(crumb.key);

  return (
    <section id="reserve" aria-labelledby="reserve-heading" className="bg-surface/50 border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Counter &amp; Pre-Orders</Eyebrow>
            <h2 id="reserve-heading" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-tight text-fg">
              Reserve your morning loaf or pastry box.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Pre-orders guarantee your bakes are held behind the counter until closing. For weekend pastry boxes or custom catering, contact us forty-eight hours in advance.
            </p>

            <div className="mt-8 space-y-6 text-sm text-fg/90">
              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Bakery Counter</span>
                <p className="mt-1 font-medium">{crumb.street}, {crumb.city}</p>
                <p className="text-muted">{crumb.postalCode}, {crumb.countryCode}</p>
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Baking Hours</span>
                {crumb.hours.map((h) => (
                  <p key={h.days} className="mt-1">
                    <span className="font-medium">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Direct Dispatch</span>
                <p className="mt-1 font-medium">{crumb.email}</p>
                <p className="text-muted">{crumb.phone}</p>
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
                    <p className="font-display text-4xl font-semibold text-fg">Pre-Order Received</p>
                    <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
                      Thank you. Your bakes will be marked and reserved behind the counter for your requested morning pull.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 inline-flex min-h-11 cursor-pointer items-center rounded-full bg-surface px-6 text-sm font-semibold text-fg ring-1 ring-line hover:bg-bg"
                    >
                      Place another pre-order
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
                        <label htmlFor="crumb-name" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Your Name
                        </label>
                        <input
                          id="crumb-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Julian Vance"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="crumb-email" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Email Address
                        </label>
                        <input
                          id="crumb-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="julian@example.com"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="crumb-company" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Requested Pickup Day
                        </label>
                        <input
                          id="crumb-company"
                          name="company"
                          type="text"
                          placeholder="e.g. Saturday 08:30"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="crumb-service" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Reservation Type
                        </label>
                        <select
                          id="crumb-service"
                          name="service"
                          defaultValue="Weekend Sourdough Loaf"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        >
                          <option value="Weekend Sourdough Loaf">Weekend Sourdough Loaf</option>
                          <option value="Pastry Box (6 or 12)">Pastry Box (6 or 12)</option>
                          <option value="Office Breakfast Catering">Office Breakfast Catering</option>
                          <option value="Whole Bean Coffee Bag">Whole Bean Coffee Bag</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="crumb-message" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                        Bake Items &amp; Special Instructions
                      </label>
                      <textarea
                        id="crumb-message"
                        name="message"
                        rows={4}
                        required
                        placeholder="List specific loaves, viennoiserie, or whole bean coffees..."
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
                        <span>{status === "sending" ? "Reserving..." : "Reserve Bakes"}</span>
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
