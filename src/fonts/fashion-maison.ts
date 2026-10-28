import { Cormorant, Jost } from "next/font/google";

const display = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-maison-display",
  display: "swap",
});
const sans = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-maison-sans",
  display: "swap",
});

export const maisonFonts = `${display.variable} ${sans.variable}`;
