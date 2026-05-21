import Link from "next/link";

type Props = { href?: string; label?: string };

export default function BackLink({ href = "/", label = "home" }: Props) {
  return (
    <Link
      href={href}
      className="fade-in-up stagger-1 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
    >
      ← / {label}
    </Link>
  );
}
