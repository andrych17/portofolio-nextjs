import Image from "next/image";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { MaskText } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { maison } from "@/content/fashion/maison";

export function MaisonLookbook() {
  const [one, two] = maison.lookbook.looks;
  return (
    <section id="lookbook" aria-labelledby="lookbook-title" className="py-24 md:py-40">
      <div className="mx-auto max-w-[1700px] px-5 md:px-10">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <p className="maison-caps text-muted md:col-span-3">(04) Lookbook</p>
          <MaskText
            as="h2"
            id="lookbook-title"
            className="font-display text-[clamp(3rem,7.2vw,8rem)] font-light leading-[0.9] tracking-[-0.02em] md:col-span-9"
            lines={["Autumn Winter,", <em key="e" className="text-accent">as it is worn.</em>]}
          />
        </div>

        <ClipReveal className="mt-14 aspect-[4/3] bg-fg md:mt-20 md:aspect-[21/9]">
          <ParallaxImage
            src={maison.lookbook.wide}
            alt={maison.lookbook.wideAlt}
            sizes="(min-width: 1700px) 1620px, 96vw"
            offset={70}
            className="h-full w-full"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <p className="maison-caps absolute bottom-5 left-5 text-[#f3eee6] md:bottom-8 md:left-8">The cloister, first fitting of the season</p>
        </ClipReveal>

        <div className="mt-16 grid gap-14 md:mt-28 md:grid-cols-12 md:gap-6">
          <figure className="md:col-span-5 md:col-start-2">
            <ClipReveal direction="left" className="aspect-[3/4] bg-surface">
              <Image src={one.image} alt={one.alt} fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover" />
            </ClipReveal>
            <Reveal y={20}>
              <figcaption className="mt-5 flex items-baseline justify-between gap-4">
                <span className="maison-caps text-accent">{one.n}</span>
                <span className="font-display text-xl italic">{one.caption}</span>
              </figcaption>
            </Reveal>
          </figure>
          <figure className="md:col-span-4 md:col-start-8 md:mt-48">
            <ClipReveal direction="top" delay={0.15} className="aspect-[3/4] bg-surface">
              <Image src={two.image} alt={two.alt} fill sizes="(min-width: 768px) 33vw, 92vw" className="object-cover" />
            </ClipReveal>
            <Reveal y={20}>
              <figcaption className="mt-5 flex items-baseline justify-between gap-4">
                <span className="maison-caps text-accent">{two.n}</span>
                <span className="font-display text-xl italic">{two.caption}</span>
              </figcaption>
            </Reveal>
          </figure>
        </div>
      </div>
    </section>
  );
}
