"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ArrowUpRight, Github, Linkedin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { RollLink } from "./ui/RollLink";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, toggleLang } = useLanguage();

  const navItems = [
    { name: lang === "id" ? "Beranda" : "Home", href: "/#home", page: "/" },
    { name: lang === "id" ? "Tentang" : "About", href: "/#about", page: "/" },
    { name: lang === "id" ? "Keahlian" : "Skills", href: "/#skills", page: "/" },
    { name: lang === "id" ? "Portofolio" : "Portfolio", href: "/portofolio", page: "/portofolio" },
    { name: lang === "id" ? "Sertifikasi" : "Certifications", href: "/#certifications", page: "/" },
    { name: lang === "id" ? "Kontak" : "Contact", href: "/#contact", page: "/" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const targetPath = href.slice(0, hashIndex) || "/";
    if (targetPath !== pathname) return;
    e.preventDefault();
    const hash = href.slice(hashIndex);
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        const navHeight = 64;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - navHeight, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${
          isOpen
            ? "bg-[var(--bg)] border-b border-[var(--line)]"
            : scrolled
            ? "border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="px-[var(--pad-x)]">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
            >
              Portfolio
            </Link>

            {/* Desktop Navigation & Lang Switcher */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-6">
                {navItems.map((item) => {
                  const isActive = item.page === pathname;
                  return (
                    <RollLink
                      key={item.name}
                      href={item.href}
                      className={`font-mono text-xs uppercase tracking-[0.14em] py-3 ${
                        isActive ? "text-[var(--accent)]" : "text-[var(--fg-2)]"
                      }`}
                    >
                      {item.name}
                    </RollLink>
                  );
                })}
              </div>

              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 font-mono text-xs py-3 cursor-pointer hover:opacity-80 transition-opacity"
                title="Switch Language / Ganti Bahasa"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--mut)]" />
                <span className={lang === "id" ? "text-[var(--accent)] font-semibold" : "text-[var(--mut)]"}>ID</span>
                <span className="text-[var(--mut)]">/</span>
                <span className={lang === "en" ? "text-[var(--accent)] font-semibold" : "text-[var(--mut)]"}>EN</span>
              </button>
            </div>

            {/* Mobile Right Bar */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 px-2.5 py-2 font-mono text-xs rounded-lg border border-[var(--line)] bg-white/5 active:scale-95 transition-transform cursor-pointer"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--mut)]" />
                <span className={lang === "id" ? "text-[var(--accent)] font-bold" : "text-[var(--mut)]"}>ID</span>
                <span className="text-[var(--mut)]">/</span>
                <span className={lang === "en" ? "text-[var(--accent)] font-bold" : "text-[var(--mut)]"}>EN</span>
              </button>

              <button
                className="text-[var(--fg)] p-2.5 rounded-lg border border-[var(--line)] bg-white/5 active:scale-95 transition-transform cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={20} className="text-[var(--accent)]" /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-16 bottom-0 z-[90] bg-[var(--bg)] flex flex-col justify-between overflow-y-auto px-[var(--pad-x)] py-6"
          >
            {/* Nav list */}
            <div className="flex flex-col">
              {navItems.map((item, index) => {
                const isActive = item.page === pathname;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25 }}
                    className="border-b border-[var(--line)]"
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between py-4 text-2xl font-medium tracking-tight transition-colors ${
                        isActive ? "text-[var(--accent)]" : "text-[var(--fg)] hover:text-[var(--accent)]"
                      }`}
                      onClick={(e) => handleNavClick(e, item.href)}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-[var(--mut)] tabular-nums">
                          0{index + 1}
                        </span>
                        <span>{item.name}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[var(--mut)]" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Drawer Actions */}
            <div className="mt-8 pt-6 border-t border-[var(--line)] flex flex-col gap-4">
              <a
                href="https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--bg)] font-semibold text-sm tracking-wide shadow-lg active:scale-98 transition-transform"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === "id" ? "Hubungi via WhatsApp" : "Chat on WhatsApp"}</span>
              </a>

              <div className="flex items-center justify-between text-xs font-mono text-[var(--mut)] pt-2">
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/andrych17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[var(--fg-2)] hover:text-[var(--accent)] py-1"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/andry-huang-ba410a170"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[var(--fg-2)] hover:text-[var(--accent)] py-1"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
                <span>Surabaya, ID</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
