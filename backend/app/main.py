import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router

frontend_origin = os.getenv('FRONTEND_ORIGIN', 'http://localhost:3000')

app = FastAPI(title='Vertex Book Discovery API')
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin, 'http://127.0.0.1:3000'],
    allow_origin_regex=r'https://.*\.(app\.github\.dev|githubpreview\.dev)$',
    allow_methods=['*'],
    allow_headers=['*'],
)
app.include_router(router)
