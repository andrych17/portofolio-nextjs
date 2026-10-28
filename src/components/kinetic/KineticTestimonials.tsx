import { Reveal } from "@/components/motion/Reveal";
import type { Testimonial } from "@/content/types";

const looks = [
  "bg-white md:-rotate-3",
  "bg-k-yellow md:rotate-2 md:mt-16",
  "bg-k-pink md:-rotate-1 md:mt-6",
];

/** Quote cards scattered like notes on a pinboard. */
export function KineticTestimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3 md:gap-8">
      {items.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.1} y={60}>
          <figure
            className={`flex h-full flex-col justify-between gap-10 rounded-[1.75rem] border-2 border-k-ink p-7 shadow-[6px_6px_0_0_#121212] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:rotate-0 hover:scale-[1.02] ${looks[i % looks.length]}`}
          >
            <span aria-hidden className="font-display text-7xl font-black leading-[0.6] text-accent">
              “
            </span>
            <blockquote className="text-xl font-medium leading-snug md:text-2xl">{t.quote}</blockquote>
            <figcaption>
              <span className="block font-display font-black uppercase">{t.name}</span>
              <span className="block text-sm">{t.role}</span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
