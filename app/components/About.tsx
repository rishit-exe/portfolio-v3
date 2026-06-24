"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";

const PRINCIPLES = [
  {
    num: "01",
    title: "Scalability & Infrastructure",
    desc: "Architecting high-throughput distributed systems, orchestrating containerized microservices, and scaling platforms to sustain 15,000+ MAU.",
  },
  {
    num: "02",
    title: "Low-Latency & Real-Time Data",
    desc: "Designing asynchronous pipeline evaluation frameworks using ROS2 computational graphs and processing real-time event-driven data streams.",
  },
  {
    num: "03",
    title: "Buttery-Smooth Interactive UX",
    desc: "Reducing UX friction and navigation complexity by 40% with optimized state persistence and micro-animations that feel premium and responsive.",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: "100px 48px",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <SectionHeader num="01" title="About Me" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 64,
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* Left column: Bio / Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease }}
          style={{ display: "flex", flexDirection: "column", gap: 28 }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              lineHeight: 1.15,
            }}
          >
            I build systems that bridge complex engineering with intentional, premium design.
          </h3>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--ink2)",
              lineHeight: 1.75,
            }}
          >
            As a Lead Engineer &amp; Product Architect at Studique and a Research Intern at Samsung R&amp;D India,
            my expertise spans both backend systems design and polished frontend engineering. I specialize in
            low-latency data streams, asynchronous architectures, and developer tooling.
          </p>

          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--muted)",
              lineHeight: 1.7,
            }}
          >
            With a B.Tech in Computer Science and an academic record of 9.41 GPA, I constantly seek out challenging
            problems in distributed systems, real-time networking, and performance optimization. Whether managing CI/CD
            pipelines, constructing SLAM research frameworks, or designing rich user experiences, my approach is rooted in
            simplicity, reliability, and visual precision.
          </p>

          <div style={{ marginTop: 8 }}>
            <a
              href="https://drive.google.com/file/d/1pk-SruRoF2IJT8xAHWIipQ9BXWBNoWbQ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 28px",
                background: "var(--ink)",
                color: "var(--bg)",
                fontFamily: "var(--font-display)",
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                textDecoration: "none",
                borderRadius: 3,
                border: "1.5px solid var(--ink)",
                cursor: "none",
                transition: "background 0.2s, color 0.2s, border-color 0.2s, transform 0.25s cubic-bezier(0.16,1,0.3,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--ink)";
                e.currentTarget.style.color = "var(--bg)";
                e.currentTarget.style.borderColor = "var(--ink)";
                e.currentTarget.style.transform = "";
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              View Full Resume
            </a>
          </div>
        </motion.div>

        {/* Right column: Principles / Focus areas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 2,
            background: "var(--rule)",
          }}
          className="principles-grid"
        >
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: i * 0.12 }}
              style={{
                background: "var(--surface)",
                padding: "32px 36px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
              className="about-principle-card"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                  }}
                >
                  {p.title}
                </h4>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                  }}
                >
                  //{p.num}
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--ink2)",
                  lineHeight: 1.6,
                }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 600px) {
          #about {
            padding: 72px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
