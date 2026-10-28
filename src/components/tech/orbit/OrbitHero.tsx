"use client";

import { useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText } from "@/components/motion/MaskText";
import { Tilt } from "@/components/motion/Tilt";
import { orbit } from "@/content/tech/orbit";

export function OrbitHero() {
  const [copied, setCopied] = useState(false);

  const curlSnippet = `curl https://api.yourbrand.com/v1/chat/completions \\
  -H "Authorization: Bearer $ORBIT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "llama-3.3-70b-instruct",
    "stream": true,
    "messages": [{"role": "user", "content": "Simulate quantum packet routing"}]
  }'`;

  function copyCode() {
    navigator.clipboard?.writeText(curlSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section id="top" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orbit-accent/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-orbit-cyan/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-orbit-border bg-orbit-surface/80 px-3.5 py-1.5 text-xs text-orbit-fg backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-orbit-emerald animate-pulse" />
              <span className="font-mono text-orbit-muted">Anycast Edge Network:</span>
              <span className="font-semibold text-orbit-emerald">42 Regions Online</span>
            </div>

            <MaskText
              as="h1"
              className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-orbit-fg leading-[1.04]"
              lines={[
                "Distributed GPU cloud",
                <span key="2" className="bg-gradient-to-r from-orbit-accent via-orbit-cyan to-orbit-emerald bg-clip-text text-transparent">
                  for ultra-low latency AI.
                </span>,
              ]}
            />

            <p className="text-base sm:text-lg text-orbit-muted max-w-2xl font-sans leading-relaxed">
              Eliminate cold starts and sluggish round trips. Run frontier open-weight models across 42 global edge points of presence with guaranteed sub-15ms Time-to-First-Token.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Magnetic strength={0.22}>
                <a
                  href="#cluster"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orbit-accent px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:bg-orbit-accent/90 transition-all hover:scale-[1.02]"
                >
                  <span>Deploy Serverless Cluster</span>
                  <ArrowUpRightIcon size={16} weight="bold" />
                </a>
              </Magnetic>
              <Magnetic strength={0.18}>
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-orbit-border bg-orbit-surface px-6 py-3.5 text-sm font-semibold text-orbit-fg hover:bg-orbit-surface-hover hover:border-orbit-border/80 transition-all"
                >
                  <span>Calculate Cost Savings</span>
                </a>
              </Magnetic>
            </div>

            {/* Proof Badges */}
            <div className="pt-6 border-t border-orbit-border/60 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-orbit-muted">
              <div>
                <span className="block text-orbit-fg font-bold text-sm">900 GB/s</span>
                <span>NVLink Switch Fabric</span>
              </div>
              <div>
                <span className="block text-orbit-fg font-bold text-sm">&lt; 80ms</span>
                <span>Warm-Weight Spinup</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-orbit-fg font-bold text-sm">100% Drop-In</span>
                <span>OpenAI SDK Compatible</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Terminal Code Preview with 3D Tilt */}
          <div className="lg:col-span-5">
            <Tilt max={7} className="rounded-2xl border border-orbit-border bg-orbit-surface/90 shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-orbit-border px-4 py-3 bg-orbit-bg/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-orbit-muted">api.yourbrand.com/v1</span>
                </div>
                <button
                  type="button"
                  onClick={copyCode}
                  className="rounded px-2 py-1 font-mono text-[11px] text-orbit-muted hover:text-orbit-fg border border-orbit-border/50 hover:bg-orbit-surface transition-colors"
                >
                  {copied ? "Copied" : "Copy cURL"}
                </button>
              </div>

              {/* Code snippet */}
              <div className="p-4 sm:p-5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                <pre>
                  <code>{curlSnippet}</code>
                </pre>
              </div>

              {/* Live Streaming Response Simulation */}
              <div className="border-t border-orbit-border bg-orbit-bg/80 p-4 font-mono text-xs">
                <div className="flex items-center justify-between text-orbit-muted text-[11px] mb-2">
                  <span className="flex items-center gap-1.5 text-orbit-emerald font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-orbit-emerald animate-ping" />
                    HTTP/2 200 OK · Streaming
                  </span>
                  <span>TTFT: 11.4ms</span>
                </div>
                <p className="text-orbit-cyan">
                  {`data: {"choices":[{"delta":{"content":"Routing quantum packets across Tokyo -> Frankfurt NVLink fabric with zero hop latency..."}}]}`}
                </p>
                <div className="mt-2 text-[10px] text-orbit-muted/70 flex items-center justify-between">
                  <span>Tokens: 184 tok/s</span>
                  <span>Region: edge-ap-northeast-1</span>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
