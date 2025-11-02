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
  | 'primary'     // Main CTA - solid accent/brand color (high emphasis)
  | 'secondary'   // Secondary action - soft accent color (medium emphasis)
  | 'tertiary'    // Tertiary action - neutral bordered (low emphasis)
  | 'ghost'       // Minimal action - transparent neutral (minimal emphasis)
  | 'danger'      // Destructive action - solid danger red (high emphasis, semantic)
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
Define color scales without `--color-*` prefix:
```css
/* Color scales - OKLCH for perceptual uniformity */
--neutral-50: oklch(0.985 0 0);
--neutral-500: oklch(0.554 0.018 252);
--neutral-950: oklch(0.130 0.013 264);

--blue-600: oklch(0.513 0.160 256);    /* Brand blue */
--cyan-500: oklch(0.650 0.100 220);    /* Info cyan */
--green-600: oklch(0.480 0.101 149);   /* Success */
--orange-600: oklch(0.580 0.119 53);   /* Warning */
--red-600: oklch(0.560 0.186 19);      /* Danger */
```

**Layer 2 - Semantic Tokens (variables.css):**
Map scales to semantic meaning with simple names:
```css
/* Brand/Accent - "accent" = brand color, not "primary" */
--accent: var(--blue-600);              /* Main brand color */
--accent-foreground: white;             /* Text on accent */
--accent-contrast: var(--neutral-950);  /* For dynamic hover (dark in light, light in dark) */
--accent-subtle: var(--blue-50);        /* Soft accent background */
--accent-subtle-foreground: var(--blue-900);

/* Semantic feedback colors */
--info: var(--cyan-500);                /* Informational (separate from brand) */
--info-foreground: white;
--info-contrast: var(--neutral-950);

--success: var(--green-600);
--success-foreground: white;
--success-contrast: var(--neutral-950);

/* ... warning, danger follow same pattern ... */

/* Page structure */
--background: white;
--foreground: var(--neutral-950);
--panel: white;
--subtle: var(--neutral-50);
--border: var(--neutral-200);
```

**Why this naming:**
- `--accent`: Clear separation between brand (accent) and semantic (info/success/warning/danger)
- Simple names like `--accent`, not `--color-accent` or `--accent-background`
- Pattern: base color + `-foreground` + `-contrast`
- Matches Hero UI v3, Vercel design systems

**Layer 3 - Tailwind Utilities (theme.css with @theme inline):**
Map semantic tokens to Tailwind utilities with `--color-*` prefix:
```css
@theme inline {
  /* Maps --accent → generates bg-accent, text-accent utilities */
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  /* Dynamic hover/active with color-mix() using contrast variable! */
  --color-accent-hover: color-mix(
    in oklab,
    var(--color-accent) 90%,
    var(--accent-contrast) 10%
  );
  --color-accent-active: color-mix(
    in oklab,
    var(--color-accent) 80%,
    var(--accent-contrast) 20%
  );

  /* Same pattern for all semantic colors */
}
```

**Why `color-mix()` with dynamic contrast:**
- NO discrete hover/active tokens in variables.css (reduces 200+ tokens to ~50)
- `--accent-contrast` is `--neutral-950` in light mode, `--neutral-50` in dark mode
- Light mode: mixes with dark → darkens the color
- Dark mode: mixes with light → lightens the color
- Users can customize hover intensity by changing contrast color
- Consistent darkening/lightening formula across all colors
- Browser support: Chrome 111+, Safari 16.2+, Firefox 113+ (modern browsers only)

**Color scale strategy (6 scales):**
- `--neutral-*`: Grays (50-950 scale)
- `--blue-*`: Brand/accent (rich, saturated blue)
- `--cyan-*`: Info (lighter, cooler blue - visually distinct from brand)
- `--green-*`: Success
- `--orange-*`: Warning
- `--red-*`: Danger

**Component-specific semantic tokens:**
```css
/* Component-specific radius - not configurable per instance */
--radius-base: 0.5rem;               /* Base unit */
--radius-button: var(--radius-base);
--radius-input: var(--radius-base);
--radius-card: calc(var(--radius-base) * 1.5);
--radius-badge: 9999px;
```

**Dark mode overrides:**
```css
[data-theme="dark"] {
  --accent: var(--blue-500);              /* Lighter in dark */
  --accent-foreground: var(--neutral-950);
  --accent-contrast: var(--neutral-50);   /* Light contrast for dark mode */
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
  --color-accent: #6366f1;
  --radius-button: 0.75rem;
}

/* Dark theme */
[data-theme="dark"] {
  --color-accent: #818cf8;
  --color-background: #1f2937;
}

/* Custom brand theme */
[data-theme="brand-purple"] {
  --color-accent: #a855f7;
}
```

**User customization:**
```tsx
// Site-wide theme
<div data-theme="dark">
  <Button variant="primary">Uses dark theme</Button>
</div>

// Component-level override (escape hatch)
<Button variant="primary" data-theme="special">
  Custom themed button
</Button>

// Inline CSS variables (dynamic theming)
<div style={{ '--color-accent': userColor }}>
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
