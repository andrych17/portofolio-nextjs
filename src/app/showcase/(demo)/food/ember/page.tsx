import { FlameIcon, MapPinIcon, PhoneIcon, QuotesIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { Accordion } from "@/components/Accordion";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { EmberButton } from "@/components/food/ember/EmberButton";
import { EmberWords } from "@/components/food/ember/EmberWords";
import { EmberGallery } from "@/components/food/ember/EmberGallery";
import { EmberMenu } from "@/components/food/ember/EmberMenu";
import { EmberProcess } from "@/components/food/ember/EmberProcess";
import { EmberReserve } from "@/components/food/ember/EmberReserve";
import { EmberTimeline } from "@/components/food/ember/EmberTimeline";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { RiseLines } from "@/components/motion/RiseLines";
import { ember, menuSchema, restaurantExtras } from "@/content/food/ember";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";

export const metadata = templateMetadata({ sector: "food", slug: "ember", title: ember.title, description: ember.description });

const sparks = [
  { x: "58%", s: "3px", dur: "9s", delay: "0s", drift: "30px" },
  { x: "66%", s: "2px", dur: "11s", delay: "2.2s", drift: "-24px" },
  { x: "74%", s: "4px", dur: "8s", delay: "4.1s", drift: "18px" },
  { x: "82%", s: "2px", dur: "12s", delay: "1.1s", drift: "-34px" },
  { x: "90%", s: "3px", dur: "10s", delay: "5.6s", drift: "22px" },
  { x: "48%", s: "2px", dur: "13s", delay: "3.3s", drift: "-16px" },
  { x: "70%", s: "3px", dur: "9.5s", delay: "6.8s", drift: "40px" },
  { x: "36%", s: "2px", dur: "12s", delay: "7.9s", drift: "26px" },
];

export default function EmberPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            ...businessSchema({
              type: "Restaurant",
              path: ember.path,
              description: ember.description,
              email: ember.email,
              phone: ember.phone,
              street: ember.street,
              city: ember.city,
              postalCode: ember.postalCode,
              countryCode: ember.countryCode,
              services: ["Dry-aged steak", "Wood-fired cooking", "Tasting menu", "Wine pairing"],
            }),
            ...restaurantExtras(),
          },
          menuSchema(),
          webPageSchema({ path: ember.path, name: ember.title, description: ember.description, sectorName: "Food & Beverage", sector: "food" }),
          faqSchema(ember.faqs),
        ]}
      />

      {/* Hero */}
      <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="ember-glow absolute -right-[18%] top-[6%] size-[110vw] max-h-[1200px] max-w-[1200px] rounded-full md:-right-[8%] md:size-[70vw]" />
          <div className="ember-glow-b absolute -left-[25%] bottom-[-10%] size-[80vw] max-h-[900px] max-w-[900px] rounded-full" />
          {sparks.map((spark, i) => (
            <span
              key={i}
              className="ember-spark"
              style={{ ["--x" as string]: spark.x, ["--s" as string]: spark.s, ["--dur" as string]: spark.dur, ["--delay" as string]: spark.delay, ["--drift" as string]: spark.drift }}
            />
          ))}
        </div>

        <div className="mx-auto grid max-w-[1500px] items-end gap-12 px-5 pb-16 pt-28 md:px-10 md:pt-32 lg:min-h-svh lg:grid-cols-12 lg:gap-6 lg:pb-20">
          <div className="relative z-10 lg:col-span-8 lg:pb-6">
            <div className="fade-up" style={{ ["--d" as string]: 60 }}>
              <Eyebrow className="bg-accent/12 text-accent ring-1 ring-accent/35">
                <FlameIcon size={12} weight="fill" aria-hidden />
                Open flame kitchen · Oakhaven
              </Eyebrow>
            </div>
            <RiseLines
              id="hero-title"
              className="mt-7 font-display text-[clamp(4.1rem,11vw,11.5rem)] leading-[0.86]"
              lines={[
                "Fire, ",
                <span key="b" className="lg:pl-[10vw]">
                  salt, and{" "}
                </span>,
                <em key="c" className="text-accent">
                  patience.
                </em>,
              ]}
            />
            <div className="fade-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ ["--d" as string]: 650 }}>
              <Magnetic>
                <EmberButton href="#visit">Reserve a table</EmberButton>
              </Magnetic>
              <a href="#menu" className="group inline-flex min-h-11 items-center gap-3 text-sm font-medium uppercase tracking-[0.18em]">
                <span className="h-px w-10 bg-accent transition-[transform] duration-700 ease-studio group-hover:scale-x-150 origin-left" />
                See the menu
              </a>
            </div>
          </div>

          <div className="fade-up relative mx-auto w-full max-w-sm md:max-w-md lg:col-span-4 lg:mx-0 lg:max-w-none" style={{ ["--d" as string]: 300 }}>
            <div className="rounded-t-[999px] rounded-b-[2rem] p-2 ring-1 ring-accent/30">
              <div className="clip-in relative aspect-[3/4.1] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem]" style={{ ["--d" as string]: 350 }}>
                <div className="ember-tint absolute inset-0">
                  <Image
                    src={ember.heroImage}
                    alt="A dark wooden prep table with a mortar, spices and a cutting board, lit warm"
                    fill
                    priority
                    sizes="(max-width: 768px) 80vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -left-3 bottom-10 size-28 md:-left-10 md:size-32">
              <svg viewBox="0 0 120 120" aria-hidden className="size-full animate-spin-slow text-accent">
                <defs>
                  <path id="ember-seal" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
                </defs>
                <circle cx="60" cy="60" r="58" fill="var(--t-bg)" stroke="currentColor" strokeOpacity="0.5" />
                <text fontSize="8" fontWeight="600" fill="currentColor" letterSpacing="1.6">
                  <textPath href="#ember-seal" textLength="278" lengthAdjust="spacing">
                    WOOD-FIRED · DRY-AGED · SINCE 2016 ·
                  </textPath>
                </text>
              </svg>
              <FlameIcon aria-hidden weight="fill" className="absolute inset-0 m-auto size-9 text-accent" />
            </div>
          </div>
        </div>
      </section>

      {/* Answer sentence and proof strip */}
      <section aria-label="About in one line" className="border-y border-line">
        <div className="mx-auto max-w-[1500px] px-5 py-14 md:px-10 md:py-20">
          <p data-speakable className="max-w-4xl font-display text-[clamp(1.7rem,3.4vw,3.2rem)] leading-[1.12] text-fg/90">
            {ember.answer}
          </p>
        </div>
        <Marquee speed={-1.2} className="border-t border-line py-6">
          {ember.proof.map((item) => (
            <span key={item} className="flex items-center gap-8 pr-8 font-display text-3xl italic text-fg/70 md:text-5xl">
              {item}
              <FlameIcon weight="fill" aria-hidden className="size-[0.7em] shrink-0 text-accent" />
            </span>
          ))}
        </Marquee>
      </section>

      {/* Story */}
      <section id="story" aria-labelledby="story-title" className="scroll-mt-16 py-24 md:py-36">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <Eyebrow className="bg-fg/[0.06] text-fg/80 ring-1 ring-fg/10">Our story</Eyebrow>
            </div>
            <div className="md:col-span-9">
              <h2 id="story-title" className="sr-only">
                Our story
              </h2>
              <EmberWords text={ember.manifesto} className="font-display text-[clamp(2rem,4.4vw,4.4rem)] leading-[1.06]" />
            </div>
          </div>

          <div className="mt-20 grid items-end gap-12 md:mt-28 md:grid-cols-12">
            <ClipReveal className="aspect-[4/5] w-full rounded-t-[999px] rounded-b-[1.5rem] md:col-span-5">
              <div className="ember-tint absolute inset-0">
                <Image
                  src={ember.fireImage}
                  alt="Flames glowing in the dark behind a silhouetted figure standing at the hearth"
                  fill
                  sizes="(max-width: 768px) 92vw, 40vw"
                  className="object-cover"
                />
              </div>
            </ClipReveal>
            <div className="md:col-span-6 md:col-start-7 md:pb-6">
              <dl className="divide-y divide-line border-y border-line">
                {[
                  ["The hearth", "A single oak-and-cherry fire, lit at noon, raked into coals by half past five."],
                  ["The cellar", "Four hundred labels, most of them from growers who farm without shortcuts."],
                  ["The pace", "Nobody turns your table. Book at seven and the table is yours until you ask for the bill."],
                ].map(([term, text]) => (
                  <Reveal key={term} y={20} className="grid gap-2 py-6 md:grid-cols-[9rem_1fr] md:gap-8">
                    <dt className="font-display text-2xl italic text-accent">{term}</dt>
                    <dd className="text-fg/75">{text}</dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" aria-labelledby="menu-title" className="scroll-mt-16 bg-surface py-24 md:py-36">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow className="bg-accent/12 text-accent ring-1 ring-accent/35">The menu</Eyebrow>
              <MaskText
                id="menu-title"
                as="h2"
                className="mt-6 font-display text-[clamp(3rem,8vw,8rem)] leading-[0.9]"
                lines={["Cooked over ", <em key="e" className="text-accent">real fire.</em>]}
              />
            </div>
            <p className="max-w-sm text-fg/70 md:col-span-3 md:col-start-10">
              The menu follows the market and the weather, so a dish can vanish for a month. Prices in US dollars.
            </p>
          </div>
          <EmberMenu sections={ember.sections} />
          <p className="mt-14 max-w-xl text-sm text-muted">
            V marks vegetarian dishes and GF gluten-free ones. Tell us about any allergy when you book and the kitchen will work around it.
          </p>
        </div>
      </section>

      {/* Tasting menu */}
      <section id="tasting" aria-labelledby="tasting-title" className="scroll-mt-16 py-24 md:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:grid-cols-12 md:gap-10 md:px-10">
          <div className="self-start md:sticky md:top-28 md:col-span-5">
            <Eyebrow className="bg-fg/[0.06] text-fg/80 ring-1 ring-fg/10">Tasting menu</Eyebrow>
            <MaskText
              id="tasting-title"
              as="h2"
              className="mt-6 font-display text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.92]"
              lines={["The long ", <em key="e" className="text-accent">table.</em>]}
            />
            <p className="mt-6 max-w-md text-fg/70">{ember.tasting.intro}</p>
            <div className="mt-10 flex max-w-md items-stretch gap-1.5 rounded-[1.5rem] p-1.5 ring-1 ring-fg/12">
              <div className="flex-1 rounded-[1.1rem] bg-surface p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.07)]">
                <p className="font-display text-5xl leading-none">${ember.tasting.price}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">per guest</p>
              </div>
              <div className="flex-1 rounded-[1.1rem] bg-surface p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.07)]">
                <p className="font-display text-5xl leading-none text-accent">+${ember.tasting.pairing}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">wine pairing</p>
              </div>
            </div>
            <div className="mt-8">
              <EmberButton href="#visit" variant="ghost">
                Book the long table
              </EmberButton>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <EmberTimeline courses={ember.tasting.courses} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="inside-title" className="pb-8 md:pb-0">
        <div className="mx-auto max-w-[1500px] px-5 pb-12 md:px-10 md:pb-4">
          <Eyebrow className="bg-fg/[0.06] text-fg/80 ring-1 ring-fg/10">Inside</Eyebrow>
          <MaskText
            id="inside-title"
            as="h2"
            className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.9]"
            lines={["Low light, ", <em key="e" className="text-accent">warm stone.</em>]}
          />
        </div>
        <EmberGallery frames={ember.gallery} />
      </section>

      {/* Stats */}
      <section aria-label="In numbers" className="py-24 md:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-px px-5 md:grid-cols-4 md:px-10">
          {ember.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} y={30} className={`border-t border-fg/25 pb-4 pr-6 pt-6 ${i % 2 ? "md:mt-14" : ""}`}>
              <Counter value={stat.value} className="font-display text-[clamp(4.5rem,9vw,8.5rem)] leading-none text-accent" />
              <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-fg/70">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="pb-24 md:pb-36">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <div className="mb-14 grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <Eyebrow className="bg-fg/[0.06] text-fg/80 ring-1 ring-fg/10">From pasture to plate</Eyebrow>
              <MaskText
                id="process-title"
                as="h2"
                className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.9]"
                lines={["Slow on ", <em key="e" className="text-accent">purpose.</em>]}
              />
            </div>
          </div>
          <EmberProcess steps={ember.process} />
        </div>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="voices-title" className="border-t border-line py-24 md:py-36">
        <div className="mx-auto max-w-[1500px] px-5 md:px-10">
          <Eyebrow className="bg-fg/[0.06] text-fg/80 ring-1 ring-fg/10">Guests</Eyebrow>
          <h2 id="voices-title" className="sr-only">
            What guests say
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-12 md:gap-8">
            <Reveal className="rounded-[2rem] bg-surface p-8 ring-1 ring-fg/10 md:col-span-7 md:p-14">
              <QuotesIcon size={44} weight="fill" aria-hidden className="text-accent" />
              <blockquote className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3.1rem)] italic leading-[1.1]">{ember.testimonials[0].quote}</blockquote>
              <p className="mt-8 text-sm">
                <span className="font-semibold">{ember.testimonials[0].name}</span>
                <span className="text-muted"> · {ember.testimonials[0].role}</span>
              </p>
            </Reveal>
            <div className="grid gap-6 md:col-span-5 md:pt-16">
              {ember.testimonials.slice(1).map((t, i) => (
                <Reveal key={t.name} delay={0.1 + i * 0.1} className="rounded-[1.5rem] p-7 ring-1 ring-fg/15">
                  <blockquote className="font-display text-2xl leading-[1.2]">{t.quote}</blockquote>
                  <p className="mt-5 text-sm">
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-muted"> · {t.role}</span>
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 border-t border-line py-24 md:py-36">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <Eyebrow className="bg-fg/[0.06] text-fg/80 ring-1 ring-fg/10">Good to know</Eyebrow>
            <MaskText
              id="faq-title"
              as="h2"
              className="mt-6 font-display text-[clamp(2.8rem,5vw,5rem)] leading-[0.95]"
              lines={["Before you ", <em key="e" className="text-accent">come in.</em>]}
            />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Accordion
              items={ember.faqs}
              itemClassName="border-b border-line"
              questionClassName="py-6 font-display text-[1.6rem] leading-tight md:text-[1.9rem]"
              answerClassName="max-w-xl pb-7 text-[15px] leading-relaxed text-fg/70"
              iconClassName="text-accent"
            />
          </div>
        </div>
      </section>

      {/* Reservation */}
      <section id="visit" aria-labelledby="visit-title" className="relative scroll-mt-16 overflow-hidden bg-surface py-24 md:py-36">
        <div aria-hidden className="ember-glow-b pointer-events-none absolute -bottom-[30%] -left-[20%] size-[70vw] max-w-[900px] rounded-full" />
        <div className="relative mx-auto grid max-w-[1500px] gap-14 px-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <Eyebrow className="bg-accent/12 text-accent ring-1 ring-accent/35">Reservations</Eyebrow>
            <MaskText
              id="visit-title"
              as="h2"
              className="mt-6 font-display text-[clamp(3rem,6vw,6rem)] leading-[0.92]"
              lines={["Save us ", <em key="e" className="text-accent">a seat.</em>]}
            />
            <p className="mt-6 max-w-md text-fg/70">
              Tables are held for fifteen minutes. For groups over twelve, or to book the private table, write to us and we will reply within a working day.
            </p>
            <dl className="mt-10 max-w-md divide-y divide-line border-y border-line text-[15px]">
              {ember.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 py-3.5">
                  <dt className="text-fg/70">{h.days}</dt>
                  <dd className="font-medium tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>
            <address className="mt-8 space-y-3 not-italic text-fg/80">
              <p className="flex items-start gap-3">
                <MapPinIcon size={20} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                {ember.street}, {ember.city} {ember.postalCode}
              </p>
              <p className="flex items-center gap-3">
                <PhoneIcon size={20} aria-hidden className="shrink-0 text-accent" />
                <a href={`tel:${ember.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center hover:text-accent">
                  {ember.phone}
                </a>
              </p>
            </address>
          </div>
          <div className="md:col-span-7">
            <EmberReserve slots={ember.slots} />
          </div>
        </div>
      </section>
    </>
  );
}
