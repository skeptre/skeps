import Image from "next/image";

import type { ProjectMediaItem } from "@/types/project-media";

export default function ProjectMediaCard({
  item,
  onOpen,
  featured = false,
}: {
  item: ProjectMediaItem;
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Slightly wider thumb for the architecture hero in the strip. */
  featured?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      title={item.title}
      className={`group shrink-0 snap-start overflow-hidden rounded-sm border border-border bg-card text-left ui-transition hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        featured ? "w-36 sm:w-40" : "w-28 sm:w-32"
      }`}
    >
      <div className="relative aspect-[4/3] w-full bg-secondary">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-1"
          sizes={featured ? "160px" : "128px"}
          loading="lazy"
        />
      </div>
      <div className="space-y-1 border-t border-border p-2">
        {item.category && (
          <span className="block truncate font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
            {item.category}
          </span>
        )}
        <span className="line-clamp-2 font-mono text-[10px] leading-tight text-foreground">
          {item.title}
        </span>
      </div>
    </button>
  );
}
