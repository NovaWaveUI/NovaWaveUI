import {
  createNonSlotComposer,
  ExtractVariantNonSlottedProps,
} from '@novawaveui/tailwind-composer';
import {
  bordered,
  dataFocusRing,
  faded,
  ghost,
  light,
  solid,
} from '../common/styles';

export const toggleButtonStyles = createNonSlotComposer({
  base: [
    'z-0',
    'group',
    'inline-flex',
    'relative',
    'flex-row',
    'items-center',
    'justify-center',
    'min-w-max',
    'outline-none',
    'select-none',
    'text-wrap',
    'overflow-hidden',
    'pointer-events-auto',
    'cursor-pointer',
    'data-pressed:scale-95',
    ...dataFocusRing,
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
    isSelected: {
      true: '',
      false: '',
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
      false: 'transition-colors motion-reduce:transition-none',
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
      variant: 'solid',
      isSelected: false,
      className:
        'bg-(--tb-background-solid-untoggled) data-hover:bg-(--tb-background-solid-untoggled-hover) data-pressed:bg-(--tb-background-solid-untoggled-active) text-(--tb-text-solid-untoggled)',
    },
    {
      variant: 'bordered',
      isSelected: false,
      className: [
        'border-(--tb-border-bordered-untoggled)',
        'data-hover:border-(--tb-border-bordered-untoggled-hover)',
        'data-pressed:border-(--tb-border-bordered-untoggled-active)',
        'text-(--tb-text-bordered-untoggled)',
      ],
    },
    {
      variant: 'faded',
      isSelected: false,
      className: [
        'bg-(--tb-background-faded-untoggled)',
        'data-hover:bg-(--tb-background-faded-untoggled-hover)',
        'data-pressed:bg-(--tb-background-faded-untoggled-active)',
        'text-(--tb-text-faded-untoggled)',
      ],
    },
    {
      variant: 'ghost',
      isSelected: false,
      className: [
        'border-(--tb-border-ghost-untoggled)',
        'data-hover:border-(--tb-border-ghost-untoggled-hover)',
        'data-pressed:border-(--tb-border-ghost-untoggled-active)',
        'text-(--tb-text-ghost-untoggled)',
        'data-hover:!bg-(--tb-background-ghost-untoggled-hover)',
        'data-pressed:!bg-(--tb-background-ghost-untoggled-active)',
      ],
    },
    {
      color: 'neutral',
      variant: 'solid',
      isSelected: true,
      className: 'neutral-solid',
    },
    {
      color: 'primary',
      variant: 'solid',
      isSelected: true,
      className: solid.primary,
    },
    {
      color: 'secondary',
      variant: 'solid',
      isSelected: true,
      className: solid.secondary,
    },
    {
      color: 'success',
      variant: 'solid',
      isSelected: true,
      className: solid.success,
    },
    {
      color: 'warning',
      variant: 'solid',
      isSelected: true,
      className: solid.warning,
    },
    {
      color: 'danger',
      variant: 'solid',
      isSelected: true,
      className: solid.danger,
    },
    {
      color: 'neutral',
      variant: 'bordered',
      isSelected: true,
      className: bordered.neutral,
    },
    {
      color: 'primary',
      variant: 'bordered',
      isSelected: true,
      className: bordered.primary,
    },
    {
      color: 'secondary',
      variant: 'bordered',
      isSelected: true,
      className: bordered.secondary,
    },
    {
      color: 'success',
      variant: 'bordered',
      isSelected: true,
      className: bordered.success,
    },
    {
      color: 'warning',
      variant: 'bordered',
      isSelected: true,
      className: bordered.warning,
    },
    {
      color: 'danger',
      variant: 'bordered',
      isSelected: true,
      className: bordered.danger,
    },
    {
      color: 'neutral',
      variant: 'light',
      isSelected: true,
      className: light.neutral,
    },
    {
      color: 'primary',
      variant: 'light',
      isSelected: true,
      className: light.primary,
    },
    {
      color: 'secondary',
      variant: 'light',
      isSelected: true,
      className: light.secondary,
    },
    {
      color: 'success',
      variant: 'light',
      isSelected: true,
      className: light.success,
    },
    {
      color: 'warning',
      variant: 'light',
      isSelected: true,
      className: light.warning,
    },
    {
      color: 'danger',
      variant: 'light',
      isSelected: true,
      className: light.danger,
    },
    {
      color: 'neutral',
      variant: 'faded',
      isSelected: true,
      className: faded.neutral,
    },
    {
      color: 'primary',
      variant: 'faded',
      isSelected: true,
      className: faded.primary,
    },
    {
      color: 'secondary',
      variant: 'faded',
      isSelected: true,
      className: faded.secondary,
    },
    {
      color: 'success',
      variant: 'faded',
      isSelected: true,
      className: faded.success,
    },
    {
      color: 'warning',
      variant: 'faded',
      isSelected: true,
      className: faded.warning,
    },
    {
      color: 'danger',
      variant: 'faded',
      isSelected: true,
      className: faded.danger,
    },
    {
      color: 'neutral',
      variant: 'ghost',
      isSelected: true,
      className: [
        ...ghost.neutral,
        'data-[hover=true]:!bg-neutral-background',
        'data-[hover=true]:!text-neutral-foreground',
      ],
    },
    {
      color: 'primary',
      variant: 'ghost',
      isSelected: true,
      className: [
        ...ghost.primary,
        'data-[hover=true]:!bg-primary-background',
        'data-[hover=true]:!text-primary-foreground',
      ],
    },
    {
      color: 'secondary',
      variant: 'ghost',
      isSelected: true,
      className: [
        ...ghost.secondary,
        'data-[hover=true]:!bg-secondary-background',
        'data-[hover=true]:!text-secondary-foreground',
      ],
    },
    {
      color: 'success',
      variant: 'ghost',
      isSelected: true,
      className: [
        ...ghost.success,
        'data-[hover=true]:!bg-success-background',
        'data-[hover=true]:!text-success-foreground',
      ],
    },
    {
      color: 'warning',
      variant: 'ghost',
      isSelected: true,
      className: [
        ...ghost.warning,
        'data-[hover=true]:!bg-warning-background',
        'data-[hover=true]:!text-warning-foreground',
      ],
    },
    {
      color: 'danger',
      variant: 'ghost',
      isSelected: true,
      className: [
        ...ghost.danger,
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

export const toggleButtonGroup = createNonSlotComposer({
  base: 'inline-flex items-center justify-center h-auto',
  variants: {
    fullWidth: {
      true: 'w-full',
    },
    isVertical: {
      true: 'flex-col',
      false: 'flex-row',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type ToggleButtonStyles = typeof toggleButtonStyles;
export type ToggleButtonVariantProps =
  ExtractVariantNonSlottedProps<ToggleButtonStyles>;
export type ToggleButtonGroupStyles = typeof toggleButtonGroup;
export type ToggleButtonGroupVariantProps =
  ExtractVariantNonSlottedProps<ToggleButtonGroupStyles>;
