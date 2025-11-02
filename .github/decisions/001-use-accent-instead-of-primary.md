# ADR 001: Use "accent" for brand color instead of "primary"

## Status
Accepted (January 2025)

## Context

We needed a clear naming strategy for our color tokens that separates brand colors from semantic feedback colors. The traditional approach of using "primary" and "secondary" has several ambiguities:

1. **Semantic confusion**: Does "primary" mean "brand color" or "most important action"?
2. **Color conflicts**: If a brand's primary color is red, how does it relate to the semantic "danger" red?
3. **Industry inconsistency**: Some systems use "primary" for brand, others for semantic blue
4. **Design tool mismatch**: Figma and other design tools use "accent" for brand colors

### The Problem

Our original token structure had:
```css
--primary-background: var(--primary-700);
--primary-background-hover: var(--primary-800);
--primary-background-active: var(--primary-900);
/* ... 50+ more primary tokens ... */
```

This created:
- 200+ total tokens across all colors
- Ambiguity between "primary" the brand color and "primary" the button variant
- Manual hover/active state definitions for every color
- No clear separation between brand and semantic colors

## Decision

We adopted a **two-layer naming system** inspired by Hero UI v3 and Vercel design:

### Layer 1: Component API (intent-based)
- Button variants: `primary`, `secondary`, `tertiary`, `ghost`, `danger`
- These communicate **hierarchy and purpose**
- Example: `<Button variant="primary">` = main call-to-action

### Layer 2: CSS Tokens (color-based)
- Brand color: `--accent` (not "primary")
- Semantic colors: `--info`, `--success`, `--warning`, `--danger`
- Neutral: `--neutral-*` scale

### Key Innovation: Dynamic Contrast
Instead of hardcoded hover states, we use `color-mix()` with a dynamic contrast variable:

```css
/* variables.css */
:root {
  --accent: var(--blue-600);
  --accent-foreground: white;
  --accent-contrast: var(--neutral-950);  /* Dark in light mode */
}

[data-theme="dark"] {
  --accent: var(--blue-500);
  --accent-contrast: var(--neutral-50);  /* Light in dark mode */
}

/* theme.css */
@theme inline {
  --color-accent: var(--accent);
  --color-accent-hover: color-mix(in oklab, var(--color-accent) 90%, var(--accent-contrast) 10%);
  --color-accent-active: color-mix(in oklab, var(--color-accent) 80%, var(--accent-contrast) 20%);
}
```

## Consequences

### Positive
- ✅ **Clear separation**: "accent" = brand, "info/success/warning/danger" = semantic
- ✅ **Reduced tokens**: From 200+ to ~50 tokens
- ✅ **Automatic dark mode**: Contrast variable handles light/dark automatically
- ✅ **User customization**: Change `--accent-contrast` to adjust hover intensity
- ✅ **Industry alignment**: Matches Hero UI v3, Vercel, modern design systems
- ✅ **Scalable**: Easy to add new brand colors (`--accent-secondary`)
- ✅ **Self-documenting**: "accent" clearly means "brand color that pops"

### Negative
- ⚠️ **Breaking change**: Existing code using "primary" tokens needs migration
- ⚠️ **Browser support**: `color-mix()` requires modern browsers (Chrome 111+, Safari 16.2+, Firefox 113+)
- ⚠️ **Learning curve**: Two-layer system (API vs tokens) needs documentation

### Neutral
- The term "accent" may be less familiar to developers used to "primary"
- Requires clear documentation of when to use `variant="primary"` (API) vs `--accent` (token)

## Alternatives Considered

### Alternative 1: Keep "primary" but clarify
- Keep `--primary` for brand color
- Add better documentation
- **Rejected**: Doesn't solve the semantic confusion

### Alternative 2: Use "brand" namespace
- Use `--brand`, `--brand-secondary`
- **Rejected**: More verbose, less common in industry

### Alternative 3: Follow shadcn (no brand color tokens)
- Only expose semantic colors
- Brand color is just a CSS variable users customize
- **Rejected**: Too restrictive for a flexible component library

### Alternative 4: Chakra UI approach (color + variant)
- Expose both `color` and `variant` props
- Maximum flexibility
- **Rejected**: Creates too many invalid combinations, harder to maintain

## References

- [Hero UI v3 Theme System](https://github.com/nextui-org/heroui) - Uses "accent" for brand
- [Vercel Design System](https://vercel.com/design) - Uses "accent"
- [CSS color-mix() on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)
- [OKLCH color space](https://oklch.com) - Perceptually uniform color space

## Implementation Notes

Migration path:
1. Add new accent tokens alongside existing primary tokens
2. Update component CSS to use accent
3. Update TypeScript types
4. Update Storybook documentation
5. Deprecate old primary tokens with warnings
6. Remove old tokens in next major version

See `.github/component-patterns.md` for usage examples.
