import type { Metadata } from "next";
import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const body = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dinesh Gupta | Master Anaplanner — Connected Planning Consulting",
  description:
    "Escape spreadsheet hell. A certified Master Anaplanner helping Finance leaders replace fragile Excel models with automated, connected planning across Financial, HR, and Cost domains.",
  keywords: [
    "Anaplan consultant",
    "Anaplan implementation",
    "Master Anaplanner",
    "Connected Planning",
    "FP&A transformation",
    "Anaplan model building",
  ],
  openGraph: {
    title: "Dinesh Gupta | Master Anaplanner — Connected Planning Consulting",
    description:
      "Stop wasting weeks in broken Excel sheets. Transform Finance, HR, and Cost Planning into a unified, automated forecasting powerhouse.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable}`}>
      <body className="min-h-screen font-body antialiased">{children}</body>
    </html>
  );
}
