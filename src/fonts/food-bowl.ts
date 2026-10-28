import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-bowl-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bowl-sans",
  display: "swap",
});

export const bowlFonts = `${display.variable} ${sans.variable}`;
