import type { Metadata, Viewport } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import { wedding } from "@/lib/config";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const body = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${wedding.groom} & ${wedding.bride} — Nossa Aventura`,
  description: wedding.tagline,
  openGraph: {
    title: `${wedding.groom} & ${wedding.bride} — ${wedding.dateLabel}`,
    description: wedding.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1033",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${pixel.variable} ${body.variable}`}>
      <body className="bg-night-deep text-cream antialiased">{children}</body>
    </html>
  );
}
