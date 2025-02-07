import { tv, VariantProps } from 'tailwind-variants';
import { bordered, solid } from '../common/styles';

export const buttonStyles = tv({
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
    'data-[hover=true]:opacity-(--opacity-hover)',
  ],
  variants: {
    variant: {
      solid: '',
      faded: 'bg-transparent',
      bordered: 'bg-transparent border border-solid',
      ghost: 'bg-transparent border border-solid',
      light: '',
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
  },
  compoundVariants: [
    {
      color: 'neutral',
      variant: 'solid',
      className: solid.neutral,
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
  ],
});

export type ButtonStyles = typeof buttonStyles;

export type ButtonVariantProps = VariantProps<ButtonStyles>;
