import Link from "next/link";

import { SITE } from "@/config/site";

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

        <nav className="flex items-center gap-6" aria-label="Site navigation">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            github
          </a>
          <a
            href={SITE.cvPath}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            cv
          </a>
          <Link
            href="/contact"
            className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
