---
name: recipe-publisher
description: Create and publish bilingual Romanian and English recipe content for this repo, including structuring freeform recipe notes into the current markdown frontmatter format, translating Romanian source text into English, converting Romanian prices from RON to USD for the English file using the current rate from cursbnr.ro, preparing recipe images into `public/<slug>/hero.png` plus numbered gallery images, and finishing with git commit/push. Use when the user provides recipe text, macros, pricing, categories, tags, or images and wants a repo-ready recipe article created end to end.
---

# Recipe Publisher

Use this skill when a user wants a new recipe added to this repository from Romanian source material.

## Quick Start

1. Read [`references/repo-conventions.md`](references/repo-conventions.md).
2. Read [`references/workflow.md`](references/workflow.md).
3. Inspect 1-2 existing recipe files in the same category before drafting new content.
4. Create the Romanian and English recipe markdown files.
5. Pull the branch and collect raw images from the `public/` root folder (see Image Preparation below).
6. Run `corepack pnpm recipe:prepare-images --input "/tmp/recipe-<slug>" --slug "<slug>"`.
7. Delete the raw images from `public/` root after processing.
8. Verify paths, pricing, dates, and image output.
9. Commit and push unless the user asks you not to.

## Working Rules

- Keep one shared slug for both locales.
- Follow the live repo conventions, not only the docs, if they differ.
- Proofread the user-provided text before structuring it: fix typos, grammar, and punctuation in Romanian, then carry those corrections into the English translation. Do not change the meaning, quantities, or ingredient names.
- Preserve the user's factual recipe data unless there is a clear inconsistency.
- Translate naturally; do not do a literal line-by-line translation.
- Convert only the English `price` field from RON to USD using the current-day rate from `cursbnr.ro`. Record the exact date and rate used.
- Keep `publishedAt` and `updatedAt` on or before today's date.
- Prefer minimal clarifying questions. If something minor can be inferred safely, proceed and state the assumption after the work.

## Image Preparation

Use the helper script in [`scripts/prepare-recipe-images.mjs`](scripts/prepare-recipe-images.mjs).

Default behavior:

- sorts input images by timestamp
- uses the latest image (last provided) as `hero.png` — this is always the hero, no need to ask
- writes the remaining images as `1.png`, `2.png`, ... in chronological order
- strips metadata and rewrites the output as compressed PNG files with `sharp`

If the user identifies a specific hero image, pass `--hero-file <filename>`.

## Validation Checklist

Before committing, verify all of the following:

- Romanian file exists in `content/recipes/ro/<category>/<slug>.md`
- English file exists in `content/recipes/en/<category>/<slug>.md`
- `slug` matches the filename in both locales
- `image` points to `/<slug>/hero.png`
- every `galleryImages` path exists on disk
- nutrition values match between locales
- Romanian price remains in RON and English price is converted to USD using the `cursbnr.ro` rate, with the date and rate noted
- `author` is `Maingain`
- no frontmatter keys drift from the current repo pattern

## Commit Flow

Use a short commit message such as `Add <slug> recipe` unless the user requests a different format.

Push the branch after committing. If the branch has no upstream yet, run `git push -u origin <branch-name>`.
