import type { Metadata } from "next";
import { Inter, Montserrat, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/sections/layout/Footer";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
})

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin", "cyrillic"],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Алексей Воробьев | Full-Stack Разработчик",
  description:"Разработка сайтов для бизнеса под ключ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${montserrat.variable} ${pressStart.variable} h-full antialiased`}
    >
      <head>
        <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/engine@3/tsparticles.engine.min.js" strategy="beforeInteractive"/>
        <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-fire@3/tsparticles.preset.fire.min.js" strategy="beforeInteractive"/>
      </head>
      <body className="min-h-full flex flex-col">{children}
        <Footer/>
      </body>
    </html>
  );
}
