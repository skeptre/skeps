import Link from "next/link";

import { SITE } from "@/config/site";
import MobileMenu from "@/components/site/MobileMenu";
import NavClock from "@/components/site/NavClock";

const navLinkClass =
  "font-mono text-sm text-muted-foreground transition-colors hover:text-primary";

export default function SiteToolbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-8">
        <Link
          href="/"
          className="font-mono text-sm font-medium text-primary"
          aria-label="Home"
        >
          &lt;{SITE.handle} /&gt;
        </Link>

        {/* Desktop nav + clock */}
        <div className="hidden items-center gap-6 md:flex">
        <nav className="flex items-center gap-6" aria-label="Site navigation">
          {SITE.nav.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className={navLinkClass}
              >
                {link.label.toLowerCase()}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.ariaLabel}
                className={navLinkClass}
              >
                {link.label.toLowerCase()}
              </Link>
            )
          )}
        </nav>
        <NavClock />
        </div>

        {/* Mobile hamburger + drawer */}
        <MobileMenu />
      </div>
    </header>
  );
}
