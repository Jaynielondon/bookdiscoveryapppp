from typing import Dict, List, Literal, Optional
from pydantic import BaseModel, Field

Genre = Literal['fantasy', 'romance', 'mystery', 'science-fiction']
DiscoveryMode = Literal['genre', 'popular', 'indie', 'surprise']


class FilterOption(BaseModel):
    id: str
    label: str


class FilterGroup(BaseModel):
    id: str
    label: str
    scope: str
    options: List[FilterOption]


class Book(BaseModel):
    id: str
    title: str
    author: str
    genre: Genre
    publication_year: int
    popularity: int
    indie: bool
    synopsis: str
    tags: Dict[str, List[str]]


class RecommendationRequest(BaseModel):
    genre: Optional[Genre] = None
    discovery_mode: DiscoveryMode
    filters: Dict[str, List[str]] = Field(default_factory=dict)


class RecommendationResult(BaseModel):
    book: Book
    score: float
    why_matched: List[str]


class RecommendationResponse(BaseModel):
    strategy: Literal['ranked', 'relaxed', 'fallback']
    results: List[RecommendationResult]
