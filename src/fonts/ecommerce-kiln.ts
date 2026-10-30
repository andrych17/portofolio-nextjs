import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-kiln-display",
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-kiln-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-kiln-mono",
  display: "swap",
});

export const kilnFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
