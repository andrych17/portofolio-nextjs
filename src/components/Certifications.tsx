"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  logo: string;
}

// TODO: Tambahkan sertifikasi Anda di sini
const certifications: Certification[] = [
  // {
  //   id: 1,
  //   title: "AWS Certified Solutions Architect",
  //   issuer: "Amazon Web Services",
  //   date: "2024",
  //   credentialId: "ABC123",
  //   link: "#",
  //   logo: "🏆",
  // },
];

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="certifications"
      ref={ref}
      className="py-20 aurora-bg relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Certifications &{" "}
            <span className="bg-gradient-to-r from-amber-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Awards
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-1 bg-gradient-to-r from-amber-500 via-pink-500 to-purple-500 mx-auto rounded-full"
          />
        </motion.div>

        {certifications.length === 0 ? (
          // Placeholder when no certifications yet
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-center"
          >
              <div className="glass-card rounded-2xl p-12 hover:shadow-[0_0_30px_rgba(236,72,153,0.1)]">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-6xl mb-6"
              >
                🏆
              </motion.div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Certifications Coming Soon
              </h3>
              <p className="text-gray-400">
                Professional certifications and awards will be displayed here.
                <br />
                Stay tuned for updates!
              </p>
            </div>
          </motion.div>
        ) : (
          // Grid of certifications
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 h-full hover:border-pink-500/50 transition-all duration-300">
                  {/* Badge/Logo */}
                  <div className="text-5xl mb-4">{cert.logo}</div>

                  {/* Title & Issuer */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-pink-400 mb-2">{cert.issuer}</p>
                  <p className="text-gray-400 text-sm mb-4">{cert.date}</p>

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <p className="text-xs text-gray-500 mb-4">
                      ID: {cert.credentialId}
                    </p>
                  )}

                  {/* View Certificate Link */}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                    >
                      <Award className="w-4 h-4" />
                      View Certificate
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/0 to-amber-500/0 group-hover:from-pink-500/10 group-hover:to-amber-500/10 transition-all duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
