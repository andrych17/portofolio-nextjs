"use client";

import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  DropIcon,
  LeafIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  RecycleIcon,
  ShoppingBagIcon,
  SparkleIcon,
  TrashIcon,
  TruckIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Accordion } from "@/components/Accordion";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { Counter } from "@/components/motion/Counter";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { RiseLines } from "@/components/motion/RiseLines";
import { bloom, type BloomCategory } from "@/content/ecommerce/bloom";
import { useContactForm } from "@/lib/use-contact-form";
import { useMenu } from "@/lib/use-menu";

type BagLine = {
  productId: string;
  format: "bottle" | "refill";
  qty: number;
};

export function BloomStorefront() {
  const menu = useMenu();
  const [category, setCategory] = useState<BloomCategory>("all");
  const [query, setQuery] = useState("");
  const [formatByProduct, setFormatByProduct] = useState<Record<string, "bottle" | "refill">>({});
  const [scentByProduct, setScentByProduct] = useState<Record<string, number>>({});
  const [bagOpen, setBagOpen] = useState(false);
  const [addedKey, setAddedKey] = useState<string | null>(null);
  const [courierId, setCourierId] = useState(bloom.couriers[0].id);
  const [checkoutDone, setCheckoutDone] = useState(false);

  // 3-step ritual bundle state
  const [ritualCleanse, setRitualCleanse] = useState("neroli-cleansing-gel");
  const [ritualTreat, setRitualTreat] = useState("bakuchiol-nectar");
  const [ritualHydrate, setRitualHydrate] = useState("hinoki-hand-balm");

  const [bag, setBag] = useState<BagLine[]>([
    { productId: "neroli-cleansing-gel", format: "refill", qty: 1 },
    { productId: "bakuchiol-nectar", format: "bottle", qty: 1 },
  ]);

  const form = useContactForm("ecommerce/bloom");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bloom.products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.notes.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  const addToBag = (productId: string, format: "bottle" | "refill") => {
    setCheckoutDone(false);
    setBag((prev) => {
      const idx = prev.findIndex((x) => x.productId === productId && x.format === format);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { productId, format, qty: 1 }];
    });
    const key = `${productId}-${format}`;
    setAddedKey(key);
    setTimeout(() => setAddedKey((cur) => (cur === key ? null : cur)), 1300);
  };

  const updateQty = (productId: string, format: "bottle" | "refill", delta: number) => {
    setCheckoutDone(false);
    setBag((prev) =>
      prev
        .map((x) => (x.productId === productId && x.format === format ? { ...x, qty: Math.max(0, x.qty + delta) } : x))
        .filter((x) => x.qty > 0),
    );
  };

  const bagLines = useMemo(() => {
    return bag
      .map((line) => {
        const product = bloom.products.find((p) => p.id === line.productId);
        if (!product) return null;
        const unitPrice = line.format === "refill" ? product.refillPrice : product.bottlePrice;
        const sizeLabel = line.format === "refill" ? product.refillSize : product.bottleSize;
        return {
          ...line,
          product,
          unitPrice,
          sizeLabel,
          lineTotal: unitPrice * line.qty,
          lineWeight: product.weightGrams * line.qty,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [bag]);

  const totalItems = bagLines.reduce((s, x) => s + x.qty, 0);
  const subtotal = bagLines.reduce((s, x) => s + x.lineTotal, 0);
  const totalWeightKg = Math.max(0.4, Number((bagLines.reduce((s, x) => s + x.lineWeight, 0) / 1000).toFixed(2)));
  const activeCourier = bloom.couriers.find((c) => c.id === courierId) ?? bloom.couriers[0];
  const shipping = bagLines.length === 0 ? 0 : Math.round(activeCourier.baseRate + Math.ceil(totalWeightKg) * activeCourier.perKg);
  const grandTotal = subtotal + shipping;

  const ritualProducts = [ritualCleanse, ritualTreat, ritualHydrate]
    .map((id) => bloom.products.find((p) => p.id === id))
    .filter((x): x is NonNullable<typeof x> => x !== undefined);
  const ritualRawTotal = ritualProducts.reduce((s, p) => s + p.bottlePrice, 0);
  const ritualBundlePrice = Math.round(ritualRawTotal * 0.85);

  return (
    <>
      {/* Top bright botanical bar */}
      <div className="border-b border-line bg-[#142e1f] px-4 py-2 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-[#f6faf7]">
        <span className="inline-flex items-center gap-2">
          <RecycleIcon size={14} weight="bold" className="text-[#86efac]" aria-hidden />
          Refill Pouches Save 18% &amp; Cut Plastic by 82% · Free Cold-Pack Over $75
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-5 py-3.5 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Your Brand home">
            <span className="grid size-10 place-items-center rounded-full bg-accent font-display text-lg font-bold italic text-accent-fg">
              YB
            </span>
            <div>
              <span className="block font-display text-xl font-bold leading-none">Your Brand</span>
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Botanical Apothecary</span>
            </div>
          </a>

          <nav aria-label="Store navigation" className="hidden items-center gap-1 lg:flex">
            {[
              { href: "#catalog", label: "Formulas" },
              { href: "#ritual", label: "3-Step Ritual Builder" },
              { href: "#impact", label: "Refill Impact" },
              { href: "#faq", label: "FAQ" },
              { href: "#contact", label: "Refill Tap Bar" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-fg/80 transition-colors hover:bg-surface hover:text-fg"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <MagnifyingGlassIcon size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search neroli, rosehip, fig..."
                aria-label="Search botanical formulas"
                className="h-10 w-48 rounded-full bg-surface pl-9 pr-4 text-xs text-fg ring-1 ring-line placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent xl:w-60"
              />
            </div>

            <button
              type="button"
              onClick={() => setBagOpen(true)}
              aria-label={`Open apothecary bag with ${totalItems} items`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-fg transition-opacity hover:opacity-90"
            >
              <ShoppingBagIcon size={16} weight="bold" aria-hidden />
              <span className="hidden sm:inline">Apothecary Bag</span>
              <span className="grid min-w-5 place-items-center rounded-full bg-bg px-1.5 py-0.5 font-mono text-[11px] font-bold text-fg">
                {totalItems}
              </span>
            </button>

            <button
              type="button"
              onClick={() => menu.setOpen(true)}
              aria-expanded={menu.open}
              aria-controls="bloom-mobile-nav"
              aria-label="Open menu"
              className="grid size-11 place-items-center rounded-full bg-surface text-fg ring-1 ring-line lg:hidden"
            >
              <ListIcon size={20} weight="bold" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {menu.open && (
        <div
          id="bloom-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Apothecary navigation"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-bg p-6 text-fg lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span className="font-display text-2xl font-bold italic">Your Brand · Apothecary</span>
            <button
              ref={menu.closeRef}
              type="button"
              onClick={() => menu.setOpen(false)}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full bg-surface ring-1 ring-line"
            >
              <XIcon size={20} weight="bold" aria-hidden />
            </button>
          </div>
          <nav className="my-auto flex flex-col gap-3 py-8">
            {[
              { href: "#catalog", label: "Botanical Catalog" },
              { href: "#ritual", label: "3-Step Ritual Builder" },
              { href: "#impact", label: "Refill Impact" },
              { href: "#faq", label: "Questions" },
              { href: "#contact", label: "Visit Refill Tap Bar" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => menu.setOpen(false)}
                className="flex items-center justify-between rounded-2xl bg-surface px-5 py-4 font-display text-2xl font-bold"
              >
                {item.label}
                <ArrowUpRightIcon size={20} weight="bold" aria-hidden />
              </a>
            ))}
          </nav>
          <p className="font-mono text-xs text-muted">{bloom.street}, {bloom.city} · {bloom.hours}</p>
        </div>
      )}

      {/* Bright Botanical Hero */}
      <section id="top" aria-labelledby="bloom-h1" className="mx-auto max-w-[1400px] px-5 pb-14 pt-8 md:px-10 md:pb-20 md:pt-14">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>Small-Batch Cold-Pressed Botanicals</Eyebrow>
            <RiseLines
              id="bloom-h1"
              className="mt-4 font-display text-[clamp(2.5rem,5.8vw,5.1rem)] font-bold leading-[0.96] tracking-[-0.02em]"
              lines={[
                "Pure plant chemistry.",
                <span key="2" className="italic text-accent">Refilled, never wasted.</span>,
              ]}
            />
            <p data-speakable className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {bloom.speakable}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#catalog"
                className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent py-2 pl-6 pr-2 font-medium text-accent-fg"
              >
                <span>Shop Formulas &amp; Pouches</span>
                <ArrowIsland className="size-9 bg-black/15" size={15} />
              </a>
              <a
                href="#ritual"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-surface px-6 py-3 text-sm font-semibold text-fg ring-1 ring-line transition-colors hover:bg-fg hover:text-bg"
              >
                <SparkleIcon size={16} weight="fill" className="text-accent" aria-hidden />
                Build 3-Step Ritual (-15%)
              </a>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Extraction</dt>
                <dd className="mt-1 font-display text-xl font-bold">Cold-Pressed</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Refill System</dt>
                <dd className="mt-1 font-display text-xl font-bold">-82% Plastic</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Transit</dt>
                <dd className="mt-1 font-display text-xl font-bold">Thermal Cold-Pack</dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-[2rem] bg-surface p-2 ring-1 ring-line shadow-[0_24px_60px_-24px_rgba(20,46,31,0.14)]">
              <div className="rounded-[calc(2rem-0.5rem)] bg-bg p-4 md:p-5">
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-[#e3efe7]">
                  <Image
                    src="/template/images/ecommerce/bloom/hero.webp"
                    alt="Botanical infusion glass vessel and fresh yellow blossoms on a bright table"
                    fill
                    priority
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-bg/90 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent ring-1 ring-line backdrop-blur-sm">
                    <LeafIcon size={13} weight="fill" aria-hidden />
                    Harvest Lot #N18 · Distilled Tuesday
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-bold">Bitter Orange &amp; Oat Cleansing Gel</h2>
                    <p className="mt-0.5 text-xs text-muted">Neroli · Green Petitgrain · Colloidal Oat</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToBag("neroli-cleansing-gel", "refill");
                      setBagOpen(true);
                    }}
                    className="shrink-0 rounded-full bg-accent px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-fg"
                  >
                    + Add Refill $54
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-line bg-surface py-3.5 overflow-hidden">
        <Marquee speed={30}>
          {bloom.marquee.map((m) => (
            <span key={m} className="mx-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-fg/80">
              <span className="size-1.5 rounded-full bg-accent" />
              {m}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Product Catalog with Interactive Bottle vs Refill Pouch Toggle */}
      <section id="catalog" aria-labelledby="bloom-catalog-h2" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Botanical Dispensary · Glass or Refill Pouch</Eyebrow>
            <h2 id="bloom-catalog-h2" className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Switch any formula to a refill pouch.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted md:text-base">
              Toggle between the UV-amber glass bottle and the 2.5× aluminum spout pouch on every card to compare volume and savings.
            </p>
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Formula categories">
            {bloom.categories.map((cat) => {
              const active = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat.id)}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    active ? "bg-accent font-semibold text-accent-fg" : "bg-surface text-muted ring-1 ring-line hover:text-fg"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="opacity-70">{cat.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, idx) => {
            const fmt = formatByProduct[product.id] ?? "bottle";
            const sIdx = scentByProduct[product.id] ?? 0;
            const scent = product.scents[sIdx] ?? product.scents[0];
            const price = fmt === "refill" ? product.refillPrice : product.bottlePrice;
            const sizeText = fmt === "refill" ? product.refillSize : product.bottleSize;
            const isAdded = addedKey === `${product.id}-${fmt}`;

            return (
              <Reveal key={product.id} delay={(idx % 3) * 0.06} className="min-w-0">
                <article className="flex h-full flex-col rounded-[1.75rem] bg-surface p-1.5 ring-1 ring-line">
                  <div className="flex h-full flex-col rounded-[calc(1.75rem-0.375rem)] bg-bg p-4">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e3efe7]">
                      <Image
                        src={product.image}
                        alt={product.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 92vw"
                        className="object-cover"
                      />
                      {product.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-fg">
                          {product.badge}
                        </span>
                      )}
                      <span className="absolute bottom-3 right-3 rounded-full bg-bg/90 px-2.5 py-1 font-mono text-[10px] font-semibold text-fg ring-1 ring-line backdrop-blur-sm">
                        {scent.batch} · {product.stock} in stock
                      </span>
                    </div>

                    <div className="mt-4 flex flex-1 flex-col">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{product.notes}</p>
                      <div className="mt-1 flex items-start justify-between gap-2">
                        <h3 className="font-display text-2xl font-bold leading-tight">{product.name}</h3>
                        <span className="font-display text-2xl font-bold">${price}</span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">{product.subtitle}</p>

                      {/* Bottle vs Refill Pouch Toggle */}
                      <div className="mt-4 grid grid-cols-2 gap-1.5 rounded-xl bg-surface p-1 ring-1 ring-line">
                        <button
                          type="button"
                          onClick={() => setFormatByProduct((prev) => ({ ...prev, [product.id]: "bottle" }))}
                          className={`rounded-lg py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                            fmt === "bottle" ? "bg-bg font-bold text-fg shadow-xs" : "text-muted hover:text-fg"
                          }`}
                        >
                          Glass · ${product.bottlePrice}
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormatByProduct((prev) => ({ ...prev, [product.id]: "refill" }))}
                          className={`rounded-lg py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                            fmt === "refill" ? "bg-accent font-bold text-accent-fg shadow-xs" : "text-muted hover:text-fg"
                          }`}
                        >
                          Refill · ${product.refillPrice}
                        </button>
                      </div>

                      {/* Scent Swatches + Size */}
                      <div className="mt-3 flex items-center justify-between text-xs text-muted">
                        <div className="flex items-center gap-1.5">
                          {product.scents.map((sc, i) => (
                            <button
                              key={sc.batch}
                              type="button"
                              onClick={() => setScentByProduct((prev) => ({ ...prev, [product.id]: i }))}
                              aria-label={sc.label}
                              className={`size-5 rounded-full ring-1 ring-black/20 ${
                                sIdx === i ? "ring-2 ring-accent ring-offset-2 ring-offset-bg" : "opacity-70"
                              }`}
                              style={{ background: sc.hex }}
                            />
                          ))}
                          <span className="ml-1 text-[11px] font-medium text-fg">{scent.label}</span>
                        </div>
                        <span className="font-mono text-[10px]">{sizeText}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => addToBag(product.id, fmt)}
                        className={`mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                          isAdded ? "bg-[#15803d] text-white" : "bg-fg text-bg hover:bg-accent hover:text-accent-fg"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircleIcon size={15} weight="bold" aria-hidden />
                            Added {sizeText}
                          </>
                        ) : (
                          <>
                            <PlusIcon size={14} weight="bold" aria-hidden />
                            Add {fmt === "refill" ? "Refill Pouch" : "Glass Bottle"} · ${price}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Interactive 3-Step Daily Ritual Bundle Builder */}
      <section id="ritual" aria-labelledby="ritual-h2" className="border-y border-line bg-surface/75 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Custom Regimen Configurator</Eyebrow>
              <h2 id="ritual-h2" className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
                Build your 3-step botanical ritual &amp; save 15%.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                Pair one cleanser, one concentrated treatment oil, and one hydrating mist or balm. All three ship together in our reusable cotton apothecary drawstring bag.
              </p>

              <div className="mt-6 rounded-3xl bg-bg p-6 ring-1 ring-line">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Selected 3-Step Bundle</span>
                  <span className="rounded-full bg-accent/15 px-3 py-1 font-mono text-xs font-bold text-accent">15% Bundle Savings</span>
                </div>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {ritualProducts.map((p, i) => (
                    <li key={p.id} className="flex items-center justify-between">
                      <span>0{i + 1}. {p.name}</span>
                      <span className="font-mono text-xs text-muted">${p.bottlePrice}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <div>
                    <span className="font-mono text-xs text-muted line-through">${ritualRawTotal}</span>
                    <span className="ml-2 font-display text-3xl font-bold text-fg">${ritualBundlePrice}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      ritualProducts.forEach((p) => addToBag(p.id, "bottle"));
                      setBagOpen(true);
                    }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent-fg"
                  >
                    Add All 3 to Bag
                    <ArrowUpRightIcon size={15} weight="bold" aria-hidden />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { label: "Step 01 · Cleanse", value: ritualCleanse, setter: setRitualCleanse, options: bloom.products.filter((p) => p.step === "cleanse") },
                { label: "Step 02 · Treat", value: ritualTreat, setter: setRitualTreat, options: bloom.products.filter((p) => p.step === "treat") },
                { label: "Step 03 · Hydrate", value: ritualHydrate, setter: setRitualHydrate, options: bloom.products.filter((p) => p.step === "hydrate") },
              ].map((col) => (
                <div key={col.label} className="rounded-3xl bg-bg p-4 ring-1 ring-line">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-accent">{col.label}</p>
                  <div className="mt-3 space-y-2.5">
                    {col.options.map((opt) => {
                      const active = col.value === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => col.setter(opt.id)}
                          className={`w-full rounded-2xl p-3 text-left transition-all ${
                            active ? "bg-surface ring-2 ring-accent" : "bg-surface/50 ring-1 ring-line hover:bg-surface"
                          }`}
                        >
                          <p className="font-display text-base font-bold leading-snug">{opt.name}</p>
                          <p className="mt-1 font-mono text-[10px] text-muted">{opt.bottleSize} · ${opt.bottlePrice}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="impact" aria-labelledby="impact-h2" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
        <h2 id="impact-h2" className="sr-only">Refill sustainability impact</h2>
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-surface p-6 ring-1 ring-line md:grid-cols-4 md:p-10">
          {bloom.stats.map((st) => (
            <div key={st.label} className="border-l border-line pl-4 first:border-l-0 first:pl-0">
              <p className="font-display text-3xl font-bold text-accent md:text-5xl">
                <Counter value={st.value} suffix={st.suffix} />
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted md:text-sm">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="bloom-faq-h2" className="border-t border-line bg-surface/40 py-20">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Refill Bar &amp; Cold-Pack Transit</Eyebrow>
            <h2 id="bloom-faq-h2" className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Frequently asked questions.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <Accordion
              items={bloom.faqs}
              className="divide-y divide-line rounded-3xl bg-bg px-6 ring-1 ring-line"
              itemClassName=""
              questionClassName="py-5 text-left font-display text-xl font-bold"
              answerClassName="pb-5 text-sm leading-relaxed text-muted"
            />
          </div>
        </div>
      </section>

      {/* Contact / Wholesale */}
      <section id="contact" aria-labelledby="bloom-contact-h2" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-10 rounded-[2.25rem] bg-surface p-6 ring-1 ring-line md:p-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Refill Tap Bar &amp; Hotel Amenities</Eyebrow>
            <h2 id="bloom-contact-h2" className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Visit our botanical tap bar or request spa bulk sizes.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {bloom.street}, {bloom.city} · {bloom.hours}
            </p>
          </div>
          <div className="lg:col-span-7">
            <form onSubmit={form.onSubmit} noValidate className="rounded-3xl bg-bg p-6 ring-1 ring-line md:p-8">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="bloom-name" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Name</label>
                  <input id="bloom-name" name="name" type="text" required placeholder="Clara Wijaya" className="mt-1.5 h-12 w-full rounded-xl bg-surface px-4 text-sm text-fg ring-1 ring-line" />
                  {form.errors.name && <p className="mt-1 text-xs text-accent">{form.errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="bloom-email" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Email</label>
                  <input id="bloom-email" name="email" type="email" required placeholder="clara@domain.com" className="mt-1.5 h-12 w-full rounded-xl bg-surface px-4 text-sm text-fg ring-1 ring-line" />
                  {form.errors.email && <p className="mt-1 text-xs text-accent">{form.errors.email}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="bloom-msg" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Message</label>
                <textarea id="bloom-msg" name="message" rows={3} required defaultValue="Hi Your Brand apothecary team, I would like to inquire about 5L refill dispensers for our studio." className="mt-1.5 w-full rounded-xl bg-surface p-4 text-sm text-fg ring-1 ring-line" />
                {form.errors.message && <p className="mt-1 text-xs text-accent">{form.errors.message}</p>}
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <button type="submit" disabled={form.status === "sending"} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-fg">
                  {form.status === "sending" ? "Sending..." : "Send Apothecary Inquiry"}
                  <ArrowUpRightIcon size={15} weight="bold" aria-hidden />
                </button>
                {form.status === "sent" && <p role="status" className="font-mono text-xs font-semibold text-accent">{form.notice}</p>}
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-surface pb-28 pt-12">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 px-5 md:flex-row md:items-center md:px-10">
          <p className="font-display text-xl font-bold">Your Brand · Botanical Apothecary &amp; Refill Bar</p>
          <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <a href="#catalog" className="hover:text-fg">Formulas</a>
            <a href="#ritual" className="hover:text-fg">Ritual Builder</a>
            <Link href="/template" className="text-accent hover:underline">All Templates →</Link>
          </div>
        </div>
      </footer>

      {/* Slide-over Apothecary Bag */}
      {bagOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs" role="dialog" aria-modal="true" aria-label="Apothecary shopping bag">
          <div className="flex h-full w-full max-w-lg flex-col justify-between bg-bg p-6 text-fg shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h2 className="font-display text-2xl font-bold">Your Apothecary Bag</h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{totalItems} items · {totalWeightKg} kg</p>
              </div>
              <button type="button" onClick={() => setBagOpen(false)} aria-label="Close bag" className="grid size-10 place-items-center rounded-full bg-surface ring-1 ring-line">
                <XIcon size={18} weight="bold" aria-hidden />
              </button>
            </div>

            <div className="my-4 flex-1 space-y-3 overflow-y-auto pr-1">
              {bagLines.map((item) => (
                <div key={`${item.productId}-${item.format}`} className="flex items-center justify-between gap-3 rounded-2xl bg-surface p-3.5 ring-1 ring-line">
                  <div className="min-w-0">
                    <p className="truncate font-display text-base font-bold">{item.product.name}</p>
                    <p className="font-mono text-[10px] text-muted">{item.sizeLabel}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button type="button" onClick={() => updateQty(item.productId, item.format, -1)} aria-label="Decrease" className="grid size-8 place-items-center rounded-full bg-bg ring-1 ring-line">
                      {item.qty === 1 ? <TrashIcon size={13} aria-hidden /> : <MinusIcon size={13} aria-hidden />}
                    </button>
                    <span className="w-5 text-center font-mono text-xs font-bold">{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.productId, item.format, 1)} aria-label="Increase" className="grid size-8 place-items-center rounded-full bg-bg ring-1 ring-line">
                      <PlusIcon size={13} aria-hidden />
                    </button>
                    <span className="w-12 text-right font-mono text-xs font-bold">${item.lineTotal}</span>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-surface p-4 ring-1 ring-line">
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
                  <TruckIcon size={15} weight="bold" className="text-accent" aria-hidden />
                  Cold-Pack Delivery Method
                </div>
                <div className="mt-2.5 space-y-2">
                  {bloom.couriers.map((c) => {
                    const cost = Math.round(c.baseRate + Math.ceil(totalWeightKg) * c.perKg);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setCourierId(c.id)}
                        className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs ${
                          courierId === c.id ? "bg-bg font-semibold ring-2 ring-accent" : "bg-bg/60 text-muted"
                        }`}
                      >
                        <span>{c.name}</span>
                        <span className="font-mono font-bold text-fg">{cost === 0 ? "FREE" : `$${cost}`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="border-t border-line pt-4">
              <div className="flex justify-between font-display text-xl font-bold">
                <span>Total (incl. delivery)</span>
                <span>${grandTotal}</span>
              </div>
              {checkoutDone ? (
                <div className="mt-3 rounded-2xl bg-accent p-3.5 text-center text-xs font-medium text-accent-fg">
                  Demo Order Confirmed · Fresh botanical batch reserved for cold-pack dispatch.
                </div>
              ) : (
                <button
                  type="button"
                  disabled={bagLines.length === 0}
                  onClick={() => setCheckoutDone(true)}
                  className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent-fg"
                >
                  Complete Instant Checkout · ${grandTotal}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
