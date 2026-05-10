import type { Metadata } from "next";
import Link from "next/link";

const EMAIL = "aliskepss@gmail.com";
const MAILTO = `mailto:${EMAIL}`;

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mansoor Ali by email.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center sm:px-8 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
          <Link
            href="/"
            className="text-zinc-500 transition hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 rounded-sm"
          >
            ← Home
          </Link>
        </p>

        <section className="mx-auto mt-10 max-w-2xl border-t border-zinc-200 py-16">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
            Contact
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950">
            Get in touch
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-600">
            For opportunities, collaborations, or questions, email is the best
            way to reach me. I read everything and respond when I can.
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href={MAILTO}
              className="inline-flex rounded-2xl border border-zinc-200 px-5 py-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-900 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            >
              {EMAIL}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
