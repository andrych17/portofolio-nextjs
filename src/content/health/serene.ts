// Photos: picsum ids 1018 (hero), 1044 (spa), 1067 (lounge), 1076 (retreat)
import type { Faq, Stat } from "@/content/types";

const img = (name: string) => `/template/images/health/serene/${name}.webp`;

export type Therapy = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  temperature: string;
  duration: string;
  targetMetric: string;
  price: number;
  benefits: string[];
};

export const serene = {
  key: "health/serene",
  path: "/health/serene",
  name: "Your Brand",
  tagline: "Integrative longevity & thermal recovery",
  title: "Your Brand | Longevity Sanctuary & Thermal Recovery Clinic",
  description:
    "Your Brand combines contrast hydrotherapy, hyperbaric oxygen chambers, infrared sauna suites and targeted physiotherapy to accelerate cellular healing.",
  answer:
    "Your Brand is an integrative longevity sanctuary and thermal recovery clinic combining contrast hydrotherapy, hyperbaric oxygen, infrared sauna and evidence-based physiotherapy.",
  street: "14 Cypress Ridge",
  city: "Highland Glen",
  postalCode: "00000",
  countryCode: "US",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  hours: [
    { days: "Monday to Friday", time: "06:30 to 21:00" },
    { days: "Saturday & Sunday", time: "07:30 to 20:00" },
  ],
  nav: [
    { href: "#therapies", label: "Therapies" },
    { href: "#circuit", label: "Circuit Planner" },
    { href: "#suites", label: "Private Suites" },
    { href: "#team", label: "Physicians" },
    { href: "#faq", label: "FAQ" },
    { href: "#book", label: "Reserve Session" },
  ],
  proof: [
    "Medical-grade 2.0 ATA hyperbaric chambers",
    "Finnish dry cedar sauna & 4°C cold plunge",
    "Medical red light photobiomodulation",
    "Continuous heart rate variability tracking",
    "Private acoustic thermal suites",
    "Board-certified sports physiotherapists",
  ],
  manifesto:
    "Recovery is not idle rest. It is an active biological recalibration. By subjecting the body to controlled thermal contrast, hyper-oxygenated pressure and targeted manual release, we stimulate mitochondrial renewal, clear cellular debris and reset the autonomic nervous system.",
  heroImage: img("hero"),
  heroAlt: "Mist rising over serene mountain lake reflection representing restorative stillness",
  therapies: [
    {
      id: "contrast",
      name: "Contrast Hydrotherapy Suite",
      tagline: "85°C dry cedar sauna alternating with 4°C filtered ice plunge",
      desc: "Guided hot-cold cycles stimulate intense vascular dilation, flushing systemic metabolic waste and triggering powerful norepinephrine release.",
      temperature: "85°C / 4°C",
      duration: "60 minutes",
      targetMetric: "400% norepinephrine elevation",
      price: 95,
      benefits: ["Deep muscular inflammation flush", "Vascular tone restoration", "Immediate dopamine & mood elevation"],
    },
    {
      id: "hyperbaric",
      name: "Mild Hyperbaric Oxygen Therapy",
      tagline: "2.0 ATA ambient pressure with 95% pure oxygen infusion",
      desc: "Elevated atmospheric pressure dissolves pure oxygen directly into blood plasma and lymph fluid, reaching compromised or inflamed tissues.",
      temperature: "Ambient 21°C",
      duration: "60 to 90 minutes",
      targetMetric: "14x plasma oxygen saturation",
      price: 160,
      benefits: ["Accelerated post-surgical tissue repair", "Cognitive clarity & neuro-genesis", "Stem cell mobilization"],
    },
    {
      id: "redlight",
      name: "Full-Body Photobiomodulation",
      tagline: "660nm red & 850nm near-infrared targeted LEDs",
      desc: "Medical-grade light frequencies stimulate cytochrome c oxidase in cellular mitochondria, increasing cellular ATP production and collagen synthesis.",
      temperature: "Warm 32°C",
      duration: "20 minutes",
      targetMetric: "Mitochondrial ATP boost",
      price: 75,
      benefits: ["Deep skin fibroblast renewal", "Joint stiffness reduction", "Systemic oxidative stress buffering"],
    },
    {
      id: "physio",
      name: "Precision Neuromuscular Therapy",
      tagline: "Dry needling, joint articulation & load testing",
      desc: "One-on-one diagnostic assessment with senior sports physiotherapists, identifying root mechanical dysfunctions and restoring pain-free movement.",
      temperature: "Private suite",
      duration: "50 minutes",
      targetMetric: "Biomechanical restoration",
      price: 185,
      benefits: ["Chronic tendonitis resolution", "Spinal decompression", "Return-to-performance roadmapping"],
    },
  ] satisfies Therapy[],
  amenities: [
    {
      title: "Magnesium Mineral Baths",
      desc: "Warm thermal soaking pools infused with medical magnesium chloride flakes to relieve central nervous system tension.",
    },
    {
      title: "HEPA Medical Air Purification",
      desc: "Ten full air exchanges per hour with negative ion generation to maintain mountain-clean oxygen levels.",
    },
    {
      title: "Zero-Gravity Acoustic Loungers",
      desc: "Vibroacoustic soundbeds that transmit low-frequency sound waves through the spine to shift brainwaves into theta state.",
    },
    {
      title: "Organic Adaptogen Elixir Bar",
      desc: "Complimentary post-circuit hydration featuring cold-pressed electrolytes, tart cherry, and medicinal reishi tonics.",
    },
  ],
  team: [
    {
      name: "Dr. Arthur Vance, MD",
      role: "Medical Director & Longevity Physician",
      creds: "Johns Hopkins University · Board Certified Sports Medicine & Regenerative Care",
      blurb: "Guides individual recovery protocols, baseline biomarker screenings, and hyperbaric saturation plans.",
    },
    {
      name: "Elena Lindqvist, PT",
      role: "Lead Orthopedic & Thermal Physiotherapist",
      creds: "Karolinska Institute · Master of Musculoskeletal Physiotherapy",
      blurb: "Specializes in contrast hydrotherapy mechanics, spinal rehabilitation, and nervous system down-regulation.",
    },
  ],
  stats: [
    { value: 4, suffix: "°C", label: "Precision-chilled circulating cold plunge temperature" },
    { value: 95, suffix: "%", label: "Pure oxygen delivery in our pressurized hyperbaric suites" },
    { value: 60, suffix: " min", label: "Standard private circuit duration for total nervous reset" },
    { value: 12, suffix: " suites", label: "Acoustically isolated private contrast and recovery rooms" },
  ] satisfies Stat[],
  faqs: [
    {
      q: "What should I bring for a contrast hydrotherapy session?",
      a: "We provide organic cotton robes, plush towels, slide sandals, and natural botanical hair and skin care. Please bring swimwear for your cold plunge and sauna cycles.",
    },
    {
      q: "Is cold plunge safe for beginners or people with low tolerance?",
      a: "Yes. Our breathwork coaches guide you step-by-step through calm nasal breathing before entering. Beginners typically start with ninety seconds and build gradually under guided supervision.",
    },
    {
      q: "How does hyperbaric oxygen therapy feel inside the chamber?",
      a: "You relax comfortably on a memory foam mattress inside a spacious chamber. During pressurization, you will feel a mild ear-clearing sensation identical to descending in an airplane.",
    },
    {
      q: "Can I combine multiple therapies into a single visit?",
      a: "Yes. Our most popular protocol is the 90-minute Longevity Triad: 20 minutes of infrared light, 45 minutes of contrast hot-cold cycles, and 25 minutes of vibroacoustic sound relaxation.",
    },
    {
      q: "Do I need a doctor's referral to book physiotherapy?",
      a: "No referral is required for initial consultations. Our licensed doctors and physiotherapists conduct comprehensive diagnostic movement evaluations during your first visit.",
    },
    {
      q: "What are the health benefits of regular thermal contrast?",
      a: "Regular contrast therapy significantly reduces systemic C-reactive protein (inflammation), increases white blood cell circulation, improves sleep quality, and strengthens autonomic nervous system resilience.",
    },
  ] satisfies Faq[],
  testimonials: [
    {
      quote:
        "The contrast suites feel like a sanctuary away from the world. After 45 minutes of sauna and 4°C plunge, my chronic lower back ache simply vanished.",
      author: "Marcus Sterling",
      role: "Triathlete & Tech Founder",
    },
    {
      quote:
        "Hyperbaric oxygen followed by the red light bed cleared my persistent brain fog within three sessions. The attention to detail in their suites is unmatched.",
      author: "Dr. Clara Moreau",
      role: "Neuroscience Researcher",
    },
  ],
};
