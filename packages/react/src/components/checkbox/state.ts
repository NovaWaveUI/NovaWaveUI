import { useMemo } from 'react';
import { createDataPropsGetter } from '../../utils';
import { CheckboxRenderProps } from './types';
import { CheckboxStateContextValue } from './context';

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
      required: ctx.isRequired,
      'read-only': ctx.isReadOnly,
      invalid: ctx.isInvalid,
    };
  });

export function useCheckboxRenderContext(state: CheckboxStateContextValue) {
  const dataAttrs = getCheckboxDataAttrs(state);

  const renderValues = useMemo<CheckboxRenderProps>(
    () => ({
      isPressed: state.isPressed,
      isHovered: state.isHovered,
      isFocused: state.isFocused,
      isFocusVisible: state.isFocusVisible,
      isDisabled: state.isDisabled,
      isIndeterminate: state.isIndeterminate,
      isSelected: state.isSelected,
      color: state.color,
      size: state.size,
      radius: state.radius,
      isRequired: state.isRequired,
      isReadOnly: state.isReadOnly,
      isInvalid: state.isInvalid,
    }),
    [state]
  );

  return { dataAttrs, renderValues };
}
