import { AppShell } from '@/components/AppShell';
import { GENRES } from '@/lib/constants';
import { GenreCard } from '@/components/GenreCard';

export default function GenreSelectionPage() {
  return (
    <AppShell>
      <h1 className="mb-3 text-3xl font-semibold">Choose a Genre Experience</h1>
      <p className="mb-8 max-w-2xl text-ink/75">Discover through mood, archetype, tone, and narrative shape instead of text search.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {GENRES.map((genre) => (
          <GenreCard key={genre.slug} {...genre} />
        ))}
      </div>
    </AppShell>
  );
}
