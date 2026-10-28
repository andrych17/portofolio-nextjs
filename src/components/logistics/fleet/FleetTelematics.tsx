import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { fleet } from "@/content/logistics/fleet";

export function FleetTelematics() {
  return (
    <section id="telematics" aria-labelledby="telematics-heading" className="bg-surface/50 py-20 md:py-32">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Direct Telemetry</Eyebrow>
            <h2 id="telematics-heading" className="mt-4 font-display text-[clamp(2.4rem,4.5vw,4.2rem)] font-semibold leading-[1.08] text-fg">
              Zero brokers. Absolute visibility from dock to dock.
            </h2>
            <p className="mt-6 text-[1.15rem] leading-relaxed text-muted">
              {fleet.manifesto}
            </p>

            <div className="mt-8 space-y-4 text-sm text-muted">
              <p>
                Our proprietary onboard telemetry feeds raw GPS coordinates, reefer thermographs, engine diagnostic codes, and digital e-seal statuses directly into your enterprise ERP via REST webhooks.
              </p>
              <p>
                When extreme weather or highway congestion threatens delivery windows, our 24/7 central dispatch automatically reroutes power units to preserve your arrival SLA.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-2">
              {fleet.stats.map((s) => (
                <div key={s.label} className="border-t border-line pt-4">
                  <p className="font-display text-4xl font-semibold text-accent md:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-6">
            <ClipReveal className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-bg shadow-md ring-1 ring-line">
              <Image
                src="/template/images/logistics/fleet/aerial.webp"
                alt="Aerial bird-eye view of highway interchange and industrial fleet freight corridors"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Interstate Corridors</span>
                <p className="font-display text-lg font-medium">8,000+ Active Lanes</p>
              </div>
            </ClipReveal>

            <ClipReveal delay={0.15} className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-bg shadow-md ring-1 ring-line sm:mt-12">
              <Image
                src="/template/images/logistics/fleet/trails.webp"
                alt="Long exposure highway light trails depicting non-stop night freight movement"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
                <span className="text-xs uppercase tracking-wider opacity-80">Continuous Transit</span>
                <p className="font-display text-lg font-medium">Non-Stop Night Teams</p>
              </div>
            </ClipReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
