import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import type { Stat } from "@/content/types";

const spans = ["md:col-span-6 md:row-span-2", "md:col-span-3", "md:col-span-3", "md:col-span-6"];

/** Lead number in a large green tile, the rest in smaller paper tiles. */
export function AtelierStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-12 md:gap-5">
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.08} className={spans[i % spans.length]}>
          <div className={`h-full rounded-[2rem] p-1.5 ring-1 ${i === 0 ? "bg-accent ring-accent" : "bg-white/45 ring-black/[0.06]"}`}>
            <div
              className={`flex h-full flex-col justify-between gap-10 rounded-[calc(2rem-0.375rem)] p-7 md:p-9 ${
                i === 0 ? "text-accent-fg shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" : "bg-bg/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]"
              }`}
            >
              <p className={`text-sm ${i === 0 ? "text-accent-fg/70" : "text-muted"}`}>{stat.label}</p>
              <p className={`font-display leading-[0.85] tracking-tight ${i === 0 ? "text-[clamp(7rem,16vw,15rem)] italic" : "text-[clamp(3.5rem,6vw,5.5rem)]"}`}>
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
