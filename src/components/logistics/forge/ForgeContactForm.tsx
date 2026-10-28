"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { easeStudio } from "@/components/motion/ease";
import { forge } from "@/content/logistics/forge";
import { useContactForm } from "@/lib/use-contact-form";

export function ForgeContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(forge.key);

  return (
    <section id="quote" aria-labelledby="quote-heading" className="bg-surface/50 border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Project Cargo RFP</Eyebrow>
            <h2 id="quote-heading" className="mt-4 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-semibold leading-tight text-fg">
              Request engineered transport review.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Submit piece weights, dimensions, origin/destination corridors, or dimensional drawings. Our senior heavy-lift engineers will evaluate route feasibility and trailer line configurations.
            </p>

            <div className="mt-8 space-y-6 text-sm text-fg/90">
              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Terminal Berth &amp; Engineering</span>
                <p className="mt-1 font-medium">{forge.street}</p>
                <p className="text-muted">{forge.city}, {forge.postalCode}, {forge.countryCode}</p>
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Engineering Operations</span>
                {forge.hours.map((h) => (
                  <p key={h.days} className="mt-1">
                    <span className="font-medium">{h.days}:</span> {h.time}
                  </p>
                ))}
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-muted">Project Desk</span>
                <p className="mt-1 font-medium">{forge.email}</p>
                <p className="text-muted">{forge.phone}</p>
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
                    <p className="font-display text-4xl font-semibold text-fg">RFP Received</p>
                    <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
                      Thank you. Your dimensional parameters have been assigned to an engineering project manager for swept-path and axle line modeling.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 inline-flex min-h-11 cursor-pointer items-center rounded-full bg-surface px-6 text-sm font-semibold text-fg ring-1 ring-line hover:bg-bg"
                    >
                      Submit another project RFP
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
                        <label htmlFor="forge-name" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Project Engineer Name
                        </label>
                        <input
                          id="forge-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Douglas Reed"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="forge-email" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Corporate Email
                        </label>
                        <input
                          id="forge-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="douglas@apexenergy.com"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="forge-company" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Estimated Weight &amp; Dimensions
                        </label>
                        <input
                          id="forge-company"
                          name="company"
                          type="text"
                          placeholder="e.g. 350 Tons, 28ft x 16ft x 15ft"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all placeholder:text-muted/60 focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="forge-service" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                          Scope Requirement
                        </label>
                        <select
                          id="forge-service"
                          name="service"
                          defaultValue="Multi-Axle SPMT Heavy Haul"
                          className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm text-fg ring-1 ring-line transition-all focus:bg-bg focus:ring-2 focus:ring-accent focus:outline-none"
                        >
                          <option value="Multi-Axle SPMT Heavy Haul">Multi-Axle SPMT Heavy Haul</option>
                          <option value="Power Generation Stator Transport">Power Generation Stator Transport</option>
                          <option value="Indoor Hydraulic Gantry Rigging">Indoor Hydraulic Gantry Rigging</option>
                          <option value="Waterfront Ro-Ro Barge Transload">Waterfront Ro-Ro Barge Transload</option>
                          <option value="Route Survey & Bridge Analysis">Route Survey &amp; Bridge Analysis</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="forge-message" className="block text-xs font-semibold uppercase tracking-wider text-muted">
                        Route Corridor &amp; Foundation Site Details
                      </label>
                      <textarea
                        id="forge-message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Origin port/railhead, destination job site, bridge restrictions, or required crane rigging..."
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
                        <span>{status === "sending" ? "Submitting RFP..." : "Submit Project RFP"}</span>
                        <ArrowIsland size={14} className="bg-black/20 text-black" />
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
