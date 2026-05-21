import type { Metadata } from "next";

import { SITE } from "@/config/site";
import { PROJECTS } from "@/data/projects";
import ProjectsTOC from "@/components/projects/ProjectsTOC";
import ProjectCard from "@/components/projects/ProjectCard";
import { slugify } from "@/lib/slugify";
import BackLink from "@/components/ui/BackLink";
import PageShell from "@/components/ui/PageShell";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Projects",
  description: `Backend projects and systems built by ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/projects` },
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsTOC />
      <PageShell>
        <BackLink />

        <section className="mt-12">
          <SectionLabel>work</SectionLabel>

          <h1 className="fade-in-up stagger-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Projects.
          </h1>

          <p className="fade-in-up stagger-3 mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            University projects and beyond coursework projects.
          </p>
        </section>

        <div className="mt-16 space-y-16">
        {PROJECTS.map((project, index) => (
          <div key={project.title} id={slugify(project.title)}>
            <ProjectCard project={project} index={index} />
            {index < PROJECTS.length - 1 && (
              <div className="mt-16 h-px bg-border" />
            )}
          </div>
        ))}
      </div>
    </PageShell>
    </>
  );
}
