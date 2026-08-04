"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  label?: string;
  variant?: "purple" | "cyan" | "amber" | "emerald";
  icon?: React.ReactNode;
}

const variantStyles = {
  purple: {
    line: "from-transparent via-purple-500/50 to-transparent",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
    badgeBg: "bg-purple-950/60 border-purple-500/40 text-purple-300",
    dot: "bg-purple-400",
  },
  cyan: {
    line: "from-transparent via-cyan-500/50 to-transparent",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.4)]",
    badgeBg: "bg-cyan-950/60 border-cyan-500/40 text-cyan-300",
    dot: "bg-cyan-400",
  },
  amber: {
    line: "from-transparent via-amber-500/50 to-transparent",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    badgeBg: "bg-amber-950/60 border-amber-500/40 text-amber-300",
    dot: "bg-amber-400",
  },
  emerald: {
    line: "from-transparent via-emerald-500/50 to-transparent",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    badgeBg: "bg-emerald-950/60 border-emerald-500/40 text-emerald-300",
    dot: "bg-emerald-400",
  },
};

export default function SectionDivider({
  label,
  variant = "purple",
  icon,
}: SectionDividerProps) {
  const styles = variantStyles[variant] || variantStyles.purple;

  return (
    <div className="relative w-full py-8 md:py-12 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      {/* Background ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-1/3 h-6 rounded-full blur-2xl opacity-20 bg-gradient-to-r ${styles.line}`} />
      </div>

      {/* Horizontal Divider Line */}
      <div className={`w-full max-w-6xl h-[1px] bg-gradient-to-r ${styles.line} relative flex items-center justify-center`}>
        {/* Center glowing badge / symbol */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute z-10 flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-md text-xs font-mono tracking-wider ${styles.badgeBg} ${styles.glow}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full animate-ping ${styles.dot}`} />
          {icon && <span className="text-sm">{icon}</span>}
          {label && <span>{label}</span>}
          {!icon && !label && <span className="text-[10px]">◇</span>}
        </motion.div>
      </div>
    </div>
  );
}
