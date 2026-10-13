"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { certifications } from "@/components/Certifications";
import { reveal } from "@/lib/v2/reveal";
import { Words } from "./Words";

export default function Credentials() {
  const { lang } = useLanguage();
  const id = lang === "id";
  const root = useRef<HTMLElement>(null);
  const fromAnthropic = certifications.filter((c) => c.issuer === "Anthropic").length;

  useEffect(() => (root.current ? reveal(root.current) : undefined), [lang]);

  return (
    <section className="v2-creds" id="certifications" data-section="light" ref={root}>
      <div className="v2-creds-grid">
        <div className="v2-creds-side">
          <p className="v2-eyebrow" data-r="up">
            <i />
            04 · {id ? "Sertifikasi" : "Credentials"}
          </p>
          <Words as="h2" className="v2-h v2-h-side" r="words" text={id ? "Bisa diverifikasi." : "Verifiable."} />
          <p className="v2-lede v2-soft" data-r="up">
            {id
              ? `${certifications.length} sertifikat, ${fromAnthropic} dari Anthropic. Tiap baris menuju halaman verifikasinya.`
              : `${certifications.length} certificates, ${fromAnthropic} from Anthropic. Each row opens its own verification page.`}
          </p>
        </div>

        <ul className="v2-certs">
          {certifications.map((c) => {
            const body = (
              <>
                <span className="v2-mono v2-cert-issuer">{c.issuer}</span>
                <span className="v2-cert-title">{c.title.replace(/^Certificate of completion: /, "")}</span>
                <span className="v2-mono v2-cert-date">{c.date}</span>
                {c.link && (
                  <span className="v2-cert-go" aria-label={id ? "Verifikasi" : "Verify"}>
                    <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                )}
              </>
            );
            return (
              <li key={c.id} data-r="up">
                {c.link ? (
                  <a className="v2-cert" href={c.link} target="_blank" rel="noopener noreferrer">
                    {body}
                  </a>
                ) : (
                  <div className="v2-cert">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
