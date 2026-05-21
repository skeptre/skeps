"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import type { ProjectMediaItem } from "@/types/project-media";

import ProjectMediaCard from "./ProjectMediaCard";
import ProjectMediaModal from "./ProjectMediaModal";

export default function ProjectMediaGallery({
  items,
}: {
  items: ProjectMediaItem[];
}) {
  const scrollRestoreRef = useRef(0);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const ordered = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.primary && !b.primary) return -1;
        if (!a.primary && b.primary) return 1;
        return 0;
      }),
    [items],
  );

  const featured = ordered.find((i) => i.featured);
  const primaryItems = ordered.filter((i) => i.primary && !i.featured);
  const gridItems = ordered.filter((i) => !i.featured && !i.primary);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeModal = useCallback(() => {
    const scrollY = scrollRestoreRef.current;
    const opener = openerRef.current;
    setActiveIndex(null);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
        opener?.focus({ preventScroll: true });
      });
    });
  }, []);
  const navigateModal = useCallback((index: number) => setActiveIndex(index), []);

  const openAt = (item: ProjectMediaItem) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openerRef.current = e.currentTarget;
    scrollRestoreRef.current = window.scrollY;
    const idx = ordered.findIndex((i) => i.image === item.image);
    if (idx >= 0) setActiveIndex(idx);
  };

  return (
    <>
      <div className="space-y-4">
        <p className="font-mono text-[10px] text-muted-foreground">
          select artifact to expand
        </p>

        {featured && (
          <ProjectMediaCard
            item={featured}
            variant="hero"
            onOpen={openAt(featured)}
            priority
          />
        )}

        {primaryItems.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {primaryItems.map((item) => (
              <ProjectMediaCard
                key={item.image}
                item={item}
                variant="grid"
                onOpen={openAt(item)}
              />
            ))}
          </div>
        )}

        {gridItems.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {gridItems.map((item) => (
              <ProjectMediaCard
                key={item.image}
                item={item}
                variant="grid"
                onOpen={openAt(item)}
              />
            ))}
          </div>
        )}
      </div>

      {activeIndex !== null && (
        <ProjectMediaModal
          items={ordered}
          index={activeIndex}
          onClose={closeModal}
          onNavigate={navigateModal}
        />
      )}
    </>
  );
}
