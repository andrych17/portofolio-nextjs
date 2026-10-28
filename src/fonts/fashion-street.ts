import { Chivo, Chivo_Mono, Dela_Gothic_One } from "next/font/google";

const display = Dela_Gothic_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-street-display",
  display: "swap",
});
const sans = Chivo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-street-sans",
  display: "swap",
});
const mono = Chivo_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-street-mono",
  display: "swap",
  preload: false,
});

export const streetFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
