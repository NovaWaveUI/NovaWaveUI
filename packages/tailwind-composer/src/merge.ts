/**
 * Functions that are used to help merge two configurations
 */

import { VariantDefNoSlots } from './types/non-slots.js';
import { VariantDefSlots } from './types/slots.js';

export const mergeVariantsNoSlots = <
  OldVariants extends VariantDefNoSlots,
  NewVariants extends VariantDefNoSlots,
>(
  oldVariants: OldVariants,
  newVariants: NewVariants
): OldVariants & NewVariants => {
  const mergedVariants: Partial<OldVariants & NewVariants> = {};

  // Go through each variant in the old variants
  for (const variant in oldVariants) {
    // Start off the new merged value as the old value
    const mergedValue = { ...oldVariants[variant] };

    // If the variant is also in the new variants, merge the values
    if (Object.prototype.hasOwnProperty.call(newVariants, variant)) {
      for (const value in newVariants[variant]) {
        // Add or overwrite the value from newVariants
        (mergedValue as any)[value] = newVariants[variant][value];
      }
    }

    // Add the merged value to the merged variants
    (mergedVariants as any)[variant] = mergedValue;
  }

  // Add any remaining new variants that were not in old variants
  for (const variant in newVariants) {
    if (!Object.prototype.hasOwnProperty.call(oldVariants, variant)) {
      (mergedVariants as any)[variant] = newVariants[variant];
    }
  }

  return mergedVariants as OldVariants & NewVariants;
};

/**
 * Merges two slotted variant configurations.
 * - If a variant exists in both, it merges their slot styles.
 * - If a slot exists in both variants, it merges the styles instead of replacing.
 */
export const mergeVariantsSlots = <
  OldVariants extends VariantDefSlots,
  NewVariants extends VariantDefSlots,
>(
  oldVariants: OldVariants,
  newVariants: NewVariants
): OldVariants & NewVariants => {
  const mergedVariants: Partial<OldVariants & NewVariants> = {};

  for (const variant in oldVariants) {
    const mergedValues = { ...oldVariants[variant] };

    if (Object.prototype.hasOwnProperty.call(newVariants, variant)) {
      for (const value in newVariants[variant]) {
        if (Object.prototype.hasOwnProperty.call(mergedValues, value)) {
          // Merge slot styles instead of replacing them
          mergedValues[value] = {
            ...mergedValues[value], // Preserve old slot styles
            ...newVariants[variant][value], // Add new slot styles
          };
        } else {
          // If the variant value is new, add it
          mergedValues[value] = newVariants[variant][
            value
          ] as unknown as (typeof mergedValues)[typeof value];
        }
      }
    }

    (mergedVariants as any)[variant] = mergedValues;
  }

  // Add completely new variants that didn't exist in the old configuration
  for (const variant in newVariants) {
    if (!Object.prototype.hasOwnProperty.call(oldVariants, variant)) {
      (mergedVariants as any)[variant] = newVariants[variant];
    }
  }

  return mergedVariants as OldVariants & NewVariants;
};
