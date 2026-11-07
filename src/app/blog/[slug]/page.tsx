import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SITE } from "@/config/site";
import { BLOG_POSTS, getBlogPost } from "@/data/posts";
import BackLink from "@/components/ui/BackLink";
import PageShell from "@/components/ui/PageShell";

import "katex/dist/katex.min.css";

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

  const { default: Post } = await import(`@/content/notes/${slug}.mdx`);

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
        <BackLink href="/blog" label="Notes" />

        <article className="mx-auto max-w-3xl">
          <header className="pt-10">
            <p className="font-mono text-[15px] text-primary">Note</p>
            <h1 className="mt-3 text-[clamp(2.25rem,4.4vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground">
              {post.title}
            </h1>
            <p className="mt-5 text-[19px] font-light leading-[1.5] text-muted-foreground">
              {post.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-muted-foreground">
              <time dateTime={post.published}>{post.published}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          <div className="mt-12">
            <Post />
          </div>
        </article>
      </PageShell>
    </>
  );
}
