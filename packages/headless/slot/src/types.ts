import React, { ComponentProps, ElementType, ReactNode } from 'react';

/**
 * Taken inspiration from Radix UI (https://www.radix-ui.com/)
 * and re-implemented to fit our needs.
 *
 * Thank you to the Radix UI team for their amazing work!
 */

export type SlotProps<T extends ElementType> = ComponentProps<T> & {
  /**
   * The children of the Slot component.
   */
  children?: ReactNode;
};

export interface SlottableProps {
  children?: ReactNode;
}

export interface SlottableComponent extends React.FC<SlottableProps> {
  __nwId__: symbol;
}
