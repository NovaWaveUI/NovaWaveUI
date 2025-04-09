import { describe, expect, it } from '@jest/globals';
import { createNonSlotComposer } from '../composer';

describe('createNonSlotVariants', () => {
  it('should handle a basic common configuration', () => {
    const testConfig = createNonSlotComposer({
      base: ['base-class', 'array-of-classes', ['array-of-classes-part-2']],
      variants: {
        color: {
          primary: 'text-blue-500',
          secondary: 'text-green-500',
          danger: 'text-red-500',
        },
        isDisabled: {
          true: 'opacity-50 cursor-not-allowed',
        },
        isBig: {
          true: 'text-lg',
          false: 'text-sm',
        },
        isHappy: {
          false: 'text-gray-700',
        },
        size: {
          sm: 'text-xs',
          md: 'text-sm',
          lg: 'text-lg',
        },
      },
      defaultVariants: {
        color: 'primary',
        isDisabled: true,
        isBig: false,
        size: 'md',
      },
    });

    let result = testConfig({ color: 'secondary' });
    let expectedResult = [
      'base-class',
      'array-of-classes',
      'array-of-classes-part-2',
      'text-green-500',
      'cursor-not-allowed',
      'opacity-50',
      'text-sm',
    ];
    // @ts-expect-error - toHaveClasses is a custom matcher
    expect(result).toHaveClass(expectedResult);

    result = testConfig({ color: 'primary', isDisabled: false });
    expectedResult = [
      'base-class',
      'array-of-classes',
      'array-of-classes-part-2',
      'text-blue-500',
      'text-sm',
    ];
    // @ts-expect-error - toHaveClasses is a custom matcher
    expect(result).toHaveClass(expectedResult);
  });

  it('should handle an extended configuration', () => {
    const extraClasses = ['z-10', 'ring-primary-background'];

    const testConfig = createNonSlotComposer({
      base: ['base-class', extraClasses],
      variants: {
        color: {
          neutral: 'text-neutral-foreground bg-neutral',
          primary: 'text-primary-foreground bg-primary',
          secondary: 'text-secondary-foreground bg-secondary',
          success: 'text-success-foreground bg-success',
          warning: 'text-warning-foreground bg-warning',
          danger: 'text-danger-foreground bg-danger',
        },
        size: {
          sm: 'px-2 py-1 text-sm',
          md: 'px-4 py-2 text-md',
          lg: 'px-6 py-3 text-lg',
        },
        isDisabled: {
          true: 'opacity-50 cursor-not-allowed',
        },
      },
      defaultVariants: {
        isDisabled: false,
        color: 'neutral',
        size: 'md',
      },
    });

    let result = testConfig({ color: 'primary', size: 'lg' });
    let expectedResult = [
      'base-class',
      'z-10',
      'ring-primary-background',
      'text-primary-foreground',
      'bg-primary',
      'px-6',
      'py-3',
      'text-lg',
    ];
    // @ts-expect-error - toHaveClasses is a custom matcher
    expect(result).toHaveClass(expectedResult);

    result = testConfig({ color: 'danger', isDisabled: true });
    expectedResult = [
      'base-class',
      'z-10',
      'ring-primary-background',
      'text-danger-foreground',
      'bg-danger',
      'opacity-50',
      'cursor-not-allowed',
      'px-4',
      'py-2',
      'text-md',
    ];
    // @ts-expect-error - toHaveClasses is a custom matcher
    expect(result).toHaveClass(expectedResult);

    const extendedConfig = testConfig.extend({
      variants: {
        color: {
          info: 'text-info-foreground bg-info',
          olive: 'text-olive-foreground bg-olive',
        },
        radius: {
          sm: 'rounded-sm',
          md: 'rounded-md',
          lg: 'rounded-lg',
          full: 'rounded-full',
        },
        size: {
          xl: 'px-8 py-4 text-xl',
        },
      },
      defaultVariants: {
        color: 'info',
        size: 'xl',
        radius: 'full',
      },
      compoundVariants: [
        {
          color: 'olive',
          size: 'xl',
          className: 'text-olive-foreground bg-olive',
        },
      ],
    });

    result = extendedConfig({ color: 'olive', size: 'xl' });
    expectedResult = [
      'base-class',
      'z-10',
      'ring-primary-background',
      'text-olive-foreground',
      'bg-olive',
      'px-8',
      'py-4',
      'text-xl',
      'rounded-full',
    ];
    // @ts-expect-error - toHaveClasses is a custom matcher
    expect(result).toHaveClass(expectedResult);

    result = extendedConfig({ color: 'info', size: 'lg', radius: 'md' });
    expectedResult = [
      'base-class',
      'z-10',
      'ring-primary-background',
      'text-info-foreground',
      'bg-info',
      'px-6',
      'py-3',
      'text-lg',
      'rounded-md',
    ];
    // @ts-expect-error - toHaveClasses is a custom matcher
    expect(result).toHaveClass(expectedResult);
  });

  it('should handle a configuration with compound variants', () => {
    const testConfig = createNonSlotComposer({
      base: ['z-10', 'flex', 'items-center'],
      variants: {
        color: {
          primary: '',
          secondary: '',
          danger: '',
        },
        size: {
          sm: 'text-xs',
          md: 'text-sm',
          lg: 'text-lg',
        },
        variant: {
          solid: '',
          outline: 'border-2 bg-transparent',
        },
      },
      defaultVariants: {
        color: 'primary',
        size: 'md',
        variant: 'solid',
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          className: 'bg-primary text-primary-foreground',
        },
        {
          color: 'secondary',
          variant: 'solid',
          className: 'bg-secondary text-secondary-foreground',
        },
        {
          color: 'danger',
          variant: 'solid',
          className: 'bg-danger text-danger-foreground',
        },
        {
          color: 'primary',
          variant: 'outline',
          className: 'border-primary text-primary-foreground',
        },
        {
          color: 'secondary',
          variant: 'outline',
          className: 'border-secondary text-secondary-foreground',
        },
        {
          color: 'danger',
          variant: 'outline',
          className: 'border-danger text-danger-foreground',
        },
      ],
    });

    let result = testConfig({ color: 'primary', variant: 'solid' });
    let expectedResult = [
      'z-10',
      'flex',
      'items-center',
      'bg-primary',
      'text-primary-foreground',
      'text-sm',
    ];
    // @ts-expect-error - toHaveClasses is a custom matcher
    expect(result).toHaveClass(expectedResult);

    result = testConfig({ color: 'secondary', variant: 'outline' });
    expectedResult = [
      'z-10',
      'flex',
      'items-center',
      'border-secondary',
      'text-secondary-foreground',
      'border-2',
      'bg-transparent',
      'text-sm',
    ];
    // @ts-expect-error - toHaveClasses is a custom matcher
    expect(result).toHaveClass(expectedResult);
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

  it('should work with a real example', () => {
    const buttonStyles = createNonSlotComposer({
      base: [
        'z-0',
        'group',
        'inline-flex',
        'relative',
        'flex-row',
        'items-center',
        'justify-center',
        'min-w-max',
        'outline-hidden',
        'select-none',
        'text-wrap',
        'overflow-hidden',
        'data-[pressed=true]:scale-95',
        'pointer-events-auto',
      ],
      variants: {
        variant: {
          solid: '',
          faded: '',
          bordered: 'bg-transparent border-2 border-solid',
          ghost: 'bg-transparent border-2 border-solid',
          light: 'bg-transparent',
        },
        color: {
          neutral: '',
          primary: '',
          secondary: '',
          success: '',
          warning: '',
          danger: '',
        },
        size: {
          sm: 'px-3 min-w-16 min-h-8 gap-2 text-sm',
          md: 'px-4 min-w-20 min-h-10 gap-2 text-base',
          lg: 'px-6 min-w-24 min-h-12 gap-3 text-lg',
        },
        radius: {
          none: 'rounded-none',
          sm: 'rounded-small',
          md: 'rounded-medium',
          lg: 'rounded-large',
          xl: 'rounded-xlarge',
          full: 'rounded-full',
        },
        isDisabled: {
          true: '!pointer-events-none opacity-50',
        },
        isIconOnly: {
          true: 'px-0 !gap-0',
          false: '[&>svg]:max-w-8',
        },
        isInGroup: {
          true: 'not-first:not-last:rounded-none',
        },
        isVertical: {
          true: '',
        },
        fullWidth: {
          true: 'w-full',
        },
        disableAnimations: {
          true: '!transition-none data-[pressed=true]:scale-100',
          false: 'motion-reduce:transition-none',
        },
      },
      defaultVariants: {
        color: 'neutral',
        variant: 'solid',
        size: 'md',
        radius: 'md',
        isIconOnly: false,
        isDisabled: false,
      },
      compoundVariants: [
        {
          color: 'neutral',
          variant: 'solid',
          className: 'neutral-solid',
        },
        {
          color: 'primary',
          variant: 'solid',
          className: 'solid-primary',
        },
        {
          color: 'secondary',
          variant: 'solid',
          className: 'solid-secondary',
        },
        {
          color: 'success',
          variant: 'solid',
          className: 'solid-success',
        },
        {
          color: 'warning',
          variant: 'solid',
          className: 'solid-warning',
        },
        {
          color: 'danger',
          variant: 'solid',
          className: 'solid-danger',
        },
        {
          color: 'neutral',
          variant: 'bordered',
          className: 'bordered-neutral',
        },
        {
          color: 'primary',
          variant: 'bordered',
          className: 'bordered-primary',
        },
        {
          color: 'secondary',
          variant: 'bordered',
          className: 'bordered-secondary',
        },
        {
          color: 'success',
          variant: 'bordered',
          className: 'bordered-success',
        },
        {
          color: 'warning',
          variant: 'bordered',
          className: 'bordered-warning',
        },
        {
          color: 'danger',
          variant: 'bordered',
          className: 'bordered-danger',
        },
        {
          color: 'neutral',
          variant: 'light',
          className: 'light-neutral',
        },
        {
          color: 'primary',
          variant: 'light',
          className: 'light-primary',
        },
        {
          color: 'secondary',
          variant: 'light',
          className: 'light-secondary',
        },
        {
          color: 'success',
          variant: 'light',
          className: 'light-success',
        },
        {
          color: 'warning',
          variant: 'light',
          className: 'light-warning',
        },
        {
          color: 'danger',
          variant: 'light',
          className: 'light-danger',
        },
        {
          color: 'neutral',
          variant: 'faded',
          className: 'faded-neutral',
        },
        {
          color: 'primary',
          variant: 'faded',
          className: 'faded-primary',
        },
        {
          color: 'secondary',
          variant: 'faded',
          className: 'faded-secondary',
        },
        {
          color: 'success',
          variant: 'faded',
          className: 'faded-success',
        },
        {
          color: 'warning',
          variant: 'faded',
          className: 'faded-warning',
        },
        {
          color: 'danger',
          variant: 'faded',
          className: 'faded-danger',
        },
        {
          color: 'neutral',
          variant: 'ghost',
          className: [
            'data-[hover=true]:!bg-neutral-background',
            'data-[hover=true]:!text-neutral-foreground',
          ],
        },
        {
          color: 'primary',
          variant: 'ghost',
          className: [
            'data-[hover=true]:!bg-primary-background',
            'data-[hover=true]:!text-primary-foreground',
          ],
        },
        {
          color: 'secondary',
          variant: 'ghost',
          className: [
            'data-[hover=true]:!bg-secondary-background',
            'data-[hover=true]:!text-secondary-foreground',
          ],
        },
        {
          color: 'success',
          variant: 'ghost',
          className: [
            'data-[hover=true]:!bg-success-background',
            'data-[hover=true]:!text-success-foreground',
          ],
        },
        {
          color: 'warning',
          variant: 'ghost',
          className: [
            'data-[hover=true]:!bg-warning-background',
            'data-[hover=true]:!text-warning-foreground',
          ],
        },
        {
          color: 'danger',
          variant: 'ghost',
          className: [
            'data-[hover=true]:!bg-danger-background',
            'data-[hover=true]:!text-danger-foreground',
          ],
        },
        {
          isIconOnly: true,
          size: 'sm',
          class: 'min-w-8 w-8 h-8',
        },
        {
          isIconOnly: true,
          size: 'md',
          class: 'min-w-10 w-10 h-10',
        },
        {
          isIconOnly: true,
          size: 'lg',
          class: 'min-w-12 w-12 h-12',
        },
        // Grouped buttons
        // In a group with no radius, all buttons will be rounded-none so distinguishing between vertical and horizontal is not necessary
        {
          isInGroup: true,
          radius: 'none',
          class: 'rounded-none',
        },
        // Is horizontal
        {
          isInGroup: true,
          isVertical: false,
          radius: 'sm',
          class: '!rounded-none first:!rounded-s-small last:!rounded-e-small',
        },
        {
          isInGroup: true,
          isVertical: false,
          radius: 'md',
          class: '!rounded-none first:!rounded-s-medium last:!rounded-e-medium',
        },
        {
          isInGroup: true,
          isVertical: false,
          radius: 'lg',
          class: '!rounded-none first:!rounded-s-large last:!rounded-e-large',
        },
        {
          isInGroup: true,
          isVertical: false,
          radius: 'xl',
          class: '!rounded-none first:!rounded-s-xlarge last:!rounded-e-xlarge',
        },
        {
          isInGroup: true,
          isVertical: false,
          radius: 'full',
          class: '!rounded-none first:!rounded-s-full last:!rounded-e-full',
        },
        // Is vertical
        {
          isInGroup: true,
          isVertical: true,
          radius: 'sm',
          class: '!rounded-none first:!rounded-t-small last:rounded-b-small',
        },
        {
          isInGroup: true,
          isVertical: true,
          radius: 'md',
          class: '!rounded-none first:!rounded-t-medium last:!rounded-b-medium',
        },
        {
          isInGroup: true,
          isVertical: true,
          radius: 'lg',
          class: '!rounded-none first:!rounded-t-large last:!rounded-b-large',
        },
        {
          isInGroup: true,
          isVertical: true,
          radius: 'xl',
          class: '!rounded-none first:!rounded-t-xlarge last:!rounded-b-xlarge',
        },
        {
          isInGroup: true,
          isVertical: true,
          radius: 'full',
          class: '!rounded-none first:!rounded-t-full last:!rounded-b-full',
        },
        {
          isInGroup: true,
          isVertical: false,
          variant: ['ghost', 'bordered'],
          className:
            'first:border-r-1 not-first:not-last:border-r-1 not-first:not-last:border-l-1 last:border-l-1',
        },
        {
          isInGroup: true,
          isVertical: true,
          variant: ['ghost', 'bordered'],
          className:
            'first:border-b-1 not-first:not-last:border-b-1 not-first:not-last:border-t-1 last:border-t-1',
        },
      ],
    });

    const extendedButtonStyles = buttonStyles.extend({
      variants: {
        color: {
          slate: '',
          teal: '',
        },
      },
      compoundVariants: [
        {
          variant: 'solid',
          color: 'slate',
          className: 'slate-btn-solid',
        },
        {
          variant: 'solid',
          color: 'teal',
          className: 'teal-btn-solid',
        },
      ],
    });

    const result = extendedButtonStyles({ color: 'slate' });
    const resultExpected = [
      'z-0',
      'group',
      'inline-flex',
      'relative',
      'flex-row',
      'items-center',
      'justify-center',
      'outline-hidden',
      'select-none',
      'text-wrap',
      'overflow-hidden',
      'data-[pressed=true]:scale-95',
      'pointer-events-auto',
      'slate-btn-solid',
      '[&>svg]:max-w-8',
      'gap-2',
      'px-4',
      'min-w-20',
      'min-h-10',
      'text-base',
      'rounded-medium',
    ];
    // @ts-expect-error toHaveClass is a custom matcher
    expect(result).toHaveClass(resultExpected);
  });
});
