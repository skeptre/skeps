export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  mobileHidden?: boolean;
  ariaLabel?: string;
};

const nav: NavLink[] = [
  { label: "GitHub",   href: "https://github.com/skeptre",         external: true, ariaLabel: "Open GitHub profile in a new tab" },
  { label: "Work",     href: "/projects",                                           ariaLabel: "View projects" },
  { label: "About",    href: "/about",                                              ariaLabel: "About Mansoor Ali" },
  { label: "Notes",    href: "/blog",                                               ariaLabel: "Read technical notes" },
  { label: "Now",      href: "/now",                                                ariaLabel: "What I'm working on now" },
  { label: "LeetCode", href: "https://leetcode.com/u/skeps/",      external: true, mobileHidden: true, ariaLabel: "Open LeetCode profile in a new tab" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/skeps/", external: true, ariaLabel: "Open LinkedIn profile in a new tab" },
  { label: "Contact",  href: "/contact",                                            ariaLabel: "Go to contact page" },
];

export const SITE = {
  name: "Mansoor Ali",
  handle: "ali",
  role: "Software Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aliskeps.com",
  description:
    "Software Engineer building backend systems, data pipelines, and AI evaluation tooling with Python, TypeScript, and modern cloud infrastructure.",
  email: "aliskepss@gmail.com",
  github: "https://github.com/skeptre",
  linkedin: "https://www.linkedin.com/in/skeps/",
  leetcode: "https://leetcode.com/u/skeps/",
  // Bump this when page content changes (used for sitemap lastmod).
  updated: "2026-11-07",
  nav,
} as const;
