from __future__ import annotations

from collections import defaultdict

from app.data.books import BOOKS

WEIGHTS = {
    'age_level': 7,
    'book_length': 6,
    'popularity_band': 4,
    'publication_era': 4,
    'vibe': 12,
    'emotional_feel': 12,
    'narrative_structure': 9,
}
DEFAULT_GENRE_WEIGHT = 11


def _weight_for_family(family: str) -> int:
    return WEIGHTS.get(family, DEFAULT_GENRE_WEIGHT)


def _mode_boost(book: dict, discovery_mode: str) -> tuple[float, str | None]:
    if discovery_mode == 'popular':
        return min(book['popularity'] / 5.5, 18), 'Prioritized for current popularity momentum.'
    if discovery_mode == 'indie':
        return (15, 'Prioritized to support independent authors.') if book['indie'] else (0, None)
    if discovery_mode == 'surprise':
        novelty = 10 if book['popularity'] < 80 else 5
        return novelty, 'Balanced for exploratory discovery.'
    return 0, None


def _score_book(book: dict, filters: dict[str, list[str]], discovery_mode: str) -> dict:
    score = 0.0
    reasons: list[str] = []
    requested_families = 0
    matched_families = 0
    overlap_values = 0

    for family, selected in filters.items():
        normalized_selected = sorted({value for value in selected if value})
        if not normalized_selected:
            continue

        requested_families += 1
        book_values = set(book['tags'].get(family, []))
        overlap = sorted(book_values.intersection(normalized_selected))
        if not overlap:
            continue

        matched_families += 1
        overlap_values += len(overlap)
        family_weight = _weight_for_family(family)
        score += family_weight * len(overlap)
        reasons.append(f"Matched {family.replace('_', ' ')}: {', '.join(overlap)}.")

    if requested_families > 0:
        coverage_ratio = matched_families / requested_families
        score += coverage_ratio * 22
        reasons.append(f"Coverage across selected filters: {matched_families}/{requested_families} families.")
    else:
        coverage_ratio = 0

    mode_boost, mode_reason = _mode_boost(book, discovery_mode)
    score += mode_boost

    # popularity contributes but does not dominate
    score += min(book['popularity'] / 10, 10)

    if mode_reason:
        reasons.append(mode_reason)

    reasons.append(f"Popularity signal: {book['popularity']}/100.")

    return {
        'book': book,
        'score': min(round(score, 2), 100.0),
        'why_matched': reasons,
        'matched_families': matched_families,
        'overlap_values': overlap_values,
        'coverage_ratio': coverage_ratio,
    }


def _diversify(ranked: list[dict], limit: int = 8) -> list[dict]:
    """Greedy diversification to avoid repetitive cards with near-identical tag signatures."""
    selected: list[dict] = []
    seen_authors: set[str] = set()
    signature_counts: defaultdict[tuple, int] = defaultdict(int)

    for item in ranked:
        if len(selected) >= limit:
            break

        book = item['book']
        signature = (
            tuple(book['tags'].get('vibe', [])),
            tuple(book['tags'].get('emotional_feel', [])),
            tuple(book['tags'].get('narrative_structure', [])),
        )

        diversity_penalty = 0
        if book['author'] in seen_authors:
            diversity_penalty += 4
        diversity_penalty += signature_counts[signature] * 3

        adjusted = item['score'] - diversity_penalty
        if adjusted < 14 and selected:
            continue

        item['score'] = round(max(adjusted, 0), 2)
        if diversity_penalty:
            item['why_matched'].append('Diversified to avoid near-duplicate recommendation patterns.')

        selected.append(item)
        seen_authors.add(book['author'])
        signature_counts[signature] += 1

    if not selected:
        return ranked[:limit]

    selected.sort(key=lambda item: (item['score'], item['overlap_values'], item['book']['popularity']), reverse=True)
    return selected


def recommend(genre: str | None, discovery_mode: str, filters: dict[str, list[str]]):
    candidates = [book for book in BOOKS if genre is None or book['genre'] == genre]
    if not candidates:
        return {'strategy': 'fallback', 'results': []}

    ranked = [_score_book(book, filters, discovery_mode) for book in candidates]
    ranked.sort(key=lambda item: (item['score'], item['overlap_values'], item['book']['popularity']), reverse=True)

    has_filter_input = any(values for values in filters.values()) if filters else False
    strong = [item for item in ranked if item['matched_families'] > 0 or not has_filter_input]
    if strong:
        chosen = _diversify(strong, limit=8)
        for item in chosen:
            item.pop('matched_families', None)
            item.pop('overlap_values', None)
            item.pop('coverage_ratio', None)
        return {'strategy': 'ranked', 'results': chosen}

    relaxed = [item for item in ranked if item['score'] >= 14 or item['coverage_ratio'] >= 0.25]
    if relaxed:
        chosen = _diversify(relaxed, limit=8)
        for item in chosen:
            item['why_matched'].insert(0, 'No direct overlap on selected chips; using proximity matching across narrative signals.')
            item.pop('matched_families', None)
            item.pop('overlap_values', None)
            item.pop('coverage_ratio', None)
        return {'strategy': 'relaxed', 'results': chosen}

    fallback = sorted(candidates, key=lambda book: book['popularity'], reverse=True)[:8]
    return {
        'strategy': 'fallback',
        'results': [
            {
                'book': book,
                'score': float(book['popularity']),
                'why_matched': [
                    'No close overlap was found for this exact filter blend.',
                    'Fallback shelf is ranked by popularity within your selected discovery lane.',
                ],
            }
            for book in fallback
        ],
    }
