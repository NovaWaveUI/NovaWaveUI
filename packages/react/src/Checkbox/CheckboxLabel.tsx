import React from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../Slot';
import { CheckboxRenderProps } from './types';
import { useCheckboxState } from './context';
import { useCheckboxRenderContext } from './state';
import { CheckboxSlots } from './slots';

export type CheckboxLabelProps<T extends Exclude<React.ElementType, 'label'>> =
  PolymorphicProps<T, RenderProps<CheckboxRenderProps>>;

export default function CheckboxLabel<
  T extends Exclude<React.ElementType, 'label'> = 'span',
>(props: CheckboxLabelProps<T>) {
  // Next get any slot props
  const slotProps = CheckboxSlots.useSlot(
    'label',
    props
  ) as CheckboxLabelProps<T>;

  const { as: Component = 'span', asChild, ...rest } = slotProps;

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  // Get the checkbox state so that we get the current state
  // and data properties
  const checkboxStateCtx = useCheckboxState();

  // Get the data attributes and render values from the context
  const { dataAttrs, renderValues } =
    useCheckboxRenderContext(checkboxStateCtx);

  const renderProps = useRenderProps({
    ...rest,
    values: renderValues,
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterDOMProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent {...filteredProps} {...renderProps} data-slot="label" />
  );
}

CheckboxLabel.displayName = 'NovaWaveUI.Checkbox.Label';
