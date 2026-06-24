"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const animate = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.1;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onEnter = () => {
      if (dotRef.current) dotRef.current.setAttribute("data-hover", "true");
      if (ringRef.current) ringRef.current.setAttribute("data-hover", "true");
    };
    const onLeave = () => {
      if (dotRef.current) dotRef.current.removeAttribute("data-hover");
      if (ringRef.current) ringRef.current.removeAttribute("data-hover");
    };

    const links = document.querySelectorAll("a, button, .hoverable");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [visible]);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "var(--accent)",
          pointerEvents: "none",
          zIndex: 9999,
          marginLeft: -5,
          marginTop: -5,
          opacity: visible ? 1 : 0,
          transition: "width 0.2s, height 0.2s, margin 0.2s, opacity 0.3s",
          willChange: "transform",
        }}
        data-dot
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(var(--accent-rgb), 0.35)",
          pointerEvents: "none",
          zIndex: 9998,
          marginLeft: -20,
          marginTop: -20,
          opacity: visible ? 1 : 0,
          transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), margin 0.35s, border-color 0.25s, opacity 0.3s",
          willChange: "transform",
        }}
        data-ring
      />
      <style>{`
        [data-dot][data-hover] { width: 6px !important; height: 6px !important; margin-left: -3px !important; margin-top: -3px !important; }
        [data-ring][data-hover] { width: 56px !important; height: 56px !important; margin-left: -28px !important; margin-top: -28px !important; border-color: rgba(var(--accent-rgb), 0.55) !important; }
      `}</style>
    </>
  );
}
