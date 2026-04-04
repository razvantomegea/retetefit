# Recipe Publishing Workflow

Use this workflow when the user provides recipe notes, images, or asks to publish a new recipe end to end.

## 1. Collect Inputs

Expect most or all of the following:

- recipe name
- ingredients
- instructions
- macros
- servings
- cook time
- price in RON
- weight
- tags
- category
- featured flag
- images or an image folder

If one critical value is missing and it cannot be inferred safely, ask only for that missing item. Otherwise proceed and note the assumption.

## 2. Inspect Existing Neighbors

Open 1-2 recipe files in the target category for tone and formatting. Prefer recent files in the same category.

## 3. Decide the Slug and Category

- Build one slug and reuse it in both locales.
- Keep the category to one of the live folders: `brunch`, `desserts`, `main`, `vegetarian`.
- If the user gives multiple possible categories, choose the strongest primary fit and mention the assumption.

## 4. Draft Romanian and English Content

- Start from the Romanian source because that is what the user provides.
- Create both markdown files in the repo pattern.
- Translate the full article into English.
- Convert only the English `price` from RON to USD.

## 5. Prepare Images

Images are typically pasted inline in the chat, not provided as a file path. When images are pasted:

1. Save each attached image to a temp folder (e.g. `C:/Temp/recipe-<slug>/`) naming them sequentially by conversation order.
2. Run the helper script on that folder.

If the user provides a local folder path instead, use it directly.

Example:

```bash
corepack pnpm recipe:prepare-images --input "C:/Temp/recipe-<slug>" --slug "recipe-slug" --hero latest
```

Defaults:

- output folder: `public/<slug>`
- hero selection: latest-timestamp image
- gallery order: chronological order after removing the hero

If the user explicitly identifies a hero image, pass it with `--hero-file`.

## 6. Verify Open Graph Requirements

- Ensure `image` points to `/<slug>/hero.png`.
- Ensure `imageAlt` is descriptive in both languages.
- Keep the hero image reasonably optimized for sharing and site performance.

## 7. Sanity Check Before Commit

- Slug matches both filenames.
- Both recipe files exist.
- Image paths point to files that exist.
- `publishedAt` and `updatedAt` use today or an earlier date.
- English and Romanian nutrition values match.
- English `price` reflects the exchange-rate lookup.

## 8. Commit and Push

Unless the user says otherwise:

1. Stage the new recipe markdown files and images.
2. Commit with a concise message such as `Add <slug> recipe`.
3. Push the current branch.

If push fails because the branch has no upstream, create the upstream with the standard non-interactive git push flow.
