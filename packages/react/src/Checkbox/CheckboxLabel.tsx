import React from 'react';
import {
  PolymorphicProps,
  renderPolymorphic,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { CheckboxRenderProps } from './types';
import { useCheckboxState } from './context';
import { useCheckboxRenderContext } from './state';

export type CheckboxLabelProps<T extends React.ElementType> = PolymorphicProps<
  T,
  RenderProps<CheckboxRenderProps>
>;

export default function CheckboxLabel<T extends React.ElementType = 'span'>(
  props: CheckboxLabelProps<T>
) {
  const { className, style, children, ...rest } = props;

  // Get the checkbox state so that we get the current state
  // and data properties
  const checkboxStateCtx = useCheckboxState();

  // Get the data attributes and render values from the context
  const { dataAttrs, renderValues } =
    useCheckboxRenderContext(checkboxStateCtx);

  const renderProps = useRenderProps({
    className,
    style,
    children,
    values: renderValues,
  });

  const finalProps = {
    ...rest,
    ...dataAttrs,
    ...renderProps,
    'data-slot': 'label',
  };

  return renderPolymorphic(finalProps, 'span');
}

CheckboxLabel.displayName = 'NovaWaveUI.Checkbox.Label';
