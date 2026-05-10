import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import SiteToolbar from "@/components/theme/SiteToolbar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ali",
    template: "%s | Ali",
  },
  description:
    "Projects, systems, experiments, and engineering work by Mansoor Ali.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {THEME_BOOTSTRAP_SCRIPT}
        </Script>
        <ThemeProvider>
          <SiteToolbar />
          <div className="pt-[4.75rem] sm:pt-[5.25rem]">{children}</div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
