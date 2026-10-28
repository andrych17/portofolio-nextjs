"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { freight } from "@/content/logistics/freight";
import { LAND_DOTS, MAP_H, MAP_W, project } from "@/content/logistics/freight-world";

type City = { name: string; lon: number; lat: number };
const cities = freight.cities as Record<string, City>;
const labelLeft = new Set(["LAX", "NYC", "SSZ", "LOS"]);

const pt = (code: string) => project(cities[code].lon, cities[code].lat).map((n) => Math.round(n * 10) / 10) as [number, number];

function arc(a: [number, number], b: [number, number], bend: number) {
  const dist = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const cx = (a[0] + b[0]) / 2;
  const cy = (a[1] + b[1]) / 2 - dist * bend;
  return `M${a[0]} ${a[1]}Q${Math.round(cx * 10) / 10} ${Math.round(cy * 10) / 10} ${b[0]} ${b[1]}`;
}

const used = Array.from(new Set(freight.routes.flatMap((r) => [r.from, r.to])));

/** Dotted world with route arcs. Comets travel along each arc with CSS only, so the map moves before hydration. */
export function FreightMap({ className = "", parallax = true }: { className?: string; parallax?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, parallax ? 90 : 0]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      <svg viewBox={`0 -24 ${MAP_W} ${MAP_H + 24}`} className="h-auto w-full" role="img" aria-label="World map with animated freight routes between Shanghai, Rotterdam, New York, Dubai, Singapore and other hubs">
        <path d={LAND_DOTS} fill="none" stroke="rgb(132 160 215 / 0.55)" strokeWidth="2.7" strokeLinecap="round" />
        {freight.routes.map((r, i) => {
          const d = arc(pt(r.from), pt(r.to), r.bend);
          const style = { ["--d" as string]: r.delay, ["--dur" as string]: `${r.dur}s` };
          return (
            <g key={i} style={style}>
              <path d={d} pathLength={100} className="freight-route" style={{ ["--d" as string]: i * 220 }} />
              <path d={d} pathLength={100} className="freight-trail" />
              <path d={d} pathLength={100} className="freight-head" />
            </g>
          );
        })}
        {used.map((code, i) => {
          const [x, y] = pt(code);
          const left = labelLeft.has(code);
          return (
            <g key={code}>
              <circle cx={x} cy={y} r={4} fill="none" stroke="var(--t-accent)" strokeWidth={1.2} className="freight-ping" style={{ ["--d" as string]: i * 330 }} />
              <circle cx={x} cy={y} r={2.6} fill="#fff" />
              <text x={left ? x - 7 : x + 7} y={y + 3.4} textAnchor={left ? "end" : "start"} fontSize={10} letterSpacing={1.2} fill="#c9d6ee" style={{ fontFamily: "var(--font-freight-mono), monospace" }}>
                {code}
              </text>
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}
