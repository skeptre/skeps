import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/config/site";
import { PROJECTS } from "@/data/projects";
import BackLink from "@/components/ui/BackLink";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";
import TechBadge from "@/components/ui/TechBadge";

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
        <BackLink />

        <PageHeader
          label="work"
          title="Projects"
          description="Selected backend, data, AI, and production work. Each project links to a focused case study with implementation details and evidence where available."
          constrained
        />

        <div className="page-block grid gap-5 md:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <article
              key={project.slug}
              className={`fade-in-up stagger-${Math.min(index + 2, 4)} flex h-full flex-col rounded-sm border border-border bg-card p-6 transition-colors hover:border-primary/50`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-primary">
                    {"//"} {project.type}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    >
                      {project.title}
                    </Link>
                  </h2>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.slice(0, 5).map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-7">
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-mono text-xs text-primary transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  view case study →
                </Link>
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    github ↗
                  </a>
                ) : project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    live site ↗
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </PageShell>
    </>
  );
}
