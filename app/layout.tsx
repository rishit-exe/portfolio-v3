import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishit's Portfolio",
  description:
    "Performance-driven Software Engineer specializing in full-stack systems, mobile architecture, and distributed infrastructure.",
  authors: [{ name: "Rishit Srivastava" }],
  icons: {
    icon: "/favicon-black.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
