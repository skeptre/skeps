import Link from "next/link";

export default function BackLink() {
  return (
    <Link
      href="/"
      className="fade-in-up stagger-1 inline-block font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
    >
      ← /home
    </Link>
  );
}
