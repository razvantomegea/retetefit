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

Proofread the provided text: fix typos, grammar, and punctuation in Romanian. Do not change the meaning, quantities, or ingredient names. Carry corrections into the English translation.

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
- Convert only the English `price` from RON to USD using the current-day rate from `cursbnr.ro` (which reflects the National Bank of Romania official rate). Record the exact date and rate used in your working notes or commit message.

## 5. Prepare Images

Images are uploaded by the user to the **`public/` root folder** (e.g. via GitHub's "Add file" > "Upload files" from a phone). The workflow picks them up from there automatically.

### Steps

1. Pull the latest changes from the branch so the uploaded images are available locally:
   ```bash
   git pull origin <branch-name>
   ```
2. Identify recipe images in `public/` root. These are all image files (`*.jpg`, `*.jpeg`, `*.png`, `*.webp`, `*.heic`) **excluding** known permanent assets: `hero.png`, `logo.png`.
3. Copy the recipe images to a temp staging folder (e.g. `/tmp/recipe-<slug>/`).
4. Run the helper script on that staging folder:
   ```bash
   corepack pnpm recipe:prepare-images --input "/tmp/recipe-<slug>" --slug "<slug>"
   ```
5. Delete the original uploaded images from `public/` root (the processed versions now live in `public/<slug>/`).
6. Stage both the new `public/<slug>/` images and the deletions from `public/` root.

If the user provides a local folder path or explicitly pastes images inline instead, use that source directly and skip steps 1-3.

### Defaults

- output folder: `public/<slug>`
- hero selection: latest-timestamp image (always the hero — do not ask the user)
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
- English `price` was converted from the Romanian RON value using the `cursbnr.ro` rate for the recorded date, and the rate/date are noted.

## 8. Commit and Push

Unless the user says otherwise:

1. Stage the new recipe markdown files and images.
2. Commit with a concise message such as `Add <slug> recipe`.
3. Push the current branch.

If push fails because the branch has no upstream, run `git push -u origin <branch-name>` (replace `<branch-name>` with the current branch).
