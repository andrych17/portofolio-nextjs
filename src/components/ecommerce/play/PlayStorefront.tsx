"use client";

import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  CpuIcon,
  KeyboardIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  SlidersHorizontalIcon,
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
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { StackCards } from "@/components/motion/StackCards";
import { Tilt } from "@/components/motion/Tilt";
import { play, type PlayCategory } from "@/content/ecommerce/play";
import { useContactForm } from "@/lib/use-contact-form";
import { useMenu } from "@/lib/use-menu";

type CartLine = {
  productId: string;
  variantIndex: number;
  qty: number;
};

export function PlayStorefront() {
  const menu = useMenu();
  const [category, setCategory] = useState<PlayCategory>("all");
  const [query, setQuery] = useState("");
  const [variantByProduct, setVariantByProduct] = useState<Record<string, number>>({});
  const [bagOpen, setBagOpen] = useState(false);
  const [addedKey, setAddedKey] = useState<string | null>(null);
  const [courierId, setCourierId] = useState(play.couriers[0].id);
  const [checkoutDone, setCheckoutDone] = useState(false);

  // Custom Build Configurator state
  const [cfgKit, setCfgKit] = useState("mono65-cnc-kit");
  const [cfgSwitch, setCfgSwitch] = useState("cloud-linear-switches");
  const [cfgKeycap, setCfgKeycap] = useState("swiss-pbt-keycaps");
  const [activeSwitchTest, setActiveSwitchTest] = useState<0 | 1 | 2>(0);
  const [keyPressCount, setKeyPressCount] = useState(14);

  const [cart, setCart] = useState<CartLine[]>([
    { productId: "mono65-cnc-kit", variantIndex: 0, qty: 1 },
    { productId: "cloud-linear-switches", variantIndex: 0, qty: 2 },
  ]);

  const form = useContactForm("ecommerce/play");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return play.products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.spec.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q)
      );
    });
  }, [category, query]);

  const addToCart = (productId: string, variantIndex: number, count = 1) => {
    setCheckoutDone(false);
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.productId === productId && x.variantIndex === variantIndex);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + count };
        return next;
      }
      return [...prev, { productId, variantIndex, qty: count }];
    });
    const key = `${productId}-${variantIndex}`;
    setAddedKey(key);
    setTimeout(() => setAddedKey((cur) => (cur === key ? null : cur)), 1300);
  };

  const updateQty = (productId: string, variantIndex: number, delta: number) => {
    setCheckoutDone(false);
    setCart((prev) =>
      prev
        .map((x) =>
          x.productId === productId && x.variantIndex === variantIndex ? { ...x, qty: Math.max(0, x.qty + delta) } : x,
        )
        .filter((x) => x.qty > 0),
    );
  };

  const cartLines = useMemo(() => {
    return cart
      .map((line) => {
        const product = play.products.find((p) => p.id === line.productId);
        if (!product) return null;
        const variant = product.variants[line.variantIndex] ?? product.variants[0];
        return {
          ...line,
          product,
          variant,
          lineTotal: product.price * line.qty,
          lineWeight: product.weightGrams * line.qty,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [cart]);

  const totalItems = cartLines.reduce((s, x) => s + x.qty, 0);
  const subtotal = cartLines.reduce((s, x) => s + x.lineTotal, 0);
  const totalWeightKg = Math.max(0.5, Number((cartLines.reduce((s, x) => s + x.lineWeight, 0) / 1000).toFixed(2)));
  const activeCourier = play.couriers.find((c) => c.id === courierId) ?? play.couriers[0];
  const shipping = cartLines.length === 0 ? 0 : Math.round(activeCourier.baseRate + Math.ceil(totalWeightKg) * activeCourier.perKg);
  const grandTotal = subtotal + shipping;

  const selectedKitObj = play.products.find((p) => p.id === cfgKit) ?? play.products[0];
  const selectedSwitchObj = play.products.find((p) => p.id === cfgSwitch) ?? play.products[2];
  const selectedCapObj = play.products.find((p) => p.id === cfgKeycap) ?? play.products[4];
  const buildTotal = selectedKitObj.price + selectedSwitchObj.price * 2 + selectedCapObj.price;

  return (
    <>
      {/* Top Daylight Hardware Status Bar */}
      <div className="border-b border-line bg-[#0f172a] px-4 py-2 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-[#f6f8fc]">
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 animate-blink rounded-full bg-[#38bdf8]" />
          100% In-Stock Hardware (No Group-Buy Waits) · Dispatched Same Day
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-5 py-3.5 md:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Your Brand home">
            <span className="grid size-10 place-items-center rounded-xl bg-accent font-display text-base font-extrabold text-accent-fg">
              YB
            </span>
            <div>
              <span className="block font-display text-lg font-extrabold leading-none tracking-tight">Your Brand</span>
              <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Keyboards &amp; Desk Lab</span>
            </div>
          </a>

          <nav aria-label="Store navigation" className="hidden items-center gap-1 lg:flex">
            {[
              { href: "#catalog", label: "In-Stock Gear" },
              { href: "#builder", label: "Custom Kit Builder" },
              { href: "#stats", label: "Switch Bar" },
              { href: "#faq", label: "FAQ" },
              { href: "#contact", label: "Team & Bulk Orders" },
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
                placeholder="Search 65%, linear, PBT..."
                aria-label="Search keyboard hardware"
                className="h-10 w-48 rounded-full bg-surface pl-9 pr-4 text-xs text-fg ring-1 ring-line placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent xl:w-60"
              />
            </div>

            <button
              type="button"
              onClick={() => setBagOpen(true)}
              aria-label={`Open build bag with ${totalItems} items`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-fg"
            >
              <ShoppingBagIcon size={16} weight="bold" aria-hidden />
              <span className="hidden sm:inline">Build Bag</span>
              <span className="grid min-w-5 place-items-center rounded-full bg-bg px-1.5 py-0.5 font-mono text-[11px] font-bold text-fg">
                {totalItems}
              </span>
            </button>

            <button
              type="button"
              onClick={() => menu.setOpen(true)}
              aria-expanded={menu.open}
              aria-controls="play-mobile-nav"
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
          id="play-mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Hardware navigation"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-bg p-6 text-fg lg:hidden"
        >
          <div className="flex items-center justify-between border-b border-line pb-4">
            <span className="font-display text-xl font-extrabold">Your Brand · Desk Lab</span>
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
              { href: "#catalog", label: "In-Stock Hardware" },
              { href: "#builder", label: "Custom Kit Builder" },
              { href: "#stats", label: "Switch Tester Wall" },
              { href: "#faq", label: "Questions" },
              { href: "#contact", label: "Corporate & Bulk Builds" },
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
          <p className="font-mono text-xs text-muted">{play.street}, {play.city}</p>
        </div>
      )}

      {/* Swiss Industrial Bento Hero + Interactive Mechanical Switch Tester */}
      <section id="top" aria-labelledby="play-h1" className="mx-auto max-w-[1400px] px-5 pb-14 pt-8 md:px-10 md:pb-20 md:pt-12">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Top-Left Kinetic Headline Bento */}
          <div className="flex flex-col justify-between rounded-[2.25rem] bg-surface p-7 ring-1 ring-line md:p-10 lg:col-span-7">
            <div>
              <Eyebrow>CNC Aluminum Kits · Factory-Lubed Switches · Zero Group-Buy Wait</Eyebrow>
              <MaskText
                id="play-h1"
                as="h1"
                className="mt-4 font-display text-[clamp(2.35rem,5.2vw,4.7rem)] font-extrabold leading-[0.94] tracking-[-0.03em]"
                lines={[
                  "Tactile precision.",
                  <span key="2" className="text-accent">In stock on the shelf.</span>,
                ]}
              />
              <p data-speakable className="mt-5 max-w-xl text-base leading-relaxed text-muted">
                {play.speakable}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic strength={0.22}>
                  <a
                    href="#catalog"
                    className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent py-2 pl-6 pr-2 font-medium text-accent-fg"
                  >
                    <span>Shop In-Stock Drops</span>
                    <ArrowIsland className="size-9 bg-black/15" size={15} />
                  </a>
                </Magnetic>
                <Magnetic strength={0.18}>
                  <a
                    href="#architecture"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-bg px-5 py-3 text-xs font-mono font-bold uppercase tracking-[0.14em] text-fg ring-1 ring-line transition-colors hover:bg-fg hover:text-bg"
                  >
                    <SlidersHorizontalIcon size={15} weight="bold" className="text-accent" aria-hidden />
                    Exploded Stack Specs
                  </a>
                </Magnetic>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                QMK / VIA Ready · Same-Day Hub
              </span>
            </div>
          </div>

          {/* Top-Right Interactive Mechanical Switch Tester Lab */}
          <div className="flex flex-col justify-between rounded-[2.25rem] bg-[#0f172a] p-7 text-[#f6f8fc] ring-1 ring-line md:p-8 lg:col-span-5">
            {(() => {
              const switchProfiles = [
                {
                  code: "SW-L45",
                  keyLabel: "LIN 45g",
                  name: "POM Cloud Linear",
                  force: 45,
                  travel: "3.6 mm",
                  sound: "Deep Marbly Clack · 42 dB",
                  color: "#38bdf8",
                  productId: "cloud-linear-switches",
                  variantIndex: 0,
                },
                {
                  code: "SW-T58",
                  keyLabel: "TAC 58g",
                  name: "Bergamot D-Bump Tactile",
                  force: 58,
                  travel: "3.4 mm",
                  sound: "Crisp Rounded Bump · 46 dB",
                  color: "#f97316",
                  productId: "citrus-tactile-switches",
                  variantIndex: 0,
                },
                {
                  code: "SW-S62",
                  keyLabel: "SIL 62g",
                  name: "Bergamot Silent Tactile",
                  force: 62,
                  travel: "3.3 mm",
                  sound: "Dampened Studio · 29 dB",
                  color: "#10b981",
                  productId: "citrus-tactile-switches",
                  variantIndex: 1,
                },
              ] as const;
              const current = switchProfiles[activeSwitchTest];
              return (
                <>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#38bdf8]">
                      <span className="size-2 animate-ping rounded-full bg-[#38bdf8]" />
                      Interactive Switch Tester · Press Keycap
                    </span>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] text-white/80">
                      {keyPressCount} actuations
                    </span>
                  </div>

                  {/* 3 Physical Pressable Keycaps */}
                  <div className="my-6 grid grid-cols-3 gap-3">
                    {switchProfiles.map((sw, i) => {
                      const active = activeSwitchTest === i;
                      return (
                        <motion.button
                          key={sw.code}
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ y: 8, scale: 0.96 }}
                          transition={{ type: "spring", stiffness: 520, damping: 18 }}
                          onClick={() => {
                            setActiveSwitchTest(i as 0 | 1 | 2);
                            setKeyPressCount((c) => c + 1);
                          }}
                          className={`relative flex flex-col items-center justify-between rounded-2xl border-b-[6px] p-3.5 text-left transition-colors ${
                            active
                              ? "border-[#2546f0] bg-white text-[#0f172a]"
                              : "border-white/15 bg-white/8 text-white/80 hover:bg-white/14"
                          }`}
                        >
                          <span className="w-full font-mono text-[9px] uppercase tracking-[0.14em] opacity-65">{sw.code}</span>
                          <span className="my-2 font-display text-base font-extrabold tracking-tight">{sw.keyLabel}</span>
                          <span className="h-1.5 w-8 rounded-full" style={{ backgroundColor: sw.color }} />
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Live Force & Travel Telemetry */}
                  <div className="rounded-2xl bg-white/6 p-4 ring-1 ring-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display text-lg font-extrabold">{current.name}</p>
                        <p className="font-mono text-[11px] text-white/65">{current.sound}</p>
                      </div>
                      <span className="font-mono text-xs font-bold" style={{ color: current.color }}>
                        {current.travel}
                      </span>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                        <span>Actuation Force</span>
                        <span>{current.force} gf / 80 gf</span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: current.color }}
                          initial={false}
                          animate={{ width: `${(current.force / 80) * 100}%` }}
                          transition={{ type: "spring", stiffness: 260, damping: 22 }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">35-Switch Box · $19–$21</span>
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(current.productId, current.variantIndex);
                          setBagOpen(true);
                        }}
                        className="rounded-full bg-[#2546f0] px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white hover:bg-[#3b82f6]"
                      >
                        + Add Tested Pack
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      <div className="border-y border-line bg-surface py-3.5 overflow-hidden">
        <Marquee speed={32}>
          {play.marquee.map((m) => (
            <span key={m} className="mx-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-fg/80">
              <span className="size-1.5 rounded-full bg-accent" />
              {m}
            </span>
          ))}
        </Marquee>
      </div>

      {/* Sticky Stacking Hardware Architecture (StackCards) */}
      <section id="architecture" aria-labelledby="play-stack-h2" className="mx-auto max-w-[1400px] px-5 pt-20 md:px-10 md:pt-28">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>Exploded Chassis Engineering · Scroll to Stack</Eyebrow>
            <h2 id="play-stack-h2" className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
              Three precision layers inside every board.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Cards pin and scale in 3D space as you scroll down the chassis stack.
          </p>
        </div>

        <StackCards top={96} step={24} minScale={0.9} gapClassName="mb-[8vh]">
          {[
            {
              layer: "LAYER 01 // CHASSIS",
              title: "6063 CNC Bead-Blasted Aluminum Monoblock",
              desc: "Machined from solid billet aluminum with a 6.5° typing angle, internal brass acoustic weight, and electrostatic milk-white or cobalt anodized finish.",
              spec: "1,650g Unbuilt Weight · Zero Case Ping",
              img: "/template/images/ecommerce/play/hero.webp",
            },
            {
              layer: "LAYER 02 // ACOUSTIC MOUNT",
              title: "Silicone Sock Gaskets & Flex-Cut Hot-Swap PCB",
              desc: "Isolated plate mounting absorbs harsh bottom-out vibrations while Kailh 5-pin hot-swap sockets let you swap linear or tactile switches without soldering.",
              spec: "1.2mm PCB · Per-Key South-Facing RGB",
              img: "/template/images/ecommerce/play/board.webp",
            },
            {
              layer: "LAYER 03 // KEYCAPS & CABLE",
              title: "1.6mm Five-Side Dye-Sub PBT + Coiled Lemo Connector",
              desc: "Oil-resistant Cherry profile PBT legends paired with a double-sleeved Techflex USB-C cable and quick-release CNC metal push-pull aviator latch.",
              spec: "QMK / VIA Browser Remapping Out of the Box",
              img: "/template/images/ecommerce/play/keycaps.webp",
            },
          ].map((card) => (
            <div
              key={card.layer}
              className="grid grid-cols-1 items-center gap-6 rounded-[2.25rem] bg-surface p-6 ring-1 ring-line shadow-[0_24px_60px_-24px_rgba(15,23,42,0.18)] md:grid-cols-12 md:p-10"
            >
              <div className="md:col-span-7">
                <span className="inline-block rounded-full bg-accent/12 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
                  {card.layer}
                </span>
                <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight md:text-4xl">{card.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-base">{card.desc}</p>
                <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-fg">{card.spec}</p>
              </div>
              <div className="md:col-span-5">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#e2e8f0] ring-1 ring-line">
                  <Image src={card.img} alt={card.title} fill sizes="(min-width: 768px) 38vw, 90vw" className="object-cover" />
                </div>
              </div>
            </div>
          ))}
        </StackCards>
      </section>

      {/* Hardware Catalog */}
      <section id="catalog" aria-labelledby="play-catalog-h2" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow>Live Warehouse Inventory</Eyebrow>
            <h2 id="play-catalog-h2" className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
              Filter by component &amp; switch feel.
            </h2>
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Hardware categories">
            {play.categories.map((cat) => {
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
            const vIdx = variantByProduct[product.id] ?? 0;
            const variant = product.variants[vIdx] ?? product.variants[0];
            const isAdded = addedKey === `${product.id}-${vIdx}`;

            return (
              <Reveal key={product.id} delay={(idx % 3) * 0.06} className={`min-w-0 ${idx === 0 ? "md:col-span-2" : ""}`}>
                <Tilt max={7} className="h-full">
                  <article className="flex h-full flex-col rounded-[1.75rem] bg-surface p-1.5 ring-1 ring-line">
                    <div className="flex h-full flex-col rounded-[calc(1.75rem-0.375rem)] bg-bg p-4">
                      <ClipReveal direction="top" delay={(idx % 3) * 0.05} className={`${idx === 0 ? "aspect-[16/9]" : "aspect-[4/3]"} rounded-2xl bg-[#e2e8f0]`}>
                        <Image
                          src={product.image}
                          alt={product.alt}
                          fill
                          sizes="(min-width: 1024px) 45vw, (min-width: 768px) 45vw, 92vw"
                          className="object-cover"
                        />
                        {product.badge && (
                          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-accent-fg">
                            {product.badge}
                          </span>
                        )}
                        <span className="absolute bottom-3 right-3 rounded-full bg-bg/92 px-2.5 py-1 font-mono text-[10px] font-semibold text-fg ring-1 ring-line">
                          {product.spec}
                        </span>
                      </ClipReveal>

                    <div className="mt-4 flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{product.sku}</span>
                        <span className="font-display text-xl font-extrabold">${product.price}</span>
                      </div>
                      <h3 className="mt-1 font-display text-xl font-extrabold leading-snug">{product.name}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted">{product.subtitle}</p>

                      <div className="mt-4 rounded-xl bg-surface p-3 ring-1 ring-line">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-fg">{variant.label}</span>
                          <span className="font-mono text-[10px] text-accent">{variant.hubStock} units in Hub</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          {product.variants.map((v, i) => (
                            <button
                              key={v.label}
                              type="button"
                              onClick={() => setVariantByProduct((prev) => ({ ...prev, [product.id]: i }))}
                              aria-label={v.label}
                              className={`size-6 rounded-full ring-1 ring-black/20 ${
                                vIdx === i ? "ring-2 ring-accent ring-offset-2 ring-offset-bg" : "opacity-75"
                              }`}
                              style={{ background: v.hex }}
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => addToCart(product.id, vIdx)}
                        className={`mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                          isAdded ? "bg-[#059669] text-white" : "bg-fg text-bg hover:bg-accent hover:text-accent-fg"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircleIcon size={15} weight="bold" aria-hidden />
                            Added to Build Bag
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
      </section>

      {/* Interactive Custom Keyboard Kit Configurator */}
      <section id="builder" aria-labelledby="builder-h2" className="border-y border-line bg-surface/75 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>Complete Custom Build Estimator</Eyebrow>
              <h2 id="builder-h2" className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
                Pair a kit, 70 switches &amp; PBT keycaps in one click.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                Not sure how many switch packs match your board? Select your barebones chassis, switch feel, and keycap colorway below to add a complete, pin-compatible bundle.
              </p>

              <div className="mt-6 rounded-3xl bg-bg p-6 ring-1 ring-line">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Complete Hot-Swap Bundle</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-accent">
                    <CpuIcon size={14} weight="bold" aria-hidden />
                    100% Compatible
                  </span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>1× {selectedKitObj.name}</span>
                    <span className="font-mono">${selectedKitObj.price}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>2× {selectedSwitchObj.name} (70 switches)</span>
                    <span className="font-mono">${selectedSwitchObj.price * 2}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>1× {selectedCapObj.name}</span>
                    <span className="font-mono">${selectedCapObj.price}</span>
                  </li>
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="font-display text-3xl font-extrabold">${buildTotal}</span>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedKitObj.id, 0, 1);
                      addToCart(selectedSwitchObj.id, 0, 2);
                      addToCart(selectedCapObj.id, 0, 1);
                      setBagOpen(true);
                    }}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-accent-fg"
                  >
                    Add Complete Build
                    <ArrowUpRightIcon size={15} weight="bold" aria-hidden />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-bg p-5 ring-1 ring-line">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-accent">01 · Choose Barebones Chassis</p>
                <div className="mt-3 space-y-2.5">
                  {play.products.filter((p) => p.category === "kits").map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => setCfgKit(k.id)}
                      className={`w-full rounded-2xl p-3.5 text-left ${
                        cfgKit === k.id ? "bg-surface ring-2 ring-accent" : "bg-surface/50 ring-1 ring-line"
                      }`}
                    >
                      <p className="font-display text-base font-extrabold">{k.name}</p>
                      <p className="mt-1 font-mono text-[11px] text-muted">{k.spec} · ${k.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-bg p-5 ring-1 ring-line">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-accent">02 · Choose Switch Feel (2× 35-Pack)</p>
                <div className="mt-3 space-y-2.5">
                  {play.products.filter((p) => p.category === "switches").map((sw) => (
                    <button
                      key={sw.id}
                      type="button"
                      onClick={() => setCfgSwitch(sw.id)}
                      className={`w-full rounded-2xl p-3.5 text-left ${
                        cfgSwitch === sw.id ? "bg-surface ring-2 ring-accent" : "bg-surface/50 ring-1 ring-line"
                      }`}
                    >
                      <p className="font-display text-base font-extrabold">{sw.name}</p>
                      <p className="mt-1 font-mono text-[11px] text-muted">{sw.spec} · ${sw.price * 2} for 70</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" aria-labelledby="play-stats-h2" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
        <h2 id="play-stats-h2" className="sr-only">Hardware fulfillment stats</h2>
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-surface p-6 ring-1 ring-line md:grid-cols-4 md:p-10">
          {play.stats.map((st) => (
            <div key={st.label} className="border-l border-line pl-4 first:border-l-0 first:pl-0">
              <p className="font-display text-3xl font-extrabold text-accent md:text-5xl">
                <Counter value={st.value} suffix={st.suffix} />
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted md:text-sm">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="play-faq-h2" className="border-t border-line bg-surface/40 py-20">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Compatibility &amp; Switch Specs</Eyebrow>
            <h2 id="play-faq-h2" className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-5xl">
              Hardware questions.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <Accordion
              items={play.faqs}
              className="divide-y divide-line rounded-3xl bg-bg px-6 ring-1 ring-line"
              itemClassName=""
              questionClassName="py-5 text-left font-display text-lg font-extrabold"
              answerClassName="pb-5 text-sm leading-relaxed text-muted"
            />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" aria-labelledby="play-contact-h2" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-10 rounded-[2.25rem] bg-surface p-6 ring-1 ring-line md:p-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>Switch Tester Wall &amp; Team Orders</Eyebrow>
            <h2 id="play-contact-h2" className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
              Try 96 switches in store or request custom team builds.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {play.street}, {play.city} · {play.hours}
            </p>
          </div>
          <div className="lg:col-span-7">
            <form onSubmit={form.onSubmit} noValidate className="rounded-3xl bg-bg p-6 ring-1 ring-line md:p-8">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="play-name" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Name</label>
                  <input id="play-name" name="name" type="text" required placeholder="Kevin Tan" className="mt-1.5 h-12 w-full rounded-xl bg-surface px-4 text-sm text-fg ring-1 ring-line" />
                  {form.errors.name && <p className="mt-1 text-xs text-accent">{form.errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="play-email" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Email</label>
                  <input id="play-email" name="email" type="email" required placeholder="kevin@domain.com" className="mt-1.5 h-12 w-full rounded-xl bg-surface px-4 text-sm text-fg ring-1 ring-line" />
                  {form.errors.email && <p className="mt-1 text-xs text-accent">{form.errors.email}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="play-msg" className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Build / Bulk Inquiry</label>
                <textarea id="play-msg" name="message" rows={3} required defaultValue="Hi Your Brand desk lab, I would like to inquire about custom-assembled Mono65 keyboards." className="mt-1.5 w-full rounded-xl bg-surface p-4 text-sm text-fg ring-1 ring-line" />
                {form.errors.message && <p className="mt-1 text-xs text-accent">{form.errors.message}</p>}
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <button type="submit" disabled={form.status === "sending"} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-fg">
                  {form.status === "sending" ? "Sending..." : "Send Hardware Inquiry"}
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
          <p className="font-display text-lg font-extrabold">Your Brand · Mechanical Keyboards &amp; Desk Gear</p>
          <div className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <a href="#catalog" className="hover:text-fg">Hardware</a>
            <a href="#builder" className="hover:text-fg">Kit Builder</a>
            <Link href="/showcase" className="text-accent hover:underline">Back to Showcase →</Link>
          </div>
        </div>
      </footer>

      {/* Slide-over Build Bag */}
      {bagOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs" role="dialog" aria-modal="true" aria-label="Build bag and shipping estimator">
          <div className="flex h-full w-full max-w-lg flex-col justify-between bg-bg p-6 text-fg shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h2 className="font-display text-2xl font-extrabold">Your Build Bag</h2>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{totalItems} items · {totalWeightKg} kg</p>
              </div>
              <button type="button" onClick={() => setBagOpen(false)} aria-label="Close bag" className="grid size-10 place-items-center rounded-full bg-surface ring-1 ring-line">
                <XIcon size={18} weight="bold" aria-hidden />
              </button>
            </div>

            <div className="my-4 flex-1 space-y-3 overflow-y-auto pr-1">
              {cartLines.map((item) => (
                <div key={`${item.productId}-${item.variantIndex}`} className="flex items-center justify-between gap-3 rounded-2xl bg-surface p-3.5 ring-1 ring-line">
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-extrabold">{item.product.name}</p>
                    <p className="font-mono text-[10px] text-muted">{item.variant.label}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button type="button" onClick={() => updateQty(item.productId, item.variantIndex, -1)} aria-label="Decrease" className="grid size-8 place-items-center rounded-full bg-bg ring-1 ring-line">
                      {item.qty === 1 ? <TrashIcon size={13} aria-hidden /> : <MinusIcon size={13} aria-hidden />}
                    </button>
                    <span className="w-5 text-center font-mono text-xs font-bold">{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.productId, item.variantIndex, 1)} aria-label="Increase" className="grid size-8 place-items-center rounded-full bg-bg ring-1 ring-line">
                      <PlusIcon size={13} aria-hidden />
                    </button>
                    <span className="w-12 text-right font-mono text-xs font-bold">${item.lineTotal}</span>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-surface p-4 ring-1 ring-line">
                <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
                  <TruckIcon size={15} weight="bold" className="text-accent" aria-hidden />
                  ESD-Safe Shipping Method
                </div>
                <div className="mt-2.5 space-y-2">
                  {play.couriers.map((c) => {
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
              <div className="flex justify-between font-display text-xl font-extrabold">
                <span>Total Due</span>
                <span>${grandTotal}</span>
              </div>
              {checkoutDone ? (
                <div className="mt-3 rounded-2xl bg-accent p-3.5 text-center text-xs font-medium text-accent-fg">
                  Demo Order Confirmed · Hardware reserved from Surabaya Hub for same-day dispatch.
                </div>
              ) : (
                <button
                  type="button"
                  disabled={cartLines.length === 0}
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
