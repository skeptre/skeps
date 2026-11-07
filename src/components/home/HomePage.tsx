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

import {
  BackgroundBeams,
  FlipWords,
  LampContainer,
  MovingBorderButton,
  Spotlight,
  TextGenerateEffect,
} from "@/components/aceternity";
import ProjectTiltCard from "@/components/projects/ProjectTiltCard";
import SocialLinksNav from "@/components/site/SocialLinksNav";
import CopyEmailButton from "@/components/ui/CopyEmailButton";
import { SITE } from "@/config/site";
import { BLOG_POSTS } from "@/data/posts";
import { PROJECTS } from "@/data/projects";
import { RELAY } from "@/data/relay";

const STACK: { Icon: IconType; label: string }[] = [
  { Icon: SiPython, label: "Python" },
  { Icon: SiFastapi, label: "FastAPI" },
  { Icon: SiPostgresql, label: "PostgreSQL" },
  { Icon: SiDocker, label: "Docker" },
  { Icon: SiPrefect, label: "Prefect" },
  { Icon: SiOpenai, label: "LLM APIs" },
  { Icon: SiTypescript, label: "TypeScript" },
];

const HEADLINE_WORDS = [
  ...["I", "build", "the", "systems"].map((text) => ({ text })),
  { text: "behind", className: "text-soft" },
  { text: "the", className: "text-dim" },
  { text: "product.", className: "text-dim" },
];

const CASE_STUDIES = [
  {
    slug: "llm-benchmarking-framework-for-financial-sentiment-analysis",
    eyebrow: "ML evaluation",
    description: "GPT-4o 80.22% vs Gemini 2.5 Flash 17.24% macro F1, McNemar p < 0.001.",
  },
  {
    slug: "retail-operations-intelligence-platform",
    eyebrow: "data engineering",
    description: "Prefect ELT, medallion layers and a FastAPI analytics API.",
  },
  {
    slug: "sana-wajid-photography",
    eyebrow: "client work",
    description: "Production Next.js site for a Manchester photographer.",
  },
].flatMap((entry) => {
  const project = PROJECTS.find((item) => item.slug === entry.slug);
  return project ? [{ ...entry, title: project.title }] : [];
});

const LATEST_POST = BLOG_POSTS[0];

export default function HomePage() {
  return (
    <main id="main" className="bg-background text-foreground">
      <section className="relative min-h-[85svh] overflow-hidden bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px]">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
        <BackgroundBeams />

        <div className="site-container relative z-10 py-28 lg:py-36">
          <p className="font-mono text-[15px] text-muted-foreground">
            Software engineer ·{" "}
            <FlipWords words={["backend", "data", "AI evaluation"]} className="text-primary" />
          </p>

          <h1 className="mt-6 max-w-[14ch] text-balance text-[clamp(3rem,7.4vw,7rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            <TextGenerateEffect words={HEADLINE_WORDS} />
          </h1>

          <p className="mt-8 max-w-[34rem] text-[19px] font-light leading-relaxed text-muted-foreground">
            APIs, data pipelines and LLM evaluation tooling in Python and PostgreSQL. Open to
            roles in Manchester, London and Paris.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <MovingBorderButton href="/projects" borderRadius="14px">
              See selected work
            </MovingBorderButton>
            <a
              href={SITE.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open CV as PDF in a new tab"
              className="inline-flex h-[54px] items-center rounded-[14px] border border-border px-6 font-semibold transition-colors hover:border-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View CV
            </a>
          </div>

          <ul className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6">
            {STACK.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon size={16} className="text-primary/90" aria-hidden />
                <span className="font-mono text-[13px] text-muted-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="site-container py-24 lg:py-28">
        <h2 className="text-[clamp(2.25rem,4.4vw,3.75rem)] font-semibold leading-none tracking-[-0.045em]">
          Selected work
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <ProjectTiltCard
            eyebrow={RELAY.eyebrow}
            eyebrowTone="accent"
            title={RELAY.title}
            description={RELAY.description}
            href={RELAY.github}
            external
            ariaLabel={RELAY.ariaLabel}
            footer="View on GitHub →"
            resting
            glow
          />
          {CASE_STUDIES.map((study) => (
            <ProjectTiltCard
              key={study.slug}
              eyebrow={study.eyebrow}
              title={study.title}
              description={study.description}
              href={`/projects/${study.slug}`}
              ariaLabel={`Read case study: ${study.title}`}
              footer="Case study →"
            />
          ))}
        </div>

        <div className="mt-8 text-right">
          <Link
            href="/projects"
            className="inline-block rounded font-mono text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            All projects →
          </Link>
        </div>
      </section>

      {LATEST_POST ? (
        <section className="border-y border-border bg-card/30">
          <div className="site-container grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <p className="font-mono text-[15px] text-primary">Latest note</p>
              <h2 className="mt-4 max-w-xl text-[clamp(1.75rem,3.2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.04em]">
                Writing down what I learn while building.
              </h2>
            </div>

            <Link
              href={`/blog/${LATEST_POST.slug}`}
              className="block rounded-[20px] border border-border bg-card p-7 transition-colors hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="flex flex-wrap items-center gap-x-3 font-mono text-[13px] text-muted-foreground">
                <time dateTime={LATEST_POST.published}>{LATEST_POST.published}</time>
                <span aria-hidden>·</span>
                <span>{LATEST_POST.readingTime}</span>
              </span>
              <span className="mt-4 block text-[1.375rem] font-semibold leading-tight tracking-[-0.03em]">
                {LATEST_POST.title}
              </span>
              <span className="mt-3 block text-[15px] font-light leading-6 text-muted-foreground">
                {LATEST_POST.description}
              </span>
            </Link>
          </div>
        </section>
      ) : null}

      <section id="links">
        <LampContainer>
          <h2 className="text-balance text-center text-[clamp(2.5rem,5.6vw,5rem)] font-semibold leading-none tracking-[-0.05em]">
            Want to talk engineering?
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="rounded font-mono text-lg underline decoration-border underline-offset-4 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {SITE.email}
            </a>
            <CopyEmailButton email={SITE.email} />
          </div>
          <SocialLinksNav className="mt-8 justify-center" />
        </LampContainer>
      </section>
    </main>
  );
}
