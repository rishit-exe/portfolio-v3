"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { RESUME_URL } from "@/app/lib/constants";

const CONTACTS = [
  { label: "Email", value: "rishit.vns05@gmail.com", href: "mailto:rishit.vns05@gmail.com" },
  // { label: "Phone", value: "+91 9454696069", href: "tel:+919454696069" },
  { label: "LinkedIn", value: "linkedin.com/in/rishit-srivastava", href: "https://linkedin.com/in/rishit-srivastava" },
  { label: "GitHub", value: "github.com/rishit-exe", href: "https://github.com/rishit-exe" },
  { label: "Website", value: "rishit-exe.xyz", href: "https://rishit-exe.xyz" },
  { label: "Resume", value: "View on Google Drive →", href: RESUME_URL },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      <section
        id="contact"
        ref={ref}
        style={{ padding: "100px 48px", borderTop: "1px solid var(--rule)" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "end",
          }}
          className="contact-grid"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              lineHeight: 1.05,
              marginBottom: 20,
            }}>
              Let&apos;s build<br />something<br />
              <span style={{ color: "var(--accent)" }}>remarkable.</span>
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "var(--ink2)", lineHeight: 1.7, maxWidth: 380 }}>
              Open to intern/fresher engineering roles, research collaborations, and interesting problems.
              Currently based in Chennai, India.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
          >
            {CONTACTS.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 0",
                  borderBottom: "1px solid var(--rule)",
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                  cursor: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  const val = e.currentTarget.querySelector(".cval") as HTMLElement;
                  if (val) val.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  const val = e.currentTarget.querySelector(".cval") as HTMLElement;
                  if (val) val.style.color = "";
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {c.label}
                </span>
                <span className="cval" style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", fontWeight: 500, color: "var(--ink)", transition: "color 0.2s" }}>
                  {c.value}
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            #contact { padding: 72px 24px !important; }
          }
        `}</style>
      </section>

      <footer style={{
        padding: "24px 48px",
        borderTop: "1px solid var(--rule)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
        className="site-footer"
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", letterSpacing: "0.06em" }}>
          © 2026 Rishit Srivastava.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "GitHub", href: "https://github.com/rishit-exe" },
            { label: "LinkedIn", href: "https://linkedin.com/in/rishit-srivastava" },
            { label: "Resume", href: RESUME_URL },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", letterSpacing: "0.06em", textDecoration: "none", transition: "color 0.2s", cursor: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              {l.label}
            </a>
          ))}
        </div>
        <style>{`
          @media (max-width: 600px) {
            .site-footer { flex-direction: column !important; gap: 14px !important; text-align: center !important; padding: 20px 24px !important; }
          }
        `}</style>
      </footer>
    </>
  );
}
