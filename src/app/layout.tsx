import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";

import { SITE } from "@/config/site";
import SiteToolbar from "@/components/site/SiteToolbar";

import "./globals.css";

// Self-hosted from npm (@fontsource) so builds never depend on a Google Fonts
// fetch and the strict CSP (font-src 'self') keeps working.
const sora = localFont({
  variable: "--font-sora",
  src: "../../node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2",
  weight: "100 800",
  style: "normal",
  display: "swap",
});

const plexMono = localFont({
  variable: "--font-ibm-plex-mono",
  src: [
    {
      path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url,
  ),
  title: {
    default: `${SITE.name} | ${SITE.role}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.role}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.role}`,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${plexMono.variable} font-sans antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <SiteToolbar />
        <div className="pt-16">{children}</div>
        {/* Mount point for the mobile navigation drawer. Keeping it last in
            <body> fixes its DOM order so the skip link stays the first link
            on the page (axe's skip-link detection depends on that). */}
        <div id="mobile-menu-root" />
      </body>
    </html>
  );
}
