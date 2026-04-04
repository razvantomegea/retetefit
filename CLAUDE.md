# ReteteFit (Maingain)

## Project
Healthy recipe website — low-calorie recipes under 60 minutes, bilingual (en/ro).

## Stack
- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, Radix UI, Framer Motion, cmdk
- next-intl for i18n (`[locale]` routing, `messages/` for translations)
- MDX content in `content/recipes/{en,ro}/` and `content/educational/`
- Jest + ts-jest for testing
- pnpm as package manager

## Commands
- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm test` — run Jest tests
- `pnpm test:watch` — watch mode
- `pnpm lint` — ESLint
- `pnpm format` — Prettier

## Conventions
- Follow design system in `PRD.md` (colors, spacing, typography)
- Use `next-intl` for all user-facing strings
- Recipe content lives in MDX files under `content/recipes/{locale}/`
- Components in `components/`, hooks in `hooks/`, types in `types/`, utils in `lib/`
