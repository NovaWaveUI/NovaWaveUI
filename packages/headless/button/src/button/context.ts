/**
 * The context.ts file is used to store contextes to be used by
 * the button component and its subcomponents.
 *
 * It is also used to expose the context props context so that
 * other components can pass down props to the button component
 * and its subcomponents from anywhere in the tree.
 */

import { createContext } from '@novawaveui/react-utils';
import React from 'react';
import { ButtonProps } from './types';

export type ButtonContextType<T extends React.ElementType> = ButtonProps<T>;

/**
 * The ButtonContext is used to pass down the props to the button
 * components. This allows us to configure the button from anywhere
 * in the tree.
 *
 * useButtonContextProps is used to merge the context props
 * with the local props. This is not public and should only be
 * used internally.
 */
export const [ButtonContext, useButtonContext] = createContext<
  ButtonContextType<any>
>({
  strict: false,
  name: 'NovaWaveUI.Headless.ButtonContext',
  defaultValue: {},
});
