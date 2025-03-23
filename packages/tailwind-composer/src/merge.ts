import { ComposerConfig, StringToBoolean, Variants } from './types';

export function deepMergeNonSlotConfig<
  TVariants extends Variants,
  TNewVariants extends Variants,
>(
  baseConfig: ComposerConfig<undefined, TVariants>,
  newConfig: Partial<ComposerConfig<undefined, TNewVariants>> = {}
): ComposerConfig<undefined, TVariants & TNewVariants> {
  const merged: ComposerConfig<undefined, TVariants & TNewVariants> = {
    base: newConfig.base ?? baseConfig.base,
    variants: {
      ...(baseConfig.variants ?? {}),
      ...(newConfig.variants ?? {}),
    } as TVariants & TNewVariants,

    defaultVariants: {
      ...(baseConfig.defaultVariants ?? {}),
      ...(newConfig.defaultVariants ?? {}),
    } as unknown as {
      [K in keyof (TVariants & TNewVariants)]?: StringToBoolean<
        keyof (TVariants & TNewVariants)[K]
      >;
    },

    compoundVariants: [
      ...(baseConfig.compoundVariants ?? []),
      ...(newConfig.compoundVariants ?? []),
    ] as unknown as {
      [K in keyof (TVariants & TNewVariants)]?:
        | keyof (TVariants & TNewVariants)[K]
        | (keyof (TVariants & TNewVariants)[K])[]
        | StringToBoolean<(TVariants & TNewVariants)[K]>;
    }[],
  };

  return merged;
}
