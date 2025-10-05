import React from 'react';
import {
  PolymorphicProps,
  RenderProps,
  useRenderProps,
} from '@novawaveui/react-utils';
import { filterDOMProps } from '@novawaveui/utils';
import { Slot } from '../Slot';
import { CheckboxGroupRenderProps } from './types';
import { CheckboxGroupSlots } from './slots';
import { useCheckboxGroupNWState } from './context';
import { useCheckboxGroupRenderContext } from './state';

export type CheckboxGroupDescriptionProps<T extends React.ElementType> =
  PolymorphicProps<T, RenderProps<CheckboxGroupRenderProps>>;

export default function CheckboxGroupDescription<
  T extends React.ElementType = 'span',
>(props: CheckboxGroupDescriptionProps<T>) {
  // First, register the slot
  CheckboxGroupSlots.useRegisterSlot('checkbox-group-description');

  // Get the slot props
  const slotProps = CheckboxGroupSlots.useSlot(
    'checkbox-group-description',
    props
  );

  const { as: Component = 'span', asChild, ...rest } = slotProps;

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
      data-slot="checkbox-group-description"
    />
  );
}

CheckboxGroupDescription.displayName = 'NovaWaveUI.CheckboxGroup.Description';
