import { SITE } from "@/config/site";

export const mailtoLinkClassName =
  "font-mono text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const profileLinkClassName =
  "home-profile-link inline-flex items-center justify-center rounded-md border border-border/80 bg-card/60 px-3.5 py-2 font-mono text-xs text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export type HomeLinkItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export const HOME_LINKS: HomeLinkItem[] = SITE.nav.map(
  ({ label, href, ariaLabel }) => ({
    label,
    href,
    ariaLabel,
  }),
);

export function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function isFileHref(href: string) {
  return href.endsWith(".pdf");
}
