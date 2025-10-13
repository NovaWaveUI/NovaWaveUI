import React from 'react';
import { filterDOMProps } from '@novawaveui/utils';
import { PolymorphicProps } from '@novawaveui/react-utils';
import { Slot } from '../slot';
import { CheckboxSlots } from './slots';

export type CheckboxIndicatorProps<T extends React.ElementType> =
  PolymorphicProps<T, {}>;

export function CheckboxIndicator<T extends React.ElementType = 'div'>(
  props: CheckboxIndicatorProps<T>
) {
  // Next get any slot props
  const slotProps = CheckboxSlots.useSlot(
    'indicator',
    props
  ) as CheckboxIndicatorProps<T>;

  const { as: Component = 'div', asChild, ...rest } = slotProps;

  // Determine if we should filter DOM props (only for intrinsic elements)
  const shouldFilterDOMProps = typeof Component === 'string' && !asChild;

  const DOMProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterDOMProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return <RenderedComponent {...DOMProps} data-slot="indicator" />;
}

CheckboxIndicator.displayName = 'NovaWaveUI.Checkbox.Indicator';
