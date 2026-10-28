"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { easeStudio } from "@/components/motion/ease";
import { fleet } from "@/content/logistics/fleet";
import { useContactForm } from "@/lib/use-contact-form";

export function FleetContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(fleet.key);

  return (
    <section id="quote" aria-labelledby="quote-heading" className="bg-surface/50 border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Capacity &amp; Dispatch</Eyebrow>
            <h2 id="quote-heading" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-tight text-fg">
              Request immediate spot rate or contract capacity.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Submit your origin, destination, and equipment requirements. Our central dispatch team confirms lane capacity and sends formal rate confirmations within fifteen minutes.
            </p>

            <div className="mt-8 space-y-6 text-sm text-fg/90">
              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Headquarters &amp; Dispatch</span>
                <p className="mt-1 font-medium">{fleet.street}</p>
                <p className="text-muted">{fleet.city}, {fleet.postalCode}, {fleet.countryCode}</p>
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Dispatch Operations</span>
                {fleet.hours.map((h) => (
                  <p key={h.days} className="mt-1">
                    <span className="font-medium">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Direct Line</span>
                <p className="mt-1 font-medium">{fleet.email}</p>
                <p className="text-muted">{fleet.phone}</p>
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
                    <p className="font-display text-4xl font-semibold text-fg">Rate Request Received</p>
                    <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
                      Thank you. Your inquiry has been routed to our active corridor dispatch desk. Expect a binding rate sheet within fifteen minutes.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 inline-flex min-h-11 cursor-pointer items-center rounded-full bg-surface px-6 text-sm font-semibold text-fg ring-1 ring-line hover:bg-bg"
                    >
                      Submit another lane request
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
                        <label htmlFor="fleet-name" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Logistics Contact Name
                        </label>
                        <input
                          id="fleet-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Sarah Henderson"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="fleet-email" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Work Email
                        </label>
                        <input
                          id="fleet-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="sarah@precisionparts.com"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fleet-company" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Origin &amp; Destination Zip Codes
                        </label>
                        <input
                          id="fleet-company"
                          name="company"
                          type="text"
                          placeholder="e.g. 60601 to 75201"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="fleet-service" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Equipment Type
                        </label>
                        <select
                          id="fleet-service"
                          name="service"
                          defaultValue="53ft Air-Ride Dry Van"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        >
                          <option value="53ft Air-Ride Dry Van">53ft Air-Ride Dry Van</option>
                          <option value="Dual-Zone Multi-Temp Reefer">Dual-Zone Multi-Temp Reefer</option>
                          <option value="Expedited Non-Stop Team Transit">Expedited Non-Stop Team Transit</option>
                          <option value="Dedicated Contract Fleet RFP">Dedicated Contract Fleet RFP</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="fleet-message" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                        Shipment Details &amp; Special Handling
                      </label>
                      <textarea
                        id="fleet-message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Commodity type, pallet count, estimated weight, required temperature range, or pickup deadline..."
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
                        <span>{status === "sending" ? "Calculating..." : "Request Lane Rate"}</span>
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
