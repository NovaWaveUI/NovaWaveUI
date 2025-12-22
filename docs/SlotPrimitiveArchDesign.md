# NovaWaveUI Architecture: Slots & Primitives

## Overview

NovaWaveUI is built on a composable architecture using **primitives** and **slots** with a context-based prop system. This design prevents prop drilling, enables maximum flexibility, and maintains accessibility through React Aria.

---

## Core Concepts

### 1. Primitives

**Definition**: Leaf components that render DOM elements directly.

**Examples**: `Button`, `Input`, `Label`, `Text`

**Characteristics**:

- Cannot be broken down further
- Expose their props as a TypeScript type
- Create and consume a context
- Merge context values with local props
- Always render a single DOM element

**Purpose**: Provide the fundamental building blocks with full accessibility wiring.

**How They Work**:

Primitives follow a three-step pattern:

1. **Define a context** - Each primitive has a corresponding context (e.g., `LabelContext`, `InputContext`)
2. **Consume the context** - The primitive reads props from its context
3. **Merge props** - Context props are merged with local props, with local props taking precedence

This allows primitives to receive props from parent components without prop drilling.

---

### 2. Complex Components

**Definition**: Components that use slots and primitives to create more sophisticated UI patterns.

**Examples**: `TextField`, `Checkbox`, `Select`

**Characteristics**:

- Composed of multiple slots
- Each slot can contain primitives or other complex components
- Expose their props as a TypeScript type
- Create and consume contexts
- Root component calculates props for all slots using React Aria

**Purpose**: Provide accessible, composable patterns while maintaining flexibility.

**How They Work**:

Complex components have a root component that:

1. **Receives user props** - Accepts configuration like `isRequired`, `isDisabled`, etc.
2. **Calculates slot props** - Uses React Aria hooks to determine the correct props for each slot
3. **Distributes via slot system** - Makes calculated props available to all child slots
4. **Renders composition** - Accepts children that compose the final structure

---

### 3. Contexts

**Definition**: Contracts between behavior and rendering that carry props to specific elements.

**Examples**:

- `LabelContext` → props that must land on the label element
- `InputContext` → props + ref that must land on the input element
- `ButtonContext` → props for button behavior

**Characteristics**:

- Contain fully-formed, accessibility-safe props
- May include metadata for rendering purposes
- Are optional — consumers can exist with or without them
- Enable prop merging without prop drilling

**Purpose**: Ensure accessibility props land on the correct DOM elements while avoiding prop drilling.

**How They Work**:

Contexts act as a communication channel:

1. **Provider** - A parent component (usually a slot) provides the context with calculated props
2. **Consumer** - A child component (usually a primitive) consumes the context
3. **Merging** - The consumer merges context props with its own local props
4. **Rendering** - The final merged props are applied to the DOM element

---

### 4. Slots

**Definition**: Sub-components within complex components that provide contexts for their children.

**Examples**: `TextField.Label`, `TextField.Input`, `TextField.ErrorField`

**Characteristics**:

- Receive calculated props from the root component
- Provide one or more contexts via Context Providers
- Allow any children that consume the provided contexts
- Enable flexible composition and customization

**Purpose**: Create composable slots where users can plug in primitives or custom components.

**How They Work**:

Slots bridge the root component and primitives:

1. **Receive slot props** - Use the slot system to get props calculated by the root
2. **Wrap in context** - Provide context(s) that match the expected primitive types
3. **Render children** - Allow any children that consume the provided context(s)
4. **Enable flexibility** - Users can pass in library primitives or custom components

---

## Architecture Flow

The complete flow from root to DOM:

1. User defines structure:

   ```tsx
   <TextField.Root isRequired>
     <TextField.Label>
       <Label>Username</Label>
     </TextField.Label>
   </TextField.Root>
   ```

2. Root calculates props:
   TextFieldRoot receives isRequired
   ↓
   Calls React Aria's useTextField(isRequired)
   ↓
   Gets `{ labelProps: { id: "field-1", htmlFor: "input-1" }, ... }`
   ↓
   Stores in slot system

3. Slot provides context:
   TextFieldLabel requests 'label' slot props
   ↓
   Receives `{ id: "field-1", htmlFor: "input-1" }`
   ↓
   Provides LabelContext with these props

4. Primitive consumes context:
   Label reads LabelContext
   ↓
   Gets `{ id: "field-1", htmlFor: "input-1" }`
   ↓
   Merges with local props
   ↓
   Renders `<label id="field-1" htmlFor="input-1">Username</label>`

