"use client";

import { useEffect, useRef, useState } from "react";

type Item = { slug: string; name: string; count: number };

/** Sticky chip bar. Chips are plain anchors (everything stays in the HTML); the active one follows the scroll. */
export function SectorNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.slug ?? "");
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) (e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id));
        const first = items.find((i) => seen.has(i.slug));
        if (first) setActive(first.slug);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const i of items) {
      const el = document.getElementById(i.slug);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  useEffect(() => {
    const chip = bar.current?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    // Scroll only the chip row, never the page.
    if (chip && bar.current) bar.current.scrollTo({ left: chip.offsetLeft - 24, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Sectors" className="sticky top-0 z-40 border-y border-line bg-[#0c0c0c]/85 backdrop-blur-md">
      <div ref={bar} className="no-scrollbar mx-auto flex max-w-[1400px] gap-2 overflow-x-auto px-5 py-3 md:px-10">
        {items.map((i) => (
          <a
            key={i.slug}
            href={`#${i.slug}`}
            data-slug={i.slug}
            aria-current={active === i.slug ? "true" : undefined}
            className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.14em] ring-1 transition-colors duration-500 ease-studio ${
              active === i.slug ? "bg-accent text-accent-fg ring-accent" : "text-muted ring-white/12 hover:bg-white/10 hover:text-fg"
            }`}
          >
            {i.name}
            <span className={active === i.slug ? "opacity-70" : "opacity-50"}>{i.count}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
