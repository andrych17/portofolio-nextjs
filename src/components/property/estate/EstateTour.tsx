"use client";

import { ArrowsLeftRightIcon, PlayIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { estate } from "@/content/property/estate";

const { rooms } = estate.tour;

/** Poster first, then a drag-to-look viewer with a room switcher. */
export function EstateTour() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [dragged, setDragged] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const room = rooms[index];

  return (
    <div>
      <div ref={frame} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#17382b] ring-1 ring-white/15 sm:aspect-[16/10] md:aspect-[21/9]">
        <AnimatePresence initial={false}>
          <motion.div
            key={room.id + String(started)}
            className="absolute inset-y-0 -left-[28%] w-[175%] touch-pan-y cursor-grab active:cursor-grabbing md:-left-[15%] md:w-[135%]"
            style={{ x: started ? x : 0 }}
            drag={started ? "x" : false}
            dragConstraints={frame}
            dragElastic={0.06}
            onDragStart={() => setDragged(true)}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: easeStudio }}
          >
            <Image src={room.src} alt={room.alt} fill sizes="(min-width: 1024px) 1600px, 175vw" draggable={false} className="pointer-events-none select-none object-cover" />
          </motion.div>
        </AnimatePresence>

        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f2a20]/70 via-transparent to-[#0f2a20]/20" />

        {!started && (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-5 text-[#f6f2ea]"
            aria-label="Start the virtual tour of Cypress Villa"
          >
            <span className="relative flex size-24 items-center justify-center rounded-full bg-[#d6b571] text-[#0f2a20] transition-transform duration-700 ease-studio group-hover:scale-110">
              <span aria-hidden className="estate-ring absolute inset-0 rounded-full ring-1 ring-[#d6b571]" />
              <span aria-hidden className="estate-ring absolute inset-0 rounded-full ring-1 ring-[#d6b571]" style={{ animationDelay: "1.2s" }} />
              <PlayIcon size={34} weight="fill" aria-hidden />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.24em]">Start the tour</span>
          </button>
        )}

        {started && (
          <>
            <p className="absolute left-5 top-5 rounded-full bg-[#0f2a20]/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#f6f2ea] backdrop-blur">
              Cypress Villa · {room.label}
            </p>
            <motion.p
              animate={{ opacity: dragged ? 0 : 1 }}
              transition={{ duration: 0.6 }}
              className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#f6f2ea]/90 px-5 py-2.5 text-xs font-semibold text-[#0f2a20]"
            >
              <ArrowsLeftRightIcon size={16} aria-hidden /> Drag to look around
            </motion.p>
          </>
        )}
      </div>

      <div role="group" aria-label="Choose a room" className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
        {rooms.map((r, i) => {
          const active = i === index;
          return (
            <button
              key={r.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setIndex(i);
                setStarted(true);
                x.set(0);
              }}
              className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition-colors duration-500 ease-studio ${
                active ? "bg-[#d6b571] text-[#0f2a20]" : "bg-white/[0.05] text-[#f6f2ea] ring-1 ring-white/10 hover:bg-white/[0.1]"
              }`}
            >
              <span className={`text-[11px] font-bold tabular-nums ${active ? "text-[#0f2a20]/70" : "text-[#d6b571]"}`}>0{i + 1}</span>
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
