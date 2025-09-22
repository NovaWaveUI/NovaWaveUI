import React, { useMemo } from 'react';
import {
  forwardRefWith,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { TextProps, Text } from '../Text';
import { CheckboxRenderProps } from './types';
import { getCheckboxDataAttrs, useCheckboxState } from './context';

export type CheckboxIconProps<T extends React.ElementType = 'span'> = Omit<
  TextProps<T>,
  'children'
> &
  RenderProps<CheckboxRenderProps>;

const CheckboxIcon = forwardRefWith.as<'span', CheckboxIconProps<'span'>>(
  (props, ref) => {
    const { className, style, children, ...rest } = props;

    // Get the checkbox state so that we get the current state
    // and data properties
    const checkboxStateCtx = useCheckboxState();

    // Get the data attributes from the context
    const dataAttrs = getCheckboxDataAttrs(checkboxStateCtx);

    // Get the render values
    const renderValues = useMemo<CheckboxRenderProps>(
      () => ({
        isDisabled: checkboxStateCtx.isDisabled,
        isSelected: checkboxStateCtx.isSelected,
        isIndeterminate: checkboxStateCtx.isIndeterminate,
        isHovered: checkboxStateCtx.isHovered,
        isFocused: checkboxStateCtx.isFocused,
        isFocusVisible: checkboxStateCtx.isFocusVisible,
        isPressed: checkboxStateCtx.isPressed,
        isRequired: checkboxStateCtx.isRequired,
        isInvalid: checkboxStateCtx.isInvalid,
        isReadOnly: checkboxStateCtx.isReadOnly,
      }),
      [checkboxStateCtx]
    );

    const renderProps = useRenderProps({
      className,
      style,
      children,
      values: renderValues,
    });

    return (
      <Text
        ref={ref}
        {...renderProps}
        {...dataAttrs}
        {...rest}
        data-slot="checkbox-icon"
      />
    );
  }
);

CheckboxIcon.displayName = 'NovaWaveUI.CheckboxIcon';

export default CheckboxIcon;
