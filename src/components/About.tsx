"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Code2, Database, Cloud, Server, Layers, Zap } from "lucide-react";
import { CyberGrid } from "./CodeAnimations";
import { SpotlightCard } from "./AnimationEffects";
import { useLanguage } from "@/context/LanguageContext";
import { getYearsOfExperience } from "@/utils/experience";

const experiencesEn = [
  {
    period: "Nov 2022 - Mar 2026",
    title: "Fullstack Developer",
    company: "MRI Software (formerly Anacle Systems), Singapore (Remote)",
    description: "Engineered and maintained enterprise SaaS platforms (Anacle Simplicity & SMRT Tenant Management System) using .NET Core, .NET Framework 4.8, Next.js, and NestJS. Integrated enterprise APIs including Bank APIs and SharePoint.",
    achievements: [
      "Go-Live SMRT Tenant Management: Delivered enterprise tenant platform digitizing mall tenders, leasing, and tenant operations.",
      "Go-Live SharePoint Document Migration: Synced 10,000+ enterprise files to SharePoint Graph API, AWS S3, and Azure Blob with RBAC & audit logging.",
      "SonarQube Security & Quality Pipeline: Spearheaded static code analysis across 100,000+ files and enforced automated CI/CD quality gates.",
    ],
  },
  {
    period: "2021 - Present",
    title: "Freelance & Side Projects",
    company: "Multiple Clients & Personal SaaS",
    description: "Designed and developed multiple POS, ERP, and AI platforms (Qualiv AI Recruitment, Stock Portfolio AI, Nagamasban AI, Grocery POS, Tire Shop ERP, Jewelry Store with RFID).",
    achievements: [
      "Qualiv Founder & Architect: Multi-tenant AI recruitment SaaS with LLM CV screening, candidate logic tests, and real-time AI interview simulation.",
      "Enterprise Retail Solutions: Delivered RFID jewelry POS (reduced stock audit from 2 hrs to 3 mins), tire shop double-entry ERP, and yarn store e-commerce.",
      "OpenClaw Security Agent: Autonomous AI server security agent with LLM log anomaly diagnosis, SSH fail2ban, and Telegram alerts.",
    ],
  },
  {
    period: "Mar 2022 - Nov 2022",
    title: "Fullstack Developer",
    company: "Software House, Surabaya, Indonesia",
    description: "Developed scalable web apps using Node.js and Next.js, optimizing high-concurrency SQL queries, managing self-hosted Git servers, and configuring Elasticsearch infrastructure.",
    achievements: [
      "Database Cleanup & Recovery: Repaired & cleaned 10,000+ corrupted database records caused by legacy code logic bugs.",
      "Incident & Ticket Elimination: Resolved core architectural bottlenecks, eliminating recurring high-priority incident tickets.",
    ],
  },
  {
    period: "Sep 2019 - Feb 2022",
    title: "Full-Stack Developer",
    company: "PT Tjiwi Kimia, Indonesia",
    description: "Developed enterprise web solutions and internal reporting modules for pulp & paper manufacturing using .NET Core, C#, ASP Classic, and SQL Server.",
    achievements: [
      "Automated OEE & HWT Metrics Reporting: Built Python/Java WhatsApp bot for real-time production analytics dispatches enabling plant target machine performance.",
      "Android Barcode Scanner: Deployed native Android app for real-time warehouse inventory stock-in / stock-out tracking.",
      "COVID-19 Employee Health Survey: Automated company-wide pandemic check-ins & contact tracing web app.",
    ],
  },
];

