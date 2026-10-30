import { Albert_Sans, Bricolage_Grotesque, DM_Mono } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "wdth"],
  variable: "--font-atrium-display",
  display: "swap",
});
const sans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-atrium-sans",
  display: "swap",
});
const mono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-atrium-mono",
  display: "swap",
  preload: false,
});

export const atriumFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
