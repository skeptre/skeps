import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SITE } from "@/config/site";
import { BLOG_POSTS, getBlogPost } from "@/data/posts";
import BackLink from "@/components/ui/BackLink";
import PageShell from "@/components/ui/PageShell";
import SectionLabel from "@/components/ui/SectionLabel";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = `${SITE.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      authors: [SITE.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    url,
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
        <BackLink href="/blog" label="blog" />

        <article className="mx-auto max-w-3xl">
          <section className="page-section">
            <SectionLabel>note</SectionLabel>
            <h1 className="page-title">{post.title}</h1>
            <p className="page-lead">{post.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
              <time dateTime={post.published}>{post.published}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
          </section>

          <div className="page-block space-y-10">
            {post.sections.map((section, index) => (
              <section key={section.heading ?? index}>
                {section.heading ? (
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {section.heading}
                  </h2>
                ) : null}

                {section.paragraphs ? (
                  <div className={section.heading ? "mt-4 space-y-4" : "space-y-4"}>
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-7 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}

                {section.bullets ? (
                  <ul className={`${section.heading ? "mt-4" : ""} space-y-3`}>
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="shrink-0 font-mono text-primary">→</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </article>
      </PageShell>
    </>
  );
}
