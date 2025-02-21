import { tv, VariantProps } from 'tailwind-variants';
import { bordered, faded, ghost, light, solid } from '../common/styles';

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
      className: ghost.neutral,
    },
    {
      color: 'primary',
      variant: 'ghost',
      className: ghost.primary,
    },
    {
      color: 'secondary',
      variant: 'ghost',
      className: ghost.secondary,
    },
    {
      color: 'success',
      variant: 'ghost',
      className: ghost.success,
    },
    {
      color: 'warning',
      variant: 'ghost',
      className: ghost.warning,
    },
    {
      color: 'danger',
      variant: 'ghost',
      className: ghost.danger,
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
  ],
});

const buttonGroup = tv({
  base: 'inline-flex items-center justify-center h-auto',
  variants: {
    fullWidth: {
      true: 'w-full',
    },
  },
  defaultVariants: {
    fullWidth: false,
  },
});

export type ButtonStyles = typeof buttonStyles;
export type ButtonGroupStyles = typeof buttonGroup;
export type ButtonVariantProps = VariantProps<ButtonStyles>;
export type ButtonGroupVariantProps = VariantProps<ButtonGroupStyles>;
