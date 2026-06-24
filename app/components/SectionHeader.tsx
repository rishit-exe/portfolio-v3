"use client";

export default function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 64 }}>
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        color: "var(--accent)",
        letterSpacing: "0.08em",
        flexShrink: 0,
      }}>
        {num}
      </span>
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
        color: "var(--ink)",
        lineHeight: 1.05,
        flexShrink: 0,
      }}>
        {title}
      </h2>
      <div style={{
        flex: 1,
        height: 1,
        background: "var(--rule)",
        marginLeft: 8,
      }} />
    </div>
  );
}
