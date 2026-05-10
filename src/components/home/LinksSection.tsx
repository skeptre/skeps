import Link from "next/link";

type LinkItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

const links: LinkItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/skeptre",
    ariaLabel: "Open GitHub profile",
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

const linkClassName =
  "inline-flex min-w-[7.5rem] justify-center rounded-2xl border border-zinc-200 px-5 py-[0.9rem] text-[0.8125rem] font-medium tracking-wide text-zinc-900 shadow-sm shadow-zinc-900/5 transition hover:border-zinc-900 hover:bg-zinc-50 hover:shadow-zinc-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2";

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isFileLink(href: string) {
  return href.endsWith(".pdf");
}

export default function LinksSection() {
  return (
    <section
      id="links"
      className="border-t border-zinc-200 py-16 sm:py-20 text-center"
    >
      <nav
        className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-4"
        aria-label="Social and contact links"
      >
        {links.map((link) => {
          const shouldUseAnchor =
            isExternalLink(link.href) || isFileLink(link.href);

          if (shouldUseAnchor) {
            return (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel ?? link.label}
                className={linkClassName}
              >
                {link.label}
              </a>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.ariaLabel ?? link.label}
              className={linkClassName}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </section>
  );
}
