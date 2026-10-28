import { JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-grid-sans",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-grid-mono", display: "swap" });

export const gridFonts = `${sans.variable} ${mono.variable}`;
