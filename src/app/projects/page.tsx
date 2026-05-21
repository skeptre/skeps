import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/config/site";
import { PROJECTS, type Project } from "@/data/projects";
import ProjectsTOC from "@/components/projects/ProjectsTOC";
import { slugify } from "@/lib/slugify";
import PageShell from "@/components/ui/PageShell";
import SectionLabel from "@/components/ui/SectionLabel";
import TechBadge from "@/components/ui/TechBadge";

export const metadata: Metadata = {
  title: "Projects",
  description: `Backend projects and systems built by ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/projects` },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const delay = `stagger-${Math.min(index + 2, 4) as 2 | 3 | 4}`;
  return (
    <article className={`fade-in-up ${delay}`}>
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {project.title}
          </h2>
          <p className="mt-1 font-mono text-xs text-primary">
            {'//'} {project.type}
          </p>
        </div>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            github →
          </a>
        )}
      </div>

      {/* Description */}
      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
        {project.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Bullets */}
      {project.bullets && (
        <ul className="mt-5 space-y-2">
          {project.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="mt-0.5 shrink-0 font-mono text-primary">→</span>
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Stack */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-xs text-primary">{'//'}</span>
          <span className="font-mono text-xs text-muted-foreground">stack</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <>
    <ProjectsTOC />
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
