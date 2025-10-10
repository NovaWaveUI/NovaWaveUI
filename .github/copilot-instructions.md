## Quick repository summary

NovaWaveUI is a TypeScript + React monorepo implementing a design system (components, theme, utilities, and Storybook). It uses pnpm workspaces, Turbo for orchestration, and per-package builds with `tsup` (packages with React code), Vite for Storybook, and Changesets for releases.

Key packages (examples):

- `packages/react` — React components (exports include `button`, `checkbox` CSS and components). See `packages/react/package.json` and `src/` for slot/slot-system usage (e.g. `packages/react/src/Button/slots.ts`).
- `packages/core/theme` — CSS theme variables and component styles (Tailwind-composed CSS in `packages/core/theme/src` and `components/*.css`).
- `packages/storybook` — local Storybook site using Vite. Runs on port 6006 (`pnpm --filter storybook run storybook` or via workspace scripts).
- `packages/utils` / `packages/internal` — shared tooling, ESLint and Vitest configs, and helper libs.

## High-level architecture notes for an AI coding agent

- Monorepo managed by pnpm workspaces (see `pnpm-workspace.yaml`). Packages refer to each other using `workspace:*` (local linking).
- Turbo (`turbo.json`) defines top-level tasks like `build`, `dev`, `test`, `lint` and manages cross-package orchestration using `dependsOn` rules. When running builds or tests, prefer invoking via Turbo at the repo root to ensure correct ordering and caching: `pnpm -w dlx turbo run build` (or `pnpm -w dlx turbo run test`).
- React packages use `tsup` to build (see individual `tsup.config.ts`). Storybook uses Vite and Storybook's Vite adapter.
- Theme uses plain CSS files with Tailwind utility classes and `@apply` utilities — CSS files under `packages/core/theme` are the canonical source of styles.

## Developer workflows and exact commands

- Install dependencies (root):

  pnpm install

- Run Storybook (local component dev):

  pnpm --filter storybook run storybook

- Build all packages (using Turbo):

  pnpm -w dlx turbo run build

- Run package-level build (example `@novawaveui/react`):

  pnpm --filter @novawaveui/react run build

- Run tests for a package (example):

  pnpm --filter @novawaveui/react run test

- Lint entire repo (top-level eslint configs are provided under `packages/internal/eslint-config`):

  pnpm -w dlx turbo run lint

- Typecheck a package (example):

  pnpm --filter @novawaveui/react run typecheck

Notes:

- The root `package.json` contains only a minimal script surface; prefer package-level scripts or Turbo commands for real work.
- Some packages are marked `private: true` (e.g. `storybook`). Exports and public packages expose `dist/` artifacts.

## Project-specific conventions and patterns

- Commit messages: follow the repository's commit convention described in `CONTRIBUTING.md` (type(scope): message). Tools like `commitlint` are configured in root.
- Local workspace linking: packages reference each other via `workspace:*` in `package.json`. Avoid adding different version numbers unless intentional.
- CSS & theme: styles use Tailwind-like `@apply` utilities and a custom `@novawaveui/tailwind-composer`. Component styles live in `packages/core/theme/components/*.css` — when updating class names or theme variables, update `packages/core/theme/theme/shared/theme.css` and `theme/default/variables.css` accordingly.
- Slot system: the React components use a `createSlotSystem` helper (see `packages/react/src/utils/slots/*`) — prefer following existing slot typing patterns when adding new components.

## Integration points & external dependencies

- React ARIA: components rely on `@react-aria/*` packages (some pinned in `pnpm-workspace.yaml` catalog). Be careful when upgrading — these affect runtime behavior.
- Note: the repository uses plain CSS files with Tailwind utilities and `@apply` (no custom composer required). Keep CSS changes inside `packages/core/theme`.
- Changesets: `@changesets/cli` is used for release/versioning. Use `pnpm -w dlx changeset` when creating release notes.

