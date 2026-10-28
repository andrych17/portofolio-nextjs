import Image from "next/image";
import { StackCards } from "@/components/motion/StackCards";
import { street } from "@/content/fashion/street";

/** Three past drops that pin on top of each other while earlier ones shrink back. */
export function StreetArchive() {
  return (
    <section id="archive" aria-labelledby="archive-title" className="relative bg-[var(--s-paper)] text-accent-fg">
      <div className="mx-auto max-w-[1700px] px-5 pb-24 pt-24 md:px-10 md:pb-36 md:pt-36">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="street-tag md:col-span-3">(02) Archive</p>
          <h2 id="archive-title" className="font-display text-[clamp(2.8rem,8vw,8rem)] md:col-span-9">
            Gone, and <span className="text-accent-fg/35">not coming back.</span>
          </h2>
        </div>

        <StackCards className="mt-14 md:mt-24" top={84} step={16} minScale={0.9} gapClassName="mb-[14vh]">
          {street.archive.map((drop) => (
            <article key={drop.n} className="grid overflow-hidden bg-bg text-fg shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] md:grid-cols-12">
              <div className="relative aspect-[16/10] md:col-span-5 md:aspect-auto md:min-h-[30rem]">
                <Image src={drop.image} alt={drop.alt} fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover" />
                <span className="street-tag absolute left-3 top-3 bg-accent px-2.5 py-1.5 text-accent-fg">{drop.pieces} pieces</span>
              </div>
              <div className="flex flex-col justify-between gap-6 p-6 md:col-span-7 md:p-12">
                <div className="flex items-start justify-between gap-4">
                  <p className="street-tag text-muted">
                    Drop {drop.n} · {drop.date}
                  </p>
                  <p className="street-tag text-accent">{drop.soldOut}</p>
                </div>
                <div>
                  <h3 className="font-display text-[clamp(3rem,8.5vw,8.5rem)] leading-[0.9]">{drop.name}</h3>
                  <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-fg/75">{drop.body}</p>
                </div>
              </div>
            </article>
          ))}
        </StackCards>
      </div>
    </section>
  );
}
