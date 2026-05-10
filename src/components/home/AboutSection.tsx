const EMAIL = "aliskepss@gmail.com";

const linkMailtoClassName =
  "font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-[5px] transition hover:decoration-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-300 dark:focus-visible:ring-offset-zinc-950";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20"
    >
      <div className="mx-auto max-w-xl">
        <header className="text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-[1.75rem] sm:leading-snug dark:text-zinc-50">
            Hi, I&apos;m Ali
          </h1>
          <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-500 sm:text-[0.9375rem] dark:text-zinc-400">
            Graduate Software Engineer
            <span className="text-zinc-300 dark:text-zinc-600"> · </span>
            Manchester, United Kingdom
          </p>
        </header>

        <div className="mt-10 space-y-5 text-pretty text-left text-[0.9375rem] leading-[1.7] text-zinc-600 sm:text-base sm:leading-[1.75] dark:text-zinc-400">
          <p>
            I build backend systems, API integrations, and structured software
            with a focus on reliability, clarity, and real-world usefulness.
            My work centres on Python, REST APIs, automation, and data handling,
            with a growing interest in secure system design, infrastructure,
            and backend fundamentals.
          </p>
          <p>
            I enjoy debugging complex behaviour, thinking through edge cases,
            and understanding how systems behave under real-world constraints.
          </p>
        </div>

        <footer className="mt-12 border-t-2 border-zinc-300 pt-10 text-center dark:border-zinc-700">
          <p className="mx-auto max-w-md text-pretty text-[0.9375rem] leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            If you&apos;re hiring for graduate or junior backend roles, feel free
            to reach out at{" "}
            <a href={`mailto:${EMAIL}`} className={linkMailtoClassName}>
              {EMAIL}
            </a>
            .
          </p>
        </footer>
      </div>
    </section>
  );
}
