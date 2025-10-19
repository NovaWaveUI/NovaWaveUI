/* eslint-disable no-unused-vars */
import React, { createContext, JSX, useContext, useMemo } from 'react';
import { mergeProps } from '@react-aria/utils';
import { mergeRefs } from '../react';

export type SlotConfig = Record<string, object | undefined>;

export interface SlotSystem<TSlots extends SlotConfig> {
  Provider: (props: {
    value: Partial<TSlots>;
    children: React.ReactNode;
  }) => JSX.Element;
  useSlot<Name extends keyof TSlots>(
    name: Name,
    props?: TSlots[Name] & { ref?: React.Ref<any> }
  ): TSlots[Name];
}

export function createSlotSystem<
  TSlots extends SlotConfig,
>(): SlotSystem<TSlots> {
  type SlotName = keyof TSlots;

  const SlotPropsContext = createContext<Partial<TSlots>>({});

  function Provider({
    value,
    children,
  }: {
    value: Partial<TSlots>;
    children: React.ReactNode;
  }) {
    const mergedValue = useMemo(() => value, [value]);

    return (
      <SlotPropsContext.Provider value={mergedValue}>
        {children}
      </SlotPropsContext.Provider>
    );
  }

  function useSlot<Name extends SlotName>(
    name: Name,
    props?: TSlots[Name] & { ref?: React.Ref<any> }
  ): TSlots[Name] {
    const context = useContext(SlotPropsContext);

    const merged = mergeProps({}, context[name] || {}, props || {});

    // Merge refs in order: context ref (if any) -> slot registerRef -> props.ref
    const ctxRef = (context[name] as any)?.ref as React.Ref<any> | undefined;
    const propRef = (props as any)?.ref as React.Ref<any> | undefined;

    // Create a single merged ref that will call context ref and prop ref.
    (merged as any).ref = mergeRefs(ctxRef, propRef);

    return merged as TSlots[Name];
  }

  return {
    Provider,
    useSlot,
  };
}
