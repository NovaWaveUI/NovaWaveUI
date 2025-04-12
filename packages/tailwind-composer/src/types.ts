import type { ClassNameValue } from 'tailwind-merge';

/**
 * A re-export of the `ClassNameValue` type from the `tailwind-merge` package.
 */
export type ClassValue = ClassNameValue;

export type ClassProp =
  | { class: ClassValue; className?: never }
  | { class?: never; className: ClassValue };

export type ClassPropOptional =
  | { class?: ClassValue; className?: never }
  | { class?: never; className?: ClassValue };

/**
 * A type that returns a true or false conditional based on whether or not
 * `T` (which is a Record<string, any>) has a key that is either 'true' or 'false'.
 */
export type IsBooleanVariant<T extends Record<string, any>> =
  'true' extends keyof T ? true : 'false' extends keyof T ? true : false;

/**
 * If the variant is boolean (i.e. its keys include "true" and/or "false"),
 * then the input value for that variant should be a boolean.
 * Otherwise, it should be one of the keys defined.
 */
export type VariantInput<T extends Record<string, any>> =
  IsBooleanVariant<T> extends true ? boolean : keyof T;

/**
 * A type that represents a deep merge of two type `T` and `U`. This type recursively merges the properties
 * of `T` and `U`. If both `T` and `U` have a property with the same key, the type of that property in the resulting type
 * will be used
 */
export type DeepMerge<T, U> = U extends never
  ? T
  : T extends object
    ? U extends object
      ? {
          [K in keyof T | keyof U]: K extends keyof U
            ? K extends keyof T
              ? DeepMerge<T[K], U[K]>
              : U[K]
            : K extends keyof T
              ? T[K]
              : never;
        }
      : U
    : U;

/**
 * A type that represents a deep merge of two types `T` and `U`, but allows for partial properties.
 * This type recursively merges the properties of `T` and `U`, but makes all properties optional.
 * If both `T` and `U` have a property with the same key, the type of that property in the resulting type
 * will be used, but it will be optional. This is useful for creating configurations or options
 * where you want to allow for partial overrides of properties.
 */
export type DeepMergePartial<T, U> = U extends never
  ? Partial<T>
  : T extends object
    ? U extends object
      ? {
          [K in keyof T | keyof U]?: K extends keyof U
            ? K extends keyof T
              ? DeepMergePartial<T[K], U[K]>
              : U[K]
            : K extends keyof T
              ? T[K]
              : never;
        }
      : Partial<U>
    : Partial<U>;

// ===================================================
// Non-Slotted Component Types
// ===================================================

/**
 * A type that represents the possible class properties for a non-slotted component.
 * This allows for either a `class` or `className` property to be used, but not both at the same time.
 */
export type NonSlottedClassProp = ClassProp;

export type NonSlottedClassPropOptional = ClassPropOptional;

/**
 * A type that represents the value a variant can be. It is
 * a string mapped to a `ClassValue`.
 */
export type NonSlotVariantValue = Record<string, ClassValue>;

/**
 * A type that represents the variants for a non-slotted component.
 * This type is a record where each key is a variant name and
 * each value is a `NonSlotVariantValue` which is a record of string keys
 * (which is a different option of the variant) mapped to a `ClassValue`.
 *
 * For example, a variant could be `"color"` which has options like `"red"`, `"blue"`, and `"green"`.
 * Each of these options would map to a `ClassValue` which represents the Tailwind CSS classes
 * associated with that option.
 */
export type NonSlottedVariants = Record<string, NonSlotVariantValue>;

/**
 * A type that represents the input to control the variants for a non-slotted component.
 * This type is an object that optionally contains the keys of each variant defined in the `NonSlottedVariants`.
 */
export type NonSlottedVariantInputValue<T extends NonSlottedVariants> = {
  [K in keyof T]?: VariantInput<T[K]>;
};

export type MergeNonSlottedVariants<
  T extends NonSlottedVariants,
  U extends NonSlottedVariants,
> = DeepMerge<T, U> extends NonSlottedVariants ? DeepMerge<T, U> : never;

export type MergePartialNonSlottedVariants<
  T extends NonSlottedVariants,
  U extends NonSlottedVariants,
> = [keyof U] extends [never]
  ? T
  : DeepMergePartial<T, U> extends NonSlottedVariants
    ? DeepMergePartial<T, U>
    : never;

/**
 * A type that represents the default values for non-slotted components.
 * If a variant is defined as boolean (i.e. it has keys "true" and/or "false"), then
 * the input is boolean. Otherwise, it's the union of its keys.
 */
export type NonSlottedDefaultVariants<TVariants extends NonSlottedVariants> = {
  [K in keyof TVariants]?: VariantInput<TVariants[K]>;
};

/**
 * A type that represents the compound variants for non-slotted components.
 */
