from __future__ import annotations

from app.data.taxonomy import GENRE_GROUPS, UNIVERSAL_GROUPS, VALID_GENRES


def _serialize_group(group: dict, scope: str):
    return {
        'id': group['id'],
        'label': group['label'],
        'scope': scope,
        'options': [{'id': option_id, 'label': option_label} for option_id, option_label in group['options']],
    }


def build_taxonomy(genre: str | None = None):
    groups = [_serialize_group(group, 'universal') for group in UNIVERSAL_GROUPS]

    if genre:
        if genre not in VALID_GENRES:
            return []
        groups.extend(_serialize_group(group, genre) for group in GENRE_GROUPS[genre])

    return groups
