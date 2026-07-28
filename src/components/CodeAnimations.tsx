"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Disable background animations on mobile
function useReducedMotion() {
  const [shouldReduce, setShouldReduce] = useState(false);
  useEffect(() => {
    const check = () => setShouldReduce(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return shouldReduce;
}

// ─── Cyber Grid Background ────────────────────────────────────────────────────
export function CyberGrid() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(236, 72, 153, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
          willChange: "transform",
        }}
      />
    </div>
  );
}

// ─── Scan Line — pure CSS ─────────────────────────────────────────────────────
export function ScanLine() {
  return (
    <div
      className="absolute inset-x-0 top-0 pointer-events-none overflow-hidden"
      style={{ height: "100%" }}
    >
      <div
        style={{
          animation: "scan-line 5s linear infinite",
          animationDelay: "-2s",
          willChange: "transform",
        }}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
        <div className="h-20 bg-gradient-to-b from-cyan-500/20 to-transparent" />
      </div>
    </div>
  );
}

// ─── Digital Particles — pure CSS ────────────────────────────────────────────
export function DigitalParticles() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  const positions = [
    { left: "12%", top: "68%" },
    { left: "28%", top: "42%" },
    { left: "52%", top: "62%" },
    { left: "71%", top: "35%" },
    { left: "84%", top: "54%" },
  ];
  const colors = ["bg-cyan-400", "bg-purple-400", "bg-pink-400", "bg-amber-400", "bg-emerald-400"];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {positions.map((pos, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 ${colors[i % colors.length]} rounded-full`}
          style={{
            left: pos.left,
            top: pos.top,
            animation: `particle-float ${5 + i * 2}s ease-in-out infinite`,
            animationDelay: `${-i * 1.8}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

// ─── Matrix-style Code Rain — pure CSS ───────────────────────────────────────
export function CodeRain() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  const columns = 5;
  const codeChars = "{}[]()<>=;+-*/&#$@!%^&*_|~".split("");
  const languages = ["JS", "TS", "PY", "GO", "RS", "PHP", "SQL", "CSS"];
  const colors = [
    "text-green-400",
    "text-cyan-400",
    "text-purple-400",
    "text-pink-400",
    "text-amber-400",
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-15 z-0">
      {[...Array(columns)].map((_, i) => (
        <div
          key={i}
          className={`absolute top-0 ${colors[i % colors.length]} font-mono text-xs`}
          style={{
            left: `${(i * 100) / columns}%`,
            animation: `rain-fall ${8 + (i % 5) * 2}s linear infinite`,
            animationDelay: `${-(i * 2.5)}s`,
            willChange: "transform",
          }}
        >
          {[...Array(20)].map((_, j) => (
            <div key={j} className="opacity-70" style={{ marginBottom: "10px" }}>
              {codeChars[(i + j) % codeChars.length]}
              {languages[(i + j) % languages.length]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Floating Code Snippets — pure CSS ───────────────────────────────────────
export function FloatingCodeSnippets() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  const snippets = [
    { code: "const dev = () => {", color: "text-yellow-400" },
    { code: "function build()", color: "text-blue-400" },
    { code: "import React", color: "text-cyan-400" },
    { code: "export default", color: "text-purple-400" },
    { code: "async await", color: "text-green-400" },
    { code: "=> { return }", color: "text-pink-400" },
    { code: "npm install", color: "text-orange-400" },
    { code: "git commit -m", color: "text-red-400" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {snippets.map((snippet, i) => (
        <div
          key={i}
          className={`absolute font-mono text-sm ${snippet.color} opacity-20`}
          style={{
            top: `${100 + i * 80}px`,
            animation: `${i % 2 === 0 ? "snippet-slide" : "snippet-slide-rev"} ${
              20 + (i % 3) * 5
            }s linear infinite`,
            animationDelay: `${-(i * 4)}s`,
            willChange: "transform",
          }}
        >
          {snippet.code}
        </div>
      ))}
    </div>
  );
}

// ─── Terminal Typing Window ───────────────────────────────────────────────────
const TERMINAL_COMMANDS = [
  "$ npm run build",
  "> Building project...",
  "✓ Compiled successfully",
  "$ git push origin main",
  "> Deploying to production...",
  "✓ Deployment complete!",
];

export function TerminalWindow() {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < TERMINAL_COMMANDS.length) {
        setLines((prev) => [...prev, TERMINAL_COMMANDS[idx]]);
        idx++;
      } else {
        setLines([]);
        idx = 0;
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed bottom-8 left-8 bg-[#030014]/90 rounded-lg p-4 w-80 border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.15)] z-50 hidden lg:block"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-400 text-xs font-mono">terminal</span>
      </div>
      <div className="font-mono text-xs space-y-1">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={
              line?.startsWith("$") || line?.startsWith("✓")
                ? "text-green-400"
                : "text-gray-400"
            }
          >
            {line}
          </motion.div>
        ))}
        <span
          className="inline-block w-2 h-4 bg-green-400 ml-1"
          style={{ animation: "none", opacity: 1 }}
        />
      </div>
    </motion.div>
  );
}

// ─── Binary Rain — pure CSS ───────────────────────────────────────────────────
export function BinaryRain() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  const colors = [
    "text-cyan-400",
    "text-purple-400",
    "text-pink-400",
    "text-emerald-400",
    "text-amber-400",
    "text-blue-400",
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`absolute ${colors[i % colors.length]} font-mono text-2xl font-bold`}
          style={{
            left: `${i * 16.66}%`,
            top: 0,
            animation: `binary-fall ${10 + (i % 3) * 3}s linear infinite`,
            animationDelay: `${-(i * 1.4)}s`,
            willChange: "transform",
          }}
        >
          {[...Array(15)].map((_, j) => (
            <div key={j}>{(i + j) % 2}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── Shimmer/Shine Text — Framer Motion (compositor-safe) ────────────────────
export function GlitchText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      {children}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
      />
    </span>
  );
}

// ─── Cursor Trail — motion values, zero re-renders ───────────────────────────
export function CursorTrail() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);

  const x1 = useSpring(rawX, { damping: 30, stiffness: 200, mass: 0.5 });
  const y1 = useSpring(rawY, { damping: 30, stiffness: 200, mass: 0.5 });
  const x2 = useSpring(rawX, { damping: 20, stiffness: 150, mass: 0.5 });
  const y2 = useSpring(rawY, { damping: 20, stiffness: 150, mass: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 8);
      rawY.set(e.clientY - 8);
      if (!isVisible) setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [rawX, rawY, isVisible]);

  return (
    <>
      <motion.div
        className="fixed w-4 h-4 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full pointer-events-none z-50 hidden lg:block"
        style={{ x: x1, y: y1, opacity: isVisible ? 1 : 0 }}
      />
      <motion.div
        className="fixed w-8 h-8 border-2 border-pink-400/30 rounded-full pointer-events-none z-50 hidden lg:block"
        style={{
          x: x2,
          y: y2,
          translateX: "-8px",
          translateY: "-8px",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}

// ─── Hexadecimal Floating Numbers — pure CSS ─────────────────────────────────
export function HexFloating() {
  const shouldReduce = useReducedMotion();
  if (shouldReduce) return null;

  const hexChars = "0123456789ABCDEF".split("");
  const colors = [
    "text-purple-400",
    "text-pink-400",
    "text-cyan-400",
    "text-amber-400",
    "text-emerald-400",
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.08]">
      {[...Array(8)].map((_, i) => {
        const hex = `0x${hexChars[i % 16]}${hexChars[(i + 3) % 16]}`;
        return (
          <div
            key={i}
            className={`absolute ${colors[i % colors.length]} font-mono font-bold text-lg`}
            style={{
              left: `${(i * 12.5) % 100}%`,
              top: 0,
              animation: `hex-rise ${15 + (i % 5) * 3}s linear infinite`,
              animationDelay: `${-(i * 2)}s`,
              willChange: "transform",
            }}
          >
            {hex}
          </div>
        );
      })}
    </div>
  );
}
