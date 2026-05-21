import type { Metadata } from "next";

import { SITE } from "@/config/site";
import Divider from "@/components/ui/Divider";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";
import BackLink from "@/components/ui/BackLink";
import { cardSurfaceClassName } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name} by email.`,
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return (
    <PageShell>
      <BackLink />

      <PageHeader
        label="contact"
        title="Get in touch."
        description="For opportunities, collaborations, or questions, email is the best way to reach me."
      />

      <div className="fade-in-up stagger-4">
        <Divider label="email" />
      </div>

      <a
        href={`mailto:${SITE.email}`}
        className={`fade-in-up stagger-4 ${cardSurfaceClassName}`}
      >
        {SITE.email}
      </a>
    </PageShell>
  );
}
