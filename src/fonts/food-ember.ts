import { Cormorant, Manrope } from "next/font/google";

const display = Cormorant({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-ember-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-ember-sans",
  display: "swap",
});

export const emberFonts = `${display.variable} ${sans.variable}`;
