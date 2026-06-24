"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "./SectionHeader";

const SKILL_BLOCKS = [
  {
    title: "Languages",
    items: ["Java", "C++", "Python", "Swift", "TypeScript", "JavaScript"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["Next.js", "React", "Node.js", "SwiftUI", "UIKit", "Android SDK", "ROS2", "Scikit-learn", "NumPy", "Pandas", "Tailwind CSS"],
  },
  {
    title: "Infrastructure & Cloud",
    items: ["OCI", "Docker", "Kubernetes", "Redis", "Apache Kafka", "REST APIs", "CI/CD", "RAG Systems"],
  },
  {
    title: "Databases & Tools",
    items: ["PostgreSQL", "Supabase", "Git / GitHub", "Wireshark", "Zeek", "Vector DBs", "LLM Fine-tuning"],
  },
];

function SkillChip({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "0.8125rem",
        fontWeight: 500,
        color: "var(--ink2)",
        background: "var(--bg2)",
        padding: "6px 14px",
        borderRadius: 2,
        border: "1px solid var(--rule)",
        display: "inline-block",
        transition: "background 0.2s, color 0.2s, border-color 0.2s, transform 0.25s cubic-bezier(0.16,1,0.3,1)",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--accent-light)";
        el.style.color = "var(--accent)";
        el.style.borderColor = "rgba(var(--accent-rgb), 0.3)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "";
        el.style.color = "";
        el.style.borderColor = "";
        el.style.transform = "";
      }}
    >
      {label}
    </motion.span>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: "100px 48px", borderTop: "1px solid var(--rule)" }}
    >
      <SectionHeader num="02" title="Technical Skills" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          background: "var(--rule)",
        }}
        className="skills-grid"
      >
        {SKILL_BLOCKS.map((block, bi) => (
          <motion.div
            key={block.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: bi * 0.1 }}
            style={{
              background: "var(--surface)",
              padding: 40,
            }}
          >
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}>
              {block.title}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {block.items.map((item, ii) => (
                <SkillChip key={item} label={item} delay={bi * 0.08 + ii * 0.04} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 700px) {
          .skills-grid { grid-template-columns: 1fr !important; }
          #skills { padding: 72px 24px !important; }
        }
      `}</style>
    </section>
  );
}
