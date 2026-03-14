# Vertex — Book Discovery (Prototype One)

Book Discovery is a narrative-first discovery engine that helps readers find books by vibe, mood, trope, tone, and story experience.

## Dataset size and structure (this pass)
- Total seeded books: **64**
- Genre balance:
  - Fantasy: 16
  - Romance: 16
  - Mystery: 16
  - Science Fiction: 16
- Every book includes:
  - core identity/display fields (`id`, `title`, `author`, `synopsis`)
  - recommendation signals (`genre`, `publication_year`, `popularity`, `indie`)
  - normalized `tags` for:
    - universal families (`age_level`, `book_length`, `popularity_band`, `publication_era`, `vibe`, `emotional_feel`, `narrative_structure`)
    - genre-specific families per selected genre

## Architecture
- `frontend/`: Next.js + TypeScript + Tailwind CSS.
- `backend/`: FastAPI + modular services (`taxonomy_service`, `recommendation_service`).
- Frontend consumes backend via REST:
  - `GET /taxonomy?genre=<slug>`
  - `POST /recommendations`
  - `GET /books/{book_id}`

## Recommendation improvements in this pass
- Expanded weighted scoring with stronger narrative-first weighting:
  - elevated weight for vibe/emotional/narrative structure
  - stable but lower-weight universal metadata features
- Added clearer **coverage bonus** by matched filter families.
- Improved overlap logic by counting family overlaps and overlap values separately.
- Refined discovery-mode boosts:
  - `popular` emphasizes momentum without overwhelming filter intent
  - `indie` applies explicit independent-author uplift
  - `surprise` promotes exploratory picks
- Added lightweight diversity control in ranking output to reduce repetitive recommendations with near-identical narrative signatures.
- Improved strategy handling:
  - `ranked` for direct overlap
  - `relaxed` for close proximity when exact overlap is sparse
  - `fallback` for highly constrained or empty-overlap cases
- Improved explanation output to keep “Why it matched” readable and transparent.

## UI/UX polish in this pass
- Improved filter chip accessibility (`aria-pressed`, focus-ring affordances).
- Enhanced results page scanability with mode/selection/result summary panel.
- Improved message quality for loading, relaxed, fallback, error, and empty states.
- Upgraded book detail visual hierarchy and typography, including a narrative-profile chip section.
- Preserved genre-responsive themes while keeping a cohesive premium look.

## Remaining limitations
- No accounts, reviews, social features, or live catalog integrations (intentionally out of scope).
- No runtime AI chat (intentionally out of scope).
- Local-only seeded dataset; no ingestion pipeline yet.
- PostgreSQL migrations/persistence layer not yet implemented.

## Exact local run instructions

### 1) Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2) Frontend (in a second terminal)
```bash
cd frontend
npm install
npm run dev
```


### 3) Frontend/Backend URL strategy (reliable local + Codespaces)
The frontend uses a same-origin proxy path (`/api/backend`) in the browser and an internal server URL for server-side fetches.

Frontend env options:
```bash
# Where Next.js rewrites /api/backend/* in dev/build
BACKEND_ORIGIN=http://127.0.0.1:8000

# Optional override for server-side fetches (defaults to BACKEND_ORIGIN)
INTERNAL_API_URL=http://127.0.0.1:8000
```

Backend CORS env option:
```bash
# Optional explicit frontend origin (default: http://localhost:3000)
FRONTEND_ORIGIN=http://localhost:3000
```

In Codespaces, keep backend on port 8000 and frontend on 3000; this proxy strategy avoids browser CORS and localhost mismatch issues.

### 4) Open app
- Visit `http://localhost:3000`
