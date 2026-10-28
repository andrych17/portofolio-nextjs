"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import { orbit } from "@/content/tech/orbit";
import { useContactForm } from "@/lib/use-contact-form";

export function OrbitContactForm() {
  const { status, errors, notice, onSubmit, reset } = useContactForm(orbit.key);

  return (
    <section id="cluster" aria-labelledby="cluster-heading" className="py-20 md:py-32 border-t border-orbit-border relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orbit-border bg-orbit-surface text-xs font-mono text-orbit-accent">
              <span>Cluster Provisioning</span>
            </div>

            <h2 id="cluster-heading" className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-orbit-fg leading-tight">
              Deploy your private GPU supercluster.
            </h2>

            <p className="text-base text-orbit-muted leading-relaxed">
              Connect with our distributed infrastructure architects. Reserve dedicated H100 or B200 SXM5 pods, configure custom vLLM pipelines, or establish direct AWS PrivateLink interconnects.
            </p>

            <div className="pt-6 border-t border-orbit-border/60 space-y-4 text-xs font-mono text-orbit-muted">
              <div>
                <span className="text-[10px] uppercase text-orbit-muted/70 block">Global Infrastructure HQ</span>
                <p className="text-orbit-fg font-medium mt-0.5">{orbit.street}</p>
                <p>{orbit.city}, {orbit.postalCode} • {orbit.countryCode}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase text-orbit-muted/70 block">Direct Engineering Desk</span>
                <p className="text-orbit-fg font-medium mt-0.5">{orbit.email}</p>
                <p>{orbit.phone}</p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orbit-surface border border-orbit-border text-xs text-orbit-emerald">
                  <span className="w-2 h-2 rounded-full bg-orbit-emerald animate-pulse" />
                  Bare-Metal GPU Allocation: Live Quota Available
                </span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-orbit-border bg-orbit-surface/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    role="status"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: easeStudio }}
                    className="py-12 text-center"
                  >
                    <div className="inline-flex size-14 items-center justify-center rounded-full bg-orbit-accent/20 text-orbit-accent mb-4 border border-orbit-accent/40">
                      <span className="w-4 h-4 rounded-full bg-orbit-accent animate-ping" />
                    </div>
                    <p className="font-heading text-3xl font-bold text-orbit-fg">Cluster Request Received</p>
                    <p className="mx-auto mt-4 max-w-md text-sm text-orbit-muted leading-relaxed">
                      Thank you. Your compute specifications and concurrency targets have been assigned to a solutions architect. We will reach out within 2 hours.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-8 inline-flex cursor-pointer items-center rounded-xl bg-orbit-surface px-6 py-2.5 text-xs font-mono font-semibold text-orbit-fg border border-orbit-border hover:bg-orbit-surface-hover"
                    >
                      Configure Another Cluster
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
                        <label htmlFor="orbit-name" className="block text-xs font-mono uppercase tracking-wider text-orbit-muted">
                          Engineering Lead Name
                        </label>
                        <input
                          id="orbit-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Elena Rostova"
                          className="mt-2 w-full rounded-xl bg-orbit-bg px-4 py-3 text-sm text-orbit-fg border border-orbit-border transition-all placeholder:text-orbit-muted/50 focus:border-orbit-accent focus:ring-1 focus:ring-orbit-accent focus:outline-none"
                        />
                        {errors.name && <p className="mt-1 text-xs text-rose-500 font-mono">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="orbit-email" className="block text-xs font-mono uppercase tracking-wider text-orbit-muted">
                          Work Email
                        </label>
                        <input
                          id="orbit-email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="elena@cognition.ai"
                          className="mt-2 w-full rounded-xl bg-orbit-bg px-4 py-3 text-sm text-orbit-fg border border-orbit-border transition-all placeholder:text-orbit-muted/50 focus:border-orbit-accent focus:ring-1 focus:ring-orbit-accent focus:outline-none"
                        />
                        {errors.email && <p className="mt-1 text-xs text-rose-500 font-mono">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="orbit-company" className="block text-xs font-mono uppercase tracking-wider text-orbit-muted">
                          Company / Organization
                        </label>
                        <input
                          id="orbit-company"
                          name="company"
                          type="text"
                          placeholder="Cognition AI Systems"
                          className="mt-2 w-full rounded-xl bg-orbit-bg px-4 py-3 text-sm text-orbit-fg border border-orbit-border transition-all placeholder:text-orbit-muted/50 focus:border-orbit-accent focus:ring-1 focus:ring-orbit-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label htmlFor="orbit-service" className="block text-xs font-mono uppercase tracking-wider text-orbit-muted">
                          Desired Deployment Architecture
                        </label>
                        <select
                          id="orbit-service"
                          name="service"
                          defaultValue="Dedicated H100 Pod (8x GPU)"
                          className="mt-2 w-full rounded-xl bg-orbit-bg px-4 py-3 text-sm text-orbit-fg border border-orbit-border transition-all focus:border-orbit-accent focus:ring-1 focus:ring-orbit-accent focus:outline-none"
                        >
                          <option value="Serverless Pay-As-You-Go">Serverless Pay-As-You-Go</option>
                          <option value="Dedicated H100 Pod (8x GPU)">Dedicated H100 Pod (8x GPU)</option>
                          <option value="Enterprise Private Supercluster (64+ GPU)">Enterprise Private Supercluster (64+ GPU)</option>
                          <option value="Custom LoRA Warm Cache Pipeline">Custom LoRA Warm Cache Pipeline</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="orbit-message" className="block text-xs font-mono uppercase tracking-wider text-orbit-muted">
                        Inference Workload &amp; Concurrency Requirements
                      </label>
                      <textarea
                        id="orbit-message"
                        name="message"
                        rows={4}
                        required
                        placeholder="Expected daily token volumes, model architecture (e.g. DeepSeek V3 / Llama 70B), target regions, or private VPC peering requirements..."
                        className="mt-2 w-full rounded-xl bg-orbit-bg px-4 py-3 text-sm text-orbit-fg border border-orbit-border transition-all placeholder:text-orbit-muted/50 focus:border-orbit-accent focus:ring-1 focus:ring-orbit-accent focus:outline-none"
                      />
                      {errors.message && <p className="mt-1 text-xs text-rose-500 font-mono">{errors.message}</p>}
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
                        className="group inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-xl bg-orbit-accent px-7 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-orbit-accent/25 transition-transform duration-200 hover:scale-[1.02] disabled:opacity-50"
                      >
                        <span>{status === "sending" ? "Transmitting Specification..." : "Submit Cluster Reservation"}</span>
                        <ArrowIsland size={14} className="bg-white/20 text-white" />
                      </button>
                      {notice && <p role="alert" className="text-xs text-rose-500 font-mono">{notice}</p>}
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
