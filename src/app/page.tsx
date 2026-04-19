import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { TerminalWindow, CursorTrail } from "@/components/CodeAnimations";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030014]">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
      <TerminalWindow />
      <CursorTrail />
    </main>
  );
}
