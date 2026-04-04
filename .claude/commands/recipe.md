---
description: Create a bilingual repo-ready recipe, prepare images, then commit and push.
argument-hint: "[Romanian recipe text, macros, and image details]"
---

Use the shared workflow in [`.codex/skills/recipe-publisher/SKILL.md`](../../.codex/skills/recipe-publisher/SKILL.md).

Do this every time:

1. Read [`.codex/skills/recipe-publisher/references/repo-conventions.md`](../../.codex/skills/recipe-publisher/references/repo-conventions.md).
2. Read [`.codex/skills/recipe-publisher/references/workflow.md`](../../.codex/skills/recipe-publisher/references/workflow.md).
3. Inspect 1-2 existing recipe files in the same category before drafting.
4. Images are typically pasted inline in the chat. Save them to a temp folder (e.g. `C:/Temp/recipe-<slug>/`), then run `corepack pnpm recipe:prepare-images --input "C:/Temp/recipe-<slug>" --slug "<slug>"`. The hero image is always the last image provided (latest timestamp) — this is the script default, so no `--hero-file` flag is needed. If a local folder path is provided instead, use it directly.
5. Proofread the user-provided text before structuring it: fix typos, grammar, and punctuation in Romanian, then carry those corrections into the English translation. Do not change the meaning, quantities, or ingredient names.
6. Create both recipe files under `content/recipes/ro/<category>/` and `content/recipes/en/<category>/`.
7. Keep the Romanian `price` in RON and convert the English `price` to USD using the current rate from `cursbnr.ro`, recording the exact date used.
8. Verify frontmatter, image paths, and generated assets before committing.
9. Commit and push unless the user asks you not to.
