export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  published: string;
  readingTime: string;
  tags: string[];
  sections: BlogSection[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "benchmarking-gpt-4o-gemini-financial-sentiment",
    title: "Benchmarking GPT-4o and Gemini 2.5 Flash for Financial Sentiment",
    description:
      "Notes from building a reproducible LLM evaluation pipeline across Financial PhraseBank and FiQA, including classification quality, latency, hallucination checks, and McNemar testing.",
    published: "2026-09-19",
    readingTime: "5 min read",
    tags: ["LLM evaluation", "Python", "NLP", "statistics"],
    sections: [
      {
        paragraphs: [
          "For my final-year software engineering project, I built a benchmarking framework to compare GPT-4o and Gemini 2.5 Flash on financial sentiment analysis. The goal was not to collect a few impressive examples. It was to make model behaviour measurable and reproducible.",
          "The evaluation pipeline standardised prompts, normalised model outputs into positive, negative, or neutral labels, validated responses, recorded latency, and generated comparable metrics across the same samples.",
        ],
      },
      {
        heading: "What I measured",
        bullets: [
          "Accuracy and macro F1 across a 51-sample sentiment benchmark",
          "Per-class F1 and confusion matrices",
          "Per-request latency and average latency",
          "A separate 12-question financial Q&A evaluation",
          "Hallucination counts using the same evaluation criteria",
          "McNemar's test on paired classification outcomes",
        ],
      },
      {
        heading: "Results",
        paragraphs: [
          "On the 51-sample sentiment benchmark, GPT-4o reached 80.39% accuracy and 80.22% macro F1. Gemini 2.5 Flash reached 9.80% accuracy and 17.24% macro F1 under the same evaluation setup.",
          "Gemini was faster in the measured sample, averaging 0.722 seconds per request compared with 0.865 seconds for GPT-4o. On the separate Q&A set, GPT-4o answered 11 of 12 correctly with one hallucination, while Gemini answered 7 of 12 correctly with five hallucinations.",
          "The paired classification results produced McNemar counts of b=1 and c=37, with the calculated p-value rounding to 0.0000 in the project output. The practical conclusion was that the observed classification difference was not explained by a handful of isolated samples.",
        ],
      },
      {
        heading: "What mattered more than the headline scores",
        paragraphs: [
          "The most useful part of the project was the evaluation plumbing. LLM benchmarking quickly becomes unreliable if one model is allowed different prompts, malformed responses are silently accepted, or failed API calls disappear from the dataset.",
          "Treating response validation, label normalisation, retry behaviour, timing, and statistical testing as first-class parts of the pipeline made the comparison much more defensible. It also made it easier to inspect why a model failed rather than only recording that it failed.",
        ],
      },
      {
        heading: "What I would extend next",
        bullets: [
          "Increase the sample size and stratify it more carefully by sentiment class",
          "Add repeated runs to quantify output variance for non-deterministic settings",
          "Track token usage and cost alongside quality and latency",
          "Evaluate additional prompt strategies without changing the underlying test set",
          "Add confidence intervals and richer error analysis around disagreement cases",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
