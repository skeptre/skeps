"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
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
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const item = items[index];
  const itemCount = items.length;
  const hasPrev = index > 0;
  const hasNext = index < itemCount - 1;

  useEffect(() => {
    if (!mounted) return;
    const unlock = lockBodyScroll();
    closeRef.current?.focus({ preventScroll: true });
    return unlock;
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowLeft" && index > 0) { onNavigate(index - 1); return; }
      if (e.key === "ArrowRight" && index < itemCount - 1) { onNavigate(index + 1); return; }
      if (e.key === "Tab") {
        const overlay = overlayRef.current;
        if (!overlay) return;
        const focusable = Array.from(
          overlay.querySelectorAll<HTMLElement>(
            "button:not([disabled]), [href], [tabindex]:not([tabindex=\"-1\"])"
          )
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, onClose, onNavigate, index, itemCount]);

  if (!item || !mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-media-modal-title"
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose();
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
            onClick={onClose}
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
              onClick={() => onNavigate(index - 1)}
              disabled={!hasPrev}
              className="rounded-sm border border-border bg-card px-3 py-1.5 ui-transition enabled:hover:border-primary/40 enabled:hover:text-foreground disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Previous image"
            >
              ← prev
            </button>
            <button
              type="button"
              onClick={() => onNavigate(index + 1)}
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
