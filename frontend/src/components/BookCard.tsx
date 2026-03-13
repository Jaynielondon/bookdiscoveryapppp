import Link from 'next/link';
import { RecommendationResult } from '@/types';

export function BookCard({ result }: { result: RecommendationResult }) {
  return (
    <Link
      href={`/book/${result.book.id}`}
      className="rounded-2xl border border-ink/20 bg-panel/70 p-6 transition hover:border-accent/60 hover:bg-panel"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-ink/55">{result.book.genre.replace('-', ' ')}</p>
          <h3 className="text-xl font-semibold leading-tight">{result.book.title}</h3>
          <p className="text-sm text-ink/70">{result.book.author}</p>
        </div>
        <span className="rounded-full border border-accent/70 px-3 py-1 text-xs">Match {Math.round(result.score)}%</span>
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-ink/85">{result.book.synopsis}</p>
      <ul className="mt-4 space-y-1 text-xs text-ink/72">
        {result.why_matched.slice(0, 3).map((reason) => (
          <li key={reason}>• {reason}</li>
        ))}
      </ul>
    </Link>
  );
}
