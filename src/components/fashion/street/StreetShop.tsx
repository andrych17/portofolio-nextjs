"use client";

import Image from "next/image";
import { useState } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { street, type Product } from "@/content/fashion/street";
import { useBag } from "./StreetBag";

// Asymmetric 12-column rhythm: a wide card, a narrow one, then the reverse.
const ASPECTS = [
  "md:aspect-[5/4]",
  "md:aspect-[4/5]",
  "md:aspect-[4/5]",
  "md:aspect-[5/4]",
  "md:aspect-square",
  "md:aspect-square",
];

const SPANS = [
  "md:col-span-7",
  "md:col-span-5 md:mt-24",
  "md:col-span-5",
  "md:col-span-7 md:mt-24",
  "md:col-span-6",
  "md:col-span-6 md:mt-16",
];

export function StreetShop() {
  return (
    <section id="shop" aria-labelledby="shop-title" className="mx-auto max-w-[1700px] px-5 py-24 md:px-10 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="street-tag text-accent">(01) The drop</p>
          <MaskText
            as="h2"
            id="shop-title"
            className="mt-5 font-display text-[clamp(2.8rem,8.4vw,8.6rem)]"
            lines={["Drop 07", <span key="s" className="text-fg/35">six of 24.</span>]}
          />
        </div>
        <Reveal y={16} className="max-w-xs text-muted">
          <p>Tap a photo to see the second look. Pick a size, add it to the bag. Everything here ships within 48 hours.</p>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-x-6 gap-y-14 md:mt-20 md:grid-cols-12">
        {street.products.map((p, i) => (
          <li key={p.id} className={SPANS[i]}>
            <Reveal y={48} amount={0.15}>
              <ProductCard product={p} index={i} aspect={ASPECTS[i]} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductCard({ product, index, aspect }: { product: Product; index: number; aspect: string }) {
  const { add } = useBag();
  const only = product.sizes.length === 1 ? product.sizes[0] : "";
  const [size, setSize] = useState(only);
  const [flip, setFlip] = useState(false);
  const [needSize, setNeedSize] = useState(false);
  const [added, setAdded] = useState(false);
  const group = `size-${product.id}`;

  function onAdd() {
    if (!size) {
      setNeedSize(true);
      return;
    }
    add(product, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="group/card">
      <button
        type="button"
        onClick={() => setFlip((f) => !f)}
        aria-pressed={flip}
        aria-label={`${product.name}, show the ${flip ? "first" : "second"} photo`}
        className={`relative block aspect-[4/5] w-full cursor-pointer overflow-hidden bg-surface ${aspect}`}
      >
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 768px) 55vw, 92vw"
          className="object-cover transition-transform duration-[1200ms] ease-studio group-hover/card:scale-[1.03]"
        />
        <Image
          src={product.images[1].src}
          alt={product.images[1].alt}
          fill
          sizes="(min-width: 768px) 55vw, 92vw"
          className={`object-cover transition-opacity duration-700 ease-studio ${flip ? "opacity-100" : "opacity-0"} group-hover/card:opacity-100`}
        />
        <span className="street-tag absolute left-3 top-3 bg-bg px-2.5 py-1.5">{String(index + 1).padStart(2, "0")} / 06</span>
        {product.tag && (
          <span className={`street-tag absolute right-3 top-3 px-2.5 py-1.5 ${product.tag === "New" ? "bg-accent text-accent-fg" : "bg-[var(--s-paper)] text-accent-fg"}`}>{product.tag}</span>
        )}
      </button>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl uppercase leading-none md:text-3xl">{product.name}</h3>
          <p className="street-tag mt-2 text-muted">
            {product.kind} · {product.colour}
          </p>
        </div>
        <p className="font-mono text-lg">${product.price}</p>
      </div>

      <fieldset className="mt-5">
        <legend className="street-tag text-muted">{only ? "Size" : "Pick a size"}</legend>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {product.sizes.map((s) => (
            <label key={s} className="cursor-pointer">
              <input
                type="radio"
                name={group}
                value={s}
                checked={size === s}
                onChange={() => {
                  setSize(s);
                  setNeedSize(false);
                }}
                className="peer sr-only"
              />
              <span className="street-tag flex min-h-11 min-w-11 items-center justify-center px-3 ring-1 ring-fg/25 transition-colors duration-300 peer-checked:bg-accent peer-checked:text-accent-fg peer-checked:ring-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:ring-fg/70">
                {s}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onAdd}
          className="street-tag min-h-12 flex-1 cursor-pointer bg-fg px-6 text-bg transition-colors duration-500 ease-studio hover:bg-accent hover:text-accent-fg sm:flex-none sm:px-10"
        >
          {added ? "Added" : "Add to bag"}
        </button>
        {needSize && (
          <p role="alert" className="street-tag text-accent">
            Pick a size first
          </p>
        )}
      </div>
    </article>
  );
}
