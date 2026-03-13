import Link from 'next/link';
import type { Route } from 'next';
import type { Genre } from '@/types';

interface GenreCardProps {
  slug: Genre;
  name: string;
  description: string;
}

export function GenreCard({ slug, name, description }: GenreCardProps) {
  const href = `/genre/${slug}` as Route;

  return (
    <Link href={href} className={`genre-${slug} rounded-2xl border border-ink/20 p-7 shadow-soft`}>
      <h3 className="text-2xl font-semibold">{name}</h3>
      <p className="mt-3 max-w-sm text-sm text-ink/80">{description}</p>
    </Link>
  );
}
