import { Bricolage_Grotesque, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-play-display",
  weight: ["700", "800"],
  display: "swap",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-play-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-play-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const playFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
