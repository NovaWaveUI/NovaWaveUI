# tailwind-composer Code Design / Outline

## Table of Contents

- [Introduction](#introduction)
- [Definitions](#definitions)
- [Goals](#goals)
- [Design](#design)
  - [Overview](#overview)
  - [Tools](#tools)
  - [Psuedo Code](#psuedo-code)
  - [Types](#types)

## Introduction

This document outlines the design and goals of the tailwind-composer project. It outlines why the project was created, what it aims to achieve, and how it will be implemented. The how it will be implemented section will include the tools and a general thought process for the design.

There will be some sort of psuedo code to help outline the design and thought process.

### Tailwind Composer

Tailwind Composer is a typescript built library that allows for the definition of a component design using a slot-based approach. This allows for complex states of a component that is reflected by tailwind classes.

Tailwind Composer allows the user to define a component design using an optional slot-based approach. A component design is a collection of tailwind classes that define the component depending on the state. The user can define a non-slot or slot-based component.

#### How It Works

The user defines a component design using a configuration. This configuration contains a variety of customization in order to define the component. In order to allow for complex designs, tailwind merge is used to merge classes together so that there can be a hierarchy of classes allowing for overriding and default styles. Here are the options in the configuration:

##### Non-Slot Based Component

- `base` - The base tailwind classes that are used for the component. These classes apply in every state / variant of the component. These classes will be applied first but can be overriden by variants / compound variants.
- `extends` - The styles to inherit from another design definition. This allows for reusing of styles. These get applied after the base but before the variants / compound variants.
- `variants` - A list of different options for the component. Each variant has a value and a value of tailwind classes. The value is used to determine which variant is applied. These get applied after the extends but before the compound variants. For example, a button component could have a `color` variant. The `color` variant could have different values like `primary`, `secondary`, `success`, etc. The value of the variant is used to determine which variant is applied. The value of the variant can include many different styles. Variants are also applied in the order of definition. So if another variant would change the style of a variant above, the new variant would override the previous variant's conflicting styles. For example, if a `color` variant is defined after a `size` variant and the `color` variant changes the padding, the padding would be changed.
- `compoundVariants` - Compound variants are a list of conditions of when to apply another style. These are applied after the variants. For example, you can say that when a button is `primary` for `color` and `sm` for `size` that you can apply a different style. Compound variants are applied in the order of definition. So if another compound variant would change the style of a compound variant above, the new compound variant would override the previous compound variant's conflicting styles. Compound variants are applied after the variants. For example, if a `color` variant is defined after a `size` variant and the `color` variant changes the padding, the padding would be changed. There can be many different compound variants as they are a list of conditions of when a variant is active. So `primary` and `sm` could be one, and `secondary` and `lg` could be another. You can also list multiple values per variant. For example, you can say that when a button is `primary` or `secondary` and `sm` for `size` that you can apply a different style.
- `defaultVariants` - The default value for each variant. If not specified, the first value of the variant is used. This is useful for when you pass in no variant values to the styles.

Below is an example of a component design configuration. This includes various variants and what the expected output would be.

```typescript
const buttonStyle = createVariants({
    base: 'flex z-0 items-center justify-center max-w-full px-4 py-2',
    extends: [ focusRingStyles, hoverStyles ],
    variants: {
        color: {
            primary: 'text-white bg-blue-500',
            secondary: 'text-white bg-gray-500',
            success: 'text-white bg-green-500',
            danger: 'text-white bg-red-500',
        },
        style: {
            solid: '',
            outline: 'bg-transparent border',
        }
        size: {
            sm: 'text-sm px-2 py-1',
            md: 'text-md px-3 py-2',
            lg: 'text-lg px-4 py-3',
        },
        radius: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            full: 'rounded-full',
        },
        isDisabled: {
            true: 'cursor-not-allowed opacity-50',
        }
    },
    compoundVariants: [
        {
            color: 'primary',
            style: 'outline',
            className: 'text-blue-500 border-blue-500',
        },
        {
            color: 'secondary',
            style: 'outline',
            className: 'text-gray-500 border-gray-500',
        },
        {
            color: 'success',
            style: 'outline',
            className: 'text-green-500 border-green-500',
        },
        {
            color: 'danger',
            style: 'outline',
            className: 'text-red-500 border-red-500',
        },
        {
            color: ['primary', 'secondary'],
            size: 'sm',
            className: 'text-sm px-2 py-1',
        },
        {
            color: ['primary', 'secondary'],
            size: 'md',
            className: 'text-md px-3 py-2',
        },
        {
            color: ['primary', 'secondary'],
            size: 'lg',
            className: 'text-lg px-4 py-3',
        },
    ],
    defaultVariants: {
        color: 'primary',
        style: 'solid',
        size: 'md',
        radius: 'md',
        isDisabled: false,
    }
});

const buttonStyles = buttonStyle({
    color: 'primary',
    style: 'outline',
    size: 'sm',
    radius: 'md',
    isDisabled: false,
});

// Usage
<button className={buttonStyles}>
    Button
</button>

// Output
buttonStyles: "flex z-0 items-center justify-center max-w-full bg-blue-500 text-blue-500 border-blue-500 text-sm px-2 py-1 rounded-md"
```

##### Slot Based Component

Slot-based components share everything above but there is a couple of extra options along with some changes to the existing options.

- `slots`: A list of the slots. Each slot has a name and a list of base tailwind classes to apply to the slot. Much like the `base` option above, `slots` helps define what slots are available and the base styles for each one. `base` is not used in slot-based components. So variants apply to the slots one by one. All slots need to be defined here (even if there is no style needed).
- `variants`: The `variants` option here is the same as above, except for the value of each different value of the variant it is a record of the slot name and the tailwind classes to apply to the slot. This allows for the user to define different styles for each slot depending on the variant. This is useful for when you want to change the style of a slot depending on the variant. For example, you could have a `color` variant that changes the color of the text in the `title` slot. You do not have to list all slots in the `variants` option. If it is not defined, then it is not applied.
- `compoundVariants`: The `compoundVariants` option here is the same as above, except for the value of each different value of the variant it is a record of the slot name and the tailwind classes to apply to the slot. This allows for the user to define different styles for each slot depending on the compound variant. This is useful for when you want to change the style of a slot depending on the compound variant. For example, you could have a `color` variant that changes the color of the text in the `title` slot when the button is `primary` and `sm` for `size`. You do not have to list all slots in the `compoundVariants` option. If it is not defined, then it is not applied.

The `defaultVariants` still stays the same.

Below is an example of a slot-based component design configuration. This includes various variants and what the expected output would be.

```typescript
const cardStyle = createVariants({
    slots: {
        root: 'flex flex-col bg-white shadow-md rounded-md',
        header: 'flex items-center justify-between p-4 border-b',
        title: 'text-lg font-bold',
        content: 'p-4',
        footer: 'flex items-center justify-between p-4 border-t',
    },
    extends: [ focusRingStyles, hoverStyles ],
    variants: {
        color: {
            primary: {
                root: 'bg-blue-500 text-white',
                title: 'text-blue-700',
            },
            secondary: {
                root: 'bg-gray-500 text-white',
                title: 'text-gray-700',
            },
            success: {
                root: 'bg-green-500 text-white',
                title: 'text-green-700',
            },
            danger: {
                root: 'bg-red-500 text-white',
                title: 'text-red-700',
            },
        },
        size: {
            sm: {
                root: 'w-64 h-32',
                header: 'p-2',
                content: 'p-2',
                footer: 'p-2',
            },
            md: {
                root: 'w-96 h-48',
                header: 'p-4',
                content: 'p-4',
                footer: 'p-4',
            },
            lg: {
                root: 'w-full h-full',
                header: 'p-6',
                content: 'p-6',
                footer: 'p-6',
            },
        },
    },
    compoundVariants: [
        {
            color: ['primary', 'secondary'],
            size: ['sm', 'md'],
            className:
              {root:'w-full h-full', header:'p-6', content:'p-6', footer:'p-6'},
        },
    ],
    defaultVariants:{
        color:'primary'
        size:'md'
    }
});

const { root, header, title, content, footer } = cardStyle({
    color: 'primary',
    size: 'sm',
});
// Usage
<div className={root()}>
    <div className={header()}>
        <h2 className={title()}>Card Title</h2>
    </div>
    <div className={content()}>
        Card Content
    </div>
    <div className={footer()}>
        Card Footer
    </div>
</div>

// Output
root().styles(): "flex flex-col bg-blue-500 text-white shadow-md rounded-md w-64 h-32"
header().styles(): "flex items-center justify-between p-2 border-b"
title().styles(): "text-lg font-bold text-blue-700"
content().styles(): "p-2"
footer().styles(): "flex items-center justify-between p-2 border-t"
```

##### Extends

To make `tailwind-composer` unique, each non-slot and slot based components can be extended after the styles are defined. This is useful in case developers want to use the currently defined design but at their own variants and such. This is planned to work when a style is given to a built React component but want to add a new variant. For example, what if you wanted to add a new color to the list of colors? What about a style? What about a new slot? This is where extends comes in. You can extend the current design and add your own variants, compound variants, slots, and such. This is useful for when you want to add your own styles to a component but still want to use the existing design.

NOTE: This is all the hope. I don't know how I will even achieve this yet.

```typescript
const extendedButtonStyle = buttonStyle.extend({
  variants: {
    color: {
      warning: 'text-white bg-yellow-500',
    },
  },
  compoundVariants: [
    {
      color: 'warning',
      className: 'text-yellow-500 border-yellow-500',
    },
  ],
  defaultVariants: {
    color: 'warning',
  },
});
```

```typescript
const extendedCardStyle = cardStyle.extend({
    slots: {
        newSlot: 'flex items-center justify-center p-4',
    }
    variants: {
        color: {
            primary: {
                newSlot: 'bg-blue-500 text-white',
            },
            secondary: {
                newSlot: 'bg-gray-500 text-white',
            },
            success: {
                newSlot: 'bg-green-500 text-white',
            },
            warning: {
                root: 'bg-yellow-500 text-white',
                title: 'text-yellow-700',
            },
        },
    },
    compoundVariants: [
        {
            color: 'warning',
            className:
              {root:'w-full h-full', header:'p-6', content:'p-6', footer:'p-6'},
        },
    ],
    defaultVariants:{
        color:'warning'
    }
});
```

## Definitions

- Tailwind: A utility-first CSS framework for rapidly building custom designs. It is a framework that allows you to build custom designs quickly by using utility classes.
- Slot: A slot is a building block of an overall design / component.
- Variant: A variant is a different style of a component depending on the state. For example, a button can have a `primary` variant that is blue and a `secondary` variant that is gray.
- Compound Variant: A compound variant is a combination of multiple variants. For example, a button can have a `primary` variant and a `sm` size variant that is blue and small.
- Tailwind Merge: A utility that merges tailwind classes together. This is used to merge classes together so that there can be a hierarchy of classes allowing for overriding and default styles.

## Goals

- Define a component design with various variants, slots (if needed), and compound variants.
- Have the ability to extend the design after it has been defined.

## Design

### Overview

The design of tailwind-composer is based on the idea of defining a component design using a variant approach. By giving the styles a value for the variant that you want, you can make endless combination of styles and states. This is done by using a configuration object that defines the component design. The configuration object contains a variety of options that allow you to define the component design.

For non-slot based components, the return value of the `createVariants` function is an object. The object contains two functions. The first function is the `extends` function which extends the styles of the component. The second function is the `styles()` function which returns back the styles of the component. The `styles()` function returns back a function that takes in an object which contains the value for each defined variant. If the value is not defined, then the default value is used for that variant. If that is not defined, then the first value of the variant is used.
The `styles()` function returns back a string of tailwind classes that can be used in the className of a component.

For slot-based components, it is the same until the `styles()` function. This function takes the same variant object but returns back an object of functions. Each function is the name of the slot and returns back a string of tailwind classes that can be used in the className of a component.

```typescript
const buttonStyle = createVariants({
    base: 'flex z-0 items-center justify-center max-w-full px-4 py-2',
    extends: [ focusRingStyles, hoverStyles ],
    variants: {
        color: {
            primary: 'text-white bg-blue-500',
            secondary: 'text-white bg-gray-500',
            success: 'text-white bg-green-500',
            danger: 'text-white bg-red-500',
        },
        style: {
            solid: '',
            outline: 'bg-transparent border',
        }
        size: {
            sm: 'text-sm px-2 py-1',
            md: 'text-md px-3 py-2',
            lg: 'text-lg px-4 py-3',
        },
        radius: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            full: 'rounded-full',
        },
        isDisabled: {
            true: 'cursor-not-allowed opacity-50',
        }
    },
    compoundVariants: [
        {
            color: 'primary',
            style: 'outline',
            className: 'text-blue-500 border-blue-500',
        },
        {
            color: 'secondary',
            style: 'outline',
            className: 'text-gray-500 border-gray-500',
        },
        {
            color: 'success',
            style: 'outline',
            className: 'text-green-500 border-green-500',
        },
        {
            color: 'danger',
            style: 'outline',
            className: 'text-red-500 border-red-500',
        },
        {
            color: ['primary', 'secondary'],
            size: 'sm',
            className: 'text-sm px-2 py-1',
        },
        {
            color: ['primary', 'secondary'],
            size: 'md',
            className: 'text-md px-3 py-2',
        },
        {
            color: ['primary', 'secondary'],
            size: 'lg',
            className: 'text-lg px-4 py-3',
        },
    ],
    defaultVariants: {
        color: 'primary',
        style: 'solid',
        size: 'md',
        radius: 'md',
        isDisabled: false,
    }
});

const buttonStyles = buttonStyle({
    color: 'primary',
    style: 'outline',
    size: 'sm',
    radius: 'md',
    isDisabled: false,
});

// Usage
<button className={buttonStyles.styles()}>
    Button
</button>

// Extend
const extendedButtonStyle = buttonStyle.extend({
  variants: {
    color: {
      warning: 'text-white bg-yellow-500',
    },
  },
  compoundVariants: [
    {
      color: 'warning',
      className: 'text-yellow-500 border-yellow-500',
    },
  ],
  defaultVariants: {
    color: 'warning',
  },
});
```

```typescript
const cardStyle = createVariants({
    slots: {
        root: 'flex flex-col bg-white shadow-md rounded-md',
        header: 'flex items-center justify-between p-4 border-b',
        title: 'text-lg font-bold',
        content: 'p-4',
        footer: 'flex items-center justify-between p-4 border-t',
    },
    extends: [ focusRingStyles, hoverStyles ],
    variants: {
        color: {
            primary: {
                root: 'bg-blue-500 text-white',
                title: 'text-blue-700',
            },
            secondary: {
                root: 'bg-gray-500 text-white',
                title: 'text-gray-700',
            },
            success: {
                root: 'bg-green-500 text-white',
                title: 'text-green-700',
            },
            danger: {
                root: 'bg-red-500 text-white',
                title: 'text-red-700',
            },
        },
        size: {
            sm: {
                root: 'w-64 h-32',
                header: 'p-2',
                content: 'p-2',
                footer: 'p-2',
            },
            md: {
                root: 'w-96 h-48',
                header: 'p-4',
                content: 'p-4',
                footer: 'p-4',
            },
            lg: {
                root: 'w-full h-full',
                header: 'p-6',
                content: 'p-6',
                footer: 'p-6',
            },
        },
    },
    compoundVariants: [
        {
            color: ['primary', 'secondary'],
            size: ['sm', 'md'],
            className:
              {root:'w-full h-full', header:'p-6', content:'p-6', footer:'p-6'},
        },
    ],
    defaultVariants:{
        color:'primary'
        size:'md'
    }
});

const cardStyles = cardStyle({
    color: 'primary',
    size: 'sm',
});

// Usage
<div className={cardStyles.root()}>
    <div className={cardStyles.header()}>
        <h2 className={cardStyles.title()}>Card Title</h2>
    </div>
    <div className={cardStyles.content()}>
        Card Content
    </div>
    <div className={cardStyles.footer()}>
        Card Footer
    </div>
</div>

// Extend
const extendedCardStyle = cardStyle.extend({
    slots: {
        newSlot: 'flex items-center justify-center p-4',
    }
    variants: {
        color: {
            primary: {
                newSlot: 'bg-blue-500 text-white',
            },
            secondary: {
                newSlot: 'bg-gray-500 text-white',
            },
            success: {
                newSlot: 'bg-green-500 text-white',
            },
            warning: {
                root: 'bg-yellow-500 text-white',
                title: 'text-yellow-700',
            },
        },
    },
    compoundVariants: [
        {
            color: 'warning',
            className:
              {root:'w-full h-full', header:'p-6', content:'p-6', footer:'p-6'},
        },
    ],
    defaultVariants:{
        color:'warning'
    }
});
```

### Tools

- Typescript: A superset of JavaScript that adds static types. This is used to define the types of the configuration object and the return value of the `createVariants` function.
- tsup: A typescript bundler that is used to bundle the library.
- eslint: A tool that is used to lint the code and make sure it follows the style guide.
- prettier: A tool that is used to format the code.
- vitest: A testing framework that is used to test the library.

### Libraries

- tailwind-merge: A utility that merges tailwind classes together. This is used to merge classes together so that there can be a hierarchy of classes allowing for overriding and default styles.

### Psuedo Code

```typescript
// Create a function that takes in a configuration object
function createNonSlotVariants(config: ConfigNoSlot) {
    // Define the base styles
    const baseStyles = config.base || '';

    // Define the extends styles
    const extendsStyles = config.extends || [];

    // Define the variants
    const variants = config.variants || {};

    // Define the compound variants
    const compoundVariants = config.compoundVariants || [];

    // Define the default variants
    const defaultVariants = config.defaultVariants || {};

    // The return value is function which produces an object that contains
    // the extend function and the styles function
    const object = Object;

    // Get the styles function
    object.styles = (props: Variants) => {
        let resultStyle = baseStyles;
        // For each style in extended
        for each extendedStyle {
            resultStyle = twMerge(resultStyle, extendedStyle);
        }

        // Go through each variant
        for each variant {
            // Get the value from props if it exists, otherwise use default otherwise use first variant value
            const variantValue = config.variants[variant][props[variant]];

            resultStyle = twMerge(resultStyle, variantValue)
        }

        // Check if the combination of the given variant values
        // matches any compound variant
        // If so then merge the style
        for each compoundVariant {
            if thisCombo is in compoundVariant {
                resultStyle = twMerge(resultStyle, compoundVariant['className'])
            }
        }

        return resultStyle;
    }

    object.extend = (newConfig: ConfigNoSlot) => {
        // Merge the two configs together and return a new version of the styles and extend
        mergeConfig();

        return ...;
    }

}
```
