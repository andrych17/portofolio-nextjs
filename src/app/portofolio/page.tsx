import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";
import { CursorTrail } from "@/components/CodeAnimations";

export const metadata = {
  title: "Portfolio — Andry Huang",
  description: "Projects and work by Andry Huang — Fullstack Developer",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen min-h-[100dvh] bg-[#030014]">
      <Navbar />
      <div className="pt-20">
        <Projects />
      </div>
      <Footer />
      <AIChatbot />
      <CursorTrail />
    </main>
  );
}
