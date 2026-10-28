import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { MaskText } from "@/components/motion/MaskText";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { estate } from "@/content/property/estate";

export function EstateAbout() {
  const { about } = estate;
  return (
    <section id="about" aria-labelledby="about-h" className="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7 md:pr-10">
          <Eyebrow className="bg-[#0f2a20]/[0.06] text-fg ring-1 ring-fg/10">The developer</Eyebrow>
          <MaskText
            as="h2"
            id="about-h"
            className="mt-6 font-display text-[clamp(2.8rem,5.6vw,5.6rem)] leading-[0.95]"
            lines={["A small developer,", <em key="e" className="text-[#8a6a28]">by choice.</em>]}
          />
          <ScrollWords text={about.manifesto} className="mt-10 font-display text-[clamp(1.5rem,2.3vw,2.2rem)] leading-[1.25]" />
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-6">
            {about.facts.map((f) => (
              <div key={f.k}>
                <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted">{f.k}</dt>
                <dd className="mt-2 font-display text-2xl md:text-3xl">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative md:col-span-5">
          <ClipReveal className="aspect-[4/5] rounded-[2rem]">
            <Image src={about.imageA.src} alt={about.imageA.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
          </ClipReveal>
          <div className="absolute -bottom-10 -left-4 w-[46%] md:-left-14">
            <ClipReveal direction="left" delay={0.25} className="aspect-square rounded-[1.5rem] ring-[10px] ring-[#f6f2ea]">
              <Image src={about.imageB.src} alt={about.imageB.alt} fill sizes="260px" className="object-cover" />
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
