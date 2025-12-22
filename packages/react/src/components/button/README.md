# Button Component

A flexible, accessible button component built with React Aria and designed to work with the NovaWaveUI design system.

## Overview

The Button component provides an intent-based API with five semantic variants that communicate hierarchy and purpose. It follows WAI-ARIA best practices and integrates seamlessly with the NovaWaveUI theme system.

## Installation

```bash
pnpm add @novawaveui/react
```

## Basic Usage

```tsx
import { Button } from '@novawaveui/react';

function App() {
  return (
    <Button variant="primary" onPress={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}
```

## Variants

The Button uses a single `variant` prop that communicates intent and hierarchy:

- **`primary`** - Main call-to-action (solid accent/brand color, high emphasis)
- **`secondary`** - Secondary action (soft accent color, medium emphasis)
- **`tertiary`** - Tertiary action (neutral bordered, low emphasis)
- **`ghost`** - Minimal action (transparent neutral, minimal emphasis)
- **`danger`** - Destructive action (solid danger red, high emphasis, semantic)

```tsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="tertiary">Tertiary Action</Button>
<Button variant="ghost">Ghost Action</Button>
<Button variant="danger">Delete</Button>
```

## Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Icon Buttons

```tsx
<Button iconOnly aria-label="Settings">
  <SettingsIcon />
</Button>
```

## States

```tsx
<Button isDisabled>Disabled</Button>
<Button isLoading>Loading...</Button>
```

## Theming

The Button component uses CSS custom properties from the NovaWaveUI theme system. Customize colors via CSS variables:

```css
:root {
  --accent: oklch(51.34% 0.1603 255.67); /* Primary variant color */
  --danger: oklch(55% 0.22 25); /* Danger variant color */
  --radius: 0.25rem; /* Button border radius */
}
```

Variant-to-color mapping is handled automatically in `packages/core/theme/components/button.css` using data attributes.

## Accessibility

- Built on `@react-aria/button` for keyboard and screen reader support
- Supports `aria-label` for icon-only buttons
- Focus management and keyboard navigation included
- Disabled and loading states are properly announced

## API Reference

See `packages/react/src/components/button/button.tsx` for the complete TypeScript API and `packages/react/src/components/button/slots.ts` for slot system details.

## Related Files

- Component implementation: `packages/react/src/components/button/`
- Component styles: `packages/core/theme/components/button.css`
- Storybook stories: `packages/react/stories/Button.stories.tsx`
