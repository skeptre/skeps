import type { Metadata } from "next";

import { SITE } from "@/config/site";
import Divider from "@/components/ui/Divider";
import PageShell from "@/components/ui/PageShell";
import SectionLabel from "@/components/ui/SectionLabel";
import BackLink from "@/components/ui/BackLink";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name} by email.`,
  alternates: { canonical: `${SITE.url}/contact` },
};

export default function ContactPage() {
  return (
    <PageShell>
      <BackLink />

      <section className="mt-12">
        <SectionLabel>contact</SectionLabel>

        <h1 className="fade-in-up stagger-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Get in touch.
        </h1>

        <p className="fade-in-up stagger-3 mt-6 text-base leading-relaxed text-muted-foreground">
          For opportunities, collaborations, or questions, email is the best
          way to reach me.
        </p>

        <div className="fade-in-up stagger-4">
          <Divider label="email" />
        </div>

        <a
          href={`mailto:${SITE.email}`}
          className="fade-in-up stagger-4 inline-flex items-center rounded-sm border border-border bg-card px-6 py-3 font-mono text-sm text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground"
        >
          {SITE.email}
        </a>
      </section>
    </PageShell>
  );
}
