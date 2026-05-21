"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { isFileHref } from "@/components/home/home-links";
import { lockBodyScroll } from "@/lib/lock-body-scroll";
import { SITE } from "@/config/site";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  // Escape closes; Tab is trapped inside the drawer when open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key !== "Tab" || !open) return;
      const drawer = drawerRef.current;
      if (!drawer) return;
      const focusable = Array.from(
        drawer.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Scroll lock
  useEffect(() => {
    if (!open) return;
    const unlock = lockBodyScroll();
    return unlock;
  }, [open]);

  // Focus management: into drawer on open, back to hamburger on close
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
      {/* Hamburger — visible below md */}
      <button
        ref={hamburgerRef}
        className="flex flex-col gap-[5px] p-2 -mr-2 md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
      >
        <span className="block h-px w-5 bg-foreground transition-colors" />
        <span className="block h-px w-5 bg-foreground transition-colors" />
        <span className="block h-px w-5 bg-foreground transition-colors" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal={open}
        aria-label="Navigation"
        inert={!open ? true : undefined}
        className={`fixed inset-y-0 right-0 z-50 flex w-64 flex-col border-l border-border bg-card ui-transition md:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <span className="font-mono text-sm font-medium text-primary">
            &lt;{SITE.handle} /&gt;
          </span>
          <button
            ref={closeRef}
            onClick={close}
            aria-label="Close navigation menu"
            className="-mr-2 p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-6 py-6" aria-label="Mobile navigation">
          {SITE.nav.filter((l) => !l.mobileHidden).map((link) => {
            const label = link.label.toLowerCase();
            const className =
              "border-b border-border py-4 font-mono text-sm text-muted-foreground transition-colors last:border-0 hover:text-primary";
            if (link.external || isFileHref(link.href)) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  {...(link.external && !isFileHref(link.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={close}
                  className={className}
                >
                  {label}
                </a>
              );
            }
            return (
              <Link key={link.href} href={link.href} aria-label={link.ariaLabel} onClick={close} className={className}>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
