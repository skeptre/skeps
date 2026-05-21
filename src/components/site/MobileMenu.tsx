"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { SITE } from "@/config/site";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      {/* Hamburger — visible below md */}
      <button
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
          {SITE.nav.filter((l) => !l.mobileHidden).map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="border-b border-border py-4 font-mono text-sm text-muted-foreground transition-colors last:border-0 hover:text-primary"
              >
                {link.label.toLowerCase()}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="border-b border-border py-4 font-mono text-sm text-muted-foreground transition-colors last:border-0 hover:text-primary"
              >
                {link.label.toLowerCase()}
              </Link>
            )
          )}
        </nav>
      </div>
    </>
  );
}
