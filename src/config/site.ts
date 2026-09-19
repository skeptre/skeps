export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
  mobileHidden?: boolean;
  ariaLabel?: string;
};

const nav: NavLink[] = [
  { label: "GitHub",   href: "https://github.com/skeptre",        external: true, ariaLabel: "Open GitHub profile" },
  { label: "Projects", href: "/projects",                                          ariaLabel: "View projects" },
  { label: "Blog",     href: "/blog",                                              ariaLabel: "Read technical notes" },
  { label: "LeetCode", href: "https://leetcode.com/u/skeps/",     external: true, mobileHidden: true, ariaLabel: "Open LeetCode profile" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/skeps", external: true, ariaLabel: "Open LinkedIn profile" },
  { label: "CV",       href: "/M_Ali_2.pdf",                                      ariaLabel: "Open CV as PDF" },
  { label: "Contact",  href: "/contact",                                           ariaLabel: "Go to contact page" },
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
  linkedin: "https://www.linkedin.com/in/skeps",
  leetcode: "https://leetcode.com/u/skeps/",
  cvPath: "/M_Ali_2.pdf",
  nav,
} as const;
