import Image from "next/image";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { maison } from "@/content/fashion/maison";
import { MaisonButton } from "./MaisonButton";

/** Pinned horizontal run of the six pieces. Vertical scroll drives the track, so touch swipes work as usual. */
export function MaisonCollection() {
  return (
    <section id="collection" aria-labelledby="collection-title">
      <HorizontalScroll trackClassName="items-center gap-7 px-5 md:gap-14 md:px-10">
        <div className="w-[82vw] shrink-0 md:w-[34vw]">
          <p className="maison-caps text-muted">(02) Collection 07</p>
          <h2 id="collection-title" className="mt-5 font-display text-[clamp(3.2rem,6.4vw,7rem)] font-light leading-[0.9] tracking-[-0.02em]">
            Six pieces for the <em className="text-accent">long season.</em>
          </h2>
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-fg/70">
            Each piece is cut once a year and numbered. When the fifty are sold, the pattern is retired.
          </p>
          <p className="maison-caps mt-10 flex items-center gap-4 text-muted">
            <span className="block h-px w-14 bg-accent" />
            Keep scrolling
          </p>
        </div>

        {maison.collection.map((piece, i) => (
          <article key={piece.n} className={`group w-[68vw] shrink-0 md:w-[25vw] md:max-w-[460px] ${i % 2 ? "md:mt-28" : "md:-mt-10"}`}>
            <div className="flex items-baseline justify-between">
              <p className="maison-caps text-muted">Collection {piece.n}</p>
              <span aria-hidden className="font-display text-5xl font-light italic leading-none text-accent">
                {piece.n}
              </span>
            </div>
            <ClipReveal className="mt-4 aspect-[3/4] bg-surface">
              <Image
                src={piece.image}
                alt={piece.alt}
                fill
                sizes="(min-width: 768px) 26vw, 70vw"
                className="object-cover transition-transform duration-[1800ms] ease-studio group-hover:scale-[1.05]"
              />
            </ClipReveal>
            <h3 className="mt-5 font-display text-[2rem] font-light leading-none md:text-[2.4rem]">{piece.name}</h3>
            <p className="maison-caps mt-2 text-muted">{piece.kind}</p>
            <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-fg/70">{piece.note}</p>
          </article>
        ))}

        <div className="flex w-[70vw] shrink-0 flex-col items-start gap-6 pr-10 md:w-[26vw]">
          <p className="font-display text-[clamp(2.4rem,4vw,4.2rem)] font-light italic leading-[1]">Try them on, in private.</p>
          <MaisonButton href="#appointments">Book a fitting</MaisonButton>
        </div>
      </HorizontalScroll>
    </section>
  );
}
