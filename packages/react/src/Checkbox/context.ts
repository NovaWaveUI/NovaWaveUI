import { ContextValue, createContext } from '@novawaveui/react-utils';
import { createDataPropsGetter } from '@novawaveui/utils';
import {
  CheckboxGroupStateContextValue,
  CheckboxPropsContextValue,
  CheckboxStateContextValue,
} from './types';

export const [CheckboxPropsContext, useCheckboxProps, CheckboxPropsProvider] =
  createContext<ContextValue<CheckboxPropsContextValue, HTMLLabelElement>>({
    name: 'NovaWaveUI.CheckboxPropsContext',
    strict: false,
    defaultValue: {},
  });

export const [CheckboxStateProvider, useCheckboxState, CheckboxStateContext] =
  createContext<CheckboxStateContextValue>({
    name: 'NovaWaveUI.CheckboxStateContext',
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
      'is-required': ctx.isRequired,
      'read-only': ctx.isReadOnly,
      invalid: ctx.isInvalid,
    };
  });

export const getCheckboxGroupDataAttrs =
  createDataPropsGetter<CheckboxGroupStateContextValue>(ctx => {
    return {
      disabled: ctx.isDisabled,
      'read-only': ctx.isReadOnly,
      'is-required': ctx.isRequired,
      invalid: ctx.isInvalid,
      color: ctx.color,
      size: ctx.size,
      radius: ctx.radius,
    };
  });
