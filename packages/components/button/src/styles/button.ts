import { tv, VariantProps } from 'tailwind-variants';

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
    'outline-none',
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
      className: 'bg-neutral text-on-neutral',
    },
    {
      color: 'neutral',
      variant: 'light',
      className: 'bg-neutral-subtle text-neutral',
    },
    {
      color: 'neutral',
      variant: 'faded',
      className: 'hover:bg-neutral-subtle text-neutral',
    },
    {
      color: 'neutral',
      variant: 'bordered',
      className: 'border-neutral text-neutral',
    },
    {
      color: 'neutral',
      variant: 'ghost',
      className:
        'border-neutral text-neutral hover:!bg-neutral hover:border-transparent hover:text-on-neutral',
    },
    {
      color: 'primary',
      variant: 'solid',
      className: 'bg-primary text-on-primary',
    },
    {
      color: 'primary',
      variant: 'light',
      className: 'bg-primary-subtle text-primary',
    },
    {
      color: 'primary',
      variant: 'faded',
      className: 'hover:bg-primary-subtle text-primary',
    },
    {
      color: 'primary',
      variant: 'bordered',
      className: 'border-primary text-primary',
    },
    {
      color: 'primary',
      variant: 'ghost',
      className:
        'border-primary text-primary hover:!bg-primary hover:border-transparent hover:text-on-primary',
    },
    {
      color: 'secondary',
      variant: 'solid',
      className: 'bg-secondary text-on-secondary',
    },
    {
      color: 'secondary',
      variant: 'light',
      className: 'bg-secondary-subtle text-secondary',
    },
    {
      color: 'secondary',
      variant: 'faded',
      className: 'hover:bg-secondary-subtle text-secondary',
    },
    {
      color: 'secondary',
      variant: 'bordered',
      className: 'border-secondary text-secondary',
    },
    {
      color: 'secondary',
      variant: 'ghost',
      className:
        'border-secondary text-secondary hover:!bg-secondary hover:border-transparent hover:text-on-secondary',
    },
    {
      color: 'success',
      variant: 'solid',
      className: 'bg-success text-on-success',
    },
    {
      color: 'success',
      variant: 'light',
      className: 'bg-success-subtle text-success',
    },
    {
      color: 'success',
      variant: 'faded',
      className: 'hover:bg-success-subtle text-success',
    },
    {
      color: 'success',
      variant: 'bordered',
      className: 'border-success text-success',
    },
    {
      color: 'success',
      variant: 'ghost',
      className:
        'border-success text-success hover:!bg-success hover:border-transparent hover:text-on-success',
    },
    {
      color: 'warning',
      variant: 'solid',
      className: 'bg-warning text-on-warning',
    },
    {
      color: 'warning',
      variant: 'light',
      className: 'bg-warning-subtle text-warning',
    },
    {
      color: 'warning',
      variant: 'faded',
      className: 'hover:bg-warning-subtle text-warning',
    },
    {
      color: 'warning',
      variant: 'bordered',
      className: 'border-warning text-warning',
    },
    {
      color: 'warning',
      variant: 'ghost',
      className:
        'border-warning text-warning hover:!bg-warning hover:border-transparent hover:text-on-warning',
    },
    {
      color: 'danger',
      variant: 'solid',
      className: 'bg-danger text-on-danger',
    },
    {
      color: 'danger',
      variant: 'light',
      className: 'bg-danger-subtle text-danger',
    },
    {
      color: 'danger',
      variant: 'faded',
      className: 'hover:bg-danger-subtle text-danger',
    },
    {
      color: 'danger',
      variant: 'bordered',
      className: 'border-danger text-danger',
    },
    {
      color: 'danger',
      variant: 'ghost',
      className:
        'border-danger text-danger hover:!bg-danger hover:border-transparent hover:text-on-danger',
    },
  ],
});

export type ButtonStyles = typeof buttonStyles;

export type ButtonVariantProps = VariantProps<ButtonStyles>;
