## Quick repository summary

NovaWaveUI is a TypeScript + React monorepo implementing a design system (components, theme, utilities, and Storybook). It uses pnpm workspaces, Turbo for orchestration, and per-package builds with `tsup` (packages with React code), Vite for Storybook, and Changesets for releases.

Key packages (examples):

- `packages/react` — React components (exports include `button`, `checkbox` CSS and components). See `packages/react/package.json` and `src/` for slot/slot-system usage (e.g. `packages/react/src/Button/slots.ts`).
- `packages/core/theme` — CSS theme variables and component styles (Tailwind v4 with CSS variables in `packages/core/theme/theme/` and component styles in `components/*.css`).
- `packages/storybook` — local Storybook site using Vite. Runs on port 6006 (`pnpm --filter storybook run storybook` or via workspace scripts).
- `packages/utils` / `packages/internal` — shared tooling, ESLint and Vitest configs, and helper libs.

## High-level architecture notes for an AI coding agent

- Monorepo managed by pnpm workspaces (see `pnpm-workspace.yaml`). Packages refer to each other using `workspace:*` (local linking).
- Turbo (`turbo.json`) defines top-level tasks like `build`, `dev`, `test`, `lint` and manages cross-package orchestration using `dependsOn` rules. When running builds or tests, prefer invoking via Turbo at the repo root to ensure correct ordering and caching: `pnpm -w dlx turbo run build` (or `pnpm -w dlx turbo run test`).
- React packages use `tsup` to build (see individual `tsup.config.ts`). Storybook uses Vite and Storybook's Vite adapter.
- Theme uses **Tailwind v4** with CSS variables and `@theme` directives — CSS files under `packages/core/theme` are the canonical source of styles.

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
- CSS & theme: styles use Tailwind v4 with CSS variables and `@apply` utilities. Component styles live in `packages/core/theme/components/*.css` — when updating theme variables, update `packages/core/theme/theme/default/variables.css` and `packages/core/theme/theme/shared/theme.css` accordingly.
- Slot system: the React components use a `createSlotSystem` helper (see `packages/react/src/utils/slots/*`) — prefer following existing slot typing patterns when adding new components.
- Data attributes: components pass through all `data-*` attributes to the DOM. Use data attributes for styling and state (e.g., `[data-variant="primary"]`, `[data-disabled]`) rather than class-based approaches like BEM.

## Integration points & external dependencies

- React ARIA: components rely on `@react-aria/*` packages (some pinned in `pnpm-workspace.yaml` catalog). Be careful when upgrading — these affect runtime behavior.
- Tailwind v4: the repository uses Tailwind v4 with native CSS variable support and the `@theme` directive. Keep CSS changes inside `packages/core/theme`.
- Changesets: `@changesets/cli` is used for release/versioning. Use `pnpm -w dlx changeset` when creating release notes.

## Examples of patterns to follow (explicit references)

- Component slots: `packages/react/src/Button/slots.ts` shows creating typed slot systems:

  export const ButtonSlots = createSlotSystem<{ text: ButtonTextProps<any>; startContent: ButtonStartContentProps<any>; endContent: ButtonEndContentProps<any>; }>();

- Theme variables: `packages/core/theme/theme/default/variables.css` contains the canonical CSS custom properties for colors, spacing, radii, etc. Change tokens here when adding new theme values.

- Component CSS example: `packages/core/theme/components/checkbox.css` uses nested selectors and data-attributes like `[data-color='primary']`, `[data-selected]`, `[data-hovered]`. Use data attributes for state rather than depending on JS class toggling when possible. Try to keep CSS modular and scoped to components. Use CSS selectors to target slot elements (e.g., `[data-slot='icon']`).

- Data attribute filtering: `packages/react/src/utils/dom.ts` contains the `filterDOMProps` function which preserves all `data-*` and `aria-*` attributes by default. All components pass through user-provided data attributes to the DOM.

## Design system principles

### Component API Design

**Intent-based variants (not color + style combinations):**

- Components use a single `variant` prop that communicates **hierarchy and intent**, not just visual style
- Example: `<Button variant="primary">` (main CTA) vs `<Button variant="secondary">` (secondary action)
- DO NOT expose granular `color` + `variant` combinations that allow invalid states
- Variants map to appropriate colors internally via CSS

**Button variants (reference implementation):**

```typescript
type ButtonVariant =
  | 'primary' // Main CTA - solid accent/brand color (high emphasis)
  | 'secondary' // Secondary action - soft accent color (medium emphasis)
  | 'tertiary' // Tertiary action - neutral bordered (low emphasis)
  | 'ghost' // Minimal action - transparent neutral (minimal emphasis)
  | 'danger'; // Destructive action - solid danger red (high emphasis, semantic)
```

**Visual style mapping:**

