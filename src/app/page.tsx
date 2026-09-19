import type { Metadata } from "next";

import { SITE } from "@/config/site";
import HomePage from "@/components/home/HomePage";

export const metadata: Metadata = {
  description: SITE.description,
  alternates: { canonical: SITE.url },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  sameAs: [SITE.github, SITE.linkedin, SITE.leetcode],
  knowsAbout: [
    "Backend engineering",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Data engineering",
    "Machine learning",
    "Large language model evaluation",
  ],
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
