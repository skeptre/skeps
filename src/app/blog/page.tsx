import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/config/site";
import { BLOG_POSTS } from "@/data/posts";
import BackLink from "@/components/ui/BackLink";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";

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
        label="notes"
        title="Blog"
        description="Technical notes from projects, experiments, and things I had to understand properly before I could build them."
        constrained
      />

      <div className="page-block space-y-4">
        {BLOG_POSTS.map((post, index) => (
          <article
            key={post.slug}
            className={`fade-in-up stagger-${Math.min(index + 2, 4)} rounded-sm border border-border bg-card p-6`}
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
              <time dateTime={post.published}>{post.published}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              <Link
                href={`/blog/${post.slug}`}
                className="transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                {post.title}
              </Link>
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {post.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-border px-2 py-1 font-mono text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="mt-6 inline-block font-mono text-xs text-primary transition-opacity hover:opacity-80"
            >
              read note →
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
