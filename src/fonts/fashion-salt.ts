import { Figtree, Young_Serif } from "next/font/google";

const display = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-salt-display",
  display: "swap",
});
const sans = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-salt-sans",
  display: "swap",
});

export const saltFonts = `${display.variable} ${sans.variable}`;
