import { twMerge } from 'tailwind-merge';
import {
  ClassValue,
  ComposerConfig,
  DeepPartial,
  MergeVariants,
  NonSlotComposerReturn,
  Variants,
} from './types';
import { resolveVariantValue } from './utils';
import { deepMergeNonSlotConfig } from './merge';

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
        if (compoundClass) classes.push(compoundClass);
      }
    }

    if (extraClass) classes.push(extraClass);
    if (className) classes.push(className);

    return twMerge(...classes);
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
