/* eslint-disable no-unused-vars */
import React, { createContext, JSX, useContext, useMemo, useRef } from 'react';
import { mergeProps } from '@react-aria/utils';
import { mergeRefs } from './ref';

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
  useRegisterSlot(name: keyof TSlots): void;
  useSlotPresence(): Set<keyof TSlots>;
}

export function createSlotSystem<
  TSlots extends SlotConfig,
>(): SlotSystem<TSlots> {
  type SlotName = keyof TSlots;

  const SlotPropsContext = createContext<Partial<TSlots>>({});
  const SlotPresenceContext = createContext<Set<SlotName> | undefined>(
    undefined
  );

  function Provider({
    value,
    children,
  }: {
    value: Partial<TSlots>;
    children: React.ReactNode;
  }) {
    const presenceRef = useRef<Set<SlotName>>(new Set());
    const mergedValue = useMemo(() => value, [value]);

    return (
      <SlotPropsContext.Provider value={mergedValue}>
        <SlotPresenceContext.Provider value={presenceRef.current}>
          {children}
        </SlotPresenceContext.Provider>
      </SlotPropsContext.Provider>
    );
  }

  function useSlot<Name extends SlotName>(
    name: Name,
    props?: TSlots[Name] & { ref?: React.Ref<any> }
  ): TSlots[Name] {
    const context = useContext(SlotPropsContext);
    const merged = mergeProps({}, context[name] || {}, props || {});

    // Merge refs if both context + props provided one
    if (context[name] && (context[name] as any).ref && props?.ref) {
      (merged as any).ref = mergeRefs((context[name] as any).ref, props.ref);
    }

    return merged as TSlots[Name];
  }

  function useRegisterSlot(name: SlotName) {
    const presence = useContext(SlotPresenceContext);
    if (presence) {
      presence.add(name);
    }
  }

  function useSlotPresence(): Set<SlotName> {
    const presence = useContext(SlotPresenceContext);
    return presence ?? new Set();
  }

  return {
    Provider,
    useSlot,
    useRegisterSlot,
    useSlotPresence,
  };
}
