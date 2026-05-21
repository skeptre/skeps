import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SITE } from "@/config/site";
import { PROJECTS } from "@/data/projects";
import { slugify } from "@/lib/slugify";
import ProjectCard from "@/components/projects/ProjectCard";
import BackLink from "@/components/ui/BackLink";
import PageShell from "@/components/ui/PageShell";
import SectionLabel from "@/components/ui/SectionLabel";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: slugify(p.title) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => slugify(p.title) === slug);
  if (!project) return {};

  const url = `${SITE.url}/projects/${slug}`;

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: project.title,
      description: project.description,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
    ...(project.github
      ? { other: { "project:repository": project.github } }
      : {}),
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => slugify(p.title) === slug);
  if (!project) notFound();

  const url = `${SITE.url}/projects/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.description,
    url,
    ...(project.github ? { codeRepository: project.github } : {}),
    programmingLanguage: project.stack.map((name) => ({
      "@type": "ComputerLanguage",
      name,
    })),
    author: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageShell>
        <BackLink href="/projects" label="projects" />

        <section className="page-section">
          <SectionLabel>work</SectionLabel>
        </section>

        <div className="page-block">
          <ProjectCard project={project} index={0} titleAs="h1" />
        </div>
      </PageShell>
    </>
  );
}
