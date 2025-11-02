# NovaWaveUI Theme System

The NovaWaveUI theme system is built on three layers of CSS variables with Tailwind v4 integration, providing flexibility and customization without complex JavaScript configuration.

## Architecture Overview

### Three-Layer Token System

```
┌─────────────────────────────────────────────────────────┐
│  Layer 3: Component CSS                                  │
│  Uses: var(--color-accent), var(--color-accent-hover)  │
│  Files: packages/core/theme/components/*.css            │
└─────────────────────────────────────────────────────────┘
                          ↑
┌─────────────────────────────────────────────────────────┐
│  Layer 2: Tailwind Utilities (@theme inline)            │
│  Maps: --accent → --color-accent                        │
│  Computes: hover/active states with color-mix()         │
│  Files: packages/core/theme/theme/shared/theme.css      │
│  Generates: bg-accent, text-accent-foreground, etc.     │
└─────────────────────────────────────────────────────────┘
                          ↑
┌─────────────────────────────────────────────────────────┐
│  Layer 1: Semantic Tokens                                │
│  Defines: --accent, --accent-foreground, --accent-contrast
│  Files: packages/core/theme/theme/default/variables.css │
└─────────────────────────────────────────────────────────┘
```

## Color Scales

NovaWaveUI uses **6 color scales** with OKLCH color space for perceptual uniformity:

### 1. Neutral (Grays)
```css
--neutral-50: oklch(0.985 0 0);         /* Almost white */
--neutral-500: oklch(0.554 0.018 252);  /* Mid gray */
--neutral-950: oklch(0.130 0.013 264);  /* Almost black */
```
**Usage:** Backgrounds, text, borders, disabled states

### 2. Blue (Brand/Accent)
```css
--blue-600: oklch(0.513 0.160 256);     /* Rich, saturated blue */
```
**Usage:** Primary brand color, main CTAs

### 3. Cyan (Info)
```css
--cyan-500: oklch(0.650 0.100 220);     /* Lighter, cooler blue */
```
**Usage:** Informational messages, info badges
**Why separate from brand blue?** Clear visual distinction between brand and informational elements

### 4. Green (Success)
```css
--green-600: oklch(0.480 0.101 149);    /* Natural green */
```
**Usage:** Success messages, confirmations, positive status

### 5. Orange (Warning)
```css
--orange-600: oklch(0.580 0.119 53);    /* Warm orange */
```
**Usage:** Warnings, cautions, important notices

### 6. Red (Danger)
```css
--red-600: oklch(0.560 0.186 19);       /* Bold red */
```
**Usage:** Errors, destructive actions, critical alerts

## Semantic Token Patterns

All color tokens follow a consistent pattern:

```css
/* Base color */
--accent: var(--blue-600);

/* Foreground (text on base color) */
--accent-foreground: white;

/* Contrast (for dynamic hover/active via color-mix) */
--accent-contrast: var(--neutral-950);  /* Dark in light mode */

/* Subtle variant (soft background) */
--accent-subtle: var(--blue-50);
--accent-subtle-foreground: var(--blue-900);
```

This pattern applies to all semantic colors: `accent`, `info`, `success`, `warning`, `danger`.

## Dynamic Hover States with color-mix()

Instead of hardcoded hover tokens, we use `color-mix()` for dynamic states:

### The Problem (Old Approach)
```css
/* ❌ Requires 3 tokens per color */
--accent: var(--blue-600);
--accent-hover: var(--blue-700);    /* Manual */
--accent-active: var(--blue-800);   /* Manual */

/* Result: 200+ tokens across all colors! */
```

### The Solution (New Approach)
```css
/* variables.css - Only base tokens */
--accent: var(--blue-600);
--accent-foreground: white;
--accent-contrast: var(--neutral-950);  /* Dynamic! */

/* theme.css - Computed hover/active */
@theme inline {
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);

  /* Dynamic darkening - automatically adjusts to theme! */
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
}
```

### How It Works

**Light Mode:**
```css
--accent-contrast: var(--neutral-950);  /* Dark */
/* Mixing with dark = darkening the color */
```

**Dark Mode:**
```css
--accent-contrast: var(--neutral-50);   /* Light */
/* Mixing with light = lightening the color */
```

**Benefits:**
- ✅ Reduces 200+ tokens to ~50 tokens
- ✅ Consistent hover formula across all colors
- ✅ Automatically works in light/dark modes
- ✅ Users can customize hover intensity by changing contrast
- ✅ One source of truth per color

**Browser Support:** Chrome 111+, Safari 16.2+, Firefox 113+

## File Structure

```
packages/core/theme/
├── theme/
│   ├── default/
│   │   └── variables.css          # Layer 1: Semantic tokens
│   └── shared/
│       └── theme.css               # Layer 2: Tailwind utilities
├── components/
│   ├── button.css                  # Layer 3: Component styles
│   ├── input.css
│   └── ...
└── README.md                       # This file
```

## Layer 1: Semantic Tokens (variables.css)

