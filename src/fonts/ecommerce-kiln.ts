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
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-kiln-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const kilnFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
