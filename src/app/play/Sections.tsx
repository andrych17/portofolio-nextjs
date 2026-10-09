"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CAREER, CONTACT, PROFILE, SINCE, SKILLS, WORKS, type SectionId } from "./data";

export interface SectionProps {
  sub: number;
  dir: number;
  onPick: (i: number) => void;
  onStep: (d: number) => void;
}

const EASE = [0.2, 0.9, 0.1, 1] as const;

const slide = {
  enter: (d: number) => ({ x: d * 60, opacity: 0, skewX: d * -6 }),
  center: { x: 0, opacity: 1, skewX: 0, transition: { duration: 0.42, ease: EASE } },
  exit: (d: number) => ({ x: d * -40, opacity: 0, transition: { duration: 0.16 } }),
};

const rise = (i: number) => ({
  initial: { y: 18, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { delay: 0.05 + i * 0.045, duration: 0.4, ease: EASE } },
});

// Keeps keyboard focus on the selected row so Enter activates what the player sees highlighted.
function useRoving(sub: number) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    refs.current[sub]?.focus({ preventScroll: true });
  }, [sub]);
  return refs;
}

function Pager({ label, sub, total, onStep }: { label: string; sub: number; total: number; onStep: (d: number) => void }) {
  return (
    <div className="pl-pager">
      <button type="button" onClick={() => onStep(-1)} aria-label={`Previous ${label}`}><ArrowLeft size={18} strokeWidth={1.5} /></button>
      <span className="pl-mono">{String(sub + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      <button type="button" onClick={() => onStep(1)} aria-label={`Next ${label}`}><ArrowRight size={18} strokeWidth={1.5} /></button>
    </div>
  );
}

function Profile() {
  return (
    <div className="pl-profile">
      <div>
        <h2 className="pl-bigname">
          {PROFILE.name.map((n, i) => <motion.span key={n} {...rise(i)}>{n}</motion.span>)}
        </h2>
        <motion.p className="pl-class" {...rise(2)}>{PROFILE.role}</motion.p>
        <motion.p className="pl-bio" {...rise(3)}>{PROFILE.bio}</motion.p>
        <p className="pl-mono pl-ach-head">Achievements · {PROFILE.achievements.length}/{PROFILE.achievements.length} unlocked</p>
        <ul className="pl-ach">
          {PROFILE.achievements.map((a, i) => <motion.li key={a} {...rise(5 + i * 0.5)}>{a}</motion.li>)}
        </ul>
      </div>
      <dl className="pl-stats">
        {PROFILE.stats.map(([k, v], i) => (
          <motion.div key={k} {...rise(4 + i)}>
            <dt className="pl-mono">{k}</dt>
            <dd>{v}</dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}

const monthIndex = ([y, m]: readonly number[]) => y * 12 + m - 1;

function Timeline({ sub }: { sub: number }) {
  const start = monthIndex([SINCE.getFullYear(), SINCE.getMonth() + 1]);
  const end = Math.max(...CAREER.map((c) => monthIndex(c.to))) + 6;
  const pct = (v: number) => `${((v - start) / (end - start)) * 100}%`;
  const years = Array.from({ length: Math.floor(end / 12) - SINCE.getFullYear() }, (_, i) => SINCE.getFullYear() + 1 + i);
  return (
    <div className="pl-timeline" aria-hidden="true">
      {CAREER.map((c, i) => (
        <span
          key={c.company}
          className={i === sub ? "pl-tl-on" : ""}
          style={{ left: pct(monthIndex(c.from)), width: `calc(${pct(monthIndex(c.to))} - ${pct(monthIndex(c.from))})` }}
        />
      ))}
      {years.map((y) => <i key={y} style={{ left: pct(y * 12) }}>{y}</i>)}
    </div>
  );
}

function Career({ sub, dir, onStep }: SectionProps) {
  const c = CAREER[sub];
  return (
    <div className="pl-career">
      <Pager label="company" sub={sub} total={CAREER.length} onStep={onStep} />
      <motion.article key={sub} custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
        <p className="pl-company">
          <span>{c.company}</span>
          {c.note && <em className="pl-mono">{c.note}</em>}
        </p>
        <h3 className="pl-role"><span>{c.role}</span></h3>
        <p className="pl-mono pl-when">{c.dates} · {c.place}</p>
        <ul className="pl-points">
          {c.points.map((p, i) => <motion.li key={p} {...rise(i + 2)}>{p}</motion.li>)}
        </ul>
      </motion.article>
      <Timeline sub={sub} />
    </div>
  );
}

function Works({ sub, dir, onPick }: SectionProps) {
  const refs = useRoving(sub);
  const w = WORKS[sub];
  return (
    <div className="pl-works">
      <ul className="pl-list" role="listbox" aria-label="Projects">
        {WORKS.map((x, i) => (
          <li key={x.name}>
            <button
              type="button"
              role="option"
              aria-selected={i === sub}
              tabIndex={i === sub ? 0 : -1}
              ref={(el) => { refs.current[i] = el; }}
              className="pl-row"
              data-on={i === sub || undefined}
              onClick={() => onPick(i)}
              onPointerEnter={() => onPick(i)}
            >
              <span className="pl-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="pl-row-label">{x.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <motion.article key={sub} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" className="pl-work">
        <div className="pl-shot-wrap">
          <div className="pl-shot">
            <Image src={w.img} alt={`${w.name} screenshot`} fill sizes="(max-width: 900px) 90vw, 42vw" priority={sub === 0} />
          </div>
        </div>
        <p className="pl-mono pl-accent">{w.role}</p>
        <p className="pl-work-line">{w.line}</p>
        <ul className="pl-parts">
          {w.parts.map((p, i) => <motion.li key={p} {...rise(i)}>{p}</motion.li>)}
        </ul>
        <p className="pl-mono pl-stack">{w.stack.join(" / ")}</p>
        {w.url && (
          <a className="pl-visit" href={w.url} target="_blank" rel="noopener noreferrer">
            Visit {new URL(w.url).host} <ArrowUpRight size={16} strokeWidth={1.5} />
          </a>
        )}
      </motion.article>
    </div>
  );
}

function Skills({ sub, dir, onPick }: SectionProps) {
  const s = SKILLS[sub];
  return (
    <div className="pl-skills">
      <div className="pl-tabs" role="tablist" aria-label="Skill groups">
        {SKILLS.map((g, i) => (
          <button
            key={g.name}
            type="button"
            role="tab"
            aria-selected={i === sub}
            data-on={i === sub || undefined}
            onClick={() => onPick(i)}
          >
            {g.name}
          </button>
        ))}
      </div>
      <motion.ol key={sub} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" className="pl-skill-list" role="tabpanel">
        {s.items.map((it, i) => (
          <motion.li key={it} {...rise(i)}>
            <span className="pl-mono pl-accent">{String(i + 1).padStart(2, "0")}</span>
            {it}
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}

function Contact({ sub, onPick }: SectionProps) {
  const refs = useRoving(sub);
  return (
    <ul className="pl-contact">
      {CONTACT.map((c, i) => {
        const external = c.href.startsWith("http") || c.href.endsWith(".pdf");
        return (
          <motion.li key={c.label} {...rise(i)}>
            <a
              href={c.href}
              ref={(el) => { refs.current[i] = el; }}
              tabIndex={i === sub ? 0 : -1}
              className="pl-row pl-contact-row"
              data-on={i === sub || undefined}
              onPointerEnter={() => onPick(i)}
              onFocus={() => onPick(i)}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="pl-mono">{c.label}</span>
              <span className="pl-row-label">{c.value}</span>
              <ArrowUpRight className="pl-contact-go" size={22} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </motion.li>
        );
      })}
    </ul>
  );
}

export const SECTION_SIZE: Record<SectionId, number> = {
  profile: 1,
  career: CAREER.length,
  works: WORKS.length,
  skills: SKILLS.length,
  contact: CONTACT.length,
};

export const SECTIONS: Record<SectionId, (p: SectionProps) => ReactNode> = {
  profile: Profile,
  career: Career,
  works: Works,
  skills: Skills,
  contact: Contact,
};
