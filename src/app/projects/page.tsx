import type { Metadata } from "next";

import { SITE } from "@/config/site";
import { PROJECTS } from "@/data/projects";
import ProjectsTOC from "@/components/projects/ProjectsTOC";
import ProjectCard from "@/components/projects/ProjectCard";
import BackLink from "@/components/ui/BackLink";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Projects",
  description: `Backend projects and systems built by ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/projects` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects",
  description: `Backend projects and systems built by ${SITE.name}.`,
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
  const tocProjects = PROJECTS.map(({ slug, title }) => ({ slug, title }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsTOC projects={tocProjects} />
      <PageShell>
        <BackLink />

        <PageHeader
          label="work"
          title="Projects"
          description="University projects and beyond coursework projects."
          constrained
        />

        <div className="page-block">
        {PROJECTS.map((project, index) => (
          <div
            key={project.slug}
            id={project.slug}
            className={index > 0 ? "mt-20 pt-2" : undefined}
          >
            <ProjectCard project={project} index={index} />
            {index < PROJECTS.length - 1 && <div className="section-rule" />}
          </div>
        ))}
      </div>
    </PageShell>
    </>
  );
}
