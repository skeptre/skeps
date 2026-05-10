import type { Metadata } from "next";
import Link from "next/link";

const EMAIL = "aliskepss@gmail.com";
const MAILTO = `mailto:${EMAIL}`;

const linkBackClassName =
  "text-zinc-500 transition hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 rounded-sm";

const linkMailtoClassName =
  "inline-flex rounded-2xl border border-zinc-200 px-5 py-[0.9rem] text-[0.8125rem] font-medium tracking-wide text-zinc-900 shadow-sm shadow-zinc-900/5 transition hover:border-zinc-900 hover:bg-zinc-50 hover:shadow-zinc-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mansoor Ali by email.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
        <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-zinc-400">
          <Link href="/" className={linkBackClassName}>
            ← Home
          </Link>
        </p>

        <section className="mx-auto mt-12 max-w-xl border-t border-zinc-200 pt-16 sm:mt-14 sm:pt-20">
          <header className="text-center">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-zinc-400">
              Contact
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-[1.75rem] sm:leading-snug">
              Get in touch
            </h1>
          </header>

          <p className="mx-auto mt-8 max-w-md text-pretty text-left text-[0.9375rem] leading-[1.7] text-zinc-600 sm:mt-10 sm:text-base sm:leading-[1.75]">
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
