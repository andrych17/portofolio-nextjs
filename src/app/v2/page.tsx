import Smooth from "@/components/v2/Smooth";
import Loader from "@/components/v2/Loader";
import Header from "@/components/v2/Header";
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
      {/* Smooth first: the loader stops and restarts its scroll engine. */}
      <Smooth />
      <Loader />
      <div className="v2-trans" aria-hidden="true">
        <div className="v2-trans-clip">
          <div className="v2-trans-rings">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <noscript>
        <style>{".v2-loader{display:none}"}</style>
      </noscript>
      <Header />
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
