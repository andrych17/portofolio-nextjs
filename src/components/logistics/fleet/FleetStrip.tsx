import { Marquee } from "@/components/motion/Marquee";
import { fleet } from "@/content/logistics/fleet";

export function FleetStrip() {
  return (
    <section aria-label="Carrier standards" className="border-y border-line bg-surface/40 py-5 overflow-hidden">
      <Marquee speed={0.9}>
        {fleet.proof.map((item) => (
          <span key={item} className="flex items-center gap-6 pr-6 font-display text-lg font-medium text-fg md:text-xl">
            <span>{item}</span>
            <span aria-hidden className="size-2 rounded-full bg-accent" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