const experiencesId = [
  {
    period: "Nov 2022 - Mar 2026",
    title: "Fullstack Developer",
    company: "MRI Software (formerly Anacle Systems), Singapura (Remote)",
    description: "Mengembangkan & memelihara aplikasi SaaS enterprise (Anacle Simplicity & SMRT Tenant Management System) menggunakan .NET Core, Next.js, dan NestJS. Mengintegrasikan API perbankan & SharePoint.",
    achievements: [
      "Go-Live SMRT Tenant Management: Sukses rilis platform SaaS manajemen penyewa mall SMRT Singapore (digitasi tender, aplikasi tenant, leasing).",
      "Go-Live SharePoint Document Migration: Engine migrasi dokumen syncing 10.000+ file ke SharePoint Graph API, AWS S3, & Azure Blob (RBAC & audit).",
      "SonarQube Quality Pipeline: Memimpin analisis kode 100.000+ file & me-enforce zero-vulnerability quality gates di CI/CD.",
    ],
  },
  {
    period: "2021 - Sekarang",
    title: "Freelance & Side Projects",
    company: "Berbagai Klien & SaaS Mandiri",
    description: "Merancang & membangun berbagai platform POS, ERP, dan aplikasi AI (Qualiv AI Recruitment, Stock Portfolio AI, Nagamasban AI Sales Assistant, E-Commerce, POS Toko Benang, POS Emas RFID).",
    achievements: [
      "Qualiv Founder & Architect: Platform SaaS rekruitmen AI multi-tenant untuk screening CV, tes logika kandidat, & simulasi wawancara AI.",
      "Solusi Retail Enterprise: Mengembangkan POS Emas RFID (memangkas audit stok dari 2 jam ke 3 menit), ERP Ban A/R & A/P, dan E-Commerce benang.",
      "OpenClaw Security Agent: Agen keamanan VPS berbasis AI otomatis dengan fail2ban & notifikasi insiden Telegram.",
    ],
  },
  {
    period: "Mar 2022 - Nov 2022",
    title: "Fullstack Developer",
    company: "Software House, Surabaya, Indonesia",
    description: "Mengembangkan aplikasi web berbasis Node.js dan Next.js, mengoptimalkan kueri SQL performa tinggi, serta mengelola infrastruktur Elasticsearch & Git server.",
    achievements: [
      "Database Cleanup & Data Recovery: Memperbaiki & membersihkan 10.000+ data database terkorupsi akibat bug legacy code.",
      "Incident & Ticket Elimination: Menyelesaikan bottleneck arsitektur utama & mengeliminasi tiket insiden high-priority berulang.",
    ],
  },
  {
    period: "Sep 2019 - Feb 2022",
    title: "Full-Stack Developer",
    company: "PT Tjiwi Kimia, Indonesia",
    description: "Mengembangkan aplikasi web manufaktur dengan .NET Core, C#, ASP Classic, & SQL Server untuk industri kertas & pulp.",
    achievements: [
      "Automated OEE & HWT Metric Bot: WhatsApp Bot (Python/Selenium) otomatisasi laporan analitik pabrik real-time untuk pencapaian OEE & HWT.",
      "Android Barcode Scanner: Membangun aplikasi native Android pemindai barcode stok gudang real-time (stock-in/out).",
      "COVID-19 Health Survey App: Sistem web check-in & contact tracing harian karyawan se-perusahaan.",
    ],
  },
];

