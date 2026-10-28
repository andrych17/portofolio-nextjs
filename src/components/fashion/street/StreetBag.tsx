"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { easeSnap } from "@/components/motion/ease";
import { street, type Product } from "@/content/fashion/street";
import { useMenu } from "@/lib/use-menu";

type Line = { id: string; size: string; qty: number };

type Bag = {
  lines: Line[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product, size: string) => void;
  change: (id: string, size: string, delta: number) => void;
};

const BagContext = createContext<Bag | null>(null);

export function useBag(): Bag {
  const bag = useContext(BagContext);
  if (!bag) throw new Error("useBag must be used inside StreetBagProvider");
  return bag;
}

const price = (n: number) => `$${n.toLocaleString("en-US")}`;
const find = (id: string) => street.products.find((p) => p.id === id);

/** Bag state plus the slide-in drawer. The demo has no checkout, so it ends in a note. */
export function StreetBagProvider({ children }: { children: ReactNode }) {
  const { open, setOpen, closeRef } = useMenu();
  const [lines, setLines] = useState<Line[]>([]);

  const add = useCallback(
    (product: Product, size: string) => {
      setLines((prev) => {
        const hit = prev.find((l) => l.id === product.id && l.size === size);
        if (!hit) return [...prev, { id: product.id, size, qty: 1 }];
        return prev.map((l) => (l === hit ? { ...l, qty: l.qty + 1 } : l));
      });
      setOpen(true);
    },
    [setOpen],
  );

  const change = useCallback((id: string, size: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.id === id && l.size === size ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  }, []);

  const value = useMemo<Bag>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.qty * (find(l.id)?.price ?? 0), 0);
    return { lines, count, total, open, setOpen, add, change };
  }, [lines, open, setOpen, add, change]);

  return (
    <BagContext.Provider value={value}>
      {children}
      <BagDrawer closeRef={closeRef} />
    </BagContext.Provider>
  );
}

function BagDrawer({ closeRef }: { closeRef: React.RefObject<HTMLButtonElement | null> }) {
  const { lines, count, total, open, setOpen, change } = useBag();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close bag"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[80] cursor-pointer bg-black/70 backdrop-blur-[2px]"
          />
          <motion.aside
            id="street-bag"
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: easeSnap }}
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-[28rem] flex-col border-l border-line bg-bg"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-3xl">
                Bag <span className="text-accent">({count})</span>
              </h2>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="street-tag min-h-11 cursor-pointer pl-4 hover:text-accent">
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-5">
              {lines.length === 0 ? (
                <p className="py-12 text-fg/70">Nothing in here yet. Twenty-four pieces are waiting.</p>
              ) : (
                <ul>
                  {lines.map((l) => {
                    const p = find(l.id);
                    if (!p) return null;
                    return (
                      <li key={`${l.id}-${l.size}`} className="flex gap-4 border-b border-line py-5">
                        <div className="relative aspect-[4/5] w-20 shrink-0 bg-surface">
                          <Image src={p.images[0].src} alt="" fill sizes="80px" className="object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-medium">{p.name}</p>
                            <p className="font-mono text-sm">{price(p.price * l.qty)}</p>
                          </div>
                          <p className="street-tag mt-1 text-muted">
                            {p.colour} · {l.size}
                          </p>
                          <div className="mt-auto flex items-center gap-1 pt-3">
                            <Step label={`Remove one ${p.name}`} onClick={() => change(l.id, l.size, -1)}>
                              &minus;
                            </Step>
                            <span className="w-8 text-center font-mono text-sm" aria-live="polite">
                              {l.qty}
                            </span>
                            <Step label={`Add one more ${p.name}`} onClick={() => change(l.id, l.size, 1)}>
                              +
                            </Step>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="border-t border-line px-5 pb-6 pt-5">
              <div className="flex items-baseline justify-between">
                <span className="street-tag text-muted">Subtotal</span>
                <span className="font-display text-3xl">{price(total)}</span>
              </div>
              <button
                type="button"
                disabled={lines.length === 0}
                className="street-tag mt-5 flex min-h-12 w-full cursor-not-allowed items-center justify-center bg-accent text-accent-fg opacity-60"
                aria-disabled
              >
                Checkout is off in this demo
              </button>
              <p className="mt-3 text-sm text-muted">{street.bagNote}</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Step({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-9 cursor-pointer items-center justify-center ring-1 ring-fg/25 transition-colors hover:bg-accent hover:text-accent-fg hover:ring-accent"
    >
      {children}
    </button>
  );
}
