import type { Metadata } from "next";
import { Suspense } from "react";

import { SITE } from "@/config/site";
import { WORK } from "@/data/work";
import { WorkGridStatic, WorkGridWithParams } from "@/components/work/WorkGrid";
import BackLink from "@/components/ui/BackLink";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";

const DESCRIPTION = `Data pipelines, AI evaluation, backend services, live client sites and experiments by ${SITE.name}.`;

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE.url}/projects` },
};

const absolute = (href: string) => (href.startsWith("http") ? href : `${SITE.url}${href}`);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects",
  description: DESCRIPTION,
  url: `${SITE.url}/projects`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: WORK.map((w, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: w.title,
        description: w.blurb,
        ...(w.links[0] ? { url: absolute(w.links[0].href) } : {}),
      },
    })),
  },
};

export default function ProjectsPage() {
  const live = WORK.filter((w) => w.status === "live").length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell>
        <BackLink href="/" label="home" />

        <PageHeader
          label="Projects"
          title="Things I've built"
          description="Data pipelines, AI evaluation, backend services, live client sites and the experiments I build for fun. Filter by what you care about, or scroll through all of it."
          constrained
        />

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[13px] text-muted-foreground">
          {[
            { value: WORK.length, label: "projects" },
            { value: live, label: "live right now" },
            { value: WORK.filter((w) => w.categories.includes("client")).length, label: "for real clients" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <dt className="order-2">{stat.label}</dt>
              <dd className="order-1 text-2xl font-semibold text-foreground">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <Suspense fallback={<WorkGridStatic />}>
          <WorkGridWithParams />
        </Suspense>
      </PageShell>
    </>
  );
}
