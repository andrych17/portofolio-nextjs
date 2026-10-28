import { Counter } from "@/components/motion/Counter";
import { estate } from "@/content/property/estate";

/** One oversized figure on the left, three ruled rows on the right. */
export function EstateStats() {
  const [lead, ...rest] = estate.stats;
  return (
    <dl className="grid gap-12 md:grid-cols-12 md:items-end">
      <div className="md:col-span-6">
        <dd className="font-display text-[clamp(8rem,22vw,20rem)] leading-[0.78] text-[#8a6a28]">
          <Counter value={lead.value} />
        </dd>
        <dt className="mt-5 max-w-xs text-[15px] text-fg/75">{lead.label}</dt>
      </div>
      <div className="md:col-span-6">
        {rest.map((s) => (
          <div key={s.label} className="grid grid-cols-[minmax(0,1fr)] items-baseline gap-x-8 gap-y-1 border-t border-line py-6 lg:grid-cols-[19rem_minmax(0,1fr)]">
            <dd className="font-display text-[clamp(3rem,5vw,4.4rem)] leading-none">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </dd>
            <dt className="text-[15px] text-fg/75">{s.label}</dt>
          </div>
        ))}
      </div>
    </dl>
  );
}
