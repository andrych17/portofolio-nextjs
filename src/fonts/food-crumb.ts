import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-crumb-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-crumb-sans",
  display: "swap",
});

export const crumbFonts = `${display.variable} ${sans.variable}`;
