import { expect, describe, it } from '@jest/globals';
import { createNonSlotComposer } from '../composer';

describe('createNonSlotComposer - default', () => {
  it('should work with a basic configuration', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
        color: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        isDisabled: {
          true: 'btn-disabled',
        },
      },
      defaultVariants: {
        color: 'primary',
        isDisabled: false,
      },
    });

    // Provided size and isDisabled
    let result = buttonStyles({
      size: 'lg',
      isDisabled: true,
    });

    let resultExpected = ['btn', 'btn-lg', 'btn-primary', 'btn-disabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(result);

    result = buttonStyles({
      color: 'secondary',
    });

    resultExpected = ['btn', 'btn-secondary'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles();
    resultExpected = ['btn', 'btn-primary'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work without variants', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
    });

    const result = buttonStyles();
    const resultExpected = ['btn'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with variants', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
      },
    });

    const result = buttonStyles({ size: 'lg' });
    const resultExpected = ['btn', 'btn-lg'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with no configuration passed', () => {
    const buttonStyles = createNonSlotComposer({});

    const result = buttonStyles();
    const resultExpected = '';
    expect(result).toBe(resultExpected);
  });

  it('should work with boolean variants', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        isDisabled: {
          true: 'btn-disabled',
          false: 'btn-enabled',
        },
      },
    });

    let result = buttonStyles({ isDisabled: true });
    let resultExpected = ['btn', 'btn-disabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles({ isDisabled: false });
    resultExpected = ['btn', 'btn-enabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with both boolean values for the variant and default values provided', () => {
    let buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        isDisabled: {
          true: 'btn-disabled',
          false: 'btn-enabled',
        },
      },
      defaultVariants: {
        isDisabled: false,
      },
    });

    let result = buttonStyles();
    let resultExpected = ['btn', 'btn-enabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles({ isDisabled: true });
    resultExpected = ['btn', 'btn-disabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        isDisabled: {
          true: 'btn-disabled',
          false: 'btn-enabled',
        },
      },
      defaultVariants: {
        isDisabled: true,
      },
    });

    result = buttonStyles();
    resultExpected = ['btn', 'btn-disabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles({ isDisabled: false });
    resultExpected = ['btn', 'btn-enabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with just a true value for a boolean variant', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        isDisabled: {
          true: 'btn-disabled',
        },
      },
    });

    const result = buttonStyles({ isDisabled: true });
    const resultExpected = ['btn', 'btn-disabled'];
    // @ts-expect-error toHaveClass is a custom
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with just a false value for a boolean variant', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        isDisabled: {
          false: 'btn-enabled',
        },
      },
    });

    const result = buttonStyles({ isDisabled: false });
    const resultExpected = ['btn', 'btn-enabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with just a true value for a boolean variant and a default value', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        isDisabled: {
          true: 'btn-disabled',
        },
      },
      defaultVariants: {
        isDisabled: true,
      },
    });

    let result = buttonStyles();
    let resultExpected = ['btn', 'btn-disabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles({ isDisabled: false });
    resultExpected = ['btn'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with just a false value for a boolean variant and a default value', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        isDisabled: {
          false: 'btn-enabled',
        },
      },
      defaultVariants: {
        isDisabled: false,
      },
    });

    let result = buttonStyles();
    let resultExpected = ['btn', 'btn-enabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles({ isDisabled: true });
    resultExpected = ['btn'];
    // @ts-expect-error toHaveClass is a custom
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with a default value opposite to the boolean variant', () => {
    let buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        isDisabled: {
          true: 'btn-disabled',
        },
      },
      defaultVariants: {
        isDisabled: false,
      },
    });

    let result = buttonStyles();
    let resultExpected = ['btn'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles({ isDisabled: true });
    resultExpected = ['btn', 'btn-disabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        isDisabled: {
          false: 'btn-enabled',
        },
      },
      defaultVariants: {
        isDisabled: true,
      },
    });

    result = buttonStyles();
    resultExpected = ['btn'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles({ isDisabled: false });
    resultExpected = ['btn', 'btn-enabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with variantKeys', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        color: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
        isDisabled: {
          true: 'btn-disabled',
        },
        isBig: {
          false: 'btn-small',
        },
        radius: {
          sm: 'rounded-sm',
          md: 'rounded-md',
          lg: 'rounded-lg',
        },
      },
    });

    const expectedResult = ['color', 'size', 'isDisabled', 'isBig', 'radius'];
    expect(buttonStyles.variantKeys).toEqual(expectedResult);
  });

  it('should work with compound variants', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        color: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
        isDisabled: {
          true: 'btn-disabled',
        },
        isBig: {
          true: 'btn-small',
        },
        radius: {
          sm: 'rounded-sm',
          md: 'rounded-md',
          lg: 'rounded-lg',
        },
      },
      defaultVariants: {
        isDisabled: false,
        isBig: false,
      },
      compoundVariants: [
        {
          size: 'lg',
          color: 'primary',
          radius: 'sm',
          className: 'btn--size-lg--color-primary--radius-sm',
        },
        {
          size: 'lg',
          radius: 'lg',
          className: 'btn--size-lg--radius-lg',
        },
        {
          size: 'sm',
          color: ['primary', 'secondary'],
          className: 'btn--size-sm--color-primary-secondary',
        },
      ],
    });

    let result = buttonStyles({ size: 'lg', color: 'primary', radius: 'sm' });
    let resultExpected = [
      'btn',
      'btn-lg',
      'btn-primary',
      'rounded-sm',
      'btn--size-lg--color-primary--radius-sm',
    ];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles({ size: 'lg', radius: 'lg' });
    resultExpected = ['btn', 'btn-lg', 'rounded-lg', 'btn--size-lg--radius-lg'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles({ size: 'sm', color: 'primary' });
    resultExpected = [
      'btn',
      'btn-sm',
      'btn-primary',
      'btn--size-sm--color-primary-secondary',
    ];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles({ size: 'sm', color: 'secondary' });
    resultExpected = [
      'btn',
      'btn-sm',
      'btn-secondary',
      'btn--size-sm--color-primary-secondary',
    ];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with the extend function', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        color: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
        isDisabled: {
          false: 'btn-enabled',
        },
      },
    });

    const extendedButtonStyles = buttonStyles.extend({
      variants: {
        isDisabled: {
          true: 'btn-disabled',
        },
        color: {
          tertiary: 'btn-tertiary',
          primary: 'btn-primary-extended',
        },
      },
      defaultVariants: {
        isDisabled: false,
      },
    });

    let result = extendedButtonStyles({
      color: 'tertiary',
      size: 'lg',
      isDisabled: true,
    });

    let resultExpected = ['btn', 'btn-lg', 'btn-tertiary', 'btn-disabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = extendedButtonStyles({
      color: 'primary',
      size: 'sm',
    });

    resultExpected = ['btn', 'btn-sm', 'btn-enabled', 'btn-primary-extended'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work even if an invalid option for a variant is provided', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        color: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
        isDisabled: {
          true: 'btn-disabled',
        },
      },
    });

    const result = buttonStyles({
      size: 'lg',
      // @ts-expect-error - This is an invalid value for the color variant
      color: 'tertiary',
      isDisabled: true,
    });

    const resultExpected = ['btn', 'btn-lg', 'btn-disabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with a compound variant that has a class prop', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        color: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
        isDisabled: {
          true: 'btn-disabled',
        },
      },
      compoundVariants: [
        {
          size: 'lg',
          color: 'primary',
          class: 'btn--size-lg--color-primary',
        },
        {
          size: 'sm',
          color: 'secondary',
          class: 'btn--size-sm--color-secondary',
        },
      ],
    });

    const result = buttonStyles({
      size: 'lg',
      color: 'primary',
      isDisabled: false,
    });
    const resultExpected = [
      'btn',
      'btn-lg',
      'btn-primary',
      'btn--size-lg--color-primary',
    ];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with an additional compound variant from an extended composer', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        color: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
        isDisabled: {
          true: 'btn-disabled',
        },
      },
      defaultVariants: {
        isDisabled: false,
      },
      compoundVariants: [
        {
          size: 'lg',
          color: 'primary',
          class: 'btn--size-lg--color-primary',
        },
      ],
    });

    const extendedButtonStyles = buttonStyles.extend({
      compoundVariants: [
        {
          size: 'lg',
          color: 'secondary',
          class: 'btn--size-lg--color-secondary',
        },
      ],
    });

    let result = extendedButtonStyles({ size: 'lg', color: 'secondary' });
    let resultExpected = [
      'btn',
      'btn-lg',
      'btn-secondary',
      'btn--size-lg--color-secondary',
    ];
    // @ts-expect-error toHaveClass is a custom
    expect(result).toHaveClass(resultExpected);

    result = extendedButtonStyles({ size: 'lg', color: 'primary' });
    resultExpected = [
      'btn',
      'btn-lg',
      'btn-primary',
      'btn--size-lg--color-primary',
    ];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should work with an additional compound variant that includes a new variant and value', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        color: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
        isDisabled: {
          true: 'btn-disabled',
        },
      },
      defaultVariants: {
        isDisabled: false,
      },
      compoundVariants: [
        {
          size: 'lg',
          color: 'primary',
          class: 'btn--size-lg--color-primary',
        },
      ],
    });

    const extendedButtonStyles = buttonStyles.extend({
      variants: {
        color: {
          tertiary: 'btn-tertiary',
        },
      },
      defaultVariants: {
        color: 'tertiary',
      },
      compoundVariants: [
        {
          size: 'lg',
          color: 'secondary',
          className: 'btn--size-lg--color-secondary',
        },
        {
          size: 'sm',
          color: 'primary',
          className: 'btn--size-sm--color-primary',
        },
        {
          size: 'sm',
          color: 'secondary',
          className: 'btn--size-sm--color-secondary',
        },
        {
          size: 'sm',
          color: 'tertiary',
          className: 'btn--size-sm--color-tertiary',
        },
      ],
    });

    let result = extendedButtonStyles({ size: 'sm', color: 'primary' });
    let resultExpected = [
      'btn',
      'btn-sm',
      'btn-primary',
      'btn--size-sm--color-primary',
    ];
    // @ts-expect-error toHaveClass is a custom
    expect(result).toHaveClass(resultExpected);

    result = extendedButtonStyles({ size: 'sm', color: 'secondary' });
    resultExpected = [
      'btn',
      'btn-sm',
      'btn-secondary',
      'btn--size-sm--color-secondary',
    ];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = extendedButtonStyles({ size: 'sm' });
    resultExpected = [
      'btn',
      'btn-sm',
      'btn-tertiary',
      'btn--size-sm--color-tertiary',
    ];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });

  it('should skip applying variants if not passed in or defined in the default', () => {
    const buttonStyles = createNonSlotComposer({
      base: 'btn',
      variants: {
        color: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
        size: {
          sm: 'btn-sm',
          md: 'btn-md',
          lg: 'btn-lg',
        },
        isDisabled: {
          true: 'btn-disabled',
        },
      },
      defaultVariants: {
        color: 'primary',
      },
    });

    let result = buttonStyles({ size: 'lg', isDisabled: true });
    let resultExpected = ['btn', 'btn-lg', 'btn-primary', 'btn-disabled'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles({ size: 'lg' });
    resultExpected = ['btn', 'btn-lg', 'btn-primary'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });
});
