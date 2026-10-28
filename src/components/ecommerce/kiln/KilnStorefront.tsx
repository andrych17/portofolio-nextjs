"use client";

import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  MinusIcon,
  PackageIcon,
  PlusIcon,
  QrCodeIcon,
  ShoppingBagIcon,
  SparkleIcon,
  StorefrontIcon,
  TrashIcon,
  TruckIcon,
  XIcon,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Accordion } from "@/components/Accordion";
import { ArrowIsland } from "@/components/ArrowIsland";
import { Eyebrow } from "@/components/Eyebrow";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Counter } from "@/components/motion/Counter";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { RiseLines } from "@/components/motion/RiseLines";
import { ScrollWords } from "@/components/motion/ScrollWords";
import { Tilt } from "@/components/motion/Tilt";
import { kiln, type KilnCategory } from "@/content/ecommerce/kiln";
import { useContactForm } from "@/lib/use-contact-form";
import { useMenu } from "@/lib/use-menu";

type CartLine = {
  productId: string;
  variantIndex: number;
  qty: number;
};

export function KilnStorefront() {
  const menu = useMenu();
  const [category, setCategory] = useState<KilnCategory>("all");
  const [query, setQuery] = useState("");
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [courierId, setCourierId] = useState(kiln.couriers[0].id);
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "va" | "card">("qris");
  const [checkoutDone, setCheckoutDone] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(kiln.workshops[0].code);

  const [cart, setCart] = useState<CartLine[]>([
    { productId: "stoneware-block", variantIndex: 0, qty: 1 },
    { productId: "mineral-glaze", variantIndex: 0, qty: 2 },
  ]);

  const form = useContactForm("ecommerce/kiln");

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return kiln.products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.variants.some((v) => v.label.toLowerCase().includes(q) || v.lot.toLowerCase().includes(q))
      );
    });
  }, [category, query]);

  const addToCart = (productId: string, variantIndex: number) => {
    setCheckoutDone(false);
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.productId === productId && item.variantIndex === variantIndex);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { productId, variantIndex, qty: 1 }];
    });
    const key = `${productId}-${variantIndex}`;
    setJustAdded(key);
    setTimeout(() => setJustAdded((cur) => (cur === key ? null : cur)), 1400);
  };

  const updateQty = (productId: string, variantIndex: number, delta: number) => {
    setCheckoutDone(false);
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.variantIndex === variantIndex
            ? { ...item, qty: Math.max(0, item.qty + delta) }
            : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const cartDetails = useMemo(() => {
    return cart
      .map((line) => {
        const product = kiln.products.find((p) => p.id === line.productId);
        if (!product) return null;
        const variant = product.variants[line.variantIndex] ?? product.variants[0];
        return {
          ...line,
          product,
          variant,
          lineTotal: product.price * line.qty,
          lineWeightGrams: product.weightGrams * line.qty,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [cart]);

  const totalItems = cartDetails.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cartDetails.reduce((acc, item) => acc + item.lineTotal, 0);
  const totalWeightKg = Math.max(0.5, Number((cartDetails.reduce((acc, item) => acc + item.lineWeightGrams, 0) / 1000).toFixed(2)));
  const activeCourier = kiln.couriers.find((c) => c.id === courierId) ?? kiln.couriers[0];
  const shippingCost = cartDetails.length === 0 ? 0 : Math.round(activeCourier.baseRate + Math.ceil(totalWeightKg) * activeCourier.perKg);
  const grandTotal = subtotal + shippingCost;

  return (
    <>
      {/* Top announcement bar */}
      <div className="border-b border-line bg-[#1e1916] px-4 py-2 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-[#faf6ef]">
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 animate-blink rounded-full bg-[#e07a5f]" />
          Flagship Inventory Live Sync · Same-day courier dispatch before 15:00
        </span>
      </div>

      {/* Sticky E-Commerce Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-5 py-3.5 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Your Brand home">
            <span className="grid size-10 place-items-center rounded-2xl bg-accent font-display text-lg font-bold text-accent-fg shadow-sm">
              YB
            </span>
            <div>
              <span className="block font-display text-lg font-bold leading-none tracking-tight">Your Brand</span>
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Ceramic &amp; Craft Supply</span>
            </div>
          </a>

          <nav aria-label="Store sections" className="hidden items-center gap-1 lg:flex">
            {[
              { href: "#catalog", label: "Catalog" },
              { href: "#studio", label: "Studio & Workshops" },
              { href: "#sync", label: "How Sync Works" },
              { href: "#faq", label: "FAQ" },
              { href: "#contact", label: "Wholesale & Visit" },
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

          {/* Search + Cart + Mobile menu button */}
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <MagnifyingGlassIcon
                size={15}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  const el = document.getElementById("catalog");
                  if (e.target.value.length === 1 && el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                placeholder="Search clay, glaze, lot..."
                aria-label="Search products by name, SKU, or batch lot"
                className="h-10 w-48 rounded-full bg-surface pl-9 pr-4 text-xs text-fg ring-1 ring-line placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent xl:w-64"
              />
            </div>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open shopping bag with ${totalItems} items`}
              className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-fg px-4 py-2 text-xs font-semibold text-bg transition-colors hover:bg-accent hover:text-accent-fg"
            >
              <ShoppingBagIcon size={16} weight="bold" aria-hidden />
              <span className="hidden sm:inline">Bag</span>
              <span className="grid min-w-5 place-items-center rounded-full bg-accent px-1.5 py-0.5 font-mono text-[11px] font-bold text-accent-fg group-hover:bg-bg group-hover:text-fg">
                {totalItems}
              </span>
            </button>

            <button
              type="button"
              onClick={() => menu.setOpen(true)}
              aria-expanded={menu.open}
              aria-controls="kiln-mobile-nav"
              aria-label="Open navigation menu"
              className="grid size-11 place-items-center rounded-full bg-surface text-fg ring-1 ring-line lg:hidden"
            >
              <ListIcon size={20} weight="bold" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Sheet */}
      {menu.open && (
        <div
          id="kiln-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Store navigation"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-bg p-6 text-fg lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span className="font-display text-xl font-bold">Your Brand · Storefront</span>
            <button
              ref={menu.closeRef}
              type="button"
              onClick={() => menu.setOpen(false)}
              aria-label="Close navigation menu"
              className="grid size-11 place-items-center rounded-full bg-surface ring-1 ring-line"
            >
              <XIcon size={20} weight="bold" aria-hidden />
            </button>
          </div>
          <nav className="my-auto flex flex-col gap-3 py-8">
            {[
              { href: "#catalog", label: "Supply Catalog" },
              { href: "#studio", label: "Studio & Workshops" },
              { href: "#sync", label: "Store-to-Door Sync" },
              { href: "#faq", label: "Questions & Shipping" },
              { href: "#contact", label: "Wholesale & Flagship" },
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
          <div className="rounded-2xl bg-surface p-4 font-mono text-xs text-muted">
            <p className="font-semibold text-fg">{kiln.street}, {kiln.city}</p>
            <p className="mt-1">{kiln.hours}</p>
          </div>
        </div>
      )}

      {/* Storefront Hero */}
      <section id="top" aria-labelledby="kiln-h1" className="mx-auto max-w-[1400px] px-5 pb-14 pt-8 md:px-10 md:pb-20 md:pt-14">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>Batch-Tracked Craft Supply &amp; Open Studio</Eyebrow>
            <RiseLines
              id="kiln-h1"
              className="mt-4 font-display text-[clamp(2.35rem,5.4vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.02em]"
              lines={[
                "Thoughtfully stocked",
                <span key="2" className="italic text-accent">for the mindful maker.</span>,
              ]}
            />
            <p data-speakable className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              {kiln.speakable}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.22}>
                <a
                  href="#catalog"
                  className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent py-2 pl-6 pr-2 font-medium text-accent-fg transition-transform duration-300 ease-studio hover:-translate-y-0.5"
                >
                  <span>Browse Supply Catalog</span>
                  <ArrowIsland className="size-9 bg-black/15" size={15} />
                </a>
              </Magnetic>
              <Magnetic strength={0.18}>
                <a
                  href="#studio"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-surface px-6 py-3 text-sm font-semibold text-fg ring-1 ring-line transition-colors hover:bg-fg hover:text-bg"
                >
                  <SparkleIcon size={16} weight="fill" className="text-accent" aria-hidden />
                  Book Studio Wheel Pass
                </a>
              </Magnetic>
            </div>

            {/* Live shelf trust pills */}
            <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-line pt-6">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Shelf Sync</dt>
                <dd className="mt-1 font-display text-lg font-bold md:text-xl">Real-Time POS</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Glaze Lots</dt>
                <dd className="mt-1 font-display text-lg font-bold md:text-xl">Batch Verified</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Checkout</dt>
                <dd className="mt-1 font-display text-lg font-bold md:text-xl">QRIS &amp; Courier</dd>
              </div>
            </dl>
          </div>

          {/* Right featured showcase card with 3D Tilt + ClipReveal */}
          <div className="lg:col-span-5">
            <Tilt max={6} className="rounded-[2rem] bg-surface p-2 ring-1 ring-line shadow-[0_24px_60px_-24px_rgba(30,25,22,0.18)]">
              <div className="overflow-hidden rounded-[calc(2rem-0.5rem)] bg-bg p-4 md:p-5">
                <ClipReveal direction="bottom" immediate className="aspect-[16/11] rounded-2xl bg-[#e7dfd3]">
                  <Image
                    src="/template/images/ecommerce/kiln/hero.webp"
                    alt="Curated ceramic tools, stoneware samples and studio vessels on a worktable"
                    fill
                    priority
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#1e1916]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#faf6ef] backdrop-blur-sm">
                    <StorefrontIcon size={13} weight="bold" aria-hidden />
                    In-Store Shelf #A4
                  </span>
                </ClipReveal>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Featured Kiln Batch · LOT-26B4</span>
                    <h2 className="mt-1 font-display text-xl font-bold">Speckled Buff Stoneware + Ash Glaze Bundle</h2>
                    <p className="mt-1 text-xs text-muted">Matched Cone 6 shrinkage rate · 34 bags on shelf</p>
                  </div>
                  <span className="shrink-0 rounded-xl bg-surface px-3 py-1.5 font-display text-lg font-bold ring-1 ring-line">
                    $28
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3.5">
                  <div className="flex items-center gap-1.5">
                    {kiln.products[0].variants.map((v, idx) => (
                      <span
                        key={v.lot}
                        title={`${v.label} (${v.lot})`}
                        className={`size-5 rounded-full ring-1 ring-black/20 ${idx === 0 ? "ring-2 ring-accent ring-offset-2 ring-offset-bg" : ""}`}
                        style={{ background: v.hex }}
                      />
                    ))}
                    <span className="ml-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">3 clay bodies</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart("stoneware-block", 0);
                      setCartOpen(true);
                    }}
                    className="inline-flex min-h-10 items-center gap-2 rounded-full bg-fg px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-bg transition-colors hover:bg-accent hover:text-accent-fg"
                  >
                    <PlusIcon size={13} weight="bold" aria-hidden />
                    Quick Add
                  </button>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* Marquee Proof Strip */}
      <div className="border-y border-line bg-surface py-3.5 overflow-hidden">
        <Marquee speed={32}>
          {kiln.marquee.map((item) => (
            <span key={item} className="mx-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-fg/80">
              <span className="size-1.5 rounded-full bg-accent" />
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ScrollWords Ceramic Craft Manifesto */}
      <section aria-label="Craft philosophy" className="mx-auto max-w-[1400px] px-5 pt-16 md:px-10 md:pt-24">
        <div className="rounded-[2.25rem] bg-surface/80 p-8 ring-1 ring-line md:p-14">
          <Eyebrow>Milled &amp; Tested in Small Batches</Eyebrow>
          <ScrollWords
            className="mt-4 font-display text-[clamp(1.65rem,3.4vw,3rem)] font-bold leading-[1.18] tracking-[-0.015em] text-fg"
            text="Every stoneware block and mineral glaze bucket is test-fired in our community kiln before the lot number goes live on our shelf."
          />
        </div>
      </section>

      {/* Interactive Storefront Catalog */}
      <section id="catalog" aria-labelledby="catalog-heading" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Online Catalog · Live Shelf Quantities</Eyebrow>
            <h2 id="catalog-heading" className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Shop by category &amp; batch lot.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted md:text-base">
              Tap any color or clay swatch to inspect its exact milling lot code and live flagship store shelf count before adding to your bag.
            </p>
          </div>

          {/* Category filter pills + mobile search */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative sm:hidden">
              <MagnifyingGlassIcon size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search clay, glaze, lot..."
                aria-label="Search catalog"
                className="h-11 w-full rounded-full bg-surface pl-9 pr-4 text-xs text-fg ring-1 ring-line placeholder:text-muted"
              />
            </div>
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product categories">
              {kiln.categories.map((cat) => {
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
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-surface p-12 text-center ring-1 ring-line">
            <p className="font-display text-xl font-bold">No supplies match &ldquo;{query}&rdquo;.</p>
            <p className="mt-2 text-sm text-muted">Try searching by clay body, glaze name, or reset the filter below.</p>
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setQuery("");
              }}
              className="mt-5 inline-flex min-h-11 items-center rounded-full bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-accent-fg"
            >
              Reset Catalog Filter
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product, idx) => {
              const vIdx = selectedVariants[product.id] ?? 0;
              const activeVariant = product.variants[vIdx] ?? product.variants[0];
              const addedKey = `${product.id}-${vIdx}`;
              const isAdded = justAdded === addedKey;

              return (
                <Reveal key={product.id} delay={(idx % 4) * 0.05} className="min-w-0">
                  <Tilt max={5} className="h-full">
                    <article className="group flex h-full flex-col rounded-[1.75rem] bg-surface p-1.5 ring-1 ring-line transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(30,25,22,0.16)]">
                      <div className="flex h-full flex-col rounded-[calc(1.75rem-0.375rem)] bg-bg p-3.5">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e7dfd3]">
                          <Image
                            src={product.image}
                            alt={product.alt}
                            fill
                            sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 92vw"
                            className="object-cover transition-transform duration-700 ease-studio group-hover:scale-105"
                          />
                          <motion.div
                            key={activeVariant.lot}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.22 }}
                            transition={{ duration: 0.45 }}
                            className="pointer-events-none absolute inset-0 mix-blend-multiply"
                            style={{ backgroundColor: activeVariant.hex }}
                          />
                          {product.badge && (
                            <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-fg">
                              {product.badge}
                            </span>
                          )}
                          <span className="absolute bottom-2.5 right-2.5 rounded-full bg-[#1e1916]/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#faf6ef] backdrop-blur-sm">
                            {product.coneRange}
                          </span>
                        </div>

                      <div className="mt-4 flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                            {product.sku} · {product.unit}
                          </span>
                          <span className="font-display text-lg font-bold text-fg">${product.price}</span>
                        </div>

                        <h3 className="mt-1 font-display text-lg font-bold leading-snug">{product.name}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted">{product.subtitle}</p>

                        {/* Variant Swatch Selector */}
                        <div className="mt-4 rounded-xl bg-surface/80 p-2.5 ring-1 ring-line">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-xs font-semibold text-fg">{activeVariant.label}</span>
                            <span className="shrink-0 font-mono text-[10px] text-accent">{activeVariant.lot}</span>
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5" role="group" aria-label={`Select variant for ${product.name}`}>
                              {product.variants.map((v, i) => (
                                <button
                                  key={v.lot}
                                  type="button"
                                  onClick={() => setSelectedVariants((prev) => ({ ...prev, [product.id]: i }))}
                                  aria-label={`${v.label} (${v.lot})`}
                                  aria-pressed={vIdx === i}
                                  className={`size-6 rounded-full ring-1 ring-black/25 transition-transform ${
                                    vIdx === i ? "scale-110 ring-2 ring-accent ring-offset-2 ring-offset-bg" : "opacity-75 hover:opacity-100"
                                  }`}
                                  style={{ background: v.hex }}
                                />
                              ))}
                            </div>
                            <span className="font-mono text-[10px] text-muted">
                              {activeVariant.stock} in stock
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => addToCart(product.id, vIdx)}
                          className={`mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                            isAdded
                              ? "bg-[#3d5a45] text-[#faf6ef]"
                              : "bg-fg text-bg hover:bg-accent hover:text-accent-fg"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <CheckCircleIcon size={15} weight="bold" aria-hidden />
                              Added {activeVariant.lot}
                            </>
                          ) : (
                            <>
                              <PlusIcon size={14} weight="bold" aria-hidden />
                              Add to Bag · ${product.price}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                  </Tilt>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      {/* Studio & Co-Working Workshop Section (Asymmetric 5/7 layout) */}
      <section id="studio" aria-labelledby="studio-heading" className="border-y border-line bg-surface/65 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Creative Space &amp; Kiln Room</Eyebrow>
              <h2 id="studio-heading" className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
                More than a supply shop. A second home for makers.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                Right behind our retail shelves sits an 18-wheel sunlit pottery floor. Buy your stoneware bag at the counter, claim a wheel for the afternoon, and leave your greenware on our damp-room racks for firing.
              </p>

              <div className="mt-6 overflow-hidden rounded-3xl bg-bg p-2 ring-1 ring-line">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image
                    src="/template/images/ecommerce/kiln/studio.webp"
                    alt="Sunlit communal wooden table and shelves inside the ceramic studio"
                    fill
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between px-3 py-2.5 font-mono text-[11px] text-muted">
                  <span>48 Kiln Yard Lane · Studio Floor</span>
                  <span className="text-accent">3 Skutt Electric Kilns</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-col gap-4">
                {kiln.workshops.map((ws) => {
                  const active = selectedWorkshop === ws.code;
                  return (
                    <div
                      key={ws.code}
                      onClick={() => setSelectedWorkshop(ws.code)}
                      className={`cursor-pointer rounded-3xl p-6 transition-all ${
                        active
                          ? "bg-bg ring-2 ring-accent shadow-[0_20px_50px_-20px_rgba(30,25,22,0.16)]"
                          : "bg-bg/70 ring-1 ring-line hover:bg-bg"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent ring-1 ring-line">
                          {ws.code} · {ws.level}
                        </span>
                        <span className="font-mono text-xs font-semibold text-[#3d5a45]">{ws.spots}</span>
                      </div>
                      <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                        <h3 className="font-display text-2xl font-bold">{ws.title}</h3>
                        <span className="font-display text-xl font-bold text-accent">{ws.price}</span>
                      </div>
                      <p className="mt-1 font-mono text-xs text-muted">{ws.schedule}</p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{ws.summary}</p>
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                          Includes tools, apron &amp; reclaim clay
                        </span>
                        <a
                          href="#contact"
                          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-fg px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-bg hover:bg-accent hover:text-accent-fg"
                        >
                          Reserve {ws.code}
                          <ArrowUpRightIcon size={14} weight="bold" aria-hidden />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats + Store-to-Door Process */}
      <section id="sync" aria-labelledby="sync-heading" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-surface p-6 ring-1 ring-line md:grid-cols-4 md:p-10">
          {kiln.stats.map((st) => (
            <div key={st.label} className="border-l border-line pl-4 first:border-l-0 first:pl-0">
              <p className="font-display text-3xl font-bold text-accent md:text-5xl">
                <Counter value={st.value} suffix={st.suffix} />
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted md:text-sm">{st.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <Eyebrow>Omnichannel Retail Engine</Eyebrow>
          <h2 id="sync-heading" className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
            From our physical shelves to your studio door.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {kiln.steps.map((s) => (
              <div key={s.no} className="rounded-3xl bg-surface p-7 ring-1 ring-line">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Step {s.no}</span>
                <h3 className="mt-3 font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
          {kiln.testimonials.map((t) => (
            <blockquote key={t.name} className="flex flex-col justify-between rounded-3xl bg-surface/60 p-7 ring-1 ring-line">
              <p className="font-display text-lg italic leading-relaxed text-fg">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6 border-t border-line pt-4">
                <p className="font-semibold text-fg">{t.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" aria-labelledby="faq-heading" className="border-t border-line bg-surface/40 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Shipping, Lots &amp; Firing</Eyebrow>
            <h2 id="faq-heading" className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Common questions from makers.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              Need a custom pallet quote or have a question about cone compatibility? Reach our studio desk below.
            </p>
          </div>
          <div className="lg:col-span-7">
            <Accordion
              items={kiln.faqs}
              className="divide-y divide-line rounded-3xl bg-bg px-6 ring-1 ring-line"
              itemClassName=""
              questionClassName="py-5 text-left font-display text-lg font-bold"
              answerClassName="pb-5 text-sm leading-relaxed text-muted"
            />
          </div>
        </div>
      </section>

      {/* Wholesale, Workshop & Store Visit Contact Section */}
      <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-10 rounded-[2.25rem] bg-surface p-6 ring-1 ring-line md:p-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Flagship Counter &amp; Wholesale</Eyebrow>
            <h2 id="contact-heading" className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Order bulk clay, reserve a wheel, or visit the store.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Send us your studio list or workshop date and our counter team will confirm batch availability and courier rates within two hours.
            </p>

            <dl className="mt-8 space-y-4 border-t border-line pt-6 text-sm">
              <div className="flex items-start gap-3">
                <MapPinIcon size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Flagship Store &amp; Kiln Room</dt>
                  <dd className="mt-0.5 font-medium">{kiln.street}, {kiln.city} {kiln.postalCode}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <StorefrontIcon size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Store Hours</dt>
                  <dd className="mt-0.5 font-medium">{kiln.hours}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <PackageIcon size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Direct Desk</dt>
                  <dd className="mt-0.5 font-medium">
                    <a href={`mailto:${kiln.email}`} className="underline underline-offset-4 hover:text-accent">{kiln.email}</a>
                    {" · "}
                    <a href={`tel:${kiln.phone.replace(/\s/g, "")}`} className="underline underline-offset-4 hover:text-accent">{kiln.phone}</a>
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={form.onSubmit} noValidate className="rounded-3xl bg-bg p-6 ring-1 ring-line md:p-8">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="kiln-name" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Your Name
                  </label>
                  <input
                    id="kiln-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Nadia Kusuma"
                    className="mt-1.5 h-12 w-full rounded-xl bg-surface px-4 text-sm text-fg ring-1 ring-line placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {form.errors.name && <p className="mt-1 text-xs text-accent">{form.errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="kiln-email" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Email Address
                  </label>
                  <input
                    id="kiln-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@studio.com"
                    className="mt-1.5 h-12 w-full rounded-xl bg-surface px-4 text-sm text-fg ring-1 ring-line placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {form.errors.email && <p className="mt-1 text-xs text-accent">{form.errors.email}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="kiln-message" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  Order / Workshop Inquiry
                </label>
                <textarea
                  id="kiln-message"
                  name="message"
                  rows={4}
                  required
                  defaultValue={`Hi Your Brand team, I would like to inquire about batch availability and reserve ${selectedWorkshop}.`}
                  className="mt-1.5 w-full rounded-xl bg-surface p-4 text-sm text-fg ring-1 ring-line placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {form.errors.message && <p className="mt-1 text-xs text-accent">{form.errors.message}</p>}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={form.status === "sending"}
                  className="inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-7 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-fg transition-opacity disabled:opacity-50"
                >
                  {form.status === "sending" ? "Sending to Counter..." : "Send Store Inquiry"}
                  <ArrowUpRightIcon size={16} weight="bold" aria-hidden />
                </button>
                {form.status === "sent" && (
                  <p role="status" className="font-mono text-xs font-semibold text-[#3d5a45]">
                    {form.notice}
                  </p>
                )}
                {form.status === "error" && (
                  <p role="alert" className="font-mono text-xs text-accent">
                    {form.notice}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer with pb-28 clearance for DemoBar */}
      <footer className="border-t border-line bg-surface pb-28 pt-12">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-6 px-5 md:flex-row md:items-center md:px-10">
          <div>
            <p className="font-display text-xl font-bold">Your Brand · Ceramic &amp; Craft Storefront</p>
            <p className="mt-1 font-mono text-xs text-muted">
              © 2026 Your Brand · {kiln.street}, {kiln.city}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <a href="#catalog" className="hover:text-fg">Catalog</a>
            <a href="#studio" className="hover:text-fg">Workshops</a>
            <button type="button" onClick={() => setCartOpen(true)} className="hover:text-fg">
              Bag ({totalItems})
            </button>
            <Link href="/showcase" className="text-accent hover:underline">
              Back to Showcase →
            </Link>
          </div>
        </div>
      </footer>

      {/* Slide-Over Cart & Shipping Estimator Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs" role="dialog" aria-modal="true" aria-label="Shopping bag and shipping calculator">
          <div className="flex h-full w-full max-w-lg flex-col justify-between bg-bg p-6 text-fg shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h2 className="font-display text-2xl font-bold">Your Studio Bag</h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                  {totalItems} items · {totalWeightKg} kg parcel weight
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping bag"
                className="grid size-10 place-items-center rounded-full bg-surface ring-1 ring-line"
              >
                <XIcon size={18} weight="bold" aria-hidden />
              </button>
            </div>

            <div className="my-4 flex-1 space-y-4 overflow-y-auto pr-1">
              {cartDetails.length === 0 ? (
                <div className="rounded-2xl bg-surface p-8 text-center">
                  <p className="font-display text-lg font-bold">Your bag is empty.</p>
                  <p className="mt-1 text-xs text-muted">Add clay bags, glaze jars, or starter kits from the catalog.</p>
                </div>
              ) : (
                <>
                  {cartDetails.map((item) => (
                    <div
                      key={`${item.productId}-${item.variantIndex}`}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-surface p-3.5 ring-1 ring-line"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="size-8 shrink-0 rounded-full ring-1 ring-black/20"
                          style={{ background: item.variant.hex }}
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <p className="truncate font-display text-sm font-bold">{item.product.name}</p>
                          <p className="font-mono text-[10px] text-muted">
                            {item.variant.label} · <span className="text-accent">{item.variant.lot}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQty(item.productId, item.variantIndex, -1)}
                          aria-label={`Decrease quantity of ${item.product.name}`}
                          className="grid size-8 place-items-center rounded-full bg-bg ring-1 ring-line"
                        >
                          {item.qty === 1 ? <TrashIcon size={13} aria-hidden /> : <MinusIcon size={13} aria-hidden />}
                        </button>
                        <span className="w-5 text-center font-mono text-xs font-bold">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.productId, item.variantIndex, 1)}
                          aria-label={`Increase quantity of ${item.product.name}`}
                          className="grid size-8 place-items-center rounded-full bg-bg ring-1 ring-line"
                        >
                          <PlusIcon size={13} aria-hidden />
                        </button>
                        <span className="ml-1 w-12 text-right font-mono text-xs font-bold">${item.lineTotal}</span>
                      </div>
                    </div>
                  ))}

                  {/* Dynamic Courier Estimator */}
                  <div className="rounded-2xl bg-surface p-4 ring-1 ring-line">
                    <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg">
                      <TruckIcon size={15} weight="bold" className="text-accent" aria-hidden />
                      Shipping &amp; Pickup Estimator ({totalWeightKg} kg)
                    </div>
                    <div className="mt-3 space-y-2">
                      {kiln.couriers.map((c) => {
                        const cost = Math.round(c.baseRate + Math.ceil(totalWeightKg) * c.perKg);
                        const selected = courierId === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setCourierId(c.id)}
                            className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs transition-colors ${
                              selected ? "bg-bg font-semibold ring-2 ring-accent" : "bg-bg/60 text-muted hover:bg-bg"
                            }`}
                          >
                            <div>
                              <p className="text-fg">{c.name}</p>
                              <p className="text-[11px] text-muted">{c.note}</p>
                            </div>
                            <span className="font-mono text-xs font-bold text-fg">
                              {cost === 0 ? "FREE" : `$${cost}`}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payment Gateway Selector */}
                  <div className="rounded-2xl bg-surface p-4 ring-1 ring-line">
                    <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg">
                      <QrCodeIcon size={15} weight="bold" className="text-accent" aria-hidden />
                      Instant Payment Method
                    </div>
                    <div className="mt-2.5 grid grid-cols-3 gap-2">
                      {[
                        { id: "qris" as const, label: "QRIS Instant" },
                        { id: "va" as const, label: "Virtual Acct" },
                        { id: "card" as const, label: "Credit Card" },
                      ].map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`rounded-xl py-2 font-mono text-[11px] uppercase tracking-[0.1em] ${
                            paymentMethod === pm.id ? "bg-accent font-bold text-accent-fg" : "bg-bg text-muted ring-1 ring-line"
                          }`}
                        >
                          {pm.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-line pt-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted">
                  <span>Supplies Subtotal</span>
                  <span className="font-mono">${subtotal}</span>
                </div>
                <div className="flex justify-between text-muted">
                  <span>{activeCourier.name}</span>
                  <span className="font-mono">{shippingCost === 0 ? "FREE" : `$${shippingCost}`}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 font-display text-lg font-bold text-fg">
                  <span>Total Due</span>
                  <span>${grandTotal}</span>
                </div>
              </div>

              {checkoutDone ? (
                <div className="mt-4 rounded-2xl bg-[#3d5a45] p-4 text-center text-xs font-medium text-[#faf6ef]">
                  Demo Checkout Complete · Batch lots reserved from Flagship Shelf (#A4) via {paymentMethod.toUpperCase()}.
                </div>
              ) : (
                <button
                  type="button"
                  disabled={cartDetails.length === 0}
                  onClick={() => setCheckoutDone(true)}
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent-fg disabled:opacity-40"
                >
                  Proceed to {paymentMethod.toUpperCase()} Checkout · ${grandTotal}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
