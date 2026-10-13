import Chrome from "@/components/v2/Chrome";
import Hero from "@/components/v2/Hero";
import Intro from "@/components/v2/Intro";
import Career from "@/components/v2/Career";
import Works from "@/components/v2/Works";
import Stack from "@/components/v2/Stack";
import Credentials from "@/components/v2/Credentials";
import Faq from "@/components/v2/Faq";
import Contact from "@/components/v2/Contact";
import Footer from "@/components/v2/Footer";

export default function V2Page() {
  return (
    <>
      <Chrome />
      <main>
        <Hero />
        <Intro />
        <Career />
        <Works />
        <Stack />
        <Credentials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
