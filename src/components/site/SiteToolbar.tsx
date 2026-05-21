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
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className={navLinkClass}>
            github
          </a>
          <Link href="/projects" className={navLinkClass}>projects</Link>
          <a href={SITE.leetcode} target="_blank" rel="noopener noreferrer" className={navLinkClass}>
            leetcode
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={navLinkClass}>
            linkedin
          </a>
          <a href={SITE.cvPath} target="_blank" rel="noopener noreferrer" className={navLinkClass}>
            cv
          </a>
          <Link href="/contact" className={navLinkClass}>contact</Link>
        </nav>
        <NavClock />
        </div>

        {/* Mobile hamburger + drawer */}
        <MobileMenu />
      </div>
    </header>
  );
}
