import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rudresh B Sakri | AI Developer & IoT Innovator",
  description:
    "Portfolio of Rudresh B Sakri — EEE Student, AI Developer, IoT Innovator, and Web Developer. Building intelligent systems that bridge electrical engineering and cutting-edge technology.",
  keywords: [
    "Rudresh Sakri",
    "AI Developer",
    "IoT Innovator",
    "Machine Learning",
    "Deep Learning",
    "Transformer Monitoring",
    "Portfolio",
  ],
  authors: [{ name: "Rudresh B Sakri" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
  openGraph: {
    title: "Rudresh B Sakri | AI Developer & IoT Innovator",
    description:
      "Building AI-powered IoT solutions that transform how we monitor and maintain critical infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">{children}</body>
    </html>
  );
}
