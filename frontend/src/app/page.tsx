import { AppShell } from '@/components/AppShell';
import { ModeCard } from '@/components/ModeCard';
import { DISCOVERY_MODES, GENRES } from '@/lib/constants';
import { GenreCard } from '@/components/GenreCard';

export default function HomePage() {
  return (
    <AppShell>
      <section className="mb-12 space-y-4">
        <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Vertex</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">Book Discovery</h1>
        <p className="max-w-3xl text-lg text-ink/75">
          A narrative-first book discovery engine that helps readers find books by vibe, mood, trope, tone, and story
          experience.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl">Discovery Paths</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {DISCOVERY_MODES.map((mode) => (
            <ModeCard
              key={mode.id}
              title={mode.label}
              description={mode.description}
              href={mode.id === 'genre' ? '/genre-selection' : { pathname: '/results', query: { mode: mode.id } }}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl">Genre Worlds</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {GENRES.map((genre) => (
            <GenreCard key={genre.slug} {...genre} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
