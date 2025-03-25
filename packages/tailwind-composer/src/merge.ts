import {
  ComposerConfig,
  ResolvedCompoundVariants,
  ResolvedDefaultVariants,
  Variants,
} from './types';

export function deepMergeNonSlotConfig<
  TVariants extends Variants,
  TNewVariants extends Variants,
>(
  baseConfig: ComposerConfig<undefined, TVariants>,
  newConfig: Partial<ComposerConfig<undefined, TNewVariants>> = {}
): ComposerConfig<undefined, TVariants & TNewVariants> {
  // Go through each variant and merge the values. If the variant is defined in both
  // the base and the new config, take the values that are the different and merge.
  // For values that are different, the new value will be used.
  const mergedVariants: Record<string, Record<string, string>> = {};

  // First go through the base config and add all the variants
  for (const [key, value] of Object.entries(baseConfig.variants ?? {})) {
    mergedVariants[key] = { ...value };
  }

  // Next, go through the new config and add the new variants
  // If the variant is defined, go through the values and merge them
  // with the base config. If the value is different, the new value
  // will be used.
  for (const [key, value] of Object.entries(newConfig.variants ?? {}) as [
    string,
    Record<string, string>,
  ][]) {
    if (mergedVariants[key] === undefined) {
      mergedVariants[key] = { ...value };
    } else {
      for (const [variant, className] of Object.entries(value)) {
        if (mergedVariants[key][variant] !== className) {
          mergedVariants[key][variant] = className;
        }
      }
    }
  }

  const merged: ComposerConfig<undefined, TVariants & TNewVariants> = {
    base: newConfig.base ?? baseConfig.base,
    variants: mergedVariants as TVariants & TNewVariants,

    defaultVariants: {
      ...(baseConfig.defaultVariants ?? {}),
      ...(newConfig.defaultVariants ?? {}),
    } as ResolvedDefaultVariants<TVariants & TNewVariants>,

    compoundVariants: [
      ...(baseConfig.compoundVariants ?? []),
      ...(newConfig.compoundVariants ?? []),
    ] as ResolvedCompoundVariants<TVariants & TNewVariants>,
  };

  return merged;
}

export function deepMergeSlottedConfig<
  TSlots extends Record<string, string>,
  TVariants extends Variants<TSlots>,
  TNewSlots extends Record<string, string>,
  TNewVariants extends Variants<TNewSlots>,
>(
  baseConfig: ComposerConfig<TSlots, TVariants>,
  newConfig: ComposerConfig<TNewSlots, TNewVariants>
) {}