export type NonSlottedCompoundVariant<TVariants extends NonSlottedVariants> =
  Array<
    {
      [K in keyof TVariants]?:
        | VariantInput<TVariants[K]>
        | Array<keyof TVariants[K]>;
    } & NonSlottedClassProp
  >;

export type VariantInputFromComposer<T> = T extends { __variantTypes: infer V }
  ? V extends NonSlottedVariants
    ? NonSlottedVariantInputValue<V>
    : never
  : never;

/**
 * The non-slotted component configuration type.
 */
export type NonSlottedComposerConfig<TVariants extends NonSlottedVariants> = {
  /**
   * The base classes that will always be applied to the component.
   */
  base?: ClassValue;

  /**
   * The variants for the non-slotted component. This is a record where each key
   * is a variant name and each value is a `NonSlotVariantValue`.
   */
  variants?: TVariants;

  /**
   * The default values for the variants. This is a record where each key
   * is a variant name and each value is the default input for that variant.
   */
  defaultVariants?: NonSlottedDefaultVariants<TVariants>;

  /**
   * The compound variants for the non-slotted component. This is a record where each key
   * is a variant name and each value is either a single option from the variant or an array of options.
   */
  compoundVariants?: NonSlottedCompoundVariant<TVariants>;
};

/**
 * A type that represents the return value of the `extend` method for a non-slotted component composer.
 * This type extends the original `NonSlottedComposerReturn` type to allow for further extension of
 * the variants.
 */
export type ExtendedNonSlottedComposerReturn<
  TVariants extends NonSlottedVariants,
  TNewVariants extends NonSlottedVariants,
> = NonSlottedComposerReturn<MergeNonSlottedVariants<TVariants, TNewVariants>>;

/**
 * The return type for a non-slotted component composer. This type includes a function that takes an optional
 * input object containing the values for the variants to get a resulting combined class. It also contains an
 * `extend` function which helps extends the returned type. It also contains an `variantKeys` property which
 * is an array of the variants.
 */
export type NonSlottedComposerReturn<TVariants extends NonSlottedVariants> = {
  (
    input?: NonSlottedVariantInputValue<TVariants> & NonSlottedClassPropOptional
  ): string;

  /**
   * A method that allows the extension of the existing non-slotted component composer configuration.
   * You are able to add new variants, add new values to existing variants, or even override existing variants.
   * This method returns a new `NonSlottedComposerReturn` that includes the merged variants from the original
   * configuration and the new configuration provided. This allows for a flexible way to build upon existing
   * configurations without losing the original settings. This is particularly useful for creating reusable
   * component configurations that can be extended in different parts of your application.
   * @param newConfig - The new configuration to extend the existing non-slotted component composer.
   * @returns The newly merged configuration
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  extend: <TNewVariants extends NonSlottedVariants = {}>(newConfig?: {
    variants?: MergePartialNonSlottedVariants<TVariants, TNewVariants>;
    defaultVariants?: NonSlottedDefaultVariants<
      MergeNonSlottedVariants<TVariants, TNewVariants>
    >;
    compoundVariants?: NonSlottedCompoundVariant<
      MergeNonSlottedVariants<TVariants, TNewVariants>
    >;
  }) => ExtendedNonSlottedComposerReturn<TVariants, TNewVariants>;

  /**
   * The valid variant keys for the non-slotted component. This is an array of strings
   * representing the keys of the variants defined in the `variants` property.
   */
  variantKeys: Array<keyof TVariants>;

  defaultVariants: NonSlottedDefaultVariants<TVariants>;

  __variantTypes: TVariants;
};

export type ExtractVariantNonSlottedProps<T> =
  T extends NonSlottedComposerReturn<infer TVariants>
    ? NonSlottedVariantInputValue<TVariants>
    : never;

// ===================================================
// Slotted Component Types
// ===================================================

/**
 * A type that represents the possible class properties for a slotted component.
 * This allows for either a `class` or `className` property, but not both at once.
 */
export type SlottedClassProp<TSlots extends SlotMap> =
  | { class: Partial<Record<keyof TSlots, ClassValue>>; className?: never }
  | { class?: never; className: Partial<Record<keyof TSlots, ClassValue>> };

export type SlottedClassPropOptional<TSlots extends SlotMap> =
  | { class?: Partial<Record<keyof TSlots, ClassValue>>; className?: never }
  | { class?: never; className?: Partial<Record<keyof TSlots, ClassValue>> };

/**
 * A record where each key is a slot name and each value is a ClassValue.
 */
export type SlotMap = Record<string, ClassValue>;

/**
 * A type representing the variants for a slotted component.
 * Each variant option may define styles per slot.
 */
export type SlottedVariants<TSlots extends SlotMap> = Record<
  string,
  Record<string, Partial<Record<keyof TSlots, ClassValue>>>
>;

/**
 * A type representing the input control values for each variant.
 */
export type SlottedVariantInputValue<
  TSlots extends SlotMap,
  TVariants extends SlottedVariants<TSlots>,
