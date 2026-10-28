"use client";

import {
  BabyIcon,
  BoneIcon,
  FlowerTulipIcon,
  HeartbeatIcon,
  StethoscopeIcon,
  SunIcon,
  TestTubeIcon,
  ClockIcon,
  MapPinIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { clinic, type ClinicDept } from "@/content/health/clinic";
import { DoctorAvatar } from "./DoctorAvatar";
import { openBooking } from "./book";

const icons = {
  stethoscope: StethoscopeIcon,
  baby: BabyIcon,
  tulip: FlowerTulipIcon,
  heartbeat: HeartbeatIcon,
  bone: BoneIcon,
  sun: SunIcon,
  testtube: TestTubeIcon,
} satisfies Record<ClinicDept["icon"], unknown>;

/** Department tabs. Every panel stays in the HTML, inactive ones are hidden, so the copy is crawlable. */
export function ClinicDepartments() {
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = clinic.departments.length;

  function onKey(e: KeyboardEvent) {
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (active + 1) % count : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (active - 1 + count) % count : e.key === "Home" ? 0 : e.key === "End" ? count - 1 : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Departments"
        onKeyDown={onKey}
        className="clinic-scroll -mx-5 flex snap-x gap-2 overflow-x-auto px-5 md:col-span-4 md:mx-0 md:flex-col md:gap-1 md:overflow-visible md:px-0"
      >
        {clinic.departments.map((dept, i) => {
          const Icon = icons[dept.icon];
          const on = i === active;
          return (
            <button
              key={dept.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative flex min-h-14 shrink-0 cursor-pointer snap-start items-center gap-3 rounded-full px-5 py-3 text-left text-[15px] font-semibold transition-colors duration-500 md:rounded-2xl md:py-4 ${
                on ? "text-fg" : "text-bg/70 hover:text-bg"
              }`}
            >
              {on && (
                <motion.span
                  layoutId={`${id}-pill`}
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  className="absolute inset-0 rounded-[inherit] bg-bg shadow-[0_14px_30px_-18px_rgba(0,0,0,0.6)]"
                />
              )}
              <Icon size={22} weight={on ? "fill" : "regular"} aria-hidden className="relative shrink-0" />
              <span className="relative whitespace-nowrap">{dept.name}</span>
              <span className="relative ml-auto hidden font-mono text-xs opacity-50 md:block">{String(i + 1).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <div className="md:col-span-8">
        {clinic.departments.map((dept, i) => {
          const lead = clinic.doctors.find((d) => d.id === dept.lead)!;
          return (
            <div
              key={dept.id}
              role="tabpanel"
              id={`${id}-panel-${i}`}
              aria-labelledby={`${id}-tab-${i}`}
              hidden={i !== active}
              className="clinic-panel rounded-[2rem] bg-white/[0.06] p-1.5 ring-1 ring-white/10"
            >
              <div className="rounded-[calc(2rem-0.375rem)] bg-white/[0.04] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] md:p-10">
                <h3 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.95] text-bg">{dept.name}</h3>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-bg/75">{dept.blurb}</p>

                <p className="mt-9 text-xs font-semibold uppercase tracking-[0.16em] text-bg/50">We see you for</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {dept.sees.map((s) => (
                    <li key={s} className="rounded-full bg-white/10 px-4 py-2 text-sm text-bg">
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
                  <div className="flex items-center gap-4">
                    <div className="size-16 shrink-0 overflow-hidden rounded-2xl" style={{ background: lead.look.bg }}>
                      <DoctorAvatar look={lead.look} className="size-full" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-bg/50">Department lead</p>
                      <p className="mt-1 font-display text-xl text-bg">{lead.name}</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-sm text-bg/80">
                    <li className="flex items-center gap-2.5">
                      <ClockIcon size={18} aria-hidden className="shrink-0 text-accent" /> {dept.hours}
                    </li>
                    <li className="flex items-center gap-2.5">
                      <MapPinIcon size={18} aria-hidden className="shrink-0 text-accent" /> {dept.location}
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => openBooking({ dept: dept.id })}
                  className="mt-9 inline-flex min-h-12 cursor-pointer items-center rounded-full bg-accent px-7 text-[15px] font-bold text-fg transition-transform duration-500 ease-studio hover:scale-[1.03] active:scale-[0.97]"
                >
                  Book in {dept.name.toLowerCase()}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
