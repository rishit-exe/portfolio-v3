"use client";

import { useEffect, useState, useCallback } from "react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certs", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }, [theme]);

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 2,
          background: "var(--accent)",
          width: `${progress * 100}%`,
          zIndex: 200,
          transition: "width 0.1s linear",
        }}
      />

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          height: 64,
          background: scrolled ? "rgba(var(--bg-nav, 247,246,243), 0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--rule)" : "1px solid transparent",
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        <style>{`
          [data-theme="dark"] nav { --bg-nav: 10,10,11; }
          [data-theme="light"] nav { --bg-nav: 247,246,243; }
          nav { background: ${scrolled ? "rgba(247,246,243,0.9)" : "transparent"} }
          [data-theme="dark"] nav { background: ${scrolled ? "rgba(10,10,11,0.9)" : "transparent"} }
        `}</style>

        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            cursor: "none",
          }}
        >
          RS<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="nav-desktop">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => smoothScroll(e, link.href)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--muted)",
                transition: "color 0.2s",
                cursor: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "var(--ink)",
                transition: "transform 0.3s, opacity 0.3s",
                transform:
                  menuOpen
                    ? i === 0
                      ? "translateY(6.5px) rotate(45deg)"
                      : i === 2
                        ? "translateY(-6.5px) rotate(-45deg)"
                        : "none"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>

        <style>{`
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-hamburger { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--bg)",
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 32,
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => smoothScroll(e, link.href)}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.25rem",
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "-0.025em",
                cursor: "pointer",
                transition: "color 0.2s",
                animation: `fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s both`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      )}
    </>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      style={{
        background: "none",
        border: "none",
        cursor: "none",
        color: "var(--ink)",
        padding: 6,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "color 0.2s, transform 0.3s cubic-bezier(0.16,1,0.3,1)",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--accent)";
        e.currentTarget.style.transform = "scale(1.1) rotate(15deg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--ink)";
        e.currentTarget.style.transform = "scale(1) rotate(0deg)";
      }}
    >
      {isDark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2"/>
          <path d="M12 20v2"/>
          <path d="M4.93 4.93l1.41 1.41"/>
          <path d="M17.66 17.66l1.41 1.41"/>
          <path d="M2 12h2"/>
          <path d="M20 12h2"/>
          <path d="M6.34 17.66l-1.41 1.41"/>
          <path d="M19.07 4.93l-1.41 1.41"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      )}
    </button>
  );
}
