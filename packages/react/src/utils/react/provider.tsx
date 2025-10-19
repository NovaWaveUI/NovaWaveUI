import React, { Context, JSX } from 'react';

export const DEFAULT_SLOT = Symbol('default');

export type ProviderValue<T> = [Context<T>, T];

interface ProviderProps<T extends ProviderValue<any>[]> {
  values: [...T];
  children: React.ReactNode;
}

export function Provider<T extends ProviderValue<any>[]>({
  values,
  children,
}: ProviderProps<T>): JSX.Element {
  // Next providers from right to left
  // eslint-disable-next-line unicorn/no-array-reduce
  return values.reduceRight(
    (acc, [Ctx, value]) => <Ctx.Provider value={value}>{acc}</Ctx.Provider>,
    children as React.ReactNode
  ) as JSX.Element;
}
