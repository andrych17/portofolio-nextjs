import { Bodoni_Moda, Manrope } from "next/font/google";

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-estate-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-estate-sans",
  display: "swap",
});

export const estateFonts = `${display.variable} ${sans.variable}`;
