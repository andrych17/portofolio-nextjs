import type { Faq, Stat } from "@/content/types";

export type ModelSpec = {
  id: string;
  name: string;
  family: string;
  contextWindow: string;
  ttft: string;
  throughput: string;
  pricePer1MTokens: string;
  vramRequired: string;
};

export type EdgeRegion = {
  id: string;
  city: string;
  region: string;
  flag: string;
  pingMs: number;
  status: "optimal" | "active";
  cluster: string;
};

export type BentoFeature = {
  id: string;
  title: string;
  category: string;
  description: string;
  stat: string;
  statLabel: string;
};

export const orbit = {
  key: "tech/orbit",
  path: "/tech/orbit",
  name: "Your Brand",
  tagline: "Distributed GPU cloud & edge inference infrastructure",
  title: "Your Brand | Distributed GPU Cloud & Edge Inference Platform",
  description:
    "Your Brand delivers serverless GPU inference across 42 global edge points of presence. Scale open-weight models with sub-15ms TTFT and zero cold starts.",
  answer:
    "Your Brand provides high-throughput serverless GPU infrastructure and edge AI routing, delivering sub-15ms time-to-first-token across 42 global datacenters with 900 GB/s NVLink interconnects.",
  street: "500 Howard Street, Suite 400",
  city: "San Francisco",
  postalCode: "94105",
  countryCode: "US",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  nav: [
    { href: "#topology", label: "Topology" },
    { href: "#calculator", label: "Inference Calculator" },
    { href: "#latency", label: "Global Edge" },
    { href: "#architecture", label: "Architecture" },
    { href: "#pricing", label: "Pricing" },
    { href: "#faq", label: "FAQ" },
    { href: "#cluster", label: "Deploy Cluster" },
  ],
  stats: [
    { value: 14, suffix: "ms", label: "Average global Time-to-First-Token (TTFT)" },
    { value: 42, label: "Tier-IV edge inference points of presence" },
    { value: 900, suffix: " GB/s", label: "Bidirectional GPU-to-GPU NVLink bandwidth" },
    { value: 99.99, suffix: "%", label: "Contractual uptime Service Level Agreement" },
  ] satisfies Stat[],
  models: [
    {
      id: "llama-3-3-70b",
      name: "Llama 3.3 70B Instruct",
      family: "Meta",
      contextWindow: "128k tokens",
      ttft: "12ms",
      throughput: "185 tokens/sec",
      pricePer1MTokens: "$0.48",
      vramRequired: "4x H100 (80GB)",
    },
    {
      id: "deepseek-v3",
      name: "DeepSeek V3 (671B MoE)",
      family: "DeepSeek AI",
      contextWindow: "64k tokens",
      ttft: "16ms",
      throughput: "92 tokens/sec",
      pricePer1MTokens: "$0.85",
      vramRequired: "8x H100 Cluster",
    },
    {
      id: "qwen-2-5-72b",
      name: "Qwen 2.5 72B Coder",
      family: "Alibaba Cloud",
      contextWindow: "128k tokens",
      ttft: "13ms",
      throughput: "160 tokens/sec",
      pricePer1MTokens: "$0.52",
      vramRequired: "4x H100 (80GB)",
    },
    {
      id: "mistral-large-2",
      name: "Mistral Large 2 (123B)",
      family: "Mistral AI",
      contextWindow: "128k tokens",
      ttft: "15ms",
      throughput: "115 tokens/sec",
      pricePer1MTokens: "$0.75",
      vramRequired: "8x H100 Cluster",
    },
  ] satisfies ModelSpec[],
  regions: [
    { id: "us-east", city: "North Virginia", region: "us-east-1", flag: "US", pingMs: 8, status: "optimal", cluster: "1,024 H100 SXM5" },
    { id: "us-west", city: "San Jose", region: "us-west-1", flag: "US", pingMs: 11, status: "optimal", cluster: "768 H100 SXM5" },
    { id: "eu-central", city: "Frankfurt", region: "eu-central-1", flag: "DE", pingMs: 14, status: "optimal", cluster: "512 H100 SXM5" },
    { id: "eu-west", city: "London", region: "eu-west-2", flag: "GB", pingMs: 15, status: "optimal", cluster: "384 H100 SXM5" },
    { id: "ap-northeast", city: "Tokyo", region: "ap-northeast-1", flag: "JP", pingMs: 18, status: "optimal", cluster: "640 H100 SXM5" },
    { id: "ap-southeast", city: "Singapore", region: "ap-southeast-1", flag: "SG", pingMs: 19, status: "optimal", cluster: "480 H100 SXM5" },
    { id: "ap-south", city: "Mumbai", region: "ap-south-1", flag: "IN", pingMs: 24, status: "active", cluster: "256 H100 SXM5" },
    { id: "sa-east", city: "São Paulo", region: "sa-east-1", flag: "BR", pingMs: 27, status: "active", cluster: "192 H100 SXM5" },
  ] satisfies EdgeRegion[],
  bento: [
    {
      id: "nvlink-switch",
      category: "Hardware Interconnect",
      title: "Non-Blocking NVLink Switch Fabric",
      description: "Direct all-to-all GPU communication without CPU or PCI-e bottlenecks. Multi-node tensor parallelism executes with zero serialization penalty.",
      stat: "3.2 Tbps",
      statLabel: "InfiniBand Quantum-2 per node",
    },
    {
      id: "zero-cold-start",
      category: "Container Runtime",
      title: "P2P Warm-Weight Speculative Streaming",
      description: "Model weights reside on pre-mapped high-speed NVMe flash arrays. New worker instances spin up, stream checkpoint shards, and begin inference in under 80 milliseconds.",
      stat: "< 80ms",
      statLabel: "Container initialization latency",
    },
    {
      id: "speculative-decoding",
      category: "Inference Engine",
      title: "Distributed Speculative Decoding",
      description: "Draft tokens generated by tiny edge student models are verified in batch on H100 clusters, producing a 2.8x speedup in wall-clock token generation time.",
      stat: "2.8x",
      statLabel: "Throughput acceleration multiplier",
    },
    {
      id: "confidential-compute",
      category: "Security & Compliance",
      title: "Hardware Enclave Confidential Compute",
      description: "Every payload is decrypted exclusively inside NVIDIA H100 hardware-isolated secure enclaves. Zero unencrypted model weights or prompts in host memory.",
      stat: "SOC2 Type II",
      statLabel: "HIPAA & ISO-27001 certified",
    },
  ] satisfies BentoFeature[],
  pricing: [
    {
      name: "Serverless Pay-As-You-Go",
      price: "$0.00",
      period: "per minute idle",
      description: "Perfect for production APIs, dynamic burst traffic, and multi-tenant applications.",
      badge: "Most Flexible",
      features: [
        "Pay strictly per generated token",
        "Scale from 0 to 1,000+ concurrent streams",
        "Sub-15ms edge routing across 42 regions",
        "OpenAI & vLLM compatible drop-in API",
        "Community Discord & 99.9% uptime SLA",
      ],
      cta: "Start Free Sandbox",
      highlight: false,
    },
    {
      name: "Dedicated GPU Pod",
      price: "$2.85",
      period: "per H100 GPU / hour",
      description: "Reserved, private GPU nodes for high-throughput continuous inference and fine-tuning.",
      badge: "Recommended",
      features: [
        "Dedicated NVIDIA H100 SXM5 (80GB VRAM)",
        "Guaranteed zero noisy neighbor contention",
        "Custom vLLM / SGLang / TensorRT-LLM container",
        "Direct NVLink cross-node interconnect",
        "Priority 24/7 Slack support & 99.99% SLA",
      ],
      cta: "Deploy Dedicated Pod",
      highlight: true,
    },
    {
      name: "Enterprise Private Supercluster",
      price: "Custom",
      period: "annual commitment",
      description: "Isolated bare-metal clusters with private VPC peering, bespoke hardware SLAs and compliance.",
      badge: "Enterprise",
      features: [
        "Custom cluster sizing (up to 4,096 GPUs)",
        "Direct AWS Direct Connect & GCP Interconnect",
        "On-premise edge appliance deployments",
        "Dedicated infrastructure reliability engineer",
        "Custom BAA, HIPAA & ISO-27001 data governance",
      ],
      cta: "Schedule Architecture Review",
      highlight: false,
    },
  ],
  faqs: [
    {
      q: "How does Your Brand achieve sub-15ms Time-to-First-Token?",
      a: "We run intelligent edge proxy nodes in 42 Tier-IV facilities worldwide. The client connection terminates at the closest geographic POP via Anycast BGP routing, streaming pre-processed token embeddings over private fiber backbones directly into pre-warmed GPU memory pools.",
    },
    {
      q: "Can I replace my OpenAI API endpoint with Your Brand without changing code?",
      a: "Yes. Our inference gateway provides 100% drop-in compatibility with the OpenAI SDK. Simply change the baseURL to https://api.yourbrand.com/v1 and supply your API key.",
    },
    {
      q: "What open-weight models are supported out of the box?",
      a: "We maintain optimized fp8 and bf16 model weights for Llama 3.3 (8B, 70B), DeepSeek V3 & R1, Qwen 2.5, Mistral Large 2, Gemma 2, and Whisper Large v3. Custom fine-tuned LoRA adapters can be loaded on the fly in under 50ms.",
    },
    {
      q: "How does scaling to zero work on serverless endpoints?",
      a: "When traffic ceases, GPU allocations are yielded back into our global warm pool. Thanks to our proprietary NVMe-over-Fabrics weight caching, when a new request arrives, your model instance resumes execution in under 80 milliseconds.",
    },
    {
      q: "Are my customer prompts or data stored or used to train models?",
      a: "Never. We enforce a strict zero-retention policy. Inference requests pass through memory-only pipelines and are wiped immediately upon completion. We also offer hardware-isolated Confidential Computing enclaves on NVIDIA Hopper architectures.",
    },
    {
      q: "Do you offer private networking and VPC peering?",
      a: "Yes. Dedicated Pods and Enterprise Superclusters can be peered directly into your AWS VPC, Google Cloud VPC, or Azure VNet over private IP addresses with AWS PrivateLink or Direct Connect.",
    },
  ] satisfies Faq[],
  testimonials: [
    {
      quote:
        "Migrating our real-time voice translation pipeline from standard hyperscalers to Your Brand cut our TTFT from 180ms to 24ms, cutting customer speech interruptions to near zero.",
      author: "Elena Rostova",
      role: "VP of Engineering, Cognition Systems",
    },
    {
      quote:
        "We serve over 450 million tokens per day. The serverless cold-start performance and predictable token pricing reduced our monthly GPU bill by 42%.",
      author: "Marcus Vance",
      role: "CTO, Synthetix AI",
    },
  ],
};
