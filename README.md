# ReteteFit (Maingain)

Healthy recipes under 60 minutes — bilingual Romanian / English. Built with Next.js App Router, React, TypeScript, Tailwind, and next-intl.

## Getting started

### 1. Environment

Create `.env.local` (never commit secrets):

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Required for Open Graph URLs. See `docs/OPEN_GRAPH_SETUP.md`.

### 2. Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                         | Purpose                                         |
| ------------------------------ | ----------------------------------------------- |
| `pnpm dev`                     | Dev server                                      |
| `pnpm build`                   | Production build                                |
| `pnpm start`                   | Start production server                         |
| `pnpm lint`                    | ESLint                                          |
| `pnpm format` / `format:check` | Prettier                                        |
| `pnpm test` / `test:watch`     | Jest                                            |
| `pnpm recipe:prepare-images`   | Compress/rename recipe photos                   |
| `pnpm version:bump`            | Patch-bump ahead of latest `v*` tag             |
| `pnpm version:check`           | Assert version ready for release                |
| `pnpm prerelease`              | format + lint + test + build                    |
| `pnpm release:on-main`         | Tag + CHANGELOG + GitHub Release (CI on `main`) |

## Project structure

```
.agents/skills/recipe-publisher/   # Phone-first recipe publish skill
.github/workflows/release.yml      # verify + release
app/                               # Next.js App Router
components/
content/recipes/{en,ro}/           # Recipe markdown
content/educational/               # Educational articles
lib/
messages/                          # next-intl strings
public/<slug>/                     # Recipe images
scripts/                           # version bump / release helpers
```

## Agent skills

Publish a recipe from **ingredients + RON unit prices**, **instructions**, and **photos**. The skill calculates nutrition and cost, generates descriptions, writes `ro`/`en` files, prepares images, and opens a PR.

- Skill: [`.agents/skills/recipe-publisher/SKILL.md`](.agents/skills/recipe-publisher/SKILL.md)
- Conventions: [REFERENCE.md](.agents/skills/recipe-publisher/REFERENCE.md)
- Optional Cursor junction: `powershell -ExecutionPolicy Bypass -File .agents/skills/recipe-publisher/scripts/link-cursor-skill.ps1`

Also see [Content Management](docs/CONTENT_MANAGEMENT.md).

## CI and releases

[`.github/workflows/release.yml`](.github/workflows/release.yml) runs on PRs and pushes to `main`:

1. **verify** — version check (when applicable), `pnpm lint`, `pnpm build`, `pnpm test`
2. **release** (push to `main` only) — CHANGELOG, git tag `vX.Y.Z`, GitHub Release

Bump with `pnpm version:bump` before merging to `main` when needed. Commits containing `[skip release]` skip the release job. First release version is `1.0.0`.

## License

MIT — see [LICENSE](LICENSE).
