import { useMemo } from 'react';
import { createDataPropsGetter } from '../../utils';
import { ButtonRenderProps } from './types';
import { ButtonStateContextType } from './context';

export const getButtonDataAttrs = createDataPropsGetter<ButtonStateContextType>(
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

export function useButtonRenderContext(state: ButtonStateContextType) {
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
