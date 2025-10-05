import React from 'react';
import { PolymorphicProps } from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../Slot';
import { useCheckboxState } from './context';
import { useCheckboxRenderContext } from './state';
import { CheckboxSlots } from './slots';

export type CheckboxIndicatorProps<T extends React.ElementType> =
  PolymorphicProps<T, {}>;

export default function CheckboxIndicator<T extends React.ElementType = 'div'>(
  props: CheckboxIndicatorProps<T>
) {
  // First, register the slot so that the slot system knows this slot is being used
  CheckboxSlots.useRegisterSlot('indicator');

  // Next get any slot props
  const slotProps = CheckboxSlots.useSlot(
    'indicator',
    props
  ) as CheckboxIndicatorProps<T>;

  const { as: Component = 'div', asChild, ...rest } = slotProps;

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  // Get the checkbox state so that we get the current state
  // and data properties
  const checkboxStateCtx = useCheckboxState();

  // Get the data attributes from the context
  const { dataAttrs } = useCheckboxRenderContext(checkboxStateCtx);

  const DOMProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterDOMProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent {...DOMProps} {...dataAttrs} data-slot="indicator" />
  );
}

CheckboxIndicator.displayName = 'NovaWaveUI.Checkbox.Indicator';
