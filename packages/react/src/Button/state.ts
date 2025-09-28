import { useMemo } from 'react';
import { createDataPropsGetter } from '@novawaveui/utils';
import { ButtonRenderProps, ButtonStateContextValue } from './types';

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

export function useButtonRenderContext(state: ButtonStateContextValue) {
  const dataAttrs = getButtonDataAttrs(state);

  const renderValues = useMemo<ButtonRenderProps>(
    () => ({
      isPressed: state.isPressed,
      isDisabled: state.isDisabled,
      isHovered: state.isHovered,
      isFocused: state.isFocused,
      isFocusVisible: state.isFocusVisible,
      isLoading: state.isLoading,
    }),
    [state]
  );

  return { dataAttrs, renderValues };
}
