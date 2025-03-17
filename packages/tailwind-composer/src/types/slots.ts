import { ClassName, IsBooleanVariant } from '../types.js';

/**
 * Defines the slots for a component.
 * Each key represents a slot name and maps to a Tailwind class string.
 *
 * @example
 * {
 *   root: "flex flex-col",
 *   header: "p-4 bg-gray-100",
 *   title: "text-lg font-bold"
 * }
 */
export type SlotsConfig = Record<string, ClassName>;

/**
 * Defines the variants for a slotted component.
 * Each variant key maps to an object where each slot has a Tailwind class.
 *
 * @example
 * {
 *   color: {
 *     primary: { root: "bg-blue-500", title: "text-white" },
 *     secondary: { root: "bg-gray-500", title: "text-white" }
 *   }
 * }
 */
export type VariantDefSlots = Record<
  string,
  Record<string, Partial<SlotsConfig>>
>;

/**
 * Extracts the valid values of a given variant key.
 */
export type VariantValues<
  TVariants extends VariantDefSlots,
  K extends keyof TVariants,
> = keyof TVariants[K];

/**
 * Extracts the possible variant values for each variant key.
 */
export type VariantValue<TVariants extends VariantDefSlots> = {
  [K in keyof TVariants]?: IsBooleanVariant<TVariants[K]>;
};

/**
 * Configuration object for slotted variants.
 */
export interface SlottedConfig<
  TSlots extends SlotsConfig,
  TVariants extends VariantDefSlots,
> {
  /**
   * Defines the base styles for each slot.
   */
  slots: TSlots;

  /**
   * A set of predefined styles to inherit.
   */
  extends?: string[];

  /**
   * Defines variants and their styles per slot.
   */
  variants: TVariants;

  /**
   * Defines styles that apply when multiple variants are active.
   */
  compoundVariants?: Array<
    {
      [K in keyof TVariants]?:
        | keyof TVariants[K]
        | Array<keyof TVariants[K]>
        | (TVariants[K] extends { true: any; false?: any } ? boolean : never);
    } & {
      class?: { [K in keyof TSlots]?: ClassName };
      className?: { [K in keyof TSlots]?: ClassName };
    }
  >;

  /**
   * Default values for variants.
   */
  defaultVariants?: {
    [K in keyof TVariants]?: TVariants[K] extends { true: any; false?: any }
      ? boolean
      : keyof TVariants[K];
  };
}

export type SlotVariantFn = (className?: ClassName) => string;

/**
 * The return type of the function created by `createSlottedVariants`.
 */
export type SlottedVariantReturn<
  TSlots extends SlotsConfig,
  TVariants extends VariantDefSlots,
> = {
  (variantValues?: VariantValue<TVariants>): {
    [K in keyof TSlots]: SlotVariantFn;
  };

  extend: <TNewVariants extends VariantDefSlots, TNewSlots extends SlotsConfig>(
    config: Partial<SlottedConfig<TNewSlots, TNewVariants>>
  ) => SlottedVariantReturn<TSlots & TNewSlots, TVariants & TNewVariants>;
};
