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
  { label: "LeetCode", href: "https://leetcode.com/u/skeps/",     external: true, mobileHidden: true, ariaLabel: "Open LeetCode profile" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/skeps", external: true, ariaLabel: "Open LinkedIn profile" },
  { label: "CV",       href: "/M_Ali_2.pdf",                      external: true, ariaLabel: "Open CV as PDF" },
  { label: "Contact",  href: "/contact",                                           ariaLabel: "Go to contact page" },
];

export const SITE = {
  name: "Mansoor Ali",
  handle: "ali",
  url: "https://aliskeps.com",
  description:
    "Projects, systems, experiments, and engineering work by Mansoor Ali.",
  email: "aliskepss@gmail.com",
  github: "https://github.com/skeptre",
  linkedin: "https://www.linkedin.com/in/skeps",
  leetcode: "https://leetcode.com/u/skeps/",
  cvPath: "/M_Ali_2.pdf",
  nav,
} as const;
