import Image from "next/image";

import type { ProjectMediaItem } from "@/types/project-media";

export type ProjectMediaCardVariant = "hero" | "grid";

const variantConfig: Record<
  ProjectMediaCardVariant,
  {
    shell: string;
    aspect: string;
    title: string;
    imageSizes: string;
    showDescription: boolean;
  }
> = {
  hero: {
    shell: "border-border/80",
    aspect: "aspect-[21/9] sm:aspect-[2/1]",
    title: "text-sm sm:text-base",
    imageSizes:
      "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px",
    showDescription: true,
  },
  grid: {
    shell: "border-border",
    aspect: "aspect-video",
    title: "text-sm",
    imageSizes: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px",
    showDescription: true,
  },
};

export default function ProjectMediaCard({
  item,
  variant,
  onOpen,
  priority = false,
}: {
  item: ProjectMediaItem;
  variant: ProjectMediaCardVariant;
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
  priority?: boolean;
}) {
  const styles = variantConfig[variant];

  return (
    <button
      type="button"
      onClick={onOpen}
      title={item.title}
      className={`group flex w-full flex-col overflow-hidden rounded-sm border bg-card text-left ui-transition hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${styles.shell}`}
    >
      <div className={`relative w-full shrink-0 bg-secondary ${styles.aspect}`}>
        <Image
          src={item.image}
          alt={item.description}
          fill
          className="object-contain object-left-top p-1 sm:p-2"
          sizes={styles.imageSizes}
          loading={priority ? undefined : "lazy"}
          priority={priority}
        />
      </div>
      <div className="flex flex-col gap-2 border-t border-border p-4 sm:p-5">
        {item.category && (
          <span className="w-fit rounded-sm border border-border bg-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            {item.category}
          </span>
        )}
        <span
          className={`font-mono font-medium leading-snug text-foreground ${styles.title}`}
        >
          {item.title}
        </span>
        {styles.showDescription && (
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {item.description}
          </p>
        )}
        <span className="font-mono text-[10px] text-primary/80">
          view artifact →
        </span>
      </div>
    </button>
  );
}
