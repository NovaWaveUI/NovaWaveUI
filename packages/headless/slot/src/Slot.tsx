/* eslint-disable @typescript-eslint/no-unsafe-argument */
/**
 * Taken inspiration from Radix UI (https://www.radix-ui.com/)
 * and re-implemented to fit our needs.
 *
 * Thank you to the Radix UI team for their amazing work!
 */
import React from 'react';
import { mergeRefs } from '@novawaveui/react';
import { mergeProps } from '@react-aria/utils';
import type { SlottableComponent, SlotProps, SlottableProps } from './types';

const SLOTTABLE_SYMBOL = Symbol('novawaveui.slottable');

export const Slottable: SlottableComponent = ({ children }: SlottableProps) => {
  return <>{children}</>;
};
Slottable.__nwId__ = SLOTTABLE_SYMBOL;

/**
 * Checks if a child is a Slottable element (from the Slot system).
 *
 * @param child The child to check
 * @returns Whether the child is a Slottable element.
 */
function isSlottableElement(
  child: React.ReactNode,
): child is React.ReactElement<SlottableProps, typeof Slottable> {
  return (
    React.isValidElement(child) &&
    typeof child.type === 'function' &&
    '__nwId__' in child.type &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (child.type as any).__nwId__ === SLOTTABLE_SYMBOL
  );
}

/**
 * The Slot component allows you to pass props to its child element.
 *
 * Thank you to the Radix UI team for their amazing work on the original implementation.
 *
 * @param props The props for the Slot component
 * @returns The rendered Slot component
 */
export function Slot<T extends React.ElementType>(props: SlotProps<T>) {
  const { children, ref: slotRef, ...restProps } = props;
  const childArray = React.Children.toArray(children);
  const slottable = childArray.find(element => isSlottableElement(element));

  if (slottable && React.isValidElement(slottable)) {
    const newElement = slottable.props.children as React.ReactElement;

    // Build the new child list: replace SLottable with its children
    const newChildren = childArray.map(child =>
      child === slottable
        ? (newElement.props as { children?: React.ReactNode }).children
        : child,
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const mergedRef = mergeRefs(slotRef, (newElement as any).ref);

    return React.cloneElement(
      newElement,
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ...mergeProps(restProps, (newElement as any).props),
        ref: mergedRef,
      },
      newChildren,
    );
  }

  if (React.isValidElement(children)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const mergedRef = mergeRefs(slotRef, (children as any).ref);
    return React.cloneElement(
      children,
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ...mergeProps(restProps, (children as any).props),
        ref: mergedRef,
      },
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (children as any).props.children,
    );
  }

  return;
}
