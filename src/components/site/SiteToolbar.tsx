"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isFileHref } from "@/components/home/home-links";
import { SITE } from "@/config/site";
import MobileMenu from "@/components/site/MobileMenu";

const PRIMARY_LABELS = new Set(["Projects", "Blog", "CV", "Contact"]);

const primaryNav = SITE.nav.filter((link) => PRIMARY_LABELS.has(link.label));

const navLinkBase =
  "rounded-md px-3 py-1.5 font-mono text-xs transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card";

export default function SiteToolbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          aria-label="Home"
          className="group flex items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="font-mono text-sm font-medium text-primary transition-opacity duration-150 group-hover:opacity-80">
            &lt;{SITE.handle} /&gt;
          </span>
          <span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
          <span className="hidden font-mono text-[11px] text-muted-foreground sm:block">
            software engineer
          </span>
        </Link>

        <div className="hidden items-center lg:flex">
          <nav
            className="flex items-center gap-1 rounded-lg border border-border/70 bg-card/70 p-1 shadow-[0_1px_0_hsl(0_0%_100%/0.03)_inset]"
            aria-label="Site navigation"
          >
            {primaryNav.map((link) => {
              const label = link.label.toLowerCase();
              const isActive =
                !link.external &&
                !isFileHref(link.href) &&
                (link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href));
              const stateClass = isActive
                ? "bg-secondary text-primary"
                : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground";

              if (link.external || isFileHref(link.href)) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    {...(link.external && !isFileHref(link.href)
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`${navLinkBase} ${stateClass}`}
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
