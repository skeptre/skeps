import Link from "next/link";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiFastapi,
  SiOpenai,
  SiPandas,
  SiPostgresql,
  SiPrefect,
  SiPython,
  SiTypescript,
} from "react-icons/si";

import { SITE } from "@/config/site";
import Divider from "@/components/ui/Divider";
import PageHeader from "@/components/ui/PageHeader";
import {
  HOME_LINKS,
  isExternalHref,
  isFileHref,
  mailtoLinkClassName,
  profileLinkClassName,
} from "@/components/home/home-links";

const STACK: { Icon: IconType; label: string }[] = [
  { Icon: SiPython, label: "Python" },
  { Icon: SiFastapi, label: "FastAPI" },
  { Icon: SiPostgresql, label: "PostgreSQL" },
  { Icon: SiDocker, label: "Docker" },
  { Icon: SiPrefect, label: "Prefect" },
  { Icon: SiPandas, label: "Pandas" },
  { Icon: SiOpenai, label: "LLM APIs" },
  { Icon: SiTypescript, label: "TypeScript" },
];

function ProfileLinksNav() {
  return (
    <nav className="flex flex-wrap gap-3" aria-label="Social and contact links">
      {HOME_LINKS.map((link) => {
        const isAnchor = isExternalHref(link.href) || isFileHref(link.href);

        if (isAnchor) {
          const isPdf = isFileHref(link.href);
          return (
            <a
              key={link.href}
              href={link.href}
              aria-label={link.ariaLabel}
              {...(isPdf
                ? {}
                : { target: "_blank", rel: "noopener noreferrer" })}
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
            aria-label={link.ariaLabel}
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
      <section className="relative flex min-h-[80vh] items-center bg-grid">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-20 sm:px-8">
          <div className="max-w-3xl">
            <PageHeader
              layout="standalone"
              variant="hero"
              label="about"
              title="Software Engineer building backend, data and AI systems."
              description="I build APIs, data pipelines, and evaluation tooling primarily with Python, PostgreSQL, and cloud-native infrastructure. I use TypeScript when a product needs a frontend."
            />

            <div className="fade-in-up stagger-3 mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="rounded-sm bg-primary px-4 py-2.5 font-mono text-sm font-medium text-background transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                view projects →
              </Link>
              <Link
                href="/contact"
                className="rounded-sm border border-border bg-card px-4 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                contact
              </Link>
            </div>

            <div className="fade-in-up stagger-4 mt-10">
              <p className="mb-4 font-mono text-xs text-muted-foreground">
                {"//"} core stack
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {STACK.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-muted-foreground"
                  >
                    <Icon size={20} className="text-primary" aria-hidden />
                    <span className="font-mono text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-8">
        <Divider label="connect" />
      </div>

      <section id="links" className="mx-auto max-w-[1400px] px-6 pb-20 sm:px-8">
        <ProfileLinksNav />

        <div className="section-footer">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            For software engineering opportunities, technical collaboration, or
            questions about my work, reach me at{" "}
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
