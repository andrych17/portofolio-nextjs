import { Marquee } from "@/components/motion/Marquee";
import { forge } from "@/content/logistics/forge";

export function ForgeStrip() {
  return (
    <section aria-label="Heavy rigging standards" className="border-y border-line bg-surface/40 py-5 overflow-hidden">
      <Marquee speed={0.9}>
        {forge.proof.map((item) => (
          <span key={item} className="flex items-center gap-6 pr-6 font-display text-lg font-medium text-fg md:text-xl">
            <span>{item}</span>
            <span aria-hidden className="size-2 rounded-full bg-accent" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
