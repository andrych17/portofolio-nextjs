"use client";

import { ArrowLeftIcon, ArrowRightIcon, CalendarBlankIcon, TranslateIcon } from "@phosphor-icons/react";
import { motion, useMotionValue } from "motion/react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { clinic } from "@/content/health/clinic";
import { DoctorAvatar } from "./DoctorAvatar";
import { openBooking } from "./book";

/** Native scroll-snap carousel with buttons, mouse drag and a scroll-linked progress bar. */
export function ClinicDoctors() {
  const track = useRef<HTMLUListElement>(null);
  const progress = useMotionValue(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    progress.set(max > 0 ? el.scrollLeft / max : 0);
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
  }, [progress]);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const go = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * Math.min(420, track.current.clientWidth * 0.8), behavior: "smooth" });

  function onDown(e: PointerEvent<HTMLUListElement>) {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { down: true, x: e.clientX, left: track.current.scrollLeft, moved: false };
    track.current.classList.remove("snap-x");
  }
  function onMove(e: PointerEvent<HTMLUListElement>) {
    const d = drag.current;
    if (!d.down || !track.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    track.current.scrollLeft = d.left - dx;
  }
  function onUp() {
    drag.current.down = false;
    track.current?.classList.add("snap-x");
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-6 px-5 md:px-10">
        <div className="relative h-1 w-full max-w-xs overflow-hidden rounded-full bg-fg/10">
          <motion.span className="absolute inset-0 origin-left rounded-full bg-fg" style={{ scaleX: progress }} />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={edges.start}
            aria-label="Previous doctors"
            className="grid size-12 cursor-pointer place-items-center rounded-full bg-fg text-bg transition-opacity disabled:cursor-default disabled:opacity-25"
          >
            <ArrowLeftIcon size={18} weight="bold" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={edges.end}
            aria-label="Next doctors"
            className="grid size-12 cursor-pointer place-items-center rounded-full bg-fg text-bg transition-opacity disabled:cursor-default disabled:opacity-25"
          >
            <ArrowRightIcon size={18} weight="bold" aria-hidden />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={sync}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onClickCapture={(e) => {
          if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
          }
        }}
        aria-label="Doctor profiles"
        className="clinic-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 md:scroll-px-10 md:gap-5 md:px-10"
      >
        {clinic.doctors.map((doc) => (
          <li key={doc.id} className="w-[78vw] max-w-[350px] shrink-0 snap-start select-none md:w-[350px]">
            <article className="group rounded-[2rem] bg-white p-1.5 shadow-[0_24px_50px_-34px_rgba(14,53,53,0.55)] ring-1 ring-fg/[0.07]">
              <div className="relative aspect-[4/4.4] overflow-hidden rounded-[calc(2rem-0.375rem)]" style={{ background: doc.look.bg }}>
                <DoctorAvatar look={doc.look} className="size-full origin-bottom transition-transform duration-700 ease-studio group-hover:scale-[1.04]" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-fg">
                  <CalendarBlankIcon size={14} weight="bold" aria-hidden />
                  Next: {doc.next}
                </span>
              </div>
              <div className="p-5 pb-4">
                <h3 className="font-display text-[1.7rem] leading-none">{doc.name}</h3>
                <p className="mt-2 text-[15px] font-semibold text-[var(--c-teal)]">{doc.role}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{doc.bio}</p>
                <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <TranslateIcon size={16} aria-hidden /> {doc.languages.join(", ")} · {doc.years} years in practice
                </p>
                <button
                  type="button"
                  onClick={() => openBooking({ doctor: doc.id })}
                  className="mt-5 flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full bg-fg text-[15px] font-semibold text-bg transition-colors duration-300 hover:bg-[var(--c-teal)]"
                >
                  Book with {doc.name.split(" ")[0] === "Dr." ? `Dr. ${doc.name.split(" ")[1]}` : doc.name.split(" ")[0]}
                </button>
              </div>
            </article>
          </li>
        ))}
        <li aria-hidden className="w-2 shrink-0" />
      </ul>
    </div>
  );
}
