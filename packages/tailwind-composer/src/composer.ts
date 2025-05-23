import { twMerge } from 'tailwind-merge';
import type {
  ClassValue,
  ExtendedNonSlottedComposerReturn,
  ExtendedSlottedComposerReturn,
  MergeNonSlottedVariants,
  MergePartialNonSlottedVariants,
  NonSlottedComposerConfig,
  NonSlottedComposerReturn,
  NonSlottedCompoundVariant,
  NonSlottedDefaultVariants,
  NonSlottedVariants,
  SlotMap,
  SlottedComposerConfig,
  SlottedComposerReturn,
  SlottedVariantInputValue,
  SlottedVariants,
} from './types';
import {
  resolveNonSlotVariantValue,
  resolveSlottedVariantValue,
} from './utils';
import { deepMergeNonSlotConfig, deepMergeSlotConfig } from './merge';

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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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

    // Next, go through the compound variants and apply the corresponding classes
    // based on the user-provided input
    for (const compoundVariant of compoundVariantConfig) {
      const shouldApply = Object.entries(compoundVariant).every(
        ([key, value]) => {
          if (key === 'className' || key === 'class') return true;
          const resolved = resolveNonSlotVariantValue(key, variants, config);
          const target = typeof value === 'boolean' ? String(value) : value;

          // If we could not resolve the variant, skip this compound variant
          if (resolved === undefined) return false;

          return Array.isArray(target)
            ? target.includes(resolved as string)
            : resolved === target;
        }
      );

      if (shouldApply) {
        classes.push(compoundVariant.className);
        classes.push(compoundVariant.class);
      }
    }

    // Finally, if class or className is provided, add it to the classes
    const { class: extraClass, className: extraClassName } = variants;
    if (extraClass) classes.push(extraClass);
    if (extraClassName) classes.push(extraClassName);

    // Return the final merged classes using twMerge
    return twMerge(...classes.filter(Boolean)) ?? '';
  };

  composer.variantKeys = variantKeys;
  composer.defaultVariants = config.defaultVariants ?? {};

  // Now, add the extend function
  composer.extend = <TNewVariants extends NonSlottedVariants>(newConfig?: {
    variants?: MergePartialNonSlottedVariants<TVariants, TNewVariants>;
    defaultVariants?: NonSlottedDefaultVariants<
      MergeNonSlottedVariants<TVariants, TNewVariants>
    >;
    compoundVariants?: NonSlottedCompoundVariant<
      MergeNonSlottedVariants<TVariants, TNewVariants>
    >;
  }): ExtendedNonSlottedComposerReturn<TVariants, TNewVariants> => {
    const merged = deepMergeNonSlotConfig(config, newConfig ?? {});
    return createNonSlotComposer(
      merged
    ) as unknown as ExtendedNonSlottedComposerReturn<TVariants, TNewVariants>;
  };

  return composer;
}

export function createSlotComposer<
  TSlots extends SlotMap,
  TVariants extends SlottedVariants<TSlots>,
