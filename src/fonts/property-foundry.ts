import { Big_Shoulders, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-foundry-display",
  display: "swap",
});
const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-foundry-sans",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-foundry-mono",
  display: "swap",
  preload: false,
});

export const foundryFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
