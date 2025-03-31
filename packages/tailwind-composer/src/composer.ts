import { twMerge } from 'tailwind-merge';
import type {
  ClassValue,
  ExtendedSlottedComposerReturn,
  MergeDifferentPartialSlottedVariants,
  MergeNonSlottedVariants,
  MergePartialNonSlottedVariants,
  MergePartialSlots,
  MergeSlots,
  NonSlottedComposerConfig,
  NonSlottedComposerReturn,
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
        const className = compoundVariant.className || compoundVariant.class;
        if (className) classes.push(className);
      }
    }

    // Finally, if class or className is provided, add it to the classes
    const { class: extraClass, className: extraClassName } = variants;
    if (extraClass) classes.push(extraClass);
    if (extraClassName) classes.push(extraClassName);

    // Return the final merged classes using twMerge
    return twMerge(...classes.filter(Boolean));
  };

  composer.variantKeys = variantKeys;

  // Now, add the extend function
  composer.extend = <TNewVariants extends NonSlottedVariants>(
    newConfig: NonSlottedComposerConfig<
      MergePartialNonSlottedVariants<TVariants, TNewVariants>
    >
  ): NonSlottedComposerReturn<
    MergeNonSlottedVariants<TVariants, TNewVariants>
  > => {
    const merged = deepMergeNonSlotConfig(config, newConfig);
    return createNonSlotComposer(merged) as NonSlottedComposerReturn<
      MergeNonSlottedVariants<TVariants, TNewVariants>
    >;
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

  console.log(variantConfig);

  const composer: SlottedComposerReturn<TSlots, TVariants> = (input = {}) => {
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
      returnFns[slot] = (overridentInput = {}) => {
        // First, combine the input with the overriden input
        const combinedInput = {
          ...input,
          ...overridentInput,
        } as SlottedVariantInputValue<TSlots, TVariants>;

        console.log('combinedInput', combinedInput);

        const { ...variants } = combinedInput;

        const classes: ClassValue[] = [];

        // Add the base class of the slot
        const baseConfig = slotsConfig?.[slot];
        if (baseConfig) classes.push(baseConfig);

        // Go through each variant and apply the corresponding class if the variant is defined
        for (const variant of variantKeys) {
          const value = resolveSlottedVariantValue(variant, variants, config);
          console.log('value', value);
          if (value !== undefined) {
            const variantStyle =
              variantConfig?.[variant]?.[value as string]?.[slot as string];

            console.log('slot', slot);
            console.log('variant', variant);
            console.log('variantStyle', variantStyle);
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
            const className =
              compoundVariant.className || compoundVariant.class;
            if (className) {
              const slotClass = className[slot as string];
              if (slotClass) classes.push(slotClass);
            }
          }
        }

        // Finally, if class or className is provided, add it to the classes
        const { class: extraClass, className: extraClassName } = variants;
        if (extraClass) classes.push(extraClass as string);
        if (extraClassName) classes.push(extraClassName as string);

        console.log('classes', classes);

        // Return the final merged classes using twMerge
        return twMerge(...classes.filter(Boolean));
      };
    }

    // Return the final object with the slot functions
    return returnFns;
  };

  composer.variantKeys = variantKeys;
  composer.slotKeys = slotKeys;

  // Now, add the extend function
  composer.extend = <
    TSlots extends SlotMap,
    TNewSlots extends SlotMap,
    TAllSlots extends MergeSlots<TSlots, TNewSlots>,
    TVariants extends SlottedVariants<TSlots>,
    TNewVariants extends SlottedVariants<TAllSlots>,
  >(
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
  ): ExtendedSlottedComposerReturn<
    TSlots,
    TNewSlots,
    MergeSlots<TSlots, TNewSlots>,
    TVariants,
    MergeDifferentPartialSlottedVariants<
      TSlots,
      TNewSlots,
      MergePartialSlots<TSlots, TNewSlots>,
      TVariants,
      TNewVariants
    >
  > => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const merged = deepMergeSlotConfig(config, newConfig);
    return createSlotComposer(
      merged
    ) as unknown as ExtendedSlottedComposerReturn<
      TSlots,
      TNewSlots,
      MergeSlots<TSlots, TNewSlots>,
      TVariants,
      MergeDifferentPartialSlottedVariants<
        TSlots,
        TNewSlots,
        MergePartialSlots<TSlots, TNewSlots>,
        TVariants,
        TNewVariants
      >
    >;
  };

  return composer;
}