Define semantic meaning without Tailwind utilities:

```css
@layer base {
  :root {
    color-scheme: light;

    /* ==================== Page Structure ==================== */
    --background: white;
    --foreground: var(--neutral-950);
    --panel: white;
    --panel-foreground: var(--neutral-950);
    --subtle: var(--neutral-50);
    --subtle-foreground: var(--neutral-900);

    /* ==================== Brand/Accent ==================== */
    --accent: var(--blue-600);
    --accent-foreground: white;
    --accent-contrast: var(--neutral-950);
    --accent-subtle: var(--blue-50);
    --accent-subtle-foreground: var(--blue-900);

    /* ==================== Semantic Colors ==================== */
    --info: var(--cyan-500);
    --info-foreground: white;
    --info-contrast: var(--neutral-950);

    --success: var(--green-600);
    --success-foreground: white;
    --success-contrast: var(--neutral-950);

    --warning: var(--orange-600);
    --warning-foreground: white;
    --warning-contrast: var(--neutral-950);

    --danger: var(--red-600);
    --danger-foreground: white;
    --danger-contrast: var(--neutral-950);

    /* ==================== UI Elements ==================== */
    --border: var(--neutral-200);
    --border-hover: var(--neutral-300);
    --muted: var(--neutral-500);
    --muted-foreground: var(--neutral-600);

    /* ==================== Component Radius ==================== */
    --radius-base: 0.5rem;
    --radius-button: var(--radius-base);
    --radius-input: var(--radius-base);
    --radius-card: calc(var(--radius-base) * 1.5);
    --radius-badge: 9999px;
  }

  /* Dark mode overrides */
  [data-theme="dark"] {
    color-scheme: dark;

    --background: var(--neutral-950);
    --foreground: var(--neutral-50);

    --accent: var(--blue-500);              /* Lighter in dark */
    --accent-foreground: var(--neutral-950);
    --accent-contrast: var(--neutral-50);   /* Light contrast */

    /* ... other overrides ... */
  }
}
```

## Layer 2: Tailwind Utilities (theme.css)

Map semantic tokens to Tailwind utilities with `@theme inline`:

```css
@theme inline {
  /* ==================== Page Structure ==================== */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-panel: var(--panel);
  --color-subtle: var(--subtle);

  /* ==================== Accent with Computed Hover/Active ==================== */
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent-hover: color-mix(in oklab, var(--color-accent) 90%, var(--accent-contrast) 10%);
  --color-accent-active: color-mix(in oklab, var(--color-accent) 80%, var(--accent-contrast) 20%);

  --color-accent-subtle: var(--accent-subtle);
  --color-accent-subtle-foreground: var(--accent-subtle-foreground);
  --color-accent-subtle-hover: color-mix(in oklab, var(--color-accent-subtle) 95%, var(--color-accent) 5%);

  /* ==================== Semantic Colors (same pattern) ==================== */
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-success-hover: color-mix(in oklab, var(--color-success) 90%, var(--success-contrast) 10%);
  --color-success-active: color-mix(in oklab, var(--color-success) 80%, var(--success-contrast) 20%);

  /* ... info, warning, danger follow same pattern ... */

  /* ==================== UI Elements ==================== */
  --color-border: var(--border);
  --color-border-hover: var(--border-hover);
  --color-muted: var(--muted);

  /* ==================== Radius ==================== */
  --radius-button: var(--radius-button);
  --radius-input: var(--radius-input);
  --radius-card: var(--radius-card);
}
```

**This generates utilities:**
- `bg-accent`, `text-accent-foreground`
- `bg-accent-hover`, `bg-accent-active`
- `rounded-button`, `rounded-input`, `rounded-card`
- And many more!

## Layer 3: Component Styles

Component CSS uses the generated tokens:

```css
/* packages/core/theme/components/button.css */

.nw-button {
  border-radius: var(--radius-button);  /* Semantic token */
}

/* Primary variant uses accent */
.nw-button[data-variant="primary"] {
  background: var(--color-accent);
  color: var(--color-accent-foreground);

  &:hover:not([data-disabled]) {
    background: var(--color-accent-hover);  /* Computed! */
  }

  &[data-pressed] {
    background: var(--color-accent-active);  /* Computed! */
  }
}

/* Secondary variant uses soft accent */
.nw-button[data-variant="secondary"] {
  background: var(--color-accent-subtle);
  color: var(--color-accent-subtle-foreground);

  &:hover:not([data-disabled]) {
    background: var(--color-accent-subtle-hover);
  }
}

/* Danger variant uses semantic danger color */
.nw-button[data-variant="danger"] {
  background: var(--color-danger);
  color: var(--color-danger-foreground);

  &:hover:not([data-disabled]) {
    background: var(--color-danger-hover);
  }

  &[data-pressed] {
    background: var(--color-danger-active);
  }
}
```

## User Customization

### Theme Switching

Users can switch themes via `data-theme` attribute:

