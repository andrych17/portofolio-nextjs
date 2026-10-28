"use client";

import { useState } from "react";
import { grid } from "@/content/tech/grid";
import { GridButton } from "./GridButton";

const { names, price, cadence, featured, rows, cta } = grid.plans;

/** Four columns from md up. Below that, a switcher shows one plan at a time. */
export function GridPricing() {
  const [mobile, setMobile] = useState(featured);
  const col = (i: number) => (i === mobile ? "" : "hidden md:table-cell");

  return (
    <div>
      <div role="group" aria-label="Choose a plan" className="mb-6 grid grid-cols-4 border border-fg md:hidden">
        {names.map((n, i) => (
          <button
            key={n}
            type="button"
            aria-pressed={mobile === i}
            onClick={() => setMobile(i)}
            className={`mono min-h-12 cursor-pointer border-r border-fg px-1 transition-colors duration-300 last:border-r-0 ${mobile === i ? "bg-fg text-bg" : "hover:bg-surface"}`}
          >
            {n}
          </button>
        ))}
      </div>

      <table className="w-full table-fixed border-collapse text-left">
        <caption className="sr-only">Plan comparison</caption>
        <thead>
          <tr className="align-bottom">
            <td className="hidden w-[24%] md:table-cell" />
            {names.map((n, i) => (
              <th key={n} scope="col" className={`relative border-t-2 p-0 pb-8 pr-4 align-top font-normal md:pl-5 ${i === featured ? "border-accent md:bg-surface" : "border-fg"} ${col(i)}`}>
                <p className="mono pt-5 text-muted">{n}</p>
                <p className="mt-4 text-[clamp(2.8rem,5vw,4.6rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">{price[i]}</p>
                <p className="mono mt-2 text-muted">{cadence[i]}</p>
                <div className="mt-6">
                  <GridButton href="#contact" variant={i === featured ? "signal" : "line"}>
                    {cta[i]}
                  </GridButton>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-line">
              <th scope="row" className="hidden py-4 pr-4 text-left text-[14px] font-medium text-fg/70 md:table-cell">
                {r.label}
              </th>
              {r.v.map((v, i) => (
                <td key={i} className={`py-4 pr-4 align-top text-[15px] md:pl-5 ${i === featured ? "md:bg-surface font-semibold" : ""} ${col(i)}`}>
                  <span className="mono mb-1 block text-muted md:hidden">{r.label}</span>
                  <span className={v === "No" || v === "None" ? "text-fg/35" : ""}>{v}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
