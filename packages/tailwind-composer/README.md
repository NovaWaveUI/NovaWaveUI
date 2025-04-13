# Tailwind Composer

Tailwind Composer is a powerful, flexible utility for building complex, multi-slotted, reactive component styles using Tailwind CSS. Designed to integrate seamlessly with React, it leverages twMerge to efficiently handle class merging while offering deep extensibility and customization.

## Why Tailwind Composer?

Unlike traditional approaches, Tailwind Composer is designed to:

- Support slot-based designs – perfect for components with multiple elements (e.g., buttons with icons, cards with headers & footers).
- Provide extendable styles – dynamically add new variants without redefining everything.
- Leverage a hierarchical class system – intelligently applies base styles, variants, compound variants, and extensions.
- Ensure type safety – with full TypeScript support, ensuring valid variants and styles.

## Inspiration

This library is heavily inspired by the amazing work of tailwind-variants. I truly love their approach, and Tailwind Composer was born from my desire to build something similar while exploring different ideas around extendability and customization.

I want to make it clear: tailwind-variants is an incredible library, and I don’t claim to match their level of polish or speed of development. Tailwind Composer is simply my take on a similar concept with a focus on deep customization and slot-based designs.

### Key Differences from Tailwind Variants:

Extending works differently, allowing for more flexibility in modifying existing designs.
No built-in responsive variants (yet) – currently, it focuses on base styles and states.
Designed with a provider-based global customization system in mind.

## Installation

```sh
pnpm add tailwind-composer
# or
npm install tailwind-composer
```

## Usage

### Non-Slotted Components

For single-element components like a button, define base styles, variants, and compound variants.

```tsx
import { createNonSlotVariants } from 'tailwind-composer';

const buttonStyles = createNonSlotVariants({
  base: 'flex items-center justify-center px-4 py-2',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
    },
    size: {
      sm: 'text-sm px-2',
      md: 'text-md px-3',
      lg: 'text-lg px-4',
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      size: 'lg',
      className: 'shadow-lg',
    },
  ],
  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
});

export function Button({ color, size, children }) {
  return <button className={buttonStyles({ color, size })}>{children}</button>;
}
```

### Slotted Components

For components with multiple elements (e.g., a card with a title, content, and footer), use the slotted API.

```tsx
import { createSlottedVariants } from 'tailwind-composer';

const cardStyles = createSlottedVariants({
  slots: {
    root: 'rounded-lg shadow-md',
    header: 'p-4 border-b',
    title: 'text-lg font-bold',
    content: 'p-4',
    footer: 'p-4 border-t',
  },
  variants: {
    color: {
      primary: {
        root: 'bg-blue-500 text-white',
        title: 'text-blue-200',
      },
      secondary: {
        root: 'bg-gray-500 text-white',
        title: 'text-gray-200',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export function Card({ color, children }) {
  const { root, header, title, content, footer } = cardStyles({ color });

  return (
    <div className={root()}>
      <div className={header()}>
        <h2 className={title()}>Card Title</h2>
      </div>
      <div className={content()}>{children}</div>
      <div className={footer()}>Footer</div>
    </div>
  );
}
```

## Extending Styles

One of the most powerful features of Tailwind Composer is dynamic extensibility. You can extend existing styles without redefining the entire configuration.

```tsx
const extendedButtonStyles = buttonStyles.extend({
  variants: {
    color: {
      success: 'bg-green-500 text-white',
    },
  },
  compoundVariants: [
    {
      color: 'success',
      className: 'shadow-lg',
    },
  ],
  defaultVariants: {
    color: 'success',
  },
});
```

## Documentation

Full documentation is coming soon! Stay tuned for guides on:

- Using extend() to modify global styles.
- Best practices for component theming.
- How Tailwind Composer integrates with NovaWaveUIProvider.

## Contributing

I built Tailwind Composer because I love UI development and wanted to explore more customizable ways to handle variants and styles in Tailwind. While this project is something I made for myself first, I’d love for others to use and contribute!

If you find bugs, have ideas, or want to contribute, feel free to open an issue or PR on GitHub. 🚀

## License

MIT License. Feel free to use and modify it as needed.

## Final Thoughts

This library was made with passion and curiosity. It may not be perfect, but it's something I believe in—and I hope you find it useful too.

If you like what I’m building, feel free to give it a ⭐️ on GitHub! 🚀

**Note**: AI was used to generate parts of this README, but all content has been reviewed and edited by me to ensure clarity and accuracy. I'm not great at writing, and I appreciate your understanding! 😊
