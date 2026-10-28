"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import type { Service } from "@/content/types";

const images = [
  { src: "/template/images/atelier/flatlay.jpg", alt: "Sketches, a notebook and printed type samples on a desk" },
  { src: "/template/images/atelier/grid.jpg", alt: "Parts of a camera laid out in a neat grid" },
  { src: "/template/images/atelier/product.jpg", alt: "A laptop next to a printed book on a white desk" },
  { src: "/template/images/atelier/objects.jpg", alt: "Wallet, watch, glasses and headphones arranged on a dark surface" },
];

/** Service rows that open on hover or focus; the picture on the right follows the open row. */
export function AtelierServices({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <ol className="md:col-span-7">
        {services.map((service, i) => {
          const open = active === i;
          return (
            <li key={service.title} className="border-t border-line last:border-b">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={open}
                className="flex w-full cursor-pointer items-baseline gap-6 py-7 text-left"
              >
                <span className="w-8 text-sm tabular-nums text-muted">0{i + 1}</span>
                <span
                  className={`font-display text-[clamp(2rem,4vw,3.6rem)] leading-none transition-[color,transform] duration-700 ease-studio ${open ? "translate-x-2 italic text-accent" : "text-fg"}`}
                >
                  {service.title}
                </span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-700 ease-studio ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden" inert={!open}>
                  <div className="pb-8 pl-14">
                    <p className="max-w-lg text-lg leading-relaxed text-fg/75">{service.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {service.deliverables.map((d) => (
                        <li key={d} className="rounded-full bg-white/60 px-3.5 py-1.5 text-sm ring-1 ring-black/[0.06]">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="hidden md:col-span-5 md:block">
        <div className="sticky top-28 rounded-[2rem] bg-white/45 p-1.5 ring-1 ring-black/[0.06]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-0.375rem)]">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ clipPath: "inset(0% 0% 100% 0%)", scale: 1.15 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 1, ease: easeStudio }}
              >
                <Image src={images[active % images.length].src} alt={images[active % images.length].alt} fill sizes="40vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-4 left-4 rounded-full bg-bg/85 px-3 py-1 text-xs backdrop-blur">
              {services[active].title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
