"use client";

import { useId, useState } from "react";
import type { Faq } from "@/content/types";

type AccordionProps = {
  items: Faq[];
  className?: string;
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
  iconClassName?: string;
};

/** Answers stay in the HTML when collapsed, so search and answer engines can read them. */
export function Accordion({
  items,
  className = "",
  itemClassName = "",
  questionClassName = "",
  answerClassName = "",
  iconClassName = "",
}: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${id}-panel-${i}`;
        return (
          <div key={item.q} className={itemClassName} data-open={isOpen || undefined}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`flex w-full cursor-pointer items-start justify-between gap-6 text-left ${questionClassName}`}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className={`relative mt-[0.35em] size-4 shrink-0 transition-transform duration-500 ease-studio ${isOpen ? "rotate-45" : ""} ${iconClassName}`}
                >
                  <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              inert={!isOpen}
              className="grid transition-[grid-template-rows,opacity] duration-500 ease-studio"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
            >
              <div className="overflow-hidden">
                <p className={answerClassName}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
