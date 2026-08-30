---
name: recipe-publisher
description: Publish a bilingual ReteteFit recipe from phone-friendly inputs — ingredients with quantities and RON unit prices, instructions, and photos — by calculating nutrition and per-serving cost, generating descriptions, preparing images, writing ro/en markdown, and opening a PR. Use when the user pastes a shopping-style ingredient list, cooking steps, and images and wants a repo-ready recipe PR.
---

# Recipe Publisher

Phone-first publish path. Small **interface**: ingredients + unit prices, instructions, photos. Deep **implementation**: nutrition, cost, description, images, bilingual MD, PR.

## Required input

Accept only these as user-authored:

1. **Ingredients** — each with name, quantity used + unit, and purchase price in RON for a stated unit (e.g. used 500g carrots; 3 RON / 1kg).
2. **Instructions** — ordered steps (Romanian preferred).
3. **Photos** — prefer uploads to `public/` root (phone GitHub upload), or chat attachments / a folder path. Latest timestamp = hero.

Do **not** ask the user for description, macros, cook time, servings, category, tags, or USD price. Calculate or infer those (web search allowed for nutrient data).

## Steps

1. Read [`REFERENCE.md`](REFERENCE.md) — conventions, cost math, frontmatter shape, image pickup.
2. Inspect 1–2 recent recipes in the likely category for tone and rounding.
3. Proofread Romanian text (typos/grammar only). Keep quantities and ingredient names.
4. Infer title, slug, category (`brunch|desserts|main|vegetarian`), tags (allowed set only), servings, cookTime, featured, dates.
5. **Cost:** convert each line to RON for the used amount; sum; divide by servings → RO `price`. Convert EN `price` via today's `cursbnr.ro` rate; note date + rate in the PR.
6. **Nutrition:** web-search per ingredient; scale by used mass; sum; divide by servings → `calories`, `protein`, `carbs`, `fat`, `fiber`, `weight`. Round like neighbors. Cite sources in the PR.
7. **Generate** `description` (RO + EN) from title, nutrition, time, category, tags, ingredients — never copy user prose as description.
8. Write `content/recipes/ro/<category>/<slug>.md` and `content/recipes/en/<category>/<slug>.md`.
9. **Images:** pull the branch if needed; stage recipe images from `public/` root (skip reserved assets) into a temp folder — or use pasted/local images; run `corepack pnpm recipe:prepare-images --input "<dir>" --slug "<slug>"`; delete processed raws from `public/` root.
10. Verify checklist in REFERENCE, then open a PR (branch + commit + `gh pr create`). Do not push straight to `main`.

## Completion

Done when both locale files exist, `public/<slug>/` has `hero.png` (+ gallery), the PR body lists assumptions, FX rate/date, and nutrition sources, and `pnpm lint` / `pnpm test` / `pnpm build` are clean for the change.
