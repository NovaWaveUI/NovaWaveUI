import { createContext } from 'react';
import {
  ContextValue,
  createContext as nwCreateContext,
} from '@novawaveui/react-utils';
import { createDataPropsGetter } from '@novawaveui/utils';
import {
  ButtonGroupContextValue,
  ButtonGroupPropsContextValue,
  ButtonPropsContextValue,
  ButtonStateContextValue,
} from './types';

export const ButtonContext = createContext<
  ContextValue<ButtonPropsContextValue, HTMLButtonElement>
>({});
ButtonContext.displayName = 'ButtonContext';

export const ButtonProvider = ButtonContext.Provider;

export const ButtonGroupPropsContext = createContext<
  ContextValue<ButtonGroupPropsContextValue, HTMLDivElement>
>({});

export const [ButtonStateProvider, useButtonState] =
  nwCreateContext<ButtonStateContextValue>({
    name: 'ButtonStateContext',
    errorMessage:
      'useButtonState must be used within a Button component or a component wrapped with ButtonProvider',
    strict: true,
  });

export const [ButtonGroupProvider, useButtonGroup] =
  nwCreateContext<ButtonGroupContextValue>({
    name: 'ButtonGroupContext',
    strict: false,
  });

export const getButtonDataAttrs =
  createDataPropsGetter<ButtonStateContextValue>(ctx => {
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
      'in-group': ctx.isInGroup,
    };
  });