```tsx
<div data-theme="dark">
  <Button variant="primary">Dark theme button</Button>
</div>
```

### Custom Themes

Create custom themes by overriding tokens:

```css
/* Custom brand theme */
[data-theme="my-brand"] {
  /* Change brand color */
  --accent: oklch(0.60 0.20 300);         /* Purple */
  --accent-foreground: white;
  --accent-contrast: var(--neutral-950);

  /* Change button radius */
  --radius-button: 1rem;

  /* Adjust hover intensity */
  --accent-contrast: var(--neutral-800);  /* More subtle */
}
```

### Component-Level Overrides

```tsx
// Custom radius for one button
<Button
  variant="primary"
  style={{ '--radius-button': '2rem' }}
>
  Extra Rounded
</Button>

// Custom accent for a section
<div style={{ '--accent': '#ff6b35' }}>
  <Button variant="primary">Special Color</Button>
</div>
```

## Adding New Colors

To add a new color (e.g., "purple" for secondary brand):

### 1. Add Color Scale (variables.css)
```css
--purple-50: oklch(0.98 0.02 300);
--purple-500: oklch(0.60 0.18 300);
--purple-600: oklch(0.55 0.19 300);
--purple-950: oklch(0.20 0.08 300);
```

### 2. Add Semantic Token (variables.css)
```css
--accent-secondary: var(--purple-600);
--accent-secondary-foreground: white;
--accent-secondary-contrast: var(--neutral-950);
```

### 3. Add Tailwind Utilities (theme.css)
```css
@theme inline {
  --color-accent-secondary: var(--accent-secondary);
  --color-accent-secondary-foreground: var(--accent-secondary-foreground);
  --color-accent-secondary-hover: color-mix(
    in oklab,
    var(--color-accent-secondary) 90%,
    var(--accent-secondary-contrast) 10%
  );
  --color-accent-secondary-active: color-mix(
    in oklab,
    var(--color-accent-secondary) 80%,
    var(--accent-secondary-contrast) 20%
  );
}
```

### 4. Use in Components (component CSS)
```css
.nw-button[data-variant="accent-secondary"] {
  background: var(--color-accent-secondary);
  color: var(--color-accent-secondary-foreground);

  &:hover {
    background: var(--color-accent-secondary-hover);
  }
}
```

## Naming Conventions

### Do's
- ✅ Use simple names: `--accent`, not `--color-accent-background`
- ✅ Use `-foreground` suffix for text colors
- ✅ Use `-contrast` suffix for color-mix targets
- ✅ Use `-subtle` suffix for soft backgrounds
- ✅ Use semantic names: `--panel`, `--subtle`, `--muted`

### Don'ts
- ❌ Don't use `--primary` (ambiguous - use `--accent`)
- ❌ Don't hardcode hover states (use `color-mix()`)
- ❌ Don't use `--surface-1/2/3` (use semantic names)
- ❌ Don't add `--color-*` prefix in variables.css (only in theme.css)

## Color Space: Why OKLCH?

NovaWaveUI uses **OKLCH** (Oklab Lightness Chroma Hue) instead of RGB or HSL:

### Benefits
- ✅ **Perceptually uniform**: Equal numeric changes = equal perceived changes
- ✅ **Better color mixing**: `color-mix()` produces natural-looking intermediates
- ✅ **Wider gamut**: Access to more vibrant colors
- ✅ **Predictable lightness**: Lightness value directly correlates to perceived brightness

### Example
```css
/* Same lightness, different hues - appear equally bright */
--blue: oklch(0.60 0.15 250);
--green: oklch(0.60 0.15 145);
--red: oklch(0.60 0.15 25);
```

### Format
```
oklch(Lightness Chroma Hue)
      ├─ 0-1 (0=black, 1=white)
      ├─ 0-0.4 (0=gray, higher=more saturated)
      └─ 0-360 (hue angle: 0=red, 120=green, 240=blue)
```

## Inspiration & References

- **Hero UI v3**: Accent naming, `color-mix()` pattern, `@theme inline` usage
- **Vercel Design**: Clean semantic token naming
- **Tailwind v4**: Native CSS variable integration
- **OKLCH**: [oklch.com](https://oklch.com) - Color space education

## Troubleshooting

### Colors not updating?
1. Check that you're editing `variables.css`, not `theme.css`
2. Rebuild theme: `pnpm --filter @novawaveui/theme run build`
3. Restart Storybook: `pnpm --filter storybook run storybook`

### Hover states not working?
1. Verify `--accent-contrast` is defined for both light/dark modes
2. Check browser support for `color-mix()` (Chrome 111+)
3. Ensure you're using `in oklab` color space

### Tailwind utilities not generating?
1. Check that tokens have `--color-*` prefix in `theme.css`
2. Verify `@theme inline` directive is present
3. Rebuild: `pnpm -w dlx turbo run build`

## Questions?

See `.github/copilot-instructions.md` for more architectural details or `.github/component-patterns.md` for usage examples.
