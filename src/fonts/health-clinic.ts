import { Bricolage_Grotesque, Manrope } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-clinic-display",
  display: "swap",
});
const sans = Manrope({ subsets: ["latin"], variable: "--font-clinic-sans", display: "swap" });

export const clinicFonts = `${display.variable} ${sans.variable}`;
