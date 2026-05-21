"use client";

import { useMemo, useRef, useState } from "react";

import type { ProjectMediaItem } from "@/types/project-media";

import ProjectMediaCard from "./ProjectMediaCard";
import ProjectMediaModal from "./ProjectMediaModal";

export default function ProjectMediaGallery({
  items,
}: {
  items: ProjectMediaItem[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const ordered = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      }),
    [items],
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const scrollBy = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.max(160, el.clientWidth * 0.6);
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <>
      <div className="relative">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-muted-foreground">
            scroll → select artifact to expand
          </p>
          <div className="flex shrink-0 gap-1.5">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="rounded-sm border border-border bg-card px-2 py-1 font-mono text-[10px] text-muted-foreground ui-transition hover:border-primary/40 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Scroll thumbnails left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="rounded-sm border border-border bg-card px-2 py-1 font-mono text-[10px] text-muted-foreground ui-transition hover:border-primary/40 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Scroll thumbnails right"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-transparent"
          role="list"
          aria-label="Engineering evidence thumbnails"
        >
          {ordered.map((item, index) => (
            <div key={item.image} role="listitem">
              <ProjectMediaCard
                item={item}
                featured={item.featured}
                onOpen={() => setActiveIndex(index)}
              />
            </div>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <ProjectMediaModal
          items={ordered}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
