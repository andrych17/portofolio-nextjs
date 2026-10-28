// Photos: picsum ids 447 (hero), 364 (studio), 433 (care), 449 (bay)
import type { Faq, Stat } from "@/content/types";

const img = (name: string) => `/template/images/health/dental/${name}.webp`;

export type Treatment = {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  duration: string;
  visits: string;
  recovery: string;
  priceEstimate: string;
  suitableFor: string[];
};

export const dental = {
  key: "health/dental",
  path: "/health/dental",
  name: "Your Brand",
  tagline: "Boutique cosmetic & restorative dentistry",
  title: "Your Brand | Boutique Cosmetic & Restorative Dental Studio",
  description:
    "Your Brand is a modern dental studio delivering bespoke porcelain veneers, clear aligners, restorative care and preventative hygiene in a calm space.",
  answer:
    "Your Brand is a boutique dental studio providing preventative care, hand-layered porcelain veneers, clear aligners and surgical implants in an anxiety-free, sensory-calm clinical environment.",
  street: "72 Harpers Way, Suite 400",
  city: "Bayside",
  postalCode: "00000",
  countryCode: "US",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  hours: [
    { days: "Monday to Thursday", time: "08:00 to 18:30" },
    { days: "Friday", time: "08:00 to 16:00" },
    { days: "Saturday", time: "09:00 to 14:00 (Cosmetic consultations)" },
    { days: "Sunday", time: "Closed for sterilization & laboratory milling" },
  ],
  nav: [
    { href: "#treatments", label: "Treatments" },
    { href: "#estimator", label: "Plan & Costs" },
    { href: "#calm", label: "Sensory Calm" },
    { href: "#doctors", label: "Clinicians" },
    { href: "#faq", label: "FAQ" },
    { href: "#consult", label: "Book Consultation" },
  ],
  proof: [
    "3D Intraoral digital scanning",
    "Zero dental impressions goop",
    "Biomimetic tooth-preserving craft",
    "On-site master ceramist lab",
    "Bespoke noise-canceling suites",
    "Transparent fixed fee schedules",
  ],
  manifesto:
    "Dental visits should not feel clinical, sterile or rushed. We combine digital 3D scans, micro-conservative porcelain artistry and a sensory-calming environment so you feel respected, relaxed, and fully in control of your smile care.",
  heroImage: img("hero"),
  heroAlt: "Luminous modern dental studio with clean minimalist architectural lines and soothing natural light",
  treatments: [
    {
      id: "veneers",
      name: "Hand-Layered Porcelain Veneers",
      tagline: "Micro-thin feldspathic porcelain crafted individually",
      desc: "Custom ceramic shells bonded to the tooth surface to correct discoloration, chipping, or slight misalignment while preserving your natural enamel.",
      duration: "90 min per visit",
      visits: "2 to 3 appointments",
      recovery: "Immediate return to daily routine",
      priceEstimate: "$1,800 – $2,400 per tooth",
      suitableFor: ["Deep tetracycline staining", "Uneven tooth lengths", "Gaps and chipped enamel"],
    },
    {
      id: "aligners",
      name: "Clear Orthodontic Aligners",
      tagline: "Digitally mapped tooth realignment",
      desc: "Nearly invisible medical-grade aligners that gently reposition your teeth over 4 to 12 months, monitored via weekly scans from your phone.",
      duration: "30 min initial scan",
      visits: "Every 8 to 10 weeks",
      recovery: "Zero downtime",
      priceEstimate: "$3,800 – $6,200 full course",
      suitableFor: ["Crowded teeth", "Crossbite & overbite", "Relapse from teenage braces"],
    },
    {
      id: "implants",
      name: "Guided Titanium Implants",
      tagline: "Permanent root-and-crown tooth replacement",
      desc: "CBCT 3D guided placement of biocompatible titanium fixtures, crowned with custom zirconia teeth that match your natural bite completely.",
      duration: "60 to 90 min procedure",
      visits: "3 visits over 4 months",
      recovery: "24-48 hours mild swelling",
      priceEstimate: "$3,200 – $4,800 per implant",
      suitableFor: ["Missing single or multiple teeth", "Failing bridge restorations", "Trauma replacement"],
    },
    {
      id: "hygiene",
      name: "Airflow Guided Biofilm Therapy",
      tagline: "Gentle warm-water plaque and stain removal",
      desc: "A warm water, erythritol powder and gentle acoustic stream that lifts stubborn stains and bacterial biofilm without sharp scraping tools.",
      duration: "45 minutes",
      visits: "Every 6 months",
      recovery: "Zero downtime",
      priceEstimate: "$220 preventative visit",
      suitableFor: ["Coffee & tea stain removal", "Sensitive gums", "Routine bi-annual maintenance"],
    },
  ] satisfies Treatment[],
  calmFeatures: [
    {
      title: "Active Noise-Canceling Audio",
      desc: "Bose headphones paired with personal streaming playlists or guided soundscapes mask all background clinic frequencies.",
    },
    {
      title: "Ceiling-Mounted Visual Suites",
      desc: "Watch films, calming nature documentaries, or meditate while reclining comfortably in memory-foam treatment chairs.",
    },
    {
      title: "Aromatherapy & Zero Clinic Scent",
      desc: "Hospital-grade HEPA air purifiers combined with organic lavender and bergamot mists eliminate traditional dental odors.",
    },
    {
      title: "Computer-Assisted Numbing",
      desc: "The Wand single-tooth anesthesia system delivers micro-dosed numbing without the stinging sensation of traditional needles.",
    },
  ],
  doctors: [
    {
      name: "Dr. Evelyn Ward, DDS",
      role: "Lead Cosmetic & Biomimetic Clinician",
      creds: "Columbia University · Fellow, American Academy of Cosmetic Dentistry",
      blurb: "Specializes in ultra-conservative feldspathic porcelain restorations and smile proportion architecture.",
    },
    {
      name: "Dr. Marcus Chen, DMD",
      role: "Implantologist & Restorative Surgeon",
      creds: "Harvard School of Dental Medicine · Board Certified Implantologist",
      blurb: "Focuses on 3D digitally guided implant surgery, bone preservation, and full-arch rehabilitation.",
    },
  ],
  stats: [
    { value: 15, suffix: " yrs", label: "Average clinical experience of each specialist doctor" },
    { value: 100, suffix: "%", label: "Digital workflow with zero uncomfortable impression goop" },
    { value: 4.9, suffix: " / 5", label: "Patient satisfaction across two thousand smile reviews" },
    { value: 0, suffix: " pain", label: "Commitment to computer-assisted gentle local numbing" },
  ] satisfies Stat[],
  faqs: [
    {
      q: "How does your studio accommodate patients with dental anxiety?",
      a: "We design every step around your comfort: unhurried thirty-minute consultation windows, noise-canceling headphones, ceiling displays, computer-controlled painless numbing, and full control to pause anytime by simply raising a hand.",
    },
    {
      q: "Do you offer complimentary smile consultations?",
      a: "Yes. All initial cosmetic and clear aligner consultations include a comprehensive 3D digital scan, bite analysis, and simulated smile mockup without charge or obligation.",
    },
    {
      q: "What is the difference between composite bonding and porcelain veneers?",
      a: "Composite bonding is sculpted directly from resin in one visit and lasts five to seven years. Porcelain veneers are custom-milled from feldspathic ceramic in our lab, resist staining permanently, and typically last fifteen to twenty years.",
    },
    {
      q: "Do you accept dental insurance?",
      a: "We are an out-of-network boutique provider, meaning we do not allow insurance fee caps to compromise materials or appointment duration. We file all claims directly with your insurer for prompt reimbursement.",
    },
    {
      q: "Are clear aligners suitable for adults who previously had braces?",
      a: "Yes. Adult orthodontic relapse is one of our most frequent treatments. Most minor alignment corrections take between three and six months using our clear aligner protocols.",
    },
    {
      q: "What should I expect during my first hygiene visit?",
      a: "Your initial visit includes low-radiation digital radiography, 3D intraoral camera mapping, periodontal gum health scoring, and painless warm-water Airflow biofilm stain removal.",
    },
  ] satisfies Faq[],
  testimonials: [
    {
      quote:
        "I had avoided dentists for seven years due to severe childhood trauma. Dr. Ward and her team treated me with incredible patience and zero judgment. The veneers look completely natural.",
      author: "Samantha Cole",
      role: "Creative Director",
    },
    {
      quote:
        "The guided implant procedure was genuinely painless. The ceiling screens with noise-canceling headphones completely changed my perception of dental care.",
      author: "David Miller",
      role: "Software Architect",
    },
  ],
};
