"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll";
import { crumb } from "@/content/food/crumb";

export function CrumbBakes() {
  return (
    <div id="bakes">
      <HorizontalScroll className="border-b border-line bg-surface/40" trackClassName="gap-8 px-6 md:px-16 items-center">
        <div className="w-[82vw] shrink-0 md:w-[420px]">
          <Eyebrow>Daily Deck Pulls · Scroll to Glide</Eyebrow>
          <h2 id="bakes-heading" className="mt-3 font-display text-[clamp(2.4rem,4.8vw,4.4rem)] font-semibold leading-[0.98] text-fg">
            Pulled hot from the stone deck.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            Scroll down to glide along our morning bake rail — from 06:30 blistered country sourdough to laminated brown-butter pastries.
          </p>
        </div>

        {crumb.bakes.map((bake) => (
          <article
            key={bake.id}
            className="group flex w-[84vw] shrink-0 flex-col justify-between rounded-[2.2rem] bg-surface p-3 ring-1 ring-line md:w-[460px]"
          >
            <ClipReveal direction="left" className="aspect-[16/10] w-full rounded-[1.7rem] bg-bg">
              <Image
                src={bake.image}
                alt={bake.alt}
                fill
                sizes="(min-width: 768px) 460px, 84vw"
                className="object-cover transition-transform duration-500 ease-studio group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 rounded-full bg-bg/92 px-3 py-1 text-xs font-bold text-fg backdrop-blur-sm">
                {bake.timeOut}
              </div>
            </ClipReveal>

            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-fg">{bake.name}</h3>
                  <p className="mt-1 text-xs font-medium text-accent">{bake.tagline}</p>
                </div>
                <span className="font-display text-2xl font-semibold text-fg">${bake.price}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">{bake.desc}</p>
              <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-3.5 text-xs font-medium text-muted">
                <span className="italic">{bake.flour}</span>
                <a href="#reserve" className="font-semibold text-accent hover:underline">
                  Reserve Loaf &rarr;
                </a>
              </div>
            </div>
          </article>
        ))}
      </HorizontalScroll>
    </div>
  );
}
