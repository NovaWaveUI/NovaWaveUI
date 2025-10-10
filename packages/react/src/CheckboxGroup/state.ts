import { useMemo } from 'react';
import { createDataPropsGetter } from '@novawaveui/utils';
import {
  CheckboxGroupStateContextValue,
  CheckboxGroupRenderProps,
} from './types';

export const getCheckboxGroupDataAttrs = createDataPropsGetter<
  CheckboxGroupStateContextValue<any>
>(ctx => {
  return {
    disabled: ctx.isDisabled,
    'read-only': ctx.isReadOnly,
    'is-required': ctx.isRequired,
    invalid: ctx.isInvalid,
    color: ctx.color,
    size: ctx.size,
    radius: ctx.radius,
    orientation: ctx.orientation,
  };
});

export function useCheckboxGroupRenderContext(
  state: CheckboxGroupStateContextValue<any>
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
