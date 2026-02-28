"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/andrych17", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/andry-huang-ba410a170", label: "LinkedIn" },
    { icon: MessageCircle, href: "https://wa.me/6281357296386?text=Hi%20Andry%2C%20I'm%20interested%20in%20discussing%20a%20project%20with%20you", label: "WhatsApp" },
  ];

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-[#030014] border-t border-white/10 relative overflow-hidden">
      {/* Subtle aurora glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] h-[100px] rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%)" }} />
        <div className="absolute top-0 right-1/4 w-[300px] h-[100px] rounded-full blur-[80px]" style={{ background: "radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%)" }} />
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <motion.a
              href="#home"
              className="text-2xl font-bold animated-gradient-text inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Portfolio
            </motion.a>
            <p className="text-gray-400 text-sm">
              Building digital experiences with passion and precision.
              Let&apos;s create something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-wrap gap-4">
              {footerLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-card rounded-lg transition-colors hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-1">
            © {currentYear} Made with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            by Andry Huang
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2 glass-card rounded-full text-gray-400 hover:text-white transition-colors text-sm hover:shadow-[0_0_15px_rgba(236,72,153,0.2)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
