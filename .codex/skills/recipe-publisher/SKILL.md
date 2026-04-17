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
5. Pull from the remote branch to get any images the user uploaded to `public/` root:
   ```bash
   git pull origin <branch-name>
   ```
6. Gather recipe images from `public/` root into a staging folder, skipping the
   reserved site-wide assets defined below (`reservedAssets`).

   ```bash
   # reservedAssets: hero.png logo.png
   mkdir -p /tmp/recipe-<slug>

   # using fd (if available)
   fd --max-depth 1 --extension jpg --extension jpeg --extension png \
      --extension heic --extension webp . public/ \
      --exclude hero.png --exclude logo.png \
      --exec cp {} /tmp/recipe-<slug>/

   # using POSIX find (fallback)
   find public/ -maxdepth 1 -type f \
      \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \
         -o -iname "*.heic" -o -iname "*.webp" \) \
      ! -name "hero.png" ! -name "logo.png" \
      -exec cp {} /tmp/recipe-<slug>/ \;
   ```

   **`reservedAssets`** — files in `public/` root that are permanent site assets
   and must never be treated as recipe images: `hero.png`, `logo.png`.
   Add entries here when new site-wide assets are introduced.

7. Run the prepare-images script on the staging folder:
   ```bash
   corepack pnpm recipe:prepare-images --input "/tmp/recipe-<slug>" --slug "<slug>"
   ```
   This writes processed images to `public/<slug>/` (hero + numbered gallery).
8. Delete the original raw images from `public/` root (processed versions now
   live in `public/<slug>/`):

   ```bash
   # using fd (if available)
   fd --max-depth 1 --extension jpg --extension jpeg --extension png \
      --extension heic --extension webp . public/ \
      --exclude hero.png --exclude logo.png \
      --exec rm {}

   # using POSIX find (fallback)
   find public/ -maxdepth 1 -type f \
      \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \
         -o -iname "*.heic" -o -iname "*.webp" \) \
      ! -name "hero.png" ! -name "logo.png" \
      -delete
   ```
9. Verify paths, pricing, dates, and image output.
10. Commit both the recipe files and the image changes, then push.

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
