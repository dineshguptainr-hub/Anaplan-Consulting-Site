import type { Metadata } from "next";
import { Libre_Franklin, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const display = Libre_Franklin({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "EPM Journey | Master Anaplanner — Connected Planning Consulting",
  description:
    "Escape spreadsheet hell. A Certified Master Anaplanner and team of enterprise practitioners replacing fragile Excel models with automated, connected planning across Finance, Workforce, Opex, and Capex.",
  keywords: [
    "Anaplan consultant",
    "Anaplan implementation",
    "Master Anaplanner",
    "Connected Planning",
    "FP&A transformation",
    "Anaplan model building",
  ],
  openGraph: {
    title: "EPM Journey | Master Anaplanner — Connected Planning Consulting",
    description:
      "Stop wasting weeks in broken Excel sheets. Transform Finance, Workforce, Opex, and Capex Planning into a unified, automated forecasting powerhouse.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EPM Journey — Master Anaplanner, Connected Planning consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EPM Journey | Master Anaplanner — Connected Planning Consulting",
    description:
      "Stop wasting weeks in broken Excel sheets. Transform Finance, Workforce, Opex, and Capex Planning into a unified, automated forecasting powerhouse.",
    images: [
      {
        url: "/twitter-image.png",
        alt: "EPM Journey — Master Anaplanner, Connected Planning consulting",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      {/* suppressHydrationWarning: browser extensions (Grammarly and friends)
          inject attributes like data-gr-ext-installed onto <body> before React
          hydrates, which otherwise reports as a hydration mismatch. This
          suppresses that one element's attribute diff only, not its children. */}
      <body className="min-h-screen font-body antialiased" suppressHydrationWarning>
        {/* Reveal starts its children at opacity 0 and relies on JS to show
            them. Without this, a JS failure renders those sections blank. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
