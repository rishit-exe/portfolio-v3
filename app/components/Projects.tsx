"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";

const PROJECTS = [
  {
    num: "P.01",
    title: "Certiqo",
    desc: "Production-grade batch asset generation platform. Processes CSV datasets via a custom lightweight parser with server-side graphic manipulation, real-time Node stream archiving, and a PostgreSQL-backed public verification API.",
    stack: ["Next.js", "TypeScript", "Supabase", "Sharp.js", "Node Streams", "PostgreSQL"],
    link: "https://github.com/rishit-exe/Certiqo",
    linkLabel: "View Project",
  },
  {
    num: "P.02",
    title: "AcademiaFortress",
    desc: "Android application with a deterministic rule-based calendar engine for adaptive schedule computation. Features localized data caching, visual progression timeline graphs, and optimized background execution cycles.",
    stack: ["Java", "Android SDK", "SQLite", "Custom Cache Layer"],
    link: "https://github.com/rishit-exe/AcademiaFortress",
    linkLabel: "View Project",
  },
  // {
  //   num: "P.03",
  //   title: "SLAM Evaluation Platform",
  //   desc: "Asynchronous multimodal SLAM evaluation system at Samsung R&D. Leverages ROS2 computational graphs to isolate data pipeline latencies across heterogeneous sensor arrays for autonomous systems research.",
  //   stack: ["ROS2", "Python", "C++", "NumPy", "Sensor Fusion"],
  //   link: "#",
  //   linkLabel: "Research Project",
  // },
];

function TiltCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 6;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`;
    card.style.boxShadow = `${-ry * 2}px ${-rx * 2}px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(var(--accent-rgb),0.12)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s";
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.boxShadow = "";
    setTimeout(() => { if (card) card.style.transition = ""; }, 550);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          background: "var(--surface)",
          padding: 40,
          position: "relative",
          overflow: "hidden",
          willChange: "transform",
          transformStyle: "preserve-3d",
          transition: "box-shadow 0.2s",
          cursor: "none",
          height: "100%",
        }}
        className="project-card"
      >
        {/* Top accent stripe */}
        <div
          className="card-stripe"
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 2,
            background: "var(--accent)",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 20 }}>
          {project.num}
        </p>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.375rem", fontWeight: 700, letterSpacing: "-0.025em", color: "var(--ink)", marginBottom: 12 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--ink2)", lineHeight: 1.65, marginBottom: 24 }}>
          {project.desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
          {project.stack.map((tag) => (
            <span key={tag} style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--accent)",
              background: "var(--accent-light)",
              padding: "3px 8px",
              borderRadius: 2,
              letterSpacing: "0.04em",
            }}>
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-display)",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--ink)",
            textDecoration: "none",
            cursor: "none",
            transition: "color 0.2s, gap 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.gap = "12px"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.gap = "6px"; }}
        >
          {project.linkLabel}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      style={{ padding: "100px 48px", borderTop: "1px solid var(--rule)" }}
    >
      <SectionHeader num="04" title="Projects" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 2,
          background: "var(--rule)",
        }}
      >
        {PROJECTS.map((p, i) => (
          <TiltCard key={p.num} project={p} index={i} />
        ))}
      </div>
      <style>{`
        .project-card:hover .card-stripe { transform: scaleX(1) !important; }
        @media (max-width: 600px) {
          #projects { padding: 72px 24px !important; }
        }
      `}</style>
    </section>
  );
}
