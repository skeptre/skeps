import Link from "next/link";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiFastapi,
  SiNodedotjs,
  SiOpenai,
  SiPandas,
  SiPostgresql,
  SiPrefect,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";

import { SITE } from "@/config/site";
import Divider from "@/components/ui/Divider";
import SectionLabel from "@/components/ui/SectionLabel";
import {
  HOME_LINKS,
  isExternalHref,
  isFileHref,
  mailtoLinkClassName,
  profileLinkClassName,
} from "@/components/home/home-links";

const STACK: { Icon: IconType; label: string; color: string; href: string }[] = [
  { Icon: SiPython,     label: "Python",       color: "#3776AB", href: "https://www.python.org/" },
  { Icon: SiFastapi,    label: "FastAPI",       color: "#009688", href: "https://fastapi.tiangolo.com/" },
  { Icon: SiPostgresql, label: "PostgreSQL",    color: "#4169E1", href: "https://www.postgresql.org/" },
  { Icon: SiDocker,     label: "Docker",        color: "#2496ED", href: "https://www.docker.com/" },
  { Icon: SiPrefect,    label: "Prefect",       color: "#024DFD", href: "https://www.prefect.io/" },
  { Icon: SiOpenai,     label: "OpenAI",        color: "#10A37F", href: "https://openai.com/api/" },
  { Icon: SiPandas,     label: "Pandas",        color: "#E040FB", href: "https://pandas.pydata.org/" },
  { Icon: SiNodedotjs,  label: "Node.js",       color: "#5FA04E", href: "https://nodejs.org/en" },
  { Icon: SiTypescript, label: "TypeScript",    color: "#3178C6", href: "https://www.typescriptlang.org/" },
  { Icon: SiReact,      label: "React Native",  color: "#61DAFB", href: "https://reactnative.dev/" },
];

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
              Graduate Software Engineer focused on backend systems, AI and data engineering.
            </h1>

            <div className="fade-in-up stagger-3 mt-10">
              {[STACK.slice(0, 8), STACK.slice(8)].map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  className="flex gap-x-10"
                  style={{ marginTop: rowIdx > 0 ? "1.5rem" : 0, paddingLeft: rowIdx > 0 ? "52px" : 0 }}
                >
                  {row.map(({ Icon, label, color, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} documentation`}
                      style={{ "--brand": color } as React.CSSProperties}
                      className="group flex w-16 shrink-0 flex-col items-center gap-2"
                    >
                      <Icon
                        size={24}
                        className="text-muted-foreground/50 transition-colors duration-200 group-hover:text-[var(--brand)]"
                        aria-hidden
                      />
                      <span className="whitespace-nowrap font-mono text-[10px] text-muted-foreground/50 transition-colors duration-200 group-hover:text-[var(--brand)]">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
