import Link from 'next/link';
import { Genre } from '@/types';

export function GenreCard({ slug, name, description }: { slug: Genre; name: string; description: string }) {
  return (
    <Link href={`/genre/${slug}`} className={`genre-${slug} rounded-2xl border border-ink/20 p-7 shadow-soft`}>
      <h3 className="text-2xl font-semibold">{name}</h3>
      <p className="mt-3 max-w-sm text-sm text-ink/80">{description}</p>
    </Link>
  );
}