## Examples of patterns to follow (explicit references)

- Component slots: `packages/react/src/Button/slots.ts` shows creating typed slot systems:

  export const ButtonSlots = createSlotSystem<{ text: ButtonTextProps<any>; startContent: ButtonStartContentProps<any>; endContent: ButtonEndContentProps<any>; }>();

- Theme variables: `packages/core/theme/theme/default/variables.css` contains the canonical CSS custom properties for colors, spacing, radii, etc. Change tokens here when adding new theme values.

- Component CSS example: `packages/core/theme/components/checkbox.css` uses nested selectors and data-attributes like `[data-color='primary']`, `[data-selected]`, `[data-hovered]`. Use data attributes for state rather than depending on JS class toggling when possible. Try to keep CSS modular and scoped to components. Use CSS selectors to target slot elements (e.g., `[data-slot='icon']`).

## Design system principles

- Accessibility first: components should follow WAI-ARIA best practices. Use `@react-aria/*` hooks for behavior and accessibility.
- Theming: use CSS custom properties for colors, spacing, and typography. Support light/dark modes via CSS variables.
- Composition: prefer slot-based composition over prop-heavy components. Use the slot system for flexible layouts.
- Consistency: follow existing design tokens and component patterns. Reuse styles from `packages/core/theme` where possible.
- Performance: keep bundle sizes small. Use tree-shaking friendly exports and avoid unnecessary dependencies.

## When you modify code, follow this checklist

- Update package `exports` if you move files used by consumers (see `packages/react/package.json`).
- Run local package build and Storybook to smoke-test visual changes.
- Run TypeScript `typecheck` for the package you edited.
- If the change affects lint rules, run `pnpm -w dlx turbo run lint`.

## Quick: change theme tokens (step-by-step)

When you need to add or adjust design tokens (colors, spacing, radii, etc):

1. Edit the canonical variables in `packages/core/theme/theme/default/variables.css` — this is the single source for token values (colors, font sizes, radii).
2. If you expose a more semantic token, update `packages/core/theme/theme/shared/theme.css` to map semantic variables (e.g., `--color-primary-500`) to the raw variables.
3. Update any affected component CSS under `packages/core/theme/components/*.css` (they use data attributes and `@apply` utilities). Example: `checkbox.css` uses selectors like `[data-color='primary']` and `[data-selected]`.
4. Run a quick local build of the theme package and Storybook to visually verify changes:

```bash
pnpm --filter @novawaveui/theme run build
pnpm --filter storybook run storybook
```

5. Add or update visual tests / stories under `packages/storybook/docs` and `packages/react/stories` as needed.

## Turbo & local dev workflow recommendations

Use Turbo for cross-package orchestration and caching. A few practical patterns:

- Quick full build (cached):

  pnpm -w dlx turbo run build

- Fast developer build for a single package (watch):

  pnpm --filter @novawaveui/react run dev

- Run all lint rules across packages (useful before CI):

  pnpm -w dlx turbo run lint

- CI pattern (example): build, typecheck, lint, then test

  pnpm -w dlx turbo run build && pnpm -w dlx turbo run typeCheck && pnpm -w dlx turbo run lint && pnpm -w dlx turbo run test

Notes:

- Turbo tasks are defined in `turbo.json`. Use `--filter` to target a specific package for iterative work.
- If you only need to iterate on styles, consider building the theme package and running Storybook rather than full repo builds.

## Where to look for more context

- `CONTRIBUTING.md` — branch & commit conventions.
- `pnpm-workspace.yaml` and per-package `package.json` files — package layout and scripts.
- `turbo.json` — CI/task orchestration rules.
- `packages/core/theme` — theme tokens and components CSS.
- `packages/react` — component implementations and build configuration.

If anything in this file looks wrong or you'd like more detail for a specific area (Build, release, Storybook, or slot system examples), say which area and I will expand this file.
