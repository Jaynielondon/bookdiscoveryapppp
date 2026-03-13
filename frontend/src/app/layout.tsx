import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vertex | Book Discovery',
  description:
    'A narrative-first book discovery engine that helps readers find books by vibe, mood, trope, tone, and story experience.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
