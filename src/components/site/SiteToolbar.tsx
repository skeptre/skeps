"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isFileHref } from "@/components/home/home-links";
import { SITE } from "@/config/site";
import MobileMenu from "@/components/site/MobileMenu";
import NavClock from "@/components/site/NavClock";

const navLinkBase =
  "font-mono text-sm ui-transition focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm";

export default function SiteToolbar() {
  const pathname = usePathname();

  return (
    <header className="fade-in-up stagger-1 fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-8">
        <Link
          href="/"
          aria-label="Home"
          className="font-mono text-sm font-medium text-primary ui-transition hover:opacity-80"
        >
          &lt;{SITE.handle} /&gt;
        </Link>

        {/* Desktop nav + clock */}
        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-6" aria-label="Site navigation">
            {SITE.nav.map((link) => {
              const label = link.label.toLowerCase();
              const isActive =
                !link.external &&
                !isFileHref(link.href) &&
                (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href));
              const colorClass = isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-primary";

              if (link.external || isFileHref(link.href)) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    {...(link.external && !isFileHref(link.href)
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`${navLinkBase} ${colorClass}`}
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
                  className={`${navLinkBase} ${colorClass}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <NavClock />
        </div>

        {/* Mobile hamburger + drawer */}
        <MobileMenu />
      </div>
    </header>
  );
}
