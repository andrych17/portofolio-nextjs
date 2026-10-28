import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fleet-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fleet-sans",
  display: "swap",
});

export const fleetFonts = `${display.variable} ${sans.variable}`;
