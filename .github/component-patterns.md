# Component Patterns & Best Practices

This document provides examples of correct and incorrect usage patterns for NovaWaveUI components.

## Button Component

### ✅ Good Examples

```tsx
// Intent-based variants - clear hierarchy
<Button variant="primary">Sign Up</Button>           // Main CTA
<Button variant="secondary">Learn More</Button>      // Secondary action
<Button variant="tertiary">Cancel</Button>           // Tertiary action
<Button variant="ghost">Skip</Button>                // Minimal action
<Button variant="danger">Delete Account</Button>     // Destructive action

// With icons
<Button variant="primary">
  <IconPlus /> Add Item
</Button>

// Icon-only button
<Button variant="ghost" iconOnly>
  <IconEdit />
</Button>

// Size variants (layout hierarchy)
<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="lg">Large</Button>

// Theme override via data attribute (escape hatch)
<Button variant="primary" data-theme="purple">
  Special CTA
</Button>

// States
<Button variant="primary" isDisabled>Disabled</Button>
<Button variant="primary" isLoading>Loading...</Button>
```

### ❌ Anti-patterns

```tsx
// ❌ Don't expose color prop - merged into variant
<Button color="primary" variant="solid">Save</Button>

// ❌ Don't expose radius prop - design token, not component API
<Button variant="primary" radius="lg">Rounded</Button>

// ❌ Don't expose shadow prop - design token
<Button variant="primary" shadow="md">Shadow</Button>

// ❌ Don't use className to override colors - use data-theme
<Button variant="primary" className="bg-red-500">Bad</Button>

// ❌ Don't create variant combinations that have no semantic meaning
<Button variant="primary" color="success">What does this mean?</Button>
```

## Usage Guidelines

### Button Variant Usage

**Primary (`variant="primary"`)**
- **When**: Main call-to-action on a page/section
- **How many**: 0-1 per screen (the thing you most want users to do)
- **Examples**: "Sign Up", "Create Account", "Save Changes", "Deploy"
- **Style**: Solid accent/brand color background

**Secondary (`variant="secondary"`)**
- **When**: Alternative actions, secondary paths
- **How many**: 1-3 per screen
- **Examples**: "Learn More", "View Details", "Save Draft"
- **Style**: Soft accent background (subtle)

**Tertiary (`variant="tertiary"`)**
- **When**: Dismissive actions, cancelation, less important actions
- **How many**: As needed
- **Examples**: "Cancel", "Back", "Maybe Later"
- **Style**: Neutral with border, transparent background

**Ghost (`variant="ghost"`)**
- **When**: Minimal emphasis actions, icon buttons, repeated actions in lists
- **How many**: As needed
- **Examples**: Edit/Delete icons in table rows, navigation items
- **Style**: Transparent, no border, hover shows subtle background

**Danger (`variant="danger"`)**
- **When**: Destructive actions only
- **How many**: Sparingly, when user needs to be warned
- **Examples**: "Delete Account", "Remove", "Revoke Access"
- **Style**: Solid danger/red background

### Real-World Examples

#### Form Actions
```tsx
<form>
  {/* Primary action */}
  <Button variant="primary" type="submit">Save Changes</Button>

  {/* Alternative action */}
  <Button variant="secondary" type="button">Save Draft</Button>

  {/* Dismissive action */}
  <Button variant="tertiary" type="button">Cancel</Button>
</form>
```

#### Confirmation Dialog
```tsx
<Dialog>
  <DialogTitle>Delete your account?</DialogTitle>
  <DialogDescription>
    This action cannot be undone.
  </DialogDescription>

  <DialogActions>
    <Button variant="danger">Delete Account</Button>
    <Button variant="tertiary">Cancel</Button>
  </DialogActions>
</Dialog>
```

#### Table Row Actions
```tsx
<TableRow>
  <TableCell>John Doe</TableCell>
  <TableCell>
    {/* Repeated actions use ghost variant */}
    <Button variant="ghost" iconOnly><IconEdit /></Button>
    <Button variant="ghost" iconOnly><IconTrash /></Button>
  </TableCell>
</TableRow>
```

#### Marketing Page
```tsx
<Hero>
  <HeroTitle>Build faster with NovaWaveUI</HeroTitle>

  {/* Primary CTA - most important action */}
  <Button variant="primary">Get Started</Button>

  {/* Secondary - alternative path */}
  <Button variant="secondary">View Demo</Button>
</Hero>
```

## Theme Customization

### ✅ Correct Theme Customization

```tsx
// Site-wide theme
<div data-theme="dark">
  <Button variant="primary">Uses dark theme accent color</Button>
</div>

// Section-level theme
<div data-theme="brand-purple">
  <Button variant="primary">Purple accent</Button>
  <Button variant="secondary">Purple soft accent</Button>
</div>

// Component-level override (rare, but possible)
<Button variant="primary" data-theme="special-promo">
  Black Friday Deal
</Button>
```

### ❌ Incorrect Theme Customization

```tsx
// ❌ Don't use className to override theme
<Button variant="primary" className="bg-purple-500">Wrong</Button>

// ❌ Don't pass inline styles for theme colors
<Button variant="primary" style={{ backgroundColor: 'purple' }}>Wrong</Button>

// ✅ Instead, use CSS variables or data-theme
<div style={{ '--color-accent': 'purple' }}>
  <Button variant="primary">Correct</Button>
</div>
```

