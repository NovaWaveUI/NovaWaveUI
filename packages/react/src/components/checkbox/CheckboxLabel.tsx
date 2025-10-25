import React from 'react';
import { RenderProps, useRenderProps } from '../../utils/react';
import { cn } from '../../utils';
import { Label, LabelProps } from '../label';
import { CheckboxRenderProps } from './types';
import { useCheckboxState } from './context';
import { useCheckboxRenderContext } from './state';

export type CheckboxLabelProps<T extends React.ElementType> = Omit<
  LabelProps<T>,
  'htmlFor' | 'children' | 'style'
> &
  RenderProps<CheckboxRenderProps>;

export function CheckboxLabel<T extends React.ElementType = 'span'>(
  props: CheckboxLabelProps<T>
) {
  const { className, children, style, ...rest } = props;

  // Get the checkbox state so that we get the current state
  // and data properties
  const checkboxStateCtx = useCheckboxState();

  // Get the data attributes and render values from the context
  const { renderValues } = useCheckboxRenderContext(checkboxStateCtx);

  const renderProps = useRenderProps({
    style,
    className: cn('nw-checkbox-label', className),
    children,
    values: renderValues,
    defaultClassName: cn('nw-checkbox-label', className),
  });

  // Combine all props in a type-safe manner
  const labelProps = {
    ...rest,
    ...renderProps,
    ...checkboxStateCtx.styleDataAttrs,
    'data-slot': 'checkbox-label' as const,
  } as LabelProps<T>;

  return <Label {...labelProps} />;
}

CheckboxLabel.displayName = 'NovaWaveUI.Checkbox.Label';
