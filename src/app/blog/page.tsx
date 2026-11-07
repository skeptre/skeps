import type { Metadata } from "next";

import { SITE } from "@/config/site";
import { BLOG_POSTS } from "@/data/posts";
import BackLink from "@/components/ui/BackLink";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";
import ProjectTiltCard from "@/components/projects/ProjectTiltCard";

export const metadata: Metadata = {
  title: "Blog",
  description: `Technical notes on backend engineering, data, AI, and software projects by ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/blog` },
};

export default function BlogPage() {
  return (
    <PageShell>
      <BackLink />

      <PageHeader
        label="Notes"
        title="Engineering notes"
        description="Technical notes from projects, experiments, and things I had to understand properly before I could build them."
        constrained
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <ProjectTiltCard
            key={post.slug}
            eyebrow={`${post.published} · ${post.readingTime}`}
            title={post.title}
            description={post.description}
            href={`/blog/${post.slug}`}
            stack={post.tags}
            footer="Read note →"
          />
        ))}
      </div>
    </PageShell>
  );
}
