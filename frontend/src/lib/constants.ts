import { DiscoveryMode, Genre } from '@/types';

export const BROWSER_API_BASE = '/api/backend';
export const SERVER_API_BASE =
  process.env.INTERNAL_API_URL ?? process.env.BACKEND_ORIGIN ?? 'http://127.0.0.1:8000';

export const GENRES: { slug: Genre; name: string; description: string }[] = [
  { slug: 'fantasy', name: 'Fantasy', description: 'Mythic worlds, magic systems, and epic emotional stakes.' },
  { slug: 'romance', name: 'Romance', description: 'Character-forward love stories with emotional momentum.' },
  { slug: 'mystery', name: 'Mystery', description: 'Puzzles, tension, and layered reveals that reward attention.' },
  { slug: 'science-fiction', name: 'Science Fiction', description: 'Speculative futures, technology, and philosophical conflict.' }
];

export const DISCOVERY_MODES: DiscoveryMode[] = [
  { id: 'genre', label: 'Browse by Genre', description: 'Start with a literary lane, then refine by story experience.' },
  { id: 'popular', label: 'Most Popular Right Now', description: 'See high-momentum titles across today’s top reading trends.' },
  { id: 'indie', label: 'Support Small / Indie Authors', description: 'Prioritize independent voices and emerging storytellers.' },
  { id: 'surprise', label: 'Surprise Me', description: 'Hand off the curation and jump into a guided narrative wildcard.' }
];
