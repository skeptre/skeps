import Link from "next/link";

type Props = { href?: string; label?: string };

export default function BackLink({ href = "/", label = "home" }: Props) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-10 items-center rounded-full font-mono text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      ← {label}
    </Link>
  );
}
