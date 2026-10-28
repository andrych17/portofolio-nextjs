"use client";

import { BathtubIcon, BedIcon, RulerIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowIsland } from "@/components/ArrowIsland";
import { easeStudio } from "@/components/motion/ease";
import {
  listingAreas,
  listings,
  listingTypes,
  priceFormat,
  type Listing,
  type ListingArea,
  type ListingType,
} from "@/content/property/estate";

type TypeFilter = ListingType | "All";
type AreaFilter = ListingArea | "All";

function span(i: number, n: number) {
  if (n % 2 === 1 && i === n - 1) return "md:col-span-12";
  const row = Math.floor(i / 2);
  const first = i % 2 === 0;
  return (row % 2 === 0 ? first : !first) ? "md:col-span-7" : "md:col-span-5";
}

export function EstateListings() {
  const [type, setType] = useState<TypeFilter>("All");
  const [area, setArea] = useState<AreaFilter>("All");

  const shown = useMemo(
    () => listings.filter((l) => (type === "All" || l.type === type) && (area === "All" || l.area === area)),
    [type, area],
  );
  const countFor = (pred: (l: Listing) => boolean) => listings.filter(pred).length;

  return (
    <div>
      <div className="grid gap-6 border-y border-line py-6 md:grid-cols-12 md:items-center">
        <ChipRow
          className="md:col-span-6"
          label="Type"
          value={type}
          onChange={(v) => setType(v as TypeFilter)}
          options={[
            { value: "All", count: countFor((l) => area === "All" || l.area === area) },
            ...listingTypes.map((t) => ({ value: t, count: countFor((l) => l.type === t && (area === "All" || l.area === area)) })),
          ]}
        />
        <ChipRow
          className="md:col-span-6"
          label="Area"
          value={area}
          onChange={(v) => setArea(v as AreaFilter)}
          options={[
            { value: "All", count: countFor((l) => type === "All" || l.type === type) },
            ...listingAreas.map((a) => ({ value: a, count: countFor((l) => l.area === a && (type === "All" || l.type === type)) })),
          ]}
        />
      </div>

      <p role="status" aria-live="polite" className="mt-6 text-sm text-muted">
        Showing {shown.length} of {listings.length} homes
      </p>

      <ul className="mt-8 grid gap-x-6 gap-y-14 md:grid-cols-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((listing, i) => (
            <motion.li
              key={listing.id}
              layout="position"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.8, ease: easeStudio }}
              className={span(i, shown.length)}
            >
              <ListingCard listing={listing} wide={span(i, shown.length) === "md:col-span-12"} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {shown.length === 0 && (
        <div className="mt-8 rounded-[2rem] bg-surface p-10 text-center ring-1 ring-fg/10">
          <p className="font-display text-4xl">Nothing matches that pairing.</p>
          <p className="mx-auto mt-3 max-w-md text-muted">Several of our homes are sold off market. Reset the filters, or ask us what is coming next.</p>
          <button
            type="button"
            onClick={() => {
              setType("All");
              setArea("All");
            }}
            className="mt-6 h-11 cursor-pointer rounded-full bg-[#0f2a20] px-6 text-sm font-semibold text-[#f6f2ea]"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

function ChipRow({
  label,
  value,
  options,
  onChange,
  className = "",
}: {
  label: string;
  value: string;
  options: { value: string; count: number }[];
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={className} role="group" aria-label={`Filter by ${label.toLowerCase()}`}>
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.value)}
              className={`flex h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium ring-1 transition-colors duration-500 ease-studio ${
                active ? "bg-[#0f2a20] text-[#f6f2ea] ring-[#0f2a20]" : "text-fg ring-fg/20 hover:ring-fg/50"
              } ${o.count === 0 && !active ? "opacity-45" : ""}`}
            >
              {o.value}
              <span className={`text-[11px] tabular-nums ${active ? "text-[#d6b571]" : "text-muted"}`}>{o.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ListingCard({ listing, wide }: { listing: Listing; wide: boolean }) {
  return (
    <article className="group relative">
      <div className={`relative overflow-hidden rounded-[1.75rem] bg-surface ${wide ? "aspect-[4/3] md:aspect-auto md:h-[28rem]" : "aspect-[4/3] md:aspect-auto md:h-[31rem]"}`}>
        <Image
          src={listing.image}
          alt={listing.alt}
          fill
          sizes={wide ? "(min-width: 768px) 1400px, 100vw" : "(min-width: 768px) 700px, 100vw"}
          className="object-cover transition-transform duration-[1600ms] ease-studio group-hover:scale-[1.05]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f2a20]/45 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-[#f6f2ea]/90 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f2a20] backdrop-blur">
          {listing.type}
        </span>
        <span className="absolute bottom-4 right-4 flex items-center gap-3 rounded-full bg-[#f6f2ea]/90 py-1.5 pl-4 pr-1.5 text-sm font-semibold text-[#0f2a20] opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 max-md:opacity-100">
          Enquire
          <ArrowIsland className="size-8 bg-[#0f2a20] text-[#f6f2ea]" size={14} />
        </span>
      </div>
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="font-display text-[2rem] leading-tight">
          <a href="#contact" className="after:absolute after:inset-0 after:content-['']">
            {listing.name}
          </a>
        </h3>
        <p className="font-display text-[1.7rem] leading-tight text-[#8a6a28]">{priceFormat.format(listing.price)}</p>
      </div>
      <p className="mt-1 text-sm text-muted">{listing.area}</p>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-fg/80">{listing.blurb}</p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-fg/75">
        <li className="flex items-center gap-1.5">
          <BedIcon size={17} aria-hidden /> {listing.beds} beds
        </li>
        <li className="flex items-center gap-1.5">
          <BathtubIcon size={17} aria-hidden /> {listing.baths} baths
        </li>
        <li className="flex items-center gap-1.5">
          <RulerIcon size={17} aria-hidden /> {listing.size} m²
        </li>
      </ul>
    </article>
  );
}
