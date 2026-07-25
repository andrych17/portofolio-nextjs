"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030014]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="text-2xl font-bold animated-gradient-text">
              Portfolio
            </Link>
          </motion.div>

          {/* Desktop Navigation & Lang Switcher */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navItems.map((item, index) => {
                const isActive = item.page === "/portofolio"
                  ? pathname === "/portofolio"
                  : pathname === "/";
                return (
                  <motion.div key={item.name} className="relative group" whileHover={{ y: -2 }}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, item.href)}
                      className={`text-gray-300 hover:text-white transition-colors relative text-sm font-medium ${isActive && item.page === pathname ? "text-white" : ""}`}
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-block"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item.name}
                      </motion.span>
                      <motion.span
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Language Switcher Pill */}
            <motion.button
              onClick={toggleLang}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur text-xs font-mono text-gray-200 transition-colors shadow-lg"
              title="Switch Language / Ganti Bahasa"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className={lang === "id" ? "text-cyan-300 font-bold" : "text-gray-400"}>ID</span>
              <span className="text-gray-500">|</span>
              <span className={lang === "en" ? "text-cyan-300 font-bold" : "text-gray-400"}>EN</span>
            </motion.button>
          </div>

          {/* Mobile Right Bar (Lang Switcher + Menu Button) */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-gray-200"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span className={lang === "id" ? "text-cyan-300 font-bold" : "text-gray-400"}>ID</span>
              <span className="text-gray-500">/</span>
              <span className={lang === "en" ? "text-cyan-300 font-bold" : "text-gray-400"}>EN</span>
            </button>

            <motion.button
              className="text-white p-1"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#030014]/95 backdrop-blur-md border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block text-gray-300 hover:text-white transition-colors py-2"
                    onClick={(e) => {
                      setIsOpen(false);
                      handleNavClick(e as React.MouseEvent<HTMLAnchorElement>, item.href);
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
