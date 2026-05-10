import Link from "next/link";

type FeaturedItem = {
    title: string;
    description: string;
    href: string;
};

const featuredItems: FeaturedItem[] = [
    {
        title: "Power Platform Systems",
        description:
            "Internal tools, automations, and low-code enterprise workflows built with Microsoft Power Platform.",
        href: "/projects",
    },
    {
        title: "Python & AI Experiments",
        description:
            "Backend projects, automation ideas, and practical AI systems focused on real-world use cases.",
        href: "/projects",
    },
    {
        title: "Java & Engineering",
        description:
            "Structured software engineering work, architecture practice, and projects designed to sharpen fundamentals.",
        href: "/projects",
    },
];

export default function FeaturedGrid() {
    return (
        <section className="grid gap-5 border-t-2 border-zinc-400 py-14 dark:border-zinc-600 md:grid-cols-3">
            {featuredItems.map((item) => (
                <Link
                    key={item.title}
                    href={item.href}
                    className="group rounded-3xl border border-zinc-200 p-6 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-sm dark:border-zinc-600 dark:hover:border-zinc-500"
                >
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{item.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {item.description}
                    </p>
                    <p className="mt-6 text-sm font-medium text-zinc-900">
                        Open{" "}
                        <span className="inline-block transition group-hover:translate-x-1">
              →
            </span>
                    </p>
                </Link>
            ))}
        </section>
    );
}