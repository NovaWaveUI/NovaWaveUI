import { describe, it, expect } from 'vitest';
import { createNonSlotVariants } from '../index.js';
import { ExtractVariantProps } from '../types.js';

describe('createNonSlotVariants', () => {
  it('should return base styles when no variants are provided', () => {
    const getClassName = createNonSlotVariants({
      base: 'base-style',
      variants: {},
    });
    expect(getClassName()).toBe('base-style');
  });

  it('should apply default variants', () => {
    const getClassName = createNonSlotVariants({
      base: 'base-style',
      variants: {
        color: {
          primary: 'text-blue-50',
          secondary: 'text-purple-50',
        },
      },
      defaultVariants: {
        color: 'primary',
      },
    });
    expect(getClassName()).toBe('base-style text-blue-50');
  });

  it('should apply provided variants', () => {
    const getClassName = createNonSlotVariants({
      base: 'base-style',
      variants: {
        color: {
          primary: 'text-blue-50',
          secondary: 'text-purple-50',
        },
      },
    });
    expect(getClassName({ color: 'secondary' })).toBe(
      'base-style text-purple-50'
    );
    expect(getClassName({ color: 'primary' })).toBe('base-style text-blue-50');
  });

  it('should apply compound variants', () => {
    const getClassName = createNonSlotVariants({
      base: 'base-style',
      variants: {
        color: {
          primary: 'text-blue-50',
          secondary: 'text-purple-50',
        },
        size: {
          small: 'text-sm',
          large: 'text-lg',
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          size: 'large',
          className: 'compound-class',
        },
      ],
    });
    expect(getClassName({ color: 'primary', size: 'large' })).toBe(
      'base-style text-blue-50 text-lg compound-class'
    );
  });

  it('should handle conflicting classes', () => {
    const getClassName = createNonSlotVariants({
      base: 'base-style text-md',
      variants: {
        color: {
          primary: 'text-blue-50',
          secondary: 'text-purple-50',
        },
        size: {
          small: 'text-sm',
          large: 'text-lg',
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          size: 'large',
          className: 'compound-class',
        },
      ],
      defaultVariants: {
        color: 'primary',
        size: 'large',
      },
    });
    expect(getClassName()).toBe(
      'base-style text-blue-50 text-lg compound-class'
    );
    expect(getClassName({ color: 'secondary' })).toBe(
      'base-style text-purple-50 text-lg'
    );
    expect(getClassName({ size: 'small' })).toBe(
      'base-style text-blue-50 text-sm'
    );
  });

  it('should still handle resolving classes when no default variants are provided', () => {
    const getClassName = createNonSlotVariants({
      base: 'base-style',
      variants: {
        color: {
          primary: 'text-blue-50',
          secondary: 'text-purple-50',
        },
        size: {
          small: 'text-sm',
          large: 'text-lg',
        },
      },
    });
    expect(getClassName()).toBe('base-style text-blue-50 text-sm');
    expect(getClassName({ color: 'secondary' })).toBe(
      'base-style text-purple-50 text-sm'
    );
  });

  it('should handle extending variants', () => {
    const getClassName = createNonSlotVariants({
      base: 'base-style',
      variants: {
        color: {
          primary: 'text-blue-50',
          secondary: 'text-purple-50',
        },
      },
      defaultVariants: {
        color: 'primary',
      },
    });
    expect(getClassName()).toBe('base-style text-blue-50');

    const getExtendedClassName = getClassName.extend({
      variants: {
        color: {
          warning: 'text-yellow-50',
        },
        size: {
          small: 'text-sm',
          large: 'text-lg',
        },
      },
    });
    expect(getExtendedClassName({ size: 'large' })).toBe(
      'base-style text-blue-50 text-lg'
    );
    expect(getExtendedClassName({ color: 'warning' })).toBe(
      'base-style text-yellow-50 text-sm'
    );
    expect(getExtendedClassName({ color: 'secondary', size: 'small' })).toBe(
      'base-style text-purple-50 text-sm'
    );
    expect(getExtendedClassName({ color: 'primary', size: 'large' })).toBe(
      'base-style text-blue-50 text-lg'
    );
    expect(getExtendedClassName()).toBe('base-style text-blue-50 text-sm');
  });

  it('should handle a test of real world examples', () => {
    const novaWaveIconStyles = createNonSlotVariants({
      base: '',
      variants: {
        color: {
          primary: 'text-primary',
          secondary: 'text-secondary',
          success: 'text-success',
          warning: 'text-warning',
          danger: 'text-danger',
          auto: 'text-auto',
        },
      },
      defaultVariants: {
        color: 'auto',
      },
    });

    expect(novaWaveIconStyles()).toBe('text-auto');
    expect(novaWaveIconStyles({ color: 'primary' })).toBe('text-primary');
    expect(novaWaveIconStyles({ color: 'secondary' })).toBe('text-secondary');
    expect(novaWaveIconStyles({ color: 'success' })).toBe('text-success');
    expect(novaWaveIconStyles({ color: 'warning' })).toBe('text-warning');
    expect(novaWaveIconStyles({ color: 'danger' })).toBe('text-danger');
    expect(novaWaveIconStyles({ color: 'auto' })).toBe('text-auto');

    const extendedNovaWaveIconStyles = novaWaveIconStyles.extend({
      variants: {
        color: {
          // You can add new values to existing variants!
          brand: 'text-brand',
          // You can override!
          primary: 'text-primary-test',
        },
        // You can even add new variants!
        size: {
          small: 'text-sm',
          large: 'text-lg',
        },
      },
    });

    expect(extendedNovaWaveIconStyles()).toBe('text-auto text-sm');
    expect(extendedNovaWaveIconStyles({ color: 'primary' })).toBe(
      'text-primary-test text-sm'
    );
    expect(extendedNovaWaveIconStyles({ size: 'large' })).toBe(
      'text-auto text-lg'
    );

    const buttonStyles = createNonSlotVariants({
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
          true: 'pointer-events-none opacity-50',
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
          className: 'solid-neutral',
        },
        {
          color: 'primary',
          variant: 'solid',
          className: 'solid.primary',
        },
        {
          color: 'secondary',
          variant: 'solid',
          className: 'solid.secondary',
        },
        {
          color: 'success',
          variant: 'solid',
          className: 'solid.success',
        },
        {
          color: 'warning',
          variant: 'solid',
          className: 'solid.warning',
        },
        {
          color: 'danger',
          variant: 'solid',
          className: 'solid.danger',
        },
        {
          color: 'neutral',
          variant: 'bordered',
          className: 'bordered.neutral',
        },
        {
          color: 'primary',
          variant: 'bordered',
          className: 'bordered.primary',
        },
        {
          color: 'secondary',
          variant: 'bordered',
          className: 'bordered.secondary',
        },
        {
          color: 'success',
          variant: 'bordered',
          className: 'bordered.success',
        },
        {
          color: 'warning',
          variant: 'bordered',
          className: 'bordered.warning',
        },
        {
          color: 'danger',
          variant: 'bordered',
          className: 'bordered.danger',
        },
        {
          color: 'neutral',
          variant: 'light',
          className: ['light.neutral', 'data-[hover=true]:bg-neutral/20'],
        },
        {
          color: 'primary',
          variant: 'light',
          className: ['light.primary', 'data-[hover=true]:bg-primary/20'],
        },
        {
          color: 'secondary',
          variant: 'light',
          className: ['light.secondary', 'data-[hover=true]:bg-secondary/20'],
        },
        {
          color: 'success',
          variant: 'light',
          className: ['light.success', 'data-[hover=true]:bg-success/20'],
        },
        {
          color: 'warning',
          variant: 'light',
          className: ['light.warning', 'data-[hover=true]:bg-warning/20'],
        },
        {
          color: 'danger',
          variant: 'light',
          className: ['light.danger', 'data-[hover=true]:bg-danger/20'],
        },
        {
          color: 'neutral',
          variant: 'faded',
          className: 'faded.neutral',
        },
        {
          color: 'primary',
          variant: 'faded',
          className: 'faded.primary',
        },
        {
          color: 'secondary',
          variant: 'faded',
          className: 'faded.secondary',
        },
        {
          color: 'success',
          variant: 'faded',
          className: 'faded.success',
        },
        {
          color: 'warning',
          variant: 'faded',
          className: 'faded.warning',
        },
        {
          color: 'danger',
          variant: 'faded',
          className: 'faded.danger',
        },
        {
          color: 'neutral',
          variant: 'ghost',
          className: [
            'ghost.neutral',
            'data-[hover=true]:!bg-neutral-background',
            'data-[hover=true]:!text-neutral-foreground',
          ],
        },
        {
          color: 'primary',
          variant: 'ghost',
          className: [
            'ghost.primary',
            'data-[hover=true]:!bg-primary-background',
            'data-[hover=true]:!text-primary-foreground',
          ],
        },
        {
          color: 'secondary',
          variant: 'ghost',
          className: [
            'ghost.secondary',
            'data-[hover=true]:!bg-secondary-background',
            'data-[hover=true]:!text-secondary-foreground',
          ],
        },
        {
          color: 'success',
          variant: 'ghost',
          className: [
            'ghost.success',
            'data-[hover=true]:!bg-success-background',
            'data-[hover=true]:!text-success-foreground',
          ],
        },
        {
          color: 'warning',
          variant: 'ghost',
          className: [
            'ghost.warning',
            'data-[hover=true]:!bg-warning-background',
            'data-[hover=true]:!text-warning-foreground',
          ],
        },
        {
          color: 'danger',
          variant: 'ghost',
          className: [
            'ghost.danger',
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

    expect(buttonStyles()).toBe(
      'z-0 group inline-flex relative flex-row items-center justify-center outline-hidden select-none text-wrap overflow-hidden data-[pressed=true]:scale-95 px-4 min-w-20 min-h-10 gap-2 text-base rounded-medium [&>svg]:max-w-8 motion-reduce:transition-none solid-neutral'
    );
    expect(buttonStyles({ color: 'primary' })).toBe(
      'z-0 group inline-flex relative flex-row items-center justify-center outline-hidden select-none text-wrap overflow-hidden data-[pressed=true]:scale-95 px-4 min-w-20 min-h-10 gap-2 text-base rounded-medium [&>svg]:max-w-8 motion-reduce:transition-none solid.primary'
    );
  });

  it('should handle boolean variants', () => {
    const getClassName = createNonSlotVariants({
      base: 'base-style',
      variants: {
        isActive: {
          true: 'active',
          false: 'inactive',
        },
        isDisabled: {
          true: 'disabled',
        },
        isLoading: {
          false: 'not-loading',
        },
      },
    });

    expect(getClassName()).toBe('base-style inactive not-loading');
    expect(getClassName({ isActive: true })).toBe(
      'base-style active not-loading'
    );
    expect(getClassName({ isActive: false })).toBe(
      'base-style inactive not-loading'
    );
    expect(getClassName({ isDisabled: true })).toBe(
      'base-style inactive disabled not-loading'
    );
    expect(getClassName({ isLoading: false })).toBe(
      'base-style inactive not-loading'
    );
    expect(getClassName({ isActive: true, isDisabled: true })).toBe(
      'base-style active disabled not-loading'
    );
    expect(getClassName({ isLoading: true })).toBe('base-style inactive');
    expect(getClassName({ isDisabled: false })).toBe(
      'base-style inactive not-loading'
    );

    const isActive = false;
    const isDisabled = true;
    const isLoading = false;

    expect(getClassName({ isActive, isDisabled, isLoading })).toBe(
      'base-style inactive disabled not-loading'
    );
  });

  it('should test the extract variant type', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getClassName = createNonSlotVariants({
      base: 'base-style',
      variants: {
        color: {
          primary: 'text-blue-50',
          secondary: 'text-purple-50',
        },
        size: {
          small: 'text-sm',
          large: 'text-lg',
        },
      },
    });

    type Variants = ExtractVariantProps<typeof getClassName>;
    interface TestInterface extends Variants {
      customProp: string;
    }

    const testObject: TestInterface = {
      color: 'primary',
      size: 'small',
      customProp: 'test',
    };

    expect(testObject.color).toBe('primary');
    expect(testObject.size).toBe('small');
    expect(testObject.customProp).toBe('test');
  });
});
