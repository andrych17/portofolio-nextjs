import { Marquee } from "@/components/motion/Marquee";
import { dental } from "@/content/health/dental";

export function DentalStrip() {
  return (
    <section aria-label="Clinical standards" className="border-y border-line bg-surface/40 py-5 overflow-hidden">
      <Marquee speed={0.9}>
        {dental.proof.map((item) => (
          <span key={item} className="flex items-center gap-6 pr-6 font-display text-lg font-medium text-fg md:text-xl">
            <span>{item}</span>
            <span aria-hidden className="size-2 rounded-full bg-accent" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
