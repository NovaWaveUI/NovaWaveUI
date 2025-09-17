import { createContext } from 'react';
import {
  ContextValue,
  createContext as nwCreateContext,
} from '@novawaveui/react-utils';
import { createDataPropsGetter } from '@novawaveui/utils';
import { ButtonContextValue, ButtonStateContext } from './types';

export const ButtonContext = createContext<
  ContextValue<ButtonContextValue, HTMLButtonElement>
>({});
ButtonContext.displayName = 'ButtonContext';

export const ButtonProvider = ButtonContext.Provider;

export const [ButtonStateProvider, useButtonState] =
  nwCreateContext<ButtonStateContext>({
    name: 'ButtonStateContext',
    errorMessage:
      'useButtonState must be used within a Button component or a component wrapped with ButtonProvider',
    strict: true,
  });

export const getButtonDataAttrs = createDataPropsGetter<ButtonStateContext>(
  ctx => {
    return {
      hovered: ctx.isHovered,
      focused: ctx.isFocused,
      'focus-visible': ctx.isFocusVisible,
      pressed: ctx.isPressed,
      disabled: ctx.isDisabled,
      loading: ctx.isLoading,
      color: ctx.color,
      variant: ctx.variant,
      size: ctx.size,
      radius: ctx.radius,
    };
  }
);
