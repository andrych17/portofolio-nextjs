import { StackCards } from "@/components/motion/StackCards";
import type { Step } from "@/content/types";

const tones = [
  "bg-[#e9e2d6] text-fg",
  "bg-[#dde4d3] text-fg",
  "bg-[#efdcc6] text-fg",
  "bg-accent text-accent-fg",
];

/** Process steps as cards that stack while you scroll. */
export function AtelierProcessStack({ steps }: { steps: Step[] }) {
  return (
    <StackCards top={110} step={18} minScale={0.9} gapClassName="mb-[14vh]">
      {steps.map((step, i) => (
        <article
          key={step.title}
          className={`grid min-h-[58svh] gap-8 rounded-[2.25rem] p-7 shadow-[0_-1px_0_rgba(255,255,255,0.6)_inset,0_30px_60px_-30px_rgba(28,27,24,0.35)] md:grid-cols-12 md:p-12 ${tones[i % tones.length]}`}
        >
          <div className="flex flex-col justify-between md:col-span-5">
            <span className="font-display text-[clamp(5rem,12vw,11rem)] italic leading-none opacity-90">0{i + 1}</span>
            <p className="text-sm uppercase tracking-[0.2em] opacity-70">{step.duration}</p>
          </div>
          <div className="flex flex-col justify-end md:col-span-7">
            <h3 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none">{step.title}</h3>
            <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-80">{step.body}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {step.outputs.map((o) => (
                <li key={o} className="rounded-full px-3.5 py-1.5 text-sm ring-1 ring-current/20">
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </StackCards>
  );
}
