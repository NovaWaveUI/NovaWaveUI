import { tv, VariantProps } from 'tailwind-variants';

export const buttonStyles = tv({
  base: ['z-0', 'group', 'bg-primary-foreground text-primary-background'],
});

export type ButtonStyles = typeof buttonStyles;

export type ButtonVariantProps = VariantProps<ButtonStyles>;
