import Link from 'next/link';
import { AppShell } from '@/components/AppShell';

export default function NotFound() {
  return (
    <AppShell>
      <div className="rounded-2xl border border-ink/20 bg-panel/60 p-8">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm text-ink/75">The page or book you requested is unavailable in this prototype dataset.</p>
        <Link href="/" className="mt-4 inline-block rounded-full border border-ink/40 px-4 py-2 text-sm">Return Home</Link>
      </div>
    </AppShell>
  );
}
