export type Genre = 'fantasy' | 'romance' | 'mystery' | 'science-fiction';
export type RecommendationStrategy = 'ranked' | 'relaxed' | 'fallback';

export interface DiscoveryMode {
  id: 'genre' | 'popular' | 'indie' | 'surprise';
  label: string;
  description: string;
}

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  scope: 'universal' | Genre;
  options: FilterOption[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: Genre;
  publication_year: number;
  popularity: number;
  indie: boolean;
  synopsis: string;
  tags: Record<string, string[]>;
}

export interface RecommendationResult {
  book: Book;
  score: number;
  why_matched: string[];
}

export interface RecommendationResponse {
  strategy: RecommendationStrategy;
  results: RecommendationResult[];
}
