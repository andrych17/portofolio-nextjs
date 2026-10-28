import { Archivo, Geist, Geist_Mono } from "next/font/google";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });

export const galleryFonts = `${display.variable} ${sans.variable} ${mono.variable}`;
