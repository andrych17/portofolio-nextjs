// Photos: picsum ids 625 (hero), 949 (atrium), 305 (garden), 626 (coast)
import type { Faq, Testimonial } from "@/content/types";

export type ClinicDept = {
  id: string;
  name: string;
  icon: "stethoscope" | "baby" | "tulip" | "heartbeat" | "bone" | "sun" | "testtube";
  blurb: string;
  sees: string[];
  hours: string;
  location: string;
  /** Doctor id of the department lead. */
  lead: string;
  service: string;
};

export type ClinicDoctor = {
  id: string;
  name: string;
  role: string;
  dept: string;
  languages: string[];
  years: number;
  bio: string;
  next: string;
  look: { skin: string; hair: string; hairStyle: "short" | "bun" | "long" | "curly" | "bald"; coat: string; bg: string; glasses?: boolean };
};

export type ClinicService = { id: string; label: string; minutes: number; dept: string };

export const clinic = {
  key: "health/clinic",
  name: "Your Brand",
  title: "Your Brand | Family Clinic & 24/7 Emergency Medical Desk",
  description:
    "Your Brand is a family clinic and day hospital with seven departments, online booking, an on-site lab and an emergency desk open around the clock.",
  answer:
    "Your Brand is a general clinic and small day hospital for families and adults, with seven departments under one roof, same-week appointments, an on-site lab and an emergency desk that is open around the clock.",
  city: "Harbor City",
  street: "14 Linden Court",
  postalCode: "00000",
  countryCode: "ZZ",
  country: "Your Country",
  email: "hello@yourbrand.com",
  phone: "+00 000 000 000",
  emergencyPhone: "+00 000 000 000",
  hoursShort: "Mon to Fri 08:00 to 20:00, Sat 09:00 to 15:00",
  hours: [
    { day: "Monday to Friday", time: "08:00 to 20:00" },
    { day: "Saturday", time: "09:00 to 15:00" },
    { day: "Sunday", time: "Emergency desk only" },
    { day: "Emergency desk", time: "Open 24 hours" },
  ],
  accreditations: [
    "Your Accreditation",
    "Your Quality Mark",
    "Your Hospital Network",
    "Your Safety Standard",
    "Your Insurance Partner",
    "Your Lab Certification",
  ],
  nav: [
    { label: "Departments", href: "#departments" },
    { label: "Doctors", href: "#doctors" },
    { label: "Visit", href: "#visit" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  departments: [
    {
      id: "general",
      name: "General medicine",
      icon: "stethoscope",
      blurb:
        "Your first call for most things. Check-ups, long-term condition reviews, vaccinations and the slightly vague worry that has been sitting with you for a month.",
      sees: ["Annual check-ups", "Blood pressure reviews", "Vaccinations", "Sick notes and forms", "Referrals"],
      hours: "Mon to Sat",
      location: "Ground floor, wing A",
      lead: "amara",
      service: "checkup",
    },
    {
      id: "children",
      name: "Children's health",
      icon: "baby",
      blurb:
        "A quieter corner of the clinic with a play wall, low sinks and clinicians who talk to the child first and the parent second.",
      sees: ["Growth and development checks", "Childhood vaccinations", "Fever and minor illness", "Allergy questions", "School forms"],
      hours: "Mon to Sat",
      location: "Ground floor, wing B",
      lead: "mateo",
      service: "child",
    },
    {
      id: "womens",
      name: "Women's health",
      icon: "tulip",
      blurb:
        "Unhurried appointments for routine screening, contraception advice, pregnancy planning and changes through every stage of life.",
      sees: ["Routine screening", "Contraception advice", "Pregnancy planning", "Menopause conversations", "Pelvic floor referrals"],
      hours: "Mon to Fri",
      location: "First floor, wing A",
      lead: "hana",
      service: "womens",
    },
    {
      id: "heart",
      name: "Heart and circulation",
      icon: "heartbeat",
      blurb:
        "Heart rhythm tracing, blood pressure monitoring and specialist consultations, with results discussed in the same visit wherever possible.",
      sees: ["ECG tracing", "24-hour blood pressure monitoring", "Cholesterol reviews", "Specialist consultations", "Lifestyle planning"],
      hours: "Tue to Fri",
      location: "First floor, wing B",
      lead: "elias",
      service: "heart",
    },
    {
      id: "movement",
      name: "Bones and movement",
      icon: "bone",
      blurb:
        "Physiotherapy and musculoskeletal assessment for sore backs, sports niggles and the knee that complains on stairs.",
      sees: ["Physiotherapy assessment", "Back and neck pain", "Sports injuries", "Post-operative rehab", "Posture advice"],
      hours: "Mon to Sat",
      location: "Lower floor, movement studio",
      lead: "tomas",
      service: "physio",
    },
    {
      id: "skin",
      name: "Skin",
      icon: "sun",
      blurb:
        "Mole checks, rashes and long-standing skin concerns, with minor procedures handled in a dedicated treatment room.",
      sees: ["Skin and mole checks", "Rashes and eczema", "Minor procedures", "Sun-safety advice", "Follow-up reviews"],
      hours: "Wed to Sat",
      location: "First floor, wing A",
      lead: "priya",
      service: "skin",
    },
    {
      id: "lab",
      name: "Lab and imaging",
      icon: "testtube",
      blurb:
        "Blood tests, ultrasound and X-ray on site, so a request from any department can be done on the same day.",
      sees: ["Blood tests", "Ultrasound", "X-ray", "Urine and swab tests", "Results sent to your record"],
      hours: "Mon to Sat, no booking for blood tests",
      location: "Lower floor",
      lead: "amara",
      service: "lab",
    },
  ] satisfies ClinicDept[],
  doctors: [
    {
      id: "amara",
      name: "Dr. Amara Voss",
      role: "General medicine, medical director",
      dept: "general",
      languages: ["English", "French"],
      years: 16,
      bio: "Leads the clinic's primary care team and still takes a full list of appointments.",
      next: "Tomorrow 09:20",
      look: { skin: "#8a5a3c", hair: "#1f1713", hairStyle: "curly", coat: "#ffffff", bg: "#dcebe4" },
    },
    {
      id: "mateo",
      name: "Dr. Mateo Reyes",
      role: "Children's health",
      dept: "children",
      languages: ["English", "Spanish"],
      years: 11,
      bio: "Paediatrician who explains every step to the child before touching a stethoscope.",
      next: "Today 16:40",
      look: { skin: "#d9a67e", hair: "#2a1d14", hairStyle: "short", coat: "#ffffff", bg: "#fde3da", glasses: true },
    },
    {
      id: "hana",
      name: "Dr. Hana Sato",
      role: "Women's health",
      dept: "womens",
      languages: ["English", "Japanese"],
      years: 13,
      bio: "Runs the screening programme and the pregnancy-planning clinic on Thursdays.",
      next: "Wed 11:00",
      look: { skin: "#e7bf9a", hair: "#15110e", hairStyle: "bun", coat: "#ffffff", bg: "#e4e8f1" },
    },
    {
      id: "elias",
      name: "Dr. Elias Brandt",
      role: "Heart and circulation",
      dept: "heart",
      languages: ["English", "German"],
      years: 19,
      bio: "Cardiologist with a habit of drawing the answer on the back of the results sheet.",
      next: "Thu 14:15",
      look: { skin: "#f0cdb0", hair: "#9c9a96", hairStyle: "short", coat: "#ffffff", bg: "#dcebe4", glasses: true },
    },
    {
      id: "priya",
      name: "Dr. Priya Nair",
      role: "Skin",
      dept: "skin",
      languages: ["English", "Hindi", "Malayalam"],
      years: 9,
      bio: "Dermatology doctor who checks the places you forgot to mention.",
      next: "Fri 10:30",
      look: { skin: "#a8734c", hair: "#150f0b", hairStyle: "long", coat: "#ffffff", bg: "#fde3da" },
    },
    {
      id: "tomas",
      name: "Tomas Wren",
      role: "Physiotherapy lead",
      dept: "movement",
      languages: ["English", "Polish"],
      years: 12,
      bio: "Sends you home with three exercises, not thirty, and checks you actually did them.",
      next: "Tomorrow 08:30",
      look: { skin: "#e9c4a4", hair: "#000000", hairStyle: "bald", coat: "#1b6361", bg: "#e4e8f1" },
    },
  ] satisfies ClinicDoctor[],
  services: [
    { id: "checkup", label: "General check-up", minutes: 30, dept: "general" },
    { id: "sick", label: "Same-week sick visit", minutes: 20, dept: "general" },
    { id: "child", label: "Child health visit", minutes: 30, dept: "children" },
    { id: "womens", label: "Women's health consult", minutes: 40, dept: "womens" },
    { id: "heart", label: "Heart check with ECG", minutes: 45, dept: "heart" },
    { id: "skin", label: "Skin and mole check", minutes: 30, dept: "skin" },
    { id: "physio", label: "Physiotherapy assessment", minutes: 45, dept: "movement" },
    { id: "lab", label: "Blood tests and lab", minutes: 15, dept: "lab" },
  ] satisfies ClinicService[],
  stats: [
    { value: 14, label: "Years open in the neighbourhood" },
    { value: 7, label: "Departments under one roof" },
    { value: 38, label: "Clinicians, nurses and technicians" },
    { value: 24, suffix: "/7", label: "Emergency desk, every day" },
  ],
  visit: [
    {
      title: "Book in a minute",
      body: "Use the booking tool, call the front desk or walk in. Pick the service, a doctor if you have a preference, and a time that suits you.",
    },
    {
      title: "Arrive ten minutes early",
      body: "Bring photo ID, your insurance details if you have them, and a list of any medicines you take. Check-in takes about two minutes.",
    },
    {
      title: "Get proper time",
      body: "Your clinician reads your history first, listens, examines, and explains what they think is going on and what the options are.",
    },
    {
      title: "Leave with a plan",
      body: "You get a written summary, any referrals or tests booked before you go, and one record that every department at the clinic can see.",
    },
  ],
  testimonials: [
    { quote: "I booked in the morning and was seen the same afternoon. Nobody rushed me, and the doctor wrote the plan down so I did not have to remember it.", name: "Lucia", role: "General medicine" },
    { quote: "My son usually dreads clinics. Here he got to press the button on the height chart and forgot to be nervous.", name: "Daniel", role: "Children's health" },
    { quote: "The lab was downstairs, so I had my blood tests before I even left the building. One bill, one record, no chasing.", name: "Mei", role: "Check-up and lab" },
    { quote: "I called the emergency line late on a Sunday and a nurse picked up on the second ring. She told me exactly where to go.", name: "Omar", role: "Emergency desk" },
  ] satisfies Testimonial[],
  faqs: [
    {
      q: "Do I need an appointment?",
      a: "Appointments keep waiting times short, and most people book online or by phone. Walk-ins with minor concerns are welcome during opening hours, and the emergency desk never needs an appointment.",
    },
    {
      q: "What should I bring to my first visit?",
      a: "Bring photo ID, your insurance card or payer details, a list of the medicines you take and any recent reports or test results. If you forget something, the front desk can usually sort it out.",
    },
    {
      q: "Which insurers do you work with?",
      a: "We work with most major insurers and also see self-paying patients. Ask the front desk before your visit and we will confirm in writing what is covered.",
    },
    {
      q: "What counts as an emergency?",
      a: "If you think someone's life is in danger, call your local emergency number first. Our emergency desk treats urgent but stable problems such as deep cuts, suspected fractures, high fever and sudden pain, around the clock.",
    },
    {
      q: "Can I get a copy of my records?",
      a: "Yes. Ask at the front desk or send us a message with your full name and date of birth, and we will prepare a copy for you to collect or receive securely by email.",
    },
    {
      q: "Do you see children and teenagers?",
      a: "We do. The children's department sees patients from newborn to 17, with vaccination clinics and growth checks, and a separate waiting area with a play wall.",
    },
  ] satisfies Faq[],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};

export const clinicBookingOptions = clinic.services.map((s) => s.label);
