import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { serene } from "@/content/health/serene";

export function SereneTeam() {
  return (
    <section id="team" aria-labelledby="team-heading" className="bg-surface/50 py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Clinical Guidance</Eyebrow>
            <h2 id="team-heading" className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4.2rem)] font-semibold leading-[1.08] text-fg">
              Physicians translating longevity science into practice.
            </h2>
            <p className="mt-6 text-[1.15rem] leading-relaxed text-muted">
              {serene.manifesto}
            </p>

            <div className="mt-10 space-y-6">
              {serene.team.map((member) => (
                <div key={member.name} className="rounded-2xl bg-bg p-6 shadow-sm ring-1 ring-line">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-semibold text-fg">{member.name}</h3>
                    <span className="text-xs font-semibold text-accent">{member.role}</span>
                  </div>
                  <p className="mt-1 text-xs italic text-muted">{member.creds}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{member.blurb}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-2">
              {serene.stats.map((s) => (
                <div key={s.label} className="border-t border-line pt-4">
                  <p className="font-display text-4xl font-semibold text-accent md:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-6">
            <ClipReveal className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-bg shadow-xl ring-1 ring-line">
              <Image
                src="/template/images/health/serene/retreat.webp"
                alt="Quiet nature sanctuary exterior surrounded by lush trees and natural mist"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Mountain Ridge Sanctuary</span>
                <p className="font-display text-xl font-medium">Biological Restoration Suites</p>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
