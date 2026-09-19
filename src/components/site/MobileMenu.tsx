"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { isFileHref } from "@/components/home/home-links";
import { lockBodyScroll } from "@/lib/lock-body-scroll";
import { SITE } from "@/config/site";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !open) return;
      const drawer = drawerRef.current;
      if (!drawer) return;
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const unlock = lockBodyScroll();
    return unlock;
  }, [open]);

  useEffect(() => {
    if (open) {
      hasOpenedRef.current = true;
      requestAnimationFrame(() => closeRef.current?.focus({ preventScroll: true }));
    } else if (hasOpenedRef.current) {
      hamburgerRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <>
      <button
        ref={hamburgerRef}
        className="-mr-2 flex flex-col gap-[5px] rounded-md p-2 transition-transform duration-150 [transition-timing-function:var(--ease-out)] active:scale-[0.96] lg:hidden"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
      >
        <span
          className={`block h-px w-5 bg-foreground transition-[transform,opacity] duration-150 [transition-timing-function:var(--ease-out)] ${
            open ? "translate-y-[6px] rotate-45" : ""
          }`}
        />
        <span
          className={`block h-px w-5 bg-foreground transition-[transform,opacity] duration-150 [transition-timing-function:var(--ease-out)] ${
            open ? "scale-x-0 opacity-0" : ""
          }`}
        />
        <span
          className={`block h-px w-5 bg-foreground transition-[transform,opacity] duration-150 [transition-timing-function:var(--ease-out)] ${
            open ? "-translate-y-[6px] -rotate-45" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal={open}
        aria-label="Navigation"
        inert={!open ? true : undefined}
        className={`fixed inset-y-0 right-0 z-50 flex w-[min(20rem,86vw)] flex-col border-l border-border/80 bg-card shadow-[-24px_0_80px_hsl(0_0%_0%/0.35)] transition-transform duration-200 [transition-timing-function:var(--ease-out)] lg:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border/80 px-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-medium text-primary">
              &lt;{SITE.handle} /&gt;
            </span>
            <span className="h-3 w-px bg-border" aria-hidden />
            <span className="font-mono text-[10px] text-muted-foreground">
              menu
            </span>
          </div>
          <button
            ref={closeRef}
            onClick={close}
            aria-label="Close navigation menu"
            className="-mr-2 rounded-md p-2 text-muted-foreground transition-[transform,color] duration-150 [transition-timing-function:var(--ease-out)] active:scale-[0.96] hover:text-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-4 py-5" aria-label="Mobile navigation">
          {SITE.nav.filter((l) => !l.mobileHidden).map((link) => {
            const label = link.label.toLowerCase();
            const isActive =
              !link.external &&
              !isFileHref(link.href) &&
              (link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href));
            const baseClass =
              "rounded-md px-3 py-3.5 font-mono text-sm transition-[transform,color,background-color] duration-150 [transition-timing-function:var(--ease-out)] active:scale-[0.985]";
            const stateClass = isActive
              ? "bg-secondary text-primary"
              : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground";

            if (link.external || isFileHref(link.href)) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className={`${baseClass} ${stateClass}`}
                >
                  {label}
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.ariaLabel}
                aria-current={isActive ? "page" : undefined}
                onClick={close}
                className={`${baseClass} ${stateClass}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
