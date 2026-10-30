import { Plus_Jakarta_Sans, Syne } from "next/font/google";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-dental-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-dental-sans",
  display: "swap",
});

export const dentalFonts = `${display.variable} ${sans.variable}`;
