import type { Project } from "@/data/projects";
import { slugify } from "@/lib/slugify";
import ProjectEvidenceSection from "@/components/projects/ProjectEvidenceSection";
import TechBadge from "@/components/ui/TechBadge";

export default function ProjectCard({
  project,
  index,
  titleAs = "h2",
}: {
  project: Project;
  index: number;
  titleAs?: "h1" | "h2";
}) {
  const delay = `stagger-${Math.min(index + 2, 4) as 2 | 3 | 4}`;
  const evidenceHeadingId = `project-evidence-${slugify(project.title)}`;
  const TitleTag = titleAs;

  return (
    <article className={`fade-in-up ${delay}`}>
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div>
          <TitleTag className="text-2xl font-bold tracking-tight md:text-3xl">
            {project.title}
          </TitleTag>
          <p className="mt-1 font-mono text-xs text-primary">
            {"//"} {project.type}
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

      {project.media && project.media.length > 0 && (
        <ProjectEvidenceSection
          media={project.media}
          headingId={evidenceHeadingId}
          title={project.evidenceTitle}
          subtitle={project.evidenceSubtitle}
        />
      )}

      {/* Stack */}
      <div className="mt-8">
        <div className="divider py-0 mb-4">
          <span className="font-mono text-xs text-primary">{"//"}</span>
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
