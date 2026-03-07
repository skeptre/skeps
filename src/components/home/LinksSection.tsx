import Link from "next/link";

type ExternalLinkItem = {
    label: string;
    href: string;
};

const externalLinks: ExternalLinkItem[] = [
    { label: "GitHub", href: "https://github.com/skeptre" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "CV", href: "/cv" },
    { label: "Contact", href: "/contact" },
];

export default function LinksSection() {
    return (
        <section id="links" className="border-t border-zinc-200 py-16">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
                        Links
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                        Elsewhere
                    </h2>
                </div>

                <p className="max-w-xl text-sm leading-6 text-zinc-600">
                    Replace placeholders with your live destinations for GitHub, LinkedIn,
                    Instagram, CV, and contact.
                </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {externalLinks.map((link) => {
                    const isExternal = link.href.startsWith("http");

                    if (isExternal) {
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-2xl border border-zinc-200 px-5 py-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-900"
                            >
                                {link.label}
                            </a>
                        );
                    }

                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="rounded-2xl border border-zinc-200 px-5 py-4 text-sm font-medium text-zinc-900 transition hover:border-zinc-900"
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}