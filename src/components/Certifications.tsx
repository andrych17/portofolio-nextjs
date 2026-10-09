"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Title } from "./ui/Title";

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    title: "Certificate of completion: AI Capabilities and Limitations",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "exhhy4ripy8p",
    link: "https://verify.skilljar.com/c/exhhy4ripy8p",
  },
  {
    id: 2,
    title: "Certificate of completion: Introduction to subagents",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "ziob4haqtfxa",
    link: "https://verify.skilljar.com/c/ziob4haqtfxa",
  },
  {
    id: 3,
    title: "Certificate of completion: Introduction to agent skills",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "9d6emc43e68b",
    link: "https://verify.skilljar.com/c/9d6emc43e68b",
  },
  {
    id: 4,
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "nucfxrj2cxoy",
    link: "https://verify.skilljar.com/c/nucfxrj2cxoy",
  },
  {
    id: 5,
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "hdv4nqhaequh",
    link: "https://verify.skilljar.com/c/hdv4nqhaequh",
  },
  {
    id: 6,
    title: "Building with the Claude API",
    issuer: "Anthropic",
    date: "Jul 2026",
    credentialId: "3ik737t8atvf",
    link: "https://verify.skilljar.com/c/3ik737t8atvf",
  },
  {
    id: 7,
    title: "AI Agents with Model Context Protocol",
    issuer: "Vanderbilt University",
    date: "Jun 2026",
    credentialId: "ZI2P1DZ8J56C",
    link: "https://www.coursera.org/account/accomplishments/records/ZI2P1DZ8J56C",
  },
  {
    id: 8,
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "Jun 2026",
    credentialId: "opzctbnhdmcs",
    link: "https://verify.skilljar.com/c/opzctbnhdmcs",
  },
  {
    id: 9,
    title: "Certificate of completion: Introduction to Claude Cowork",
    issuer: "Anthropic",
    date: "Jun 2026",
    credentialId: "zydanea62pwv",
    link: "https://verify.skilljar.com/c/zydanea62pwv",
  },
  {
    id: 10,
    title: "Certificate of completion: Claude 101",
    issuer: "Anthropic",
    date: "Jun 2026",
    credentialId: "fyrqffssmxur",
    link: "https://verify.skilljar.com/c/fyrqffssmxur",
  },
  {
    id: 11,
    title: "Software Architecture & Design of Modern Large Scale Systems",
    issuer: "Udemy",
    date: "Feb 2026",
    credentialId: "UC-ff06e4f9-87de-44cd-b029-c7ad33e03e80",
    link: "https://www.udemy.com/certificate/UC-ff06e4f9-87de-44cd-b029-c7ad33e03e80/",
  },
];

export default function Certifications() {
  const { lang } = useLanguage();
  const id = lang === "id";
  const fromAnthropic = certifications.filter((c) => c.issuer === "Anthropic").length;

  return (
    <section id="certifications" data-stage="certifications" className="ah-sec ah-side-right">
      <Title
        no="04"
        meta={
          id
            ? `${certifications.length} sertifikat · ${fromAnthropic} dari Anthropic`
            : `${certifications.length} certificates · ${fromAnthropic} from Anthropic`
        }
      >
        {id ? "Sertifikasi" : "Certified"}
      </Title>

      <ul className="ah-certs">
        {certifications.map((c) => {
          const body = (
            <>
              <span className="ah-mono ah-cert-issuer">{c.issuer}</span>
              <span className="ah-cert-title">{c.title.replace(/^Certificate of completion: /, "")}</span>
              <span className="ah-mono ah-cert-date">{c.date}</span>
              {c.link && (
                <span className="ah-mono ah-cert-go">
                  {id ? "Verifikasi" : "Verify"}
                  <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                </span>
              )}
            </>
          );
          return (
            <li key={c.id}>
              {c.link ? (
                <a className="ah-cert" href={c.link} target="_blank" rel="noopener noreferrer">
                  {body}
                </a>
              ) : (
                <div className="ah-cert">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
