export const ABOUT_EMAIL = "aliskepss@gmail.com";

export const mailtoLinkClassName =
  "font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-[5px] hover:decoration-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-300 dark:focus-visible:ring-offset-zinc-950";

export const profileLinkClassName =
  "inline-flex min-w-[7.5rem] justify-center rounded-2xl border border-zinc-200 px-5 py-[0.9rem] text-[0.8125rem] font-medium tracking-wide text-zinc-900 shadow-sm shadow-zinc-900/5 hover:border-zinc-900 hover:bg-zinc-50 hover:shadow-zinc-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:shadow-none dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950";

export type HomeLinkItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export const HOME_LINKS: HomeLinkItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/skeptre",
    ariaLabel: "Open GitHub profile",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/skeps/",
    ariaLabel: "Open LeetCode profile",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/skeps",
    ariaLabel: "Open LinkedIn profile",
  },
  {
    label: "CV",
    href: "/M_Ali_2.pdf",
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
