import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-grid-sans",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-grid-mono", display: "swap" });

export const gridFonts = `${sans.variable} ${mono.variable}`;
