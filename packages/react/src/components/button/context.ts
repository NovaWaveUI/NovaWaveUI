/**
 * The context.ts file is used to store contextes to be used by
 * the button component and its subcomponents.
 *
 * It is also used to expose the context props context so that
 * other components can pass down props to the button component
 * and its subcomponents from anywhere in the tree.
 */
import { createContext } from '../../utils/react';
import { ButtonProps } from './Button';
import { ButtonRenderProps, ButtonStyleProps } from './types';

// The ButtonStateContextValue is the state of the button that is used
// internally and is not configurable from outside.
export interface ButtonStateContextType
  extends ButtonRenderProps,
    ButtonStyleProps {
  /**
   * Whether or not this button is in a group.
   */
  isInGroup: boolean;
}

/**
 * The ButtonContext is used to pass down the props to the button
 * components. This allows us to configure the button from anywhere
 * in the tree.
 *
 * useButtonContextProps is used to merge the context props
 * with the local props. This is not public and should only be
 * used internally.
 */
export const [ButtonContext, useButtonContextProps] = createContext<
  ButtonProps<any>
>({
  strict: false,
  name: 'NovaWaveUI.ButtonContext',
  defaultValue: {},
});

/**
 * The ButtonStateContext is used to pass down the state of the button
 * to the button slots. This allows the slots to adapt based on
 * the state of the button (e.g. disabled, loading, pressed, etc).
 *
 * This is exposed as a public context so that advanced users
 * can use it to create custom button components that are still
 * in sync with the Button component.
 *
 * useButtonState is a hook that provides access to the ButtonStateContext.
 * It will throw an error if used outside of a Button component.
 */
export const [ButtonStateContext, useButtonState] =
  createContext<ButtonStateContextType>({
    strict: true,
    name: 'NovaWaveUI.ButtonStateContext',
    errorMessage:
      'useButtonState must be used within a Button component or a component wrapped with ButtonProvider',
  });
