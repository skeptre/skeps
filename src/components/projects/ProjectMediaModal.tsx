"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { lockBodyScroll } from "@/lib/lock-body-scroll";
import type { ProjectMediaItem } from "@/types/project-media";

export default function ProjectMediaModal({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: ProjectMediaItem[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const onNavigateRef = useRef(onNavigate);
  const indexRef = useRef(index);
  const [mounted, setMounted] = useState(false);
  const item = items[index];
  const itemCount = items.length;
  const hasPrev = index > 0;
  const hasNext = index < itemCount - 1;

  onCloseRef.current = onClose;
  onNavigateRef.current = onNavigate;
  indexRef.current = index;

  const goPrev = useCallback(() => {
    if (indexRef.current > 0) onNavigateRef.current(indexRef.current - 1);
  }, []);

  const goNext = useCallback(() => {
    if (indexRef.current < itemCount - 1) {
      onNavigateRef.current(indexRef.current + 1);
    }
  }, [itemCount]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const unlock = lockBodyScroll();
    closeRef.current?.focus({ preventScroll: true });
    return unlock;
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, goPrev, goNext]);

  if (!item || !mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-media-modal-title"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onCloseRef.current();
      }}
    >
      <div className="relative flex max-h-full w-full max-w-6xl flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            {item.category && (
              <p className="mb-1 font-mono text-[10px] uppercase tracking-wide text-primary">
                {item.category}
              </p>
            )}
            <h2
              id="project-media-modal-title"
              className="font-mono text-sm font-medium text-foreground sm:text-base"
            >
              {item.title}
            </h2>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {item.description}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={() => onCloseRef.current()}
            className="shrink-0 rounded-sm border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground ui-transition hover:border-primary/40 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close image viewer"
          >
            esc ✕
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-sm border border-border bg-card">
          <div className="relative aspect-video max-h-[min(70vh,720px)] w-full sm:aspect-[16/10]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <span>
            {index + 1} / {items.length}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={!hasPrev}
              className="rounded-sm border border-border bg-card px-3 py-1.5 ui-transition enabled:hover:border-primary/40 enabled:hover:text-foreground disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Previous image"
            >
              ← prev
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={!hasNext}
              className="rounded-sm border border-border bg-card px-3 py-1.5 ui-transition enabled:hover:border-primary/40 enabled:hover:text-foreground disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Next image"
            >
              next →
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
