"use client";

import { CheckIcon, NavigationArrowIcon, SparkleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { fleet, type TransitLane } from "@/content/logistics/fleet";

export function FleetTransitCalculator() {
  const [selectedLane, setSelectedLane] = useState<string>("Chicago, IL to Dallas, TX");

  const currentLane: TransitLane =
    fleet.lanes.find((l) => `${l.origin} to ${l.destination}` === selectedLane) || fleet.lanes[0];

  return (
    <section id="lanes" aria-labelledby="lanes-heading" className="bg-surface/50 py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>Highway Corridors</Eyebrow>
            <h2 id="lanes-heading" className="mt-3 font-display text-[clamp(2.2rem,4.5vw,3.8rem)] font-semibold leading-tight text-fg">
              Scheduled Lane Transit
            </h2>
            <p className="mt-4 text-muted">
              Select key industrial corridors to view fixed departure cadences, highway mileage, and guaranteed team-transit delivery windows.
            </p>

            <div className="mt-8 space-y-3">
              {fleet.lanes.map((l) => {
                const laneKey = `${l.origin} to ${l.destination}`;
                const isSelected = selectedLane === laneKey;
                return (
                  <button
                    key={laneKey}
                    type="button"
                    onClick={() => setSelectedLane(laneKey)}
                    className={`flex w-full cursor-pointer items-start justify-between rounded-2xl p-4 text-left transition-all ${
                      isSelected
                        ? "bg-bg shadow-sm ring-2 ring-accent"
                        : "bg-surface ring-1 ring-line hover:bg-bg"
                    }`}
                  >
                    <div className="pr-4">
                      <span className="block text-sm font-semibold text-fg">{laneKey}</span>
                      <span className="mt-1 block text-xs text-muted">{l.distance} · {l.status}</span>
                    </div>
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? "border-accent bg-accent text-white"
                          : "border-line bg-bg text-transparent"
                      }`}
                    >
                      <CheckIcon size={12} weight="bold" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] bg-bg p-6 shadow-md ring-1 ring-line md:p-10">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                  <SparkleIcon size={16} weight="fill" />
                  Corridor Performance
                </span>
                <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-bold text-accent">
                  {currentLane.status}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="font-display text-2xl font-semibold text-fg md:text-3xl">
                  {currentLane.origin}
                </span>
                <NavigationArrowIcon size={20} className="rotate-90 text-accent" weight="bold" />
                <span className="font-display text-2xl font-semibold text-fg md:text-3xl">
                  {currentLane.destination}
                </span>
              </div>

              <p className="mt-3 text-sm text-muted">
                Dedicated direct linehaul with continuous satellite tracking and automated arrival webhooks.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-surface p-4 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted">Highway Distance</span>
                  <p className="mt-1 font-display text-2xl font-semibold text-fg md:text-3xl">
                    {currentLane.distance}
                  </p>
                  <span className="text-[11px] text-muted">Direct interstate routing</span>
                </div>
                <div className="rounded-2xl bg-surface p-4 text-center">
                  <span className="text-[11px] uppercase tracking-wider text-muted">Transit Window</span>
                  <p className="mt-1 font-display text-lg font-semibold text-accent md:text-xl">
                    {currentLane.transitHours}
                  </p>
                  <span className="text-[11px] text-muted">Guaranteed arrival SLA</span>
                </div>
                <div className="col-span-2 rounded-2xl bg-surface p-4 text-center sm:col-span-1">
                  <span className="text-[11px] uppercase tracking-wider text-muted">Frequency</span>
                  <p className="mt-1 font-display text-lg font-semibold text-fg md:text-xl">
                    {currentLane.departures}
                  </p>
                  <span className="text-[11px] text-muted">Scheduled terminal pull</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <p className="text-xs text-muted">
                  Available in both 53ft Air-Ride Dry Van and Dual-Zone Multi-Temp Reefer configurations.
                </p>
                <a
                  href="#quote"
                  className="inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                >
                  Lock In Lane Rate &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
