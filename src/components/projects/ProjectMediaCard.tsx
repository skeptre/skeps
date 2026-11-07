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
    aspect: "aspect-video sm:aspect-[2/1]",
    title: "text-base",
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
      className={`group flex w-full flex-col overflow-hidden rounded-[20px] border bg-card text-left transition-colors duration-300 hover:border-primary/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${styles.shell}`}
    >
      <div className={`relative m-2 w-[calc(100%-1rem)] shrink-0 overflow-hidden rounded-xl bg-secondary ${styles.aspect}`}>
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
          <span className="w-fit rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/40">
            {item.category}
          </span>
        )}
        <span
          className={`font-semibold leading-snug tracking-[-0.01em] text-foreground ${styles.title}`}
        >
          {item.title}
        </span>
        {styles.showDescription && (
          <p className="text-sm font-light leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        )}
        <span className="font-mono text-xs text-primary">
          view artifact →
        </span>
      </div>
    </button>
  );
}
