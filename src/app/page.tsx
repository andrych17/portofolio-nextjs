import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import FeaturedWork from "@/components/FeaturedWork";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <main className="min-h-screen min-h-[100dvh] bg-[var(--bg)] text-[var(--fg)]">
      <Preloader />
      <Navbar />
      <Hero />
      <Manifesto />
      <FeaturedWork />
      <About />
      <Skills />
      <Certifications />
      <FAQ />
      <Contact />
      <Footer />
      <AIChatbot />
    </main>
  );
}
