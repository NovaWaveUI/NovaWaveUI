import {
  createSlotComposer,
  ExtractVariantSlottedProps,
} from '@novawaveui/tailwind-composer';

export const checkboxStyles = createSlotComposer({
  slots: {
    base: 'flex',
  },
  variants: {
    color: {
      neutral: {
        base: 'text-white bg-primary-700',
      },
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
});

export type CheckboxStyles = typeof checkboxStyles;
export type CheckboxVariantProps = ExtractVariantSlottedProps<CheckboxStyles>;
