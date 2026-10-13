"use client";

import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/v2/motion";
import { useIntroReady } from "@/lib/v2/intro";

const W = 150;
const H = 76;

// Simplified from the Qualiv CV-screening flow: upload, queue, parse, score with the model, store the embedding.
const NODES = [
  { x: 90, y: 90, tag: "CLIENT", name: "Next.js 16" },
  { x: 320, y: 90, tag: "API", name: "NestJS" },
  { x: 550, y: 90, tag: "BILLING", name: "Midtrans" },
  { x: 320, y: 270, tag: "QUEUE · REDIS", name: "BullMQ" },
  { x: 550, y: 270, tag: "WORKER", name: "CV parsing" },
  { x: 320, y: 450, tag: "POSTGRESQL", name: "pgvector" },
  { x: 550, y: 450, tag: "MODEL", name: "GPT-4o" },
];

// Straight runs between node edges, plus one elbow from the worker down to the store.
const EDGES = [
  { d: "M165 90 H245", at: 0 },
  { d: "M395 90 H475", at: 0.5 },
  { d: "M320 128 V232", at: 1.1 },
  { d: "M395 270 H475", at: 2.2 },
  { d: "M550 308 V412", at: 3.3 },
  { d: "M510 308 V372 Q510 380 502 380 H328 Q320 380 320 388 V412", at: 3.3 },
];

const LOG = [
  ["queue", "cv-screening job added"],
  ["worker", "parse pdf / docx"],
  ["model", "score candidate"],
  ["pgvector", "upsert embedding"],
  ["queue", "job completed"],
];

/** An architecture diagram with packets travelling its edges, and a rolling log under it. */
export default function Pipeline() {
  const svg = useRef<SVGSVGElement>(null);
  const ready = useIntroReady();
  const loop = useRef<gsap.core.Timeline | null>(null);
  const gate = useRef({ visible: true, ready: false }); // the packets run only while visible and after the loader
  const sync = () => loop.current?.paused(!(gate.current.visible && gate.current.ready));

  useEffect(() => {
    const el = svg.current;
    if (!el || reducedMotion()) return;
    const paths = Array.from(el.querySelectorAll<SVGPathElement>(".v2-pe"));
    const packets = Array.from(el.querySelectorAll<SVGCircleElement>(".v2-packet"));

    const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.8 });
    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      const dot = packets[i];
      const t = { p: 0 };
      tl.fromTo(
        t,
        { p: 0 },
        {
          p: 1,
          duration: 1,
          ease: "power1.inOut",
          onUpdate: () => {
            const pt = path.getPointAtLength(t.p * length);
            dot.setAttribute("cx", String(pt.x));
            dot.setAttribute("cy", String(pt.y));
          },
        },
        EDGES[i].at,
      ).fromTo(dot, { opacity: 0 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 1, repeatDelay: 0.7 }, EDGES[i].at);
    });
    loop.current = tl;

    const io = new IntersectionObserver(
      ([entry]) => {
        gate.current.visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "100px" },
    );
    io.observe(el);
    sync();
    return () => {
      io.disconnect();
      tl.kill();
      loop.current = null;
    };
  }, []);

  useEffect(() => {
    gate.current.ready = ready;
    sync();
  }, [ready]);

  return (
    <div className="v2-pipeline">
      <svg ref={svg} viewBox="0 0 640 530" role="img" aria-label="Simplified architecture of the Qualiv CV-screening pipeline: Next.js, NestJS, BullMQ, a worker, GPT-4o and PostgreSQL with pgvector.">
        {EDGES.map((e) => (
          <path key={e.d} className="v2-pe" d={e.d} pathLength={1} />
        ))}
        {NODES.map((n) => (
          <g key={n.name} transform={`translate(${n.x - W / 2} ${n.y - H / 2})`}>
            <g className="v2-pn">
              <rect className="v2-pn-bez" width={W} height={H} rx="22" />
              <rect className="v2-pn-core" x="5" y="5" width={W - 10} height={H - 10} rx="17" />
              <circle className="v2-pn-dot" cx="22" cy="24" r="3" />
              <text className="v2-pn-tag" x="34" y="27">
                {n.tag}
              </text>
              <text className="v2-pn-name" x="22" y="52">
                {n.name}
              </text>
            </g>
          </g>
        ))}
        {EDGES.map((e) => (
          <circle key={e.d} className="v2-packet" r="4" cx="0" cy="0" opacity="0" />
        ))}
      </svg>

      <div className="v2-log v2-bezel" aria-hidden="true">
        <div>
          <p className="v2-log-head">$ tail -f qualiv/pipeline.log</p>
          {LOG.map(([who, what], i) => (
            <p key={i} className="v2-log-line" style={{ "--i": i } as React.CSSProperties}>
              <b>{who}</b> › {what}
            </p>
          ))}
          <span className="v2-caret" />
        </div>
      </div>
    </div>
  );
}
