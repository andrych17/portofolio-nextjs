import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import { CursorTrail } from "@/components/CodeAnimations";

export const metadata = {
  title: "Portfolio — Andry Huang",
  description: "Projects and work by Andry Huang — Fullstack Developer",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#030014]">
      <Navbar />
      <div className="pt-20">
        <Projects />
      </div>
      <Footer />
      <CursorTrail />
    </main>
  );
}
