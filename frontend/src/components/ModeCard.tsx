import Link from 'next/link';
import type { LinkProps } from 'next/link';

export function ModeCard({
  title,
  description,
  href
}: {
  title: string;
  description: string;
  href: LinkProps['href'];
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-ink/20 bg-panel/70 p-6 shadow-soft transition hover:border-accent/70"
    >
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-ink/70">{description}</p>
    </Link>
  );
}
