import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Stage from "@/components/stage/Stage";
import Hero from "@/components/Hero";
import Career from "@/components/Career";
import Works from "@/components/Works";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

export default function Home() {
  return (
    // "user": framer drops transforms for reduced-motion visitors, with no server/client branch to mismatch
    <MotionConfig reducedMotion="user">
      <main className="ah-home">
        <Stage />
        <Navbar />
        <Hero />
        <Career />
        <Works />
        <Skills />
        <Certifications />
        <FAQ />
        <Contact />
        <Footer />
        <AIChatbot />
      </main>
    </MotionConfig>
  );
}
