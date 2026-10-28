"use client";

import Image from "next/image";
import { useState } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { Tilt } from "@/components/motion/Tilt";
import { salt, type Piece } from "@/content/fashion/salt";
import { useMediaQuery } from "@/lib/use-media-query";

// Zigzag 7/5, 5/7, 7/5 in the 12-column grid. The ratios are picked so both cards in a row come out the same height.
const WIDE = { span: "md:col-span-7", ratio: "aspect-[5/4]" };
const TALL = { span: "md:col-span-5", ratio: "aspect-[9/10]" };
const LAYOUT = [WIDE, TALL, TALL, WIDE, WIDE, TALL];

export function SaltPieces() {
  return (
    <section id="pieces" aria-labelledby="pieces-title" className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="salt-caps text-muted">01 · The season</p>
          <MaskText
            as="h2"
            id="pieces-title"
            className="mt-5 font-display text-[clamp(2.8rem,7.6vw,7.8rem)]"
            lines={["Six pieces,", <span key="s" className="text-accent">four colours.</span>]}
          />
        </div>
        <Reveal y={16} className="max-w-xs text-muted">
          <p>Tap a colour to try it on the photo. The real fabric is a little deeper and a lot softer.</p>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-x-6 gap-y-14 md:mt-20 md:grid-cols-12">
        {salt.pieces.map((p, i) => (
          <li key={p.id} className={LAYOUT[i].span}>
            <Reveal y={48} amount={0.15}>
              <PieceCard piece={p} index={i} ratio={LAYOUT[i].ratio} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PieceCard({ piece, index, ratio }: { piece: Piece; index: number; ratio: string }) {
  const [pick, setPick] = useState(0);
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const colour = piece.colours[pick];

  const frame = (
    <div className={`relative w-full overflow-hidden rounded-[1.6rem] bg-surface ${ratio}`}>
      <Image src={piece.image.src} alt={piece.image.alt} fill sizes="(min-width: 768px) 55vw, 92vw" className="object-cover" />
      <span
        aria-hidden
        className="absolute inset-0 mix-blend-soft-light transition-[background-color,opacity] duration-700 ease-studio"
        style={{ background: colour.hex, opacity: pick === 0 ? 0 : 0.85 }}
      />
      <span className="salt-caps absolute left-4 top-4 rounded-full bg-[var(--l-paper)] px-3 py-1.5 text-[var(--l-ink)]">{String(index + 1).padStart(2, "0")}</span>
    </div>
  );

  return (
    <article>
      {fine ? <Tilt max={4}>{frame}</Tilt> : frame}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-[1.9rem] leading-none md:text-[2.3rem]">{piece.name}</h3>
          <p className="mt-2 text-muted">
            {piece.kind} · {piece.fabric}
          </p>
        </div>
        <p className="font-display text-[1.7rem] leading-none">${piece.price}</p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-1" role="radiogroup" aria-label={`${piece.name} colour`}>
        {piece.colours.map((c, ci) => (
          <button
            key={c.name}
            type="button"
            role="radio"
            aria-checked={ci === pick}
            aria-label={c.name}
            onClick={() => setPick(ci)}
            className="group flex size-11 cursor-pointer items-center justify-center"
          >
            <span
              className={`block size-6 rounded-full ring-2 ring-offset-2 transition-[box-shadow,transform] duration-500 ease-studio group-hover:scale-110 ${ci === pick ? "ring-fg" : "ring-transparent"}`}
              style={{ background: c.hex, boxShadow: "inset 0 0 0 1.5px color-mix(in srgb, var(--t-fg) 45%, transparent)", ["--tw-ring-offset-color" as string]: "var(--t-bg)" }}
            />
          </button>
        ))}
        <span className="salt-caps ml-2 text-muted" aria-live="polite">
          {colour.name}
        </span>
      </div>
    </article>
  );
}
