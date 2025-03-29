import {
  ClassValue,
  ComposerConfig,
  MergedVariantResult,
  MergeSlots,
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
  TNewSlots extends Record<string, string>,
  TSlots extends Record<string, string>,
  TAllSlots extends MergeSlots<TSlots, TNewSlots>,
  TVariants extends Variants<TSlots>,
  TNewVariants extends Variants<TAllSlots>,
>(
  baseConfig: ComposerConfig<TSlots, TVariants>,
  newConfig: ComposerConfig<MergeSlots<TSlots, TNewSlots>, TNewVariants>
): ComposerConfig<
  TAllSlots,
  MergedVariantResult<TAllSlots, TVariants, TNewVariants>
> {
  // First, go through the base slots and add them to the list of merged slots
  const mergedSlots = {
    ...(baseConfig.slots ?? {}),
  };

  // Next, go through the new slots and add them to the list of merged slots
  for (const [key, value] of Object.entries(newConfig.slots ?? {})) {
    if (mergedSlots[key] === undefined) {
      mergedSlots[key] = value;
    } else {
      mergedSlots[key] = `${mergedSlots[key]} ${value}`;
    }
  }

  // Variants are a little more complicated, because now each variant's value is
  // a map of a partial of the slots to the class name. This means that we need to
  // merge the variants together, but also merge the slots together.
  const mergedVariants: Record<string, Record<string, ClassValue>> = {};

  // First go through the base config and add all the variants
  for (const [key, value] of Object.entries(baseConfig.variants ?? {})) {
    mergedVariants[key] = { ...value };
  }

  // Next, go through the new config and add the new variants
  // If the variant is defined, then go through each value.
  // Each value is a map of the slots to the class name.
  // If the slot is defined in both the base and the new config,
  // then use the new config's value. If a new slot or an additional
  // slot is in the new config, just add it to the merged config.
  for (const [variantName, variantValue] of Object.entries(
    newConfig.variants ?? {}
  ) as [string, Record<string, ClassValue>][]) {
    if (mergedVariants[variantName] === undefined) {
      mergedVariants[variantName] = { ...variantValue };
    } else {
      // The variant is defined in both the base and the new config.
      // Go through each value in the variant and merge the slots together.
      for (const [slotName, clasName] of Object.entries(variantValue) as [
        string,
        ClassValue,
      ][]) {
        // Since we are using the new config's value, we can just add the
        // values in
        mergedVariants[variantName][slotName] = clasName;
      }
    }
  }

  const merged: ComposerConfig<
    TAllSlots,
    MergedVariantResult<TAllSlots, TVariants, TNewVariants>
  > = {
    slots: mergedSlots as TAllSlots extends undefined ? never : TAllSlots,
    variants: mergedVariants as MergedVariantResult<
      TAllSlots,
      TVariants,
      TNewVariants
    >,
    compoundVariants: [
      ...(baseConfig.compoundVariants ?? []),
      ...(newConfig.compoundVariants ?? []),
    ] as ResolvedCompoundVariants<
      MergedVariantResult<TAllSlots, TVariants, TNewVariants>,
      TAllSlots
    >,

    defaultVariants: {
      ...(baseConfig.defaultVariants ?? {}),
      ...(newConfig.defaultVariants ?? {}),
    } as ResolvedDefaultVariants<
      MergedVariantResult<TAllSlots, TVariants, TNewVariants>
    >,
  };

  return merged;
}
