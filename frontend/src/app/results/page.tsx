'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { BookCard } from '@/components/BookCard';
import { recommend } from '@/lib/api';
import { Genre, RecommendationResponse } from '@/types';

export default function ResultsPage() {
  const search = useSearchParams();
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  const mode = search.get('mode') ?? 'surprise';
  const genre = (search.get('genre') as Genre | null) ?? undefined;

  const filters = useMemo(() => {
    try {
      return JSON.parse(search.get('filters') ?? '{}') as Record<string, string[]>;
    } catch {
      return {};
    }
  }, [search]);

  const selectedCount = useMemo(() => Object.values(filters).flat().length, [filters]);

  useEffect(() => {
    setState('loading');
    recommend({ genre, discovery_mode: mode, filters })
      .then((response) => {
        setData(response);
        setState('ready');
      })
      .catch(() => setState('error'));
  }, [genre, mode, filters]);

  const results = data?.results ?? [];

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-semibold">Your Story Matches</h1>
          <p className="text-ink/70">Weighted recommendations ranked by narrative signals, with transparent matching rationale.</p>
        </div>
        <div className="rounded-xl border border-ink/20 bg-panel/60 px-4 py-3 text-xs text-ink/70">
          <p>Mode: <span className="capitalize text-ink">{mode.replace('-', ' ')}</span></p>
          <p>Selected chips: <span className="text-ink">{selectedCount}</span></p>
          <p>Results: <span className="text-ink">{results.length}</span></p>
        </div>
      </div>

      {data?.strategy === 'relaxed' && (
        <div className="mb-8 rounded-2xl border border-amber-300/30 bg-amber-100/10 p-4 text-sm text-amber-100">
          Your filters are highly specific. We broadened matching to preserve narrative intent while avoiding empty shelves.
        </div>
      )}

      {data?.strategy === 'fallback' && (
        <div className="mb-8 rounded-2xl border border-ink/20 bg-panel/60 p-4 text-sm text-ink/75">
          We could not find a close overlap for this exact blend. Showing a fallback shelf ranked for this discovery lane.
        </div>
      )}

      {state === 'loading' && <div className="rounded-2xl border border-ink/20 p-8">Building your recommendations…</div>}

      {state === 'error' && (
        <div className="rounded-2xl border border-red-300/30 p-8 text-red-100">
          <h2 className="text-xl font-semibold">Recommendation engine unavailable</h2>
          <p className="mt-2 text-sm">Please retry in a moment, or return to genre browsing.</p>
          <Link href="/genre-selection" className="mt-4 inline-block rounded-full border border-red-200/40 px-4 py-2 text-sm">
            Back to Genre Selection
          </Link>
        </div>
      )}

      {state === 'ready' && results.length === 0 && (
        <div className="rounded-2xl border border-ink/20 bg-panel/60 p-8">
          <h2 className="text-xl font-semibold">No recommendations available</h2>
          <p className="mt-2 text-sm text-ink/75">Try changing genre or resetting your filter selections.</p>
          <Link href="/" className="mt-4 inline-block rounded-full border border-ink/40 px-4 py-2 text-sm">
            Return Home
          </Link>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {results.map((result) => (
          <BookCard key={result.book.id} result={result} />
        ))}
      </div>
    </AppShell>
  );
}
