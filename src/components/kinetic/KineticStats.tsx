import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import type { Stat } from "@/content/types";

const looks = ["bg-accent -rotate-2", "bg-k-blue text-white rotate-1", "bg-k-lime -rotate-1", "bg-k-pink rotate-2"];

/** Counter blocks that sit slightly crooked until you hover them. */
export function KineticStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.08} y={50}>
          <div
            className={`flex aspect-square flex-col justify-between rounded-[1.75rem] border-2 border-k-ink p-5 shadow-[6px_6px_0_0_#121212] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:rotate-0 hover:scale-[1.03] md:p-7 ${looks[i % looks.length]}`}
          >
            <p className="font-display text-[clamp(2.4rem,4.8vw,4.6rem)] font-black leading-none tracking-tight">
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <p className="font-display text-sm font-bold uppercase leading-tight md:text-base">{stat.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
