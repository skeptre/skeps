import Link from "next/link";

type ProjectItem = {
    name: string;
    stack: string;
    blurb: string;
    href: string;
};

const projects: ProjectItem[] = [
    {
        name: "Enterprise Service Management System",
        stack: "Power Apps • Power Automate • Dataverse",
        blurb:
            "A mini internal operations platform for handling requests, routing tickets, and improving visibility across teams.",
        href: "/projects/enterprise-service-management-system",
    },
    {
        name: "AI Customer Triage Engine",
        stack: "Python • APIs • Automation",
        blurb:
            "An automation-focused support triage system that turns unstructured customer messages into structured actions.",
        href: "/projects/ai-customer-triage-engine",
    },
    {
        name: "Java / Backend Builds",
        stack: "Java • REST APIs • Software Design",
        blurb:
            "Backend-focused learning projects aimed at stronger engineering depth, cleaner systems, and interview readiness.",
        href: "/projects/java-backend-builds",
    },
];

export default function ProjectsSection() {
    return (
        <section id="projects" className="border-t border-zinc-200 py-16">
            <div className="max-w-2xl">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
                    Featured work
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Selected projects and systems
                </h2>
                <p className="mt-4 text-base leading-7 text-zinc-600">
                    A focused set of builds across enterprise automation, backend
                    development, and technical experiments.
                </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {projects.map((project) => (
                    <article
                        key={project.name}
                        className="rounded-3xl border border-zinc-200 p-6"
                    >
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                            {project.stack}
                        </p>
                        <h3 className="mt-3 text-xl font-semibold text-zinc-900">
                            {project.name}
                        </h3>
                        <p className="mt-4 text-sm leading-6 text-zinc-600">
                            {project.blurb}
                        </p>
                        <Link
                            href={project.href}
                            className="mt-6 inline-block text-sm font-medium text-zinc-900 underline underline-offset-4"
                        >
                            Case study
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}