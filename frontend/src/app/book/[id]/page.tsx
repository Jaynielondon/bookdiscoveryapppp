import { notFound } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { getBook } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  try {
    const book = await getBook(params.id);
    const narrativeTags = [
      ...(book.tags.vibe ?? []),
      ...(book.tags.emotional_feel ?? []),
      ...(book.tags.narrative_structure ?? [])
    ];

    return (
      <AppShell>
        <article className="rounded-2xl border border-ink/20 bg-panel/60 p-8 md:p-10">
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-ink/60">{book.genre.replace('-', ' ')}</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-5xl">{book.title}</h1>
          <p className="mt-3 text-lg text-ink/72">by {book.author}</p>

          <p className="mt-8 max-w-4xl text-base leading-relaxed text-ink/85">{book.synopsis}</p>

          <div className="mt-8">
            <h2 className="text-sm uppercase tracking-[0.14em] text-ink/60">Narrative Profile</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {narrativeTags.map((tag, idx) => (
                <span key={`${tag}-${idx}`} className="rounded-full border border-ink/25 bg-backdrop/40 px-3 py-1 text-xs text-ink/80">
                  {tag.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>

          <dl className="mt-8 grid gap-4 text-sm md:grid-cols-3">
            <div className="rounded-xl border border-ink/20 p-4">
              <dt className="text-ink/70">Publication Year</dt>
              <dd className="text-lg">{book.publication_year}</dd>
            </div>
            <div className="rounded-xl border border-ink/20 p-4">
              <dt className="text-ink/70">Popularity</dt>
              <dd className="text-lg">{book.popularity}</dd>
            </div>
            <div className="rounded-xl border border-ink/20 p-4">
              <dt className="text-ink/70">Publishing Track</dt>
              <dd className="text-lg">{book.indie ? 'Independent' : 'Traditional'}</dd>
            </div>
          </dl>
        </article>
      </AppShell>
    );
  } catch {
    notFound();
  }
}
