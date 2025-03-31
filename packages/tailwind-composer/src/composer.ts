import {
  ClassValue,
  NonSlottedComposerConfig,
  NonSlottedComposerReturn,
  NonSlottedVariants,
  SlotMap,
  SlottedComposerConfig,
  SlottedComposerReturn,
  SlottedVariants,
} from './types';
import { resolveNonSlotVariantValue } from './utils';

export function createNonSlotComposer<TVariants extends NonSlottedVariants>(
  config: NonSlottedComposerConfig<TVariants>
): NonSlottedComposerReturn<TVariants> {
  const {
    base: baseConfig = '',
    variants: variantConfig = {} as Record<
      keyof TVariants,
      Record<string, ClassValue>
    >,
    compoundVariants: compoundVariantConfig = [],
  } = config as NonSlottedComposerConfig<TVariants>;

  const variantKeys = Object.keys(variantConfig) as (keyof TVariants)[];

  const composer: NonSlottedComposerReturn<TVariants> = (input = {}) => {
    // If no configuration is provided, then return undefined
    if (!config) return undefined;

    const { ...variants } = input;

    const classes: ClassValue[] = [];

    // Add the base classes (if any)
    if (baseConfig) classes.push(baseConfig);

    // Go through each variant and apply the corresponding class if the variant is defined
    for (const variant of variantKeys) {
      const value = resolveNonSlotVariantValue(variant, variants, config);
      if (value !== undefined) {
        const variantStyle = variantConfig?.[variant]?.[value as string];
        if (variantStyle) classes.push(variantStyle);
      }
    }
  };

  composer.variantKeys = variantKeys;

  return composer;
}

export function createSlotComposer<
  TSlots extends SlotMap,
  TVariants extends SlottedVariants<TSlots>,
>(
  config: SlottedComposerConfig<TSlots, TVariants>
): SlottedComposerReturn<TSlots, TVariants> {
  throw new Error(
    'The createSlotComposer function is not implemented yet. This is a placeholder function that should return a SlottedComposerReturn based on the provided configuration.'
  );
}
