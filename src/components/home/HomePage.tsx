import Link from "next/link";

import { SITE } from "@/config/site";
import AnalogClock from "@/components/site/AnalogClock";
import Divider from "@/components/ui/Divider";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  HOME_LINKS,
  isExternalHref,
  isFileHref,
  mailtoLinkClassName,
  profileLinkClassName,
} from "@/components/home/home-links";

function ProfileLinksNav() {
  return (
    <nav className="flex flex-wrap gap-3" aria-label="Social and contact links">
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
    <main id="main" className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center bg-grid">
        <div className="mx-auto w-full max-w-[1400px] px-8 py-20">
          <div className="max-w-2xl">
            <SectionLabel>about</SectionLabel>

            <h1 className="fade-in-up stagger-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Hi, I&apos;m Mansoor Ali.
            </h1>

            <p className="fade-in-up stagger-3 mt-2 text-4xl font-bold leading-tight tracking-tight text-muted-foreground md:text-5xl lg:text-6xl">
              I build reliable backend systems
            </p>

            <div className="fade-in-up stagger-4 mt-8 max-w-lg space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                I&apos;m currently focused on building complete backend systems
                in Python.
              </p>
              <p>
                I enjoy debugging complex behaviour, thinking through edge
                cases, and understanding how systems behave under real-world
                constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Draggable clock — fixed overlay, spawns top-right below navbar */}
      <AnalogClock />

      {/* Links */}
      <div className="mx-auto max-w-[1400px] px-8">
        <Divider label="connect" />
      </div>

      <section id="links" className="mx-auto max-w-[1400px] px-8 pb-20">
        <ProfileLinksNav />

        <div className="mt-16 border-t border-border pt-8">
          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
            If you&apos;re hiring for graduate or junior backend roles, feel
            free to reach out at{" "}
            <a
              href={`mailto:${SITE.email}`}
              className={mailtoLinkClassName}
            >
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
