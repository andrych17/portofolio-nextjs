import { StackCards } from "@/components/motion/StackCards";

type Step = { n: string; title: string; body: string; facts: string[][] };

const tones = ["bg-surface text-fg", "bg-[#271d17] text-fg", "bg-[#3a2217] text-fg", "bg-accent text-accent-fg"];

/** Four cards that pin and stack as you scroll. */
export function EmberProcess({ steps }: { steps: Step[] }) {
  return (
    <StackCards top={92} step={16} minScale={0.92} gapClassName="mb-[10vh]">
      {steps.map((step, i) => (
        <article
          key={step.n}
          className={`relative overflow-hidden rounded-[2rem] p-7 shadow-[0_-20px_50px_-30px_rgb(0_0_0/0.8),inset_0_1px_0_rgb(255_255_255/0.08)] ring-1 ring-fg/10 md:p-14 ${tones[i % tones.length]}`}
          style={{ minHeight: "clamp(18rem, 52vh, 30rem)" }}
        >
          <span aria-hidden className="pointer-events-none absolute -right-2 -top-10 select-none font-display text-[16rem] leading-none opacity-[0.07] md:-top-16 md:text-[26rem]">
            {step.n}
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Step {step.n}</p>
          <h3 className="mt-6 max-w-xl font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95]">{step.title}</h3>
          <p className="mt-6 max-w-lg text-base leading-relaxed opacity-80 md:text-lg">{step.body}</p>
          <dl className="mt-8 flex gap-10 md:absolute md:bottom-12 md:right-14 md:mt-0 md:gap-14">
            {step.facts.map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-[2.6rem] leading-none md:text-6xl">{value}</dt>
                <dd className="mt-2 max-w-[9rem] text-xs uppercase tracking-[0.14em] opacity-70">{label}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </StackCards>
  );
}
