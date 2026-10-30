import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-pulse-display",
  display: "swap",
});
const sans = Geist({ subsets: ["latin"], variable: "--font-pulse-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-pulse-mono", display: "swap", preload: false });

export const pulseFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
