"use client";

import Image from "next/image";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";

type Frame = { image: string; alt: string; title: string; note: string };

// Alternate sizes and baselines so the row never reads as a uniform strip.
const shapes = [
  "h-[56vh] w-[30vw] rounded-t-[999px]",
  "h-[42vh] w-[28vw] self-end",
  "h-[52vh] w-[24vw]",
  "h-[58vh] w-[32vw] self-start rounded-b-[999px]",
  "h-[46vh] w-[28vw] self-end",
];

/** Desktop: the section pins and vertical scroll pulls the row sideways. Touch: a native swipe row. */
export function EmberGallery({ frames }: { frames: Frame[] }) {
  return (
    <>
      <div className="hidden md:block">
        <HorizontalScroll trackClassName="items-center gap-[5vw] px-[6vw]">
          {frames.map((frame, i) => (
            <figure key={frame.title} className={`flex shrink-0 flex-col ${i % 2 ? "self-end pb-[8vh]" : "self-start pt-[10vh]"}`}>
              <div className={`ember-tint relative overflow-hidden rounded-[1.5rem] ring-1 ring-fg/10 ${shapes[i % shapes.length]}`}>
                <Image src={frame.image} alt={frame.alt} fill sizes="36vw" className="object-cover" />
              </div>
              <figcaption className="mt-5 flex items-baseline gap-4">
                <span className="text-xs tabular-nums text-accent">0{i + 1} / 0{frames.length}</span>
                <span className="font-display text-3xl">{frame.title}</span>
                <span className="max-w-[16rem] text-sm text-muted">{frame.note}</span>
              </figcaption>
            </figure>
          ))}
        </HorizontalScroll>
      </div>

      <div className="md:hidden">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none]">
          {frames.map((frame, i) => (
            <li key={frame.title} className="w-[78vw] shrink-0 snap-center">
              <div className={`ember-tint relative aspect-[4/5] overflow-hidden ring-1 ring-fg/10 ${i % 2 ? "rounded-[1.5rem]" : "rounded-t-[999px] rounded-b-[1.5rem]"}`}>
                <Image src={frame.image} alt={frame.alt} fill sizes="78vw" className="object-cover" />
              </div>
              <p className="mt-4 flex items-baseline gap-3">
                <span className="text-xs tabular-nums text-accent">0{i + 1}</span>
                <span className="font-display text-2xl">{frame.title}</span>
              </p>
              <p className="mt-1 text-sm text-muted">{frame.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
