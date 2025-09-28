import { ContextValue, createContext } from '@novawaveui/react-utils';
import { createDataPropsGetter } from '@novawaveui/utils';
import {
  ButtonGroupContextValue,
  ButtonGroupPropsContextValue,
  ButtonPropsContextValue,
  ButtonStateContextValue,
} from './types';

export const [ButtonPropsContext, , ButtonPropsProvider] = createContext<
  ContextValue<ButtonPropsContextValue, HTMLButtonElement>
>({
  name: 'NovaWaveUI.ButtonPropsContext',
  strict: false,
});

export const [ButtonGroupPropsContext, , ButtonGroupPropsProvider] =
  createContext<ContextValue<ButtonGroupPropsContextValue, HTMLDivElement>>({
    name: 'NovaWaveUI.ButtonGroupPropsContext',
    strict: false,
  });

export const [ButtonStateProvider, useButtonState] =
  createContext<ButtonStateContextValue>({
    name: 'NovaWaveUI.ButtonStateContext',
    errorMessage:
      'useButtonState must be used within a Button component or a component wrapped with ButtonProvider',
    strict: true,
  });

export const [ButtonGroupProvider, useButtonGroup] =
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
