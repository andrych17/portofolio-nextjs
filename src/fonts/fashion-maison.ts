import { Cormorant, Jost } from "next/font/google";

const display = Cormorant({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-maison-display",
  display: "swap",
});
const sans = Jost({
  subsets: ["latin"],
  variable: "--font-maison-sans",
  display: "swap",
});

export const maisonFonts = `${display.variable} ${sans.variable}`;
