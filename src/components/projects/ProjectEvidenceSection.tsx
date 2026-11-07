import type { ProjectMediaItem } from "@/types/project-media";

import Divider from "@/components/ui/Divider";
import ProjectMediaGallery from "./ProjectMediaGallery";

export default function ProjectEvidenceSection({
  media,
  headingId,
  title = "Architecture & Engineering Evidence",
  subtitle = "Project artifacts, execution results, and technical evidence from the implementation.",
  headingLevel = "h3",
}: {
  media: ProjectMediaItem[];
  headingId: string;
  title?: string;
  subtitle?: string;
  headingLevel?: "h2" | "h3";
}) {
  if (media.length === 0) return null;
  const Heading = headingLevel;

  return (
    <section
      className="mt-14 border-t border-border pt-10"
      aria-labelledby={headingId}
    >
      <Divider label="Evidence" />

      <div className="mt-2">
        <Heading
          id={headingId}
          className="text-2xl font-semibold tracking-[-0.03em] text-foreground"
        >
          {title}
        </Heading>
        <p className="mt-3 max-w-[42rem] text-[15px] leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div className="mt-6">
        <ProjectMediaGallery items={media} />
      </div>
    </section>
  );
}
