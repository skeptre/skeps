import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";

import { SITE } from "@/config/site";
import SiteToolbar from "@/components/site/SiteToolbar";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-20 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <SiteToolbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
