from __future__ import annotations

from typing import TypedDict


class TaxonomyGroup(TypedDict):
    id: str
    label: str
    options: list[tuple[str, str]]


UNIVERSAL_GROUPS: list[TaxonomyGroup] = [
    {
        'id': 'age_level',
        'label': 'Age Level',
        'options': [('adult', 'Adult'), ('ya', 'Young Adult')],
    },
    {
        'id': 'book_length',
        'label': 'Book Length',
        'options': [('short', 'Short'), ('medium', 'Medium'), ('long', 'Long')],
    },
    {
        'id': 'popularity_band',
        'label': 'Popularity',
        'options': [('breakout', 'Breakout'), ('steady', 'Steady'), ('cult', 'Cult Favorite')],
    },
    {
        'id': 'publication_era',
        'label': 'Publication Era',
        'options': [('classic', 'Classic'), ('modern', 'Modern'), ('contemporary', 'Contemporary')],
    },
    {
        'id': 'vibe',
        'label': 'Story Vibe',
        'options': [('immersive', 'Immersive'), ('character-driven', 'Character Driven'), ('plot-twist', 'Plot Twist')],
    },
    {
        'id': 'emotional_feel',
        'label': 'Emotional Feel',
        'options': [('uplifting', 'Uplifting'), ('bittersweet', 'Bittersweet'), ('haunting', 'Haunting')],
    },
    {
        'id': 'narrative_structure',
        'label': 'Narrative Structure',
        'options': [('linear', 'Linear'), ('dual-timeline', 'Dual Timeline'), ('framed', 'Framed')],
    },
]

GENRE_GROUPS: dict[str, list[TaxonomyGroup]] = {
    'fantasy': [
        {'id': 'fantasy_type', 'label': 'Fantasy Type', 'options': [('epic', 'Epic'), ('urban', 'Urban'), ('cozy', 'Cozy')]},
        {'id': 'mood_tone', 'label': 'Mood / Tone', 'options': [('lyrical', 'Lyrical'), ('grim', 'Grim'), ('hopeful', 'Hopeful')]},
        {'id': 'romance_level', 'label': 'Romance Level', 'options': [('none', 'None'), ('subplot', 'Subplot'), ('central', 'Central')]},
        {'id': 'magic_system', 'label': 'Magic System', 'options': [('hard', 'Hard Rules'), ('soft', 'Mythic / Soft')]},
        {'id': 'world_type', 'label': 'World Type', 'options': [('secondary', 'Secondary World'), ('portal', 'Portal'), ('mythic', 'Mythic')]},
        {'id': 'conflict_type', 'label': 'Conflict Type', 'options': [('war', 'War'), ('destiny', 'Destiny'), ('survival', 'Survival'), ('political', 'Political')]},
        {'id': 'character_type', 'label': 'Character Type', 'options': [('found-family', 'Found Family'), ('antihero', 'Antihero'), ('mentor-led', 'Mentor-led')]},
        {'id': 'protagonist_type', 'label': 'Protagonist Type', 'options': [('chosen-one', 'Chosen One'), ('reluctant', 'Reluctant Hero'), ('scholar', 'Scholar')]},
    ],
    'romance': [
        {'id': 'trope', 'label': 'Trope', 'options': [('enemies-to-lovers', 'Enemies to Lovers'), ('second-chance', 'Second Chance'), ('fake-dating', 'Fake Dating')]},
        {'id': 'spice_level', 'label': 'Spice Level', 'options': [('closed-door', 'Closed Door'), ('moderate', 'Moderate'), ('high', 'High')]},
        {'id': 'emotional_tone', 'label': 'Emotional Tone', 'options': [('tender', 'Tender'), ('angsty', 'Angsty'), ('playful', 'Playful')]},
        {'id': 'setting', 'label': 'Setting', 'options': [('small-town', 'Small Town'), ('city', 'City'), ('space-station', 'Space Station')]},
        {'id': 'pov', 'label': 'POV', 'options': [('single', 'Single POV'), ('dual', 'Dual POV')]},
        {'id': 'protagonist_type', 'label': 'Protagonist Type', 'options': [('reluctant', 'Reluctant'), ('scholar', 'Scholar'), ('antihero', 'Antihero')]},
        {'id': 'length', 'label': 'Length', 'options': [('short', 'Short'), ('medium', 'Medium'), ('long', 'Long')]},
    ],
    'mystery': [
        {'id': 'subgenre', 'label': 'Subgenre', 'options': [('whodunit', 'Whodunit'), ('noir', 'Noir'), ('cozy', 'Cozy')]},
        {'id': 'tone', 'label': 'Tone', 'options': [('atmospheric', 'Atmospheric'), ('dark', 'Dark'), ('clever', 'Clever')]},
        {'id': 'complexity', 'label': 'Complexity', 'options': [('accessible', 'Accessible'), ('layered', 'Layered'), ('dense', 'Dense')]},
        {'id': 'violence_level', 'label': 'Violence Level', 'options': [('low', 'Low'), ('medium', 'Medium'), ('high', 'High')]},
        {'id': 'setting', 'label': 'Setting', 'options': [('city', 'City'), ('victorian', 'Historic / Victorian')]},
        {'id': 'investigator_type', 'label': 'Investigator Type', 'options': [('detective', 'Detective'), ('amateur', 'Amateur Sleuth'), ('journalist', 'Journalist')]},
        {'id': 'length', 'label': 'Length', 'options': [('short', 'Short'), ('medium', 'Medium'), ('long', 'Long')]},
    ],
    'science-fiction': [
        {'id': 'sci_fi_type', 'label': 'Sci-Fi Type', 'options': [('space-opera', 'Space Opera'), ('cyberpunk', 'Cyberpunk'), ('first-contact', 'First Contact')]},
        {'id': 'setting', 'label': 'Setting', 'options': [('space-station', 'Space Station'), ('deep-space', 'Deep Space'), ('frontier', 'Frontier'), ('metropolis', 'Megacity')]},
        {'id': 'tone_mood', 'label': 'Tone / Mood', 'options': [('awe', 'Awe'), ('tense', 'Tense'), ('philosophical', 'Philosophical')]},
        {'id': 'science_level', 'label': 'Science Level', 'options': [('light', 'Light'), ('moderate', 'Moderate'), ('hard', 'Hard')]},
        {'id': 'conflict_type', 'label': 'Conflict Type', 'options': [('survival', 'Survival'), ('political', 'Political'), ('identity', 'Identity')]},
        {'id': 'length', 'label': 'Length', 'options': [('short', 'Short'), ('medium', 'Medium'), ('long', 'Long')]},
    ],
}

VALID_GENRES = set(GENRE_GROUPS.keys())
