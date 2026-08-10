import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import { TerminalWindow, CursorTrail } from "@/components/CodeAnimations";
import SectionDivider from "@/components/SectionDivider";
import { User, Cpu, Award, HelpCircle, Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen min-h-[100dvh] bg-[#030014]">
      <Navbar />
      <Hero />
      <SectionDivider variant="purple" label="ABOUT ME" icon={<User className="w-3.5 h-3.5" />} />
      <About />
      <SectionDivider variant="cyan" label="SKILLS & STACK" icon={<Cpu className="w-3.5 h-3.5" />} />
      <Skills />
      <SectionDivider variant="amber" label="CERTIFICATIONS & CREDENTIALS" icon={<Award className="w-3.5 h-3.5" />} />
      <Certifications />
      <SectionDivider variant="purple" label="FREQUENTLY ASKED QUESTIONS" icon={<HelpCircle className="w-3.5 h-3.5" />} />
      <FAQ />
      <SectionDivider variant="emerald" label="CONTACT & INQUIRIES" icon={<Mail className="w-3.5 h-3.5" />} />
      <Contact />
      <Footer />
      <AIChatbot />
      <TerminalWindow />
      <CursorTrail />
    </main>
  );
}

