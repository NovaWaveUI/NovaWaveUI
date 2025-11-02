import { useMemo } from 'react';
import { createDataPropsGetter } from '../../utils';
import { CheckboxGroupRenderProps } from './types';
import { CheckboxGroupStateContextType } from './context';

export const getCheckboxGroupDataAttrs =
  createDataPropsGetter<CheckboxGroupStateContextType>(ctx => {
    return {
      disabled: ctx.isDisabled,
      'read-only': ctx.isReadOnly,
      required: ctx.isRequired,
      invalid: ctx.isInvalid,
      size: ctx.size,
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
