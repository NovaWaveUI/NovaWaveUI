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
      neutral: 'bg-neutral text-on-neutral',
      primary: '',
      secondary: '',
      success: '',
      warning: '',
      danger: '',
    },
    size: {
      sm: 'p-2',
      md: 'p-2',
      lg: '',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-small',
      md: 'rounded-medium',
      lg: 'rounded-large',
      xl: 'rounded-xlarge',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    color: 'neutral',
    variant: 'solid',
    size: 'md',
    radius: 'md',
  },
});

export type ButtonStyles = typeof buttonStyles;

export type ButtonVariantProps = VariantProps<ButtonStyles>;
