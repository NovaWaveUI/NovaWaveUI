# Overview

The **Button** component in NovaWaveUI is a **beautiful, simple, accessible, yet powerful** interactive element. Designed with both aesthetics and functionality in mind, it seamlessly integrates into various UI contexts, ensuring a delightful user experience.

NovaWaveUI's Button is:

- **Accessible** – Compliant with WCAG standards, with built-in support for screen readers and keyboard navigation.
- **Customizable** – Supports variants, sizes, icons, and states to fit different design needs.
- **Performant** – Optimized for fast rendering and minimal overhead.

Whether used in forms, modals, toolbars, or interactive elements, the Button component offers a clean design while maintaining extensive customization options.

## Component Structure

### What is the root element?

button

### How is the component structured?

(What would the pseudo HTML look like? You can add the slots to the markup)

```jsx
<button>{children}</button>
```

### What might the API look like?

```jsx
<Button color="primary" size="md" radius="lg">
  Click Me
</Button>
```

### What slots are available?

N/A

## Design

### Variants

- Solid - A button with a solid color background with accessible text on top.
  - For light mode, the background is closer to the dark shades while in dark mode it is the lighter shades. This provides the most amount of contrast. These buttons are typically associated with “call to action” or the primary action button (like a submit button).
- Bordered - A bordered button with the colored text. The background is transparent.
- Ghost - A button that idle looks like the bordered variant, but on hover and press acts like the solid variant.
- Light - A button that has “light” background with “dark” text
  - For light mode, the background color is closer to the lighter shades and the text is closer to the darker shades. This is vice versa for dark mode.
- Faded - A button where in the idle state shows text only, and hover and active states will show a light background (like the light variant)

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

### Is Icon Only

- True
- False

### Is Loading

- True
- False

## API

### Component Properties

- `color` (string, optional) - The color of the button. Defaults to **neutral**.
  - Options: `neutral`, `primary`, `secondary`, `success`, `warning`, `danger`
- `variant` (string, optional) - The variant of the button. Defaults to **solid**.
  - Options: `solid`, `bordered`, `ghost`, `faded`, `light`
- `size` (string, optional) - The size of the button. Defaults to **md**.
  - Options: `sm`, `md`, `lg`
- `radius` (string, optional) - The radius of the button. Defaults to **md**.
  - Options: `none`, `sm`, `md`, `lg`, `xl`, `full`
- `isDisabled` (boolean, optional) - Whether or not the button is to be able interacted with. Defaults to **false**
- `isLoading` (boolean, optional) - Whether or not the button is indicating it is loading (or waiting for something). Defaults to **false**.
- `isIconOnly` (boolean, optional) - Whether or not the button contains only an icon (or icons) in it. Defaults to **false**.
- `startContent` (ReactNode, optional) - This is content that would go before the provided child element. This is optional as you can design the child to look the same, but it provides an opinionated way of designing the start content. Start content is relative to the direction of the page (RTL or LTR)
- `endContent` (ReactNode, optional) - This is content that would go after the provided child element. This is optional as you can design the child to look the same, but it provides an easy and opinionated way of designing the end content. End content is relative to the direction of the page (RTL or LTR).
- `className` (string, optional) - Any styles to override the button with. The styles provided by `className` take precedence in styling and will override any styles (like background color, padding, and so on).
- `children` (ReactNode, optional) - The content to appear in the button. This could include a custom design of the children or just the content that goes between the startContent and endContent (if present).
- `ariaLabel` (string, optional) - For icon only button, it is highly suggested for the `aria-label` attribute to be present (to help assistive technologies).

### Data Attributes

- `data-pressed` - Provided when the button is currently being pressed.
- `data-hover` - Provided when the button is currently being hovered over.
- `data-focus` - Provided when the button is being focused.
- `data-focus-visible` - Provided when the button is being focused by a keyboard.
- `data-disabled`- Provided when the button is disabled from any further interactions.
- `data-loading` - Provided when the button is currently in the loading state.
- `data-has-start-content` - Provided when the button has start content available.
- `data-has-end-content` - Provided when the button has end content available.

### Component Behavior

When the button is idle, it is expected to do nothing more than to provide a visual presence. For users on the web (using a mouse), when the button is hovered over (the state where the mouse is over the element but has not been pressed), it is expected that the button provides some visual indication to help give a clean sign on where the cursor is and what clicking will activate. For users navigating with the keyboard, there should be an outline on the button that indicates that an enter / space will activate the button. When the button is currently being pressed down with a mouse or keyboard, the button should give a visual indication that the button is currently being pressed.

### Internal State

The component itself does not hold any internal state.

## Accessibility

### Concerns

A [link](https://www.w3.org/WAI/ARIA/apg/patterns/button/) to W3C best practices.

## Additional Notes
