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
    label: "Instagram",
    href: "https://www.instagram.com/",
    ariaLabel: "Open Instagram profile",
  },
  {
    label: "CV",
    href: "/cv.pdf",
    ariaLabel: "Open CV as PDF",
  },
  {
    label: "Contact",
    href: "/contact",
    ariaLabel: "Go to contact page",
  },
];

const linkClassName =
  "rounded-2xl border border-zinc-200 px-5 py-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2";

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isFileLink(href: string) {
  return href.endsWith(".pdf");
}

export default function LinksSection() {
  return (
    <section id="links" className="border-t border-zinc-200 py-16">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
          Links
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
          Elsewhere
        </h2>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
      </div>
    </section>
  );
}