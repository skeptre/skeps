import { MovingBorderButton } from "@/components/aceternity/moving-border";
import type { Project } from "@/data/projects";
import ProjectEvidenceSection from "@/components/projects/ProjectEvidenceSection";
import Divider from "@/components/ui/Divider";
import TechBadge from "@/components/ui/TechBadge";

const titleClassName =
  "mt-3 text-[clamp(2.25rem,4.4vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground";

export default function ProjectCard({
  project,
  titleAs = "h2",
}: {
  project: Project;
  index?: number;
  titleAs?: "h1" | "h2";
}) {
  const evidenceHeadingId = `project-evidence-${project.slug}`;
  const TitleTag = titleAs;
  const link = project.github
    ? { href: project.github, label: "GitHub →" }
    : project.demo
      ? { href: project.demo, label: "Live site →" }
      : null;

  return (
    <article>
      <header>
        <p className="font-mono text-[15px] text-primary">{project.type}</p>
        <TitleTag className={titleClassName}>{project.title}</TitleTag>
        <p className="mt-5 max-w-[42rem] text-[19px] font-light leading-[1.5] text-muted-foreground">
          {project.description}
        </p>
        {link && (
          <div className="mt-8 flex flex-wrap gap-3">
            <MovingBorderButton
              as="a"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              borderRadius="14px"
            >
              {link.label}
            </MovingBorderButton>
          </div>
        )}
      </header>

      <div className="mt-12 max-w-[42rem] space-y-5 text-[17px] leading-[1.7] text-muted-foreground">
        {project.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {project.bullets && (
        <ul className="mt-6 max-w-[42rem] space-y-3">
          {project.bullets.map((b, i) => (
            <li
              key={i}
              className="flex gap-3 text-[17px] leading-[1.7] text-muted-foreground"
            >
              <span className="shrink-0 font-mono text-primary" aria-hidden="true">
                →
              </span>
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
          headingLevel={titleAs === "h1" ? "h2" : "h3"}
        />
      )}

      <div className="mt-12">
        <Divider label="Stack" />
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>
    </article>
  );
}
