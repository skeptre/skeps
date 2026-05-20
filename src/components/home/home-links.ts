import { SITE } from "@/config/site";

export const mailtoLinkClassName =
  "font-mono text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export const profileLinkClassName =
  "inline-flex min-w-[7rem] items-center justify-center rounded-sm border border-border bg-card px-4 py-2.5 font-mono text-sm text-muted-foreground transition-all hover:border-primary/50 hover:bg-card/80 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export type HomeLinkItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export const HOME_LINKS: HomeLinkItem[] = [
  {
    label: "GitHub",
    href: SITE.github,
    ariaLabel: "Open GitHub profile",
  },
  {
    label: "Projects",
    href: "/projects",
    ariaLabel: "View projects",
  },
  {
    label: "LeetCode",
    href: SITE.leetcode,
    ariaLabel: "Open LeetCode profile",
  },
  {
    label: "LinkedIn",
    href: SITE.linkedin,
    ariaLabel: "Open LinkedIn profile",
  },
  {
    label: "CV",
    href: SITE.cvPath,
    ariaLabel: "Open CV as PDF",
  },
  {
    label: "Contact",
    href: "/contact",
    ariaLabel: "Go to contact page",
  },
];

export function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function isFileHref(href: string) {
  return href.endsWith(".pdf");
}
