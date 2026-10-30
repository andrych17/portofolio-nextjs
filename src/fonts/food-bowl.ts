import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bowl-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-bowl-sans",
  display: "swap",
});

export const bowlFonts = `${display.variable} ${sans.variable}`;