>(
  config: SlottedComposerConfig<TSlots, TVariants>
): SlottedComposerReturn<TSlots, TVariants> {
  const {
    slots: slotsConfig = {} as Record<keyof TSlots, ClassValue>,
    variants: variantConfig = {} as Record<
      keyof TVariants,
      Record<string, Record<string, ClassValue>>
    >,
    compoundVariants: compoundVariantConfig = [],
  } = config;

  const variantKeys = Object.keys(variantConfig) as (keyof TVariants)[];
  const slotKeys = Object.keys(slotsConfig) as (keyof TSlots)[];

  const composer = ((input = {}) => {
    // If no configuration is provided, then return undefined
    if (!config) return undefined;

    // The return type is a map of slots to a function that accepts the same
    // input as the composer function and returns the computed class name
    const returnFns = {} as Record<
      keyof TSlots,
      (overridenInput?: SlottedVariantInputValue<TSlots, TVariants>) => string
    >;

    // Go through each slot and create a function for it
    for (const slot of slotKeys) {
      const additionalSlotClass = input.className
        ? input.className[slot]
        : input.class
          ? input.class[slot]
          : undefined;

      returnFns[slot] = (overridentInput = {}) => {
        // First, combine the input with the overriden input
        const combinedInput = {
          ...input,
          ...overridentInput,
        } as SlottedVariantInputValue<TSlots, TVariants>;

        const { ...variants } = combinedInput;

        const classes: ClassValue[] = [];

        // Add the base class of the slot
        const baseConfig = slotsConfig?.[slot];
        if (baseConfig) classes.push(baseConfig);

        // Go through each variant and apply the corresponding class if the variant is defined
        for (const variant of variantKeys) {
          const value = resolveSlottedVariantValue(variant, variants, config);
          if (value !== undefined) {
            const variantStyle =
              variantConfig?.[variant]?.[value as string]?.[slot as string];
            if (variantStyle) classes.push(variantStyle);
          }
        }

        // Next, go through the compound variants and apply the corresponding classes
        // based on the user-provided input
        for (const compoundVariant of compoundVariantConfig) {
          const shouldApply = Object.entries(compoundVariant).every(
            ([key, value]) => {
              if (key === 'className' || key === 'class') return true;
              const resolved = resolveSlottedVariantValue(
                key,
                variants,
                config
              );
              const target = typeof value === 'boolean' ? String(value) : value;

              // If we could not resolve the variant, skip this compound variant
              if (resolved === undefined) return false;

              return Array.isArray(target)
                ? target.includes(resolved as string)
                : resolved === target;
            }
          );

          if (shouldApply) {
            if (compoundVariant.className) {
              const slotClass = compoundVariant.className[slot as string];
              if (slotClass) classes.push(slotClass);
            }

            if (compoundVariant.class) {
              const slotClass = compoundVariant.class[slot as string];
              if (slotClass) classes.push(slotClass);
            }
          }
        }

        // Finally, if class or className is provided, add it to the classes
        const { class: extraClass, className: extraClassName } = variants;
        if (extraClass) classes.push(extraClass as string);
        if (extraClassName) classes.push(extraClassName as string);
        if (additionalSlotClass) classes.push(additionalSlotClass);

        // Return the final merged classes using twMerge
        return twMerge(...classes.filter(Boolean));
      };
    }

    // Return the final object with the slot functions
    return returnFns;
  }) as SlottedComposerReturn<TSlots, TVariants>;

  composer.variantKeys = variantKeys;
  composer.slotKeys = slotKeys;

  // Now, add the extend function
  composer.extend = <
    TSlots extends SlotMap,
    TNewSlots extends SlotMap,
    TVariants extends SlottedVariants<TSlots>,
    TNewVariants extends SlottedVariants<any>, // Simplified to avoid excessive depth
  >(newConfig?: {
    slots?: any; // Simplified to avoid excessive depth
    variants?: any; // Simplified to avoid excessive depth
    defaultVariants?: any; // Simplified to avoid excessive depth
    compoundVariants?: any; // Simplified to avoid excessive depth
  }): ExtendedSlottedComposerReturn<
    TSlots,
    TNewSlots,
    TVariants,
    TNewVariants
  > => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const merged = deepMergeSlotConfig(config, newConfig);
    return createSlotComposer(
      merged
    ) as unknown as ExtendedSlottedComposerReturn<
      TSlots,
      TNewSlots,
      TVariants,
      TNewVariants
    >;
  };

  return composer;
}

/**
 * The createComposer function is a factory function that creates a composer
 * function based on the provided configuration. It determines whether to
 * create a slot composer or a non-slot composer based on the presence of
 * the `slots` property in the configuration object.
 *
 * @param config - The configuration object for the composer.
 * @returns The composer function that can be used to generate class names based on the provided configuration.
 */
export function createComposer(config: any) {
  if (config.slots) {
    return createSlotComposer(config);
  }
  return createNonSlotComposer(config);
}
