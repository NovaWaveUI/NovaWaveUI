# Overview

The checkbox component is used to allow users to select one or more options from a set. A set can be one or more items. For example, a user can select multiple items of food from a menu, or the checkbox can be used to agree to terms and conditions.

## Component Structure

### What is the root element?

div

### How is the component structured?

(What would the pseudo HTML look like? You can add the slots to the markup)

```jsx
<root>
  <inputWrapper>
    <input type="checkbox" />
  </inputWrapper>
</root>
```

### What might the API look like?

(What might the API look like?)

```jsx
<Checkbox color="primary" size="md" radius="lg" isDefaultChecked>
  Label
</Checkbox>
```

### What slots are available?

N/A

## Design

### Variants

(What are the different variants available?)

### Color

- Neutral
- Primary
- Secondary
- Success
- Warning
- Danger

### Size

- Small
- Medium
- Large

### Radius

- None
- Small
- Medium
- Large
- Extra Large
- Full

### Is Disabled

- True
- False

## API

### Component Properties

(What properties are available?)

### Data Attributes

(What data attributes are available?)

### Component Behavior

(What are the behaviors of the component?)

### Internal State

(What are the internal states of the component?)

## Accessibility

### Concerns

A [link](https://www.w3.org/WAI/ARIA) to W3C best practices.

## Additional Notes
