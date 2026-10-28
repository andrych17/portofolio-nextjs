import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-pulse-display",
  display: "swap",
});
const sans = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-pulse-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-pulse-mono", display: "swap" });

export const pulseFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