> = {
  [K in keyof TVariants]?: VariantInput<TVariants[K]>;
};

// Merge utility types
export type MergeSlots<T extends SlotMap, U extends SlotMap> =
  DeepMerge<T, U> extends SlotMap ? DeepMerge<T, U> : never;

export type MergePartialSlots<T extends SlotMap, U extends SlotMap> =
  DeepMergePartial<T, U> extends SlotMap ? DeepMergePartial<T, U> : never;

export type MergeSlottedVariants<
  TSlots extends SlotMap,
  T extends SlottedVariants<TSlots>,
  U extends SlottedVariants<TSlots>,
> = DeepMerge<T, U> extends SlottedVariants<TSlots> ? DeepMerge<T, U> : never;

export type MergePartialSlottedVariants<
  TSlots extends SlotMap,
  T extends SlottedVariants<TSlots>,
  U extends SlottedVariants<TSlots>,
> =
  DeepMergePartial<T, U> extends SlottedVariants<TSlots>
    ? DeepMergePartial<T, U>
    : never;

// Default variants
export type SlottedDefaultVariants<
  TSlots extends SlotMap,
  TVariants extends SlottedVariants<TSlots>,
> = {
  [K in keyof TVariants]?: VariantInput<TVariants[K]>;
};

// Compound variants
export type SlottedCompoundVariant<
  TSlots extends SlotMap,
  TVariants extends SlottedVariants<TSlots>,
> = Array<
  {
    [K in keyof TVariants]?:
      | VariantInput<TVariants[K]>
      | Array<keyof TVariants[K]>;
  } & SlottedClassProp<TSlots>
>;

// Config type
export type SlottedComposerConfig<
  TSlots extends SlotMap,
  TVariants extends SlottedVariants<TSlots>,
> = {
  slots?: TSlots;
  variants?: TVariants;
  defaultVariants?: SlottedDefaultVariants<TSlots, TVariants>;
  compoundVariants?: SlottedCompoundVariant<TSlots, TVariants>;
};

// Return type
export type SlottedComposerReturn<
  TSlots extends SlotMap,
  TVariants extends SlottedVariants<TSlots>,
> = {
  (
    input?: SlottedVariantInputValue<TSlots, TVariants> &
      SlottedClassPropOptional<TSlots>
  ): {
    [K in keyof TSlots]: (
      input?: SlottedVariantInputValue<TSlots, TVariants> & ClassPropOptional
    ) => string;
  };

  extend: <
    TNewSlots extends SlotMap,
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    TNewVariants extends SlottedVariants<MergeSlots<TSlots, TNewSlots>> = {},
  >(config?: {
    slots?: MergePartialSlots<TSlots, TNewSlots>;
    variants?: MergePartialSlottedVariants<
      MergeSlots<TSlots, TNewSlots>,
      TVariants extends SlottedVariants<MergeSlots<TSlots, TNewSlots>>
        ? TVariants
        : never,
      TNewVariants
    >;
    defaultVariants?: SlottedDefaultVariants<
      MergeSlots<TSlots, TNewSlots>,
      MergeSlottedVariants<
        MergeSlots<TSlots, TNewSlots>,
        TVariants extends SlottedVariants<MergeSlots<TSlots, TNewSlots>>
          ? TVariants
          : never,
        TNewVariants
      >
    >;
    compoundVariants?: SlottedCompoundVariant<
      MergeSlots<TSlots, TNewSlots>,
      MergeSlottedVariants<
        MergeSlots<TSlots, TNewSlots>,
        TVariants extends SlottedVariants<MergeSlots<TSlots, TNewSlots>>
          ? TVariants
          : never,
        TNewVariants
      >
    >;
  }) => ExtendedSlottedComposerReturn<
    TSlots,
    TNewSlots,
    TVariants,
    TNewVariants
  >;

  slotKeys: (keyof TSlots)[];
  variantKeys: (keyof TVariants)[];
  defaultVariants: SlottedDefaultVariants<TSlots, TVariants>;
};

// Extended return
export type ExtendedSlottedComposerReturn<
  TSlots extends SlotMap,
  TNewSlots extends SlotMap,
  TVariants extends SlottedVariants<TSlots>,
  TNewVariants extends SlottedVariants<MergeSlots<TSlots, TNewSlots>>,
> = SlottedComposerReturn<
  MergeSlots<TSlots, TNewSlots>,
  MergeSlottedVariants<
    MergeSlots<TSlots, TNewSlots>,
    TVariants extends SlottedVariants<MergeSlots<TSlots, TNewSlots>>
      ? TVariants
      : never,
    TNewVariants
  >
>;

// Extract variant props
export type ExtractVariantSlottedProps<
  TSlots extends SlotMap,
  TVariants extends SlottedVariants<TSlots>,
> = SlottedVariantInputValue<TSlots, TVariants>;
