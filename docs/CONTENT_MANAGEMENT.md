# Content Management

Recipes and educational articles for ReteteFit / Maingain.

## Recipes (preferred path)

Use the **recipe-publisher** agent skill — do not hand-author macros, prices, or descriptions when publishing from chat/phone:

[`.agents/skills/recipe-publisher/SKILL.md`](../.agents/skills/recipe-publisher/SKILL.md)

Full conventions (frontmatter, cost math, images, PR checklist): [REFERENCE.md](../.agents/skills/recipe-publisher/REFERENCE.md).

### Locations

```
content/recipes/
  ├── ro/{brunch|desserts|main|vegetarian}/<slug>.md
  └── en/{brunch|desserts|main|vegetarian}/<slug>.md

public/<slug>/
  ├── hero.png
  ├── 1.png
  └── …
```

### Input the skill expects

1. Ingredients with quantities **and** RON purchase prices per unit
2. Instructions (Romanian preferred)
3. Photos (attachments or folder)

Everything else (nutrition, per-serving price, category, tags, generated `description`, bilingual files, images, PR) is calculated or inferred.

### Images

```bash
corepack pnpm recipe:prepare-images --input "<raw-dir>" --slug "<slug>"
```

## Educational articles

Educational content lives under `content/educational/{en,ro}/` with its own frontmatter (including authored `description`). That path is separate from the recipe skill.

## Publishing

Open a pull request for new recipes. Merges to `main` run verify + release (see README → CI and releases).
