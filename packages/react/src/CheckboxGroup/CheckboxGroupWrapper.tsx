import React from 'react';
import { useRenderProps } from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../Slot';
import { CheckboxGroupSlots } from './slots';
import { useCheckboxGroupState } from './context';
import { useCheckboxGroupRenderContext } from './state';
import { CheckboxGroupWrapperProps } from './types';

export default function CheckboxGroupWrapper<
  T extends React.ElementType = 'div',
>(props: CheckboxGroupWrapperProps<T>) {
  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot('checkbox-group-wrapper', props);

  const { as: Component = 'div', asChild, ...rest } = slotProps;

  // Determine if we should filter the props
  const shouldFilterProps = typeof Component === 'string' && !asChild;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupState();

  const { dataAttrs, renderValues } =
    useCheckboxGroupRenderContext(nwGroupState);

  const renderProps = useRenderProps({
    ...rest,
    values: renderValues,
  });

  const filteredProps = filterDOMProps<T>(rest, {
    enabled: shouldFilterProps,
  });

  const RenderedComponent = asChild ? Slot : Component;

  return (
    <RenderedComponent
      {...filteredProps}
      {...dataAttrs}
      {...renderProps}
      role="presentation"
      data-slot="checkbox-group-wrapper"
    />
  );
}
