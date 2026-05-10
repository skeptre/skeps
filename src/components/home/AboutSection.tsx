const EMAIL = "aliskepss@gmail.com";

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mt-10 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-zinc-500 first:mt-0">
      {children}
    </p>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-zinc-200 py-16 text-center"
    >
      <div className="mx-auto max-w-2xl space-y-5 text-base leading-7 text-zinc-600">
        <div>
          <p className="text-lg font-semibold tracking-tight text-zinc-950">
            Hi, I&apos;m Ali
          </p>
          <p className="mt-2 text-zinc-600">
            Graduate Software Engineer based in Manchester, United Kingdom.
          </p>
        </div>

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

        <p className="text-sm text-zinc-500">
          Manchester, United Kingdom
        </p>

        <SectionLabel>Contact</SectionLabel>
        <p>
          If you&apos;re hiring for graduate or junior backend roles, feel free
          to reach out at{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 transition hover:decoration-zinc-900"
          >
            {EMAIL}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
