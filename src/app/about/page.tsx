import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import ProjectTiltCard from "@/components/projects/ProjectTiltCard";
import BackLink from "@/components/ui/BackLink";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";
import { SITE } from "@/config/site";
import { PROJECTS } from "@/data/projects";
import { RELAY } from "@/data/relay";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.name} is a software engineer building backend systems, data pipelines and LLM evaluation tooling, and learning ML from the ground up.`,
  alternates: { canonical: `${SITE.url}/about` },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role,
  url: `${SITE.url}/about`,
  sameAs: [SITE.github, SITE.linkedin, SITE.leetcode],
  alumniOf: "Manchester Metropolitan University",
  knowsLanguage: ["English", "Italian", "Urdu", "Punjabi"],
  knowsAbout: [
    "Backend engineering",
    "Python",
    "PostgreSQL",
    "Data engineering",
    "Machine learning",
    "Large language model evaluation",
  ],
};

const BENCHMARK_SLUG = "llm-benchmarking-framework-for-financial-sentiment-analysis";
const BENCHMARK = PROJECTS.find((project) => project.slug === BENCHMARK_SLUG);

const linkClass =
  "rounded font-mono text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-border py-10 lg:grid-cols-[14rem_1fr] lg:gap-12">
      <h2 className="font-mono text-[15px] font-normal text-primary">{label}</h2>
      <div className="max-w-[40rem] space-y-4 text-[17px] font-light leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell>
        <BackLink />

        <PageHeader
          label="About"
          title="Engineer, building toward ML systems."
          description="I'm Mansoor Ali, a software engineer. I recently graduated in Software Engineering from Manchester Metropolitan University."
          constrained
        />

        <div className="mt-16">
          <Block label="What I build">
            <p>
              Backend systems, data pipelines and LLM evaluation tooling, mostly in Python and
              PostgreSQL. I also work in TypeScript and React, and in C#.
            </p>
            <p>
              My final-year project was a benchmarking framework that compares GPT-4o and
              Gemini 2.5 Flash on financial sentiment analysis.
              {BENCHMARK ? (
                <>
                  {" "}
                  <Link href={`/projects/${BENCHMARK.slug}`} className="rounded text-primary underline decoration-border underline-offset-4 hover:decoration-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    Read the case study
                  </Link>
                  .
                </>
              ) : null}
            </p>
          </Block>

          <Block label="Currently building">
            <p>
              Relay, an open-source webhook relay, is my main project. I am building it step by
              step: accept the event once, deliver it reliably, and show exactly what happened.
            </p>
          </Block>

          <Block label="Learning">
            <p>
              I am learning ML from the ground up. I train small vision transformers and
              nano-GPTs to understand how they work, with the aim of doing research-grade ML
              work.
            </p>
            <p>
              <Link href="/now" className={linkClass}>
                What I&apos;m working on now →
              </Link>
            </p>
          </Block>

          <Block label="Work and languages">
            <p>I am open to roles in Manchester, London and Paris.</p>
            <p>I speak English, Italian, Urdu and Punjabi.</p>
          </Block>
        </div>

        <section className="border-t border-border pt-10">
          <h2 className="font-mono text-[15px] font-normal text-primary">Selected work</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
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
            {BENCHMARK ? (
              <ProjectTiltCard
                eyebrow="ML evaluation"
                title={BENCHMARK.title}
                description="GPT-4o 80.22% vs Gemini 2.5 Flash 17.24% macro F1, McNemar p < 0.001."
                href={`/projects/${BENCHMARK.slug}`}
                ariaLabel={`Read case study: ${BENCHMARK.title}`}
                footer="Case study →"
              />
            ) : null}
          </div>
        </section>

        <section className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-10">
          <p className="text-[19px] font-light text-foreground">Want to talk engineering?</p>
          <Link href="/contact" className={linkClass}>
            Get in touch →
          </Link>
          <Link href="/now" className={linkClass}>
            See what I&apos;m working on →
          </Link>
        </section>
      </PageShell>
    </>
  );
}
