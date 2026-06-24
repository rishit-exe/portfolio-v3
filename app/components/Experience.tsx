"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";

const EXPERIENCES = [
  {
    period: "Mar 2026 — Present",
    type: "Full-Time",
    company: "Studique",
    url: "https://studique.in",
    role: "Lead Engineer & Product Architect",
    bullets: [
      "Scaled system capacity to sustain 15,000+ MAU (1,200+ DAU) across 150+ academic areas via a decoupled Next.js / TypeScript / Tailwind frontend.",
      "Reduced navigation support tickets by 40% through a full UX overhaul — optimizing state persistence and information architecture complexity.",
      "Directed continuous delivery across 4 cross-functional engineering and design teams, improving core production deployment velocity by 15%.",
    ],
  },
  {
    period: "Apr 2026 — Present",
    type: "Research Intern",
    company: "Samsung R&D India",
    role: "Research Intern — Samsung PRISM",
    bullets: [
      "Designing and building an asynchronous multimodal SLAM evaluation platform leveraging ROS2 computational graphs to isolate data pipeline latencies across heterogeneous sensor arrays.",
    ],
  },
  {
    period: "Jan 2024 — Mar 2024",
    type: "Virtual Intern",
    company: "AICTE × Google for Developers",
    role: "AI/ML Virtual Intern",
    bullets: [
      "Optimized deep learning models spanning NLP and neural networks to achieve 94.2% classification accuracy on structured target image arrays.",
      "Engineered data preprocessing pipelines via NumPy and Pandas to process 10GB+ high-dimensional training datasets, reducing model convergence latency by 22%.",
    ],
  },
];

function ExpItem({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        gap: 32,
        padding: "40px 0 40px 24px",
        borderBottom: "1px solid var(--rule)",
        position: "relative",
      }}
      className="exp-row"
    >
      {/* Accent bar */}
      <div
        className="exp-accent-bar"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: "transparent",
          transition: "background 0.25s",
        }}
      />

      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
          {exp.period}
        </p>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.73rem",
          fontWeight: 500,
          color: "var(--accent)",
          background: "var(--accent-light)",
          padding: "2px 8px",
          borderRadius: 2,
        }}>
          {exp.type}
        </span>
      </div>

      <div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1875rem", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: 4 }}>
          {exp.url ? <a href={exp.url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>{exp.company}</a> : exp.company}
        </h3>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9375rem", color: "var(--ink2)", marginBottom: 16 }}>
          {exp.role}
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {exp.bullets.map((b, i) => (
            <li key={i} style={{ fontSize: "0.9rem", color: "var(--ink2)", lineHeight: 1.65, paddingLeft: 20, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: "var(--accent)", fontWeight: 500 }}>—</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .exp-row:hover .exp-accent-bar { background: var(--accent) !important; }
        @media (max-width: 700px) {
          .exp-row { grid-template-columns: 1fr !important; gap: 12px !important; padding-left: 20px !important; }
        }
      `}</style>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: "100px 48px",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <SectionHeader num="01" title="Experience" />
      <div>
        {EXPERIENCES.map((exp, i) => (
          <ExpItem key={exp.company} exp={exp} index={i} />
        ))}
      </div>
      <style>{`
        @media (max-width: 600px) {
          #experience { padding: 72px 24px !important; }
        }
      `}</style>
    </section>
  );
}
