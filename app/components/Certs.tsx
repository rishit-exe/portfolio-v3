"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "./SectionHeader";

const CERTS = [
  {
    issuer: "Oracle",
    name: "OCI 2025 Certified Generative AI Professional",
    desc: "Architected RAG systems using enterprise vector databases, fine-tuned LLM hyperparameters, and optimized high-throughput prompt engineering on secure OCI frameworks.",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=YOUR_OCI_AI_ID",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    issuer: "Oracle",
    name: "OCI 2025 Certified DevOps Professional",
    desc: "Engineered and managed automated CI/CD microservice deployment topologies on secure cloud infrastructure using immutable container pipelines.",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=YOUR_OCI_DEVOPS_ID",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    issuer: "J.P. Morgan",
    name: "Software Engineering Job Simulation",
    desc: "Engineered event-driven backend modules in Java using Apache Kafka streams, configuring data consumers and REST API endpoints.",
    href: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/YOUR_JP_ID.pdf",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
  },
  {
    issuer: "LeetCode",
    name: "500+ Problems Solved — Top-Tier Ranking",
    desc: "Top-tier ranking with 500+ verified problems solved across advanced data structures, dynamic programming, and graph algorithms.",
    href: "https://leetcode.com/rishit-exe",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
];

function CertCard({ cert, index }: { cert: typeof CERTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      style={{
        background: "var(--surface)",
        padding: 32,
        position: "relative",
        transition: "box-shadow 0.2s",
      }}
      className="cert-card"
    >
      <div
        style={{
          position: "absolute",
          top: 32,
          right: 32,
          width: 36,
          height: 36,
          background: "var(--accent-light)",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--accent)",
        }}
      >
        {cert.icon}
      </div>

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
        {cert.issuer}
      </p>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.9875rem", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em", lineHeight: 1.35, marginBottom: 10, paddingRight: 40 }}>
        {cert.name}
      </h3>
      <p style={{ fontSize: "0.84rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: 20 }}>
        {cert.desc}
      </p>
      <a
        href={cert.href}
        target="_blank"
        rel="noopener noreferrer"
        className="cert-link"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-display)",
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "var(--accent)",
          textDecoration: "none",
          transition: "gap 0.2s",
          cursor: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.gap = "10px")}
        onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
      >
        View Credential
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>

      <style>{`
        .cert-card:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.1); z-index: 2; }
      `}</style>
    </motion.div>
  );
}

export default function Certs() {
  return (
    <section
      id="certs"
      style={{ padding: "100px 48px", borderTop: "1px solid var(--rule)" }}
    >
      <SectionHeader num="04" title="Certifications" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 2,
          background: "var(--rule)",
        }}
      >
        {CERTS.map((c, i) => (
          <CertCard key={c.name} cert={c} index={i} />
        ))}
      </div>
      <style>{`
        @media (max-width: 600px) {
          #certs { padding: 72px 24px !important; }
        }
      `}</style>
    </section>
  );
}
