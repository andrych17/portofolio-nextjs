import { Counter } from "@/components/motion/Counter";
import type { Stat } from "@/content/types";

/** First stat is the hero number; the rest sit beside it on hairlines. */
export function NoirStats({ stats }: { stats: Stat[] }) {
  const [lead, ...rest] = stats;
  return (
    <dl className="grid gap-y-12 md:grid-cols-12">
      <div className="md:col-span-5">
        <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{lead.label}</dt>
        <dd className="mt-2 font-display text-[clamp(7rem,18vw,16rem)] leading-[0.8] text-accent">
          <Counter value={lead.value} prefix={lead.prefix} suffix={lead.suffix} />
        </dd>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:col-span-7 md:grid-cols-3">
        {rest.map((stat) => (
          <div key={stat.label} className="border-l border-line pl-5 md:self-end">
            <dd className="font-display text-6xl leading-none md:text-7xl">
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </dd>
            <dt className="mt-3 text-sm text-muted">{stat.label}</dt>
          </div>
        ))}
      </div>
    </dl>
  );
}
