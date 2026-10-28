import Image from "next/image";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { foundry } from "@/content/property/foundry";
import { FoundryButton } from "./FoundryButton";

/** Pinned horizontal run of six jobs. Vertical scroll drives the track, so touch swipes work as usual. */
export function FoundryProjects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="foundry-grid-dark scroll-mt-16 bg-[var(--f-char)] text-bg">
      <HorizontalScroll trackClassName="items-center gap-6 px-5 md:gap-12 md:px-10">
        <div className="w-[84vw] shrink-0 md:w-[34vw]">
          <p className="inline-block bg-accent px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent-fg">Selected work · 2009 to 2025</p>
          <h2 id="projects-title" className="mt-6 font-display text-[clamp(4rem,8vw,8.4rem)] leading-[0.82]">
            Six jobs, <span className="text-accent">handed back on schedule.</span>
          </h2>
          <p className="mt-7 max-w-xs text-[15.5px] leading-relaxed text-white/70">Every figure below is the contract value and the floor area we actually built. Placeholder projects, real proportions.</p>
          <p className="mt-10 flex items-center gap-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-white/55">
            <span aria-hidden className="foundry-hazard block h-2 w-14" />
            Keep scrolling
          </p>
        </div>

        {foundry.projects.map((p, i) => (
          <article key={p.name} className={`group w-[80vw] shrink-0 md:w-[30vw] md:max-w-[520px] ${i % 2 ? "md:mt-24" : "md:-mt-10"}`}>
            <div className="flex items-end justify-between">
              <p className="font-display text-[4.4rem] leading-[0.8] text-accent md:text-[5.6rem]">{p.year}</p>
              <p className="pb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">{p.type}</p>
            </div>
            <ClipReveal className="mt-4 aspect-[4/3] bg-black">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 30vw, 82vw"
                className="object-cover grayscale-[0.4] transition-[transform,filter] duration-[1600ms] ease-studio group-hover:scale-[1.05] group-hover:grayscale-0"
              />
            </ClipReveal>
            <h3 className="mt-5 font-display text-[2.4rem] leading-[0.92] md:text-[2.9rem]">{p.name}</h3>
            <dl className="mt-3 flex gap-8 border-y border-white/20 py-3 font-mono text-[11.5px] uppercase tracking-[0.12em]">
              <div>
                <dt className="text-white/45">Size</dt>
                <dd className="mt-1 text-bg">{p.size}</dd>
              </div>
              <div>
                <dt className="text-white/45">Value</dt>
                <dd className="mt-1 text-accent">{p.value}</dd>
              </div>
            </dl>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{p.note}</p>
          </article>
        ))}

        <div className="flex w-[74vw] shrink-0 flex-col items-start gap-6 pr-10 md:w-[26vw]">
          <p className="font-display text-[clamp(2.8rem,4.6vw,4.8rem)] leading-[0.9]">Your site could be number seven.</p>
          <FoundryButton href="#quote" size="lg">
            Request a quote
          </FoundryButton>
        </div>
      </HorizontalScroll>
    </section>
  );
}
