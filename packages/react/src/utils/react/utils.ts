import React, { useMemo } from 'react';
import { mergeProps } from '@react-aria/utils';
import { mergeRefs, useObjectRef } from './ref';
import { SlotProps } from './render';

export function useSlottedContext<
  TContext extends SlotProps & React.ComponentPropsWithRef<any>,
  TProps extends SlotProps & React.ComponentPropsWithRef<any>,
>(Context: React.Context<TContext>, props: TProps, slotName?: string): TProps {
  const contextValue = React.useContext(Context) as TContext | null;

  const propRef = (props as any).ref as React.Ref<any> | undefined;

  // Determine the slot name to use
  // Priority: explicit slotName parameter > props.slot
  const effectiveSlotName =
    slotName ?? ((props as SlotProps).slot as string | undefined);

  console.log('useSlottedContext - effectiveSlotName:', effectiveSlotName);

  // Determine which context props to use
  let effectiveContextValue: any = contextValue;

  // If we have a slot name and context has slots, use the named slot
  if (effectiveSlotName && contextValue && (contextValue as any).slots) {
    const slotProps = (contextValue as any).slots[effectiveSlotName];
    if (slotProps) {
      effectiveContextValue = slotProps;
    }
  }

  const contextRef = (effectiveContextValue as any)?.ref as
    | React.Ref<any>
    | undefined;

  const propObjectRef = useObjectRef(propRef);
  const contextObjectRef = useObjectRef(contextRef);

  const mergedRef = mergeRefs(propObjectRef, contextObjectRef);

  // If no context or props.slot is null, return props as-is
  if (!contextValue || (props as SlotProps).slot === null) {
    return props;
  }

  // If props.slot is undefined, use the context (default slot behavior)
  // If props.slot is a string, we don't use the context unless it matches a specific pattern
  const shouldUseContext = (props as SlotProps).slot === undefined;

  if (!shouldUseContext) {
    return props;
  }

  // Strip refs so mergeProps doesn't clobber them
  const { ref: _c, ...contextProps } = effectiveContextValue as any;
  const { ref: _p, ...ownProps } = props as any;

  console.log('useSlottedContext - contextProps:', contextProps);
  console.log('useSlottedContext - ownProps:', ownProps);

  // Context first, own props override
  const mergedProps = mergeProps(
    contextProps,
    ownProps
  ) as React.ComponentPropsWithRef<any>;

  return { ...mergedProps, ref: mergedRef } as TProps;
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
