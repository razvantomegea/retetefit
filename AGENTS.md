# AGENTS.md

**Follow** [`../AGENTS.md`](../AGENTS.md) — universal agent governance for `C:\Projects`. Copies: `%USERPROFILE%\.cursor\rules\universal-agent-governance.mdc`, `%USERPROFILE%\.codex\AGENTS.md`.

Read that file and apply it. Local sections below are this repository only. On conflict, `../AGENTS.md` wins.

## This repository

Healthy recipe website (ReteteFit / Maingain) — bilingual en/ro.

Documentation: `README.md`.

When shipping user-facing changes, keep `README.md` in sync in the same PR/session. Update at minimum: links, features, project structure, routes, testing workflow, legal/env/deployment.

Read `README.md` before planning; update it before marking work complete.

- Package manager: `pnpm`.
- Stack: Next.js App Router, React, TypeScript, Tailwind, next-intl, markdown recipes under `content/recipes/{locale}/`.
- After a task is finished, ensure verify steps from `.github/workflows/release.yml` pass locally (`pnpm lint`, `pnpm test:coverage`, `pnpm test:e2e`, `pnpm build`, `pnpm fallow audit --ci`, and `pnpm version:check` when releasing).

## Agent skills

- Publish a new recipe from ingredients + unit prices, instructions, and photos: [`.agents/skills/recipe-publisher/SKILL.md`](.agents/skills/recipe-publisher/SKILL.md).
