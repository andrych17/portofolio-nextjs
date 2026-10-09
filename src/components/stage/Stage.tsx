"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { stage, useActiveSection, type SectionId } from "./active";

const Portrait = dynamic(() => import("./Portrait"), { ssr: false });

const GHOST: Record<SectionId, string> = {
  home: "Andry Huang",
  career: "Career",
  work: "Works",
  skills: "Stack",
  certifications: "Certified",
  faq: "Answers",
  contact: "Contact",
};

/**
 * The fixed scene behind the home page: orange band, outlined marquee word, point-cloud bust.
 * Sections opt in with data-stage="<id>"; whichever one crosses the middle of the viewport
 * decides where the band and the bust go (shapes live in stage.css, poses in Portrait.tsx).
 */
export default function Stage() {
  const active = useActiveSection();
  const still = useReducedMotion() ?? false;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) stage.setActive(e.target.getAttribute("data-stage") as SectionId);
      },
      { rootMargin: "-45% 0px -54% 0px" }, // a 1%-tall line just above the middle
    );
    document.querySelectorAll("[data-stage]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const word = GHOST[active];
  return (
    <div className="ah-stage" data-active={active} aria-hidden="true">
      <div className="ah-ghost" key={word}>
        <span>{word} · {word} · </span>
        <span>{word} · {word} · </span>
      </div>
      <div className="ah-band" />
      <Portrait still={still} />
    </div>
  );
}
