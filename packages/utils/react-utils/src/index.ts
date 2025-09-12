import { forwardRefWithAs } from './polymorphic';
import { forwardRefWithRef } from './ref';

export type { CreateContextOptions, CreateContextReturn } from './context';
export type { ReactRef, NonPolymorphicProps } from './ref';
export type { PolymorphicProps, PolymorphicRef } from './polymorphic';

export { createContext } from './context';
export { assignRef, mergeRefs, useDOMRef, forwardRefWithRef } from './ref';
export { forwardRefWithAs, withAsChild } from './polymorphic';

export const forwardRefWith = {
  as: forwardRefWithAs,
  ref: forwardRefWithRef,
} as const;
