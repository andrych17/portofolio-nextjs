import { Counter } from "@/components/motion/Counter";
import { maison } from "@/content/fashion/maison";

export function MaisonStats() {
  const [lead, ...rest] = maison.stats;
  return (
    <section aria-labelledby="stats-title" className="bg-fg text-bg">
      <div className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-36">
        <h2 id="stats-title" className="maison-caps text-bg/60">
          (05) The house in numbers
        </h2>
        <dl className="mt-14 grid gap-y-14 md:mt-20 md:grid-cols-12">
          <div className="md:col-span-6">
            <dd className="font-display text-[clamp(8rem,22vw,20rem)] font-light leading-[0.78] tracking-[-0.04em]">
              <Counter value={lead.value} />
            </dd>
            <dt className="mt-6 max-w-xs text-bg/70">{lead.label}</dt>
          </div>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-3 md:col-span-6 md:self-end">
            {rest.map((stat) => (
              <div key={stat.label} className="border-t border-bg/20 pt-5">
                <dd className="font-display text-[clamp(2.8rem,4.4vw,4.6rem)] font-light leading-none">
                  <Counter value={stat.value} prefix={"prefix" in stat ? stat.prefix : undefined} suffix={"suffix" in stat ? stat.suffix : undefined} />
                </dd>
                <dt className="mt-4 text-sm leading-snug text-bg/65">{stat.label}</dt>
              </div>
            ))}
          </div>
        </dl>
      </div>
    </section>
  );
}
