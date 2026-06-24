"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function useScramble(text: string, delay = 300) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let raf: number;
    let start: number | null = null;
    const duration = 700;

    timeout = setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const revealed = Math.floor(progress * text.length);
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") { result += " "; continue; }
          if (i < revealed) result += text[i];
          else result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        setDisplay(result);
        if (progress < 1) raf = requestAnimationFrame(step);
        else setDisplay(text);
      };
      raf = requestAnimationFrame(step);
    }, delay);

    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [text, delay]);

  return display;
}

function MagneticButton({
  children,
  href,
  primary = false,
  external = false,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };
  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "12px 28px",
        background: primary ? "var(--ink)" : "transparent",
        color: primary ? "var(--bg)" : "var(--ink2)",
        border: primary ? "none" : "1.5px solid var(--rule)",
        borderRadius: 3,
        fontFamily: "var(--font-display)",
        fontSize: "0.875rem",
        fontWeight: primary ? 600 : 500,
        letterSpacing: "0.01em",
        cursor: "none",
        textDecoration: "none",
        transition: "background 0.2s, color 0.2s, border-color 0.2s, transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        if (!primary) {
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.color = "var(--accent)";
        } else {
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.15)";
        }
      }}
      onFocus={(e) => {
        if (!primary) {
          e.currentTarget.style.borderColor = "var(--accent)";
        }
      }}
    >
      {children}
    </a>
  );
}

const BADGES = [
  { dot: "#22C55E", shadow: "rgba(34,197,94,0.5)", role: "Lead Engineer", company: "Studique · Remote", cls: "float-1" },
  { dot: "#4F7EF7", shadow: "rgba(79,126,247,0.4)", role: "Research Intern", company: "Samsung R&D · PRISM", cls: "float-2" },
  { dot: "#F59E0B", shadow: "rgba(245,158,11,0.4)", role: "B.Tech CSE", company: "SRM IST · GPA 9.41", cls: "float-3" },
];

export default function Hero() {
  const eyebrow = useScramble("// Software Engineer & Systems Architect", 600);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "140px 48px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--accent)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        {eyebrow}
      </motion.p>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.35 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 9vw, 8rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 0.92,
          color: "var(--ink)",
          marginBottom: 28,
          userSelect: "none",
        }}
      >
        Rishit<br />
        <span style={{ color: "var(--accent)" }}>Srivastava</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.5 }}
        style={{
          maxWidth: 520,
          fontSize: "1.0625rem",
          color: "var(--ink2)",
          lineHeight: 1.7,
          marginBottom: 44,
        }}
      >
        Building high-throughput platforms, distributed systems, and thoughtful interfaces.
        Currently architecting infrastructure for 15,000+ users at Studique
        and SLAM research pipelines at Samsung R&D.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={mounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.65 }}
        style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
      >
        <MagneticButton
          href="https://drive.google.com/file/d/1pk-SruRoF2IJT8xAHWIipQ9BXWBNoWbQ/view?usp=sharing"
          primary
          external
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          View Resume
        </MagneticButton>
        <MagneticButton href="#contact">
          Get in touch
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </MagneticButton>
        <MagneticButton href="https://www.linkedin.com/in/the-rishit-srivastava/" external>
          LinkedIn
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </MagneticButton>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.8 }}
        style={{
          position: "absolute",
          bottom: 56,
          right: 48,
          display: "flex",
          gap: 40,
        }}
        className="hero-stats-desktop"
      >
        {[
          { num: "15K+", label: "Monthly Active Users" },
          { num: "500+", label: "LeetCode Problems" },
          { num: "9.41", label: "GPA / 10" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.04em", color: "var(--ink)", lineHeight: 1 }}>
              {s.num}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Floating Badges */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={mounted ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease, delay: 0.7 }}
        style={{
          position: "absolute",
          top: 160,
          right: 48,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
        className="hero-badges-desktop"
      >
        {BADGES.map((b) => (
          <div
            key={b.role}
            className={b.cls}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 16px",
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 3,
              boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
              background: b.dot, boxShadow: `0 0 8px ${b.shadow}`,
            }} />
            <div style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", color: "var(--ink2)", lineHeight: 1.3 }}>
              <strong style={{ color: "var(--ink)", fontWeight: 600, display: "block" }}>{b.role}</strong>
              {b.company}
            </div>
          </div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .hero-badges-desktop { display: none !important; }
          .hero-stats-desktop { position: static !important; margin-top: 48px; display: flex !important; justify-content: flex-start !important; }
        }
        @media (max-width: 600px) {
          #hero { padding: 110px 24px 72px !important; }
        }
      `}</style>
    </section>
  );
}
