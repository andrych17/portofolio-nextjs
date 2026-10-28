import type { ReactNode } from "react";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import type { Milestone } from "@/content/types";

const tones = ["bg-k-yellow", "bg-k-pink", "bg-k-lime", "bg-k-blue text-white"];

/** Timeline that scrolls sideways while the page scrolls down. */
export function KineticMilestones({ items, heading }: { items: Milestone[]; heading: ReactNode }) {
  return (
    <HorizontalScroll trackClassName="items-center gap-6 px-5 md:gap-8 md:px-10">
      <div className="w-[80vw] shrink-0 md:w-[34vw]">{heading}</div>
      {items.map((m, i) => (
        <article
          key={m.year}
          className={`flex h-[58svh] w-[78vw] shrink-0 flex-col justify-between rounded-[2rem] border-2 border-k-ink p-7 shadow-[8px_8px_0_0_#121212] md:w-[38vw] md:p-10 ${tones[i % tones.length]} ${i % 2 ? "rotate-2" : "-rotate-2"}`}
        >
          <p className="font-display text-[clamp(4.5rem,11vw,10rem)] font-black leading-none tracking-tight">{m.year}</p>
          <p className="max-w-sm text-xl font-medium leading-snug md:text-2xl">{m.text}</p>
        </article>
      ))}
    </HorizontalScroll>
  );
}
