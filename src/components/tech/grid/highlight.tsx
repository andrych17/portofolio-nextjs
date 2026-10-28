import type { ReactNode } from "react";

type Kind = "n" | "k" | "s" | "c" | "d";
export type Seg = { text: string; kind: Kind };

const RE = /(#.*$|\/\/.*$)|("[^"\n]*")|(\b(?:import|from|const|await|new|if|return|curl|npm|export|yb)\b)|(\b\d[\d_.]*\b)/gm;

/** Tiny tokenizer for the code samples. Not a parser, just enough colour. */
export function tokenize(code: string): Seg[] {
  const out: Seg[] = [];
  let last = 0;
  for (const m of code.matchAll(RE)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ text: code.slice(last, i), kind: "n" });
    out.push({ text: m[0], kind: m[1] ? "c" : m[2] ? "s" : m[3] ? "k" : "d" });
    last = i + m[0].length;
  }
  if (last < code.length) out.push({ text: code.slice(last), kind: "n" });
  return out;
}

/** Tones are paper opacities on the dark terminal and ink opacities on light panels. */
const DARK: Record<Kind, string> = { n: "text-white/90", k: "text-white font-medium", s: "text-white/60", c: "text-white/35", d: "text-white/75" };
const LIGHT: Record<Kind, string> = { n: "text-fg", k: "text-accent font-medium", s: "text-fg/60", c: "text-fg/40", d: "text-fg/75" };

/** Render the first `count` characters of the tokenized code. */
export function renderSegs(segs: Seg[], count: number, tone: "dark" | "light" = "dark"): ReactNode[] {
  const map = tone === "dark" ? DARK : LIGHT;
  const out: ReactNode[] = [];
  let left = count;
  for (let i = 0; i < segs.length && left > 0; i++) {
    const t = segs[i].text.slice(0, left);
    left -= t.length;
    out.push(
      <span key={i} className={map[segs[i].kind]}>
        {t}
      </span>,
    );
  }
  return out;
}