export default function About() {
  const { lang } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = lang === "id" ? experiencesId : experiencesEn;
  const yearsOfExperience = getYearsOfExperience();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const features = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Building end-to-end solutions from frontend to backend with modern technologies.",
    },
    {
      icon: Server,
      title: "Backend Specialist",
      description: ".NET Core, Node.js, Nest.js, Laravel - optimized for performance and scalability.",
    },
    {
      icon: Layers,
      title: "Frontend Excellence",
      description: "Next.js, React, Flutter - crafting beautiful and responsive user interfaces.",
    },
    {
      icon: Database,
      title: "Database Design",
      description: "PostgreSQL, MySQL, SQL Server, MongoDB - optimized queries and data architecture.",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "AWS, Azure, Docker, CI/CD pipelines - deploying and scaling applications.",
    },
    {
      icon: Zap,
      title: "API Integration",
      description: "RESTful APIs, GraphQL, third-party integrations including OpenAI, DBS Bank, SharePoint.",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 aurora-bg relative overflow-hidden"
    >
      {/* Cyber Animations */}
      <CyberGrid />

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
        <div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.2), transparent 70%)",
            animation: "orb1 8s ease-in-out infinite",
            willChange: "transform",
          }}
        />
        <div
          className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.15), transparent 70%)",
            animation: "orb2 10s ease-in-out infinite",
            willChange: "transform",
          }}
        />
      </div>

      {/* Floating decorative rings — CSS spin */}
      <div
        className="absolute top-20 right-10 w-20 h-20 border border-pink-500/30 rounded-full"
        style={{ animation: "spin-slow 20s linear infinite" }}
      />
      <div
        className="absolute bottom-20 left-10 w-32 h-32 border border-amber-500/30 rounded-full"
        style={{ animation: "spin-slow-reverse 25s linear infinite" }}
      />

      <div className="max-w-6xl mx-auto px-4 pb-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {lang === "id" ? "Tentang " : "About "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {lang === "id" ? "Saya" : "Me"}
            </span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Image & Info Section */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div
              className="relative w-72 h-72 mx-auto lg:mx-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-2xl"
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
              <div className="absolute inset-1 bg-gray-800 rounded-2xl overflow-hidden">
                <div className="w-full h-full relative group">
                  <Image
                    src="/img/foto.jpg"
                    alt="Andry Huang"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                suppressHydrationWarning
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                suppressHydrationWarning
              />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <motion.p
                variants={itemVariants}
                className="text-gray-300 text-lg leading-relaxed"
              >
                {lang === "id" ? (
                  <>
                    Halo! Saya <span className="text-pink-400 font-semibold">Andry Huang</span>, 
                    seorang Fullstack Engineer dengan <span className="text-amber-400 font-semibold">{yearsOfExperience}+ tahun pengalaman</span> dalam 
                    membangun & mengelola platform SaaS berskala besar, aplikasi web modern, serta solusi terintegrasi cloud & AI.
                  </>
                ) : (
                  <>
                    Hi! I&apos;m <span className="text-pink-400 font-semibold">Andry Huang</span>, 
                    a Fullstack Engineer with <span className="text-amber-400 font-semibold">{yearsOfExperience}+ years of experience</span> building 
                    and maintaining large-scale SaaS platforms, web applications, and cloud-integrated solutions.
                  </>
                )}
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-gray-300 text-lg leading-relaxed"
              >
                {lang === "id" ? (
                  <>
                    Ahli dalam .NET Core, Next.js, React, Node.js, optimasi SQL data besar, integrasi API perbankan/SharePoint, serta arsitektur AI agent & MCP. Berpengalaman dalam tim remote internasional dan pengembangan produk dari nol hingga rilis produksi.
                  </>
                ) : (
                  <>
                    Skilled in .NET Core, .NET Framework, SQL optimization, API integrations, 
                    and modern frontend frameworks such as Next.js and React. Experienced working 
                    in remote international teams and delivering end-to-end features across backend, 
                    frontend, and operational environments.
                  </>
                )}
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <div className="px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-lg neon-glow-pink">
                  <span className="text-pink-400 font-semibold">📍 Surabaya, Indonesia</span>
                </div>
                <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                  <span className="text-amber-400 font-semibold">🎓 S1 Teknik Informatika (Computer Science)</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <SpotlightCard className="h-full cursor-default">
                  <motion.div 
                    className="p-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-lg w-fit mb-3 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            {lang === "id" ? "Pengalaman " : "Work "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {lang === "id" ? "Kerja" : "Experience"}
            </span>
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500" />
            
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.2 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full border-4 border-[#030014] shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                  whileHover={{ scale: 1.5 }}
                />
                
                {/* Content */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                  <motion.div
                    className="p-6 glass-card rounded-xl hover:border-purple-500/50 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-pink-400 text-sm font-medium">{exp.period}</span>
                    <h4 className="text-xl font-bold text-white mt-2">{exp.title}</h4>
                    <p className="text-amber-400 text-sm mt-1 font-medium">{exp.company}</p>
                    <p className="text-gray-300 mt-3 text-sm leading-relaxed">{exp.description}</p>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-pink-300 flex items-center gap-1 mb-2 font-semibold">
                          ★ {lang === "id" ? "Key Achievements / Impact" : "Key Achievements / Impact"}
                        </span>
                        <ul className="space-y-1.5">
                          {exp.achievements.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-300 leading-normal">
                              <span className="text-pink-400 mt-0.5 shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Down */}
      <motion.a
        href="#skills"
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500 text-sm">Scroll Down</span>
          <div className="w-6 h-6 text-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      </motion.a>
    </section>
  );
}
