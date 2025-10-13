import { useMemo } from 'react';
import { createDataPropsGetter } from '@novawaveui/utils';
import { CheckboxGroupRenderProps } from './types';
import { CheckboxGroupStateContextType } from './context';

export const getCheckboxGroupDataAttrs =
  createDataPropsGetter<CheckboxGroupStateContextType>(ctx => {
    return {
      disabled: ctx.isDisabled,
      'read-only': ctx.isReadOnly,
      requried: ctx.isRequired,
      invalid: ctx.isInvalid,
      color: ctx.color,
      size: ctx.size,
      radius: ctx.radius,
      orientation: ctx.orientation,
    };
  });

export function useCheckboxGroupRenderContext(
  state: CheckboxGroupStateContextType
) {
  const dataAttrs = getCheckboxGroupDataAttrs(state);

  const renderValues = useMemo<CheckboxGroupRenderProps>(
    () => ({
      isDisabled: state.isDisabled,
      isReadOnly: state.isReadOnly,
      isRequired: state.isRequired,
      isInvalid: state.isInvalid,
      state: state.state,
    }),
    [state]
  );

  return { dataAttrs, renderValues };
}
