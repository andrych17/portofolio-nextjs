import type { TemplateMeta } from "@/lib/registry";

export const agency: TemplateMeta[] = [
  { sector: "agency", slug: "noir", name: "Noir", tagline: "Dark editorial studio", description: "A dark, editorial studio website with oversized serif type, a cinematic reel, a horizontal work slider and a custom cursor. Five pages.", palette: ["#0d0d0b", "#ece7dd", "#ff5b22"], motion: ["Line-by-line headline rise", "Horizontal work slider", "Scroll-driven words", "Curtain page transition"], pages: 5 },
  { sector: "agency", slug: "atelier", name: "Atelier", tagline: "Warm paper, Swiss grid", description: "A warm paper-toned studio website on a Swiss grid, with a serif display face, stacking work cards and a process rail. Five pages.", palette: ["#f2ede4", "#1c1b18", "#2f5d46"], motion: ["Clip-path image reveals", "Stacking cards", "Process rail", "Parallax photography"], pages: 5 },
  { sector: "agency", slug: "kinetic", name: "Kinetic", tagline: "Neo-brutalist and playful", description: "A loud, colorful neo-brutalist studio website with bouncy type, stickers, flip cards and a spinning badge. Five pages.", palette: ["#fff4e2", "#121212", "#2f4bff"], motion: ["Bouncy letters", "Flip cards", "Sticker physics", "Spinning badge"], pages: 5 },
];
