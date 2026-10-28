import { Bodoni_Moda, Manrope } from "next/font/google";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-estate-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-estate-sans",
  display: "swap",
});

export const estateFonts = `${display.variable} ${sans.variable}`;
