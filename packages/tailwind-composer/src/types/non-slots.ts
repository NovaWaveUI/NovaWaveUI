import { ClassName, IsBooleanVariant } from '../types.js';

/**
 * Non-slot types
 */

/**
 * The defintion for the variants for a non-slot configuration
 *
 * @example
 * ```
 * {
 *  color: {
 *      primary: 'text-blue-50'
 *      secondary: 'text-purple-50'
 *  },
 *  size: {
 *      xs: 'small'
 *  }
 * }
 */

export type VariantDefNoSlots = {
  [key: string]: { [value: string]: string };
};

export type VariantKeys<TVariants extends VariantDefNoSlots> = keyof TVariants;

export type VariantValues<
  TVariants extends VariantDefNoSlots,
  K extends keyof TVariants,
> = keyof TVariants[K];

export type VariantValue<TVariants extends VariantDefNoSlots> = {
  [K in keyof TVariants]?: IsBooleanVariant<TVariants[K]>;
};

export type VariantNoSlots<
  TVariants extends Record<string, Record<string, string>>,
> = TVariants;

export interface NonSlotConfig<
  TVariants extends Record<string, Record<string, string>>,
> {
  /**
   * The base styles of the component
   */
  base?: string | string[];

  /**
   * The variants for the component
   */
  variants: TVariants;

  /**
   * A combination of different variants and when they would apply
   */
  compoundVariants?: Array<
    {
      [K in keyof TVariants]?:
        | keyof TVariants[K] // Normal string keys
        | Array<keyof TVariants[K]> // Array of keys for multiple conditions
        | (TVariants[K] extends { true: any; false?: any } ? boolean : never); // If variant has "true" and/or "false", allow boolean
    } & { class?: ClassName; className?: ClassName }
  >;

  /**
   * The default values for the variants
   */
  defaultVariants?: {
    [K in keyof TVariants]?: TVariants[K] extends { true: any; false?: any }
      ? boolean
      : keyof TVariants[K]; // If the variant has true/false, default value should allow boolean
  };

  /**
   *
   */
  className?: ClassName;
}

/**
 * The return type of the function that is created by createNonSlotVariants
 * @param TVariants The variants that are passed in
 * @returns A function that takes in an object of variant values and returns a string
 * @example
 * ```
 * const buttonVariants = createNonSlotVariants({
 *  base: 'btn',
 *  variants: {
 *     color: {
 *         primary: 'text-blue-50',
 *        secondary: 'text-purple-50',
 *    },
 *   size: {
 *        xs: 'small',
 *      sm: 'medium',
 *       md: 'large',
 *      lg: 'xlarge',
 *   },
 *  },
 *  compoundVariants: [
 *   {
 *     color: 'primary',
 *    size: 'xs',
 *    class: 'btn-primary-xs',
 *   },
 *  {
 *    color: 'secondary',
 *   size: 'xs',
 *   class: 'btn-secondary-xs',
 *  },
 * ],
 * defaultVariants: {
 *   color: 'primary',
 *  size: 'md',
 * },
 * });
 */
export type NonSlotVariantReturn<TVariants extends VariantDefNoSlots> = {
  (variantValues?: VariantValue<TVariants>): string;
  extend: <TNewVariants extends VariantDefNoSlots>(
    config: Partial<NonSlotConfig<TNewVariants>>
  ) => NonSlotVariantReturn<TVariants & TNewVariants>;
};
