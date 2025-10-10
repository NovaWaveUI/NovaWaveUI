/* eslint-disable no-unused-vars */
import React, {
  createContext,
  JSX,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { mergeProps } from '@react-aria/utils';
import { mergeRefs } from '@novawaveui/react-utils';

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

    // Track presence of the slot via a callback ref + layout effect.
    const presence = useContext(SlotPresenceContext);

    // Local state for whether this slot has a slotted element.
    const [_hasSlot, setHasSlot] = useState<boolean>(() => {
      // If the context provided props include something truthy, assume it's present.
      const ctx = context[name] as any;
      return (
        !!(ctx && (ctx as any).children) || !!ctx?.ref || !!ctx?.as || false
      );
    });

    const hasRun = useRef(false);

    const registerRef = useCallback(
      (el: any) => {
        hasRun.current = true;
        const present = !!el;
        setHasSlot(present);
        // Also update the shared presence set so others can read it.
        if (presence) {
          if (present) {
            presence.add(name);
          } else {
            presence.delete(name);
          }
        }
      },
      [name, presence]
    );

    useLayoutEffect(() => {
      if (!hasRun.current) {
        setHasSlot(false);
        if (presence) {
          presence.delete(name);
        }
      }
      // reset hasRun for next mount/unmount cycle
      hasRun.current = false;
    }, []);

    const merged = mergeProps({}, context[name] || {}, props || {});

    // Merge refs in order: context ref (if any) -> slot registerRef -> props.ref
    const ctxRef = (context[name] as any)?.ref as React.Ref<any> | undefined;
    const propRef = (props as any)?.ref as React.Ref<any> | undefined;

    // Create a single merged ref that will call context ref, registerRef (callback), and prop ref.
    (merged as any).ref = mergeRefs(ctxRef, registerRef, propRef);

    return merged as TSlots[Name];
  }

  function useSlotPresence(): Set<SlotName> {
    const presence = useContext(SlotPresenceContext);
    return presence ?? new Set();
  }

  return {
    Provider,
    useSlot,
    useSlotPresence,
  };
}
