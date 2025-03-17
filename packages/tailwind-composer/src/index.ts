import { ExtractVariantProps, ClassName, IsBooleanVariant } from './types.js';
import {
  VariantDefSlots,
  SlotVariantFn,
  SlotsConfig,
  SlottedConfig,
  SlottedVariantReturn,
  VariantValue as SlottedVariantValue,
  VariantValues as SlottedVariantValues,
} from './types/slots.js';
import {
  VariantDefNoSlots,
  NonSlotConfig,
  NonSlotVariantReturn,
  VariantKeys,
  VariantNoSlots,
  VariantValue as NonSlotVariantValue,
  VariantValues as NonSlotVariantValues,
} from './types/non-slots.js';
export { createNonSlotVariants } from './slots/non-slots.js';
export { createSlottedVariants } from './slots/slots.js';

// Export the types
export type {
  ExtractVariantProps,
  ClassName,
  IsBooleanVariant,
  VariantDefNoSlots,
  NonSlotConfig,
  NonSlotVariantReturn,
  VariantKeys,
  VariantNoSlots,
  NonSlotVariantValue,
  NonSlotVariantValues,
  VariantDefSlots,
  SlotVariantFn,
  SlotsConfig,
  SlottedConfig,
  SlottedVariantReturn,
  SlottedVariantValue,
  SlottedVariantValues,
};
