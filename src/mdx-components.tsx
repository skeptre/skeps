import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

import BenchmarkChart from "@/components/blog/BenchmarkChart";

const components: MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-12 mb-4 scroll-mt-24 text-2xl font-semibold tracking-[-0.03em] text-foreground [&_a]:text-inherit [&_a]:no-underline"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-8 mb-3 scroll-mt-24 text-xl font-semibold tracking-[-0.02em] text-foreground [&_a]:text-inherit [&_a]:no-underline"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-5 text-[17px] leading-[1.75] text-muted-foreground" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-6 list-none space-y-3 p-0" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mb-6 list-decimal space-y-3 pl-6 text-[17px] leading-[1.75] text-muted-foreground marker:font-mono marker:text-primary"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li
      className="text-[17px] leading-[1.75] text-muted-foreground [ul>&]:relative [ul>&]:pl-7 [ul>&]:before:absolute [ul>&]:before:left-0 [ul>&]:before:font-mono [ul>&]:before:text-primary [ul>&]:before:content-['→']"
      {...props}
    />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="text-primary underline underline-offset-4 hover:text-foreground"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-primary pl-5 text-[17px] italic leading-[1.75] text-soft [&>p]:mb-0"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => {
    // Block code (inside <pre>) carries data-language / data-theme from
    // rehype-pretty-code; only style bare inline code.
    const isBlock = "data-language" in props || "data-theme" in props;
    return isBlock ? (
      <code {...props} />
    ) : (
      <code
        className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
        {...props}
      />
    );
  },
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-6 overflow-x-auto rounded-[14px] border border-border bg-card p-5 font-mono text-sm leading-[1.7] [&_code]:grid [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[1em]"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[15px]" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-border px-3 py-2 font-semibold text-foreground"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-border px-3 py-2 text-muted-foreground" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-10 border-border" {...props} />
  ),
  img: ({ alt = "", ...props }: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} className="my-6 h-auto max-w-full rounded-xl" {...props} />
  ),
  BenchmarkChart,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