- `primary`: Solid background with accent/brand color
- `secondary`: Soft/subtle background with accent color
- `tertiary`: Transparent background with neutral border
- `ghost`: Transparent background, no border
- `danger`: Solid background with danger/red color

**Props to keep vs remove:**

- ✅ KEEP: `variant` (intent-based), `size` (layout hierarchy), `iconOnly` (layout structure)
- ✅ KEEP: Behavior props like `isDisabled`, `isLoading`
- ❌ REMOVE: `color` prop (merged into variant)
- ❌ REMOVE: `radius` prop (design token, not component API)
- ❌ REMOVE: Other style props that should be theme tokens

### Color Token Naming

**Three-layer token architecture:**

**Layer 1 - Primitive Scales (variables.css):**
Define color scales with OKLCH for perceptual uniformity. Named scales map to semantic purposes:

```css
/* Primitive scales in packages/core/theme/theme/default/variables.css */
--neutral-50 to --neutral-950: zinc scale (grays)
--science-blue-50 to --science-blue-950: brand blue
--info-50 to --info-950: cyan (lighter than brand)
--success-50 to --success-950: green
--brandy-punch-50 to --brandy-punch-950: orange (warning)
--danger-50 to --danger-950: red

/* These primitive scales are aliased to semantic names: */
--accent-50: var(--science-blue-50);   /* through --accent-950 */
--warning-50: var(--brandy-punch-50);   /* through --warning-950 */
```

**Layer 2 - Semantic Tokens (variables.css):**
Map primitive scales to semantic meaning with consistent patterns:

```css
/* Pattern: base + -foreground + -soft + -soft-foreground + -contrast */
/* Brand/Accent - "accent" = brand color */
--accent: var(--accent-800); /* Main brand color (light mode) */
--accent-foreground: var(--color-white);
--accent-soft: var(--accent-300); /* Soft/subtle variant */
--accent-soft-foreground: var(--color-black);
--accent-contrast: var(--accent-950); /* For dynamic hover mixing */

/* Semantic feedback colors (info, success, warning, danger) */
--info: var(--info-800);
--info-foreground: var(--color-white);
--info-soft: var(--info-600);
--info-soft-foreground: var(--color-white);
--info-contrast: var(--info-950);

/* success, warning, danger follow same 5-token pattern */

/* Page structure tokens */
--background: var(--neutral-50);
--default-foreground: var(--neutral-900);
--surface: var(--neutral-200);
--field: var(--neutral-100);
--field-border: var(--neutral-300);
```

**Why this structure:**

- `--accent` vs `--info`: Clear separation between brand and informational semantic colors
- Consistent 5-token pattern: base, foreground, soft, soft-foreground, contrast
- `-soft` variants provide subtle backgrounds for secondary emphasis
- `-contrast` enables dynamic hover/active states via `color-mix()`

**Layer 3 - Tailwind Utilities (theme.css with @theme inline):**
Map semantic tokens to Tailwind utilities with `--color-*` prefix:

```css
/* In packages/core/theme/theme/shared/theme.css */
@theme inline {
  /* Maps --accent → generates bg-accent, text-accent utilities */
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent-soft: var(--accent-soft);
  --color-accent-soft-foreground: var(--accent-soft-foreground);

  /* Dynamic hover/active with color-mix() using contrast variable! */
  --color-accent-hover: color-mix(
    in oklch,
    var(--accent) 80%,
    var(--accent-contrast) 20%
  );
  --color-accent-active: color-mix(
    in oklch,
    var(--accent) 70%,
    var(--accent-contrast) 30%
  );

  /* Same pattern for all semantic colors: neutral, info, success, warning, danger */
}
```

**Why `color-mix()` with dynamic contrast:**

- NO discrete hover/active tokens in variables.css (keeps token count minimal)
- `--accent-contrast` is `--accent-950` in light mode, `--accent-200` in dark mode
- Light mode: mixes with dark (950) → darkens the base color on hover
- Dark mode: mixes with light (200) → lightens the base color on hover
- Users can customize hover intensity by changing the contrast token or mix percentages
- Consistent darkening/lightening formula across all semantic colors
- Browser support: Chrome 111+, Safari 16.2+, Firefox 113+ (modern browsers only)

**Color scale strategy (6 scales):**

- `--neutral-*`: Grays (50-950 scale, maps to zinc)
- `--science-blue-*` → `--accent-*`: Brand/accent blue (rich, saturated)
- `--info-*`: Informational cyan (lighter, cooler blue - visually distinct from brand)
- `--success-*`: Green (natural green for positive feedback)
- `--brandy-punch-*` → `--warning-*`: Orange (warm orange for cautions)
- `--danger-*`: Red (bold red for errors/destructive actions)

**Component-specific semantic tokens:**

