import { createDataPropsGetterStyled } from '@novawaveui/utils';
import { CheckboxStyledContextValue } from './checkboxContext';

export const getCheckboxDataProps =
  createDataPropsGetterStyled<CheckboxStyledContextValue>(ctx => ({
    loading: ctx.isLoading,
    color: ctx.color,
    size: ctx.size,
    radius: ctx.radius,
    variant: ctx.variant,
  }));