---

## Architecture Principles

### Explicit Composition Over Defaults

NovaWaveUI does **not** provide default renderings. Users must explicitly compose all parts of a component:

```tsx
// ✅ Explicit composition
<TextField.Root>
  <TextField.Label><Label>Username</Label></TextField.Label>
  <TextField.Input>
    <Input placeholder="Enter username" />
  </TextField.Input>
  <TextField.Description><Text>Must be unique</Text></TextField.Description>
  <TextField.ErrorField><ErrorField>Required field</ErrorField></TextField.ErrorField>
</TextField.Root>

// ❌ No magic defaults
<TextField.Root /> // Won't render anything meaningful
```

**Rationale**:

- **Clarity**: Structure is immediately visible
- **No surprises**: No hidden defaults to discover
- **Predictability**: What you write is what you get
- **Flexibility**: Users control layout and structure entirely

---

### Context-Based Prop Merging

Components use contexts to merge props from parent components with local props, avoiding prop drilling.

**How Prop Merging Works**:

```tsx
// 1. Slot provides context
<LabelContext.Provider value={{ id: 'field-1', htmlFor: 'input-1' }}>
  <Label className="custom-class">Username</Label>
</LabelContext.Provider>;

// 2. Primitive consumes and merges
function Label(props: LabelProps) {
  const contextProps = React.useContext(LabelContext);
  // contextProps = { id: "field-1", htmlFor: "input-1" }
  // props = { className: "custom-class", children: "Username" }

  const mergedProps = { ...contextProps, ...props };
  // mergedProps = { id: "field-1", htmlFor: "input-1", className: "custom-class", children: "Username" }

  return <label {...mergedProps} />;
}

// 3. Final output
<label id="field-1" htmlFor="input-1" className="custom-class">
  Username
</label>;
```

**Merge Priority**: `contextProps` < `localProps`

Local props always override context props, giving users final control.

---

## Implementation Patterns

### Primitive Implementation

```typescript
// 1. Define props interface
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  // Any additional props
}

// 2. Create context
export const LabelContext = React.createContext<Partial<LabelProps>>({});

// 3. Implement primitive
export function Label(props: LabelProps) {
  // Consume context
  const contextProps = React.useContext(LabelContext);

  // Merge: context < local props
  const mergedProps = {
    ...contextProps,
    ...props,
  };

  return <label {...mergedProps}>{props.children}</label>;
}
```

---

### Complex Component Root Implementation

```typescript
export function TextFieldRoot(props: TextFieldProps) {
  // 1. Use React Aria to calculate props for all slots
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props);

  // 2. Create slot system with calculated props
  const slots = createSlotSystem({
    label: labelProps,
    input: inputProps,
    description: descriptionProps,
    error: errorMessageProps,
  });

  // 3. Provide slots to children
  return (
    <TextFieldSlotsProvider value={slots}>
      <div>{props.children}</div>
    </TextFieldSlotsProvider>
  );
}
```

---

### Slot Implementation

```typescript
export function TextFieldLabel(props: { children?: React.ReactNode }) {
  // 1. Request props from slot system
  const slotProps = TextFieldSlots.useSlot('label', {});

  // 2. Prepare context value
  const labelProps = {
    ...slotProps,
  };

  // 3. Provide context and render children
  return (
    <LabelContext.Provider value={labelProps}>
      {props.children}
    </LabelContext.Provider>
  );
}
```

**Multi-Context Slots**:

Some slots provide multiple contexts for flexibility:

```typescript
export function TextFieldInput(props: { children?: React.ReactNode }) {
  const slotProps = TextFieldSlots.useSlot('input', {});

  // Provide both Input and TextArea contexts
  // Users can plug in either primitive
  return (
    <TextAreaContext.Provider value={slotProps}>
      <InputContext.Provider value={slotProps}>
        {props.children}
      </InputContext.Provider>
    </TextAreaContext.Provider>
  );
}

// Usage - either works
<TextField.Input>
  <Input /> {/* Consumes InputContext */}
</TextField.Input>

<TextField.Input>
  <TextArea /> {/* Consumes TextAreaContext */}
</TextField.Input>
```

---

### Usage Pattern

```tsx
// Complete TextField example
<TextField.Root name="username" isRequired validationBehavior="native">
  <TextField.Label>
    <Label>Username</Label>
  </TextField.Label>

  <TextField.Input>
    <Input placeholder="Enter your username" />
  </TextField.Input>

  <TextField.Description>
    <Text>Must be unique across the platform</Text>
  </TextField.Description>

  <TextField.ErrorField>
    <ErrorField>
      {({ validationErrors }) => validationErrors.join(', ')}
    </ErrorField>
  </TextField.ErrorField>
</TextField.Root>
```

