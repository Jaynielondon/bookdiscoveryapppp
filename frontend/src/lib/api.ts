import { API_BASE_URL } from '@/lib/constants';
import { Book, FilterGroup, Genre, RecommendationResponse } from '@/types';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text();
    throw new ApiError(res.status, message || `API error: ${res.status}`);
  }
  return res.json();
}

export async function getTaxonomy(genre?: Genre): Promise<FilterGroup[]> {
  const q = genre ? `?genre=${genre}` : '';
  return handle(await fetch(`${API_BASE_URL}/taxonomy${q}`, { cache: 'no-store' }));
}

export async function getBook(id: string): Promise<Book> {
  return handle(await fetch(`${API_BASE_URL}/books/${id}`, { cache: 'no-store' }));
}

export async function recommend(payload: {
  genre?: Genre;
  discovery_mode: string;
  filters: Record<string, string[]>;
}): Promise<RecommendationResponse> {
  return handle(
    await fetch(`${API_BASE_URL}/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store'
    })
  );
}
