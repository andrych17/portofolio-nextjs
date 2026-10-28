"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { easeStudio } from "@/components/motion/ease";
import type { MenuItem, MenuSection } from "@/content/food/ember";
import { useMediaQuery } from "@/lib/use-media-query";

const usd = (n: number) => `$${n}`;

/**
 * The menu as a typographic list. With a mouse, a photo trails the cursor and the other dishes dim.
 * With touch there is no hover, so each dish becomes a tap target that opens its photo and note in place.
 */
export function EmberMenu({ sections }: { sections: MenuSection[] }) {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const [hover, setHover] = useState<MenuItem | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 230, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 230, damping: 26, mass: 0.6 });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <div className="relative" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
      <p className="mb-10 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
        <span className="h-px w-8 bg-accent" />
        {fine ? "Move over a dish to see it" : "Tap a dish to see it"}
      </p>

      <div className="space-y-16 md:space-y-24">
        {sections.map((section, s) => (
          <section key={section.id} aria-labelledby={`menu-${section.id}`}>
            <div className="flex items-end justify-between gap-6 border-b border-fg/25 pb-4">
              <h3 id={`menu-${section.id}`} className="font-display text-[clamp(2rem,4vw,3.4rem)] italic leading-none text-accent">
                {section.title}
              </h3>
              <p className="hidden text-sm text-muted sm:block">
                0{s + 1} · {section.blurb}
              </p>
            </div>
            <ul>
              {section.items.map((item) => {
                const isOpen = open === item.id;
                const dim = fine && hover !== null && hover.id !== item.id;
                return (
                  <li
                    key={item.id}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setHover(item)}
                    className={`border-b border-line transition-opacity duration-500 ease-studio ${dim ? "opacity-35" : "opacity-100"}`}
                  >
                    {fine ? (
                      <div className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-2 py-6 md:grid-cols-12 md:py-7">
                        <h4 className="font-display text-[clamp(1.9rem,3.2vw,3rem)] leading-none transition-[transform,color] duration-700 ease-studio group-hover:translate-x-3 group-hover:text-accent md:col-span-5">
                          {item.name}
                        </h4>
                        <Price item={item} className="md:order-3 md:col-span-2 md:justify-self-end" />
                        <p className="col-span-2 max-w-md text-[15px] leading-relaxed text-fg/65 md:order-2 md:col-span-5">{item.note}</p>
                      </div>
                    ) : (
                      <>
                        <h4>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={`panel-${item.id}`}
                            onClick={() => setOpen(isOpen ? null : item.id)}
                            className="flex min-h-14 w-full cursor-pointer items-center gap-4 py-4 text-left"
                          >
                            <span className="font-display text-[1.9rem] leading-none">{item.name}</span>
                            <span className="ml-auto flex items-center gap-3">
                              <Price item={item} />
                              <PlusIcon
                                aria-hidden
                                size={16}
                                className={`shrink-0 text-accent transition-transform duration-500 ease-studio ${isOpen ? "rotate-45" : ""}`}
                              />
                            </span>
                          </button>
                        </h4>
                        <div
                          id={`panel-${item.id}`}
                          inert={!isOpen}
                          className="grid transition-[grid-template-rows,opacity] duration-500 ease-studio"
                          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
                        >
                          <div className="overflow-hidden">
                            <div className="relative mb-3 aspect-[16/10] overflow-hidden rounded-2xl ember-tint">
                              <Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 92vw, 400px" className="object-cover" />
                            </div>
                            <p className="pb-5 pt-1 text-[15px] leading-relaxed text-fg/70">{item.note}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {fine && (
        <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 z-20" style={{ x: sx, y: sy }}>
          <AnimatePresence>
            {hover && (
              <motion.div
                key={hover.id}
                initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5, ease: easeStudio }}
                className="ember-tint absolute -top-36 left-10 h-72 w-60 overflow-hidden rounded-[1.25rem] shadow-[0_30px_60px_-20px_rgb(255_106_31/0.45)] ring-1 ring-accent/50"
              >
                <Image src={hover.image} alt="" fill sizes="240px" className="object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function Price({ item, className = "" }: { item: MenuItem; className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 whitespace-nowrap ${className}`}>
      {item.tags?.map((tag) => (
        <abbr
          key={tag}
          title={tag === "V" ? "Vegetarian" : "Gluten free"}
          className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted no-underline ring-1 ring-fg/20"
        >
          {tag}
        </abbr>
      ))}
      <span className="text-base font-medium tabular-nums">{usd(item.price)}</span>
    </span>
  );
}
