"use client";

import { useState } from "react";
import { orbit } from "@/content/tech/orbit";

export function OrbitMeshTopology() {
  const [selectedNode, setSelectedNode] = useState(0);

  const clusterNodes = [
    { name: "US-East (Virginia)", gpus: "1,024 H100", ping: "8ms", x: 180, y: 140, type: "Supercluster" },
    { name: "EU-Central (Frankfurt)", gpus: "512 H100", ping: "14ms", x: 420, y: 100, type: "Supercluster" },
    { name: "AP-Northeast (Tokyo)", gpus: "640 H100", ping: "18ms", x: 680, y: 160, type: "Supercluster" },
    { name: "AP-Southeast (Singapore)", gpus: "480 H100", ping: "19ms", x: 610, y: 280, type: "Inference Pod" },
    { name: "US-West (San Jose)", gpus: "768 H100", ping: "11ms", x: 100, y: 240, type: "Supercluster" },
    { name: "SA-East (São Paulo)", gpus: "192 H100", ping: "27ms", x: 260, y: 320, type: "Edge Cache" },
  ];

  return (
    <section id="topology" className="py-20 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orbit-border bg-orbit-surface text-xs font-mono text-orbit-accent mb-4">
            <span>Global Mesh Routing</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-orbit-fg">
            Anycast BGP mesh &amp; private optical backbones.
          </h2>
          <p className="mt-4 text-base text-orbit-muted leading-relaxed">
            Requests hit the closest physical PoP in under 15ms. Inflight token activations are synchronized through non-blocking NVLink switches and private InfiniBand fabric.
          </p>
        </div>

        {/* SVG Mesh Diagram */}
        <div className="rounded-2xl border border-orbit-border bg-orbit-surface/70 p-6 lg:p-8 backdrop-blur-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 pb-6 border-b border-orbit-border/60">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-orbit-emerald animate-pulse" />
              <span className="font-mono text-xs text-orbit-fg font-semibold uppercase tracking-wider">
                Active Fabric: 42 PoPs Interconnected
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {clusterNodes.map((node, idx) => (
                <button
                  key={node.name}
                  type="button"
                  onClick={() => setSelectedNode(idx)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    selectedNode === idx
                      ? "border-orbit-accent bg-orbit-accent/20 text-white font-semibold"
                      : "border-orbit-border bg-orbit-bg/50 text-orbit-muted hover:text-orbit-fg"
                  }`}
                >
                  {node.name.split(" ")[0]} ({node.ping})
                </button>
              ))}
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="w-full h-[320px] sm:h-[400px] relative my-4 flex items-center justify-center">
            <svg
              viewBox="0 0 800 400"
              className="w-full h-full max-h-[400px] stroke-current text-orbit-border select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Mesh connection lines */}
              <line x1="180" y1="140" x2="420" y2="100" strokeWidth="1.5" stroke="rgba(139,92,246,0.3)" />
              <line x1="180" y1="140" x2="100" y2="240" strokeWidth="1.5" stroke="rgba(139,92,246,0.3)" />
              <line x1="420" y1="100" x2="680" y2="160" strokeWidth="1.5" stroke="rgba(139,92,246,0.3)" />
              <line x1="680" y1="160" x2="610" y2="280" strokeWidth="1.5" stroke="rgba(139,92,246,0.3)" />
              <line x1="180" y1="140" x2="260" y2="320" strokeWidth="1.5" stroke="rgba(139,92,246,0.3)" />
              <line x1="100" y1="240" x2="680" y2="160" strokeWidth="1" strokeDasharray="4 4" stroke="rgba(6,182,212,0.25)" />
              <line x1="420" y1="100" x2="610" y2="280" strokeWidth="1" strokeDasharray="4 4" stroke="rgba(6,182,212,0.25)" />

              {/* Animated packet circles */}
              <circle cx="300" cy="120" r="3" fill="#8b5cf6" className="animate-pulse" />
              <circle cx="550" cy="130" r="3" fill="#06b6d4" className="animate-pulse" />
              <circle cx="140" cy="190" r="3" fill="#10b981" className="animate-pulse" />

              {/* Nodes */}
              {clusterNodes.map((node, idx) => {
                const isSelected = selectedNode === idx;
                return (
                  <g
                    key={node.name}
                    className="cursor-pointer transition-transform duration-200"
                    onClick={() => setSelectedNode(idx)}
                  >
                    {/* Outer glow ring */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 20 : 12}
                      fill={isSelected ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.03)"}
                      stroke={isSelected ? "#8b5cf6" : "rgba(248,250,252,0.2)"}
                      strokeWidth={isSelected ? 2 : 1}
                    />
                    {/* Center dot */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? "#8b5cf6" : "#06b6d4"}
                    />
                    {/* Node text label */}
                    <text
                      x={node.x}
                      y={node.y + 24}
                      textAnchor="middle"
                      fill={isSelected ? "#ffffff" : "#94a3b8"}
                      fontSize="11"
                      fontFamily="monospace"
                      fontWeight={isSelected ? "bold" : "normal"}
                    >
                      {node.name.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Active Node Detail Card */}
          <div className="pt-4 border-t border-orbit-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-orbit-muted block text-[10px] uppercase">Selected Node</span>
              <span className="text-orbit-fg font-bold text-sm">{clusterNodes[selectedNode].name}</span>
            </div>
            <div>
              <span className="text-orbit-muted block text-[10px] uppercase">Cluster Compute</span>
              <span className="text-orbit-accent font-bold text-sm">{clusterNodes[selectedNode].gpus}</span>
            </div>
            <div>
              <span className="text-orbit-muted block text-[10px] uppercase">Measured Edge Ping</span>
              <span className="text-orbit-emerald font-bold text-sm">{clusterNodes[selectedNode].ping}</span>
            </div>
            <div>
              <span className="text-orbit-muted block text-[10px] uppercase">Node Topology Role</span>
              <span className="text-orbit-cyan font-bold text-sm">{clusterNodes[selectedNode].type}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
