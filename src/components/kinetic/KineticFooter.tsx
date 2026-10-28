"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { LocalTime } from "@/components/LocalTime";
import { Marquee } from "@/components/motion/Marquee";
import { kinetic } from "@/content/kinetic";
import { pagePath, pages } from "@/content/types";
import { Burst } from "./Burst";

export function KineticFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.8], [0.55, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.8], [-6, 0]);

  return (
    <footer className="mt-10 border-t-2 border-k-ink bg-k-ink text-white">
      <div className="-rotate-1 border-b-2 border-k-ink bg-k-yellow py-4 text-k-ink">
        <Marquee speed={-1.4}>
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} className="flex items-center gap-6 pr-6 font-display text-2xl font-black uppercase md:text-4xl">
              Got a brand that needs to be louder?
              <Burst className="size-8 md:size-10" fill="#ff4a1c" />
            </span>
          ))}
        </Marquee>
      </div>

      <div ref={ref} className="mx-auto max-w-[1440px] px-5 pb-8 pt-20 md:px-10 md:pt-28">
        <Link href="/showcase/agency/kinetic/contact" className="group block" aria-label="Let's talk, go to the contact page">
          <motion.span
            style={{ scale, rotate }}
            className="block origin-bottom-left font-display text-[clamp(4rem,17vw,17rem)] font-black uppercase leading-[0.82] tracking-tight transition-colors duration-300 group-hover:text-accent"
          >
            Let&apos;s
            <br />
            talk<span className="text-accent group-hover:text-k-lime">.</span>
          </motion.span>
        </Link>

        <div className="mt-16 grid gap-10 border-t-2 border-white/20 pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-sm font-bold uppercase text-k-lime">Say hey</p>
            <a href={`mailto:${kinetic.email}`} className="mt-2 block font-display [overflow-wrap:anywhere] text-[clamp(1.2rem,5.4vw,1.9rem)] font-black hover:text-k-pink">
              {kinetic.email}
            </a>
            <a href={`tel:${kinetic.phone.replace(/\s/g, "")}`} className="mt-1 block text-white/70 hover:text-white">
              {kinetic.phone}
            </a>
          </div>
          <address className="not-italic text-white/80 md:col-span-3">
            <p className="font-display text-sm font-bold uppercase text-k-lime">Studio</p>
            <p className="mt-2">
              {kinetic.street}
              <br />
              {kinetic.city} {kinetic.postalCode}
            </p>
            <p className="mt-2 text-sm text-white/60">
              {kinetic.hours} · <LocalTime timeZone={kinetic.timeZone} /> here
            </p>
          </address>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-6 md:col-span-4">
            <div>
              <p className="font-display text-sm font-bold uppercase text-k-lime">Pages</p>
              <ul className="mt-2 space-y-1">
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link href={pagePath("kinetic", page.slug)} className="hover:text-k-yellow">
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display text-sm font-bold uppercase text-k-lime">Social</p>
              <ul className="mt-2 space-y-1">
                {kinetic.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-k-yellow">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-3 text-sm text-white/50">
          <span>© 2026 Your Brand Pty Ltd</span>
          <Link href="/showcase" className="hover:text-white">
            Back to Showcase →
          </Link>
        </div>
      </div>
    </footer>
  );
}
