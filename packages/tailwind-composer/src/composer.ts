import { twMerge } from 'tailwind-merge';
import {
  ClassValue,
  CoerceToVariants,
  ComposerConfig,
  DeepPartial,
  MergeSlots,
  MergeVariants,
  NonSlotComposerReturn,
  SlotComposerReturn,
  SlotsDef,
  Variants,
  VariantValue,
} from './types';
import { resolveVariantValue } from './utils';
import { deepMergeNonSlotConfig, deepMergeSlottedConfig } from './merge';

export function createNonSlotComposer<TVariants extends Variants>(
  config: ComposerConfig<undefined, TVariants>
): NonSlotComposerReturn<TVariants> {
  const {
    base: baseConfig = '',
    variants: variantConfig = {},
    compoundVariants: compoundVariantConfig = [],
  } = config;

  const variantKeys = Object.keys(variantConfig);

  const composer: NonSlotComposerReturn<TVariants> = (input = {}) => {
    // If no configuration is provided, then return undefined
    if (!config) return undefined;

    const { class: extraClass, className, ...variants } = input;

    const classes: ClassValue[] = [];

    // Add the base classes (if any)
    if (baseConfig) classes.push(baseConfig);

    // Go through each variant and apply the corresponding class if the variant is defined
    for (const variantName in variantKeys) {
      const variantKey = variantKeys[variantName];
      const value = resolveVariantValue(variantKey, variants, config);
      console.log(`Variant: ${variantKey}, Value: ${String(value)}`);
      if (value !== undefined) {
        const variantStyle = variantConfig?.[variantKey]?.[value] as ClassValue;
        if (variantStyle) classes.push(variantStyle);
      }
    }

    // Next, go through the compound variants and apply the corresponding classes
    // based on the user-provided input
    for (const compoundVariant of compoundVariantConfig) {
      // Go through each compound variant and check if it should be applied
      const shouldApply = Object.entries(compoundVariant).every(
        ([key, value]) => {
          if (key === 'class' || key === 'className') return true;
          const resolved = resolveVariantValue(key, variants, config);
          const target = typeof value === 'boolean' ? String(value) : value;

          // If we could not resolved, skip this compound variant
          if (resolved === undefined) return false;

          return Array.isArray(target)
            ? target.includes(resolved)
            : target === resolved;
        }
      );

      if (shouldApply) {
        const compoundClass =
          'class' in compoundVariant
            ? compoundVariant.class
            : compoundVariant.className;
        if (compoundClass) classes.push(compoundClass as ClassValue);
      }
    }

    if (extraClass) classes.push(extraClass as ClassValue);
    if (className) classes.push(className as ClassValue);

    return twMerge(...classes.filter(Boolean));
  };

  composer.variantKeys = variantKeys;

  composer.extend = <TNewVariants extends Variants>(
    newConfig: Partial<
      ComposerConfig<
        undefined,
        DeepPartial<MergeVariants<TVariants, TNewVariants>>
      >
    >
  ): NonSlotComposerReturn<MergeVariants<TVariants, TNewVariants>> => {
    const merged = deepMergeNonSlotConfig(config, newConfig);
    return createNonSlotComposer(merged) as NonSlotComposerReturn<
      MergeVariants<TVariants, TNewVariants>
    >;
  };

  return composer as NonSlotComposerReturn<TVariants>;
}

export function createSlotComposer<
  TSlots extends Record<string, string>,
  TVariants extends Variants<TSlots>,
>(config: ComposerConfig<TSlots, TVariants>) {
  const {
    slots: slotConfig = {},
    variants: variantConfig = {},
    compoundVariants: compoundVariantConfig = [],
  } = config;

  const variantKeys = Object.keys(variantConfig);
  const slotKeys = Object.keys(slotConfig);

  const composer: SlotComposerReturn<TSlots, TVariants> = (input = {}) => {
    // Set up the return value to be the list of slots with the input style function
    const result = {} as {
      [K in keyof TSlots]: (input?: VariantValue<TVariants>) => string;
    };

    // Go through each slot and create a function for it
    for (const slotKey of slotKeys) {
      (result as Record<string, (input?: VariantValue<TVariants>) => string>)[
        slotKey
      ] = (overridenInput = {}) => {
        const classes: ClassValue[] = [];

        // Merge the input and overriden input
        const {
          class: extraClass,
          className,
          ...variants
        } = {
          ...input,
          ...overridenInput,
        };

        // Get the base class for the slot
        const baseClass = slotConfig[slotKey];
        if (baseClass) classes.push(baseClass);

        // Go through each variant and apply the corresponding class if the variant is defined
        for (const variant in variantConfig) {
          const variantValue: Record<string, ClassValue> =
            variantConfig[variant];

          // The resolved variant is a map of partial of the slots to the class name
          // If the variant is not defined, skip it
          // If the variant is defined, check if the slot of our current slot is defined
          // If the slot is defined, then get the class name for the slot
          const value = resolveVariantValue(variant, variants, config);
          if (value !== undefined) {
            const variantStyle = variantValue[value]?.[slotKey];
            if (variantStyle) classes.push(variantStyle);
          }
        }

        for (const compoundVariant of compoundVariantConfig) {
          // Go through each compound variant and check if it should be applied
          const shouldApply = Object.entries(compoundVariant).every(
            ([key, value]) => {
              if (key === 'class' || key === 'className') return true;
              const resolved = resolveVariantValue(key, variants, config);
              const target = typeof value === 'boolean' ? String(value) : value;

              // If we could not resolved, skip this compound variant
              if (resolved === undefined) return false;

              return Array.isArray(target)
                ? target.includes(resolved)
                : target === resolved;
            }
          );

          if (shouldApply) {
            const compoundClass =
              'class' in compoundVariant
                ? compoundVariant.class
                : compoundVariant.className;
            if (compoundClass)
              classes.push((compoundClass[slotKey] as ClassValue) || '');
          }
        }

        if (extraClass) classes.push(extraClass as ClassValue);
        if (className) classes.push(className as ClassValue);

        return twMerge(...classes.filter(Boolean));
      };
    }

    return result;
  };

  composer.extend = <
    TNewSlots extends SlotsDef,
    TNewVariants extends Variants<MergeSlots<TSlots, TNewSlots>>,
    TMergedVariants extends MergeVariants<TVariants, TNewVariants>,
    TCoerced extends CoerceToVariants<
      TMergedVariants,
      MergeSlots<TSlots, TNewSlots>
    >,
  >(
    newConfig?: Partial<ComposerConfig<MergeSlots<TSlots, TNewSlots>, TCoerced>>
  ) => {
    const merged = deepMergeSlottedConfig(
      config,
      newConfig as ComposerConfig<MergeSlots<TSlots, TNewSlots>, TNewVariants>
    ) as ComposerConfig<
      MergeSlots<TSlots, TNewSlots>,
      MergeVariants<TVariants, TNewVariants>
    >;
    return createSlotComposer(merged) as SlotComposerReturn<
      MergeSlots<TSlots, TNewSlots>,
      MergeVariants<TVariants, TNewVariants>
    >;
  };

  composer.variantKeys = variantKeys;
  composer.slotKeys = slotKeys;

  return composer;
}
