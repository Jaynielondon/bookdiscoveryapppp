import { PropsWithChildren } from 'react';
import Link from 'next/link';

export function AppShell({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen px-6 py-8 md:px-12">
      <header className="mx-auto mb-10 max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-3 text-sm text-ink/80">
          <span className="rounded-full border border-ink/30 px-3 py-1">Vertex</span>
          <span className="tracking-wide">Book Discovery</span>
        </Link>
      </header>
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}
