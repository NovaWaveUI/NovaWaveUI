import { twMerge } from 'tailwind-merge';
import {
  SlotsConfig,
  SlottedConfig,
  SlottedVariantReturn,
  VariantDefSlots,
  VariantValue,
} from '../types/slots.js';
import { mergeClassNames } from '../utils.js';
import { mergeVariantsSlots } from '../merge.js';

export function createSlottedVariants<
  TSlots extends SlotsConfig,
  TVariants extends VariantDefSlots,
>(
  config: SlottedConfig<TSlots, TVariants>
): SlottedVariantReturn<TSlots, TVariants> {
  // Expand the config
  const {
    slots: slotsProp = {},
    extends: extendsProp = [],
    variants = {},
    compoundVariants = [],
    defaultVariants = {},
  } = config;

  /**
   * Generates the slot functions with merged styles
   */
  const returnValue = (props: VariantValue<TVariants> = {}) => {
    const resultingStyles: {
      [K in keyof TSlots]: (extraClassNames?: string) => string;
    } = {} as any;

    for (const slot in slotsProp) {
      let resultingStyle = mergeClassNames(slotsProp[slot]);
      const resolvedValues: Record<string, string> = {};

      // Process each variant for the current slot
      for (const variant in variants) {
        let variantValue = props?.[variant] ?? defaultVariants[variant];

        // Handle Boolean Variants (If only "true" or "false" keys exist)
        if (
          Object.keys(variants[variant]).every(
            key => key === 'true' || key === 'false'
          )
        ) {
          variantValue =
            variantValue === true
              ? 'true'
              : variantValue === false && 'false' in variants[variant]
                ? 'false'
                : undefined;
        } else {
          variantValue = variantValue ?? Object.keys(variants[variant])[0];
        }

        // Apply the variant style for the current slot (if it exists)
        const slotValue = variants[variant][variantValue];
        if (slotValue && slot in slotValue) {
          resultingStyle = twMerge(resultingStyle, slotValue[slot]);
        }

        resolvedValues[variant] = variantValue as string;
      }

      // Apply Compound Variants
      for (const compoundVariant of compoundVariants) {
        let matches = true; // Assume it matches

        for (const key in compoundVariant) {
          if (key === 'className' || key === 'class') continue; // Skip class properties

          let expectedValue = compoundVariant[key];
          let resolvedValue = resolvedValues[key];

          // ✅ Normalize Boolean Handling (Ensuring true/false match correctly)
          if (
            Object.keys(variants[key] ?? {}).length <= 2 &&
            ['true', 'false'].some(v => v in variants[key])
          ) {
            expectedValue =
              expectedValue === true
                ? 'true'
                : expectedValue === false
                  ? 'false'
                  : expectedValue;
            resolvedValue =
              resolvedValue === 'true'
                ? 'true'
                : resolvedValue === 'false'
                  ? 'false'
                  : resolvedValue;
          }

          // ✅ Ensure values match correctly
          if (Array.isArray(expectedValue)) {
            if (!expectedValue.includes(resolvedValue)) {
              matches = false;
              break;
            }
          } else {
            if (resolvedValue !== expectedValue) {
              matches = false;
              break;
            }
          }
        }

        // ✅ If all conditions matched, apply the styles for the correct slot
        if (matches) {
          // Ensure `className` and `class` exist and contain slot styles
          const classStyles =
            compoundVariant.className ?? compoundVariant.class ?? {};

          // ✅ Merge the styles only if they exist for the current slot
          if (classStyles[slot]) {
            resultingStyle = twMerge(
              resultingStyle,
              mergeClassNames(classStyles[slot])
            );
          }
        }
      }

      // Create a function for this slot that allows additional class names
      (resultingStyles as any)[slot] = (extraClassNames?: string | string[]) =>
        twMerge(resultingStyle, mergeClassNames(extraClassNames));
    }

    return resultingStyles;
  };

  /**
   * Extends the styles, variants, and configurations of the component
   */
  returnValue.extend = <
    TNewVariants extends VariantDefSlots,
    TNewSlots extends SlotsConfig,
  >(
    newConfig: Partial<SlottedConfig<TNewSlots, TNewVariants>>
  ): SlottedVariantReturn<TSlots & TNewSlots, TVariants & TNewVariants> => {
    const extendedSlots = {
      ...(slotsProp as TSlots), // Preserve existing slots
      ...(newConfig.slots ?? {}), // Add new slots if provided
    } as TSlots & TNewSlots;

    const extendedVariants = mergeVariantsSlots(
      variants,
      newConfig.variants ?? {}
    );

    const extendedDefaultVariants = {
      ...defaultVariants, // Preserve existing defaults
      ...(newConfig.defaultVariants ?? {}), // Add new defaults if provided
    };

    const extendedCompoundVariants = [
      ...compoundVariants, // Preserve existing compound variants
      ...(newConfig.compoundVariants ?? []), // Append new ones
    ];

    return createSlottedVariants<TSlots & TNewSlots, TVariants & TNewVariants>({
      slots: extendedSlots,
      extends: [...extendsProp, ...(newConfig.extends ?? [])],
      variants: extendedVariants as TVariants & TNewVariants,
      compoundVariants: extendedCompoundVariants as any,
      defaultVariants: extendedDefaultVariants,
    });
  };

  return returnValue;
}
