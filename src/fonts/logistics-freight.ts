import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-freight-display", display: "swap", axes: ["opsz", "wdth"] });
const sans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-freight-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-freight-mono", display: "swap", preload: false });

export const freightFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
