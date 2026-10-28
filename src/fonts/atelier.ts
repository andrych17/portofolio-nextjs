import { Fraunces, Hanken_Grotesk } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
  display: "swap",
});
const sans = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const atelierFonts = `${display.variable} ${sans.variable}`;