## CSS Variable Customization

### User-Level Theming

Users can customize the design system via CSS variables:

```css
/* Custom brand theme */
[data-theme="my-brand"] {
  /* Change brand color */
  --accent: oklch(0.60 0.20 300);
  --accent-foreground: white;
  --accent-contrast: var(--neutral-950);

  /* Change radius for all buttons */
  --radius-button: 1rem;

  /* Adjust hover intensity */
  --accent-contrast: var(--neutral-800);  /* More subtle hover */
}
```

### Component-Level Overrides

For one-off customizations:

```tsx
// Custom radius for one button
<Button
  variant="primary"
  style={{ '--radius-button': '2rem' }}
>
  Extra Rounded
</Button>

// Custom accent color for promotional section
<div style={{ '--accent': '#ff6b35' }}>
  <Button variant="primary">Limited Offer</Button>
</div>
```

## Data Attribute Escape Hatches

All components pass through `data-*` attributes:

```tsx
// Custom data attributes for styling
<Button
  variant="primary"
  data-highlight="true"
  data-campaign="summer-sale"
>
  Special Button
</Button>
```

```css
/* Custom CSS targeting data attributes */
.nw-button[data-highlight="true"] {
  animation: pulse 2s infinite;
}

.nw-button[data-campaign="summer-sale"] {
  background: linear-gradient(45deg, var(--color-accent), var(--color-warning));
}
```

## Accessibility Patterns

### ✅ Accessible Buttons

```tsx
// Icon-only buttons need aria-label
<Button variant="ghost" iconOnly aria-label="Edit item">
  <IconEdit />
</Button>

// Loading state with proper announcement
<Button variant="primary" isLoading aria-label="Saving changes">
  Save
</Button>

// Disabled with explanation
<Button variant="primary" isDisabled title="Complete all required fields">
  Submit
</Button>
```

### ❌ Accessibility Issues

```tsx
// ❌ Icon-only without label
<Button variant="ghost" iconOnly>
  <IconEdit />
</Button>

// ❌ Using div as button
<div onClick={handleClick} className="nw-button">
  Click me
</div>

// ✅ Use proper button element (or asChild with button)
<Button onClick={handleClick}>
  Click me
</Button>
```

## Composition with Slots

NovaWaveUI components use a slot system for composition:

```tsx
// Button with start/end content
<Button variant="primary">
  <ButtonStartContent>
    <IconCheck />
  </ButtonStartContent>
  <ButtonText>Verified</ButtonText>
  <ButtonEndContent>
    <Badge>New</Badge>
  </ButtonEndContent>
</Button>

// Or use children for simple cases
<Button variant="primary">
  <IconCheck /> Verified
</Button>
```

## TypeScript Patterns

### Polymorphic Components

Components support the `as` prop for rendering as different elements:

```tsx
// Render button as link
<Button variant="primary" as="a" href="/signup">
  Sign Up
</Button>

// Render as Next.js Link
import Link from 'next/link'

<Button variant="primary" as={Link} href="/signup">
  Sign Up
</Button>

// Render as React Router Link
import { Link } from 'react-router-dom'

<Button variant="primary" as={Link} to="/signup">
  Sign Up
</Button>
```

### Type-Safe Variants

```tsx
import type { ButtonProps } from '@novawaveui/react'

// ✅ Type-safe variant
const variant: ButtonProps<'button'>['variant'] = 'primary'

<Button variant={variant}>Click</Button>

// ❌ Invalid variant (TypeScript error)
<Button variant="invalid">Click</Button>
```

## Performance Patterns

### ✅ Optimize Re-renders

```tsx
// Memoize handlers for buttons in lists
const handleEdit = useCallback((id: string) => {
  // edit logic
}, [])

return items.map(item => (
  <Button
    key={item.id}
    variant="ghost"
    onClick={() => handleEdit(item.id)}
  >
    Edit
  </Button>
))
```

### ❌ Performance Anti-patterns

```tsx
// ❌ Creating new object every render
<Button variant="primary" style={{ '--color-accent': getColor() }}>
  Click
</Button>

// ✅ Memoize or move outside render
const customStyle = useMemo(() => ({
  '--color-accent': getColor()
}), [dependency])

<Button variant="primary" style={customStyle}>
  Click
</Button>
```

## Testing Patterns

### Unit Tests

```tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@novawaveui/react'

test('button renders with correct variant', () => {
  render(<Button variant="primary">Click me</Button>)

  const button = screen.getByRole('button', { name: /click me/i })
  expect(button).toHaveAttribute('data-variant', 'primary')
})

test('button calls onClick handler', async () => {
  const handleClick = vi.fn()
  render(<Button variant="primary" onClick={handleClick}>Click</Button>)

  await userEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Visual Tests (Storybook)

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      control: { type: 'select' },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}
```

## Summary

**Key Principles:**
- Use intent-based `variant` prop (primary/secondary/tertiary/ghost/danger)
- Don't expose style props (`color`, `radius`) - use design tokens
- Theme via `data-theme` attribute or CSS variables
- Use data attributes for escape hatches
- Follow accessibility best practices
- Keep component APIs simple and semantic
