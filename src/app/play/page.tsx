import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import Game from "./Game";
import "./play.css";

// Italic cut with the width axis, so menu words can run fully expanded.
const display = Archivo({
  variable: "--font-play",
  subsets: ["latin"],
  style: ["italic"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Play",
  description:
    "Andry Huang's portfolio as a game menu: career, works, skills and contact, around a 3D point-cloud bust rendered with three.js.",
  alternates: { canonical: "/play" },
};

export default function PlayPage() {
  return (
    <div className={display.variable}>
      <Game />
    </div>
  );
}
