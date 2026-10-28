import { AirplaneIcon, CraneIcon, PackageIcon, StampIcon, ThermometerIcon, WarehouseIcon } from "@phosphor-icons/react/ssr";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { freight } from "@/content/logistics/freight";

const icons: Record<string, ReactNode> = {
  Package: <PackageIcon size={26} weight="light" />,
  Airplane: <AirplaneIcon size={26} weight="light" />,
  Stamp: <StampIcon size={26} weight="light" />,
  Warehouse: <WarehouseIcon size={26} weight="light" />,
  Thermometer: <ThermometerIcon size={26} weight="light" />,
  Crane: <CraneIcon size={26} weight="light" />,
};

const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-8", "md:col-span-4"];

const art: Record<number, ReactNode> = {
  0: (
    <svg viewBox="0 0 220 90" className="w-full max-w-[260px]" aria-hidden>
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect key={`${r}${c}`} x={4 + c * 42} y={64 - r * 28} width="38" height="24" rx="2" fill={["var(--t-accent)", "#4f6fa8", "#c4d2ec", "#2f4d82"][(r + c * 3) % 4]} opacity={0.9 - r * 0.12} />
        )),
      )}
    </svg>
  ),
  1: (
    <svg viewBox="0 0 220 70" className="w-full max-w-[240px]" aria-hidden>
      <path d="M6 62Q110 -22 214 62" fill="none" stroke="rgb(255 255 255 / 0.25)" strokeWidth="1.5" strokeDasharray="3 6" />
      <circle cx="6" cy="62" r="4" fill="#fff" />
      <circle cx="214" cy="62" r="4" fill="var(--t-accent)" />
    </svg>
  ),
  4: (
    <svg viewBox="0 0 400 60" className="w-full" aria-hidden preserveAspectRatio="none">
      <path d="M0 30q25-26 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0" fill="none" stroke="var(--t-accent)" strokeWidth="2" />
      <path d="M0 14H400M0 46H400" stroke="rgb(255 255 255 / 0.2)" strokeDasharray="2 6" />
    </svg>
  ),
};

export function FreightServices() {
  return (
    <div className="grid gap-3 md:grid-cols-12 md:gap-4">
      {freight.services.map((s, i) => (
        <Reveal key={s.n} className={spans[i]} delay={(i % 2) * 0.08} y={28}>
          <article className="group relative h-full rounded-[1.75rem] bg-fg/[0.04] p-1.5 ring-1 ring-fg/10 transition-colors duration-500 ease-studio hover:bg-accent/20 hover:ring-accent/50">
            <div className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-surface p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] md:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[12px] tracking-[0.18em] text-muted">{s.n}</span>
                <span className="text-accent transition-transform duration-700 ease-studio group-hover:-translate-y-1 group-hover:rotate-[-8deg]">{icons[s.icon]}</span>
              </div>
              <h3 className="mt-10 font-display text-[clamp(1.7rem,2.6vw,2.5rem)] font-semibold leading-[1.02]">{s.title}</h3>
              <p className="mt-4 max-w-[46ch] text-[15.5px] leading-relaxed text-fg/70">{s.body}</p>
              <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-8">
                <ul className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full px-3 py-1 text-[12px] text-fg/80 ring-1 ring-fg/15">
                      {t}
                    </li>
                  ))}
                </ul>
                {art[i] && <div className="w-full max-w-[260px] opacity-90 transition-opacity duration-500 group-hover:opacity-100">{art[i]}</div>}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
