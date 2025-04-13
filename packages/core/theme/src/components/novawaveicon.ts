import {
  createNonSlotComposer,
  ExtractVariantNonSlottedProps,
} from '@novawaveui/tailwind-composer';

export const novaWaveIconStyles = createNonSlotComposer({
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

export type NovaWaveIconStyles = typeof novaWaveIconStyles;

export type NovaWaveIconVariantProps =
  ExtractVariantNonSlottedProps<NovaWaveIconStyles>;
