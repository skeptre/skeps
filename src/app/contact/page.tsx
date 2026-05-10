import type { Metadata } from "next";
import Link from "next/link";

const EMAIL = "aliskepss@gmail.com";
const MAILTO = `mailto:${EMAIL}`;

const linkBackClassName =
  "text-zinc-500 transition hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-sm dark:focus-visible:ring-offset-zinc-950";

const linkMailtoClassName =
  "inline-flex rounded-2xl border border-zinc-200 px-5 py-[0.9rem] text-[0.8125rem] font-medium tracking-wide text-zinc-900 shadow-sm shadow-zinc-900/5 transition hover:border-zinc-900 hover:bg-zinc-50 hover:shadow-zinc-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:shadow-none dark:hover:border-zinc-500 dark:hover:bg-zinc-800 dark:focus-visible:ring-offset-zinc-950";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mansoor Ali by email.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
        <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-zinc-400 dark:text-zinc-500">
          <Link href="/" className={linkBackClassName}>
            ← Home
          </Link>
        </p>

        <section className="mx-auto mt-12 max-w-xl border-t-2 border-zinc-400 pt-16 sm:mt-14 sm:pt-20 dark:border-zinc-600">
          <header className="text-center">
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-[1.75rem] sm:leading-snug dark:text-zinc-50">
              Get in touch
            </h1>
          </header>

          <p className="mx-auto mt-8 max-w-md text-pretty text-left text-[0.9375rem] leading-[1.7] text-zinc-600 sm:mt-10 sm:text-base sm:leading-[1.75] dark:text-zinc-400">
            For opportunities, collaborations, or questions, email is the best
            way to reach me. I read everything and respond when I can.
          </p>

          <div className="mt-10 flex justify-center sm:mt-12">
            <a href={MAILTO} className={linkMailtoClassName}>
              {EMAIL}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