```css
/* Component-specific radius - not configurable per instance */
--radius: 0.25rem; /* Base unit */
--radius-sm: calc(var(--radius) * 0.5);
--radius-md: var(--radius);
--radius-lg: calc(var(--radius) * 2);
--radius-xl: calc(var(--radius) * 4);
--radius-full: 9999px;

/* Field/Input specific tokens */
--field: var(--neutral-100);
--field-foreground: var(--default-foreground);
--field-border: var(--neutral-300);
--field-border-focus: var(--accent);
--field-border-error: var(--danger);
```

**Dark mode overrides:**

```css
[data-mode='dark'],
.dark {
  --accent: var(--accent-500); /* Lighter in dark mode */
  --accent-foreground: var(--neutral-950);
  --accent-contrast: var(--accent-200); /* Light contrast for dark mode */

  --background: var(--neutral-950);
  --default-foreground: var(--neutral-50);
  --surface: var(--neutral-900);
  /* ... other semantic tokens ... */
}
```

### Theming Architecture

**CSS variables + Tailwind v4 (no complex JS theme objects):**

- Users customize via CSS variables, not JS configuration
- Support runtime theme switching via `data-theme` attribute
- All `data-*` attributes pass through to DOM for user customization

**Example theming:**

```css
/* Default theme */
:root {
  --accent: oklch(51.34% 0.1603 255.67); /* science-blue-600 */
  --radius: 0.25rem;
}

/* Dark theme */
[data-mode='dark'] {
  --accent: var(--accent-500);
  --background: var(--neutral-950);
}

/* Custom brand theme */
[data-theme='brand-purple'] {
  --accent: oklch(55% 0.186 300); /* Custom purple */
}
```

**User customization:**

```tsx
// Site-wide dark mode
<div data-mode="dark">
  <Button variant="primary">Uses dark theme</Button>
</div>

// Custom theme override (escape hatch)
<Button variant="primary" data-theme="special">
  Custom themed button
</Button>

// Inline CSS variables (dynamic theming)
<div style={{ '--accent': userColor }}>
  <Button variant="primary">Dynamic color</Button>
</div>
```

### General Principles

- **Accessibility first**: components should follow WAI-ARIA best practices. Use `@react-aria/*` hooks for behavior and accessibility.
- **Theming**: use CSS custom properties for colors, spacing, and typography. Support light/dark modes via CSS variables.
- **Composition**: prefer slot-based composition over prop-heavy components. Use the slot system for flexible layouts.
- **Consistency**: follow existing design tokens and component patterns. Reuse styles from `packages/core/theme` where possible.
- **Performance**: keep bundle sizes small. Use tree-shaking friendly exports and avoid unnecessary dependencies.
- **Data attributes over classes**: use data attributes for component state and variants (e.g., `[data-variant="primary"]`) rather than BEM or other class-based approaches. This prevents invalid class combinations and works better with CSS specificity.

## When you modify code, follow this checklist

- Update package `exports` if you move files used by consumers (see `packages/react/package.json`).
- Run local package build and Storybook to smoke-test visual changes.
- Run TypeScript `typecheck` for the package you edited.
- If the change affects lint rules, run `pnpm -w dlx turbo run lint`.

## Quick: change theme tokens (step-by-step)

When you need to add or adjust design tokens (colors, spacing, radii, etc):

1. Edit the canonical variables in `packages/core/theme/theme/default/variables.css` — this is the single source for token values (colors, font sizes, radii).
2. If you expose a more semantic token, update `packages/core/theme/theme/shared/theme.css` to map semantic variables (e.g., `--color-accent` maps to `--accent-500` from variables).
3. Update any affected component CSS under `packages/core/theme/components/*.css` (they use data attributes and `@apply` utilities). Example: `checkbox.css` uses selectors like `[data-variant='primary']` and `[data-selected]`.
4. Run a quick local build of the theme package and Storybook to visually verify changes:

```bash
pnpm --filter @novawaveui/theme run build
pnpm --filter storybook run storybook
```

5. Add or update visual tests / stories under `packages/storybook/docs` and `packages/react/stories` as needed.

## Quick: add or refactor a component variant

When adding or refactoring component variants:

1. **Update TypeScript types** in `packages/core/types/src/theme.ts` or component-specific types
2. **Update component logic** in `packages/react/src/components/[component]/`
   - Remove any `color` + `variant` combinations
   - Use single `variant` prop for intent
   - Ensure data attributes are applied correctly
3. **Update component CSS** in `packages/core/theme/components/[component].css`
   - Use data attribute selectors: `[data-variant="primary"]`
   - Map to appropriate color tokens: `var(--color-accent)`, `var(--color-danger)`, etc.
   - Use component-specific semantic tokens where appropriate
4. **Update Storybook stories** to showcase new variants
5. **Test** with `pnpm --filter storybook run storybook`

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
- `packages/react/src/utils/dom.ts` — data attribute filtering logic.

If anything in this file looks wrong or you'd like more detail for a specific area (Build, release, Storybook, or slot system examples), say which area and I will expand this file.
