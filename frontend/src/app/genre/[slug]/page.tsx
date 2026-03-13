'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { FilterPanel } from '@/components/FilterPanel';
import { getTaxonomy } from '@/lib/api';
import { GENRES } from '@/lib/constants';
import { FilterGroup, Genre } from '@/types';

export default function GenreFilterPage() {
  const params = useParams<{ slug: Genre }>();
  const router = useRouter();
  const genre = params.slug;
  const metadata = GENRES.find((item) => item.slug === genre);

  const [groups, setGroups] = useState<FilterGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!metadata) {
      setError('This genre is not available in prototype one.');
      setLoading(false);
      return;
    }

    getTaxonomy(genre)
      .then(setGroups)
      .catch(() => setError('Unable to load filters right now.'))
      .finally(() => setLoading(false));
  }, [genre, metadata]);

  const toggle = (groupId: string, optionId: string) => {
    setSelected((prev) => {
      const current = prev[groupId] ?? [];
      const next = current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId];
      return { ...prev, [groupId]: next };
    });
  };

  const filterCount = useMemo(() => Object.values(selected).flat().length, [selected]);

  if (loading) {
    return (
      <AppShell>
        <div className="rounded-2xl border border-ink/20 p-8">Loading genre filters…</div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <div className="rounded-2xl border border-red-300/30 p-8 text-red-100">
          <p>{error}</p>
          <Link href="/genre-selection" className="mt-4 inline-block rounded-full border border-red-200/40 px-4 py-2 text-sm">
            Back to Genre Selection
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className={`genre-${genre} mb-8 rounded-2xl border border-ink/20 p-8`}>
        <h1 className="text-3xl font-semibold">{metadata?.name} Discovery</h1>
        <p className="mt-3 max-w-2xl text-ink/80">{metadata?.description} Refine by story architecture, emotional feel, and narrative traits.</p>
      </div>
      <FilterPanel groups={groups} selected={selected} onToggle={toggle} />
      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-ink/70">{filterCount} filter selections</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSelected({})}
            className="rounded-full border border-ink/30 px-5 py-3 text-sm"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => router.push(`/results?mode=genre&genre=${genre}&filters=${encodeURIComponent(JSON.stringify(selected))}`)}
            className="rounded-full border border-accent bg-accent/20 px-5 py-3 font-semibold"
          >
            See Recommendations
          </button>
        </div>
      </div>
    </AppShell>
  );
}
