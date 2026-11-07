import Link from "next/link";

import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

const pill =
  "inline-flex min-h-10 items-center justify-center rounded-full border border-border bg-secondary/50 px-4 py-2 font-mono text-sm text-muted-foreground transition-colors duration-200 hover:border-primary/60 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function isFileHref(href: string) {
  return href.endsWith(".pdf");
}

/**
 * Pill links to GitHub, LinkedIn, LeetCode, the CV and the contact page.
 * The aria-label "Social and contact links" is relied on by the e2e tests.
 */
export default function SocialLinksNav({
  className,
  exclude = [],
}: {
  className?: string;
  /** Hrefs to leave out (e.g. "/contact" when already on the contact page). */
  exclude?: string[];
}) {
  const links = SITE.nav.filter((link) => !exclude.includes(link.href));

  return (
    <nav
      className={cn("flex flex-wrap gap-2.5", className)}
      aria-label="Social and contact links"
    >
      {links.map((link) => {
        if (link.external || isFileHref(link.href)) {
          return (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.ariaLabel}
              target="_blank"
              rel="noopener noreferrer"
              className={pill}
            >
              {link.label}
            </a>
          );
        }
        return (
          <Link key={link.href} href={link.href} aria-label={link.ariaLabel} className={pill}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
