import {
  createNonSlotComposer,
  ExtractVariantNonSlottedProps,
} from '@novawaveui/tailwind-composer';

export const iconStyles = createNonSlotComposer({
  base: 'inline-flex items-center justify-center',
  variants: {
    size: {
      xs: 'w-4 h-4',
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-7 h-7',
      xl: 'w-8 h-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type IconStyles = typeof iconStyles;

export type IconVariantProps = ExtractVariantNonSlottedProps<IconStyles>;
