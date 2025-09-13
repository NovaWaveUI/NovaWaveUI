import { createDataPropsGetter } from '@novawaveui/utils';

import type { CheckboxContextValue } from './checkboxContext';

/**
 * Function to get data attributes for the Checkbox component based on its context.
 */
export const getCheckboxStateDataProps =
  createDataPropsGetter<CheckboxContextValue>(ctx => ({
    disabled: ctx.isDisabled,
    focused: ctx.isFocused,
    'focus-visible': ctx.isFocusVisible,
    hovered: ctx.isHovered,
    pressed: ctx.isPressed,
    checked: ctx.isSelected,
    indeterminate: ctx.isIndeterminate,
    'read-only': ctx.aria.isReadOnly,
    invalid: ctx.isInvalid,
  }));