---

## User Customization

### Creating Custom Wrappers

Users can create simplified versions for their use cases:

```typescript
// User's CustomTextField.tsx
export function CustomTextField({ label, error, description, ...props }) {
  return (
    <TextField.Root {...props}>
      <TextField.Label>
        <Label>{label}</Label>
      </TextField.Label>

      <TextField.Input>
        <Input />
      </TextField.Input>

      {description && (
        <TextField.Description>
          <Text>{description}</Text>
        </TextField.Description>
      )}

      {error && (
        <TextField.ErrorField>
          <ErrorField>{error}</ErrorField>
        </TextField.ErrorField>
      )}
    </TextField.Root>
  );
}

// Simplified usage
<CustomTextField
  label="Username"
  error={errors.username}
  description="Must be unique"
/>
```

---

### Creating Custom Primitives

Users can create their own primitives that consume contexts:

```typescript
// User's custom label with icon
function IconLabel({
  icon,
  children
}: {
  icon: React.ReactNode;
  children: React.ReactNode
}) {
  // Consume the same LabelContext
  const labelProps = React.useContext(LabelContext);

  return (
    <label {...labelProps} className="flex items-center gap-2">
      {icon}
      <span>{children}</span>
    </label>
  );
}

// Usage - works seamlessly with TextField
<TextField.Label>
  <IconLabel icon={<UserIcon />}>Username</IconLabel>
</TextField.Label>
```

**Key Point**: Custom primitives access the same contexts, so they receive the same accessibility props. This maintains the wiring while allowing full customization.

---

### Composing Complex Components

Complex components can use other complex components as slots:

```typescript
// Example: A FormField that uses TextField
<FormField.Root>
  <FormField.Label>
    <Label>Account Details</Label>
  </FormField.Label>

  <FormField.Content>
    {/* TextField is a complex component used within FormField */}
    <TextField.Root name="username" isRequired>
      <TextField.Label><Label>Username</Label></TextField.Label>
      <TextField.Input><Input /></TextField.Input>
      <TextField.ErrorField><ErrorField /></TextField.ErrorField>
    </TextField.Root>
  </FormField.Content>
</FormField.Root>
```

This demonstrates the composability - primitives compose into complex components, which compose into even larger patterns.

---

## Design Philosophy

### Library Responsibilities

NovaWaveUI provides:

- ✅ Accessibility wiring via React Aria
- ✅ Context system for prop distribution
- ✅ Composable primitives and slots
- ✅ Clear contracts between components

NovaWaveUI does **not** provide:

- ❌ Layout opinions
- ❌ Default component structures
- ❌ Magic behaviors
- ❌ Hidden abstractions

---

### User Responsibilities

Users control:

- ✅ Component structure and composition
- ✅ Layout and positioning
- ✅ Defaults and abstractions (via wrapper components)
- ✅ Custom primitive implementations

---

### Why This Approach

1. **Maximum Flexibility**: Users aren't fighting the library; they're building on it
2. **Clear Contracts**: Contexts define exact prop requirements
3. **Accessibility First**: React Aria ensures components are accessible by default
4. **No Surprises**: Explicit composition means no hidden behaviors
5. **Composable**: Primitives → Complex Components → User Compositions
6. **Maintainable**: Simple, predictable patterns that scale

---

## Benefits

### For Library Maintainers

- Simpler codebase (no complex default logic)
- Clear separation of concerns
- Easier to test (predictable data flow)
- Fewer edge cases to handle

### For Library Users

- Complete control over structure
- Can create abstractions that match their needs
- No fighting default behaviors
- Clear, predictable API
- Easy to understand and debug
- Can build custom primitives that work seamlessly

---

## Summary

NovaWaveUI's slot and primitive architecture provides a **foundation, not a framework**. It gives users the building blocks (primitives), the composition system (slots), and the wiring (contexts) they need while letting them make all the decisions about structure and presentation.

The architecture follows a clear data flow:

- **Root** calculates props
- **Slots** distribute props via contexts
- **Primitives** consume contexts and render DOM
- **Users** compose everything explicitly

This approach aligns with the principle: **Explicit verbosity serves clarity**. The extra lines of code communicate intent clearly, not just to you, but to everyone who reads the code.
