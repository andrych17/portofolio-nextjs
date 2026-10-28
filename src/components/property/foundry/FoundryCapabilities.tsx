import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { foundry } from "@/content/property/foundry";

type Cap = (typeof foundry.capabilities)[number];

const layout = [
  { span: "md:col-span-7", tone: "light" },
  { span: "md:col-span-5", tone: "dark" },
  { span: "md:col-span-4", tone: "light" },
  { span: "md:col-span-8", tone: "light" },
  { span: "md:col-span-5", tone: "light" },
  { span: "md:col-span-7", tone: "signal" },
] as const;

const tones = {
  light: { box: "bg-[#e4e3de] text-fg", body: "text-fg/75", chip: "ring-fg/30", n: "text-fg/55", corner: "bg-accent" },
  dark: { box: "bg-[var(--f-char)] text-bg", body: "text-white/70", chip: "ring-white/30", n: "text-white/50", corner: "bg-accent" },
  signal: { box: "bg-accent text-accent-fg", body: "text-fg/80", chip: "ring-fg/45", n: "text-fg/65", corner: "bg-fg" },
} as const;

function Card({ cap, span, tone }: { cap: Cap; span: string; tone: keyof typeof tones }) {
  const t = tones[tone];
  const image = "image" in cap ? cap : null;
  return (
    <Reveal className={`${span} min-w-0`} y={30} amount={0.15}>
      <article className={`foundry-card relative flex h-full flex-col overflow-hidden ring-1 ring-fg/25 ${image ? "md:grid md:grid-cols-2" : ""} ${t.box}`}>
        <span aria-hidden className={`foundry-corner absolute right-0 top-0 z-10 size-9 [clip-path:polygon(0_0,100%_0,100%_100%)] ${t.corner}`} />
        {image?.image && (
          <div className="relative aspect-[16/10] md:order-2 md:aspect-auto md:min-h-[22rem]">
            <Image src={image.image} alt={image.alt} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover grayscale-[0.5] contrast-110" />
            <div aria-hidden className="absolute inset-0 bg-[#141414]/15" />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6 md:p-9">
          <p className={`font-mono text-[11.5px] uppercase tracking-[0.14em] ${t.n}`}>{cap.n} / 06</p>
          <h3 className="mt-4 max-w-md font-display text-[clamp(2.2rem,3.4vw,3.4rem)] leading-[0.9]">{cap.title}</h3>
          <p className={`mt-4 max-w-md text-[15.5px] leading-relaxed ${t.body}`}>{cap.body}</p>
          <ul className="mt-auto flex flex-wrap gap-2 pt-8">
            {cap.specs.map((s) => (
              <li key={s} className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] ring-1 ${t.chip}`}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function FoundryCapabilities() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
      {foundry.capabilities.map((cap, i) => (
        <Card key={cap.n} cap={cap} span={layout[i].span} tone={layout[i].tone} />
      ))}
    </div>
  );
}
