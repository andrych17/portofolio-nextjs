import Image from "next/image";
import Link from "next/link";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Reveal } from "@/components/motion/Reveal";
import { templatePath, thumbSrc, type TemplateMeta } from "@/lib/registry";

export function TemplateCard({ t, index, priority = false }: { t: TemplateMeta; index: number; priority?: boolean }) {
  return (
    <Reveal className="min-w-0" delay={(index % 2) * 0.08}>
      <Link
        href={templatePath(t)}
        className="group flex h-full flex-col rounded-[2rem] bg-fg/[0.04] p-1.5 ring-1 ring-line transition-all duration-500 ease-studio hover:bg-fg/[0.07] hover:shadow-[0_24px_50px_-22px_rgba(10,10,11,0.16)]"
      >
        <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] bg-surface p-3 shadow-[0_1px_2px_rgba(10,10,11,0.05)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] ring-1 ring-black/8" style={{ background: t.palette[0] }}>
            <Image
              src={thumbSrc(t)}
              alt={`${t.name} template preview, ${t.tagline.toLowerCase()}`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"
              className="object-cover object-top transition-transform duration-[1200ms] ease-studio group-hover:scale-[1.04]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="wide font-display text-2xl font-extrabold uppercase tracking-tight">{t.name}</h2>
                <p className="mt-1 text-sm text-muted">{t.tagline}</p>
              </div>
              <ArrowIsland className="size-10 shrink-0 bg-fg/[0.07] group-hover:bg-accent group-hover:text-accent-fg" size={16} />
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {t.motion.map((m) => (
                <li key={m} className="rounded-full bg-bg/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted ring-1 ring-line">
                  {m}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between pt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              <span className="flex gap-1.5" aria-label="Color palette">
                {t.palette.map((c) => (
                  <span key={c} className="size-4 rounded-full ring-1 ring-black/15" style={{ background: c }} />
                ))}
              </span>
              <span>{t.pages === 1 ? "One page" : `${t.pages} pages`} · Responsive</span>
            </div>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
