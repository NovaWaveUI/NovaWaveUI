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

export const buttonStyles = createNonSlotComposer({
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
      className: solid.primary,
    },
    {
      color: 'secondary',
      variant: 'solid',
      className: solid.secondary,
    },
    {
      color: 'success',
      variant: 'solid',
      className: solid.success,
    },
    {
      color: 'warning',
      variant: 'solid',
      className: solid.warning,
    },
    {
      color: 'danger',
      variant: 'solid',
      className: solid.danger,
    },
    {
      color: 'neutral',
      variant: 'bordered',
      className: bordered.neutral,
    },
    {
      color: 'primary',
      variant: 'bordered',
      className: bordered.primary,
    },
    {
      color: 'secondary',
      variant: 'bordered',
      className: bordered.secondary,
    },
    {
      color: 'success',
      variant: 'bordered',
      className: bordered.success,
    },
    {
      color: 'warning',
      variant: 'bordered',
      className: bordered.warning,
    },
    {
      color: 'danger',
      variant: 'bordered',
      className: bordered.danger,
    },
    {
      color: 'neutral',
      variant: 'light',
      className: light.neutral,
    },
    {
      color: 'primary',
      variant: 'light',
      className: light.primary,
    },
    {
      color: 'secondary',
      variant: 'light',
      className: light.secondary,
    },
    {
      color: 'success',
      variant: 'light',
      className: light.success,
    },
    {
      color: 'warning',
      variant: 'light',
      className: light.warning,
    },
    {
      color: 'danger',
      variant: 'light',
      className: light.danger,
    },
    {
      color: 'neutral',
      variant: 'faded',
      className: faded.neutral,
    },
    {
      color: 'primary',
      variant: 'faded',
      className: faded.primary,
    },
    {
      color: 'secondary',
      variant: 'faded',
      className: faded.secondary,
    },
    {
      color: 'success',
      variant: 'faded',
      className: faded.success,
    },
    {
      color: 'warning',
      variant: 'faded',
      className: faded.warning,
    },
    {
      color: 'danger',
      variant: 'faded',
      className: faded.danger,
    },
    {
      color: 'neutral',
      variant: 'ghost',
      className: [
        ...ghost.neutral,
        'data-[hover=true]:!bg-neutral-background',
        'data-[hover=true]:!text-neutral-foreground',
      ],
    },
    {
      color: 'primary',
      variant: 'ghost',
      className: [
        ...ghost.primary,
        'data-[hover=true]:!bg-primary-background',
        'data-[hover=true]:!text-primary-foreground',
      ],
    },
    {
      color: 'secondary',
      variant: 'ghost',
      className: [
        ...ghost.secondary,
        'data-[hover=true]:!bg-secondary-background',
        'data-[hover=true]:!text-secondary-foreground',
      ],
    },
    {
      color: 'success',
      variant: 'ghost',
      className: [
        ...ghost.success,
        'data-[hover=true]:!bg-success-background',
        'data-[hover=true]:!text-success-foreground',
      ],
    },
    {
      color: 'warning',
      variant: 'ghost',
      className: [
        ...ghost.warning,
        'data-[hover=true]:!bg-warning-background',
        'data-[hover=true]:!text-warning-foreground',
      ],
    },
    {
      color: 'danger',
      variant: 'ghost',
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

export const buttonGroup = createNonSlotComposer({
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

export type ButtonStyles = typeof buttonStyles;
export type ButtonGroupStyles = typeof buttonGroup;
export type ButtonVariantProps = ExtractVariantNonSlottedProps<ButtonStyles>;
export type ButtonGroupVariantProps =
  ExtractVariantNonSlottedProps<ButtonGroupStyles>;
