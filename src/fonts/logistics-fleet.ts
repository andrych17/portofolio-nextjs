import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-fleet-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-fleet-sans",
  display: "swap",
});

export const fleetFonts = `${display.variable} ${sans.variable}`;
