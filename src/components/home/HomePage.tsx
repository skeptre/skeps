import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiFastapi,
  SiOpenai,
  SiPostgresql,
  SiPrefect,
  SiPython,
  SiTypescript,
} from "react-icons/si";

import { BLOG_POSTS } from "@/data/posts";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/config/site";
import SectionLabel from "@/components/ui/SectionLabel";
import TechBadge from "@/components/ui/TechBadge";
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
  { Icon: SiOpenai, label: "LLM APIs" },
  { Icon: SiTypescript, label: "TypeScript" },
];

const FEATURED_SLUGS = [
  "retail-operations-intelligence-platform",
  "llm-benchmarking-framework-for-financial-sentiment-analysis",
  "sana-wajid-photography",
];

const FEATURED_PROJECTS = FEATURED_SLUGS.flatMap((slug) => {
  const project = PROJECTS.find((item) => item.slug === slug);
  return project ? [project] : [];
});

const LATEST_POST = BLOG_POSTS[0];

const FOCUS_AREAS = [
  {
    number: "01",
    label: "Backend",
    detail: "APIs, authentication, data models and service architecture.",
  },
  {
    number: "02",
    label: "Data",
    detail: "ELT pipelines, PostgreSQL, orchestration and quality checks.",
  },
  {
    number: "03",
    label: "AI",
    detail: "Evaluation pipelines, benchmarking and model behaviour analysis.",
  },
] as const;

