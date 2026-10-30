import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";

const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serene-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-serene-sans",
  display: "swap",
});

export const sereneFonts = `${display.variable} ${sans.variable}`;
