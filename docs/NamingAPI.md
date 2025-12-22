# NovaWaveUI API Naming & Component Structure

## Goals

- Provide a single, consistent API across primitives and complex components
- Use clear dot-notation for complex components (`Component.Root`, `Component.Label`, etc.)
- Keep primitives simple while offering an optional `.Root` alias for uniformity
- Ensure patterns work in Next.js client/server environments

---

## Conventions

### Primitives (leaf components)

- Export a single component (e.g., `Button`, `Input`, `Label`, `Text`).
- Optional: expose `Component.Root` as an alias to the primitive for consistency.
  - Example: `Button` and `Button.Root` render the same primitive.
- Do not define slots for primitives.

```tsx
import { Button } from '@novawaveui/react';

// Preferred
<Button>Click me</Button>

// Optional uniform alias
<Button.Root>Click me</Button.Root>
```

### Complex Components (slot-based)

- Export a namespace-like object using dot-notation with a mandatory `Root`.
- Slots are nouns describing the element role and map 1:1 to contexts.

```tsx
import { TextField, Label, Input, Text, ErrorField } from '@novawaveui/react';

<TextField.Root name="username" isRequired>
  <TextField.Label>
    <Label>Username</Label>
  </TextField.Label>
  <TextField.Input>
    <Input placeholder="Enter username" />
  </TextField.Input>
  <TextField.Description>
    <Text>Must be unique</Text>
  </TextField.Description>
  <TextField.ErrorField>
    <ErrorField>Required field</ErrorField>
  </TextField.ErrorField>
</TextField.Root>;
```

Slot naming examples:

- `Label`, `Input`, `Description`, `ErrorField`
- For list-like components: `Item`, `Group`, `Trigger`, `Panel`, etc.

---

## Hooks

- Primitives: `useButton(props)` → returns props for the primitive.
- Complex: `useTextField(props)` → returns an object of slot props `{ label, input, description, error }`.
- Root components consume these hooks and pass values into the slot system/context providers.

```tsx
// Primitives
const buttonProps = useButton({ isDisabled: false });

// Complex
const slots = useTextField({ name: 'username', isRequired: true });
// slots.label, slots.input, slots.description, slots.error
```

---

## Next.js Client/Server Guidance

- Root components that rely on interactive hooks or state should be marked as client components.
- Context providers for slots should live in client components.
- Primitives rendering static content without interactive hooks can be server components, but most NovaWaveUI primitives are interactive and thus client components.

Recommendations:

- Place `'use client'` at the top of files exporting interactive Root components and primitives.
- Keep hooks usage inside client boundaries.

```tsx
// Example client component boundary
'use client';

export function TextFieldRoot(props: TextFieldProps) {
  const slots = useTextField(props); // React Aria hook → client only
  return (
    <TextFieldSlotsProvider value={slots}>
      <div>{props.children}</div>
    </TextFieldSlotsProvider>
  );
}
```

---

## Summary

- Primitives: simple component, optional `.Root` alias for uniformity.
- Complex components: `Component.Root` + named slots via dot-notation.
- Hooks compute props; slots/contexts distribute them; primitives render them.
- Mark interactive roots/primitives as client components for Next.js compatibility.
