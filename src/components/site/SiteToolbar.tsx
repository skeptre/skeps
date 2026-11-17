"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SITE } from "@/config/site";
import MobileMenu from "@/components/site/MobileMenu";

function isFileHref(href: string) {
  return href.endsWith(".pdf");
}

const PRIMARY_LABELS = new Set(["Work", "About", "Notes", "Now", "SkepsLabs", "Contact"]);

const primaryNav = SITE.nav.filter((link) => PRIMARY_LABELS.has(link.label));

const navLinkBase =
  "rounded-full px-4 py-2 font-mono text-sm transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function SiteToolbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="site-container flex h-full items-center justify-between">
        <Link
          href="/"
          className="rounded-md font-sans text-[17px] font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Mansoor Ali
        </Link>

        <div className="hidden items-center lg:flex">
          <nav
            className="flex items-center gap-1 rounded-full border border-border bg-secondary/70 p-1.5"
            aria-label="Site navigation"
          >
            {primaryNav.map((link) => {
              const label = link.label;
              const isActive =
                !link.external &&
                !isFileHref(link.href) &&
                (link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href));
              const stateClass = link.highlight
                ? "inline-flex items-center gap-2 border border-primary/40 bg-primary/10 text-primary shadow-[0_0_18px_rgba(103,232,249,0.22)] hover:border-primary/70 hover:bg-primary/15"
                : isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground";

              if (link.external || isFileHref(link.href)) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${navLinkBase} ${stateClass}`}
                  >
                    {link.highlight ? (
                      <span aria-hidden className="relative flex size-2">
                        <span className="absolute inline-flex size-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
                        <span className="relative inline-flex size-2 rounded-full bg-primary" />
                      </span>
                    ) : null}
                    {label}
                    {link.external ? <span aria-hidden> ↗</span> : null}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  aria-current={isActive ? "page" : undefined}
                  className={`${navLinkBase} ${stateClass}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
