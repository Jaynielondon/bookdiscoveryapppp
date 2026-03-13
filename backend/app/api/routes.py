from fastapi import APIRouter, HTTPException, Query

from app.data.books import BOOKS
from app.data.taxonomy import VALID_GENRES
from app.models.schemas import Book, FilterGroup, RecommendationRequest, RecommendationResponse
from app.services.recommendation_service import recommend
from app.services.taxonomy_service import build_taxonomy

router = APIRouter()


@router.get('/health')
def health():
    return {'status': 'ok'}


@router.get('/taxonomy', response_model=list[FilterGroup])
def taxonomy(genre: str | None = Query(default=None)):
    if genre is not None and genre not in VALID_GENRES:
        raise HTTPException(status_code=400, detail='Invalid genre')
    return build_taxonomy(genre)


@router.get('/books/{book_id}', response_model=Book)
def get_book(book_id: str):
    for book in BOOKS:
        if book['id'] == book_id:
            return book
    raise HTTPException(status_code=404, detail='Book not found')


@router.post('/recommendations', response_model=RecommendationResponse)
def recommendations(payload: RecommendationRequest):
    return recommend(payload.genre, payload.discovery_mode, payload.filters)
