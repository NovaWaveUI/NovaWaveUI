import {
  ClassValue,
  MergeNonSlottedVariants,
  MergePartialNonSlottedVariants,
  MergeSlots,
  MergeSlottedVariants,
  NonSlottedComposerConfig,
  NonSlottedCompoundVariant,
  NonSlottedDefaultVariants,
  NonSlottedVariants,
  SlotMap,
  SlottedComposerConfig,
  SlottedCompoundVariant,
  SlottedDefaultVariants,
  SlottedVariants,
} from './types';

export function deepMergeNonSlotConfig<
  TVariants extends NonSlottedVariants,
  TNewVariants extends NonSlottedVariants,
>(
  baseConfig: NonSlottedComposerConfig<TVariants>,
  newConfig: {
    variants?: MergePartialNonSlottedVariants<TVariants, TNewVariants>;
    defaultVariants?: NonSlottedDefaultVariants<
      MergeNonSlottedVariants<TVariants, TNewVariants>
    >;
    compoundVariants?: NonSlottedCompoundVariant<
      MergeNonSlottedVariants<TVariants, TNewVariants>
    >;
  }
): NonSlottedComposerConfig<MergeNonSlottedVariants<TVariants, TNewVariants>> {
  // Go through each variant and merge the values. If the variant is defined in both
  // the base and the new config, take the value from the new configuration.
  const mergedVariants: MergeNonSlottedVariants<TVariants, TNewVariants> =
    {} as MergeNonSlottedVariants<TVariants, TNewVariants>;

  // First, go through the base configuration and add all the variants
  for (const [key, value] of Object.entries(baseConfig.variants ?? {}) as [
    keyof TVariants,
    TVariants[keyof TVariants],
  ][]) {
    // We know that `key` is a key of TVariants, so we can safely cast it
    // to the correct type. Value is also valid and casted to the correct type.
    // Unknown is used here because Typescript will not understand that
    // the value is just a variant from the base configuration.
    mergedVariants[
      key as keyof MergeNonSlottedVariants<TVariants, TNewVariants>
    ] = value as unknown as MergeNonSlottedVariants<
      TVariants,
      TNewVariants
    >[keyof MergeNonSlottedVariants<TVariants, TNewVariants>];
  }

  // Now, go through the new configuration and add/override the variants
  // If the variant is defined, go through the values and merge them with
  // the base configuration. If the value is different, it will override the
  // base configuration.

  // For simplicity, we will not cast [key, value] to a specific type here because
  // we know that these are going to be valid
  for (const [key, value] of Object.entries(newConfig.variants ?? {})) {
    if (mergedVariants[key] === undefined) {
      mergedVariants[
        key as keyof MergeNonSlottedVariants<TVariants, TNewVariants>
      ] = {
        ...(value as unknown as MergeNonSlottedVariants<
          TVariants,
          TNewVariants
        >[keyof MergeNonSlottedVariants<TVariants, TNewVariants>]),
      };
    } else {
      for (const [variant, className] of Object.entries(value)) {
        (mergedVariants[key] as Record<string, ClassValue>)[variant] =
          className as ClassValue;
      }
    }
  }

  const merged: NonSlottedComposerConfig<
    MergeNonSlottedVariants<TVariants, TNewVariants>
  > = {
    base: baseConfig.base,
    variants: mergedVariants,

    // The cast to unknown here is necessary because the Typescript compiler
    // will not understand that the default variants are a merge of the two
    // configurations.
    defaultVariants: {
      ...(baseConfig.defaultVariants ?? {}),
      ...(newConfig.defaultVariants ?? {}),
    } as unknown as NonSlottedDefaultVariants<
      MergeNonSlottedVariants<TVariants, TNewVariants>
    >,

    // The cast to unknown here is necessary because the Typescript compiler
    // will not understand that the compound variants are a merge of the two
    // configurations.
    compoundVariants: [
      ...(baseConfig.compoundVariants ?? []),
      ...(newConfig.compoundVariants ?? []),
    ] as unknown as NonSlottedCompoundVariant<
      MergeNonSlottedVariants<TVariants, TNewVariants>
    >,
  };

  return merged;
}

export function deepMergeSlotConfig<
  TSlots extends SlotMap,
  TNewSlots extends SlotMap,
  TAllSlots extends MergeSlots<TSlots, TNewSlots>,
  TVariants extends SlottedVariants<TSlots>,
  TNewVariants extends SlottedVariants<TAllSlots>,
  TFinalVariants extends MergeSlottedVariants<
    TAllSlots,
    // @ts-expect-error - This is a known issue with Typescript
    TVariants,
    TNewVariants
    // @ts-expect-error - This is a known issue with Typescript
  > = MergeSlottedVariants<TAllSlots, TVariants, TNewVariants>,
>(
  baseConfig: SlottedComposerConfig<TSlots, TVariants>,
  // @ts-expect-error - This is a known issue with Typescript
  newConfig: SlottedComposerConfig<TNewSlots, TNewVariants>
): SlottedComposerConfig<TAllSlots, TFinalVariants> {
  const mergedVariants = {} as TFinalVariants;

  // Merge base variants
  for (const [key, value] of Object.entries(baseConfig.variants ?? {})) {
    (mergedVariants as any)[key] = { ...value };
  }

  // Merge newConfig variants into mergedVariants
  for (const [key, value] of Object.entries(newConfig.variants ?? {})) {
    if (!(key in mergedVariants)) {
      (mergedVariants as any)[key] = { ...value };
    } else {
      for (const [variantOption, slotMap] of Object.entries(value)) {
        if (!(variantOption in (mergedVariants as any)[key])) {
          (mergedVariants as any)[key][variantOption] = { ...slotMap };
        } else {
          Object.assign((mergedVariants as any)[key][variantOption], slotMap);
        }
      }
    }
  }

  const mergedSlots = {
    ...(baseConfig.slots ?? {}),
    ...(newConfig.slots ?? {}),
  } as TAllSlots;

  const mergedDefaultVariants = {
    ...(baseConfig.defaultVariants ?? {}),
    ...(newConfig.defaultVariants ?? {}),
  } as unknown as SlottedDefaultVariants<TAllSlots, TFinalVariants>;

  const mergedCompoundVariants = [
    ...(baseConfig.compoundVariants ?? []),
    ...(newConfig.compoundVariants ?? []),
  ] as SlottedCompoundVariant<TAllSlots, TFinalVariants>;

  return {
    slots: mergedSlots,
    variants: mergedVariants,
    defaultVariants: mergedDefaultVariants,
    compoundVariants: mergedCompoundVariants,
  };
}
