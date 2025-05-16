# Overview

The ToggleButton component is a UI element that allows users to switch between two states, typically "on" and "off". It operates similarly to a checkbox or switch, in that it can be toggled between two states.

## Checkbox Vs Switch Vs ToggleButton

- **Checkbox**: A checkbox is a binary input that allows users to select or deselect an option. It is typically represented as a square box that can be checked or unchecked.
- **Switch**: A switch is a UI element that allows users to toggle between two states, typically "on" and "off". It is often represented as a sliding button or toggle that moves between two positions.
- **ToggleButton**: A ToggleButton is a specialized version of a switch that is often used in a group of buttons to represent multiple options. It can be styled to look like a button, and it can also have additional features such as icons or labels.

ToggleButtons also work in groups, compared to switches. The group can allow for a single active button or multiple active buttons. This is similar to radio buttons and checkboxes, respectively.

## Component Structure

### What is the root element?

button

### How is the component structured?

The main difference between a ToggleButton and a regular button is that the ToggleButton has an additional state to indicate whether it is "on" or "off". This can be represented visually with different colors or styles.

```jsx
<button>{children}</button>
```

### What might the API look like?

```jsx
import { ToggleButton } from '@novawaveui/togglebutton';
import { Icon } from '@novawaveui/icon';

const [isToggled, setIsToggled] = useState(false);
const handleToggle = () => {
  setIsToggled(!isToggled);
};

return (
  <ToggleButton
    variant={isToggled ? 'solid' : 'outline'}
    color="neutral"
    size="medium"
    radius="medium"
    isDisabled={false}
    isToggled={isToggled}
    onClick={chain(buttonProps.onClick, handleToggle)}
  >
    Toggle Me
  </ToggleButton>
);
```

### What slots are available?

N/A

## Design

For the ToggleButton component, they will look similar to the button component, but with a few differences. Since the ToggleButton contains a state, the state will be represented visually with different colors or styles. For all colors, the "off" state will be the neutral color. The "on" state will be the color of the color property.

### Variants

- Solid
- Outline
- Ghost
- Bordered
- Light
- Faded

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

### Is Toggled

- True
- False

There will be a compound variant that matches the variant, color, and toggled state.

## API

### Component Properties

- `variant` (string, optional) - The variant of the button. This can be solid, outline, ghost, bordered, light, or faded.
- `color` (string, optional) - The color of the button. This can be neutral, primary, secondary, success, warning, or danger.
- `size` (string, optional) - The size of the button. This can be small, medium, or large.
- `radius` (string, optional) - The radius of the button. This can be none, small, medium, large, extra large, or full.
- `isDisabled` (boolean, optional) - Whether the button is disabled or not. This can be true or false.
- `isToggled` (boolean, optional) - Whether the button is toggled or not. This can be true or false. This allows for the button to be controlled outside of the component. If this is not set, the button will be controlled internally.
- `isIconOnly` (boolean, optional) - Whether the button is icon only or not. This can be true or false.
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
- `data-toggled` - Provided when the button is currently toggled.
- `data-icon-only` - Provided when the button is currently icon only.
- `data-has-start-content` - Provided when the button has start content.
- `data-has-end-content` - Provided when the button has end content.

### Component Behavior

When the button is idle, it is expected to do nothing more than to provide a visual presence. For users on the web (using a mouse), when the button is hovered over (the state where the mouse is over the element but has not been pressed), it is expected that the button provides some visual indication to help give a clean sign on where the cursor is and what clicking will activate. For users navigating with the keyboard, there should be an outline on the button that indicates that an enter / space will activate the button. When the button is currently being pressed down with a mouse or keyboard, the button should give a visual indication that the button is currently being pressed.

### Internal State

The ToggleButton component has an internal state that tracks whether it is toggled or not. This state is controlled by the `isToggled` prop, which can be set to true or false. If the `isToggled` prop is not set, the component will control its own state.

## Accessibility

### Concerns

A [link](https://www.w3.org/WAI/ARIA/apg/patterns/button/) to W3C best practices.

## Additional Notes
