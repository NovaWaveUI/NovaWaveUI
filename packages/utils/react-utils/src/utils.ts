/* eslint-disable no-unused-vars */
import React, { Context, useMemo } from 'react';
import { mergeProps } from '@react-aria/utils';
import { DEFAULT_SLOT, SlottedContextValue } from './provider';
import { mergeRefs, useObjectRef } from './ref';

export function useSlottedContext<T>(
  context: Context<SlottedContextValue<T>>,
  slot?: string | null
): T | null | undefined {
  const contextValue = React.useContext<SlottedContextValue<T>>(context);

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

export function useContextProps<
  T extends React.ElementType,
  P extends React.ComponentPropsWithRef<T> = React.ComponentPropsWithRef<T>,
>(props: P, contextFn: () => P): P {
  const contextValue = contextFn() ?? ({} as P);

  const propRef = (props as any).ref as React.Ref<any> | undefined;
  const contextRef = (contextValue as any).ref as React.Ref<any> | undefined;

  const propObjectRef = useObjectRef(propRef);
  const contextObjectRef = useObjectRef(contextRef);

  const mergedRef = useMemo(
    () => mergeRefs(propObjectRef, contextObjectRef),
    [propObjectRef, contextObjectRef]
  );

  // strip refs so mergeProps doesn't clobber them
  const { ref: _c, ...contextProps } = contextValue as any;
  const { ref: _p, ...ownProps } = props as any;

  // context first, own props override
  const mergedProps = mergeProps(
    contextProps,
    ownProps
  ) as React.ComponentPropsWithRef<T>;

  return { ...mergedProps, ref: mergedRef } as React.ComponentPropsWithRef<T>;
}
