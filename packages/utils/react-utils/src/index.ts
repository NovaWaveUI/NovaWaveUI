import { forwardRefWithAs, forwardRefWithAsChild } from './polymorphic';
import { forwardRefWithRef } from './ref';

export type { CreateContextOptions, CreateContextReturn } from './context';
export type { NonPolymorphicProps } from './ref';
export type { PolymorphicProps, PolymorphicRef } from './polymorphic';
export type { SlotProps } from './types';
export type {
  ChildrenOrFunction,
  ClassNameOrFunction,
  StyleOrFunction,
  StyleRenderProps,
  RenderProps,
  UseRenderPropsOptions,
  UseRenderPropsRetValue,
} from './render';
export type {
  ContextValue,
  ProviderValue,
  SlottedContextValue,
  SlottedValue,
} from './provider';

export { createContext } from './context';
export {
  assignRef,
  mergeRefs,
  useDOMRef,
  forwardRefWithRef,
  useObjectRef,
} from './ref';
export {
  forwardRefWithAs,
  forwardRefWithAsChild,
  withAsChild,
} from './polymorphic';
export { Provider } from './provider';
export { useSlottedContext, useContextProps } from './utils';
export { useRenderProps } from './render';

export const forwardRefWith = {
  as: forwardRefWithAs,
  asChild: forwardRefWithAsChild,
  ref: forwardRefWithRef,
} as const;
