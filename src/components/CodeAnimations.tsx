"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Helper to detect if screen is mobile size (disable background animations)
function useReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // Disable background animations on mobile screens (< 768px)
      setShouldReduceMotion(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return shouldReduceMotion;
}

// Cyber Grid Background
export function CyberGrid() {
  const shouldReduce = useReducedMotion();
  
  if (shouldReduce) return null; // Disable on mobile/Android
  
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
          animation: "gridMove 20s linear infinite"
        }} 
      />
    </div>
  );
}

// Scanning Line Effect
export function ScanLine() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ y: "-100%" }}
      animate={{ y: "100%" }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 2
      }}
    >
      <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 blur-sm" />
      <div className="h-20 bg-gradient-to-b from-cyan-500/20 to-transparent" />
    </motion.div>
  );
}



// Digital Particles
export function DigitalParticles() {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    setMounted(true);
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    const newParticles = [...Array(10)].map(() => ({
      x1: Math.random() * width,
      y1: Math.random() * height,
      x2: Math.random() * width,
      y2: Math.random() * height,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 3,
    }));
    
    setParticles(newParticles);
  }, []);

  if (!mounted || shouldReduce) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{
            x: particle.x1,
            y: particle.y1,
            opacity: 0
          }}
          animate={{
            x: [null, particle.x2],
            y: [null, particle.y2],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Matrix-style Code Rain
export function CodeRain() {
  const shouldReduce = useReducedMotion();
  const columns = 8;
  const codeChars = "{}[]()<>=;+-*/&#$@!%^&*_|~".split("");
  const languages = ["JS", "TS", "PY", "GO", "RS", "PHP", "SQL", "CSS"];

  if (shouldReduce) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-15 z-0">
      {[...Array(columns)].map((_, i) => {
        const colors = ["text-green-400", "text-cyan-400", "text-purple-400", "text-pink-400", "text-amber-400", "text-blue-400", "text-emerald-400", "text-rose-400"];
        return (
        <motion.div
          key={i}
          className={`absolute top-0 ${colors[i % colors.length]} font-mono text-xs`}
          initial={{ y: -100 }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 8 + (i % 5) * 2,
            repeat: Infinity,
            delay: (i * 0.5) % 5,
            ease: "linear",
          }}
          style={{ left: `${(i * 100) / columns}%` }}
        >
          {[...Array(20)].map((_, j) => (
            <div key={j} className="opacity-70" style={{ marginBottom: "10px" }}>
              {codeChars[(i + j) % codeChars.length]}
              {languages[(i + j) % languages.length]}
            </div>
          ))}
        </motion.div>
        );
      })}
    </div>
  );
}

// Floating Code Snippets
export function FloatingCodeSnippets() {
  const shouldReduce = useReducedMotion();
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

  if (shouldReduce) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {snippets.map((snippet, i) => (
        <motion.div
          key={i}
          className={`absolute font-mono text-sm ${snippet.color} opacity-20`}
          initial={{ 
            x: (i % 2 === 0) ? -100 : "100vw",
            y: 100 + (i * 80)
          }}
          animate={{
            x: (i % 2 === 0) ? "100vw" : -100,
            y: 100 + (i * 80) + Math.sin(i) * 50,
          }}
          transition={{
            duration: 20 + (i % 3) * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        >
          {snippet.code}
        </motion.div>
      ))}
    </div>
  );
}

// Terminal Typing Effect
export function TerminalWindow() {
  const [lines, setLines] = useState<string[]>([]);
  const commands = [
    "$ npm run build",
    "> Building project...",
    "✓ Compiled successfully",
    "$ git push origin main",
    "> Deploying to production...",
    "✓ Deployment complete!",
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < commands.length) {
        setLines((prev) => [...prev, commands[currentIndex]]);
        currentIndex++;
      } else {
        setLines([]);
        currentIndex = 0;
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed bottom-8 right-8 bg-[#030014]/90 backdrop-blur-sm rounded-lg p-4 w-80 border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.15)] z-50 hidden lg:block"
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
            className={line?.startsWith("$") ? "text-green-400" : line?.startsWith("✓") ? "text-green-400" : "text-gray-400"}
          >
            {line}
          </motion.div>
        ))}
        <motion.span
          className="inline-block w-2 h-4 bg-green-400 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

// Binary Rain Background
export function BinaryRain() {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [binaries, setBinaries] = useState<Array<{ binary: string; left: number }>>([]);

  useEffect(() => {
    setMounted(true);
    const newBinaries = [...Array(12)].map((_, i) => ({
      binary: Math.random() > 0.5 ? "1" : "0",
      left: (i * 8.33) % 100,
    }));
    setBinaries(newBinaries);
  }, []);

  if (!mounted || shouldReduce) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
      {binaries.map((item, i) => {
        const binaryColors = ["text-cyan-400", "text-purple-400", "text-pink-400", "text-emerald-400", "text-amber-400", "text-blue-400"];
        return (
        <motion.div
          key={i}
          className={`absolute ${binaryColors[i % binaryColors.length]} font-mono text-2xl font-bold`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ 
            y: "100vh",
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 10 + (i % 3) * 3,
            repeat: Infinity,
            delay: (i * 0.3) % 8,
            ease: "linear",
          }}
          style={{ left: `${item.left}%` }}
        >
          {[...Array(15)].map((_, j) => (
            <div key={j}>{(i + j) % 2}</div>
          ))}
        </motion.div>
        );
      })}
    </div>
  );
}

// Shimmer/Shine Text Effect Component - No blur, crisp text
export function GlitchText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      {/* Shine overlay - moves across text */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        style={{
          maskImage: "linear-gradient(to right, transparent, white, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, white, transparent)"
        }}
        animate={{
          x: ["-200%", "200%"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear"
        }}
      />
    </span>
  );
}

// Cursor Trail Effect
export function CursorTrail() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed w-4 h-4 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full pointer-events-none z-50 hidden lg:block"
        animate={{ x: position.x - 8, y: position.y - 8 }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      <motion.div
        className="fixed w-8 h-8 border-2 border-pink-400/30 rounded-full pointer-events-none z-50 hidden lg:block"
        animate={{ x: position.x - 16, y: position.y - 16 }}
        transition={{ type: "spring", damping: 20, stiffness: 150 }}
      />
    </>
  );
}

// Hexadecimal Floating Numbers
export function HexFloating() {
  const shouldReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const hexChars = "0123456789ABCDEF".split("");
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || shouldReduce) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-8">
      {[...Array(20)].map((_, i) => {
        const hex = `0x${hexChars[i % 16]}${hexChars[(i + 3) % 16]}`;
        const left = (i * 5) % 100;
        const duration = 15 + (i % 5) * 3;
        const hexColors = ["text-purple-400", "text-pink-400", "text-cyan-400", "text-amber-400", "text-emerald-400"];
        
        return (
          <motion.div
            key={i}
            className={`absolute ${hexColors[i % hexColors.length]} font-mono font-bold text-lg`}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ 
              y: -100,
              opacity: [0, 1, 0],
              rotate: 360,
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay: (i * 0.8) % 10,
              ease: "linear",
            }}
            style={{ left: `${left}%` }}
          >
            {hex}
          </motion.div>
        );
      })}
    </div>
  );
}
