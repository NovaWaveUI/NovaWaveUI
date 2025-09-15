import React, { Context, ForwardedRef, JSX } from 'react';

export const DEFAULT_SLOT = Symbol('default');

export interface SlottedValue<T> {
  slots?: Record<string | symbol, T>;
}

export type SlottedContextValue<T> = SlottedValue<T> | T | null | undefined;
export type WithRef<T, E> = T & { ref?: ForwardedRef<E> };
export type ContextValue<T, E> = SlottedContextValue<WithRef<T, E>>;

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
    (acc, [Context, value]) => (
      <Context.Provider value={value}>{acc}</Context.Provider>
    ),
    children as React.ReactNode
  ) as JSX.Element;
}
