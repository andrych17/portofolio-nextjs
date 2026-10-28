import { CheckCircleIcon, ShieldCheckIcon, StethoscopeIcon, PhoneCallIcon, CalendarBlankIcon, ClockIcon, MapPinIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { ClinicBooking } from "@/components/health/clinic/ClinicBooking";
import { ClinicButton } from "@/components/health/clinic/ClinicButton";
import { ClinicContactForm } from "@/components/health/clinic/ClinicContactForm";
import { ClinicDepartments } from "@/components/health/clinic/ClinicDepartments";
import { ClinicDoctors } from "@/components/health/clinic/ClinicDoctors";
import { ClinicMap } from "@/components/health/clinic/ClinicMap";
import { ClinicTestimonials } from "@/components/health/clinic/ClinicTestimonials";
import { ClinicVisit } from "@/components/health/clinic/ClinicVisit";
import { DoctorAvatar } from "@/components/health/clinic/DoctorAvatar";
import { Accordion } from "@/components/Accordion";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { MaskText } from "@/components/motion/MaskText";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { RiseLines } from "@/components/motion/RiseLines";
import { clinic } from "@/content/health/clinic";
import { businessSchema, faqSchema, webPageSchema } from "@/lib/jsonld";
import { templateMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const path = "/health/clinic";
const title = "Your Brand | Family Clinic, Same-Week Appointments";
const description = clinic.description;

export const metadata = templateMetadata({ sector: "health", slug: "clinic", title, description });

const img = (name: string) => `/template/images/health/clinic/${name}.webp`;
const tel = clinic.phone.replace(/\s/g, "");
const mint = "var(--c-mint)";

const specialty: Record<string, string> = {
  general: "PrimaryCare",
  children: "Pediatric",
  womens: "Gynecologic",
  heart: "Cardiovascular",
  skin: "Dermatology",
  movement: "Physiotherapy",
};

const jsonLd = [
  webPageSchema({ path, name: "Your Brand", description, sectorName: "Health & Clinic", sector: "health" }),
  {
    ...businessSchema({
      type: "MedicalClinic",
      path,
      description,
      email: clinic.email,
      phone: clinic.phone,
      street: clinic.street,
      city: clinic.city,
      postalCode: clinic.postalCode,
      countryCode: clinic.countryCode,
      services: clinic.departments.map((d) => d.name),
    }),
    medicalSpecialty: ["PrimaryCare", "Pediatric", "Gynecologic", "Cardiovascular", "Dermatology", "Physiotherapy", "LaboratoryScience"],
    isAcceptingNewPatients: true,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
    ],
    availableService: clinic.departments.map((d) => ({ "@type": "MedicalProcedure", name: d.name, description: d.blurb })),
  },
  ...clinic.doctors
    .filter((d) => specialty[d.dept])
    .map((d) => ({
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": `${absoluteUrl(path)}#${d.id}`,
      name: d.name,
      description: `${d.role}. ${d.bio}`,
      medicalSpecialty: specialty[d.dept],
      knowsLanguage: d.languages,
      worksFor: { "@id": `${absoluteUrl(path)}#organization` },
      url: absoluteUrl(path),
    })),
  faqSchema(clinic.faqs),
];

export default function ClinicPage() {
  const featured = clinic.doctors[1];
  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section id="top" aria-labelledby="hero" className="relative mx-auto max-w-[1400px] px-5 pb-12 pt-10 md:px-10 md:pb-20 md:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="fade-up" style={{ ["--d" as string]: 60 }}>
              <Eyebrow className="bg-white text-fg ring-1 ring-fg/10">
                <span aria-hidden className="size-1.5 animate-blink rounded-full bg-[#2f9e6b]" />
                Open today 08:00 to 20:00
              </Eyebrow>
            </div>
            <RiseLines
              id="hero"
              className="mt-7 font-display text-[clamp(3.9rem,10.4vw,9.6rem)] font-semibold leading-[0.88]"
              lines={["Good care,", "close to", <span key="h" className="text-[var(--c-coral-ink)]">home.</span>]}
            />
            <svg aria-hidden viewBox="0 0 600 70" fill="none" className="clinic-ecg mt-5 w-full max-w-[26rem] text-[var(--c-coral-ink)] md:max-w-[34rem]">
              <path pathLength="1" d="M0 36H170L186 36 202 8 222 62 240 20 254 36H380L396 36 410 4 434 66 450 24 462 36H600" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="fade-up mt-9 flex flex-wrap items-center gap-x-6 gap-y-4" style={{ ["--d" as string]: 620 }}>
              <Magnetic>
                <ClinicButton href="#booking">Book an appointment</ClinicButton>
              </Magnetic>
              <a href={`tel:${tel}`} className="group inline-flex min-h-12 items-center gap-2.5 text-[15px] font-semibold">
                <span className="grid size-10 place-items-center rounded-full bg-white ring-1 ring-fg/12 transition-colors duration-500 group-hover:bg-accent">
                  <PhoneCallIcon size={18} weight="bold" aria-hidden />
                </span>
                {clinic.phone}
              </a>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="clip-in relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden rounded-b-[2.5rem] rounded-t-[999px] lg:max-w-none" style={{ ["--d" as string]: 150 }}>
              <div className="absolute inset-0">
                <Image src={img("hero")} alt="Bright consultation room with a wooden table, white chairs and tall windows" fill priority sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
                <div className="absolute inset-0 bg-[#1b6361]/30 mix-blend-multiply" />
              </div>
            </div>
            <div className="fade-up absolute -left-1 bottom-10 w-[15.5rem] md:-left-10" style={{ ["--d" as string]: 1100 }}>
              <div className="clinic-float rounded-3xl bg-white/95 p-3 shadow-[0_26px_50px_-24px_rgba(14,53,53,0.55)] ring-1 ring-fg/10 backdrop-blur">
                <p className="px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Next free slot</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="size-12 shrink-0 overflow-hidden rounded-2xl" style={{ background: featured.look.bg }}>
                    <DoctorAvatar look={featured.look} className="size-full" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[15px] font-bold">{featured.name}</span>
                    <span className="flex items-center gap-1.5 text-sm text-muted">
                      <CalendarBlankIcon size={14} weight="bold" aria-hidden /> {featured.next}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="fade-up absolute -right-1 top-24 hidden sm:block md:-right-6" style={{ ["--d" as string]: 1300 }}>
              <div className="clinic-float clinic-float-b flex items-center gap-3 rounded-full bg-fg py-2 pl-2 pr-5 text-bg shadow-[0_26px_50px_-24px_rgba(14,53,53,0.7)]">
                <span className="grid size-10 place-items-center rounded-full bg-accent text-fg">
                  <StethoscopeIcon size={20} weight="bold" aria-hidden />
                </span>
                <span className="text-sm font-semibold leading-tight">
                  7 departments
                  <span className="block text-xs font-normal text-bg/65">One record, one front door</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* One-sentence answer + proof */}
      <section aria-label="In one sentence" className="mx-auto max-w-[1400px] px-5 pt-6 md:px-10">
        <p data-speakable className="max-w-5xl font-display text-[clamp(1.5rem,2.7vw,2.5rem)] leading-[1.16] text-fg/85">
          {clinic.answer}
        </p>
      </section>
      <section aria-label="Accreditations" className="mt-14 md:mt-20">
        <p className="mx-auto mb-4 max-w-[1400px] px-5 text-xs font-bold uppercase tracking-[0.16em] text-muted md:px-10">Recognised by (placeholder names)</p>
        <Marquee speed={-1.4} className="border-y border-line bg-white/50 py-5">
          {clinic.accreditations.map((a) => (
            <span key={a} className="flex items-center gap-3 pr-14 font-display text-[1.35rem] font-medium text-fg/70">
              <ShieldCheckIcon size={26} weight="duotone" aria-hidden className="text-[var(--c-teal)]" />
              {a}
            </span>
          ))}
        </Marquee>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-h" className="mx-auto grid max-w-[1400px] gap-14 px-5 py-24 md:grid-cols-12 md:gap-16 md:px-10 md:py-36">
        <div className="relative md:col-span-5">
          <ClipReveal className="aspect-[4/5] rounded-[2.5rem]">
            <Image src={img("atrium")} alt="Bright white atrium with a glass dome and curved balconies" fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover" />
            <div className="absolute inset-0 bg-[#1b6361]/25 mix-blend-multiply" />
          </ClipReveal>
          <div className="absolute -bottom-7 right-3 grid size-28 place-items-center rounded-full bg-accent text-center text-fg shadow-[0_20px_40px_-20px_rgba(14,53,53,0.6)] md:-right-6 md:size-32">
            <span className="font-display text-[1.7rem] font-semibold leading-none">
              14
              <span className="mt-1 block font-sans text-[11px] font-bold uppercase leading-tight tracking-[0.12em]">years open</span>
            </span>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:self-center">
          <Eyebrow className="bg-white text-fg ring-1 ring-fg/10">About the clinic</Eyebrow>
          <MaskText id="about-h" as="h2" className="mt-6 font-display text-[clamp(2.6rem,5.6vw,5.4rem)] font-semibold leading-[0.94]" lines={["A clinic that", <span key="g" className="text-[var(--c-teal)]">gives you time.</span>]} />
          <Reveal>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              We started as two consulting rooms and a shared waiting area. We kept the part that mattered, which is appointment slots long enough to ask the second question. Today the clinic has seven departments, a lab, imaging and an emergency desk, all in one building and all on one patient record.
            </p>
          </Reveal>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {[
              ["Same-week appointments", "Most routine visits can be booked within days, not weeks."],
              ["One record, every department", "Your history follows you from the lab to the specialist."],
              ["Straight talk, your language", "Plain explanations, with interpreters for most major languages."],
            ].map(([t, d], i) => (
              <li key={t}>
                <Reveal delay={i * 0.08} y={20}>
                  <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 py-5">
                    <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-display text-2xl font-medium leading-tight">{t}</p>
                      <p className="mt-1 text-[15px] text-muted">{d}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" aria-labelledby="dept-h" className="mx-2 scroll-mt-20 rounded-[2.5rem] bg-fg py-24 text-bg md:mx-4 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Eyebrow className="bg-white/10 text-bg ring-1 ring-white/15">Departments</Eyebrow>
          <MaskText id="dept-h" as="h2" className="mb-14 mt-6 font-display text-[clamp(2.8rem,6.4vw,6.2rem)] font-semibold leading-[0.92] md:mb-20" lines={["Seven departments.", <span key="o" className="text-accent">One front door.</span>]} />
          <ClinicDepartments />
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" aria-labelledby="doc-h" className="scroll-mt-20 py-24 md:py-36">
        <div className="mx-auto mb-12 grid max-w-[1400px] gap-6 px-5 md:grid-cols-12 md:px-10">
          <div className="md:col-span-7">
            <Eyebrow className="bg-white text-fg ring-1 ring-fg/10">Our doctors</Eyebrow>
            <MaskText id="doc-h" as="h2" className="mt-6 font-display text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.92]" lines={["Meet the people", "you will see."]} />
          </div>
          <p className="max-w-md text-lg leading-relaxed text-muted md:col-span-4 md:col-start-9 md:self-end">
            Profiles are placeholders. Swap in real photos, qualifications and languages, and every Book button still opens the booking tool with that doctor selected.
          </p>
        </div>
        <ClinicDoctors />
      </section>

      {/* Booking */}
      <section id="booking" aria-labelledby="book-h" className="mx-2 scroll-mt-20 rounded-[2.5rem] py-20 md:mx-4 md:py-32" style={{ background: mint }}>
        <div className="mx-auto max-w-[1180px] px-3 md:px-10">
          <div className="mb-10 px-2 md:mb-14 md:px-0">
            <Eyebrow className="bg-white text-fg ring-1 ring-fg/10">Book online</Eyebrow>
            <MaskText id="book-h" as="h2" className="mt-6 font-display text-[clamp(2.6rem,5.6vw,5.2rem)] font-semibold leading-[0.94]" lines={["Pick a time", "that suits you."]} />
          </div>
          <ClinicBooking />
        </div>
      </section>

      {/* Stats */}
      <section aria-label="The clinic in numbers" className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-10">
          {clinic.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} y={24}>
              <div className="border-t border-fg/80 pt-5">
                <dd className="font-display text-[clamp(3.6rem,8.6vw,8.4rem)] font-semibold leading-[0.9]">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-3 max-w-[14rem] text-[15px] leading-snug text-muted">{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Your first visit */}
      <section id="visit" aria-labelledby="visit-h" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 pb-24 md:px-10 md:pb-36">
        <div className="mb-16 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow className="bg-white text-fg ring-1 ring-fg/10">Your first visit</Eyebrow>
            <MaskText id="visit-h" as="h2" className="mt-6 font-display text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.92]" lines={["What to expect,", <span key="s" className="text-[var(--c-teal)]">step by step.</span>]} />
          </div>
        </div>
        <ClinicVisit />
      </section>

      {/* Inside the clinic */}
      <section aria-labelledby="inside-h" className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 md:pb-36">
        <h2 id="inside-h" className="sr-only">Inside the clinic</h2>
        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          <figure className="md:col-span-7">
            <ParallaxImage src={img("garden")} alt="Balcony table by a window with a glass vase of white blossom and green trees outside" sizes="(min-width: 768px) 58vw, 92vw" offset={40} className="aspect-[16/11] rounded-[2rem]" />
            <figcaption className="mt-3 text-sm text-muted">Garden terrace, ground floor</figcaption>
          </figure>
          <figure className="md:col-span-5 md:mt-24">
            <ParallaxImage src={img("quiet")} alt="Grey wooden chair beside a tall window with a pale curtain at dusk" sizes="(min-width: 768px) 40vw, 92vw" offset={40} className="aspect-[4/5] rounded-[2rem]" />
            <figcaption className="mt-3 text-sm text-muted">Quiet room for families</figcaption>
          </figure>
          <figure className="md:col-span-4 md:-mt-10">
            <ParallaxImage src={img("desk")} alt="Pale blue table with a small plant in a glass against a blue wall" sizes="(min-width: 768px) 32vw, 92vw" offset={30} className="aspect-[4/3] rounded-[2rem]" />
            <figcaption className="mt-3 text-sm text-muted">Front desk and check-in</figcaption>
          </figure>
          <figure className="md:col-span-8">
            <ParallaxImage src={img("coast")} alt="Calm turquoise sea beside white cliffs with a small red and white lighthouse" sizes="(min-width: 768px) 64vw, 92vw" offset={40} className="aspect-[16/8] rounded-[2rem]" />
            <figcaption className="mt-3 text-sm text-muted">Recovery lounge with a view</figcaption>
          </figure>
        </div>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="voices-h" className="mx-2 rounded-[2.5rem] bg-[var(--c-coral-soft)] py-24 md:mx-4 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Eyebrow className="bg-white/80 text-fg ring-1 ring-fg/10">Patient notes</Eyebrow>
          <h2 id="voices-h" className="sr-only">What patients say</h2>
          <div className="mt-6">
            <ClinicTestimonials />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-h" className="mx-auto grid max-w-[1400px] scroll-mt-20 gap-12 px-5 py-24 md:grid-cols-12 md:gap-16 md:px-10 md:py-36">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <Eyebrow className="bg-white text-fg ring-1 ring-fg/10">Good to know</Eyebrow>
            <MaskText id="faq-h" as="h2" className="mt-6 font-display text-[clamp(2.6rem,5vw,4.8rem)] font-semibold leading-[0.94]" lines={["Questions,", "answered."]} />
            <p className={`mt-6 max-w-xs text-[15px] leading-relaxed text-muted`}>Cannot find yours? The front desk is happy to help on <a className="font-semibold text-fg underline underline-offset-4" href={`tel:${tel}`}>{clinic.phone}</a>.</p>
          </div>
        </div>
        <div className="md:col-span-8">
          <Accordion
            items={clinic.faqs}
            className="border-t border-fg/15"
            itemClassName="border-b border-fg/15"
            questionClassName="py-6 font-display text-[1.4rem] font-medium leading-tight md:text-[1.65rem] min-h-14"
            answerClassName="max-w-2xl pb-7 text-[17px] leading-relaxed text-muted"
          />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="contact-h" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 pb-28 md:px-10 md:pb-40">
        <div className="mb-12 md:mb-16">
          <Eyebrow className="bg-white text-fg ring-1 ring-fg/10">Contact</Eyebrow>
          <MaskText id="contact-h" as="h2" className="mt-6 font-display text-[clamp(2.8rem,6.4vw,6.2rem)] font-semibold leading-[0.92]" lines={["We are here", <span key="h" className="text-[var(--c-coral-ink)]">when you need us.</span>]} />
        </div>
        <div className="grid gap-6 md:grid-cols-12">
          <div className="space-y-6 md:col-span-7">
            <div className="rounded-[2.2rem] bg-white p-1.5 ring-1 ring-fg/10">
              <div className="rounded-[calc(2.2rem-0.375rem)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] md:p-10">
                <ClinicContactForm />
              </div>
            </div>
            <a href={`tel:${tel}`} className="group flex items-center justify-between gap-4 rounded-[2.2rem] bg-accent p-6 text-fg transition-transform duration-500 ease-studio hover:scale-[1.01] md:p-8">
              <span>
                <span className="block text-xs font-bold uppercase tracking-[0.16em]">Emergency desk, 24 hours</span>
                <span className="mt-2 block font-display text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-none">{clinic.emergencyPhone}</span>
              </span>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-fg text-bg">
                <PhoneCallIcon size={24} weight="bold" aria-hidden />
              </span>
            </a>
          </div>
          <div className="space-y-6 md:col-span-5">
            <div className="overflow-hidden rounded-[2.2rem] bg-white ring-1 ring-fg/10">
              <ClinicMap className="aspect-[16/10] w-full" />
              <div className="space-y-4 p-6 text-[15px]">
                <p className="flex gap-3">
                  <MapPinIcon size={20} weight="bold" aria-hidden className="mt-0.5 shrink-0 text-[var(--c-teal)]" />
                  <span>
                    {clinic.street}, {clinic.postalCode} {clinic.city}, {clinic.country}
                  </span>
                </p>
                <a href={`tel:${tel}`} className="flex gap-3 font-semibold hover:text-[var(--c-coral-ink)]">
                  <PhoneCallIcon size={20} weight="bold" aria-hidden className="mt-0.5 shrink-0 text-[var(--c-teal)]" />
                  {clinic.phone}
                </a>
                <a href={`mailto:${clinic.email}`} className="flex gap-3 hover:text-[var(--c-coral-ink)]">
                  <EnvelopeSimpleIcon size={20} weight="bold" aria-hidden className="mt-0.5 shrink-0 text-[var(--c-teal)]" />
                  {clinic.email}
                </a>
              </div>
            </div>
            <div className="rounded-[2.2rem] bg-fg p-7 text-bg">
              <p className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.16em] text-bg/60">
                <ClockIcon size={16} weight="bold" aria-hidden /> Opening hours
              </p>
              <dl className="mt-5 space-y-3 text-[15px]">
                {clinic.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-6 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <dt className="text-bg/70">{h.day}</dt>
                    <dd className="text-right font-semibold">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 flex items-start gap-2.5 rounded-2xl bg-accent p-4 text-sm font-semibold text-fg">
                <CheckCircleIcon size={20} weight="fill" aria-hidden className="mt-px shrink-0" />
                Walk-ins with minor concerns are welcome during opening hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
