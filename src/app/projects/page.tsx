import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/config/site";
import { PROJECTS, type Project } from "@/data/projects";
import Divider from "@/components/ui/Divider";
import PageShell from "@/components/ui/PageShell";
import SectionLabel from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Projects",
  description: `Backend projects and systems built by ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/projects` },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-sm border border-border bg-card p-6 transition-all hover:border-primary/50 hover:bg-card/80">
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-mono text-lg font-medium transition-colors group-hover:text-primary">
          {project.title}
        </h2>
        {project.impact && (
          <span className="shrink-0 font-mono text-xs text-primary">
            // {project.impact}
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <p className="mt-2 font-mono text-xs text-muted-foreground">
        <span className="text-primary">// role</span> {project.role}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-sm border border-border bg-secondary px-2 py-1 font-mono text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {(project.github ?? project.demo) && (
        <div className="mt-5 flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              github →
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              demo →
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <PageShell>
      <p className="fade-in-up stagger-1">
        <Link
          href="/"
          className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          ← /home
        </Link>
      </p>

      <section className="mt-12">
        <SectionLabel>work</SectionLabel>

        <h1 className="fade-in-up stagger-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Projects.
        </h1>

        <p className="fade-in-up stagger-3 mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
          Backend systems, tools, and experiments. Built to solve real problems
          and understand how things break.
        </p>

        <div className="fade-in-up stagger-4">
          <Divider label="projects" />
        </div>

        {PROJECTS.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">
            // coming soon
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
