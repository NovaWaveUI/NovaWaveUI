import {
  PolymorphicComponent,
  PolymorphicProps,
} from '@novawaveui/react-utils';
import React from 'react';
import { useCheckboxState } from './context';
import { useCheckboxRenderContext } from './state';

export type CheckboxIndicatorProps<T extends React.ElementType> =
  PolymorphicProps<T, {}>;

export default function CheckboxIndicator<T extends React.ElementType = 'div'>(
  props: CheckboxIndicatorProps<T>
) {
  const { as: Component = 'div', children, ...rest } = props;

  // Get the checkbox state so that we get the current state
  // and data properties
  const checkboxStateCtx = useCheckboxState();

  // Get the data attributes from the context
  const { dataAttrs } = useCheckboxRenderContext(checkboxStateCtx);

  // Create a final object of props to spread onto the element
  const finalProps = {
    ...dataAttrs,
    ...rest,
    'data-slot': 'indicator',
    children,
  };

  return <PolymorphicComponent as={Component} {...finalProps} />;
}

CheckboxIndicator.displayName = 'NovaWaveUI.Checkbox.Indicator';
