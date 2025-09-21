import { createContext } from 'react';
import {
  ContextValue,
  createContext as nwCreateContext,
} from '@novawaveui/react-utils';
import { createDataPropsGetter } from '@novawaveui/utils';
import {
  CheckboxGroupPropsContextValue,
  CheckboxPropsContextValue,
  CheckboxStateContextValue,
} from './types';

export const CheckboxContext = createContext<
  ContextValue<CheckboxPropsContextValue, HTMLLabelElement>
>({});
CheckboxContext.displayName = 'NovaWaveUI.CheckboxContext';

export const CheckboxProvider = CheckboxContext.Provider;

export const CheckboxGroupContext = createContext<
  ContextValue<CheckboxGroupPropsContextValue, HTMLDivElement>
>({});
CheckboxGroupContext.displayName = 'NovaWaveUI.CheckboxGroupContext';
export const CheckboxGroupProvider = CheckboxGroupContext.Provider;

export const [CheckboxStateProvider, useCheckboxState] =
  nwCreateContext<CheckboxStateContextValue>({
    name: 'CheckboxStateContext',
    errorMessage:
      'useCheckboxStated must be used within a Checkbox component or a component wrapped with CheckboxProvider',
    strict: true,
  });

export const [CheckboxGroupStateProvider, useCheckboxGroupState] =
  nwCreateContext<CheckboxGroupPropsContextValue>({
    name: 'CheckboxGroupContext',
    errorMessage:
      'useCheckboxGroupState must be used within a CheckboxGroup component or a component wrapped with CheckboxGroupProvider',
    strict: false,
  });

export const getCheckboxDataAttrs =
  createDataPropsGetter<CheckboxStateContextValue>(ctx => {
    return {
      hovered: ctx.isHovered,
      focused: ctx.isFocused,
      'focus-visible': ctx.isFocusVisible,
      pressed: ctx.isPressed,
      disabled: ctx.isDisabled,
      indeterminate: ctx.isIndeterminate,
      selected: ctx.isSelected,
      color: ctx.color,
      size: ctx.size,
      radius: ctx.radius,
    };
  });
