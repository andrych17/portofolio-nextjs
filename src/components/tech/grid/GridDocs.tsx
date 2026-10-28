"use client";

import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";
import { easeStudio } from "@/components/motion/ease";
import { grid } from "@/content/tech/grid";
import { renderSegs, tokenize } from "./highlight";

export function GridDocs() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const doc = grid.docs[active];
  const segs = useMemo(() => tokenize(doc.code), [doc.code]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(doc.code);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="grid border border-fg md:grid-cols-12">
      <div role="tablist" aria-label="Documentation topics" aria-orientation="vertical" className="grid-noscroll flex overflow-x-auto border-b border-fg md:col-span-4 md:flex-col md:overflow-visible md:border-b-0 md:border-r">
        {grid.docs.map((d, i) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            id={`doc-tab-${d.id}`}
            aria-selected={active === i}
            aria-controls="doc-panel"
            onClick={() => setActive(i)}
            className={`mono relative flex min-h-14 shrink-0 cursor-pointer items-center gap-4 px-5 text-left transition-colors duration-300 md:min-h-[4.5rem] md:border-b md:border-line md:last:border-b-0 ${active === i ? "bg-fg text-bg" : "hover:bg-surface"}`}
          >
            <span className={active === i ? "text-white/50" : "text-muted"}>0{i + 1}</span>
            {d.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id="doc-panel" aria-labelledby={`doc-tab-${doc.id}`} className="min-w-0 md:col-span-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: easeStudio }}
          >
            <div className="p-6 md:p-10">
              <h3 className="text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-none tracking-[-0.04em]">{doc.title}</h3>
              <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-fg/70">{doc.body}</p>
            </div>
            <div className="border-t border-fg bg-surface">
              <div className="flex items-center justify-between border-b border-line pl-5">
                <span className="mono text-muted">{doc.lang}</span>
                <button type="button" onClick={copy} className="mono flex min-h-11 min-w-[6.5rem] cursor-pointer items-center justify-center gap-2 px-4 hover:text-accent" aria-live="polite">
                  {copied ? <CheckIcon size={14} weight="bold" aria-hidden /> : <CopyIcon size={14} weight="bold" aria-hidden />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="overflow-x-auto px-5 py-5 font-mono text-[12.5px] leading-[1.75] md:text-[13px]">
                <code>{renderSegs(segs, doc.code.length, "light")}</code>
              </pre>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
