import { Reveal } from "@/components/motion/Reveal";
import { street } from "@/content/fashion/street";

const LOOKS = [
  { tone: "bg-accent text-accent-fg", tilt: "-rotate-3", lift: "" },
  { tone: "bg-[var(--s-paper)] text-accent-fg", tilt: "rotate-2", lift: "md:mt-16" },
  { tone: "bg-surface text-fg ring-1 ring-fg/20", tilt: "-rotate-1", lift: "md:mt-6" },
];

/** Buyer notes as tilted stickers that straighten on hover. */
export function StreetNotes() {
  return (
    <section aria-labelledby="notes-title" className="mx-auto max-w-[1700px] overflow-x-clip px-5 pb-24 md:px-10 md:pb-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="street-tag text-accent">(05) From the boxes</p>
          <h2 id="notes-title" className="mt-5 font-display text-[clamp(2.6rem,7vw,7rem)]">
            Said <span className="text-fg/35">out loud.</span>
          </h2>
        </div>
      </div>
      <ul className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
        {street.notes.map((n, i) => {
          const look = LOOKS[i % LOOKS.length];
          return (
            <li key={n.name} className={look.lift}>
              <Reveal y={40} delay={i * 0.08} amount={0.2}>
                <figure className={`street-sticker p-7 shadow-[0_26px_44px_-28px_rgb(0_0_0/0.9)] md:p-9 ${look.tone} ${look.tilt}`}>
                  <blockquote className="text-[1.3rem] font-bold leading-[1.25] md:text-[1.5rem]">&ldquo;{n.quote}&rdquo;</blockquote>
                  <figcaption className="street-tag mt-8">
                    {n.name} · {n.role}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