function ProfileLinksNav() {
  return (
    <nav className="flex flex-wrap gap-2.5" aria-label="Social and contact links">
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
              className={`${profileLinkClassName} home-pressable`}
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
            className={`${profileLinkClassName} home-pressable`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function FeaturedProjectCard({
  project,
  index,
}: {
  project: (typeof FEATURED_PROJECTS)[number];
  index: number;
}) {
  const isWide = index === 2;
  const visual =
    project.media?.find((item) => item.featured) ?? project.media?.[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={`Read case study: ${project.title}`}
      className={`home-card home-pressable group flex h-full flex-col overflow-hidden ${
        isWide ? "lg:col-span-12" : index === 0 ? "lg:col-span-7" : "lg:col-span-5"
      }`}
    >
      {visual ? (
        <div
          className={`relative w-full overflow-hidden border-b border-border/70 bg-secondary/60 ${
            index === 0 ? "aspect-[16/8.5]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={visual.image}
            alt={visual.description}
            fill
            sizes={
              index === 0
                ? "(max-width: 1024px) 100vw, 58vw"
                : "(max-width: 1024px) 100vw, 42vw"
            }
            className="home-project-image object-contain object-left-top p-3 sm:p-4"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/45 to-transparent"
            aria-hidden
          />
        </div>
      ) : null}

      <div
        className={`flex flex-1 flex-col p-6 sm:p-7 ${
          isWide ? "lg:grid lg:grid-cols-12 lg:items-end lg:gap-12" : ""
        }`}
      >
        <div className={isWide ? "lg:col-span-7" : ""}>
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
              {project.type}
            </p>
            <span className="font-mono text-[11px] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-4 max-w-2xl text-[1.55rem] font-medium leading-tight tracking-[-0.03em] text-foreground sm:text-[1.8rem]">
            {project.title}
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div
          className={
            isWide
              ? "mt-7 lg:col-span-5 lg:mt-0"
              : "mt-auto pt-7"
          }
        >
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
            <span className="font-mono text-[11px] text-muted-foreground">
              case study
            </span>
            <span className="home-arrow font-mono text-sm text-primary" aria-hidden>
              ↗
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main id="main" className="min-h-screen bg-background text-foreground">
      <section className="home-hero relative overflow-hidden border-b border-border/70">
        <div className="home-hero-glow" aria-hidden />
        <div className="home-hero-grid" aria-hidden />

        <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-[1400px] items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="home-enter home-stagger-1">
              <SectionLabel animate={false}>software engineer</SectionLabel>
            </div>

            <h1 className="home-enter home-stagger-2 max-w-[60rem] text-[clamp(2.7rem,6.5vw,5.35rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground">
              Building{" "}
              <span className="text-primary">backend, data and AI</span>{" "}
              systems that hold up in production.
            </h1>

            <p className="home-enter home-stagger-3 mt-7 max-w-[42rem] text-base leading-7 text-muted-foreground sm:text-[1.08rem] sm:leading-8">
              I design and build APIs, data pipelines and evaluation tooling
              with Python and PostgreSQL, then use TypeScript when the product
              needs an interface.
            </p>

            <div className="home-enter home-stagger-4 mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="home-button home-button-primary home-pressable"
              >
                Explore selected work
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/blog"
                className="home-button home-button-secondary home-pressable"
              >
                Read engineering notes
              </Link>
            </div>

            <div className="home-enter home-stagger-5 mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-border/60 pt-5">
              {STACK.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Icon size={16} className="text-primary/90" aria-hidden />
                  <span className="font-mono text-[10px]">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside
            className="home-profile home-enter home-stagger-4 lg:col-span-5 xl:col-span-4"
            aria-label="Engineering focus"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border/70 px-5 py-4">
              <span className="font-mono text-[11px] text-muted-foreground">
                engineering.profile
              </span>
              <span className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_hsl(130_100%_50%/0.6)]" />
                active
              </span>
            </div>

            <div className="divide-y divide-border/70">
              {FOCUS_AREAS.map((area) => (
                <div
                  key={area.number}
                  className="grid grid-cols-[2rem_1fr] gap-4 px-5 py-5"
                >
                  <span className="font-mono text-[10px] text-primary">
                    {area.number}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {area.label}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">
                      {area.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border/70 px-5 py-4">
              <p className="font-mono text-[10px] leading-5 text-muted-foreground">
                Python · PostgreSQL · FastAPI · Docker · TypeScript
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel animate={false}>selected work</SectionLabel>
            <h2 className="max-w-2xl text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-[2.6rem] sm:leading-[1.05]">
              Systems with enough depth to inspect.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
              A data platform, an LLM evaluation framework, and production
              client work that show different parts of how I build.
            </p>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Link
              href="/projects"
              className="home-text-link home-pressable self-start lg:self-auto"
            >
              All projects <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="mt-10 grid items-stretch gap-4 lg:grid-cols-12">
          {FEATURED_PROJECTS.map((project, index) => (
            <FeaturedProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>
      </section>

      {LATEST_POST ? (
        <section className="border-y border-border/70 bg-card/25">
          <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-5">
                <SectionLabel animate={false}>latest note</SectionLabel>
                <h2 className="max-w-xl text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-[2.35rem] sm:leading-[1.08]">
                  Writing down what I learn while building.
                </h2>
              </div>

              <Link
                href={`/blog/${LATEST_POST.slug}`}
                className="home-note home-pressable group lg:col-span-7"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] text-muted-foreground">
                  <time dateTime={LATEST_POST.published}>{LATEST_POST.published}</time>
                  <span aria-hidden>·</span>
                  <span>{LATEST_POST.readingTime}</span>
                </div>

                <h3 className="mt-4 max-w-3xl text-2xl font-medium tracking-[-0.03em] text-foreground sm:text-[1.8rem] sm:leading-tight">
                  {LATEST_POST.title}
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {LATEST_POST.description}
                </p>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-border/70 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {LATEST_POST.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] text-muted-foreground"
                      >
                        #{tag.replaceAll(" ", "-").toLowerCase()}
                      </span>
                    ))}
                  </div>
                  <span className="home-arrow font-mono text-sm text-primary" aria-hidden>
                    ↗
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section id="links" className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <SectionLabel animate={false}>connect</SectionLabel>
            <h2 className="max-w-xl text-3xl font-medium tracking-[-0.04em] text-foreground sm:text-[2.6rem] sm:leading-[1.05]">
              Want to talk engineering?
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
              For software engineering opportunities, technical collaboration,
              or questions about my work, reach me at{" "}
              <a
                href={`mailto:${SITE.email}`}
                className={mailtoLinkClassName}
              >
                {SITE.email}
              </a>
              .
            </p>
          </div>

          <div className="flex lg:col-span-6 lg:justify-end">
            <ProfileLinksNav />
          </div>
        </div>
      </section>
    </main>
  );
}
