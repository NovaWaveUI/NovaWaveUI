import {
  MergeDifferentPartialSlottedVariants,
  MergeDifferentSlottedVariants,
  MergePartialNonSlottedVariants,
  MergePartialSlots,
  MergeSlots,
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
  newConfig: NonSlottedComposerConfig<
    MergePartialNonSlottedVariants<TVariants, TNewVariants>
  >
): NonSlottedComposerConfig<
  MergePartialNonSlottedVariants<TVariants, TNewVariants>
> {
  // Go through each variant and merge the values. If the variant is defined in both
  // the base and the new config, take the value from the new configuration.
  const mergedVariants: MergePartialNonSlottedVariants<
    TVariants,
    TNewVariants
  > = {} as MergePartialNonSlottedVariants<TVariants, TNewVariants>;

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
      key as keyof MergePartialNonSlottedVariants<TVariants, TNewVariants>
    ] = value as unknown as MergePartialNonSlottedVariants<
      TVariants,
      TNewVariants
    >[keyof MergePartialNonSlottedVariants<TVariants, TNewVariants>];
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
        key as keyof MergePartialNonSlottedVariants<TVariants, TNewVariants>
      ] = {
        ...(value as unknown as MergePartialNonSlottedVariants<
          TVariants,
          TNewVariants
        >[keyof MergePartialNonSlottedVariants<TVariants, TNewVariants>]),
      };
    } else {
      for (const [variant, className] of Object.entries(value)) {
        mergedVariants[key][variant] = className;
      }
    }
  }

  const merged: NonSlottedComposerConfig<
    MergePartialNonSlottedVariants<TVariants, TNewVariants>
  > = {
    base: newConfig.base ?? baseConfig.base,
    variants: mergedVariants,

    // The cast to unknonwn here is necessary because the Typescript compiler
    // will not understand that the default variants are a merge of the two
    // configurations.
    defaultVariants: {
      ...(baseConfig.defaultVariants ?? {}),
      ...(newConfig.defaultVariants ?? {}),
    } as unknown as NonSlottedDefaultVariants<
      MergePartialNonSlottedVariants<TVariants, TNewVariants>
    >,

    // The cast to unknown here is necessary because the Typescript compiler
    // will not understand that the compound variants are a merge of the two
    // configurations.
    compoundVariants: [
      ...(baseConfig.compoundVariants ?? []),
      ...(newConfig.compoundVariants ?? []),
    ] as unknown as NonSlottedCompoundVariant<
      MergePartialNonSlottedVariants<TVariants, TNewVariants>
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
  TFinalVariants extends MergeDifferentSlottedVariants<
    TSlots,
    TNewSlots,
    MergeSlots<TSlots, TNewSlots>,
    TVariants,
    TNewVariants
  > = MergeDifferentSlottedVariants<
    TSlots,
    TNewSlots,
    MergeSlots<TSlots, TNewSlots>,
    TVariants,
    TNewVariants
  >,
>(
  baseConfig: SlottedComposerConfig<TSlots, TVariants>,
  newConfig: SlottedComposerConfig<
    MergePartialSlots<TSlots, TNewSlots>,
    MergeDifferentPartialSlottedVariants<
      TSlots,
      TNewSlots,
      MergeSlots<TSlots, TNewSlots>,
      TVariants,
      TNewVariants
    >
  >
): SlottedComposerConfig<TAllSlots, TFinalVariants> {
  const mergedVariants: TFinalVariants = {} as TFinalVariants;
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
      key as keyof MergeDifferentSlottedVariants<
        TSlots,
        TNewSlots,
        MergeSlots<TSlots, TNewSlots>,
        TVariants,
        TNewVariants
      >
    ] = value as unknown as TFinalVariants[keyof MergeDifferentSlottedVariants<
      TSlots,
      TNewSlots,
      MergeSlots<TSlots, TNewSlots>,
      TVariants,
      TNewVariants
    >];
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
        key as keyof MergeDifferentSlottedVariants<
          TSlots,
          TNewSlots,
          MergeSlots<TSlots, TNewSlots>,
          TVariants,
          TNewVariants
        >
      ] = {
        ...(value as unknown as MergeDifferentSlottedVariants<
          TSlots,
          TNewSlots,
          MergeSlots<TSlots, TNewSlots>,
          TVariants,
          TNewVariants
        >[keyof MergeDifferentSlottedVariants<
          TSlots,
          TNewSlots,
          MergeSlots<TSlots, TNewSlots>,
          TVariants,
          TNewVariants
        >]),
      };
    } else {
      for (const [variant, className] of Object.entries(value)) {
        mergedVariants[key][variant] = className;
      }
    }
  }

  const merged: SlottedComposerConfig<TAllSlots, TFinalVariants> = {
    slots: {
      ...(baseConfig.slots ?? {}),
      ...(newConfig.slots ?? {}),
    } as TAllSlots,
    variants: mergedVariants as TFinalVariants,
    defaultVariants: {
      ...(baseConfig.defaultVariants ?? {}),
      ...(newConfig.defaultVariants ?? {}),
    } as unknown as SlottedDefaultVariants<TAllSlots, TFinalVariants>,
    compoundVariants: [
      ...(baseConfig.compoundVariants ?? []),
      ...(newConfig.compoundVariants ?? []),
    ] as SlottedCompoundVariant<TAllSlots, TFinalVariants>,
  };

  return merged;
}
