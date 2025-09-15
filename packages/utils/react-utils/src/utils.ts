import React, { Context, ForwardedRef, RefObject, useMemo } from 'react';
import { mergeProps } from '@react-aria/utils';
import { ContextValue, DEFAULT_SLOT, SlottedContextValue } from './provider';
import { SlotProps } from './types';
import { mergeRefs, useObjectRef } from './ref';

export function useSlottedContext<T>(
  context: Context<SlottedContextValue<T>>,
  slot?: string | null
): T | null | undefined {
  const contextValue = React.useContext(context);

  if (contextValue == undefined) {
    return contextValue as T | null | undefined;
  }

  if (slot === null) {
    return;
  }

  if (
    typeof contextValue === 'object' &&
    'slots' in contextValue &&
    contextValue.slots
  ) {
    const slotKey = slot || DEFAULT_SLOT;
    if (!contextValue.slots[slotKey]) {
      const availableSlots = Object.keys(contextValue.slots).filter(
        s => s !== DEFAULT_SLOT.toString()
      );
      let errorMessage = slot
        ? `Invalid slot ${slot}.`
        : 'A slot prop is required.';
      if (availableSlots.length > 0) {
        errorMessage += ` Available slots are: ${availableSlots.join(', ')}.`;
      }
      throw new Error(errorMessage);
    }
    return contextValue.slots[slotKey];
  }

  return contextValue as T | null | undefined;
}

export function useContextProps<T, U extends SlotProps, E extends Element>(
  props: T & SlotProps,
  ref: ForwardedRef<E> | undefined,
  context: Context<ContextValue<U, E>>
): [T, RefObject<E | null>] {
  const contextValue = useSlottedContext(context, props.slot) || {};
  const { ref: contextRef, ...contextProps } = contextValue as any;
  const mergedRef = useObjectRef(
    useMemo(() => mergeRefs(ref, contextRef), [ref, contextRef])
  );
  const mergedProps = mergeProps(props, contextProps) as T;

  return [mergedProps, mergedRef];
}
