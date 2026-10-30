import { Bricolage_Grotesque, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-play-display",
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-play-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-play-mono",
  display: "swap",
});

export const playFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
