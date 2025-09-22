import {
  forwardRefWith,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import React, { useMemo } from 'react';
import { getCheckboxDataAttrs, useCheckboxState } from './context';
import { CheckboxRenderProps } from './types';

export type CheckboxIndicatorProps<T extends React.ElementType = 'div'> =
  React.ComponentPropsWithoutRef<T> & RenderProps<CheckboxRenderProps>;

const CheckboxIndicator = forwardRefWith.as<
  'div',
  CheckboxIndicatorProps<'div'>
>((props, ref) => {
  const { as: Component = 'div', className, style, children, ...rest } = props;

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
    <Component
      ref={ref}
      {...rest}
      {...dataAttrs}
      className={renderProps.className}
      style={renderProps.style}
      data-slot="indicator"
    >
      {renderProps.children}
    </Component>
  );
});

CheckboxIndicator.displayName = 'NovaWaveUI.CheckboxIndicator';

export default CheckboxIndicator;
