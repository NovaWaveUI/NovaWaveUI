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

    resultExpected = ['btn', 'btn-sm', 'btn-secondary'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);

    result = buttonStyles();
    resultExpected = ['btn', 'btn-sm', 'btn-primary'];
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

    resultExpected = ['btn', 'btn-sm', 'btn-primary-extended'];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });
});
