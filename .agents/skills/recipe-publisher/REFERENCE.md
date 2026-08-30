# Recipe Publisher Reference

Live repo conventions. Prefer this over stale docs.

## Locations

| Locale | Path |
|--------|------|
| RO | `content/recipes/ro/<category>/<slug>.md` |
| EN | `content/recipes/en/<category>/<slug>.md` |
| Images | `public/<slug>/` → `hero.png`, `1.png`, `2.png`, … |

Categories: `brunch`, `desserts`, `main`, `vegetarian`.

## Frontmatter shape

```yaml
---
title: 'Chicken Pilaf'
slug: 'chicken-pilaf'
description: '<generated — never user-authored>'
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

Rules:

- Same `slug` both locales; `lang` matches folder.
- Nutrition, `cookTime`, `servings`, `weight` match across locales.
- `price` is **per serving**. RO stays RON; EN is USD from `cursbnr.ro`.
- Paths are `/<slug>/hero.png`, not `/images/recipes/...`.
- `author: 'Maingain'`. Prefer `imageBrightness: 'light'` unless hero is dark.
- `description` is **generated** from title, nutrition, cook time, category, tags, and ingredients (both locales).
- Tags must be from the existing set only: `cheap`, `simple`, `fast`, `high-protein`, `high-fiber`, `low-carb`, `low-fat`, `vegan`. Do not invent new tags.

## Body structure

1. Intro paragraphs (conversational, match neighbors).
2. `## Ingredients` / `## Ingrediente`
3. `## Instructions` / `## Instrucțiuni`

## Translation

- Romanian: natural `tu`.
- English: clear, casual, direct — not word-for-word.
- Keep practical metric units; do not invent imperial.

## Cost math

User gives purchase price for a stated unit; you scale to the amount used.

```text
usedInPriceUnit = convert(usedQty, usedUnit → priceUnit)
lineCostRon = usedInPriceUnit * (unitPriceRon / priceAmount)
recipeCostRon = sum(lineCostRon)
pricePerServingRon = recipeCostRon / servings
```

Normalize: g↔kg, ml↔l, buc as count. Example: 500g carrots, 3 RON / 1kg → `0.5 * 3 = 1.5` RON line cost.

Round EN USD price to 2 decimals unless neighbors use cleaner values. Record FX date + rate in the PR.

## Nutrition math

For each ingredient, look up per-100g (or per-piece) macros via web search. Scale to used amount, sum, divide by servings. Prefer USDA / reputable food DBs. State sources in the PR.

Infer `cookTime` from instructions; `servings` from yield or typical portion of total cooked weight; `weight` = cooked portion grams per serving when estimable.

## Description generation

Write one short SEO blurb per locale (≈1–2 sentences) that folds in title signal, key macros or time, category/tags, and standout ingredients. Do not ask the user to supply it. Do not paste the intro paragraph verbatim unless it already fits.

## Images

Primary phone path: user uploads raw images to **`public/` root** (e.g. GitHub “Add file” from phone).

**`reservedAssets`** — never treat as recipe images: `hero.png`, `logo.png`. Extend this list when new site-wide assets appear.

### Pickup steps

1. `git pull` the working branch so uploads are local.
2. Copy image files from `public/` root (`*.jpg|jpeg|png|webp|heic`) excluding reserved assets into a staging dir (e.g. `/tmp/recipe-<slug>/`).
3. Run prepare-images; output goes to `public/<slug>/`.
4. Delete the raw uploads from `public/` root (keep reserved assets).
5. Stage `public/<slug>/` plus the root deletions.

Chat attachments or an explicit folder path still work — skip pull/copy when the user already gave a staging dir.

```bash
corepack pnpm recipe:prepare-images --input "<raw-dir>" --slug "<slug>"
```

Defaults: latest file = `hero.png`; remaining chronological gallery; sharp PNG with hero `fit: inside`; output `public/<slug>/`. Override hero with `--hero-file <name>` only if the user names one.

## Verification checklist

- [ ] RO + EN files exist; slug matches filenames
- [ ] `image` → `/<slug>/hero.png` and files on disk
- [ ] Every `galleryImages` path exists
- [ ] Nutrition equal across locales
- [ ] RO price RON; EN price USD with noted rate/date
- [ ] `description` generated (not blank, not user paste)
- [ ] `author: Maingain`
- [ ] PR opened (not direct push to `main`)

## Commit / PR

Branch name like `recipe/<slug>`. Commit message: `Add <slug> recipe`. PR body: assumptions, FX, nutrition sources, any inferred servings/cookTime.
