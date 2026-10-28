import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { dental } from "@/content/health/dental";

export function DentalCalm() {
  return (
    <section id="calm" aria-labelledby="calm-heading" className="py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Anxiety-Free Space</Eyebrow>
            <h2 id="calm-heading" className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4.2rem)] font-semibold leading-[1.08] text-fg">
              A studio designed to calm the nervous system.
            </h2>
            <p className="mt-6 text-[1.15rem] leading-relaxed text-muted">
              We eliminated the sights, scents, and sounds that trigger dental dread. Our clinical suites operate in acoustic silence with personalized comfort amenities.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {dental.calmFeatures.map((feat) => (
                <div key={feat.title} className="rounded-2xl bg-surface p-5 ring-1 ring-line">
                  <h3 className="font-display text-lg font-semibold text-fg">{feat.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
            <ClipReveal className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-bg shadow-md ring-1 ring-line">
              <Image
                src="/template/images/health/dental/studio.webp"
                alt="Acoustic sensory-calm dental suite with clean modern lines and natural daylight"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Private Suite</span>
                <p className="font-display text-lg font-medium">Bespoke Treatment Room</p>
              </div>
            </ClipReveal>

            <ClipReveal delay={0.15} className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-bg shadow-md ring-1 ring-line sm:mt-12">
              <Image
                src="/template/images/health/dental/bay.webp"
                alt="Sunlit minimalist consultation room with panoramic bay views"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Consultation Bay</span>
                <p className="font-display text-lg font-medium">Unhurried Care Review</p>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
