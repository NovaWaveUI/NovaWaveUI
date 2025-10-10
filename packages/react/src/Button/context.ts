import { ContextValue, createContext } from '@novawaveui/react-utils';
import { createDataPropsGetter } from '@novawaveui/utils';
import {
  ButtonGroupContextValue,
  ButtonGroupPropsContextValue,
  ButtonContextValue,
  ButtonStateContextValue,
} from './types';

export const [ButtonProvider, , ButtonContext] = createContext<
  ContextValue<ButtonContextValue, HTMLButtonElement>
>({
  name: 'NovaWaveUI.ButtonContext',
  strict: false,
});

export const [ButtonGroupProvider, , ButtonGroupContext] = createContext<
  ContextValue<ButtonGroupPropsContextValue, HTMLDivElement>
>({
  name: 'NovaWaveUI.ButtonGroupContext',
  strict: false,
  defaultValue: {},
});

export const [ButtonStateProvider, useButtonState] =
  createContext<ButtonStateContextValue>({
    name: 'NovaWaveUI.ButtonStateContext',
    errorMessage:
      'useButtonState must be used within a Button component or a component wrapped with ButtonProvider',
    strict: true,
  });

export const [ButtonGroupNWContext, useButtonGroup] =
  createContext<ButtonGroupContextValue>({
    name: 'NovaWaveUI.ButtonGroupContext',
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
