import { Archivo, Space_Grotesk } from "next/font/google";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });

export const kineticFonts = `${display.variable} ${sans.variable}`;
