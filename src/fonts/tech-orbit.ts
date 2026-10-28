import { JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-orbit-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-orbit-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-orbit-mono",
  display: "swap",
});

export const orbitFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
