import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, CustomEase);

export const EASE_OUT = "cubic-bezier(0.32, 0.72, 0, 1)";
export const reducedMotion = (): boolean => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isMobile = (): boolean => window.innerWidth <= 767;

export { gsap, ScrollTrigger, CustomEase };
