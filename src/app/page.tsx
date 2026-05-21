import type { Metadata } from "next";

import { SITE } from "@/config/site";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  description:
    "Graduate Software Engineer focused on backend systems, data engineering, and AI. View projects and get in touch.",
  alternates: { canonical: SITE.url },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  sameAs: [SITE.github, SITE.linkedin, SITE.leetcode],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}
