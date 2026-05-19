import Link from "next/link";

import {
  ABOUT_EMAIL,
  HOME_LINKS,
  isExternalHref,
  isFileHref,
  mailtoLinkClassName,
  profileLinkClassName,
} from "@/components/home/home-links";

function ProfileLinksNav() {
  return (
    <nav
      className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-4"
      aria-label="Social and contact links"
    >
      {HOME_LINKS.map((link) => {
        const isAnchor = isExternalHref(link.href) || isFileHref(link.href);

        if (isAnchor) {
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel ?? link.label}
              className={profileLinkClassName}
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
            className={profileLinkClassName}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center sm:px-8 sm:py-12 lg:px-10">
        <section id="about" className="py-16 sm:py-20">
          <div className="mx-auto max-w-lg">
            <div className="mx-auto mb-6 flex w-full max-w-[15rem] justify-center sm:mb-7 sm:max-w-[17rem]">
              <div
                className="h-[1px] w-full max-w-full rounded-full bg-zinc-400 dark:bg-zinc-500"
                aria-hidden
              />
            </div>

            <header className="text-center">
              <h1 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-[1.75rem] sm:leading-snug dark:text-zinc-50">
                Hi, I&apos;m Ali
              </h1>
              <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-500 sm:text-[0.9375rem] dark:text-zinc-400">
                Graduate Software Engineer <br />
                Manchester, United Kingdom
              </p>
            </header>

            <div className="mx-auto mt-10 max-w-lg text-pretty text-center text-[0.9375rem] leading-[1.7] text-zinc-600 sm:text-base sm:leading-[1.75] dark:text-zinc-400">
              <p>
                I&apos;m currently focused on building complete backend systems
                in Python.
              </p>
            </div>

            <div className="mx-auto mt-5 max-w-lg text-pretty text-center text-[0.9375rem] leading-[1.7] text-zinc-600 sm:text-base sm:leading-[1.75] dark:text-zinc-400">
              <p>
                I enjoy debugging complex behaviour, thinking through edge
                cases, and understanding how systems behave under real-world
                constraints.
              </p>
            </div>

            <footer className="mt-12 border-t-2 border-zinc-300 pt-10 text-center dark:border-zinc-700">
              <p className="mx-auto max-w-lg text-pretty text-center text-[0.9375rem] leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                If you&apos;re hiring for graduate or junior backend roles, feel
                free to reach out at{" "}
                <a
                  href={`mailto:${ABOUT_EMAIL}`}
                  className={mailtoLinkClassName}
                >
                  {ABOUT_EMAIL}
                </a>
                .
              </p>
            </footer>
          </div>
        </section>

        <section
          id="links"
          className="border-t-2 border-zinc-400 py-16 text-center sm:py-20 dark:border-zinc-600"
        >
          <ProfileLinksNav />
        </section>
      </div>
    </main>
  );
}
