import type { ProjectMediaItem } from "@/types/project-media";

import Divider from "@/components/ui/Divider";
import ProjectMediaGallery from "./ProjectMediaGallery";

export default function ProjectEvidenceSection({
  media,
  headingId,
  title = "Architecture & Engineering Evidence",
  subtitle = "Real pipeline execution, orchestration, validation, and infrastructure artifacts from the Retail Ops Platform.",
}: {
  media: ProjectMediaItem[];
  headingId: string;
  title?: string;
  subtitle?: string;
}) {
  if (media.length === 0) return null;

  return (
    <section
      className="mt-10 border-t border-border pt-10"
      aria-labelledby={headingId}
    >
      <Divider label="evidence" />

      <div className="mt-2">
        <h3
          id={headingId}
          className="font-mono text-sm font-medium tracking-tight text-foreground sm:text-base"
        >
          {title}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div className="mt-6">
        <ProjectMediaGallery items={media} />
      </div>
    </section>
  );
}
