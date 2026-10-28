import Image from "next/image";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText } from "@/components/motion/MaskText";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { Tilt } from "@/components/motion/Tilt";
import { fleet } from "@/content/logistics/fleet";

export function FleetHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-28">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <Eyebrow>Motor Carrier Fleet · Direct Satellite Dispatch</Eyebrow>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent ring-1 ring-accent/20">
                Asset-Owned Equipment
              </span>
            </div>

            <MaskText
              as="h1"
              lines={["Autonomous dispatch", "across eight thousand", <span key="3" className="text-accent">highway lanes.</span>]}
              className="mt-6 font-display text-[clamp(2.8rem,6vw,5.4rem)] font-semibold leading-[1.02] tracking-tight text-fg"
            />

            <p
              data-speakable
              className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-muted md:text-[1.2rem]"
            >
              {fleet.answer}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic strength={0.22}>
                <a
                  href="#quote"
                  className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-6 py-2 text-sm font-semibold text-accent-fg shadow-sm transition-transform duration-300 ease-studio hover:scale-[1.02]"
                >
                  <span>Request Spot Rate</span>
                  <ArrowIsland size={14} className="bg-white/20 text-white" />
                </a>
              </Magnetic>
              <Magnetic strength={0.18}>
                <a
                  href="#capabilities"
                  className="inline-flex min-h-12 items-center rounded-full bg-surface px-6 py-2 text-sm font-semibold text-fg ring-1 ring-line transition-colors hover:bg-bg"
                >
                  Stacking Equipment Specs
                </a>
              </Magnetic>
            </div>

            <div className="mt-10 rounded-3xl bg-surface p-5 ring-1 ring-line">
              <ScrollWords
                className="font-display text-lg font-medium leading-relaxed text-fg md:text-xl"
                text="Zero freight brokers. Every tractor, dual-zone pharmaceutical reefer, and W2 driver team is owned and satellite-monitored in-house."
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <Tilt max={7} className="mx-auto max-w-[500px] rounded-[2.5rem] bg-surface p-2.5 shadow-xl ring-1 ring-line lg:max-w-none">
              <ClipReveal direction="bottom" immediate className="aspect-[4/5] w-full rounded-[2rem]">
                <Image
                  src={fleet.heroImage}
                  alt={fleet.heroAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </ClipReveal>

              <div className="mt-3 flex items-center justify-between rounded-2xl bg-bg p-4 ring-1 ring-line">
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted">GPS Telemetry · Unit 408</span>
                  <p className="font-display text-lg font-semibold text-fg">I-80 Corridor Transit</p>
                </div>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
                  -18.2°C Stabilized
                </span>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
