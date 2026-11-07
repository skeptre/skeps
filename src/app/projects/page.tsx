import type { Metadata } from "next";

import { SITE } from "@/config/site";
import { PROJECTS } from "@/data/projects";
import { RELAY } from "@/data/relay";
import ProjectTiltCard from "@/components/projects/ProjectTiltCard";
import BackLink from "@/components/ui/BackLink";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected backend, data, AI, and production engineering work by ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/projects` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects",
  description: `Selected backend, data, AI, and production engineering work by ${SITE.name}.`,
  url: `${SITE.url}/projects`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: p.title,
        description: p.description,
        url: `${SITE.url}/projects/${p.slug}`,
      },
    })),
  },
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell>
        <BackLink href="/" label="home" />

        <PageHeader
          label="Work"
          title="Selected work"
          description="Selected backend, data, AI, and production work. Each project links to a focused case study with implementation details and evidence where available."
          constrained
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <ProjectTiltCard
            eyebrow={RELAY.eyebrow}
            eyebrowTone="accent"
            title={RELAY.title}
            description={RELAY.longDescription}
            href={RELAY.github}
            external
            ariaLabel={RELAY.ariaLabel}
            footer="View on GitHub →"
            glow
          />
          {PROJECTS.map((project) => (
            <ProjectTiltCard
              key={project.slug}
              eyebrow={project.type}
              title={project.title}
              description={project.description}
              href={`/projects/${project.slug}`}
              stack={project.stack.slice(0, 5)}
              footer="View case study →"
            />
          ))}
        </div>
      </PageShell>
    </>
  );
}
