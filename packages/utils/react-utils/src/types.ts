/* eslint-disable no-unused-vars */
/**
 * Ideas and inspriations are taken from React Aria.
 */
import { CSSProperties, ReactNode } from 'react';

/**
 * A type, where given the provided props, will allow either the direct React children
 * or a function in which the props can control the outcome of the children.
 *
 * Taken from https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/utils.tsx
 */
export type ChildrenOrFunction<T> =
  | ReactNode
  | ((value: T & { defaultChildren?: ReactNode | undefined }) => ReactNode);

/**
 * A type, where given the provided props, will allow either a normal React classname
 * to be given, or a function in which the props can control the outcome of the classname.
 *
 * Taken from https://github.com/adobe/react-spectrum/blob/main/packages/react-aria-components/src/utils.tsx
 */
export type ClassNameOrFunction<T> =
  | string
  | ((value: T & { defaultClassName?: string | undefined }) => string);

/**
 * A type, where given the provided props, will allow either CSS styles to be given,
 * or a function in which the props can control the outcome of the CSS styles.
 */
export type StyleOrFunction<T> =
  | CSSProperties
  | ((
      value: T & { defaultStyles?: CSSProperties | undefined }
    ) => CSSProperties);

export interface StyleRenderProps<T> {
  /** The CSS for the element. A function may be provided to compute the class based on the component state. */
  className?: ClassNameOrFunction<T>;
  /** The inline style for the element. A function may be provided to computer the style based on the component state. */
  style?: StyleOrFunction<T>;
}

export interface RenderProps<T> extends StyleRenderProps<T> {
  /** The children of the component. A function may be provided to alter the children based on the component state. */
  children?: ChildrenOrFunction<T>;
}

export interface SlotProps {
  /**
   * A slot name for the component. Slots allow the component to receive props from a parent component.
   * An explicit `null` value indicates that the local props completely override all props received from a parent.
   */
  slot?: string | null;
}
