"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { RESUME_URL } from "@/app/lib/constants";

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
  style,
}: {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
  external?: boolean;
  style?: React.CSSProperties;
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
        justifyContent: "center",
        gap: 8,
        height: 45,
        padding: "0 28px",
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
        ...style,
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

const SafetyPin = () => (
  <svg
    width="120"
    height="50"
    viewBox="0 0 140 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="scrapbook-pin"
    style={{
      filter: "drop-shadow(3px 5px 4px rgba(0, 0, 0, 0.25))",
      pointerEvents: "none",
    }}
  >
    {/* Back arm */}
    <path d="M 30 35 L 118 18" stroke="url(#wire-grad)" strokeWidth="3.5" strokeLinecap="round" />

    {/* Clasp / Cap */}
    <path d="M 110 10 C 110 10, 135 5, 135 22 C 135 32, 125 35, 115 32 L 110 20 Z" fill="url(#cap-grad)" stroke="#666" strokeWidth="0.5" />
    <path d="M 118 16 C 118 16, 128 12, 128 20 C 128 24, 122 26, 118 24 Z" fill="#222" opacity="0.3" />

    {/* Spring loop */}
    <path d="M 30 35 C 15 38, 10 50, 25 55 C 40 60, 42 45, 30 35" stroke="url(#wire-grad)" strokeWidth="3.5" fill="none" />

    {/* Front arm */}
    <path d="M 28 48 L 118 23" stroke="url(#wire-grad)" strokeWidth="3" strokeLinecap="round" />

    <defs>
      <linearGradient id="wire-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8e9eab" />
        <stop offset="50%" stopColor="#eef2f3" />
        <stop offset="100%" stopColor="#8e9eab" />
      </linearGradient>
      <linearGradient id="cap-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d3d3d3" />
        <stop offset="50%" stopColor="#a9a9a9" />
        <stop offset="100%" stopColor="#808080" />
      </linearGradient>
    </defs>
  </svg>
);

const ScrapPaper = () => (
  <div
    className="scrapbook-paper"
    style={{
      width: "165px",
      background: "#FAF6EE",
      padding: "16px 12px 14px",
      boxShadow: "2px 8px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.05)",
      borderRadius: "4px 8px 3px 6px",
      border: "1px dashed rgba(0,0,0,0.08)",
      zIndex: -1,
      fontFamily: "'Caveat', cursive",
      color: "#2C405E",
      fontSize: "1.15rem",
      lineHeight: "1.2",
      textAlign: "center",
      clipPath: "polygon(0% 4%, 96% 0%, 100% 93%, 94% 97%, 3% 100%, 0% 50%)",
      userSelect: "none",
      pointerEvents: "none",
    }}
  >
    <div style={{ opacity: 0.85 }}>"talk is cheap. show me the code."</div>
  </div>
);

const TicketStub = () => (
  <div
    className="scrapbook-ticket"
    style={{
      width: "230px",
      background: "var(--surface)",
      padding: "16px 16px 12px",
      boxShadow: "5px 12px 28px rgba(0,0,0,0.08)",
      borderRadius: "2px",
      border: "1px solid var(--rule)",
      borderLeft: "4px solid var(--accent)",
      fontFamily: "var(--font-mono)",
      color: "var(--ink)",
      fontSize: "0.68rem",
      lineHeight: "1.4",
      userSelect: "none",
      pointerEvents: "none",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed var(--rule)", paddingBottom: 6, marginBottom: 8 }}>
      <div>
        <span style={{ color: "var(--muted)", display: "block", fontSize: "0.52rem", textTransform: "uppercase" }}>Passenger</span>
        <strong>RISHIT / MR</strong>
      </div>
      <div style={{ textAlign: "right" }}>
        <span style={{ color: "var(--muted)", display: "block", fontSize: "0.52rem", textTransform: "uppercase" }}>Seat</span>
        <strong>01A</strong>
      </div>
    </div>

    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
      <div>
        <span style={{ color: "var(--muted)", display: "block", fontSize: "0.52rem" }}>FROM</span>
        <strong>VARANASI</strong>
      </div>
      <div style={{ display: "flex", alignItems: "center", color: "var(--accent)" }}>✈</div>
      <div style={{ textAlign: "right" }}>
        <span style={{ color: "var(--muted)", display: "block", fontSize: "0.52rem" }}>TO</span>
        <strong>CHENNAI</strong>
      </div>
    </div>

    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
      <div>
        <span style={{ color: "var(--muted)", display: "block", fontSize: "0.52rem" }}>DATE</span>
        <strong>24 JUN 2026</strong>
      </div>
      <div style={{ textAlign: "right" }}>
        <span style={{ color: "var(--muted)", display: "block", fontSize: "0.52rem" }}>CLASS</span>
        <strong>FIRST</strong>
      </div>
    </div>

    <div style={{
      height: 24,
      background: "repeating-linear-gradient(90deg, var(--ink), var(--ink) 1px, transparent 1px, transparent 3px, var(--ink) 3px, var(--ink) 6px, transparent 6px, transparent 8px)",
      opacity: 0.25,
      width: "100%"
    }} />
    <div style={{ textAlign: "center", fontSize: "0.52rem", color: "var(--muted)", marginTop: 4 }}>SEQ: 0118</div>
  </div>
);

const TerminalSticker = () => (
  <div
    className="scrapbook-terminal"
    style={{
      width: "200px",
      background: "#1E1E1E",
      borderRadius: "6px",
      padding: "10px 12px",
      border: "3px solid #FFF",
      boxShadow: "3px 6px 12px rgba(0,0,0,0.3)",
      fontFamily: "var(--font-mono)",
      color: "#00FF00",
      fontSize: "0.55rem",
      lineHeight: "1.3",
      textAlign: "left",
      userSelect: "none",
      pointerEvents: "none",
    }}
  >
    {/* Terminal Header dots */}
    <div style={{ display: "flex", gap: 3, marginBottom: 6, borderBottom: "1px solid #333", paddingBottom: 4 }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF5F56" }} />
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#FFBD2E" }} />
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#27C93F" }} />
      <span style={{ fontSize: "0.4rem", color: "#666", marginLeft: 4 }}>bash</span>
    </div>
    {/* Terminal Content */}
    <div>
      <span style={{ color: "#81A1C1" }}>rishit@root:~$</span> neofetch<br />
      <span style={{ color: "#EBCB8B" }}>OS:</span> Arch Linux<br />
      <span style={{ color: "#EBCB8B" }}>Host:</span> Brain-v3.0<br />
      <span style={{ color: "#EBCB8B" }}>Kernel:</span> 6.9.3-arch<br />
      <span style={{ color: "#EBCB8B" }}>Uptime:</span> 24/7/365<br />
      <span style={{ color: "#81A1C1" }}>rishit@root:~$</span> <span style={{ animation: "blink 1s step-end infinite" }}>_</span>
    </div>
  </div>
);

const ImageFrame = ({ mounted, ease }: { mounted: boolean; ease: [number, number, number, number] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  // Motion values for normalized mouse positions (range 0 to 1)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring physics configuration for a butter-smooth 3D effect
  const springConfig = { damping: 28, stiffness: 150, mass: 0.6 };

  // Smooth springs for tilt rotation
  const xRotation = useSpring(useTransform(mouseY, [0, 1], [15, -15]), springConfig);
  const yRotation = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);

  // Smooth springs for shine position
  const shineX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const shineY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  // Shine opacity spring
  const shineOpacity = useSpring(0, springConfig);

  useEffect(() => {
    let active = true;
    const startTime = Date.now();

    const loop = () => {
      if (!active) return;

      if (!isHovered.current) {
        const elapsed = (Date.now() - startTime) / 1000;

        // Continuous, gentle automatic orbit rotation
        const xOffset = 0.5 + Math.cos(elapsed * 0.55) * 0.28;
        const yOffset = 0.5 + Math.sin(elapsed * 0.75) * 0.28;

        mouseX.set(xOffset);
        mouseY.set(yOffset);
        // Breathing shine opacity
        shineOpacity.set(0.1 + (Math.sin(elapsed * 0.55) + 1) * 0.12);
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
    return () => {
      active = false;
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width;
    const yVal = (e.clientY - rect.top) / rect.height;

    mouseX.set(xVal);
    mouseY.set(yVal);
    shineOpacity.set(0.65);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    shineOpacity.set(0);
  };

  const leftPercent = useTransform(shineX, (x) => `${x}%`);
  const topPercent = useTransform(shineY, (y) => `${y}%`);

  return (
    <div className="hero-image-wrapper">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease, delay: 0.6 }}
        style={{ position: "relative" }}
      >
        {/* Scrapbook Elements */}
        <SafetyPin />
        <ScrapPaper />
        <TicketStub />
        <TerminalSticker />

        {/* Polaroid Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={(e) => {
            isHovered.current = false;
            handleMouseLeave();
            e.currentTarget.style.borderColor = "var(--glass-border)";
            e.currentTarget.style.boxShadow = "0 30px 80px var(--glass-glow), inset 0 0 20px rgba(255, 255, 255, 0.05)";
          }}
          style={{
            position: "relative",
            rotateX: xRotation,
            rotateY: yRotation,
            transformStyle: "preserve-3d",
            transformPerspective: 1000,
            borderRadius: 8,
            padding: "18px 18px 76px 18px",
            background: "var(--glass-bg)",
            backdropFilter: "blur(24px) saturate(150%)",
            WebkitBackdropFilter: "blur(24px) saturate(150%)",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 30px 80px var(--glass-glow), inset 0 0 20px rgba(255, 255, 255, 0.05)",
            overflow: "visible",
            cursor: "pointer",
            transition: "border-color 0.25s ease-out, box-shadow 0.25s ease-out",
          }}
          className="hero-image-card hoverable"
          onMouseEnter={(e) => {
            isHovered.current = true;
            e.currentTarget.style.borderColor = "var(--glass-border-hover)";
            e.currentTarget.style.boxShadow = "0 45px 100px var(--glass-glow-hover), inset 0 0 30px rgba(255,255,255,0.15)";
          }}
        >
          {/* Glass Overlay with Shine (clipped to card dimensions) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: 8,
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            {/* Shine / Light Reflection layer */}
            <motion.div
              style={{
                position: "absolute",
                left: leftPercent,
                top: topPercent,
                width: "200%",
                height: "200%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, var(--glass-shine) 0%, transparent 65%)",
                opacity: shineOpacity,
              }}
            />
          </div>

          {/* Inner border highlights for glass refraction */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 8,
              border: "1.5px solid transparent",
              background: `linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.08) 100%) border-box`,
              pointerEvents: "none",
              zIndex: 3,
            }}
          />

          {/* 3D Image Container */}
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: 4,
              transform: "translateZ(30px)",
              background: "rgba(0,0,0,0.05)",
              position: "relative",
            }}
          >
            <img
              src="/rishit.png"
              alt="Rishit Srivastava"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(5%) contrast(105%)",
              }}
            />
          </div>

          {/* Polaroid Signature/Caption Area */}
          <div
            style={{
              position: "absolute",
              bottom: 18,
              left: 18,
              right: 18,
              fontFamily: "'Caveat', cursive",
              fontSize: "1.75rem",
              color: "var(--ink)",
              textAlign: "center",
              transformStyle: "preserve-3d",
              transform: "translateZ(15px) rotate(-1.5deg)",
              opacity: 0.85,
              fontWeight: 500,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            Rishit Srivastava
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

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
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          width: "100%",
          maxWidth: 520,
        }}
      >
        <div style={{ display: "flex", gap: 14, width: "100%", alignItems: "center" }} className="hero-cta-row1">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              flex: 1.4,
              height: 45,
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
            View Resume
          </a>

          <MagneticButton
            href="https://www.linkedin.com/in/the-rishit-srivastava/"
            external
            style={{ flex: 0.8, justifyContent: "center" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.27 20h-3.64v-11h3.64v11zm-1.82-12.58c-1.16 0-2.11-.95-2.11-2.12 0-1.17.95-2.12 2.11-2.12 1.17 0 2.12.95 2.12 2.12 0 1.17-.95 2.12-2.12 2.12zm13.09 12.58h-3.64v-5.8c0-1.38-.03-3.14-1.92-3.14-1.92 0-2.21 1.5-2.21 3.04v5.9h-3.64v-11h3.5v1.51h.05c.49-.93 1.69-1.91 3.48-1.91 3.72 0 4.4 2.45 4.4 5.63v6.77z" />
            </svg>
            LinkedIn
          </MagneticButton>

          <MagneticButton
            href="https://github.com/rishit-exe"
            external
            style={{ flex: 0.8, justifyContent: "center" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </MagneticButton>
        </div>

        <MagneticButton
          href="#contact"
          style={{ width: "100%", justifyContent: "center" }}
        >
          Get in touch
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </MagneticButton>
      </motion.div>

      <ImageFrame mounted={mounted} ease={ease} />

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
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&display=swap');

        .hero-image-wrapper {
          position: absolute;
          top: 48%;
          left: 57%;
          transform: translate(-50%, -50%);
          z-index: 10;
          pointer-events: auto;
        }

        .hero-image-card {
          width: 440px !important;
          height: 560px !important;
        }

        /* Base Scrapbook Positioning */
        .scrapbook-pin {
          position: absolute;
          top: -28px;
          left: 40%;
          transform: rotate(15deg);
          z-index: 12;
        }
        .scrapbook-paper {
          position: absolute;
          top: -48px;
          right: -75px;
          transform: rotate(-10deg);
          z-index: -1;
        }
        .scrapbook-ticket {
          position: absolute;
          bottom: -45px;
          right: -65px;
          transform: rotate(6deg);
          z-index: 11;
        }
        .scrapbook-terminal {
          position: absolute;
          bottom: -45px;
          left: -55px;
          transform: rotate(-12deg);
          z-index: 11;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }

        @media (max-width: 1440px) {
          .hero-image-wrapper {
            left: 56%;
            transform: translate(-50%, -50%) scale(0.92);
          }
        }

        @media (max-width: 1280px) {
          .hero-image-wrapper {
            left: 54%;
            transform: translate(-50%, -50%) scale(0.82);
          }
        }

        @media (max-width: 1100px) {
          .hero-image-wrapper {
            left: 51%;
            transform: translate(-50%, -50%) scale(0.72);
          }
          .hero-badges-desktop {
            opacity: 0.25;
          }
        }

        @media (max-width: 980px) {
          .hero-badges-desktop {
            display: none !important;
          }
          .hero-image-wrapper {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            margin: 48px 0 24px;
            display: flex;
            justify-content: flex-start;
            z-index: 5;
            width: 100%;
          }
          .hero-image-card {
            width: 320px !important;
            height: 420px !important;
          }
        }

        @media (max-width: 900px) {
          .hero-stats-desktop { position: static !important; margin-top: 48px; display: flex !important; justify-content: flex-start !important; }
        }

        @media (max-width: 600px) {
          #hero { padding: 110px 24px 72px !important; }
          .hero-cta-row1 {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-cta-row1 > a {
            flex: none !important;
            width: 100% !important;
          }
          .hero-image-wrapper {
            justify-content: center;
            margin: 32px 0 16px;
          }
          .scrapbook-pin {
            top: -24px !important;
            left: 35% !important;
            transform: rotate(12deg) scale(0.85) !important;
          }
          .scrapbook-paper {
            top: -38px !important;
            right: -25px !important;
            transform: rotate(-8deg) scale(0.8) !important;
          }
          .scrapbook-ticket {
            bottom: -35px !important;
            right: -25px !important;
            transform: rotate(4deg) scale(0.8) !important;
          }
          .scrapbook-terminal {
            bottom: -35px !important;
            left: -20px !important;
            transform: rotate(-8deg) scale(0.8) !important;
          }
        }
      `}</style>
    </section>
  );
}
