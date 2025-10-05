import React from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../Slot';
import { CheckboxGroupSlots } from './slots';
import { useCheckboxGroupNWState } from './context';
import { useCheckboxGroupRenderContext } from './state';
import { CheckboxGroupRenderProps } from './types';

export type CheckboxGroupWrapperProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<CheckboxGroupRenderProps>>;

export default function CheckboxGroupWrapper<
  T extends React.ElementType = 'div',
>(props: CheckboxGroupWrapperProps<T>) {
  // First, register the slot
  CheckboxGroupSlots.useRegisterSlot('checkbox-group-wrapper');

  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot('checkbox-group-wrapper', props);

  const { as: Component = 'div', asChild, ...rest } = slotProps;

  // Determine if we should filter the props
  const shouldFilterProps = typeof Component === 'string' && !asChild;

  // Get the NovaWaveUI checkbox group state context so that we can get the current state
  // and data properties
  const nwGroupState = useCheckboxGroupNWState();

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
