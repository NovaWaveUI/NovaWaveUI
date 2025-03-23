/**
 * A lot of this code is borrowed from the `tailwind-merge` package and the
 * `tailwind-variants` code base. I want to give credit to the authors
 * of those packages for their work and inspiration.
 */

import type { ClassNameValue as ClassValue } from 'tailwind-merge';

export type { ClassValue };

/**
 * --------------------------------------
 * Utility types for Tailwind Composer
 * --------------------------------------
 */

/**
 * Converts a string 'true' or 'false' to a boolean type
 */
export type StringToBoolean<T> = T extends 'true' | 'false' | true | false
  ? boolean
  : T;

/**
 * Extracts the className OR class prop from a component's props
 */
export type ClassProp<V = ClassValue> =
  | { class?: V; className?: never }
  | { class?: never; className?: V };

export type InferConfigFromComposerReturn<T> =
  T extends NonSlotComposerReturn<infer TVariants>
    ? ComposerConfig<undefined, TVariants>
    : T extends SlotComposerReturn<infer TSlots, infer TVariants>
      ? ComposerConfig<TSlots, TVariants>
      : never;

export type MergeVariants<A, B> = {
  [K in keyof A | keyof B]: K extends keyof A
    ? K extends keyof B
      ? A[K] extends object
        ? B[K] extends object
          ? {
              [V in keyof A[K] | keyof B[K]]: V extends keyof B[K]
                ? B[K][V]
                : V extends keyof A[K]
                  ? A[K][V]
                  : never;
            }
          : A[K]
        : A[K]
      : A[K]
    : K extends keyof B
      ? B[K]
      : never;
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

/**
 * --------------------------------------
 * Main Types
 * --------------------------------------
 */

export type SlotsDef = Record<string, string>;

export type Variants<T = undefined> =
  T extends Record<string, string>
    ? Record<string, Partial<Record<keyof T, ClassValue>>>
    : Record<string, ClassValue>;

type VariantValue<TVariants extends Variants> = {
  [K in keyof TVariants]?: TVariants[K] extends Record<string, any>
    ? StringToBoolean<keyof TVariants[K]>
    : never;
} & ClassProp;

/**
 * Extracts the variants and their values
 */
export type ExtractVariantProps<T> = T extends (props: infer P) => any
  ? {
      [K in keyof P]?: StringToBoolean<P[K]>;
    }
  : never;

/**
 * The configuration object for a component's variants and slots.
 * This is used to define the base styles, slots, variants, and
 * default values for the component.
 * It is also used to define compound variants, which are combinations
 * of variants that apply additional styles when multiple variants
 * are active at the same time.
 */
export interface ComposerConfig<
  TSlots extends SlotsDef | undefined = undefined,
  TVariants extends Variants<TSlots> = Variants<TSlots>,
> {
  /**
   * For components that do not use slots, the base style that is the base
   */
  base?: ClassValue;
  /**
   * The slots for the component, if any. This is used to define the
   * different parts of the component that can be styled independently.
   */
  slots?: TSlots;
  /**
   * The variants of the component, if any.
   */
  variants?: TVariants;
  /**
   * The default value for the variants
   */
  defaultVariants?: {
    [K in keyof TVariants]?: StringToBoolean<keyof TVariants[K]>;
  };
  /**
   * The list of different styles to apply when a combination of variants
   * are applied. This is useful for applying styles when multiple variants
   * are active at the same time.
   * For example, if you have a button component with a `size` and `color`
   * variant, you can use compoundVariants to apply a different style when
   * both `size` is `large` and `color` is `blue`.
   */
  compoundVariants?: Array<
    {
      [K in keyof TVariants]?:
        | keyof TVariants[K]
        | Array<keyof TVariants[K]>
        | StringToBoolean<TVariants[K]>;
    } & ClassProp
  >;
}

export type NonSlotComposerReturn<TVariants extends Variants> = {
  (input?: VariantValue<TVariants>): string;

  extend: <TNewVariants extends Variants>(
    config: Partial<
      ComposerConfig<
        undefined,
        DeepPartial<MergeVariants<TVariants, TNewVariants>>
      >
    >
  ) => NonSlotComposerReturn<MergeVariants<TVariants, TNewVariants>>;

  variantKeys: (keyof TVariants)[];
};

export type SlotComposerReturn<
  TSlots extends SlotsDef,
  TVariants extends Variants<TSlots>,
> = {
  (input?: VariantValue<TVariants>): {
    [K in keyof TSlots]: (input?: VariantValue<TVariants>) => string;
  };

  extend: <
    TNewVariants extends Record<string, Partial<Record<string, ClassValue>>>,
    TFinalVariants extends Variants<TSlots> & {
      [K in keyof (TVariants & TNewVariants)]: K extends keyof TNewVariants
        ? TNewVariants[K]
        : K extends keyof TVariants
          ? TVariants[K]
          : never;
    },
  >(
    config: Partial<ComposerConfig<TSlots, TFinalVariants>>
  ) => ComposerReturn<TSlots, TFinalVariants>;

  variantKeys: (keyof TVariants)[];
};

export type ComposerReturn<
  TSlots extends SlotsDef | undefined = undefined,
  TVariants extends Variants<TSlots> = Variants<TSlots>,
> =
  TSlots extends Record<string, string>
    ? SlotComposerReturn<TSlots, TVariants>
    : NonSlotComposerReturn<TVariants>;
