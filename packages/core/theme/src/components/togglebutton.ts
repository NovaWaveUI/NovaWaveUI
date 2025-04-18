import {
  createNonSlotComposer,
  ExtractVariantNonSlottedProps,
} from '@novawaveui/tailwind-composer';

export const toggleButtonStyles = createNonSlotComposer({
  base: 'flex',
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
    isSelected: false,
  },
  compoundVariants: [
    {
      variant: 'solid',
      isSelected: false,
      className: 'bg-neutral-200 text-neutral-900 hover:bg-neutral-300',
    },
  ],
});

export type ToggleButtonStyles = typeof toggleButtonStyles;
export type ToggleButtonVariantProps =
  ExtractVariantNonSlottedProps<ToggleButtonStyles>;
