# Repo Recipe Conventions

Read this file before creating recipe content. It reflects the live repo, including places where the docs are slightly outdated.

## Current Locations

- Romanian recipes: `content/recipes/ro/<category>/<slug>.md`
- English recipes: `content/recipes/en/<category>/<slug>.md`
- Recipe images: `public/<slug>/`

## Current Categories

Use one of these category folders:

- `brunch`
- `desserts`
- `main`
- `vegetarian`

## Current Frontmatter Shape

Match the existing recipe files exactly. Current recipes include these fields:

```yaml
---
title: 'Chicken Pilaf'
slug: 'chicken-pilaf'
description: 'A more delicious and nutritious way to eat your chicken and rice.'
category: 'main'
lang: 'en'
cookTime: 60
servings: 12
calories: 362
protein: 26
carbs: 37
fat: 7
fiber: 5
weight: 700
price: 1.9
tags: ['cheap', 'high-protein']
featured: true
publishedAt: '2025-11-20'
updatedAt: '2025-11-20'
image: '/chicken-pilaf/hero.png'
imageAlt: 'Chicken Pilaf'
galleryImages:
    - '/chicken-pilaf/1.png'
    - '/chicken-pilaf/2.png'
imageBrightness: 'light'
author: 'Maingain'
---
```

## Important Notes

- Keep the same `slug` for Romanian and English versions.
- Keep `lang` aligned with the folder: `ro` or `en`.
- Keep nutrition values, `cookTime`, `servings`, and `weight` aligned across both versions unless the user explicitly gives locale-specific differences.
- Keep `price` as a per-serving value.
- Keep the Romanian file in RON and convert the English file to USD.
- Use top-level public paths like `/<slug>/hero.png`, not `/images/recipes/...`.
- Use `hero.png` for the main image and `1.png`, `2.png`, ... for gallery images.
- Keep `author: 'Maingain'`.
- Prefer `imageBrightness: 'light'` unless the hero image is clearly dark.

## Content Structure

After frontmatter, keep this order:

1. Intro paragraphs with the same conversational style as existing recipes
2. `## Ingredients` or `## Ingrediente`
3. `## Instructions` or `## Instrucțiuni`

Optional sections are allowed, but current recipe files usually stop after instructions.

## Translation Expectations

- Write Romanian naturally using `tu`.
- Write English in clear, casual, direct prose.
- Translate for readability, not word-for-word.
- Keep units practical and close to the source. Do not silently invent imperial conversions.

## Price Handling

- Romanian `price` stays in RON.
- English `price` must be converted to USD using the current exchange rate from `cursbnr.ro` or the National Bank of Romania source it reflects.
- When converting, record the exact date used for the rate in the working notes or commit message if helpful.
- Round the English `price` to 2 decimals unless existing similar recipes strongly suggest a cleaner value.

## Image Workflow

- Gather the provided images in a staging folder.
- Sort them by file timestamp.
- Rename gallery images chronologically to `1.png`, `2.png`, ...
- Produce `hero.png` separately.
- Use `sharp` for compression and metadata stripping.
- Put the processed files in `public/<slug>/`.

The helper script in `scripts/prepare-recipe-images.mjs` handles the timestamp sorting, renaming, and PNG output.
